//import express modules
const express = require('express')
// const {chats} = require('./data/data')
//import .env
require('dotenv').config();
//import cors
// const cors = require('cors')
//import router
const userRoutes = require('./Routing/router')
//
const chatRoutes =require('./Routing/chatRoutes')

const messageRoutes =require('./Routing/messageRoutes')

const {notFound,errorHandle} = require('./middlewares/errorMiddleware')

const router = require('./Routing/router');
const { Socket } = require('socket.io');

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
//api endpoint to chat
app.use('/api/chat',chatRoutes)
//api endpoint to chat
app.use('/api/message',messageRoutes)

//error handling function
app.use(notFound) 
app.use(errorHandle)
   
 
//set PORT
const PORT = 5000 || process.env
//import connection.js
require('./DB/connection')

//run server
const server = app.listen(PORT,console.log(`server started on Port ${PORT}`))
//socket
const io = require('socket.io')(server,{
    pingTimeout:60000,
    cors:{
        origin:'http://localhost:3000'
    }
})

io.on("connection",(Socket)=>{
    console.log("connected to socket.io")

    Socket.on('setup',(userData)=>{
      Socket.join(userData._id)
      console.log(userData._id)
      Socket.emit('connected')
    })

   Socket.on('join chat',(room)=>{
    Socket.join(room)
    console.log('user Joined '+room)
   })

   Socket.on('new message',(newMessageRecieved)=>{
    var chat = newMessageRecieved.chat
    if(!chat.users) return onsole.log("chat.users not defined")
        
        chat.users.forEach((user) => {
            if(user._id == newMessageRecieved.sender._id) return;

            Socket.in(user._id).emit("message received",newMessageRecieved)
        });
       
    }
   )


})