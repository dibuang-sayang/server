// const { Office } = require("../../models");
const { authentication } = require("../../helpers/authentication");

module.exports = authentication(async (_, args, { user , models}) => {
  try {
    const {Office} = models
    const officeData = await Office.findOne({
      where: {
        UserId: user.id,
      },
      include: [models.Product]
    });
    console.log(officeData);
    return officeData;
  } catch (error) {
    return error;
  }
});
