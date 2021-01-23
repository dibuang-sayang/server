const { User } = require("../../models");
const { decode } = require("../../helpers/passHelper");
const { tokenEncode } = require("../../helpers/jwtHelper");

module.exports = async (_, args) => {
  try {
    const loginUser = await User.findOne({ where: { email: args.email } });
    console.log(loginUser);
    if (loginUser && decode(args.password, loginUser.password)) {
      return {
        token: tokenEncode({
          email: loginUser.email,
          id: loginUser.id,
          role: loginUser.role,
        }),
      };
    }
  } catch (error) {}
};
