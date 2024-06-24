const User = require('../Models/userModel')


//logic for register
const registerUser = async(req,res)=>{
    //extract data from body
    const {name,email,password,pic}=req.body
    if(!name||!email||!password||!pic){
        res.status(400).json("please enter Valid feild")
    }

    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400).json("user alredy exist")
    }

}
