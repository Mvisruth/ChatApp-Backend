const express =require('express')
const {protect} =require('../middlewares/authMiddleware')
const { sendMessage,allMessage } = require('../Controller/messageController');
const router = new express.Router()

router.post('/',protect,sendMessage)
router.get('/:chatId',protect,allMessage)

module.exports=router     