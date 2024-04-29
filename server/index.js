const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const fishRoutes = require('./routes/fishRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/fish', fishRoutes);
app.use('/user', userRoutes);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
