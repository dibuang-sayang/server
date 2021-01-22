const { 
  getUsers, 
  deleteDataUser,
  registerUser,
  editUser,
  getUserById
} = require("./user/index");

module.exports = {
  Query: {
    users: getUsers,
    user: getUserById
  },
  Mutation : {
    deleteUser : deleteDataUser,
    register : registerUser,
    editUser : editUser
  }
};
