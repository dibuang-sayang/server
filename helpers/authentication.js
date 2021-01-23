const { AuthenticationError } = require("apollo-server");
const { tokenVerify } = require("./jwtHelper");

const authentication = (next) => (root, args, context, info) => {
  const token = context.req.headers.token;
  if (token) {
    const user = tokenVerify(token);
    // console.log(user);
    if (user) {
      return next(root, args, { ...context, user }, info);
    } else {
      throw new AuthenticationError("please login ");
    }
  } else {
    throw new AuthenticationError("please login ");
  }
};
module.exports = {
  authentication,
};
