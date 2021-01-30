const jwt = require("jsonwebtoken");

const tokenEncode = (obj) => {
  return jwt.sign(obj, process.env.SECRET);
};
const tokenVerify = (token) => {
  return jwt.verify(token, process.env.SECRET)
}

module.exports = {
  tokenEncode,
  tokenVerify
};
