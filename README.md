# Denture Dental Clinic

A full-stack dental clinic web application built with the **MERN stack**. It connects patients to the clinic through a modern marketing site, smart appointment booking, and a secure admin panel for day-to-day operations.

**Live Demo**
- **Frontend:** [https://denture-dental-clinic.vercel.app](https://denture-dental-clinic.vercel.app)
- **Backend API:** _[add your Render URL after deployment]_

---

## Overview

Denture Dental Clinic streamlines how a dental practice handles online presence and patient intake:

- Patients browse services, learn about the clinic, send inquiries, and request appointments online.
- The clinic reviews pending requests, confirms or rejects slots, manages services, and tracks contact messages from a protected admin dashboard.
- Booking slots stay accurate in real time via WebSockets, with collision prevention and automated email notifications.

---

## Features

### Patient-facing website
- **Marketing pages:** Home, About, Services, Contact, and Book Appointment
- **Service catalog:** Browse treatments with pricing, descriptions, sub-categories, and images
- **Smart booking:** Date/service-based slot picker with live availability (`Available`, `Under review`, `Booked`)
- **Contact form:** Direct patient-to-clinic messaging with validation and success feedback
- **Polished UI:** Framer Motion page transitions, responsive Tailwind layout, testimonials, before/after showcase, and team section

### Appointment system
- **Request-based workflow:** New bookings start as `pending` until admin approval
- **Slot collision prevention:** Confirmed slots are unique per date/time/service (MongoDB partial unique index)
- **Conflict handling:** When one pending request is confirmed, competing requests for the same slot are auto-rejected
- **Status lifecycle:** `pending` → `confirmed` | `rejected` | `expired`
- **Auto-expiry:** Hourly cron job marks past pending appointments as `expired`
- **Email notifications:** Patients and admin receive emails on request, confirmation, rejection, and decline

### Admin panel (`/admin`)
- **Secure login:** JWT stored in HTTP-only cookies
- **Dashboard:** Pending/confirmed counts, today's confirmed appointments, total contacts and services
- **Appointments:** Filter by status, detect slot conflicts, confirm/reject with notes, delete records
- **Contacts:** View and delete inquiry messages
- **Services:** Create, update, and delete services with image upload (Multer + Cloudinary)

### Backend & security
- RESTful API with consistent `{ success, data/error }` responses
- **Helmet**, **rate limiting**, **HPP**, and **CORS** protection
- **Zod** + **Validator** input validation and sanitization
- **Socket.io** for real-time updates across admin and booking UI
- **Nodemailer** for transactional emails

---

## Tech Stack

| Layer | Technologies |
|-------|--------------|
| **Frontend** | React 19, Vite, Redux Toolkit, React Router, Tailwind CSS, Framer Motion, React Hook Form, Zod, Axios, Socket.io Client |
| **Backend** | Node.js, Express 5, MongoDB, Mongoose, Socket.io, JWT, Nodemailer, Multer, Cloudinary, Node-cron |
| **Security & validation** | Helmet, express-rate-limit, HPP, CORS, Zod, Validator, bcryptjs |
| **Deployment** | Vercel (frontend), Render (backend) |

---

## Project Structure

```
denture-dental-clinic/
├── backend/          # Express API, models, controllers, cron jobs
├── frontend/         # React client + admin panel
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Cloudinary account
- SMTP credentials (e.g. Gmail App Password)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/denture-dental-clinic.git
cd denture-dental-clinic
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=4000
NODE_ENV=development

# MongoDB
db_name=your_db_name
db_password=your_db_password

# Auth
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password

# Cloudinary
cloudinary_cloud=your_cloud_name
cloudinary_api_key=your_api_key
cloudinary_api_secret=your_api_secret

# Email (SMTP)
SMTP_EMAILS=your_smtp_email
SMTP_APP_PASSWORDS=your_app_password

# Optional (production CORS)
FRONTEND_URL=https://denture-dental-clinic.vercel.app
```

Start the API:

```bash
npm run dev
```

### 3. Frontend setup

```bash
cd ../frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:4000/api/v1
VITE_SOCKET_URL=http://localhost:4000
```

Start the client:

```bash
npm run dev
```

Open:
- **Public site:** `http://localhost:5173`
- **Admin login:** `http://localhost:5173/admin/login`

---

## Deployment

### Backend (Render)

1. Create a **Web Service** on [Render](https://render.com) connected to this repo.
2. Set **Root Directory** to `backend`.
3. **Build Command:** `npm install`
4. **Start Command:** `npm start`
5. Add all environment variables from `backend/.env` (set `NODE_ENV=production`).
6. Verify: `https://your-app.onrender.com/health`

### Frontend (Vercel)

1. Import the repo on [Vercel](https://vercel.com) with **Root Directory** set to `frontend`.
2. Add environment variables:

```env
VITE_API_URL=https://your-app.onrender.com/api/v1
VITE_SOCKET_URL=https://your-app.onrender.com
```

3. Redeploy after updating env vars.

---

## API Endpoints

| Resource | Endpoint | Method | Access |
|----------|----------|--------|--------|
| Health check | `/health` | GET | Public |
| Services list | `/api/v1/services` | GET | Public |
| Create service | `/api/v1/service` | POST | Admin |
| Update service | `/api/v1/service/:id` | PUT | Admin |
| Delete service | `/api/v1/service/:id` | DELETE | Admin |
| Create appointment | `/api/v1/appointment/create-appointment` | POST | Public |
| Slot availability | `/api/v1/appointment/slot-availability` | GET | Public |
| List appointments | `/api/v1/appointment/get-appointment` | GET | Admin |
| Confirm appointment | `/api/v1/appointment/confirm-appointment/:id` | PATCH | Admin |
| Reject appointment | `/api/v1/appointment/reject-appointment/:id` | PATCH | Admin |
| Delete appointment | `/api/v1/appointment/delete-appointment/:id` | DELETE | Admin |
| Create contact | `/api/v1/contact/create-contact` | POST | Public |
| List contacts | `/api/v1/contact/get-contacts` | GET | Admin |
| Delete contact | `/api/v1/contact/delete-contact/:id` | DELETE | Admin |
| Admin login | `/api/v1/auth/login` | POST | Public |
| Admin session | `/api/v1/auth/me` | GET | Admin |
| Admin logout | `/api/v1/auth/logout` | POST | Admin |

---

## How appointment booking works

1. Patient selects a service, date, and time slot.
2. Frontend fetches slot availability and listens for real-time `slots:updated` events.
3. Booking is saved as **pending** (multiple patients can request the same slot).
4. Admin reviews pending requests and confirms one; others for that slot are auto-rejected.
5. Both patient and admin receive email updates.
6. Past pending requests are automatically marked **expired** by a scheduled job.

---

## Service categories

- Pediatric Dentistry
- Orthodontics
- Precision Dentures
- Cosmetic Dentistry
- Restorative Dentistry
- Specialized Services

---

## Screenshots

_Add screenshots here:_
- Home page
- Appointment booking with slot status
- Admin dashboard
- Admin appointments panel

---

## Future enhancements

- Online payment integration for consultations
- Calendar view for appointment management
- Patient account portal and appointment history
- SMS reminders alongside email notifications

---

## Author

**Treo Studios — Asad Abbas**

---

## License

This project is for portfolio and educational use.
