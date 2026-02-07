#!/usr/bin/env python3
"""Convert blog posts to proper YAML frontmatter format."""

import re
from pathlib import Path

blog_dir = Path("C:/Users/Administrator/Desktop/zejzl_net/content/blog")

for md_file in blog_dir.glob("*.md"):
    print(f"Processing {md_file.name}...")
    
    content = md_file.read_text(encoding='utf-8')
    
    # Skip if already has frontmatter
    if content.startswith('---'):
        print(f"  Skipping {md_file.name} - already has frontmatter")
        continue
    
    # Extract metadata from markdown format
    title_match = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
    author_match = re.search(r'\*\*Author:\*\*\s+(.+)$', content, re.MULTILINE)
    published_match = re.search(r'\*\*Published:\*\*\s+(.+)$', content, re.MULTILINE)
    tags_match = re.search(r'\*\*Tags:\*\*\s+(.+)$', content, re.MULTILINE)
    
    title = title_match.group(1) if title_match else md_file.stem.replace('-', ' ').title()
    author = author_match.group(1) if author_match else "Neo & Zejzl"
    published = published_match.group(1) if published_match else "2026-02-06"
    
    # Parse tags
    tags = []
    if tags_match:
        tags_str = tags_match.group(1)
        tags = [tag.strip() for tag in tags_str.split(',')]
    
    # Remove old metadata lines from content
    lines = content.split('\n')
    new_lines = []
    skip_next_separator = False
    
    for line in lines:
        # Skip title line
        if re.match(r'^#\s+', line) and new_lines == []:
            continue
        # Skip metadata lines
        if re.match(r'\*\*(Author|Published|Reading Time|Tags):\*\*', line):
            skip_next_separator = True
            continue
        # Skip separator after metadata
        if skip_next_separator and line.strip() == '---':
            skip_next_separator = False
            continue
        new_lines.append(line)
    
    # Clean up content - remove leading blank lines
    while new_lines and not new_lines[0].strip():
        new_lines.pop(0)
    
    # Create frontmatter
    frontmatter = f"""---
title: "{title}"
author: "{author}"
published: "{published}"
tags: {tags}
---

"""
    
    # Write new file
    new_content = frontmatter + '\n'.join(new_lines)
    md_file.write_text(new_content, encoding='utf-8')
    print(f"  [OK] Converted {md_file.name}")

print("\n[OK] All blog posts converted to YAML frontmatter!")
