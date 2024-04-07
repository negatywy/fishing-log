const mongoose = require('mongoose');

const FishSchema = new mongoose.Schema({
    gatunek: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    length: {
        type: Number,
        required: true,
    },
    catchDate: {
        type: Date,
        default: Date.now, 
    },
});

const FishModel = mongoose.model("fish", FishSchema);
module.exports = FishModel;