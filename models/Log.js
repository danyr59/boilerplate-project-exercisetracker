const mongoose = require("mongoose")
const Exercise = require("./Exercise")
const User = require("./User")


const Log = new mongoose.Schema({
  User: User,
  count: Number,
  log =[{
    description: String,
    duration: Number,
    date: { type: Date, default: Date.now() }
  }]
})

module.exports = mongoose.model("Log", Log);
