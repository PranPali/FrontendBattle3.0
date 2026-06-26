# NexaFlow — AI Data Automation Platform
> Premium SaaS landing page built for the **Next-Gen AI Platform Speed Run** hackathon.

---



**Link:** https://frontend-battle3-0.vercel.app/
**Demo Video: https://drive.google.com/drive/folders/1OYatnKVDoP5tdeXr_Oyr7_XwvZYpA_1y**

---

##  What This Is

A high-converting, fully responsive landing page for an AI-driven data automation platform — engineered to pass both human design review and Chrome DevTools performance inspection simultaneously.

Every architectural decision maps to a scoring criterion:
- No hardcoded values
- No banned libraries
- No global re-renders
- No semantic shortcuts

---

## ⚙️ Core Features

### Feature 1 — Matrix-Driven Pricing Engine
A multi-dimensional configuration object drives all price computation across:
- **3 tiers** — Starter / Pro / Scale
- **2 billing cycles** — Monthly & Annual (20% discount)
- **3 currencies** — USD ($) / INR (₹) / EUR (€)

Toggling billing or currency mutates **only the target `<span>` text nodes** — zero parent re-renders. Verified clean under Chrome DevTools Performance tab.

### Feature 2 — Bento-to-Accordion with Context Lock
- **Desktop (≥768px)** — Asymmetric CSS Grid bento layout with hover state tracking per node
- **Mobile (<768px)** — Touch-optimized accordion, built from scratch with CSS `max-height` transitions
- **Context Lock** — Resize the window while hovering bento node `i` and the accordion opens at index `i` seamlessly via `ResizeObserver`

Zero external component libraries used. No Radix, no Headless UI, no Framer Motion.

---

##  Design System

### Color Palette
| Name | Hex |
|------|-----|
| Arctic Powder | `#F1F6F4` |
| Mystic Mint | `#D9E8E2` |
| Forsythia | `#FFC801` |
| Deep Saffron | `#FF9932` |
| Nocturnal Expedition | `#114C5A` |
| Oceanic Noir | `#172B36` |

### Typography
| Role | Font |
|------|------|
| Headers / Code / Prices | JetBrains Mono |
| Body / UI / Labels | Inter |

### Icons
All icons are **inlined SVGs** from the provided asset pack — no external icon library dependencies.

---

## 🏗️ Page Structure

```
<header>   — Navbar: logo, nav links, CTA
<main>
  <section id="hero">          — Hero area
  <section id="features">      — Bento / Accordion showcase
  <section id="social-proof">  — Testimonials / brand logos
  <section id="pricing">       — Pricing tier matrix
  <section id="cta">           — Final conversion CTA
<footer>   — Links, copyright
```

Semantic HTML5 throughout. No `<div>` soup at the top level.

---

## ⏱️ Motion Spec

| Interaction | Duration | Easing |
|---|---|---|
| Hover / toggle micro-interactions | 150–200ms | `ease-out` |
| Accordion open / close | 300–400ms | `ease-in-out` |
| Layout reflows | 300–400ms | `ease-in-out` |
| Full page entry sequence | **≤ 500ms** | CSS `@keyframes` / WAAPI |

All animations use native CSS transitions or the Web Animations API — no runtime animation engines.

---

## 🔍 SEO

- Full `<meta>` tags, Open Graph, Twitter Card
- Crawlable price text nodes (no canvas or image-based prices)
- Descriptive `alt` attributes on all images
- Clean semantic landmark structure for screen readers and crawlers

---

## 🛠️ Stack

- **Framework** — React
- **Styling** — Tailwind CSS + CSS custom properties
- **Animation** — Native CSS transitions + Web Animations API
- **State** — Scoped refs + direct DOM mutation (no global state for pricing)
- **Resize Detection** — `ResizeObserver` (no library)
- **Deployment** — Vercel

---

## 📦 Getting Started

```bash
# Clone the repo
git clone https://github.com/your-username/nexaflow-landing.git

# Move into the directory
cd nexaflow-landing

# Install dependencies
npm install

# Run dev server
npm run dev
```

---

## 📁 Project Structure

```
/
├── public/
│   └── og-image.png
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── BentoAccordion.jsx   ← Feature 2
│   │   ├── Pricing.jsx          ← Feature 1
│   │   ├── Testimonials.jsx
│   │   └── Footer.jsx
│   ├── data/
│   │   └── pricingMatrix.js     ← Single source of truth for all prices
│   ├── styles/
│   │   └── globals.css
│   └── App.jsx
├── index.html
└── README.md
```

