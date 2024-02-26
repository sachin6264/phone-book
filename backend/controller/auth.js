const User = require("../model/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
// const { json } = require("body-parser");

// user/admin creater

exports.signup = async (req, res) => {
  const errors = validationResult(req);

  if (!errors) {
    return res.status(400).json({ error: errors.array() });
  }

  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (user) {
      return res.send({
        error: `a user with that email [${email}] already exists so please try another one.`,
      });
    }

    const response = await User.create(req.body);
    if (response) {
      return res.send({
        response,
      });
    }
  } catch (error) {
    return res.send({ message: error.message });
  }
};

// user  login

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      res.send({ message: "user not register" });
    } else if (user) {
      const match = await bcrypt.compare(password, user.hash_password);
      if (match) {
        const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.status(201).json({ token, user });
      } else {
        res.send({ message: "invalid password" });
      }
    }
  } catch (error) {
    res.send({ message: error.message });
  }
};
