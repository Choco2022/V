# Velora — Full Implementation Blueprint

Velora is a SaaS platform that allows individual sellers to instantly create customizable mini-stores with shareable links, integrated payments, and order tracking.

## 1) Project Overview

### Goals
- Low-cost store creation
- Mobile-first, social-commerce-friendly experience
- Automated payment and commission handling (2–3%)
- Easy-to-manage seller dashboard
- Scalable and secure backend architecture

---

## 2) Branding & Identity

### Logo Concept
- Simple, modern, stylized **“V”** forming a mini-store outline
- Works on white background or primary navy backdrop

### Color Palette

| Color Name | Hex | Usage |
|---|---|---|
| Deep Navy | `#0A1F44` | Primary, navbar, footer |
| Vibrant Teal | `#00C2A8` | CTA buttons, highlights |
| Cool Blue | `#123A73` | Secondary accents |
| Soft Mint | `#E6FFFA` | Backgrounds, subtle highlights |
| Light Gray / White | `#F8F9FA` | Store page backgrounds |

### Typography
- Headings: **Poppins** / **Montserrat**
- Body: **Inter** / **Roboto**

### Brand Voice
Friendly, professional, and empowering to small sellers.

---

## 3) UI/UX Wireframe Blueprint

### A. Homepage (Seller Acquisition)
- Navbar: Logo, Login, Create Store CTA
- Hero: Headline, subheadline, primary CTA
- How it Works: Sign up → Customize Store → Share & Sell
- Features: Custom link, secure payments, order management, dashboard
- Why Choose Us: Low fees, no website cost, mobile friendly
- Pricing:
  - Free: 3% fee
  - Premium: 2% fee + custom domain
- CTA: “Start Selling Today”
- Footer: About, T&C, social links

### B. Seller Dashboard
- Sidebar: Overview, Products, Orders, Analytics, Store Customization, Settings
- Header: Store name, notifications, profile menu, View Store button
- Overview cards: Total sales, orders, revenue, pending orders
- Product management: Add/Edit/Delete products
- Orders: View details, update status
- Store customization: Logo, banner, theme, description, contact info
- Settings: Payment setup, transaction fees, upgrade plan

### C. Store Landing Page
- Top nav: Logo, store name, search, cart
- Hero banner: Banner image, tagline, CTA
- Store info: Description, contact info, social links
- Product grid: Image, name, price, add-to-cart
- Product detail: Large image, details, quantity selector, add-to-cart
- Cart drawer: Selected items, subtotal, proceed to checkout
- Footer: Policies, terms, “Powered by Velora”

### D. Checkout Page
- Order summary: Product list, subtotal, total amount
- Customer info: Name, email, phone, address, city, state
- Payment: Paystack integration + secure checkout + Pay Now
- Confirmation: Payment success, order ID, delivery estimate, return to store

### E. Mobile-First Flows
- **Seller**: Onboarding → Store creation → Customize → Add products → Share → Dashboard
- **Buyer**: Browse → Store page → Product detail → Add to cart → Checkout → Pay → Confirmation → Track

---

## 4) Backend Architecture

```text
React Frontend (Web & Mobile)
        │
Node.js + Express API
        │
├── MongoDB Atlas
│   ├── Users Collection
│   ├── Stores Collection
│   ├── Products Collection
│   └── Orders Collection
├── Firebase Auth & Notifications
│   ├── Authentication
│   └── Cloud Messaging
└── Payment Gateway (Paystack)
    └── Transaction handling (2–3% commission)
```

### Responsibilities
- Seller and buyer authentication + role management
- CRUD for products, stores, and orders
- Transaction processing + commission deduction
- Push notifications to sellers and buyers
- Analytics and revenue tracking
- Path to microservice separation for scale

---

## 5) Production Database Schema

### Users
- `_id`
- `name`
- `email`
- `phone`
- `role` (`seller` | `buyer`)
- `createdAt`

### Stores
- `_id`
- `ownerId`
- `storeName`
- `logo`
- `banner`
- `themeColor`
- `description`
- `contactInfo`
- `socialLinks`
- `createdAt`

### Products
- `_id`
- `storeId`
- `name`
- `description`
- `price`
- `discount`
- `stock`
- `images`
- `createdAt`

