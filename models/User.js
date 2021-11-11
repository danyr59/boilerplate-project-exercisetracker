const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: String,
})

// module.exports = UserSchema;
// module.exports = {
//   User: mongoose.model("User", UserSchema),
//   UserSchema
// }
module.exports.UserSchema = UserSchema;
module.exports.User = mongoose.model("User", UserSchema);
