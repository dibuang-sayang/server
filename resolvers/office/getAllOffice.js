// const { Office } = require("../../models");

module.exports = async (_, __, {models}) => {
  try {
    const {Office} = models
    const officeData = await Office.findAll({
      include: ["User"],
    });
    return officeData;

  } catch (error) {
    return error;
  }
};
