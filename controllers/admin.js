const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const config = require('config')

const signupAdmin = async(req,res)=>{
    const { email, password } = req.body;
    try {
      let user = await Admin.findOne({ email });
      if (user) {
        return res.send("User Already Exists");
      }
      user = new Admin({
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("secretKey"),
        { expiresIn: "3d" },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
}

const signinAdmin = async(req,res)=>{
    const { email, password } = req.body;
    try {
      const user = await Admin.findOne({  email });
      if (!user) {
        return res.status(401).send("Use Correct Credentials");
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.json({ error: "Invalid Credentials" });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("secretKey"),
        { expiresIn: "3d" },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({ token });
        }
      );
    } catch (error) {
      res.status(500).send("Server Error");
    }
}

module.exports = {
    signupAdmin,
    signinAdmin
}