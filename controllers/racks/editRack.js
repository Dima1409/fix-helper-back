const service = require("../../services/rack");
const { joiAddRackSchema } = require("../../models/rack");

const updateRack = async (req, res, next) => {
  const { error } = joiAddRackSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Missing fields" });
  }
  const { id } = req.params;
  try {
    const { name, type, kit, more, application, oem } = req.body;
    const result = await service.editRack(
      id,
      name,
      type,
      kit,
      more,
      application,
      oem
    );
    res.json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  updateRack,
};
