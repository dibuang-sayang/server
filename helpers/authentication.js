const { AuthenticationError } = require('apollo-server');
const { tokenVerify } = require('./jwtHelper');
const { User } = require('../models');

const authentication = (next) => async (root, args, context, info) => {
  const token = context.req.headers.token;
  if (token) {
    const incomingUser = tokenVerify(token);
    const userFromDb = await User.findOne({ where: { id: incomingUser.id } });
    if (incomingUser.email === userFromDb.email) {
      return next(root, args, { ...context, user: incomingUser }, info);
    } else {
      throw new AuthenticationError('Token invalid');
    }
  } else {
    throw new AuthenticationError('please login ');
  }
};
module.exports = {
  authentication,
};
