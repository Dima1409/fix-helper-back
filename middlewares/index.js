const { validation } = require("./validation");
const { ctrlWrapper } = require("./ctrlWrapper");
const { handleMongooseError } = require("./handleMongooseError");
const { isValidId } = require("./isValidId");
const { isAuth } = require("./isAuth");
const uploadPhoto = require("./uploadPhoto");

module.exports = {
  validation,
  ctrlWrapper,
  handleMongooseError,
  isValidId,
  isAuth,
  uploadPhoto,
};
