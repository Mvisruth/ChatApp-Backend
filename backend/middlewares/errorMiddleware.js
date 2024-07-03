 const notFound = (req,res,next)=>{
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)

 };
//condition ? value_if_true : value_if_false

 const errorHandle = (err,req,res,next)=>{
    const statusCode = res.statusCode === 200 ?500 :res.statusCode;
    res.status(statusCode)
    res.json({
        Message:err.Message,
        stack:process.env.NODE_ENV === "production"?null:err.stack
    })

 };


module.exports={notFound,errorHandle}


