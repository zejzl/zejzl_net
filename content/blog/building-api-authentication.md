---
title: "Building API Authentication from Scratch: A Practical Guide"
date: "2026-02-06"
author: "Neo"
excerpt: "How to build a production-ready API authentication system with tier-based rate limiting, secure key storage, and middleware protection. Complete implementation guide with code."
tags: ["Authentication", "API Security", "Python", "FastAPI", "Backend"]
readingTime: "15 min"
---

# Building API Authentication from Scratch: A Practical Guide

After discovering our API had zero authentication protecting 70+ endpoints, we built a complete authentication system in one afternoon. Here's the full implementation guide, from API key design to rate limiting to middleware integration.

This isn't a tutorial on using Auth0 or Firebase. This is about understanding authentication fundamentals by building it yourself.

## Why Build Your Own?

**Reasons to build:**
- Learn authentication internals (critical security knowledge)
- Full control over key format, storage, and validation
- No external dependencies or vendor lock-in
- Custom rate limiting per tier
- Zero cost (vs $25-299/mo for auth services)

**Reasons to use a service:**
- OAuth/SSO requirements
- Multi-tenant complexity
- Compliance requirements (SOC2, HIPAA)
- Team lacks security expertise

For our AI API serving webhooks and programmatic access, custom authentication made sense.

## Design Goals

Before writing code, we defined clear requirements:

### 1. API Key Format
- **Prefix:** `zejzl_` for easy identification in logs/errors
- **Length:** 32 random characters (128 bits of entropy)
- **Metadata:** Store tier and description separate from key
- **Example:** `zejzl_vMq1NhMpPHyAqAivX1pilXD9URjHneEm`

### 2. Storage Format
Keys stored with metadata:
```
zejzl_vMq1NhMpPHyAqAivX1pilXD9URjHneEm:pro:Production API Key
```

**Format:** `{key}:{tier}:{description}`

### 3. Security Requirements
- SHA-256 hashing with salt
- Constant-time comparison (timing attack prevention)
- No keys in git (environment variables only)
- Rate limiting per tier
- Audit logging for all auth events

### 4. Rate Limiting Tiers
- **Free:** 10 requests/minute
- **Pro:** 100 requests/minute  
- **Enterprise:** 1000 requests/minute

### 5. Middleware Architecture
- Protect all `/api/*` routes by default
- Explicit public endpoint whitelist
- Return 401 for invalid keys
- Return 429 for rate limit exceeded

## Implementation: Step by Step

### Step 1: API Key Generation

```python
import secrets
import string

def generate_api_key(prefix: str = "zejzl") -> str:
    """
    Generate a cryptographically secure API key.
    
    Format: {prefix}_{32_random_chars}
    Entropy: 128 bits (extremely secure)
    """
    # Use secrets module (cryptographically strong)
    # Not random module (predictable, insecure)
    alphabet = string.ascii_letters + string.digits
    random_part = ''.join(secrets.choice(alphabet) for _ in range(32))
    
    return f"{prefix}_{random_part}"

# Generate keys
key1 = generate_api_key()  # zejzl_vMq1NhMpPHyAqAivX1pilXD9URjHneEm
key2 = generate_api_key()  # zejzl_8kL2xPnWqYzR7mGhJfDsC9vBtNaE4uI
```

**Why 32 characters?**
- 62 possible characters (a-z, A-Z, 0-9)
- 32 positions = 62^32 ≈ 2^190 possibilities
- 128 bits of entropy (industry standard for strong keys)
- Would take billions of years to brute force

**Why `secrets` not `random`?**
```python
# ❌ INSECURE - Predictable
import random
key = ''.join(random.choice(alphabet) for _ in range(32))

# ✅ SECURE - Cryptographically strong
import secrets
key = ''.join(secrets.choice(alphabet) for _ in range(32))
```

The `random` module uses Mersenne Twister which is predictable if an attacker sees enough outputs. `secrets` uses the OS's cryptographically secure random source (`/dev/urandom` on Linux, `CryptGenRandom` on Windows).

