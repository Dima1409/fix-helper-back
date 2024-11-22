const { UserSchema } = require("../../models/user");
const { HttpError } = require("../../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

const register = async (name, password, codePass, role) => {
  const user = await UserSchema.findOne({ name });
  if (user) {
    throw HttpError(409, `Name "${name}" already in use`);
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const hashCode = await bcrypt.hash(codePass, 10);
  const newUser = await UserSchema.create({
    name,
    password,
    codePass,
    role,
  });
  const payload = {
    id: newUser._id,
  };
  const userToken = jwt.sign(payload, SECRET_KEY, { expiresIn: "14d" });
  const loginUser = await UserSchema.findByIdAndUpdate(newUser._id, {
    token: userToken,
    password: hashPassword,
    codePass: hashCode,
    role: role,
  });
  return {
    userToken,
    loginUser,
  };
};

const login = async (name, password) => {
  const user = await UserSchema.findOne({ name });
  if (!user) {
    throw HttpError(401, "Name or password invalid");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Name or password invalid");
  }
  const payload = {
    id: user._id,
  };
  const userToken = jwt.sign(payload, SECRET_KEY, { expiresIn: "168h" });
  const loginUser = await UserSchema.findByIdAndUpdate(user._id, {
    token: userToken,
  });
  return {
    userToken,
    loginUser,
  };
};

const logout = async (id) => {
  const userLogout = await UserSchema.findByIdAndUpdate(id, { token: "" });
  return userLogout;
};

const refreshUser = async (userId) => {
  try {
    const refreshedUser = await UserSchema.findById(userId);
    if (!refreshedUser) {
      throw HttpError(401, "User not found");
    }
    return refreshedUser;
  } catch (error) {
    throw HttpError(500, "Internal server error");
  }
};

module.exports = {
  register,
  login,
  logout,
  refreshUser,
};
