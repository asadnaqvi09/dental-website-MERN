# 🦷 Denture Dental Clinic (MERN Stack Project)

A full-stack dental clinic web application built using the **MERN Stack**.  
It allows users to explore services, book appointments, and send inquiries, while providing a scalable backend for future admin management.

---

## 🌐 Live Demo
> (Add your deployed links here after deployment)

- Frontend: https://your-frontend.vercel.app  
- Backend API: https://your-backend.onrender.com  

---

## 📌 Features

### 👨‍⚕️ Public Features
- View dental services with details & pricing  
- Book appointment with date & time selection  
- Prevent double booking (slot collision handling)  
- Contact form for inquiries  
- Real-time form validation (Zod + React Hook Form)  
- User-friendly notifications (success, error, loading)

### ⚙️ Backend Features
- RESTful API with structured responses  
- JWT-based authentication (Admin routes)  
- Email notifications via Nodemailer  
- Image upload with Multer + Cloudinary  
- Secure middleware (Helmet, Rate Limit, HPP, CORS)  
- Input validation (Zod + Validator)

### 🧠 UX Enhancements
- Disabled booked time slots  
- Loading states for forms  
- Toast notifications for all actions  
- Inline success/error messages  

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Redux Toolkit
- React Router
- Axios
- React Hook Form + Zod
- Framer Motion
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Nodemailer
- Multer + Cloudinary
- Zod + Validator

---


---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/denture-dental-clinic.git
cd denture-dental-clinic

2️⃣ Backend Setup
cd BackEnd
npm install
Create .env file:
PORT=4000
db_name=your_db_name
db_password=your_password
JWT_SECRET=your_secret
ADMIN_EMAIL=your_email
ADMIN_PASSWORD=your_password
cloudinary_cloud=xxx
cloudinary_api_key=xxx
cloudinary_api_secret=xxx
SMTP_EMAILS=your_email
SMTP_APP_PASSWORDS=your_app_password

Run backend:
npm run dev

3️⃣ Frontend Setup
cd FrontEnd
npm install

Create .env:
VITE_API_URL=http://localhost:3000/api/v1

Run frontend:
npm run dev

🔗 API Endpoints (Overview)
Services
GET /api/v1/services
Appointment
POST /api/v1/appointment/create-appointment
GET /api/v1/appointment/get-appointment (Admin)
DELETE /api/v1/appointment/delete-appointment/:id (Admin)
Contact
POST /api/v1/contact/create-contact
GET /api/v1/contact/get-contacts (Admin)
DELETE /api/v1/contact/delete-contact/:id (Admin)
Auth (Postman Tested Only)
POST /api/v1/auth/login
POST /api/v1/auth/logout

🔄 Data Flow
Appointment Flow
UI → Validation (Zod) → Redux → API → DB → Email → Response → UI Feedback
Contact Flow
UI → Validation → Redux → API → Email → Response → Toast Notification

🔐 Security Features
Helmet (secure headers)
Rate Limiting
HPP (HTTP Parameter Pollution protection)
JWT Authentication
Input sanitization (Validator)

🚀 Deployment
Frontend (Vercel)
Build command: npm run build
Output: dist
Backend (Render)
Start command: npm start
Add environment variables in dashboard

⚠️ Important Notes
Appointment slots are unique per date + time + service
Gmail requires App Password for email sending
Cloudinary required for image uploads
Admin routes require JWT token

🔮 Future Improvements
Admin Dashboard (Appointments & Contacts Management)
Real-time slot availability (WebSockets)
Payment integration
User authentication system
Calendar UI for booking

Developed By : Syed Muhammad Asad Abbas Naqvi