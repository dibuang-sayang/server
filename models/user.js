'use strict';
const { Model } = require('sequelize');
const { encode } = require('../helpers/passHelper');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Office);
      User.hasMany(models.Cart)
      // define association here
    }
  }
  User.init(
    {
      firstName: {
        type : DataTypes.STRING,
        validate : {
          notEmpty : {
            msg : "firstName harus terisi"
          }
        }
      },
      lastName: {
        type : DataTypes.STRING,
        validate : {
          notEmpty  : {
            msg : "lastName harus terisi"
          }
        }
      },
      password: {
        type : DataTypes.STRING,
        validate : {
          notEmpty :{
            msg : "password harus terisi"
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: `email sudah dipakai`,
        },
        validate: {
          isEmail: {
            msg: `harus berupa email`,
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        validate: {
          isIn: {
            args: [['pengepul', 'pengrajin', 'anggota']],
            msg: `role salah`,
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      hooks: {
        beforeCreate: (instance) => {
          instance.password = encode(instance.password);
        },
      },
    }
  );
  return User;
};
