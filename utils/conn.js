const mongoose = require("mongoose")

// const url = "mongodb://127.0.0.1:27017/mern_admin"
const url =  process.env.MONGODB_URL

const connectDB = async()=>{
  try {
    await mongoose.connect(url)
    console.log("db is connect the the server");
  } catch (error) {
    console.error("database connection failed", error);
    process.exit(0)
  }
}

module.exports = connectDB
