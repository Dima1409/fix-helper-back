const service = require("../../services/rack");
const { joiAddRackSchema } = require("../../models/rack");

const createNew = async (req, res, next) => {
  const { error } = joiAddRackSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Missing fields" });
  }
  try {
    const { name, type, kit, application, oem } = req.body;
    const result = await service.createNewRack(
      name,
      type,
      kit,
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
  createNew,
};
