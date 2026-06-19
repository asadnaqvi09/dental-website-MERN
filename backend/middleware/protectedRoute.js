const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protectedRoute = async (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decodedToken.id).select('-password');
        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied: Admin only' });
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Token invalid or expired' });
    }
};

module.exports = protectedRoute;
