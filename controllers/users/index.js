const services = require("../../services/user");
const { schemas } = require("../../models/user/index");
require("dotenv").config();

const { CODE_PASS_USER, CODE_PASS_ADMIN } = process.env;

const registerUser = async (req, res, next) => {
  const { error } = schemas.joiRegisterSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const { name, password, codePass } = req.body;
    let role;
    if (codePass === CODE_PASS_USER) {
      role = "user";
    } else if (codePass === CODE_PASS_ADMIN) {
      role = "admin";
    } else {
      return res.status(400).json({ message: "Invalid codePass" });
    }

    const user = await services.register(name, password, codePass, role);
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
    const { name, password } = req.body;
    const user = await services.login(name, password);
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
  const { name, token, role } = req.user;
  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }
  res.status(200).json({
    status: "success",
    message: "Current User",
    data: {
      name,
      token,
      role,
      isLoggedIn: true
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
