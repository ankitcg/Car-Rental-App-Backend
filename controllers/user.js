const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signupUser = async(req,res)=>{
    const { name, contact, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.send("User Already Exists");
      }
      user = new User({
        name,
        email,
        contact,
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
      console.error(error);
      res.status(500).send("Server Error");
    }
}

const signinUser = async(req,res)=>{
    const { contact, email, password } = req.body;
    try {
      const user = await User.find({ contact, email });
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
    signupUser,
    signinUser
}