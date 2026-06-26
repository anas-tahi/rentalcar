# 🚗 DriveES — Premium Car Rental Spain

A full-stack car rental management platform built with **React**, **Node.js**, and a **microservices** architecture. Users can browse cars, make reservations, and pay via PayPal or Stripe. Admins get a full dashboard with analytics, car management, and booking oversight.

### 🌐 [Live Demo → drivees-frontend.onrender.com](https://drivees-frontend.onrender.com)

> ⚠️ Free tier — services may take ~30 seconds to wake up on first visit.

---

## 📸 Screenshots

### Home
![DriveES Home](https://raw.githubusercontent.com/anas-tahi/rentalcar/main/screenshots/home.png)

### Fleet
![DriveES Fleet](https://raw.githubusercontent.com/anas-tahi/rentalcar/main/screenshots/fleet.png)

---

## ✨ Features

| Feature | Details |
|---|---|
| 🔐 Authentication | JWT-based login/register, role-based access (Admin / User) |
| 🚗 Car Catalogue | Browse, filter, and search cars by brand, type, and price |
| 📅 Bookings | Date-range reservation with conflict detection |
| 💳 Payments | PayPal Sandbox + Stripe integration |
| 📊 Admin Dashboard | Analytics, car CRUD, booking management |
| 🌐 i18n | English & French language support |
| 📱 Responsive | Mobile-friendly UI with Tailwind + MUI |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────┐
│              React Frontend :3000            │
└──────────────────────┬──────────────────────┘
                       │ HTTP
┌──────────────────────▼──────────────────────┐
│           API Gateway :5000                  │
│   (JWT auth, rate limiting, routing)         │
└──┬──────────┬──────────┬──────────┬─────────┘
   │          │          │          │
:3001      :3002      :3003      :3004
Auth       Cars      Booking   Payment
Service   Service    Service   Service
(MongoDB) (In-mem)  (In-mem)  (PayPal/Stripe)
```

---

## 🚀 Quick Start

### Option A — One command (recommended)

```bash
# 1. Clone and enter the project
git clone https://github.com/anas-tahi/rentalcar.git
cd rentalcar

# 2. Copy and fill in environment variables
cp .env.example .env
# → Edit .env with your MongoDB URI, JWT secret, and PayPal keys

# 3. Install all dependencies at once
npm install        # installs concurrently
npm run install:all

# 4. Start everything (frontend + all 5 backend services)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

### Option B — Docker (no Node.js required)

```bash
cp .env.example .env
# → Edit .env

docker compose up --build
```

Open [http://localhost:3000](http://localhost:3000)

---

### Option C — Manual (6 terminals)

<details>
<summary>Click to expand</summary>

```bash
# Terminal 1 — Auth Service
cd backend/auth-service && npm install && npm start

# Terminal 2 — Car Service
cd backend/car-service && npm install && npm start

# Terminal 3 — Booking Service
cd backend/booking-service && npm install && npm start

# Terminal 4 — Payment Service
cd backend/payment-service && npm install && npm start

# Terminal 5 — API Gateway
cd backend/api-gateway && npm install && npm start

# Terminal 6 — Frontend
cd frontend && npm install && npm start
```

</details>

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env` and fill in:

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for signing tokens (use a long random string) |
| `PAYPAL_CLIENT_ID` | PayPal sandbox client ID |
| `PAYPAL_CLIENT_SECRET` | PayPal sandbox client secret |
| `STRIPE_SECRET_KEY` | Stripe test secret key (optional) |

> 💡 Get a free MongoDB cluster at [cloud.mongodb.com](https://cloud.mongodb.com)
> 💡 Get PayPal sandbox keys at [developer.paypal.com](https://developer.paypal.com/dashboard/)

---

## 🔑 Demo Credentials

| Role | Email | Password |
|---|---|---|
| Admin | admin@rentalcar.com | password |
| User | user@rentalcar.com | password |

> ⚠️ These are for demo only. Change them before any real deployment.

---

## 📡 API Reference

All requests go through the **API Gateway** on port `5000`.

### Auth
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | ❌ | Create account |
| POST | `/api/auth/login` | ❌ | Login, returns JWT |
| POST | `/api/auth/logout` | ❌ | Logout |
| GET | `/api/auth/users/:id` | ✅ | Get user by ID |

### Cars
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/cars` | ❌ | List all cars (supports `?brand=&type=`) |
| GET | `/api/cars/:id` | ❌ | Get car details |
| POST | `/api/cars` | 🔒 Admin | Add a car |
| PUT | `/api/cars/:id` | 🔒 Admin | Update a car |
| DELETE | `/api/cars/:id` | 🔒 Admin | Delete a car |

### Reservations
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/reservations` | ✅ | Create booking |
| GET | `/api/reservations` | ✅ | List all bookings |
| GET | `/api/reservations/user/:userId` | ✅ | My bookings |
| PUT | `/api/reservations/:id` | ✅ | Update booking |
| DELETE | `/api/reservations/:id` | ✅ | Cancel booking |

### Payments
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/payment/paypal/create-order` | ✅ | Create PayPal order |
| POST | `/api/payment/paypal/capture-order` | ✅ | Capture PayPal payment |
| POST | `/api/payment/stripe/create-intent` | ✅ | Create Stripe payment intent |

---

## 🗂️ Project Structure

```
rentalcar/
├── .env.example              ← copy to .env
├── docker-compose.yml        ← run everything with Docker
├── package.json              ← root scripts (npm run dev / install:all)
├── screenshots/              ← README screenshots
│
├── backend/
│   ├── api-gateway/          ← Single entry point (port 5000)
│   ├── auth-service/         ← JWT auth + MongoDB (port 3001)
│   ├── car-service/          ← Cars CRUD (port 3002)
│   ├── booking-service/      ← Reservations (port 3003)
│   └── payment-service/      ← PayPal + Stripe (port 3004)
│
└── frontend/                 ← React app (port 3000)
    ├── src/
    │   ├── Api/              ← API request helpers
    │   ├── Context/          ← Auth context
    │   ├── Pages/            ← Page-level components
    │   ├── components/       ← Reusable UI components
    │   ├── scenes/           ← Dashboard scenes (admin/user)
    │   └── routes/           ← React Router config
    └── public/
        └── locales/          ← i18n translation files (en, fr)
```

---

## 🛠️ Tech Stack

**Frontend:** React 18, React Router, MUI, Tailwind CSS, Framer Motion, i18next, Stripe.js, PayPal JS SDK, Recharts / Nivo

**Backend:** Node.js, Express, JWT, bcrypt, Mongoose, http-proxy-middleware

**Database:** MongoDB Atlas (auth), in-memory store (cars, bookings)

**Payments:** PayPal Checkout SDK, Stripe

**Deployment:** Render (6 services)

---

## 📄 License

MIT
