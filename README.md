# 🌿 Padayal - Pranic Raw-Vegan Web & Mobile Application

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://padayal-cafe.vercel.app)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/navneethvaradharaj11-dev/Padayal-Cafe)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

A modern, mobile-first, production-ready Restaurant Web & Mobile Application for **Padayal** — South India's renowned **"No Oil, No Boil"** live food dining concept. Crafted with React, TypeScript, Tailwind CSS, and persistent context providers.

---

## 🌟 Live Demo & Links

- 🚀 **Live Production Application**: [https://padayal-cafe.vercel.app](https://padayal-cafe.vercel.app)
- 📦 **GitHub Repository**: [https://github.com/navneethvaradharaj11-dev/Padayal-Cafe](https://github.com/navneethvaradharaj11-dev/Padayal-Cafe)

---

## 🎨 Pranic Raw-Vegan Color Palette & Design System

The visual theme strictly follows an organic, earth-toned **Pranic Raw-Vegan** aesthetic:

| Token | Semantic Color Name | Hex Code | Purpose |
| :--- | :--- | :--- | :--- |
| **Primary** | Leafy Banana Green | `#2B7A4B` | Headers, Brand Logo, Primary Buttons |
| **Action / CTA** | Heritage Terracotta Brown | `#965A38` | Order CTA Buttons, Highlights |
| **Secondary Accent** | Muted Sage / Lemongrass | `#8A9A5B` | Badges, Tags, Active Indicators |
| **Background** | Raw Coconut Milk | `#FAF8F5` | Neutral Body Canvas |
| **Surface Container** | Pure Crisp White | `#FFFFFF` | Cards, Modals, Drawers |
| **Typography Base** | Deep Forest Shadows | `#112415` | Titles & High Contrast Body Text |

### 🖋️ Typography Hierarchy
- **Sans Base**: `Plus Jakarta Sans`
- **Display Headings**: `Outfit`
- **Pranic Titles**: `Fraunces`
- **Handwritten Accent**: `Caveat`

---

## 🔥 Key Modules & Features

### 1. 🥗 Interactive Gourmet Menu Catalog
- **Category Filter Tabs**: Horizontal scrollable categories (*All Catalog, Raw Salads, Pranic Mains, Cold Press & Elixirs, Raw Desserts, Herbal Soups, Chef Specials*).
- **Dietary Preference Pills**: Filter by `🌿 No Oil`, `🔥 Fire-Free`, `🥑 Raw Vegan`, `🌾 Gluten-Free`, `⭐ Chef Special`.
- **Search Engine**: Real-time instant search bar for dish names, descriptions, and raw ingredients.

### 2. 🛠️ Item Customization Modal
- **Portion Size Selector**: Regular / Sharing Bowl with price modifiers.
- **Fresh Add-ons**: Multi-select raw ingredients (*Raw Coconut Dip, Organic Sprouted Gram, Pomegranate Crunch*).
- **Chef Notes**: Special preparation instructions and allergy notes.
- **Dynamic Price Calculator**: Calculates total item cost live based on portion size, add-ons, and quantity.

### 3. 🛒 Order System & Slide-Over Cart Drawer
- **Order Type Selector**: Toggle between **Dine-In (Table #)**, **Takeaway**, and **Delivery (Address Input)**.
- **Promo Code Validation**: Supports instant promo validation for:
  - `PADAYAL10` — 10% OFF
  - `PRANIC20` — 20% OFF
  - `FIRSTRAW` — Flat ₹75 OFF
- **Staff Tip Selector**: Interactive tip buttons (0%, 10%, 15%, 20%).
- **Bill Breakdown**: Transparent breakdown for Subtotal, Promo Savings, Delivery Fee, 5% GST, Staff Tip, and Grand Total.
- **Checkout Flow**: Checkout page supporting UPI (GPay/PhonePe), Apple Pay, Card, and Cash.

### 4. ⏱️ Live Kitchen Order Tracker
- **4-Stage Progress Timeline**: Visual progress tracking (*Confirmed ➔ In Kitchen ➔ Ready / On Way ➔ Served / Delivered*).
- **Real-Time Countdown Timer**: Live preparation countdown clock.
- **Quick Action Buttons**: View digital receipt summary & direct restaurant call.

### 5. 📅 Instant Table Reservation System
- **Booking Form**: Select Date, Party Size (1 to 10+ guests), Time Slot, and Seating Environment (*Indoor Pranic Hall, Garden Patio, Sky Rooftop*).
- **Confirmation Reference**: Generates unique booking reference code (e.g. `#RES-9402`).

### 6. 📱 Mobile-First App Container Layout
- **Smartphone Container Layout**: Centered mobile app width card container layout with soft organic background canvas.
- **Sticky Bottom Navigation**: Quick tab switching (*Home, Menu, Live Tracking, Reservation, Cart Drawer*).
- **State Persistence**: Cart items and placed order state back up to `localStorage` automatically.

---

## 📂 Folder Structure

```
padayal-restaurant-app-development/
├── src/
│   ├── components/
│   │   ├── cart/            # CartDrawer & TipSelector
│   │   ├── common/          # BottomNav & ItemCustomizerModal
│   │   ├── layout/          # Header, Footer, Layout wrapper
│   │   ├── reservation/     # TableBookingForm
│   │   ├── tracking/        # OrderStatusTimeline
│   │   └── ui/              # Skeletons & reusable UI elements
│   ├── config/              # Restaurant info & promo code rules
│   ├── context/             # CartContext & OrderContext
│   ├── lib/                 # Supabase client with safe fallback
│   ├── pages/               # Application views (HomePage, MenuPage, CartCheckoutPage, etc.)
│   ├── types/               # TypeScript interfaces (menu, cart, order, reservation)
│   ├── utils/               # Currency formatting & total calculation utilities
│   ├── App.tsx              # React Router setup & Context Wrappers
│   ├── index.css            # Base Tailwind styles & custom fonts
│   └── main.tsx             # Entry point
├── index.html               # Google Fonts preconnect & HTML entry
├── tailwind.config.js       # Semantic color tokens & typography setup
├── vite.config.ts           # Vite build configuration
└── package.json             # Project dependencies & scripts
```

---

## 🛠️ Local Development Setup

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Step-by-Step Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/navneethvaradharaj11-dev/Padayal-Cafe.git
   cd Padayal-Cafe
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   The local application will be available at `http://localhost:5173`.

4. **Production Build & Verification**:
   ```bash
   npm run build
   ```
   Output bundle generated in the `dist/` directory.

---

## 🚀 Deployment

### Deploying to Vercel
```bash
npx vercel --prod
```

### Git Commit & Push
```bash
git add .
git commit -m "feat: update documentation and mobile app features"
git push origin main
```

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
