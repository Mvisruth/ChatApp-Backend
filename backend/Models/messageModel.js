 //import mongoose
 const mongoose = require('mongoose')
//create structure how to store data means schema
const messageModel = mongoose.Schema(
    {
        sender:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
        content:{type:String,trim:true},
        chat:{type:mongoose.Schema.Types.ObjectId,ref:"chat"},

    },{
        timestamps:true,
    }
)
//create model
const Message = mongoose.model("Message",messageModel)
//export model
module.exports = Message