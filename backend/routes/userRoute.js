const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/signin", userController.signin);
router.post("/signup", userController.signup);
router.get("/:id/profile", userController.profile);

module.exports = router;
