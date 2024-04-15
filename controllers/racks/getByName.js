const service = require("../../services/rack");

const getByName = async (req, res, next) => {
  const { name, oem } = req.query;
  console.log(req.params);
  try {
    const result = await service.getByName(name, oem);
    console.log(result);
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
