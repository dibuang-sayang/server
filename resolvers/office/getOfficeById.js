const { Office } = require("../../models");
const { authentication } = require("../../helpers/authentication");

module.exports = authentication(async (_, args, { user }) => {
  console.log(args);
  try {
    // const user = await userLogin;
    console.log(user, "<<<< User");
    const officeId = user.id;
    const officeData = Office.findOne({
      where: {
        UserId: user.id,
      },
    });
    // console.log(officeData);
    return officeData;
  } catch (error) {
    console.log(error);
  }
});
