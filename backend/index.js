const dotEnv = require('dotenv');
dotEnv.config();

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
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
const { startExpireJob } = require('./jobs/expireAppointments');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 4000;

const allowedOrigins = process.env.FRONTEND_URL;

const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        credentials: true,
    },
});

app.set('io', io);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
}));
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

connectDB();
startExpireJob(io);

app.get('/health', (req, res) => {
    res.status(200).json({ success: true, message: 'Server is healthy' });
});

app.use('/api/v1', serviceRoutes);
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/contact', contactRoutes);
app.use('/api/v1/appointment', appointmentRoutes);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
