const mongoose = require('mongoose');
require('dotenv').config();
const DbUrl = process.env.DATABASE_URL;

const options = {
    socketTimeoutMs: 30000,
}

const connection = async()=>{
    try{
  await mongoose.connect(DbUrl, options);
  console.log("connection successfully etablished")
    }catch(err){
   console.log("error occur while connecting to database", err);
   process.exit(0);
    }
}


module.exports = connection;
