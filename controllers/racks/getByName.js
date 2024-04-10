const service = require("../../services/rack");

const getByName = async (req, res, next) => {
  const { name } = req.body;
  try {
    const result = await service.getByName(name);
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
  getByName,
};
