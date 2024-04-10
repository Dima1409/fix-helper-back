const service = require("../../services/rack");
const { NotFound } = require("http-errors");

const deleteRack = async (req, res, next) => {
  const { id } = req.params;
  const result = await service.deleteRack(id);
  if (!result) {
    return next(NotFound(`Rack with id: ${id} not found`));
  }
  res.status(200).json({
    status: "success",
    message: `Rack with id: ${id} deleted`,
    data: {
      result,
    },
  });
};

module.exports = {
  deleteRack,
};
