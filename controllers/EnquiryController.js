const EnquiryModel = require("../models/EnquiryModel.js");
const { validate_token } = require("../utils.js");

const throwError = (res, response) => {
  res.status(500).send({ error: `response is ${response}` });
};

// Create enquiry
const create_enquiry = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const newData = new EnquiryModel({
    name: req.body.name,
    address: req.body.address,
    phoneno: req.body.phoneno,
    email: req.body.email,
    message: req.body.message,
  });
  newData
    .save()
    .then((result) => {
      if (!result) {
        return throwError(res, result);
      }
      res.send({ message: "Data Saved Successfully" });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

//get all enquiry
const get_all_enquiry = (req, res) => {
  validate_token({
    req,
    res,
    fn: () => {
      EnquiryModel.find()
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

module.exports = {
  create_enquiry,
  get_all_enquiry,
};
