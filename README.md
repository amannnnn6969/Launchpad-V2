# launchpad Agency — Next.js Website

## Setup (takes 2 mins)

```bash
# 1. Install dependencies
npm install

# 2. Run locally
npm run dev
# → open http://localhost:3000

# 3. Build for production
npm run build
npm run start
```

## Deploy FREE on Vercel (recommended)

1. Push this folder to a GitHub repo
2. Go to vercel.com → "New Project" → import your repo
3. Click Deploy — done! You get a live URL instantly.
4. Connect a custom domain in Vercel dashboard settings.

## Project Structure

```
launchpad/
├── app/
│   ├── layout.tsx       # Root layout + metadata
│   ├── page.tsx         # Main page (assembles sections)
│   └── globals.css      # Theme variables + global styles
├── components/
│   ├── ThemeProvider.tsx # Light/dark mode context
│   ├── ThemeToggle.tsx   # Toggle button (bottom right)
│   ├── Cursor.tsx        # Custom cursor
│   ├── Navbar.tsx        # Sticky nav
│   ├── Hero.tsx          # Hero + Three.js 3D background
│   ├── Marquee.tsx       # Scrolling industries strip
│   ├── WhoWeHelp.tsx     # About + stats
│   ├── Services.tsx      # 6 service cards
│   ├── Portfolio.tsx     # 6 portfolio project cards
│   ├── Process.tsx       # 4-step process
│   ├── Contact.tsx       # Contact form
│   ├── CtaBanner.tsx     # CTA section
│   └── Footer.tsx        # Footer
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.mjs
```

## Customization

- **Agency name**: Search & replace "launchpad" across all files
- **Colors**: Edit `--accent` in `app/globals.css`
- **Contact info**: Edit `components/Contact.tsx`
- **Services**: Edit the `services` array in `components/Services.tsx`
- **Portfolio**: Edit the `projects` array in `components/Portfolio.tsx`
