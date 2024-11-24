const express = require("express");
const {
    validation,
    ctrlWrapper,
    isAuth,
    isValidId,
} = require("../../../middlewares");
const {stuffingBoxes} = require("../../../controllers");
const {joiAddStuffingBoxSchema} = require("../../../models/stuffing-box");
const stuffRouter = express.Router();

stuffRouter.post(
    "/new",
    isAuth,
    validation(joiAddStuffingBoxSchema),
    ctrlWrapper(stuffingBoxes.createNew)
);

stuffRouter.patch(
    "/edit/:id",
    isAuth,
    validation(joiAddStuffingBoxSchema),
    ctrlWrapper(stuffingBoxes.updateStuff)
);

stuffRouter.get("/getAll", isAuth, ctrlWrapper(stuffingBoxes.getAll));

stuffRouter.get("/getByName", isAuth, ctrlWrapper(stuffingBoxes.getByName));

stuffRouter.get("/getById/:id", isAuth, ctrlWrapper(stuffingBoxes.getById));

stuffRouter.delete("/:id", isAuth, isValidId, ctrlWrapper(stuffingBoxes.deleteStuff));

module.exports = {
    stuffRouter
}