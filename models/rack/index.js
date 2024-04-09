const { model, Schema } = require("mongoose");
const Joi = require("joi");
const { steeringRackPattern, rackKitPattern } = require("../patterns");
const validTypes = ["МПК", "ГПК", "ЕПК"];

const joiRackSchema = Joi.object({
  name: Joi.string().pattern(steeringRackPattern).required(),
  type: Joi.string()
    .valid(...validTypes)
    .required(),
  kit: Joi.string().pattern(rackKitPattern).required(),
  application: ring().required(),
  oem: Joi.string().required(),
  image: Joi.string(),
});

const rackSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Field is required"],
      match: steeringRackPattern,
    },
    type: {
      type: String,
      match: validTypes,
      required: [true, "Field is required"],
    },
    kit: {
      type: String,
      match: rackKitPattern,
      required: [true, "Field is required"],
    },
    application: {
      type: String,
      required: [true, "Field is required"],
    },
    oem: {
      type: String,
      required: [true, "Field is required"],
    },
    image: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const RackSchema = model("rack", rackSchema);

module.exports = {
  joiRackSchema,
  RackSchema,
};
