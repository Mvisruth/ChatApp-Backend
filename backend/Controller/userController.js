const Users = require('../Models/userModel')

//logic for register
const registerUser = async(req,res)=>{
    //extract data from body
    const {name,email,password,pic}=req.body
    
       try {if(!name||!email||!password||!pic){
            res.status(406).json("please enter Valid feild")
        }
    
        const userExists = await Users.findOne({email})
        if(userExists){
            res.status(406).json("Account Already Exist....Please Login")
        }
        else{
            //create an object for the model
            const newUser = new Users({
                name,
                email,
                password,
                pic
    
            })
            //save function in mongoose - to permently store data in monodb
           await newUser.save()
            //response
            res.status(200).json(newUser)
        }}
        catch(err){
            console.log("reqister request faild due to ",err)
        }
    

}
module.exports = {registerUser}


