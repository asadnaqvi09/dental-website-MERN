const express = require('express');
const {adminLogin, Logout} = require('../controllers/userController');
const router = express.Router();

router.post('/login', adminLogin);
router.post('/logout', Logout);

module.exports = router;