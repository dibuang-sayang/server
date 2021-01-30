const {
  getUsers,
  deleteDataUser,
  registerUser,
  editUser,
  getUserById,
  loginUser,
} = require("./user/index");

module.exports = {
  Query: {
    users: getUsers,
    user: getUserById,
  },
  Mutation: {
    deleteUser: deleteDataUser,
    register: registerUser,
    editUser: editUser,
    loginUser: loginUser,
  },
};
