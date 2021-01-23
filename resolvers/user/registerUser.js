const { User } = require('../../models');

module.exports = async (_, args) => {
  try {
    const { firstName, lastName, password, role, email } = args.data;

    const newUserData = {
      firstName,
      lastName,
      password,
      role,
      email,
    };

    const registerUser = await User.create(newUserData);
    // console.log(registerUser);
    return registerUser;
  } catch (error) {
    // console.log(error, `dari controller`);
    return error;
  }
};
