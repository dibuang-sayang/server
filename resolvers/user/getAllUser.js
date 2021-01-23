const { User } = require("../../models");
const {authentication } = require("../../helpers/authentication")
module.exports = authentication (async () => {
  try {
    const users = await User.findAll();
    // console.log(users);
    return users;
  } catch (error) {
    console.log(error);
  }
})
