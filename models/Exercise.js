const mongoose = require("mongoose")

const { UserSchema } = require("./User")


const ExerciseSchema = new mongoose.Schema({
  User: UserSchema,
  description: String,
  duration: Number,
  date: { type: Date, default: Date.now() }

})

module.exports.Exercise = mongoose.model("Exercise", ExerciseSchema);
module.exports.ExerciseSchema = ExerciseSchema;
