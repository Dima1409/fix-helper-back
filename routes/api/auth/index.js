const express = require("express");
const { validation, ctrlWrapper, isAuth } = require("../../../middlewares");
const { users } = require("../../../controllers");
const { schemas } = require("../../../models/user");
const authRouter = express.Router();

authRouter.post(
  "/register",
  validation(schemas.joiRegisterSchema),
  ctrlWrapper(users.registerUser)
);

authRouter.post(
  "/login",
  validation(schemas.joiLoginSchema),
  ctrlWrapper(users.loginUser)
);

authRouter.get("/logout", isAuth, ctrlWrapper(users.logoutUser));
authRouter.get("/current", isAuth, ctrlWrapper(users.getCurrent));

module.exports = {
  authRouter,
};
