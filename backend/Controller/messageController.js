
const Chat = require('../Models/chatModel');
const Message = require('../Models/messageModel');
const Users = require('../Models/userModel');


const sendMessage = async(req,res)=>{

    const {content,chatId}=req.body;

    if(!content||!chatId){
        console.log("invalid data passed into request")
        return res.sendStatus(400)
    }
    var newMessage = {
        sender:req.user._id,
        content:content,  
        chat:chatId
    }
    try { 
        
        var message = await Message.create(newMessage)
        message = await message.populate("sender","name pic")
        message = await message.populate("chat")
        message = await Users.populate(message,{
            path:"chat.users",
            select:"name pic email"
        })
        await Chat.findByIdAndUpdate(req.body.chatId,{
            letestMessage:message,  
    
        }) 
        res.json(message)  
        
    } catch (error) { 
        console.log("error",error) 


    }
}

const allMessage = async (req, res) => {
    try {
      const messages = await Message.find({ chat: req.params.chatId })
        .populate("sender", "name pic email")
        .populate("chat");
  
      if (!messages) {
        return res.status(404).json({ message: "Messages not found" });
      }
  
      res.status(200).json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ message: "Server error: Unable to fetch messages" });
    }
  };
  




module.exports={sendMessage,allMessage}