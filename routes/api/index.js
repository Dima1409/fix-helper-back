const { authRouter } = require("./auth");
const { rackRouter } = require("./rack");
const { stuffRouter } = require("./stuffBox");

module.exports = {
  authRouter,
  rackRouter,
  stuffRouter
};
