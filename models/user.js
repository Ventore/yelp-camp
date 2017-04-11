var mongoose = require("mongoose");
var mongooseLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
  username: String,
  password: String
});

userSchema.plugin(mongooseLocalMongoose);

module.exports = mongoose.model("User", userSchema);