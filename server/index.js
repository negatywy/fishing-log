const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const FishModel = require('./models/Fish.js');
const UserModel = require('./models/User.js');

const cors = require('cors');
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

app.get("/getFish", async (req, res) => {
  try {
    const { 
      gatunek, user, weight, length, weightCondition, lengthCondition,
      catchDate, catchDateCondition } = req.query;

    const query = {};

    if (gatunek) {
      query.gatunek = gatunek;
    }

    if (user) {
      query.user = user;
    }

    if (weight && weightCondition) {
      if (weightCondition === 'greater') {
        query.weight = { $gte: parseFloat(weight) };
      } else if (weightCondition === 'less') {
        query.weight = { $lte: parseFloat(weight) };
      }
    }

    if (length && lengthCondition) {
      if (lengthCondition === 'greater') {
        query.length = { $gte: parseFloat(length) };
      } else if (lengthCondition === 'less') {
        query.length = { $lte: parseFloat(length) };
      }
    }

    if (catchDate && catchDateCondition) {
      const catchDateQuery = {};
      if (catchDateCondition === 'before') {
        catchDateQuery.$lt = new Date(catchDate);
      } else if (catchDateCondition === 'after') {
        catchDateQuery.$gt = new Date(catchDate);
      }
    
      query.catchDate = catchDateQuery;
    }    

    console.log("Query:", query);

    const result = await FishModel.find(query);

    console.log("Result:", result);

    res.json(result);
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Error executing query",
    });
  }
});


app.post("/postFish", async (req, res) => {
  try {
    const fish = req.body;
    const newFish = new FishModel({
      ...fish,
      catchDate: new Date(),
    });

    const savedFish = await newFish.save();

    res.json({
      success: true,
      data: savedFish,
      message: "Fish data saved successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Error saving fish data",
    });
  }
});
  
  app.post("/register", async (req, res) => {
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

app.post("/login", async (req, res) => {
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

app.post("/changePassword", async (req, res) => {
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
  
app.listen(3001, () => {
    console.log("it's ok!!");
});