const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: String,
  password: String,
  role: {
    type: String,
    enum: ['GUEST', 'USER', 'ADMIN'],
    default: 'GUEST'
  }
}, {
  timestamps: true
})

const User = model("User", userSchema);

module.exports = User