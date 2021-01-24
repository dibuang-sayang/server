// const { Office } = require("../../models");
const { authentication } = require("../../helpers/authentication");

module.exports = authentication(async (_, args, { user , models}) => {
  try {
    const {Office} = models
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
