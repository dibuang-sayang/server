const { Office } = require("../../models");
const { authentication } = require("../../helpers/authentication");
const {
  authorizationUserRole,
} = require("../../helpers/authorizationUserRole");
module.exports = authentication(
  authorizationUserRole(
    ["pengepul", "pengrajin"],
    async (_, args, { user }) => {
      try {
        console.log(args);
        const { id } = await Office.findOne({ where: { UserId: user.id } });
        console.log(id, "ini id");

        const {
          UserId,
          address,
          latitude,
          longitude,
          phoneNumber,
          category,
        } = args.data;
        const newData = {
          UserId,
          address,
          latitude,
          longitude,
          phoneNumber,
          category,
        };
        const editedOffice = await Office.update(newData, {
          where: {
            id: id,
          },
          returning: true,
        });
        const data = editedOffice[1][0].dataValues;
        return data;
      } catch (error) {
        return error;
      }
    }
  )
);
