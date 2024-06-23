//import express modules
const express = require('express')
const {chats} = require('./data/data')
//import .env
const env = require('dotenv').config()
//import cors
const cors = require('cors')
//import router
const userRoutes = require('./Routing/router')
//create server 
const app = express()

//use cors orgin(to communiction each other frontend to backend)
app.use(cors())


app.use('/api/user',userRoutes)

//set PORT
const PORT = 5000 || process.env
//import connection.js
require('./DB/connection')

//run server
app.listen(PORT,console.log(`server started on Port ${PORT}`))
