const { getAll } = require("./getAll");
const { createNew } = require("./createNew");
const { deleteRack } = require("./delete");
const { getByName } = require("./getByName");
const { getById } = require("./getById");
const { updateRack } = require("./editRack");
const { addImage } = require("./addImage");

module.exports = {
  getAll,
  createNew,
  deleteRack,
  getByName,
  getById,
  updateRack,
  addImage,
};
