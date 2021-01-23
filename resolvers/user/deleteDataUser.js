const { User } = require("../../models");
const {authentication } = require("../../helpers/authentication")

module.exports = authentication (async (_, args, { user }) => {
  try {
    const userId = user.id;
    const deletedUser = await User.destroy({ where: { id: userId } });
    console.log(deletedUser);
    let message = null;
    deletedUser
      ? (message = { msg: "Succes delete Data" })
      : (message = { msg: "data not found" });
    return message;
  } catch (error) {
    console.log(error);
  }
});
