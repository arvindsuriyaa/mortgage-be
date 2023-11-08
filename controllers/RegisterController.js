const RegisterModel = require("../models/RegisterModel.js");
const jwt = require("jsonwebtoken");

const throwError = (res, response) => {
  res.status(500).send({ error: `response is ${response}` });
};

// Create enquiry
const create_user = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const newData = new RegisterModel({
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
    acc_no: req.body.acc_no,
    custid: req.body.custid,
    gender: req.body.gender,
    dob: req.body.dob,
    card_number: req.body.card_number,
    pin: req.body.pin,
    expiry: req.body.expiry,
    registeredAt: req.body.registeredAt,
    modifiedAt: req.body.modifiedAt,
  });
  newData
    .save()
    .then((result) => {
      if (!result) {
        return throwError(res, result);
      }
      res.send({ message: "User Registeration completed Successfully" });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const validate_user = async (req, res) => {
  let data = await RegisterModel.find({
    custid: req.body.custid,
    email: req.body.email,
    pin: req.body.pin,
  });
  if (data?.length) {
    return res.send({ message: "User Found", isUserExist: true });
  }
  return res.send({ message: "User Not Found", isUserExist: false });
};

const forget_password = async (req, res) => {
  RegisterModel.updateOne(
    { pin: req.body.pin, email: req.body.email },
    { $set: { password: req.body.password } }
  )
    .then((result) => {
      res.send({ message: "Credential Updated", success: true });
    })
    .catch((err) => {
      res.send({ message: "Something went wrong", success: false });
    });
};

const login = async (req, res) => {
  let data = await RegisterModel.find({
    email: req.body.email,
    password: req.body.password,
  });
  if (data?.length) {
    const payload = {
      email: req.body.email,
      password: req.body.password,
    };
    const secret = "mortgage-access";
    const token = jwt.sign(payload, secret, { expiresIn: "2s" });
    validate_token(
      "eyJhbGciOiJIUzI1NissIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFydmluZHMyNjA1QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiOTg3NiIsImlhdCI6MTY5OTQ3MDg4MiwiZXhwIjoxNjk5NDc0NDgyfQ.RU1EDsJ4nii1N3xe0T4X02zzMImPN8aGpnFWsF5yuCk"
    );
    RegisterModel.updateOne(
      { email: req.body.email, password: req.body.password },
      { $set: { jwt: token } }
    )
      .then((result) => {
        res.send({
          email: req.body.email,
          password: req.body.password,
          token,
          isUserExist: true,
        });
      })
      .catch((err) => {
        res.send({ message: "Something went wrong", success: false });
      });
    return;
  }
  return res.send({ message: "User Not Found", isUserExist: false });
};

const validate_token = async (token) => {
  try {
    const decodedToken = jwt.verify(token, "mortgage-access");
    if (decodedToken) {
      return true;
    }
  } catch (error) {
    return false;
  }
};

module.exports = {
  create_user,
  forget_password,
  validate_user,
  login,
  validate_token,
};