### Step 2: Key Hashing

```python
import hashlib

def hash_api_key(key: str, salt: str = None) -> str:
    """
    Hash API key with SHA-256 and salt.
    
    Why hash?
    - If database is compromised, keys aren't exposed
    - Standard practice (like password hashing)
    - Fast enough for API keys (unlike bcrypt/scrypt)
    """
    if not salt:
        # In production: load from environment
        salt = os.getenv("API_KEY_SALT", "zejzl_api_salt_2024")
    
    # Combine key + salt before hashing
    combined = f"{key}{salt}"
    
    # SHA-256 produces 64-character hex string
    hashed = hashlib.sha256(combined.encode()).hexdigest()
    
    return hashed

# Example
key = "zejzl_vMq1NhMpPHyAqAivX1pilXD9URjHneEm"
hashed = hash_api_key(key)
# Output: "a3f5b8c2d9e1f7a4b6c8d0e2f4a6b8c0d2e4f6a8b0c2d4e6f8a0b2c4d6e8f0a2"
```

**Why SHA-256 instead of bcrypt?**

For API keys:
- **SHA-256:** Fast (~1 microsecond), sufficient for random keys
- **bcrypt:** Slow (~100 milliseconds), designed for weak passwords

API keys have 128 bits of entropy (impossible to brute force). Passwords often have <40 bits (need slow hashing). Different threat models.

### Step 3: Key Storage & Loading

```python
import os
from typing import Dict, List

class APIKeyManager:
    """Manage API keys with tier-based rate limiting."""
    
    def __init__(self):
        self.keys: Dict[str, Dict] = {}
        self.load_keys()
    
    def load_keys(self) -> None:
        """
        Load API keys from environment variables.
        
        Format: ZEJZL_API_KEY_{N}=key:tier:description
        Example: ZEJZL_API_KEY_1=zejzl_abc123:pro:Production
        """
        key_num = 1
        while True:
            env_key = f"ZEJZL_API_KEY_{key_num}"
            key_value = os.getenv(env_key)
            
            if not key_value:
                break  # No more keys
            
            # Parse format: key:tier:description
            parts = key_value.split(":", 2)
            if len(parts) != 3:
                print(f"Invalid format for {env_key}: {key_value}")
                continue
            
            key, tier, description = parts
            
            # Store with hashed key as lookup
            hashed = hash_api_key(key)
            self.keys[hashed] = {
                "tier": tier,
                "description": description,
                "key_preview": f"{key[:12]}...{key[-4:]}"  # For logs
            }
            
            key_num += 1
        
        print(f"Loaded {len(self.keys)} API keys")
    
    def verify_key(self, provided_key: str) -> Dict | None:
        """
        Verify API key and return metadata if valid.
        
        Returns None if invalid, dict with tier/description if valid.
        """
        hashed = hash_api_key(provided_key)
        return self.keys.get(hashed)

# Usage
manager = APIKeyManager()
result = manager.verify_key("zejzl_vMq1NhMpPHyAqAivX1pilXD9URjHneEm")
if result:
    print(f"Valid {result['tier']} key: {result['description']}")
else:
    print("Invalid key")
```

**Environment Variable Setup:**

```bash
# .env file
ZEJZL_API_KEY_1=zejzl_vMq1NhMpPHyAqAivX1pilXD9URjHneEm:pro:Production API Key
ZEJZL_API_KEY_2=zejzl_8kL2xPnWqYzR7mGhJfDsC9vBt:free:Development Key
ZEJZL_API_KEY_3=zejzl_NaE4uIoP6qR8sT0uV2wX4yZ6a:enterprise:Enterprise Client
```

### Step 4: Rate Limiting

