
const mongoose=require("mongoose");
const DB_URI=require('../config/db.config').DB_URI;
const dbConnection=mongoose.createConnection(DB_URI,{
                                                     useNewUrlParser: true,
                                                     useUnifiedTopology : true
  });

module.exports = dbConnection;

dbConnection.on("connected",()=>{console.log(`connected  to ${DB_URI}`)});

dbConnection.on("disconnected",()=>{console.log(`disconnected from ${DB_URI}`)});



  
process.on('SIGINT',()=>dbConnection.close(() =>process.exit(0)));

process.on('SIGTERM',() =>dbConnection .close (()=>process.exit(0)));
  
  