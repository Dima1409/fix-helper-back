const { RackSchema, joiAddRackSchema } = require("../../models/rack");
const cloudinary = require("cloudinary").v2;

const getAllRacks = async () => {
  let result = await RackSchema.find({}).sort({ name: 1 });
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

const editRack = async (id, name, type, kit, more, application, oem) => {
  const existingRack = await RackSchema.findOne({ _id: id });
  if (!existingRack) {
    throw new Error(`Rack ${_id} not found`);
  }

  const updates = {};
  if (name) updates.name = name;
  if (type) updates.type = type;
  if (kit) updates.kit = kit;
  if (more) updates.more = more;
  if (application) updates.application = application;
  if (oem) updates.oem = oem;

  if (Object.keys(updates).length === 0) {
    return existingRack;
  }

  const updateRack = await RackSchema.findOneAndUpdate({ _id: id }, updates, {
    new: true,
  });
  return updateRack;
};

const getById = async (id) => {
  const rack = await RackSchema.findById(id);
  if (!rack) {
    throw new Error(`Rack with id: ${id} not found`);
  }
  return rack;
};

const addRackImage = async (id, { mainImage, mainImageId }) => {
  const result = RackSchema.findByIdAndUpdate(
    id,
    {
      mainImage,
      mainImageId,
    },
    { new: true }
  );
  return result;
};

const addRackCenterImage = async (
  id,
  { mainCenterImage, mainCenterImageId }
) => {
  const result = RackSchema.findByIdAndUpdate(
    id,
    {
      mainCenterImage,
      mainCenterImageId,
    },
    { new: true }
  );
  return result;
};

const deleteImage = async (imgId) => {
  const result = await cloudinary.api.delete_resources([imgId], {
    type: "upload",
    resource_type: "image",
  });
  return result;
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
  getById,
  editRack,
  addRackImage,
  addRackCenterImage,
  deleteImage,
};
