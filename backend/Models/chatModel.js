const mongoose = require("mongoose")

const chatModel = mongoose.Schema({
     chatName:{type:String,trim:true},
     isGroupChat:{type:Boolean,default:false},

     users:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Users"
        }
     ],
     letestMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message"



     },
     groupAdmin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users"

     }
},{
    Timestamps:true, 
}
)
//create model
const Chat = mongoose.model("Chat",chatModel)
//export model
module.exports = Chat





//chatName
//isGroupChat
//user
//latestMessage
//GroupAdmin