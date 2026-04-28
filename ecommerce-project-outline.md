# Ecommerce Project — Build Plan

## Stack

| Layer | Tool |
|---|---|
| Backend + Admin | Medusa v2 |
| Database | PostgreSQL |
| Frontend | Next.js |
| Styling | Tailwind CSS |
| i18n | next-intl |
| Payments | Stripe (via Medusa plugin) |
| Frontend hosting | Vercel |
| Backend hosting | Railway |

---

## URLs

All pages are prefixed by language. `/` auto-redirects based on browser language, defaulting to `/en/`.

| Page | EN | LV |
|---|---|---|
| Homepage | `/en/` | `/lv/` |
| Drinks (product listing) | `/en/drinks` | `/lv/drinks` |
| Product detail | `/en/drinks/[slug]` | `/lv/drinks/[slug]` |
| About Us | `/en/about` | `/lv/about` |
| Private Label | `/en/private-label` | `/lv/private-label` |
| Contact Us | `/en/contact` | `/lv/contact` |
| Cart | `/en/cart` | `/lv/cart` |
| Checkout | `/en/checkout` | `/lv/checkout` |
| Order confirmation | `/en/order/confirmation` | `/lv/order/confirmation` |
| Shipping & Returns | `/en/shipping` | `/lv/shipping` |
| Privacy Policy | `/en/privacy` | `/lv/privacy` |

Nav links: Homepage, Drinks, About Us, Private Label, Contact Us.
Footer links: Shipping & Returns, Privacy Policy.

---

## Stage 1 — Functional Site

Goal: everything works, unstyled. Stage 2 is a visual pass on top of this.

### Step 1 — Local Setup

- [ ] Install Node.js v20+, PostgreSQL, Git
- [ ] Scaffold with `npx create-medusa-app@latest`
- [ ] Configure `.env` — local Postgres connection string + Stripe test keys
- [ ] Confirm Medusa admin runs at `localhost:9000/app`
- [ ] Confirm storefront runs at `localhost:8000`

### Step 2 — next-intl Setup

- [ ] Install and configure `next-intl`
- [ ] Set up `/en/` and `/lv/` routing via middleware
- [ ] Create `messages/en.json` and `messages/lv.json`
- [ ] Add all UI strings to both files (nav, buttons, labels, error messages)
- [ ] Add language switcher to nav

### Step 3 — Build Pages

Build in this order — shared layout first, then pages from simplest to most complex.

- [ ] Shared layout — nav + footer
- [ ] Homepage — hero, intro text, link to Drinks
- [ ] About Us — static text content
- [ ] Private Label — static text content, optional inquiry form
- [ ] Contact Us — contact form or contact details
- [ ] Shipping & Returns — static text
- [ ] Privacy Policy — static text
- [ ] Drinks — fetch product list from Medusa, display as grid
- [ ] Product detail — fetch single product, add to cart button
- [ ] Cart — display cart items, proceed to checkout
- [ ] Checkout — trigger Stripe Checkout redirect
- [ ] Order confirmation — display success message + order summary

### Step 4 — Commerce Integration

- [ ] Connect Next.js to Medusa JS client (`@medusajs/js-sdk`)
- [ ] Add products in Medusa admin (name, description, price, images — in both EN and LV)
- [ ] Install and configure Medusa Stripe plugin
- [ ] Wire up cart state (use Medusa's cart API)
- [ ] Test full purchase flow with Stripe test card `4242 4242 4242 4242`

### Step 5 — Deploy

- [ ] Push project to GitHub
- [ ] Deploy Medusa + PostgreSQL to Railway, set env vars
- [ ] Deploy Next.js to Vercel, set `NEXT_PUBLIC_MEDUSA_BACKEND_URL` to Railway URL
- [ ] Point custom domain to Vercel
- [ ] Switch Stripe to live mode
- [ ] Run end-to-end test on production

### Step 6 — Handover

- [ ] Create admin account for store manager in Medusa
- [ ] Walk them through adding/editing products and handling orders

---

## Stage 2 — Visual Design

Do this after Stage 1 is live and working.

- [ ] Finalise brand in Figma — colors, typography, spacing
- [ ] Set up Figma Variables for all design tokens
- [ ] Restyle pages one by one using Figma as reference
- [ ] Add custom fonts
- [ ] Polish mobile responsiveness and hover/transition states
