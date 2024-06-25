//import mongoose
const mongoose = require('mongoose')

//import bcypt
const bcrypt =require('bcrypt') 

//create  a schema how to store data
const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
         },
    email:{
        type:String,
        require:true,
        unique:true
          },
    password:{
        type:String,
        require:true
             },
    pic:{
        type:String,
        default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",

    }, 


},{
    timestamps:true 
})


//
userSchema.methods.matchPassword =async function(enterPassword) {
    return await bcrypt.compare(enterPassword,this.password)
    
}

//en
userSchema.pre('save',async function (next) {
    if(!this.isModified){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})
//create model
const Users = mongoose.model("Users",userSchema)

//export model
module.exports = Users