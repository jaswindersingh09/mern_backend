const {Schema, model} = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = new Schema({
  username:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  phone:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  isAdmin:{
    type: Boolean,
    required: false
  },
});


// hashing password functionality
userSchema.pre("save", async function(next){
  const user = this;
  if (!user.isModified("password")) {
    next()
  }
  try {
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(user.password, salt)
    user.password = hashPassword    
  } catch (error) {
    next(error)
  }
});



// compare the password

userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password)
}


// generate the token functionality
userSchema.methods.generateToken = async function(){
 try {
  return jwt.sign(
    {
      userId: this._id.toString(),
      email: this.email,
      isAdmin: this.isAdmin
    },
      process.env.JWT_SECRET_KEY,
    {
      expiresIn: "30d"
    }
  )
 } catch (error) {
  console.log(error);
  
 }
}



const User = new model("User", userSchema);

module.exports = User;


