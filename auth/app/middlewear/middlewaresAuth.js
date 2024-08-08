const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = (req, res, next) => {
  console.log("7");
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(decodedToken);
    const userId = decodedToken.id;
    const role = decodedToken.role;

    req.auth = {
      userId,
      role,
    };

    next();
  } catch (error) {
    res.status(401).json({
      error: "reqête non autorizée",
    });
  }
};
