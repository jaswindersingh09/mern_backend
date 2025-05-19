const Contact = require("../models/contact-model")
const User = require("../models/user-model")

const getAllUsers = async (req,res,next)=>{
  try {
    const users = await User.find({}, {password: 0})
    console.log(users); 

    if (!users || users.length === 0) {
      return res.status(404).json({message: "no users found"})
    }

    return res.status(200).json(users)

  } catch (error) {
    console.log(error);
    
    next(error)
  }
}


const getUserById = async (req,res,next)=>{
  try {
    const id = req.params.id
    const response = await User.findOne({_id : id}, {password: 0})
    return res.status(200).json(response)
  } catch (error) {
    next(error)
  }
}


const getAllContacts = async (req,res,next)=>{
  try {
    const contacts = await Contact.find()

    if (!contacts || contacts.length === 0) {
      return res.status(404).json({message: "no contacts found"})
    }

    return res.status(200).json(contacts)

  } catch (error) {
    next(error)
  }
}

const updateUsers = async (req,res)=>{
  try {
    const id = req.params.id
    const updatedData = await User.updateOne({_id: id}, {$set: req.body})
    return res.status(200).json(updatedData)    
  } catch (error) {
    console.log(error);
    next(error)
  }
}

const deleteUsers = async (req,res)=>{
  try {
    const id = req.params.id
    await User.findByIdAndDelete({_id: id})
    return res.status(200).json({message: "User Deleted Successfully"})
  } catch (error) {
    next(error)
    return res.status(500).json({message: error})
  }
}

const deleteContact = async (req,res)=>{
  try {
    const id = req.params.id
    await Contact.deleteOne({_id : id})
    return res.status(200).json({message: "Contact Deleted Successfully"})
  } catch (error) {
    next(error)
  }

}

module.exports = {getAllUsers, getAllContacts, deleteUsers, getUserById, updateUsers, deleteContact};