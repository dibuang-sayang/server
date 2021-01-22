const jwt = require("jsonwebtoken");

const tokenEncode = (obj) => {
  return jwt.sign(obj, process.env.SECRET);
};

module.exports = {
  tokenEncode,
};
