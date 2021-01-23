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
        const currentOffice = await Office.findOne({
          where: { UserId: user.id },
        });
        if (!currentOffice) {
          throw new Error("office not found");
        }
        const deletedOffice = await Office.destroy({
          where: {
            id: currentOffice.id,
          },
        });
        let message = null;
        deletedOffice
          ? (message = { msg: "success delete office data" })
          : (message = { msg: "data not found" });
        return message;
      } catch (error) {
        return error;
      }
    }
  )
);

