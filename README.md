# Welcome Restaurant | Authentic South Indian Pure Vegetarian Dining

> An authentic South Indian pure vegetarian restaurant web application inspired by four decades of temple culinary heritage (Estd. 1982). Built based on Stitch project prompt (`6807564010636195436`).

![Design System](https://img.shields.io/badge/Design_System-Dakshin_Saffron_%26_Stone-d35400)
![Theme](https://img.shields.io/badge/Theme-100%25_Pure_Vegetarian-2d6a4f)
![HTML5](https://img.shields.io/badge/HTML5-Modern_Semantic-e34f26)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-CDN_Configured-38bdf8)
![Vanilla JS](https://img.shields.io/badge/JavaScript-ES6+-f7df1e)

---

## 🌟 Overview

**Welcome Restaurant** celebrates South Indian vegetarian temple cuisine:
- **Heirloom Recipes:** Stretched paper roast ghee dosas, jasmine-soft mallipoo idlies, lacy Kerala appams, melting ven pongal, and authentic Kumbakonam degree filter kaapi.
- **The Three Sacred Pillars:** 
  1. *Cool Granite Stone Grinding (Aatukal)* with 14-hour natural wild fermentation.
  2. *Single-Origin Spices & Wood-Churned A2 Cow Ghee* (Alleppey cardamom, Guntur chillies, Tellicherry peppercorns).
  3. *100% Pure Vegetarian Sanctuary* adhering to satvik kitchen principles (zero animal products, dedicated vessels).
- **Service Rituals:** Banana leaf thalis, afternoon tiffins, and filter kaapi in heavy brass dabarahs.

---

## 📁 Project Structure

```text
├── index.html        # Home: Hero showcase, Grand Heirlooms Bento, Craftsmanship pledge, Tiffin specials, Instant booking
├── menus.html        # Signature Menus: Live search, category filters, dietary toggles (Jain/Vegan), ordering
├── about.html        # Our Story: 1982 origins, master chefs, interactive daily rituals switcher, circular garden
├── contact.html      # Contact & Reservation: Multi-step booking engine, estate map, banquet & catering requests
├── styles.css        # Custom design system tokens, typography (Newsreader & Plus Jakarta Sans), pure veg badges, animations
├── app.js            # Unified engine: E-commerce cart, drawer, checkout modal, booking system, toasts, search filter
└── README.md         # Project documentation
```

---

## ✨ Features & Functionality

1. **Persistent E-Commerce Cart:**
   - Saved across page navigations in `localStorage`.
   - Slide-over cart drawer with live quantity adjustments (`+` / `−` / delete).
   - Automated bill breakup: Subtotal, 5% Sattvic GST, Delivery/Packaging calculation, and Total.

2. **Interactive Checkout Flow:**
   - Switch between **Doorstep Delivery** and **Table Dine-in**.
   - Input fields with real-time validation, payment method selector (UPI, Card, Cash).
   - Instant order confirmation modal with unique order ID (e.g. `WR-849201`) and prep timer.

3. **Multi-Step Table Reservation Engine:**
   - Select party size, visit date, session window (Breakfast, Lunch Thali, Evening Tiffin, Dinner Feast), and dining zone (*Traditional Banana Leaf Hall*, *AC Family Salon*, *Verandah Courtyard*).
   - Generates a booking reference code (e.g. `WR-RES-5192`) with SMS/WhatsApp confirmation simulation.

4. **Live Search & Dietary Filter Engine (`menus.html`):**
   - Real-time search across dish titles, descriptions, and regional tags.
   - Category navigation pills (*Morning Tiffin*, *Royal Thalis*, *Evening Snacks*, *Filter Kaapi & Brews*).
   - Instant toggles for **Jain Friendly** (no onion/garlic/root veg) and **Pure Vegan**.

5. **Interactive Story Switcher (`about.html`):**
   - Live tab switcher revealing heritage details, photos, and badges for each dawn ritual.

6. **Mobile First Responsive Design:**
   - Full slide-out navigation drawer on mobile and tablet devices.
   - Tailored typography and touch-friendly interactive targets.

---

## 🚀 Running Locally

You can serve this project with any static HTTP server:

### Using Python:
```bash
python -m http.server 8080
```
Then open [http://localhost:8080/index.html](http://localhost:8080/index.html) in your browser.

### Using Node / npx:
```bash
npx serve .
```

---

## 📜 License & Credits

- Designed from Stitch project prompt `6807564010636195436`.
- Typography: [Newsreader](https://fonts.google.com/specimen/Newsreader) & [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) via Google Fonts.
- Icons: [Google Material Symbols Outlined](https://fonts.google.com/icons).
