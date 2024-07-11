//logic to resolve the request
const Users = require('../Models/userModel')
//import jwt
const jwt = require('jsonwebtoken')



//logic for register
const registerUser = async(req,res)=>{
    //extract data from body
    const {name,email,password,pic}=req.body
    
       try { 
        
        if(!email||!password){
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
                    token,


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
   try { const {email,password}=req.body
    // if(!email||!password)
    //     {
    //         res.status(400).json("please enter vaild input")
    //     }
    const login = await Users.findOne({email})
    //findone give doc back
    const token =jwt.sign({id:login._id},process.env.jwt_key)


    if(login && (await login.matchPassword(password)))
        {
            res.status(200).json({
                    _id:login._id,
                    name:login.name,
                    email:login.email,
                    pic:login.pic,
                    token,

            })
        }
            else{
                res.status(406);
                throw new Error("invaild email or password")
                
            }
        }catch(err)
        {
            console.log("reqister request faild due to ",err)

        }
}

//api/user?search=abc
//user searching function 
//reg
const allUsers =async(req,res)=>{

    const keyword = req.query.search
    ?{
         $or: [
            {name:{$regex:req.query.search,$options:"i"}},
            {email:{$regex:req.query.search,$options:"i"}},
         ],


        }:{};
      const user =  await Users.find(keyword).find({_id:{ $ne: req.user._id }})
      res.send(user)

    }
    // console.log(keyword)



module.exports = {registerUser,loginUser,allUsers}

