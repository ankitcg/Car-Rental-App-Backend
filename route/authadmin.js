const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require('../models/Admin');
const config = require("config");
const auth = require("../middleware/auth");
const { signinAdmin } = require("../controllers/admin");

router.get("/getadmin", auth, async (req, res) => {
  try {
    const user = await Admin.findById(req.user.id).select("-password");
    res.json({ user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/signin",
  [
    check("contact", "please provide atleast 10 digits").isLength({ min: 10 }),
    check("email", "please provide valid email address").isEmail(),
  ],
  auth,
 signinAdmin
);

module.exports = router;
