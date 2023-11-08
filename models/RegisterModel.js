const mongoose = require("mongoose");

const RegisterSchema = mongoose.Schema;

const RegisterSchemaDetails = new RegisterSchema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  acc_no: {
    type: String,
    required: true,
  },
  custid: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  card_number: {
    type: String,
    required: true,
  },
  pin: {
    type: String,
    required: true,
  },
  expiry: {
    type: String,
    required: true,
  },
  registeredAt: {
    type: String,
    required: true,
  },
  modifiedAt: {
    type: String,
  },
  jwt: {
    type: String,
  },
});

const EnquiryModel = mongoose.model(
  "UserRegisterationTable",
  RegisterSchemaDetails
);

module.exports = EnquiryModel;
