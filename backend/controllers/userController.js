const User = require('../models/userModel');
const generateToken = require('../utilis/generateToken');
const response = require('../utilis/response');

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
        const adminPassword = process.env.ADMIN_PASSWORD?.trim();
        if (!email || !password) {
            return response.error(res, 'Please provide email and password', 400);
        }
        if (!adminEmail || !adminPassword) {
            return response.error(res, 'Admin credentials not configured on server', 500);
        }
        const normalizedEmail = email.trim().toLowerCase();
        if (normalizedEmail !== adminEmail) {
            return response.error(res, 'Access denied: Invalid admin email', 401);
        }
        let adminUser = await User.findOne({ email: adminEmail });
        if (!adminUser) {
            adminUser = await User.create({
                userName: 'Super Admin',
                email: adminEmail,
                password: adminPassword,
                role: 'admin',
            });
        } else {
            const isMatch = await adminUser.matchPassword(password);
            if (!isMatch) {
                if (password !== adminPassword) {
                    return response.error(res, 'Invalid credentials', 401);
                }
                adminUser.password = adminPassword;
                await adminUser.save();
            }
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
            token,
        });
    } catch (error) {
        console.error('Admin Login Error:', error);
        response.error(res, 'Error in Admin Login Controller', 500);
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
    Logout,
};
