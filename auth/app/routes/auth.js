const express = require("express");
const router = express.Router();
const { signup, login, getUserInfo } = require("../controllers/auth.js");
const middleware = require("../middlewear/middlewaresAuth.js");
router.post("/signup", signup);
router.post("/login", login);
router.get("/getRole", middleware, getUserInfo);

module.exports = router;
