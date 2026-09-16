# Anirudh Ravichander — The Archival Sessions

> The official vinyl archive, World Tour portal, and YouTube Music vocal discography experience for Indian composer and musical maestro **Anirudh Ravichander**.

---

## Overview

**The Archival Sessions** is a responsive audio-visual web portal designed for fans, vinyl collectors, and audiophiles. It showcases Anirudh Ravichander's cinematic mass anthems, viral melodies, and high-energy stadium tracks with physical analog aesthetics, interactive 3D vinyl sleeves, and verified YouTube Music streaming integration.

---

## Core Features

- **Scroll-Driven Monolith Portal**:
  - Parting solid gate panels that respond smoothly to page scroll.
  - Physical 180g lacquer vinyl disc with spinning label and realistic concentric grooves.
  - Multi-camera concert stage background cross-fades and interactive stage look controls (`SCROLL MOTION`, `BEST OF ARTWORK`, `LIVE PERFORMANCE 1`, `LIVE PERFORMANCE 2`).
- **Throwable 3D Vinyl Sleeve Deck**:
  - 6 numbered collector's editions (`ANI-LTD-01` through `ANI-LTD-06`).
  - Interactive drag-and-throw card physics, flip sleeve mode, two-sided tracklists, and authentic vinyl runout groove matrix numbers.
- **YouTube Music Vocal Discography**:
  - 17 verified tracks vocalized and sung by Anirudh Ravichander (including *Hukum*, *Naa Ready*, *Badass*, *Fear Song*, *Hunter Vantaar*, *Arabic Kuthu*, *Vaathi Coming*, *Dheema*, *Chaleya*, and *Why This Kolaveri Di*).
  - Built-in docked web video/audio audition player with minimize, maximize, and next/previous controls.
  - Direct 1-click links to stream each master track on `music.youtube.com`.
  - Live search bar and category filters (*Mass*, *Dance*, *Romance*, *Latest*, *Classics*).
- **10 Latest Chartbusters**:
  - Verified metadata, release years, singers, lyric highlights, and stream statistics.
- **XV World Tour Itinerary**:
  - Stadium tour dates covering Chennai, London, Toronto, New York, Singapore, Sydney, and Kuala Lumpur with ticket reservation triggers.
- **Zero Unsolicited Audio**:
  - Page loads and scrolls silently by default. All sound and video playback are user-initiated and controllable.

---

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler & Dev Server**: Vite 6
- **Styling**: Tailwind CSS v4
- **Typography**: Syne (Display) & Sora (Body/Metrics)
- **Icons**: Lucide React
- **Animations**: Motion & CSS Transforms

---

## How to Build and Run

### Prerequisites

Ensure you have the following installed on your system:
- **Node.js**: Version `18.0.0` or higher (Node `20.x` or `22.x` recommended)
- **Package Manager**: `npm` (comes with Node.js), `yarn`, `pnpm`, or `bun`

---

### 1. Installation

Clone or extract the project files into your working directory, then install the dependencies:

```bash
# Using npm
npm install

# Or using pnpm
pnpm install

# Or using bun
bun install
```

---

### 2. Run Development Server

Start the local development server with hot reloading:

```bash
npm run dev
```

Open your browser and navigate to:
```
http://localhost:3000
```
*(If port 3000 is occupied, Vite will assign the next available port or use `--port=3000`)*.

---

### 3. Build for Production

Compile TypeScript and generate the optimized production static bundle in the `dist/` directory:

```bash
npm run build
```

This generates minified HTML, CSS, bundled JavaScript, and processed assets inside the `dist/` folder ready for deployment.

---

### 4. Preview the Production Build

Test the generated production build locally:

```bash
npm run preview
```

---

### 5. Type Checking and Linting

Validate that there are zero TypeScript compilation errors or broken imports:

```bash
npm run lint
```

---

## Deployment Options

The project compiles to a pure, high-performance static SPA. You can deploy the `dist/` directory to any modern web hosting service:

### Option A: Vercel / Netlify / Cloudflare Pages
1. Push your repository to GitHub, GitLab, or Bitbucket.
2. Import the repository in your Vercel or Netlify dashboard.
3. Configure the build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. Deploy.

### Option B: Google Cloud Run / Docker
To containerize the application:
```dockerfile
# Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Option C: GitHub Pages
Configure your GitHub Actions workflow to run `npm run build` and publish the `dist` directory to the `gh-pages` branch.

---

## Public Publishing & Standalone Note

- **Zero Watermarks**: The repository contains **no watermarks, banners, or Google AI Studio branding**. 
- Any interface chrome or header bars visible in the AI Studio editor environment (`ai.studio/build`) are part of the platform's preview wrapper. 
- Once built (`npm run build`) and deployed to production, opened in a standalone tab, or exported, the web application runs completely standalone and 100% white-labeled.

---

## Project Structure

```
├── index.html                  # HTML entry point with meta tags & Syne/Sora fonts
├── metadata.json               # Application descriptor
├── package.json                # Project dependencies & build scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite configuration with Tailwind CSS plugin
├── public/
│   ├── favicon.svg             # Custom vinyl emblem favicon
│   └── assets/
│       ├── best_of_anirudh.jpg # Sony Music official album artwork
│       ├── anirudh_live_1.jpg  # Arena stage performance image
│       ├── anirudh_live_2.jpg  # Stadium concert crowd image
│       └── anirudh_portrait.jpg# Spindle label portrait
└── src/
    ├── main.tsx                # Application mounting entry point
    ├── App.tsx                 # Root layout & orchestration
    ├── index.css               # Global Tailwind CSS styles & design tokens
    ├── types.ts                # TypeScript interfaces (SungSong, Release, etc.)
    ├── data/
    │   └── catalogue.ts        # Songs, vinyl editions, and tour data
    └── components/
        ├── Navigation.tsx      # Top bar navigation with anchor shortcuts
        ├── PortalHero.tsx      # Interactive scroll-bound vinyl portal
        ├── StatementFold.tsx   # Archival statement & physical manifesto
        ├── ThrowableDeck.tsx   # Interactive 3D draggable vinyl sleeve deck
        ├── YouTubeMusicSection.tsx # YouTube Music sung tracks & docked player
        ├── RosterAndDates.tsx  # World tour itinerary & artist roster
        └── CloseSection.tsx    # Archival closing wordmark & footer
```

---

## License & Credits

- Music, audio references, and official artwork &copy; Sony Music Entertainment India, Sun Pictures, Lyca Productions, T-Series, and Anirudh Ravichander.
- Archival interface design and code released under the **MIT License**.
