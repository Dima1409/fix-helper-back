const services = require("../../services/user");
const { HttpError } = require("../../helpers");
const { schemas } = require("../../models/user/index");

const registerUser = async (req, res, next) => {
  const { error } = schemas.joiRegisterSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Missing fields" });
  }
  try {
    const { name, password, codePass } = req.body;
    const user = await services.register(name, password, codePass);
    res.status(201).json({
      status: "success",
      message: "User created",
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { error } = schemas.joiLoginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Missing fields" });
  }
  try {
    const { name, password, codePass } = req.body;
    const user = await services.login(name, password, codePass);
    res.status(200).json({
      status: "success",
      message: "User success login",
      data: {
        user,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getCurrent = async (req, res) => {
  const { name, token } = req.user;
  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }
  res.status(200).json({
    status: "success",
    message: "Current User",
    data: {
      name,
      token,
    },
  });
};

const logoutUser = async (req, res, next) => {
  const { _id } = req.user;
  await services.logout(_id);
  res.status(204).json({
    message: "Logout success",
  });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrent,
};
