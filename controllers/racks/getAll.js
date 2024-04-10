const service = require("../../services/rack");

const getAll = async (req, res, next) => {
  try {
    const result = await service.getAllRacks();
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  getAll,
};
