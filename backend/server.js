//import express modules
const express = require('express')
const {chats} = require('./data/data')
//import .env
const env = require('dotenv').config()
//import cors
const cors = require('cors')
//create server 
const app = express()

//use cors orgin(to communiction each other frontend to backend)
app.use(cors())
//set PORT
const PORT = 5000 || process.env
//import connection.js
require('./DB/connection')

app.get('/',(req,res)=>{
    res.send("Appi is running")
})

app.get('/api/chat',(req,res)=>{
    res.send(chats)
})

app.get('/api/chat/:id',(req,res)=>{
    // console.log(req.params.id)
    const singleChat = chats.find((c)=>c.id=== req.params.id)
    res.send(singleChat)
})

//run server
app.listen(PORT,console.log(`server started on Port ${PORT}`))
