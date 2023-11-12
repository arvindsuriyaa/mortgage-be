const RegisterModel = require("../models/RegisterModel.js");
const jwt = require("jsonwebtoken");
const { validate_token } = require("../utils.js");
const AdminModel = require("../models/adminModel.js");

const throwError = (res, response) => {
  res.status(500).send({ error: `response is ${response}` });
};

// Create enquiry
const create_user = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  let dataWithCustId = await RegisterModel.find({
    custid: req.body.custid,
  });

  let dataWithEmailId = await RegisterModel.find({
    email: req.body.email,
  });

  if (dataWithCustId?.length || dataWithEmailId?.length) {
    return res.send({
      message: "User Already exist",
      success: false,
    });
  }
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
      res.send({
        message: "User Registeration completed Successfully",
        success: true,
      });
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
    return res.send({ message: "User Found", success: true });
  }
  return res.send({ message: "User Not Found", success: false });
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
  if (req?.body?.admin) {
    let data = await AdminModel.find({
      userName: req.body.userName,
      password: req.body.password,
    });
    if (data?.length) {
      const payload = {
        custid: req.body.custid,
        password: req.body.password,
      };
      const secret = "mortgage-admin-access";
      const token = jwt.sign(payload, secret, { expiresIn: "1h" });

      AdminModel.updateOne(
        { userName: req.body.userName, password: req.body.password },
        { $set: { jwt: token } }
      )
        .then((result) => {
          res.send({
            userName: req.body.userName,
            password: req.body.password,
            token,
            success: true,
          });
        })
        .catch((err) => {
          res.send({ message: "Something went wrong", success: false });
        });
      return;
    }
  } else {
    let data = await RegisterModel.find({
      custid: req.body.custid,
      password: req.body.password,
    });
    if (data?.length) {
      const payload = {
        custid: req.body.custid,
        password: req.body.password,
      };
      const secret = "mortgage-access";
      const token = jwt.sign(payload, secret, { expiresIn: "1h" });

      RegisterModel.updateOne(
        { custid: req.body.custid, password: req.body.password },
        { $set: { jwt: token } }
      )
        .then((result) => {
          res.send({
            custid: req.body.custid,
            password: req.body.password,
            token,
            success: true,
          });
        })
        .catch((err) => {
          res.send({ message: "Something went wrong", success: false });
        });
      return;
    }
  }
  return res.send({ message: "User Not Found", success: false });
};

const get_user_details = async (req, res) => {
  validate_token({
    req,
    res,
    fn: async () => {
      let data = await RegisterModel.find({
        custid: req.params.id,
      });
      if (data?.length) {
        return res.send({ data, success: true });
      }
      return res.send({ message: "User Does not exist", success: true });
    },
  });
};

const add_admin = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  let data = await AdminModel.find({
    userName: req.body.userName,
  });

  if (data?.length) {
    return res.send({
      message: "This Admin Already exist",
      success: false,
    });
  }
  const newData = new AdminModel({
    userName: req.body.userName,
    password: req.body.password,
  });
  newData
    .save()
    .then((result) => {
      if (!result) {
        return throwError(res, result);
      }
      res.send({
        message: "Admin Registeration completed Successfully",
        success: true,
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
module.exports = {
  create_user,
  forget_password,
  validate_user,
  login,
  get_user_details,
  add_admin
};
