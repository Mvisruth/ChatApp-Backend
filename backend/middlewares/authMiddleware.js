const jwt = require("jsonwebtoken")
const Users = require("../Models/userModel")

const protect = async(req,res,next)=>{
    //declare token veriable
    let token
    // Logic to handle authorization
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

       try{ 
        token=req.headers.authorization.split(' ')[1]

  //decode token id
    //verify token and decode user id

  const decoded = jwt.verify(token,process.env.jwt_key)
  // Fetch user from database based on decoded id
  req.user= await Users.findById(decoded.id).select("-password")
  next()
       }catch(err){
    res.status(401)
    throw new Error("Not autherization token faild")
  }
}
if(!token)
    {
        res.status(401)
        throw new Error("not autherized,not token") 
    }
}
module.exports = {protect}  