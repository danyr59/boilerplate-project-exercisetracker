const mongoose = require("mongoose")

const { UserSchema } = require("./User")


const ExerciseSchema = new mongoose.Schema({
  description: String,
  duration: Number,
  date: String
})

module.exports.Exercise = mongoose.model("Exercise", ExerciseSchema);
module.exports.ExerciseSchema = ExerciseSchema;
