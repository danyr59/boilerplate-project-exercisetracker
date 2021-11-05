const mongoose = require("mongoose")
// const { ExerciseSchema } = require("./Exercise")
const {UserSchema} = require("./User.js")

const LogSchema = new mongoose.Schema({
  User: UserSchema,
  count: Number,
  log =[{
    description: String,
    duration: Number,
    date: { type: Date, default: Date.now() }
  }]
})

module.exports = mongoose.model("Log", LogSchema);
module.exports.LogSchema = LogSchema;
