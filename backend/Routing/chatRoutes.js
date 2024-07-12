const express = require('express')
const router = new express.Router()
const {protect} =require('../middlewares/authMiddleware')
const {accessChat,fetchChat,createGroupChat,renameGroup}=require('../Controller/chatController')


router.post('/',protect,accessChat)
router.get('/',protect,fetchChat)
router.post('/group',protect,createGroupChat)
router.post('/group',protect,renameGroup)











module.exports =router 