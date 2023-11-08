const mongoose = require("mongoose");

const EnquirySchema = mongoose.Schema;

const EnquirySchemaDetails = new EnquirySchema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneno: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const EnquiryModel = mongoose.model("EnquiryTable", EnquirySchemaDetails);

module.exports = EnquiryModel;
