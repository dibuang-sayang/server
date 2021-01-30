const { User } = require('../../models');

module.exports = async (_, args) => {
  try {
    // console.log(args)
    const { firstName, lastName, password, role, email } = args.data;

    const newUserData = {
      firstName,
      lastName,
      password,
      role,
      email,
    };
    return registerUser = await User.create(newUserData);
  } catch (error) {
    return error;
  }
};
