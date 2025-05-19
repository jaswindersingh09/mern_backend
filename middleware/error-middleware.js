const errorMiddleware = (err,req,res,next) => {
 const status = err.status || 402; 
 const message = err.message || "Backend Error"; 
 const extraDetails = err.extraDetails || "error from Backend"; 

 return res.status(status).json({message, extraDetails})
}

module.exports = errorMiddleware;