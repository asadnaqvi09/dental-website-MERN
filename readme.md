## 🦷 Denture Dental Clinic (MERN Stack Project)

A professional full-stack dental clinic application built with the **MERN Stack**. This platform streamlines patient-to-clinic interactions by offering service discovery, intelligent appointment scheduling, and automated inquiry management.

---

## 🌐 Live Demo
- **Frontend:** [Link Placeholder]
- **Backend API:** [Link Placeholder]

---

## 📌 Features

### 👨‍⚕️ Patient Features
* **Service Catalog:** Browse dental treatments with detailed pricing and descriptions.
* **Smart Booking:** Interactive date/time selection with **slot collision prevention**.
* **Inquiry System:** Contact form for direct patient-to-clinic communication.
* **Live Validation:** Real-time feedback using **Zod** and **React Hook Form**.
* **Action Feedback:** Dynamic toast notifications for booking and messaging states.

### ⚙️ Backend & Security
* **RESTful Architecture:** Structured API design with consistent JSON responses.
* **Security Layers:** Protected by **Helmet**, **Rate Limiting**, **HPP**, and **CORS**.
* **Data Integrity:** Multi-layer input sanitization and Zod schema validation.
* **Automation:** Instant email notifications via **Nodemailer**.
* **Media Management:** Robust image handling through **Multer** and **Cloudinary**.
* **Auth:** JWT-based protection for administrative endpoints.

---

## 🛠 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React (Vite), Redux Toolkit, Framer Motion, Axios, React Toastify |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose |
| **DevOps/Tools** | JWT, Nodemailer, Multer, Cloudinary, Zod, Validator |

---

## ⚙️ Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/your-username/denture-dental-clinic.git
cd denture-dental-clinic
```

### 2. Backend Configuration
Navigate to the server directory and install dependencies:
```bash
cd BackEnd
npm install
```
Create a `.env` file in the `BackEnd` folder:
```env
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
```
Start the server: `npm run dev`

### 3. Frontend Configuration
Navigate to the client directory and install dependencies:
```bash
cd ../FrontEnd
npm install
```
Create a `.env` file in the `FrontEnd` folder:
```env
VITE_API_URL=http://localhost:4000/api/v1
```
Start the application: `npm run dev`

---

## 🔗 Key API Endpoints

| Resource | Endpoint | Method |
| :--- | :--- | :--- |
| **Services** | `/api/v1/services` | `GET` |
| **Appointments** | `/api/v1/appointment/create-appointment` | `POST` |
| **Admin View** | `/api/v1/appointment/get-appointment` | `GET (Protected)` |
| **Inquiries** | `/api/v1/contact/create-contact` | `POST` |
| **Auth** | `/api/v1/auth/login` | `POST` |

---

## 🚀 Future Roadmap
* **Full Admin Dashboard:** UI for managing appointments and service listings.
* **Real-time Availability:** WebSocket integration for live slot updates.
* **Payment Gateway:** Integration for online consultation fees.
* **Calendar View:** Enhanced UI for intuitive appointment management.

**Developed By:** Treo Studios (Asad Abbas)
