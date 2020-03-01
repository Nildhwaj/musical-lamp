const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5020;

app.use(cors());
app.use(express.json());

// MongoDB connectivity
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser : true, useCreateIndex : true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

// Routes
const exerciseRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
app.use('/exercises', exerciseRouter);
app.use('/users', usersRouter);

// To Run Server
app.listen(port, () => {
    console.log(`server is running on port : ${port}`);
})