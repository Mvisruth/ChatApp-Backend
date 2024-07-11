const express = require('express')
const router = new express.Router()
const {protect} =require('../middlewares/authMiddleware')
const {accessChat,fetchChat,createGroupChat}=require('../Controller/chatController')


router.post('/',protect,accessChat)
router.get('/',protect,fetchChat)
router.post('/group',protect,createGroupChat)











module.exports =router 