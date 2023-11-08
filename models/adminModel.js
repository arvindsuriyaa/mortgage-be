const mongoose = require("mongoose");

const userSchema = mongoose.Schema;

const userSchemaDetails = new userSchema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  jwt: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model("LoginCollection", userSchemaDetails);

module.exports = UserModel;