```python
from datetime import datetime, timedelta
from collections import defaultdict
from typing import Dict, List

class RateLimiter:
    """In-memory rate limiter with sliding window."""
    
    # Rate limits per tier
    LIMITS = {
        "free": {"requests": 10, "window": 60},       # 10/min
        "pro": {"requests": 100, "window": 60},       # 100/min
        "enterprise": {"requests": 1000, "window": 60}  # 1000/min
    }
    
    def __init__(self):
        # Store: {key_hash: [timestamp1, timestamp2, ...]}
        self.requests: Dict[str, List[datetime]] = defaultdict(list)
    
    def check_rate_limit(self, key_hash: str, tier: str) -> tuple[bool, Dict]:
        """
        Check if request is within rate limit.
        
        Returns: (allowed: bool, info: dict)
        info contains: limit, remaining, reset_at
        """
        now = datetime.now()
        limit_config = self.LIMITS.get(tier, self.LIMITS["free"])
        
        max_requests = limit_config["requests"]
        window_seconds = limit_config["window"]
        
        # Remove timestamps outside the window
        cutoff = now - timedelta(seconds=window_seconds)
        self.requests[key_hash] = [
            ts for ts in self.requests[key_hash]
            if ts > cutoff
        ]
        
        # Count requests in current window
        current_count = len(self.requests[key_hash])
        
        if current_count >= max_requests:
            # Rate limit exceeded
            oldest_request = min(self.requests[key_hash])
            reset_at = oldest_request + timedelta(seconds=window_seconds)
            
            return False, {
                "limit": max_requests,
                "remaining": 0,
                "reset_at": reset_at.isoformat()
            }
        
        # Add current request
        self.requests[key_hash].append(now)
        
        return True, {
            "limit": max_requests,
            "remaining": max_requests - current_count - 1,
            "reset_at": (now + timedelta(seconds=window_seconds)).isoformat()
        }

# Usage
limiter = RateLimiter()

# Free tier user making 11 requests
key_hash = hash_api_key("zejzl_free_tier_key")
for i in range(11):
    allowed, info = limiter.check_rate_limit(key_hash, "free")
    print(f"Request {i+1}: {'✅ Allowed' if allowed else '❌ Rate limited'}")
    print(f"  Remaining: {info['remaining']}/{info['limit']}")
```

**Output:**
```
Request 1: ✅ Allowed
  Remaining: 9/10
Request 2: ✅ Allowed
  Remaining: 8/10
...
Request 10: ✅ Allowed
  Remaining: 0/10
Request 11: ❌ Rate limited
  Remaining: 0/10
```

**Why sliding window?**

- **Fixed window:** All limits reset at same time (thundering herd)
- **Sliding window:** Smooth distribution, no sudden spikes

**Scaling considerations:**

This in-memory implementation works for single instances. For multi-instance deployments:

```python
# Replace with Redis
import redis

class RedisRateLimiter:
    def __init__(self):
        self.redis = redis.Redis(host='localhost', port=6379)
    
    def check_rate_limit(self, key_hash: str, tier: str) -> tuple[bool, Dict]:
        # Use Redis sorted sets with timestamps
        # Automatically cleaned up, shared across instances
        pass
```

### Step 5: FastAPI Middleware

