const { model, Schema } = require("mongoose");
const Joi = require("joi");
const {
  passwordPattern,
  namePattern,
  codePassPattern,
} = require("../patterns");

const joiRegisterSchema = Joi.object({
  name: Joi.string().pattern(namePattern).required(),
  password: Joi.string().pattern(passwordPattern).required(),
  codePass: Joi.string().pattern(codePassPattern).required(),
});

const joiLoginSchema = Joi.object({
  name: Joi.string().pattern(namePattern).required(),
  password: Joi.string().pattern(passwordPattern).required(),
});

const schemas = {
  joiLoginSchema,
  joiRegisterSchema,
};

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Field is required"],
      match: namePattern,
    },
    password: {
      type: String,
      match: passwordPattern,
      required: [true, "Field is required"],
    },
    codePass: {
      type: String,
      match: codePassPattern,
      required: [true, "Field is required"],
    },
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

const UserSchema = model("user", userSchema);

module.exports = {
  schemas,
  UserSchema,
};
