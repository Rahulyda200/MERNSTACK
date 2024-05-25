const dotenv=require('dotenv')
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser'); 
const app = express();

dotenv.config({path:'./config.env'})
const db=require('./db/conn')
// const User=require('./model/userSchema');
app.use(express.json());
app.use(cookieParser());
app.use('/api', require('./router/auth'));
app.use(require('./router/auth'))



const PORT = process.env.PORT ;







app.listen(PORT, () => {
  console.log(`Connection successful. Server is running on port ${PORT}`);
});