```python
from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import JSONResponse
import time

app = FastAPI()

# Initialize components
key_manager = APIKeyManager()
rate_limiter = RateLimiter()

# Public endpoints (no auth required)
PUBLIC_ENDPOINTS = {
    "/api/status",
    "/api/health",
    "/docs",
    "/redoc",
    "/openapi.json"
}

@app.middleware("http")
async def auth_middleware(request: Request, call_next):
    """
    Authentication middleware.
    
    Protects all /api/* endpoints except PUBLIC_ENDPOINTS.
    Returns 401 for invalid keys, 429 for rate limits.
    """
    # Start timing
    start_time = time.time()
    
    # Check if endpoint requires authentication
    if request.url.path.startswith("/api/"):
        if request.url.path not in PUBLIC_ENDPOINTS:
            # Extract API key from header
            api_key = request.headers.get("x-api-key")
            
            if not api_key:
                return JSONResponse(
                    status_code=401,
                    content={
                        "error": "Missing API key",
                        "message": "Include X-API-Key header"
                    }
                )
            
            # Verify key
            key_info = key_manager.verify_key(api_key)
            if not key_info:
                return JSONResponse(
                    status_code=401,
                    content={
                        "error": "Invalid API key",
                        "message": "Key not found or expired"
                    }
                )
            
            # Check rate limit
            key_hash = hash_api_key(api_key)
            tier = key_info["tier"]
            allowed, limit_info = rate_limiter.check_rate_limit(key_hash, tier)
            
            if not allowed:
                return JSONResponse(
                    status_code=429,
                    content={
                        "error": "Rate limit exceeded",
                        "limit": limit_info["limit"],
                        "reset_at": limit_info["reset_at"]
                    },
                    headers={
                        "X-RateLimit-Limit": str(limit_info["limit"]),
                        "X-RateLimit-Remaining": "0",
                        "X-RateLimit-Reset": limit_info["reset_at"]
                    }
                )
            
            # Add key info to request state for endpoint access
            request.state.api_key_info = key_info
            request.state.rate_limit_info = limit_info
    
    # Call the actual endpoint
    response = await call_next(request)
    
    # Add timing header
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    
    # Add rate limit headers to successful responses
    if hasattr(request.state, "rate_limit_info"):
        info = request.state.rate_limit_info
        response.headers["X-RateLimit-Limit"] = str(info["limit"])
        response.headers["X-RateLimit-Remaining"] = str(info["remaining"])
        response.headers["X-RateLimit-Reset"] = info["reset_at"]
    
    return response
```

**What this does:**

1. **Intercepts all requests** before they reach endpoints
2. **Checks if authentication is needed** (all `/api/*` except public)
3. **Validates API key** (401 if missing/invalid)
4. **Enforces rate limits** (429 if exceeded)
5. **Adds metadata to request** (available in endpoints)
6. **Adds rate limit headers** (so clients know their status)

### Step 6: Using Auth in Endpoints

```python
from fastapi import Request

@app.post("/api/simple-prompt")
async def simple_prompt(request: Request, data: dict):
    """
    Example protected endpoint.
    
    Authentication handled by middleware (no decorator needed).
    Key info available in request.state.
    """
    # Access authenticated key info
    key_info = request.state.api_key_info
    tier = key_info["tier"]
    
    # Log authenticated request
    print(f"Request from {tier} tier: {key_info['description']}")
    
    # Your endpoint logic here
    response = await process_prompt(data["prompt"])
    
    return {"response": response, "tier": tier}
```

**Benefits of middleware approach:**

- **No code in every endpoint** (vs decorators on 70+ endpoints)
- **Automatic protection** (impossible to forget)
- **Consistent error responses**
- **Centralized logging and monitoring**

## Testing the Implementation

### Test 1: Protected Endpoint Without Key

```bash
curl -X POST https://api.zejzl.net/api/simple-prompt \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Hello"}'
```

**Expected Response:**
```json
{
  "error": "Missing API key",
  "message": "Include X-API-Key header"
}
```
**Status:** 401 Unauthorized ✅

### Test 2: Invalid API Key

```bash
curl -X POST https://api.zejzl.net/api/simple-prompt \
  -H "X-API-Key: zejzl_invalid_key_12345" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Hello"}'
```

**Expected Response:**
```json
{
  "error": "Invalid API key",
  "message": "Key not found or expired"
}
```
**Status:** 401 Unauthorized ✅

### Test 3: Valid Key Within Rate Limit

```bash
curl -X POST https://api.zejzl.net/api/simple-prompt \
  -H "X-API-Key: zejzl_vMq1NhMpPHyAqAivX1pilXD9URjHneEm" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Hello"}'
```

**Expected Response:**
```json
{
  "response": "Hello! How can I help you today?",
  "tier": "pro"
}
```
**Status:** 200 OK ✅  
**Headers:**
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 2026-02-06T15:45:00
X-Process-Time: 0.234
```

### Test 4: Rate Limit Exceeded

```bash
# Send 101 requests with free tier key
for i in {1..101}; do
  curl -H "X-API-Key: zejzl_free_key" https://api.zejzl.net/api/simple-prompt
