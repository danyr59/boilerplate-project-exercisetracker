const mongoose = require("mongoose")
// const { ExerciseSchema } = require("./Exercise")
const { ExerciseSchema } = require("./Exercise.js")

const LogSchema = new mongoose.Schema({
  username: String,
  count: Number,
  _id: String,
  log: [
    ExerciseSchema
    // description: String,
    // duration: Number,
    // date: { type: Date }
  ]
})

module.exports.Log = mongoose.model("Log", LogSchema);
module.exports.LogSchema = LogSchema;
