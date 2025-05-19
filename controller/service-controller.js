const Service = require("../models/service-model");

const service = async (req,res)=>{
  try {
    const response = await Service.find()
    res.status(200).send(response)
  } catch (error) {
    return res.status(404).json({message: "service not found"})
  }
}

module.exports = service;