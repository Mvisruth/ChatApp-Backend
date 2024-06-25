//logic to resolve the request
const Users = require('../Models/userModel')
//import jwt
const jwt = require('jsonwebtoken')
//logic for register
const registerUser = async(req,res)=>{
    //extract data from body
    const {name,email,password,pic}=req.body
    
       try {if(!name||!email||!password){
            res.status(406).json("please enter Valid feild")
        }
    
        const userExists = await Users.findOne({email})
        if(userExists){
            res.status(406).json("Account Already Exist....Please Login")
        }
        else{
            
             //create an object for the model

            const newUser = await new Users({
                
                name,
                email,
                password,
                pic,
              
                }
        )   
            //save function in mongoose - to permently store data in monodb
           await newUser.save()
           const token =jwt.sign({id:newUser._id},process.env.jwt_key)
        
             if(newUser) {
                
                res.status(201).json({
                   
                    _id:newUser._id,
                    name:newUser.name,
                    email:newUser.email,
                    pic:newUser.pic,
                    token


                })
            }
            else{

            //response
            res.status(200).json("Faild to Create The User")
            }
       
        }}
        catch(err){
            console.log("reqister request faild due to ",err)
        }
    
    

}
//logic for login

const loginUser = async(req,res)=>{
    //extract data from body
    const {email,password}=req.body
    if(!email||!password)
        {
            res.status(400).json("please enter vaild input")
        }
    const login = await Users.findOne({email,password})

    if(login && (await newUser.matchPassword(password)))
        {
            res.status(200).json({
                _id:newUser._id,
                    name:newUser.name,
                    email:newUser.email,
                    pic:newUser.pic,
                    token,


            })
        }
            else{
                res.status(406);
                throw new Error("invaild email or password")
            }
        
}


module.exports = {registerUser,loginUser}


