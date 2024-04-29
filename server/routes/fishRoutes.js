const express = require('express');
const router = express.Router();
const FishModel = require('../models/Fish.js');

router.get("/getFish", async (req, res) => {
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

router.post("/postFish", async (req, res) => {
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

module.exports = router;
