const { model, Schema } = require("mongoose");
const Joi = require("joi");
const {
  steeringRackPattern,
  rackKitPattern,
  rackMorePattern,
} = require("../patterns");
const validTypes = ["МПК", "ГПК", "ЕПК"];

const joiAddRackSchema = Joi.object({
  name: Joi.string().pattern(steeringRackPattern).required(),
  type: Joi.string()
    .valid(...validTypes)
    .required(),
  kit: Joi.object({
    name: Joi.string().pattern(rackKitPattern).required(),
    property: Joi.array()
      .items(
        Joi.object({
          art: Joi.string().required(),
          quantity: Joi.string().required(),
          description: Joi.string(),
        })
      )
      .required(),
  }).required(),
  more: Joi.string().pattern(rackMorePattern).required(),
  application: Joi.string().required(),
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
      required: [true, "Field is required"],
    },
    kit: {
      name: {
        type: String,
        match: rackKitPattern,
        required: [true, "Field is required"],
      },
      property: [
        {
          art: {
            type: String,
            required: [true, "Field is required"],
          },
          quantity: {
            type: String,
            required: [true, "Field is required"],
          },
          description: {
            type: String,
          },
        },
      ],
    },
    more: {
      type: String,
      match: rackMorePattern,
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
  joiAddRackSchema,
  RackSchema,
};
