const express = require("express");
const {
  validation,
  ctrlWrapper,
  isAuth,
  isValidId,
} = require("../../../middlewares");
const { racks } = require("../../../controllers");
const { joiAddRackSchema } = require("../../../models/rack");
const rackRouter = express.Router();

rackRouter.get("/getByName", isAuth, ctrlWrapper(racks.getByName));

rackRouter.get("/getAll", isAuth, ctrlWrapper(racks.getAll));

rackRouter.post(
  "/new",
  isAuth,
  validation(joiAddRackSchema),
  ctrlWrapper(racks.createNew)
);

rackRouter.delete("/:id", isAuth, isValidId, ctrlWrapper(racks.deleteRack));

module.exports = {
  rackRouter,
};
