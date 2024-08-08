const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(err.status || 500).json({
      error: err.message || `Some error occurred while creating user.`,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordMatch) {
      return res.status(401).json({
        error: "Wrong password.",
      });
    }

    const token = await jwt.sign(
      { id: user._id, role: user.role },
      process.env.TOKEN_SECRET,
      {
        expiresIn: Number(process.env.TOKEN_EXPIRATION),
      }
    );

    res.status(200).json({
      token,
      user: {
        email: user.email,
      },
    });
  } catch (err) {
    res.status(err.status || 500).json({
      error: err.message || `Some error occurred while logging user.`,
    });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const userInfo = {
      id: req.auth.userId,
      role: req.auth.role,
    };
    console.log(userInfo);
    res.status(200).json(userInfo);
  } catch (error) {
    res.status(404).json({
      message: "Utilisateur introuvable",
    });
  }
};
