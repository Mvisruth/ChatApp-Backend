//import express modules
const express = require('express')
// const {chats} = require('./data/data')
//import .env
 require('dotenv').config()
//import cors
// const cors = require('cors')
//import router
const userRoutes = require('./Routing/router')
//

const {notFound,errorHandle} = require('./middlewares/errorMiddleware')
const router = require('./Routing/router')

//create server 
const app = express()

//use cors orgin(to communiction each other frontend to backend)
// app.use(cors())
//parsing json - return middlware that only parse json - javavscript
app.use(express.json())
//server using router
app.use(router)

//use
app.use('/api/user',userRoutes)

//error handling function
app.use(notFound)
app.use(errorHandle)


//set PORT
const PORT = 5000 || process.env
//import connection.js
require('./DB/connection')

//run server
app.listen(PORT,console.log(`server started on Port ${PORT}`))
