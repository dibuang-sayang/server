const { User } = require("../../models");
const { authentication } = require("../../helpers/authentication");

module.exports = authentication(async (_, args, { user }) => {
  try {
    const userId = user.id;
    const userData = User.findOne({
      where: {
        id: userId,
      },
    });
    return userData;
  } catch (error) {
    return error
  }
});
