const { Office } = require("../../models");
const { authentication } = require("../../helpers/authentication");

module.exports = authentication(async (_, args, { user }) => {
  try {
    const officeData = Office.findOne({
      where: {
        UserId: user.id,
      },
    });
    return officeData;
  } catch (error) {
    return error;
  }
});