### Orders
- `_id`
- `storeId`
- `buyerId`
- `products[]`
- `totalAmount`
- `status` (`pending` | `shipped` | `delivered`)
- `transactionId`
- `createdAt`

---

## 6) Legal T&C Highlights
- Sellers are responsible for their store content and compliance
- 2–3% transaction fee is automatically deducted
- Paystack is the payment processor
- Platform not liable for product quality/delivery
- Data retention follows local regulations
- Governing law defaults to Nigerian law (adjust per market)

---

## 7) Revenue Model
- **Primary**: 2–3% commission per successful sale
- **Future**: Premium subscription (branding, analytics, marketing tools)

---

## 8) Go-to-Code Implementation Stack

### Frontend
- React + Tailwind (Vite or Next.js)
- Mobile-first responsive design
- Component-based UI (Navbar, Cards, ProductGrid, Modals, Drawer, Dashboard)
- API integration via Axios / React Query

### Backend
- Node.js + Express
- MongoDB with Mongoose schemas
- Firebase Auth for auth and notifications
- Paystack integration for payments

### Deployment
- Frontend: Vercel
- Backend: Render / Railway / Heroku
- Database: MongoDB Atlas
- Notifications: Firebase Cloud Messaging

---

## 9) Implementation Roadmap

| Phase | Tasks |
|---|---|
| Phase 1 | Setup repo, environment, DB, auth |
| Phase 2 | Seller onboarding, store creation, dashboard |
| Phase 3 | Buyer browsing, product grid, cart |
| Phase 4 | Checkout, Paystack integration, notifications |
| Phase 5 | Mobile-first responsive refinements |
| Phase 6 | Testing (unit + integration + payment) |
| Phase 7 | Deployment and launch |

---

## 10) User Journey Flow (Visual)

### Mermaid Diagram

```mermaid
flowchart TD

%% Homepage
A[Homepage] --> B[Seller Sign Up / Login]
B --> C{"User Type?"}

%% Seller Flow
C -->|Seller| D[Seller Dashboard]
D --> E[Create & Customize Store]
E --> F[Add Products]
F --> G[Publish & Share Store Link]
G --> H[Seller Dashboard Analytics & Orders]

%% Buyer Flow
C -->|Buyer| I[Browse Stores]
I --> J[Store Landing Page]
J --> K[Product Details]
K --> L[Add to Cart]
L --> M[Checkout Page]
M --> N[Payment Processing (Paystack)]
N --> O[Order Confirmation]
O --> P[Track Order]
P --> Q[Rate & Review Store]

%% Backend Architecture
subgraph Backend
    R[Node.js + Express API] --> S[MongoDB Atlas]
    S --> S1[Users Collection]
    S --> S2[Stores Collection]
    S --> S3[Products Collection]
    S --> S4[Orders Collection]
    R --> T[Firebase Auth & Notifications]
    R --> U[Payment Gateway (Paystack)]
end

%% Connect flows to backend
B --> R
D --> R
E --> R
F --> R
G --> R
I --> R
K --> R
L --> R
M --> R
N --> R
O --> R
P --> R

%% Styling
style A fill:#0A1F44,stroke:#00C2A8,color:#E6FFFA
style D fill:#00C2A8,stroke:#123A73,color:#0A1F44
style I fill:#123A73,stroke:#00C2A8,color:#E6FFFA
style Backend fill:#0E2A5C,stroke:#00C2A8,color:#E6FFFA
```

### Figma / FigJam Build Steps
1. Create a new FigJam board.
2. Add five sections: Homepage, Seller, Buyer, Checkout, Backend.
3. Use rectangles for screens and arrows for transitions.
4. Label each screen with core elements (CTA, navbar, cards, buttons).
5. Apply role colors:
   - Sellers: Teal (`#00C2A8`)
   - Buyers: Blue (`#123A73`)
   - Backend: Dark Navy (`#0E2A5C`)
6. Add mobile-first annotations for each screen.
7. Connect Homepage → User Type → Seller/Buyer journeys → Backend services.

---

## 11) Definition of Done (MVP)
- Seller can sign up/login and create a store.
- Seller can add/edit/delete products.
- Buyer can browse store, add items to cart, and checkout.
- Payment succeeds via Paystack and order is recorded.
- Commission is deducted automatically.
- Seller and buyer receive order status notifications.
- Mobile UX is fully usable across common screen sizes.

