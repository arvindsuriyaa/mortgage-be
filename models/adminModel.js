const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema;

const AdminSchemaDetails = new AdminSchema({
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
  },
});

const AdminModel = mongoose.model("AdminCollection", AdminSchemaDetails);

module.exports = AdminModel;
