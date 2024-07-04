//import express
const express = require('express')
//import register
const {registerUser,loginUser,allUsers} =require('../Controller/userController')

//
const {protect} =require('../middlewares/authMiddleware')
//create object for router class express module
const router = new express.Router()

//path to resolve set resolve request
//     syntax = router.http('path',()=>{how to resolve})
router.post('/register',registerUser)
// router.post('/',registerUser)
router.post('/login',loginUser)

router.get("/", protect,allUsers)


module.exports = router