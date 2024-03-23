const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  phone: {
    type: String,
  },
  role:{
    type:String,
    default:'user'
  },
  image:{
    type:String,
    default:'',
  }
});

module.exports = mongoose.model("User", userModel);
