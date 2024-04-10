const { RackSchema, joiAddRackSchema } = require("../../models/rack");

const getAllRacks = async () => {
  let result = await RackSchema.find({});
  return result;
};

const getByName = async (name) => {
  let result = await RackSchema.find({ name: name });
  return result;
};

const createNewRack = async (name, type, kit, application, oem) => {
  const existingRack = await RackSchema.findOne({ name: name });
  if (existingRack) {
    throw new Error(`Rack ${rack} already exists`);
  }
  const newRack = await RackSchema.create({
    name,
    type,
    kit,
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
