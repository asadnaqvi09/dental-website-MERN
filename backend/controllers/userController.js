const User = require('../models/userModel');
const generateToken = require('../utilis/generateToken');
const response = require('../utilis/response');

const adminLogin = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const adminUsername = process.env.ADMIN_USERNAME?.trim();
        const adminPassword = process.env.ADMIN_PASSWORD?.trim();
        const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();

        if (!userName || !password) {
            return response.error(res, 'Please provide username and password', 400);
        }
        if (!adminUsername || !adminPassword || !adminEmail) {
            return response.error(res, 'Admin credentials not configured on server', 500);
        }
        if (userName.trim() !== adminUsername || password !== adminPassword) {
            return response.error(res, 'Invalid credentials', 401);
        }

        let adminUser = await User.findOne({ userName: adminUsername });
        if (!adminUser) {
            adminUser = await User.findOne({ email: adminEmail, role: 'admin' });
        }
        if (!adminUser) {
            adminUser = await User.create({
                userName: adminUsername,
                email: adminEmail,
                password: adminPassword,
                role: 'admin',
            });
        }

        const token = generateToken(adminUser._id);
        const isProduction = process.env.NODE_ENV === 'production';
        res.cookie('token', token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax',
            maxAge: 24 * 60 * 60 * 1000,
        });
        response.success(res, 'Admin logged in successfully', {
            user: {
                id: adminUser._id,
                userName: adminUser.userName,
                email: adminUser.email,
                role: adminUser.role,
            },
        });
    } catch (error) {
        console.error('Admin Login Error:', error);
        response.error(res, 'Error in Admin Login Controller', 500);
    }
};

const getMe = async (req, res) => {
    try {
        response.success(res, 'Admin session active', {
            user: {
                id: req.user._id,
                userName: req.user.userName,
                email: req.user.email,
                role: req.user.role,
            },
        });
    } catch (error) {
        response.error(res, 'Error fetching admin session', 500);
    }
};

const Logout = async (req, res) => {
    try {
        const isProduction = process.env.NODE_ENV === 'production';
        res.clearCookie('token', {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax',
        });
        response.success(res, 'Admin logged out successfully');
    } catch (error) {
        response.error(res, 'Error in Admin Logout Controller', 500);
    }
};

module.exports = {
    adminLogin,
    getMe,
    Logout,
};