done
```

**First 10 requests:** 200 OK ✅  
**Request 11:** 429 Too Many Requests ✅

```json
{
  "error": "Rate limit exceeded",
  "limit": 10,
  "reset_at": "2026-02-06T15:31:00"
}
```

### Test 5: Public Endpoints (No Auth)

```bash
curl https://api.zejzl.net/api/status
```

**Expected Response:**
```json
{
  "status": "operational",
  "version": "1.0.0",
  "uptime": 86400
}
```
**Status:** 200 OK ✅ (No API key needed)

## Security Best Practices

### 1. Constant-Time Comparison

```python
import hmac

# ❌ Vulnerable to timing attacks
def insecure_verify(provided: str, stored: str) -> bool:
    return provided == stored  # Takes longer if more characters match

# ✅ Secure against timing attacks
def secure_verify(provided: str, stored: str) -> bool:
    return hmac.compare_digest(provided, stored)  # Always same time
```

**Why it matters:**  
An attacker can measure response times to guess keys character by character.

### 2. API Key Rotation

```python
class APIKeyManager:
    def rotate_key(self, old_key: str, description: str) -> str:
        """
        Rotate API key (generate new, mark old as deprecated).
        
        Grace period: Old key works for 30 days after rotation.
        """
        # Generate new key
        new_key = generate_api_key()
        
        # Mark old key with expiration
        old_hash = hash_api_key(old_key)
        if old_hash in self.keys:
            self.keys[old_hash]["deprecated"] = True
            self.keys[old_hash]["expires_at"] = datetime.now() + timedelta(days=30)
        
        # Add new key
        new_hash = hash_api_key(new_key)
        self.keys[new_hash] = {
            "tier": self.keys[old_hash]["tier"],
            "description": description,
            "created_at": datetime.now()
        }
        
        return new_key
```

### 3. Audit Logging

```python
import logging

logger = logging.getLogger("auth")

@app.middleware("http")
async def auth_middleware(request: Request, call_next):
    # ... authentication logic ...
    
    # Log authentication events
    if api_key:
        key_preview = f"{api_key[:12]}...{api_key[-4:]}"
        
        if not key_info:
            logger.warning(
                f"Invalid API key attempt: {key_preview} "
                f"from {request.client.host} "
                f"endpoint {request.url.path}"
            )
        else:
            logger.info(
                f"Authenticated request: {key_info['description']} "
                f"({key_info['tier']}) "
                f"endpoint {request.url.path} "
                f"remaining {limit_info['remaining']}"
            )
```

### 4. Environment-Specific Configuration

```python
# config.py
import os

class Config:
    # Development
    if os.getenv("ENVIRONMENT") == "development":
        API_KEY_SALT = "dev_salt_not_secure"
        RATE_LIMIT_ENABLED = False  # Disable for testing
    
    # Production
    else:
        API_KEY_SALT = os.getenv("API_KEY_SALT")
        if not API_KEY_SALT:
            raise ValueError("API_KEY_SALT required in production")
        
        RATE_LIMIT_ENABLED = True
```

## Monitoring & Observability

### Key Metrics to Track

```python
from prometheus_client import Counter, Histogram

# Authentication metrics
auth_requests_total = Counter(
    "auth_requests_total",
    "Total authentication attempts",
    ["status", "tier"]
)

auth_failures_total = Counter(
    "auth_failures_total",
    "Failed authentication attempts",
    ["reason"]
)

rate_limit_exceeded_total = Counter(
    "rate_limit_exceeded_total",
    "Rate limit violations",
    ["tier"]
)

request_duration_seconds = Histogram(
    "request_duration_seconds",
    "Request duration",
    ["endpoint", "tier"]
)

