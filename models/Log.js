const mongoose = require("mongoose")
// const { ExerciseSchema } = require("./Exercise")
const { ExerciseSchema } = require("./Exercise.js")

const LogSchema = new mongoose.Schema({
  username: String,
  count: { type: Number, default: 1 },
  _id: String,
  log: [
    ExerciseSchema
  ]
}, { versionKey: false })

module.exports.Log = mongoose.model("Log", LogSchema);
module.exports.LogSchema = LogSchema;
