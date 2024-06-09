const express = require("express");
const {
  validation,
  ctrlWrapper,
  isAuth,
  isValidId,
  uploadPhoto,
} = require("../../../middlewares");
const { racks } = require("../../../controllers");
const { joiAddRackSchema } = require("../../../models/rack");
const rackRouter = express.Router();

rackRouter.get("/getByName", isAuth, ctrlWrapper(racks.getByName));

rackRouter.get("/getAll", isAuth, ctrlWrapper(racks.getAll));

rackRouter.get("/getById/:id", isAuth, ctrlWrapper(racks.getById));

rackRouter.post(
  "/new",
  isAuth,
  validation(joiAddRackSchema),
  ctrlWrapper(racks.createNew)
);

rackRouter.patch(
  "/edit/:id",
  isAuth,
  validation(joiAddRackSchema),
  ctrlWrapper(racks.updateRack)
);

rackRouter.patch(
  "/mainPhoto/:id",
  isAuth,
  uploadPhoto.single("mainImage"),
  ctrlWrapper(racks.addImage)
);

rackRouter.patch(
  "/centerPhoto/:id",
  isAuth,
  uploadPhoto.single("mainCenterImage"),
  ctrlWrapper(racks.addCenterImage)
);

rackRouter.delete("/:id", isAuth, isValidId, ctrlWrapper(racks.deleteRack));

module.exports = {
  rackRouter,
};
