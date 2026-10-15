# AgentPulse AI

Marketing site for **AgentPulse AI**, a studio that designs, builds and deploys custom AI agents for small businesses: restaurants, fashion retail, grocery stores, auto repair shops, real estate brokerages and contractors. The agents answer phones, take bookings and orders, and handle dispatch around the clock.

Built with React 19, Vite 8, Tailwind CSS v4 and lucide-react icons. Deployed on Vercel.

## Features

- **Light, high-tech theme**: off-white canvas, crisp white cards, hairline borders, soft layered shadows and an indigo, cyan and violet brand gradient. Design tokens and shared component classes live in `src/index.css`.
- **Interactive cursor system** (`src/fx/`), running in `requestAnimationFrame` loops outside React:
  - **Signal field**: a canvas lattice behind the page that lens-warps and lights up around the cursor, revealing circuit links between neighbouring points. Clicks send a shockwave through it, and ambient signals wander the grid while the page is idle.
  - **Lock-on reticle cursor**: a precise dot with a spring-driven ring that snaps into a bracketed frame around buttons and links. Elements marked `data-magnetic` lean toward the pointer, and `data-cursor-label` shows a short tag.
  - **Spotlight cards**: `.spotlight-card` elements get a border and inner glow that track the pointer.
  - **Interactive FX toggle**: one click turns the effects on or off, and the choice is saved in `localStorage`.
  - Switched off automatically on touch devices and for visitors who prefer reduced motion.
- **Animated hero call demo** that cycles through live-style agent conversations.
- **Industry showcase** covering six verticals, with agent specs and integrations.
- **Agent sandbox** for trying sample prompts per industry.
- **ROI calculator** for labour savings and recovered hours.
- **Blueprint modal**: a three-step lead capture form (industry, bottlenecks, contact details) that posts to a configurable endpoint.

## Quick start

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev      # dev server at http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the production build locally
```

## Configuration

| Variable | Purpose |
| --- | --- |
| `VITE_LEAD_ENDPOINT` | URL that receives blueprint form submissions as a JSON `POST`, for example a Formspree form (`https://formspree.io/f/xxxxxxx`), a Zapier, Make or n8n webhook, or your own API route. The endpoint must allow CORS requests from the site's domain. |

Copy `.env.example` to `.env.local` for local development. If `VITE_LEAD_ENDPOINT` is not set, the form still completes but nothing is delivered: the browser console shows a warning and the confirmation screen makes no delivery promise.

Vite embeds `VITE_` variables in the public bundle at build time, so never use them for secrets.

## Deployment

The project deploys on Vercel, which detects the Vite preset automatically (build command `npm run build`, output directory `dist`).

- Pushes to `main` deploy to production.
- Pushes to any other branch, and pull requests, get their own preview deployment.
- Environment variables are set under **Project → Settings → Environment Variables**. Redeploy after changing them, because they are read at build time.
- `vercel.json` rewrites all routes to `index.html` for the single-page app.

## Project structure

```
agentpulse-ai/
├── index.html                  # Entry HTML: meta tags, favicon, Google Fonts
├── vercel.json                 # SPA rewrites for Vercel
├── vite.config.js              # Vite + React + Tailwind v4
├── .env.example                # Documented environment variables
└── src/
    ├── main.jsx                # React root
    ├── App.jsx                 # Page composition
    ├── index.css               # Design tokens, shared classes, FX styles
    ├── data/
    │   └── agencyData.js       # Industries, agents, prompts, stats, testimonials
    ├── fx/
    │   ├── pointer.js          # Shared pointer state, click and press events
    │   ├── signalField.js      # Canvas signal-field lattice
    │   ├── cursor.js           # Lock-on reticle cursor and magnetic elements
    │   └── spotlight.js        # Pointer-tracking spotlight cards
    ├── hooks/
    │   └── useReveal.js        # Scroll-reveal for [data-reveal] elements
    ├── lib/
    │   └── submitLead.js       # Sends blueprint leads to VITE_LEAD_ENDPOINT
    └── components/
        ├── MouseEffect.jsx     # Mounts the FX layer and the Interactive FX toggle
        ├── Navbar.jsx          # Sticky header with section tracking
        ├── Hero.jsx            # Headline, animated call demo, stats, integrations
        ├── IndustryShowcase.jsx
        ├── AgentPlayground.jsx # Agent sandbox
        ├── RoiCalculator.jsx
        ├── WorkflowSection.jsx # Four-step deployment process
        ├── BentoGrid.jsx       # Capabilities grid
        ├── ClientStories.jsx   # Testimonials
        ├── CtaBand.jsx         # Closing call to action
        ├── Footer.jsx
        └── BlueprintModal.jsx  # Three-step blueprint and lead capture dialog
```
