//import mongoose
const mongoose = require('mongoose')

//get the connection string || connect dataBase
 const connectionString = process.env.DATABASE

 mongoose.connect(connectionString).then(()=>{
    console.log('Server Connected successfuly with mongodb');
 }).catch((err)=>{
    console.log(`somthing went wrong Error:${err}`)
  })