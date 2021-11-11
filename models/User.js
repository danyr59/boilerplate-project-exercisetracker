const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: String,
  // _id: String
}, { versionKey: false })

module.exports.UserSchema = UserSchema;
module.exports.User = mongoose.model("User", UserSchema);
