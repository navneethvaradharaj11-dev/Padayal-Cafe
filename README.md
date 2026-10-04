# Padayal Cafe — Natural Food Restaurant App

<p align="center">
  <img src="./assets/branding/padayal-logo.png" alt="Padayal Cafe logo representing the No Oil, No Boil natural food concept" width="180" />
</p>

<p align="center">
  A TypeScript-powered restaurant web app for <strong>Padayal</strong>, built around a
  <em>No Oil, No Boil</em> South Indian natural food dining experience.
</p>

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://padayal-cafe.vercel.app)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

## Project Overview

Padayal Cafe is a mobile-first React + TypeScript application for restaurant discovery, menu browsing, cart/checkout, reservations, and live order tracking. It also includes an authenticated admin area for managing operations content.

- **Live app:** https://padayal-cafe.vercel.app
- **Repository:** https://github.com/navneethvaradharaj11-dev/Padayal-Cafe

## Key Features

- Menu browsing with category and dietary-focused discovery
- Cart and checkout flow with order type selection, tips, and promo code support
- Live order status tracking flow
- Reservation booking flow
- Restaurant information pages (about, wellness, gallery, reviews, contact)
- Auth-protected admin dashboard and management routes
- Progressive Web App support (service worker + install prompt)

## Technology Stack

- **Frontend:** React 18, React Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Build tool:** Vite
- **Data/backend integration:** Supabase client (`@supabase/supabase-js`)
- **Linting/type safety:** ESLint, TypeScript (`tsc`)

## Prerequisites

- Node.js 18+
- npm 9+

## Installation & Setup

```bash
git clone https://github.com/navneethvaradharaj11-dev/Padayal-Cafe.git
cd Padayal-Cafe
npm install
```

## Environment Configuration

Create a `.env` file in the repository root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

If these variables are not set, the app uses placeholder defaults from `src/lib/supabase.ts`.

## Development Commands

```bash
npm run dev        # start local development server
npm run lint       # run ESLint
npm run typecheck  # run TypeScript checks
```

## Production Build

```bash
npm run build      # generate production bundle in dist/
npm run preview    # preview production build locally
```

## Project Structure

```text
Padayal-Cafe/
├── assets/                 # Repository assets (including README logo)
├── public/                 # Static assets served by Vite
├── src/
│   ├── components/         # UI, layout, cart, common, admin components
│   ├── config/             # Restaurant metadata and image configuration
│   ├── context/            # Cart and order state providers
│   ├── hooks/              # Reusable hooks (including auth)
│   ├── lib/                # Supabase client and shared integrations
│   ├── pages/              # Public and admin page routes
│   ├── types/              # TypeScript domain models
│   └── utils/              # Utility helpers (pricing, formatting, etc.)
├── supabase/migrations/    # Database schema migration files
└── package.json            # Scripts and dependencies
```

## Contributing

Contributions are welcome. Please open an issue or pull request with a clear description of the proposed change.

## License

This project is licensed under the [MIT License](LICENSE).
