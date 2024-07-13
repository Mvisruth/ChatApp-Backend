const { populate } = require('dotenv');
const Chat = require('../Models/chatModel')
const Users = require('../Models/userModel')


//access chat
const accessChat = async(req,res)=>{

    const {userId} =req.body

    if(!userId){
        console.log("userId param not sent with request");
        return res.sendStatus(400 );
    }
 
    var isChat = await Chat.find({
        isGroupChat:false,
        $and:[
            {users:{$elemMatch:{$eq:req.user}}},
            {users:{$elemMatch:{$eq:userId}}}


        ],
    })
    .populate("users","-password")
     .populate("letestMessage")

    isChat = await Users.populate(isChat,{
        path:"letestMessage.sender",
        select:"name pic email",
    })
    if(isChat.length>0){
        res.send(isChat[0])
    }else{
        var chatData ={
            chatName:"sender",
            isGroupChat:false,
            users:[req.user._id,userId]
        }
        try{
            const createdChat = await Chat.create(chatData);
            const fullChat =await Chat.findOne({_id:  createdChat._id}).populate(
                "users",
                "-password"
            )
            res.status(200).send(fullChat)

        }catch(err){
             res.status(400)
             throw new Error(err.message)
        }
    }

    
}


//fetch chat
const fetchChat = async(req,res)=>{

    try{
        
        Chat.find({users:{$elemMatch:{$eq:req.user}}})
    .populate("users","-password")
    .populate("groupAdmin","password")
    .populate("letestMessage")
   .sort({updateAt:-1})  
    .then(async(results)=>{
        results=await Users.populate(results,{
          
        path:"letestMessage.sender",  
        select:"name pic emai"
    })
    res.status(200).send(results)

    })



    }catch(err){
        res.status(400)
        throw new Error(err.message)

    }

}


//create groupchat
const createGroupChat =async(req,res)=>{
    if(!req.body.users || !req.body.name){
        return res.status(400).send({message:"please fill all the feild"})
        

    }
    
    
    var users = JSON.parse(req.body.users)
    

    if(users.lenfth<2){
        return res 
        .status(400)
        .send("more than  2 user are required to form a group chat")
    }

    users.push(req.user)
  


    try {

        const groupChat = await Chat.create({

            chatName:req.body.name,
            isGroupChat:true,
            users:users,
            groupAdmin:req.user, 
            
            


        })
        
        const fullGroupChat = await Chat.findOne({_id:groupChat._id})
        .populate("users","-password")
        .populate("groupAdmin","password")
   
        res.status(200).send(fullGroupChat)
        // console.log(req.user)
        
    } catch (error) {
        res.status(400)
        throw new Error(err.message)
        
    }

}



//renameGroup
const renameGroup =async(req,res)=>{
    const {chatId,chatName}=req.body
    const updatedChat = await Chat.findByIdAndUpdate(
            chatId,
            {
            chatName
            
           },{
            new:true,
           }
           
    )
    
    .populate("users","-password")
    .populate("groupAdmin","-password")


    if(!updatedChat){

        res.status(404);
        throw new Error("Chat Not Found")
    } 
    else{
        res.json(updatedChat)
    }
  
}

//addtoGroup
const addtoGroup =async(req,res)=>{
   const {chatId,userId}=req.body
   const added = await Chat.findByIdAndUpdate(
    chatId,{
        $push:{users:userId},
    },
    {
        new:true
    }
)
.populate("users","-password")
.populate("groupAdmin","-password")


if(!added){

    res.status(404);
    throw new Error("Chat Not Found")
} 
else{
    res.json(added)
}
}



//remove from group
const removeFromGroup =async(req,res)=>{
    const {chatId,userId}=req.body
    const remove = await Chat.findByIdAndUpdate(
     chatId,{
         $pull:{users: userId},
     },
     {
         new:true
     }
 )

 .populate("users","-password")
 .populate("groupAdmin","-password")

 
 if(!remove){
 
     res.status(404);
     throw new Error("Chat Not Found")
 } 
 else{
     res.json(remove)
 }
 }



module.exports={accessChat,fetchChat,createGroupChat,renameGroup,addtoGroup,removeFromGroup}