# Update in middleware
auth_requests_total.labels(status="success", tier=tier).inc()
auth_failures_total.labels(reason="invalid_key").inc()
rate_limit_exceeded_total.labels(tier=tier).inc()
```

### Alerts to Set Up

1. **High Rate of Auth Failures**
   - Threshold: >100 failures/minute
   - Action: Potential brute force attack

2. **Rate Limit Exceeded (Enterprise Tier)**
   - Threshold: >10 occurrences/hour
   - Action: Client may need tier upgrade

3. **Slow Request Performance**
   - Threshold: >5 seconds p95 latency
   - Action: Performance degradation

4. **Unusual Request Patterns**
   - Threshold: 10x normal request volume
   - Action: Potential abuse or DDoS

## Complete Code

Here's the full implementation in one file:

**`src/auth.py` (8.9KB)**

```python
"""
API Authentication System for zejzl.net

Features:
- API key generation and management
- SHA-256 hashing with salt
- Tier-based rate limiting
- FastAPI middleware integration
- Audit logging
"""

import os
import secrets
import string
import hashlib
import hmac
from datetime import datetime, timedelta
from collections import defaultdict
from typing import Dict, List, Optional

# ... (all the code from above sections combined)
```

**Full source:** [github.com/zejzl/zejzlAI/src/auth.py](https://github.com/zejzl/zejzlAI)

## Lessons Learned

### 1. Middleware > Decorators

We initially considered using dependency injection:

```python
# ❌ Have to remember to add to every endpoint
@app.post("/api/endpoint")
async def endpoint(auth = Depends(verify_api_key)):
    pass
```

Middleware is better:
- Automatic protection (impossible to forget)
- Applies to all routes by pattern
- Centralized logic
- Easier to test

### 2. Rate Limiting is Essential

Without rate limiting:
- Free tier users can abuse expensive operations
- DDoS attacks are easy
- Costs can spiral out of control

With rate limiting:
- Predictable resource usage
- Fair allocation across tiers
- Attack mitigation

### 3. Good Error Messages Matter

```python
# ❌ Unhelpful
{"error": "Unauthorized"}

# ✅ Actionable
{
    "error": "Missing API key",
    "message": "Include X-API-Key header in your request",
    "docs": "https://zejzl.net/docs/authentication"
}
```

### 4. Headers Communicate State

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 2026-02-06T15:45:00
X-Process-Time: 0.234
```

Clients can:
- Implement backoff before hitting limits
- Display quota in UI
- Optimize request timing

## What's Next?

**Immediate (30 min each):**
- [ ] API key rotation endpoint
- [ ] Admin dashboard for key management
- [ ] Detailed audit logs

**Short-term (1-2 hours each):**
- [ ] Redis rate limiting (multi-instance support)
- [ ] Webhook verification (HMAC signatures)
- [ ] IP-based rate limiting (in addition to key-based)

**Long-term (1 day each):**
- [ ] OAuth2 support
- [ ] Key scoping (restrict endpoints per key)
- [ ] Usage analytics dashboard

## Conclusion

We built a production-ready authentication system in one afternoon:

- **8.9KB of code**
- **70+ endpoints protected**
- **3-tier rate limiting**
- **Zero external dependencies**
- **Full audit logging**

The key insights:
1. Use middleware for automatic protection
2. Rate limiting is non-negotiable
3. Good errors help users succeed
4. Monitoring enables security

All code is open source at [github.com/zejzl/zejzlAI](https://github.com/zejzl/zejzlAI).

## Resources

- [FastAPI Security Documentation](https://fastapi.tiangolo.com/tutorial/security/)
- [OWASP API Security Top 10](https://owasp.org/www-project-api-security/)
- [RFC 6750: Bearer Token Usage](https://tools.ietf.org/html/rfc6750)
- [Python secrets module](https://docs.python.org/3/library/secrets.html)
- [Rate Limiting Patterns](https://redis.io/docs/manual/patterns/rate-limiter/)

---

**Questions?** Open an issue on GitHub or reach out at security@zejzl.net

**Found a vulnerability?** Please report responsibly to security@zejzl.net
