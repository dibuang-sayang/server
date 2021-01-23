const { Office } = require("../../models");

module.exports = async (_, __) => {
  try {
    const officeData = await Office.findAll({
      include: ["User"],
    });
    return officeData;
  } catch (error) {
    return error;
  }
};
