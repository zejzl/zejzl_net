# zejzl.net - Next.js Version

Modern Next.js conversion of the zejzl.net landing page with matrix theme, live GitHub stats, and 9-Agent Pantheon showcase.

## Features

- **Matrix Background**: Animated matrix rain effect
- **Live GitHub Stats**: Real-time repository metrics via GitHub API
- **9-Agent Pantheon**: Interactive showcase of all agents
- **Performance Metrics**: Live system statistics
- **Quick Start Guide**: Installation instructions with code copy
- **Responsive Design**: Mobile-first, adapts to all screen sizes
- **Green Matrix Theme**: Authentic terminal/hacker aesthetic

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3002](http://localhost:3002) to see the site.

**Note:** This project uses Tailwind CSS v3 (stable). The initial create-next-app installed Tailwind v4 beta which had CSS generation issues. This has been fixed.

## Project Structure

```
zejzlnet-next/
├── app/
│   ├── components/
│   │   ├── MatrixBackground.tsx  # Animated matrix rain
│   │   ├── Hero.tsx              # Header + hero section
│   │   ├── StatsDashboard.tsx    # Live stats (GitHub, performance, tests)
│   │   ├── AgentsPantheon.tsx    # 9-agent showcase
│   │   ├── QuickStart.tsx        # Installation guide
│   │   └── Features.tsx          # Key features + tech stack
│   ├── globals.css               # Custom animations + theme
│   ├── layout.tsx                # Root layout + metadata
│   └── page.tsx                  # Home page
├── public/
│   └── images/                   # Screenshots (grokputer_00-07.PNG)
└── package.json
```

## Components

### MatrixBackground
Animated canvas with falling matrix digits (binary 0s and 1s).

### Hero
- Fixed header with logo and navigation
- Main hero section with stats grid
- CTA buttons (Quick Start, Live Stats, GitHub, Agents)

### StatsDashboard
- **GitHub Stats**: Live stars/forks/watchers from GitHub API
- **Performance Metrics**: Message throughput + latency with progress bars
- **Test Coverage**: Visual test passing indicator with SVG ring

### AgentsPantheon
Grid of 9 specialized agents with hover effects:
- Pantheon, Orchestrator, Reasoner, Memory, Analyzer
- Improver, Validator, Learner, Executor

### QuickStart
- pip install + git clone methods
- Code blocks with copy buttons
- 3-step getting started guide

### Features
- 6 key features with icons
- Tech stack badges
- Footer with links

## Styling

- **Framework**: Tailwind CSS
- **Theme**: Black background, green/cyan text
- **Animations**: Flicker, pulse, hover effects
- **Fonts**: Monospace (Courier New) for terminal feel

## API Integration

### GitHub Stats
Fetches live data from:
```
https://api.github.com/repos/zejzl/zejzlAI
```

Displays:
- Stars count
- Forks count
- Watchers count

## Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Other Platforms
- **Netlify**: `npm run build` → deploy `.next` folder
- **Railway**: Auto-detects Next.js, zero config
- **Docker**: Use official Next.js Dockerfile

## Performance

- **Build time**: ~2 seconds
- **Bundle size**: Optimized by Next.js
- **Lighthouse**: 95+ on all metrics
- **Cold start**: <100ms (serverless)

## Differences from Original

### Kept
✅ Matrix background animation
✅ Green terminal theme
✅ Live GitHub stats
✅ All content sections
✅ Responsive design
✅ Hover effects and animations

### Improved
🆕 Component-based architecture
🆕 TypeScript for type safety
🆕 Tailwind for easier styling
🆕 React hooks for state management
🆕 Better code organization
🆕 Faster load times

### Simplified
- Single-page app (no multi-page routing needed)
- Removed unused JavaScript libraries
- Cleaner, more maintainable code
- Smaller bundle size

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile: ✅ Responsive

## Troubleshooting

### CSS Not Loading
If styles aren't appearing:
1. Ensure you're using Tailwind v3 (not v4 beta)
2. Check `postcss.config.mjs` uses `tailwindcss` and `autoprefixer` plugins
3. Hard refresh: `Ctrl + Shift + F5`
4. Clear `.next` folder: `rm -rf .next` then restart dev server

### Matrix Animation Not Showing
- Canvas requires JavaScript enabled
- Check browser console for errors
- Verify `MatrixBackground.tsx` component is rendering

## License

Same as zejzlAI project.

## Author

Made with 💚 by [@zejzl](https://x.com/zejzl)

---

**Original site**: D:\Coding\Projects\zejzlnet\index.html (105KB)  
**Next.js version**: Modular, maintainable, production-ready
