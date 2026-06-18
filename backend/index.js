const express = require('express');
const connectDB = require('./config/db');
const dotEnv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const serviceRoutes = require('./routes/serviceRoutes');
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors(
    {
        origin: ["http://localhost:5173", "https://denture-dental-clinic.vercel.app"],
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        credentials: true,
    }
));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(helmet());
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);
app.use(hpp());
dotEnv.config();
connectDB();

app.use('/api/v1', serviceRoutes);
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/contact', contactRoutes);
app.use('/api/v1/appointment', appointmentRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})