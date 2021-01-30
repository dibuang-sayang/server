"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Office extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Office.belongsTo(models.User);
      Office.hasMany(models.Product);
      // define association here
    }
  }
  Office.init(
    {
      UserId: DataTypes.INTEGER,
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "Address can not be empty",
          },
        },
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Latitude can not be empty",
          },
        },
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Longitude can not be empty",
          },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Phone number can not be empty",
          },
        },
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Category can not be empty",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Office",
    }
  );
  return Office;
};
