# 🤖 AgentPulse AI — Autonomous AI Workforce for Small Businesses

> Cutting-edge agency web platform demonstrating and deploying bespoke multi-agent AI systems for local enterprises: **Restaurants, Fashion Boutiques, Grocery & Fresh Markets, Auto Repair Shops, Real Estate Brokerages, Construction Contractors**, and more.

Built with **React 19**, **Vite 8**, **Tailwind CSS v4**, and **Lucide Icons**. Pre-configured with zero-configuration deployment for **Vercel** and **GitHub**.

---

## ✨ Features & Architecture

- **Interactive Dynamic Mouse System**:
  - Smooth fluid luminescence spotlight tracking pointer movement with lerp interpolation.
  - Linear/Stripe-style dynamic card border lighting mapped to `--mouse-x` and `--mouse-y`.
  - High-performance HTML5 2D Canvas interactive neural connection particle mesh with repulsion and line bonding physics.
  - One-click toggle switch to enable/disable particle effects.
- **6 Core Industry Showcases**:
  - High-fidelity curated visual showcases with real-world case studies for Restaurants, Fashion Retail, Grocery Markets, Mechanic Shops, Real Estate, and Construction.
  - Detailed autonomous agent specifications and native POS/CRM integration mapping (Toast, Square, Shopify, Lightspeed, Tekmetric, Mitchell1, Follow Up Boss, Procore, etc.).
- **Interactive AI Agent Simulator & Chat Sandbox**:
  - Live testing console with sub-second typing simulation, internal reasoning engine action tokens, and industry quick prompts.
- **Small Business ROI & Labor Savings Calculator**:
  - Real-time sliders for monthly call volume, hourly staff rates, and daily admin hours.
  - Real-time calculations of monthly payroll savings, recovered hours, and bonus revenue with confetti feedback.
- **4-Step Deployment Pipeline**:
  - Visual breakdown of domain intelligence audit, custom model tuning, omnichannel integration, and autonomous execution.
- **Enterprise Bento Grid**:
  - Sub-400ms Voice AI with animated audio waveform, zero-hallucination guardrails, and 95+ language multi-dialect fluency.
- **Custom Agent Blueprint Configurator Modal**:
  - 3-step interactive onboarding modal capturing business vertical, operational bottlenecks, and contact details with instant blueprint delivery.

---

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 3. Build for Production
```bash
npm run build
```

---

## 🌐 How to Push to GitHub & Deploy on Vercel

### Step 1: Initialize Git Repository
In your terminal, inside this directory (`c:\Users\jacob\OneDrive\Openaiearly`):
```bash
git init
git add .
git commit -m "feat: Initial commit for AgentPulse AI platform"
git branch -M main
```

### Step 2: Link to Your GitHub Repository
Create a new repository on [GitHub](https://github.com/new) (e.g., `agentpulse-ai`), then run:
```bash
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>.git
git push -u origin main
```

### Step 3: Deploy to Vercel in 60 Seconds
1. Go to [vercel.com](https://vercel.com) and log in.
2. Click **"Add New..."** -> **"Project"**.
3. Select your GitHub repository (`agentpulse-ai`).
4. Framework Preset will automatically detect **Vite**.
5. Click **"Deploy"**.

Your website will be live globally on a custom `*.vercel.app` domain with continuous deployment enabled!

---

## 🛠️ Project Structure

```
c:\Users\jacob\OneDrive\Openaiearly/
├── index.html                   # HTML entrypoint & typography fonts
├── vercel.json                  # Single-page app rewrites for Vercel
├── package.json                 # Dependencies & build scripts
├── vite.config.js               # Vite + React + Tailwind v4 config
├── src/
│   ├── main.jsx                 # React root mount
│   ├── App.jsx                  # Main application orchestrator
│   ├── index.css                # Futuristic theme, spotlight effects, scrollbars
│   ├── data/
│   │   └── agencyData.js        # High-res photos, agent specs, prompts, ROI benchmarks
│   └── components/
│       ├── MouseEffect.jsx      # Fluid spotlight, dynamic CSS vars, neural canvas
│       ├── Navbar.jsx           # Glassmorphism header with status radar badge
│       ├── Hero.jsx             # Headline, live call simulator, impact metrics
│       ├── IndustryShowcase.jsx # 6 SMB verticals deep-dive with photos & agents
│       ├── AgentPlayground.jsx  # Live interactive AI sandbox & action tokens
│       ├── RoiCalculator.jsx    # Real-time financial & hours saved sliders
│       ├── WorkflowSection.jsx  # 4-phase deployment pipeline
│       ├── BentoGrid.jsx        # Sub-400ms voice AI, guardrails & integrations
│       ├── ClientStories.jsx    # Verified testimonials & business metrics
│       ├── BlueprintModal.jsx   # 3-step custom agent configurator with confetti
│       └── Footer.jsx           # Tech agency footer & deployment badges
```

---

© AgentPulse AI Inc. Designed for Autonomous Local Enterprises.
