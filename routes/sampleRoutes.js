const express = require("express");
const Controllers = require("../controllers/controllers");
const userControllers = require("../controllers/adminController");

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

router.post("/create-user", userControllers.create_user);
module.exports = router;
