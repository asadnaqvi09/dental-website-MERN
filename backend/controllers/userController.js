const User = require('../models/userModel');
const generateToken = require('../utilis/generateToken');
const bcrypt = require('bcryptjs');

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }
    if (email !== adminEmail) {
      return res.status(401).json({ message: "Access denied: Invalid admin email" });
    }
    let adminUser = await User.findOne({ email: adminEmail });
    if (!adminUser) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminPassword, salt);
      adminUser = await User.create({
        userName: "Super Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
      });
    }
    const token = generateToken(adminUser._id, adminUser.role);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      success: true,
      message: "Admin logged in successfully",
      user: {
        id: adminUser._id,
        userName: adminUser.userName,
        email: adminUser.email,
        role: adminUser.role,
      },
      token,
    });
  } catch (error) {
    console.error("Admin Login Error:", error);
    return res.status(500).json({ message: "Error in Admin Login Controller" });
  }
};

const Logout = async (req,res)=>{
    try {
        res.clearCookie("token",{
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });
        res.status(200).json({message: "Admin Logged Out Successfull"});
    } catch (error) {
        return res.status(500).json({message: "Error in Admin Logout Controller"});
    }
}
module.exports = {
    adminLogin,
    Logout
}