const User = require("../models/user-model");

const home = async (req,res)=>{
  try {
    res.send("hello from the web home page with controller")
  } catch (error) {
    console.error(error);
  }
}


const register = async (req,res)=>{
  try {
    // console.log(req.body);
    
    const {username, email, phone, password} = req.body;

    const userExists = await User.findOne({email: email})

    if (userExists) {
      return res.status(400).json({message: "already email exist"})
    }
    
    const userCreated = await User.create({username, email, phone, password}) 
    
    if (userCreated) {
      res.status(200).json({
        message: "user created successfully",
        token: await userCreated.generateToken(), 
        userId : userCreated._id.toString()
      })
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: "internal server error"})
  }
}

const login = async (req,res) => {
  try {
    const {email, password} = req.body;

    const emailExist = await User.findOne({email: email})

    if (!emailExist) {
      res.status(404).json({message: "plz registration to the user"})
    }

    const user = await emailExist.comparePassword(password)

    if (user) {
      res.status(200).json({
        message: "user login successfully",
        token: await emailExist.generateToken(), 
        userId : emailExist._id.toString()
      })
    }


  } catch (error) {
    console.log(error);
    
  }
}


const user = async (req,res) =>{
  try {
    const userData = req.user;
    console.log(userData);
    
    return res.status(200).json({userData})
  } catch (error) {
    console.log("error from the user route", error);
    
          
  }
}

module.exports = {home, register, login, user}

