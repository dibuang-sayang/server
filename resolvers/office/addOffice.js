const { Office } = require("../../models");
const { authentication } = require("../../helpers/authentication");
const {authorizationUserRole} = require("../../helpers/authorizationUserRole");

module.exports = authentication(
  authorizationUserRole(["pengepul", "pengrajin"], async (_, args, ctx) => {
    try {
      // console.log(ctx, "ini ctx");
      // console.log(args, "ini args");
      // const {Office} = ctx.models
      const { address, latitude, longitude, phoneNumber, category } = args.data;
      const newData = {
        UserId: ctx.user.id,
        address,
        latitude,
        longitude,
        phoneNumber,
        category,
      };
      const newOffice = await Office.create(newData);
      return newOffice;
    } catch (error) {
      console.log(error);
      return error;
    }
  })
);
