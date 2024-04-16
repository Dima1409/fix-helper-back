const { RackSchema, joiAddRackSchema } = require("../../models/rack");

const getAllRacks = async () => {
  let result = await RackSchema.find({});
  return result;
};

const getByName = async (name, oem) => {
  if (!name && !oem) {
    throw new Error("Name or OEM must be provided");
  }

  let query = {};

  if (name) {
    query.name = { $regex: `.*${name}.*`, $options: "i" };
  }

  if (oem) {
    query.oem = { $regex: `.*${oem}.*`, $options: "i" };
  }

  const rack = await RackSchema.findOne(query);

  if (!rack) {
    throw new Error("Rack not found");
  }

  return rack;
};

const createNewRack = async (name, type, kit, more, application, oem) => {
  const existingRack = await RackSchema.findOne({ name: name });
  if (existingRack) {
    throw new Error(`Rack ${name} already exists`);
  }
  const newRack = await RackSchema.create({
    name,
    type,
    kit,
    more,
    application,
    oem,
  });
  return newRack;
};

const deleteRack = async (id) => {
  const rack = await RackSchema.findByIdAndRemove(id);
  if (!rack) {
    throw new Error(`Rack with id: ${id} not found`);
  }
  return rack;
};

module.exports = {
  getAllRacks,
  getByName,
  createNewRack,
  deleteRack,
};
