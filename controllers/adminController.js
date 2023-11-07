const AdminModel = require("../models/adminModel.js");

const throwError = (res, response) => {
  res.status(500).send({ error: `response is ${response}` });
};

// Create user
const create_user = (req, res) => {
  const newData = new AdminModel({
    userName: req.body.userName,
    password: req.body.password,
    jwt: req.body.jwt,
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

module.exports = {
  create_user,
};
