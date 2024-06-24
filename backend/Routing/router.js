//import express
const express = require('express')
const {registerUser} =require('../Controller/userController')



//create object for router class express module
const router = new express.Router()

//path to resolve set resolve request
router.post('/login',registerUser)



module.exports = router