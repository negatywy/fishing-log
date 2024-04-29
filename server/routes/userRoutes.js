const express = require('express');
const router = express.Router();
const UserModel = require('../models/User.js');
const bcrypt = require('bcrypt');

router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newUser = new UserModel({
          username: username,
          password: hashedPassword, 
          registrationDate: new Date(),
        });
    
        await newUser.save();
    
        res.json({
          success: true,
          message: "New user registered successfully",
          registrationDate: newUser.registrationDate,
        });
      } catch (err) {
        if (err.code === 11000 && err.keyPattern && err.keyPattern.username) {
          res.status(400).json({
            success: false,
            error: "Username already exists",
            message: "Username already exists",
          });
        } else {
          res.status(500).json({
            success: false,
            error: err.message,
            message: "Error registering a new user",
          });
        }
      }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserModel.findOne({ username });
        if (!user) {
          return res
            .status(400)
            .json({ message: "Username or password is incorrect" });
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res
            .status(400)
            .json({ message: "Username or password is incorrect" });
        }
    
        res.json({
          success: true,
          message: "Login success",
        });
      } catch (err) {
          console.error(err);
          res.status(500).json({
            success: false,
            error: err.message,
            message: "Error logging in",
          });
      }
});

router.post("/changePassword", async (req, res) => {
    try {
        const { username, currentPassword, newPassword } = req.body;
    
        // Find the user by username
        const user = await UserModel.findOne({ username });
    
        if (!user) {
          return res.status(404).json({
            success: false,
            message: "User not found",
          });
        }
    
        // Check if the provided current password matches the stored hashed password
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    
        if (!isPasswordValid) {
          return res.status(401).json({
            success: false,
            message: "Incorrect current password",
          });
        }
    
        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    
        // Update the user's password
        user.password = hashedNewPassword;
        await user.save();
    
        res.json({
          success: true,
          message: "Password changed successfully",
        });
      } catch (err) {
        res.status(500).json({
          success: false,
          error: err.message,
          message: "Error changing password",
        });
      }
});

module.exports = router;
