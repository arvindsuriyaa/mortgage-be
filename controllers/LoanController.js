const LoanModel = require("../models/LoanModel.js");
const { validate_token } = require("../utils.js");

const throwError = (res, response) => {
  res.status(500).send({ error: `response is ${response}` });
};

// Create user
const create_loan = (req, res) => {
  validate_token({
    req,
    res,
    fn: () => {
      const newData = new LoanModel({
        address: req.body.address,
        applytime: req.body.applytime,
        approved: req.body.approved,
        creditscore: req.body.creditscore,
        custid: req.body.custid,
        income: req.body.income,
        interest: req.body.interest,
        loanamt: req.body.loanamt,
        loantenure: req.body.loantenure,
        occupation: req.body.occupation,
        offer: req.body.offer,
        propertyrate: req.body.propertyrate,
        status: req.body.status,
        tin: req.body.tin,
        currentstatus: req.body.currentstatus,
        updatetime: req.body.updatetime,
        loanId: req.body.loanId,
      });
      newData
        .save()
        .then((result) => {
          if (!result) {
            return throwError(res, result);
          }
          res.send({
            message: "Data Saved Successfully",
            success: true,
            result,
          });
        })
        .catch((err) => {
          res.status(500).send(err);
        });
    },
  });
};

//get all loan
const get_all_loan = (req, res) => {
  validate_token({
    req,
    res,
    fn: () => {
      LoanModel.find()
        .then((result) => {
          if (!result) {
            return throwError(res, result);
          }
          res.send({ result, success: true });
        })
        .catch((err) => res.status(500).send(err));
    },
  });
};

//update loan

const update_loan = (req, res) => {
  validate_token({
    req,
    res,
    fn: () => {
      let payload = {
        ...(req.body.updatetime && { updatetime: req.body.updatetime }),
        ...(req.body.status && { status: req.body.status }),
        ...(req.body.currentstatus && { currentstatus: req.body.currentstatus }),
      };
      LoanModel.updateOne({ loanId: req.params.id }, { $set: { ...payload } })
        .then((result) => {
          res.send({ message: "Status Updated", result, success: true });
        })
        .catch((err) => {
          res.send({ message: "Something went wrong", success: false });
        });
    },
  });
};

module.exports = {
  create_loan,
  get_all_loan,
  update_loan,
};
