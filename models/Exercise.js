const mongoose = require("mongoose")

const User = require("User")

const Exercise = new mongoose.Schema({
  User: User,
  description: String,
  duretion: Number,
  date: { type: Date, default: Date.now() }

})

module.exports = mongoose.model("Exercise", Exercise);
