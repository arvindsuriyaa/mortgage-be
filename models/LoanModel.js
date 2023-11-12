const mongoose = require("mongoose");

const LoanSchema = mongoose.Schema;

const LoanSchemaDetails = new LoanSchema({
  address: {
    type: String,
  },
  applytime: {
    type: String,
  },
  creditscore: {
    type: String,
  },
  income: {
    type: String,
  },
  interest: {
    type: String,
  },
  loanamt: {
    type: String,
  },
  loantenure: {
    type: String,
  },
  occupation: {
    type: String,
  },
  offer: {
    type: String,
  },
  status: {
    type: String,
  },
  tin: {
    type: String,
  },
  currentstatus: {
    type: String,
  },
  updatetime: {
    type: String,
  },
  approved: {
    type: String,
  },
  custid: {
    type: String,
  },
  propertyrate: {
    type: String,
  },
  loanId: {
    type: String,
  },
});

const LoanModel = mongoose.model("LoanCollection", LoanSchemaDetails);

module.exports = LoanModel;
