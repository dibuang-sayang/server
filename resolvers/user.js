const { getUsers } = require("./user/index");

module.exports = {
  Query: {
    users: getUsers,
  },
};
