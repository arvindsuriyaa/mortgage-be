const express = require("express");
const Controllers = require("../controllers/controllers");
const userController = require("../controllers/adminController");
const EnquiryController = require("../controllers/EnquiryController");
const RegisterController = require("../controllers/RegisterController");
const LoanController = require("../controllers/LoanController");

const router = express.Router();

// Create
router.post("/create", Controllers.create_post);

// Get All
router.get("/getAllDetails", Controllers.get_all_post);

// Get By Id
router.get("/getById/:id", Controllers.get_by_id);

// Delete
router.delete("/delete/:id", Controllers.delete_by_id);

// PUT
router.put("/update/:id", Controllers.update_by_id);

router.post("/create-user", userController.create_user);

// Enquiry API
router.post("/api/enquiry/add", EnquiryController.create_enquiry);

// Register-User
router.post("/api/register/add", RegisterController.create_user);
router.post("/api/register/update", RegisterController.forget_password);
router.post("/api/register/validate", RegisterController.validate_user);

//login
router.post("/login", RegisterController.login);

//dashboard
router.get("/api/cust/get/:id", RegisterController.get_user_details);

//loan
router.post("/api/loan/add", LoanController.create_loan);
router.get("/api/loan/get", LoanController.get_all_loan);
router.put("/api/loan/update/:id", LoanController.cancel_loan);

module.exports = router;
