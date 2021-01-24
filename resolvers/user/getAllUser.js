const { User } = require('../../models');
const { authentication } = require('../../helpers/authentication');
module.exports = authentication(async () => {
  try {
    return (users = await User.findAll());
  } catch (error) {
    return error;
  }
});
