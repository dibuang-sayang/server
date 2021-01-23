const { Office } = require("../../models");
const { authentication } = require("../../helpers/authentication");
const {authorizationUserRole} = require("../../helpers/authorizationUserRole");

module.exports = authentication(
  authorizationUserRole(["pengepul", "pengrajin"], async (_, args, ctx) => {
    try {
      const { address, latitude, longitude, phoneNumber, category } = args.data;
      const newData = {
        UserId: ctx.user.id,
        address,
        latitude,
        longitude,
        phoneNumber,
        category,
      };
      console.log(newData);
      console.log(ctx.user, "ctxxxx");
      const newOffice = await Office.create(newData);
      console.log(newOffice);
      return newOffice;
    } catch (error) {
      console.log(error);
    }
  })
);
