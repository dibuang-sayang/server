const bcrypt = require("bcryptjs");

const encode = (plain) => {
  const salt = bcrypt.genSaltSync(8);
  return bcrypt.hashSync(plain, salt);
};

const decode = (plain, hash) => {
  return bcrypt.compareSync(plain, hash);
};

module.exports = {
  encode,
  decode,
};
