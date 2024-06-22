//import mongoose
const mongoose = require('mongoose')

//create  a schema how to store data
const userSchema = mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true},
    pic:{type:String,require:true,default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",

    }, 


},{
    timestamps:true 
})
//create model
const User = mongoose.model("User",userSchema)

//export model
module.exports = User