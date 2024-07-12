const express = require('express')
const router = new express.Router()
const {protect} =require('../middlewares/authMiddleware')
const {accessChat,fetchChat,createGroupChat,renameGroup,addtoGroup,removeFromGroup}=require('../Controller/chatController')


router.post('/',protect,accessChat)
router.get('/',protect,fetchChat)
router.post('/group',protect,createGroupChat)
router.put('/rename',protect,renameGroup)
router.put('/groupadd',protect,addtoGroup)
router.put('/groupremove',protect,removeFromGroup)













module.exports =router 