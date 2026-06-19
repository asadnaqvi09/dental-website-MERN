const express = require('express');
const { adminLogin, getMe, Logout } = require('../controllers/userController');
const protectedRoute = require('../middleware/protectedRoute');
const router = express.Router();

router.post('/login', adminLogin);
router.get('/me', protectedRoute, getMe);
router.post('/logout', Logout);

module.exports = router;
