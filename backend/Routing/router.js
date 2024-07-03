//import express
const express = require('express')
//import register
const {registerUser,loginUser} =require('../Controller/userController')
//create object for router class express module
const router = new express.Router()

//path to resolve set resolve request
//     syntax = router.http('path',()=>{how to resolve})
router.post('/register',registerUser)
// router.post('/',registerUser)
router.post('/login',loginUser)




module.exports = router