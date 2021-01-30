const { User, Office } = require('../../models');
const { authentication } = require('../../helpers/authentication');

module.exports = authentication(async (_, args, { user }) => {
  try {
    const userId = user.id;
    const userData = await User.findOne({
      where: {
        id: userId,
      },
      include: [Office],
    });
    return userData;
  } catch (error) {
    return error;
  }
});
