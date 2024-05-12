const { model, Schema } = require("mongoose");
const Joi = require("joi");
const {
  steeringRackPattern,
  rackKitPattern,
  rackMorePattern,
  artPattern,
  quantityPattern,
  commentPattern,
  applicationPattern,
  oemPattern,
} = require("../patterns");
const validTypes = ["МПК", "ГПК", "ЕПК"];

const joiAddRackSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string().pattern(steeringRackPattern).required(),
  type: Joi.string()
    .valid(...validTypes)
    .required(),
  kit: Joi.object({
    name: Joi.string().pattern(rackKitPattern).required(),
    property: Joi.array()
      .items(
        Joi.object({
          _id: Joi.string(),
          art: Joi.string().pattern(artPattern).required(),
          quantity: Joi.string().pattern(quantityPattern).required(),
          description: Joi.string().pattern(commentPattern).required(),
        })
      )
      .required(),
  }).required(),
  more: Joi.object({
    name: Joi.string().pattern(rackMorePattern).required(),
    property: Joi.array()
      .items(
        Joi.object({
          _id: Joi.string(),
          art: Joi.string().pattern(artPattern).required(),
          quantity: Joi.string().pattern(quantityPattern).required(),
          description: Joi.string().pattern(commentPattern).required(),
        })
      )
      .required(),
  }).required(),
  application: Joi.string().pattern(applicationPattern).required(),
  oem: Joi.string().pattern(oemPattern).required(),
  mainImage: Joi.string(),
  mainImageId: Joi.string(),
  mainImageCenter: Joi.string(),
  mainImageCenterId: Joi.string(),
  createdAt: Joi.string(),
  updatedAt: Joi.string(),
});

const rackSchema = new Schema(
  {
    id: {
      type: String,
    },
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
          _id: {
            type: String,
          },
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
      name: {
        type: String,
        match: rackMorePattern,
        required: [true, "Field is required"],
      },
      property: [
        {
          _id: {
            type: String,
          },
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
    application: {
      type: String,
      required: [true, "Field is required"],
    },
    oem: {
      type: String,
      required: [true, "Field is required"],
    },
    mainImage: {
      type: String,
      default: "",
    },
    mainImageId: {
      type: String,
      default: "",
    },
    mainImageCenter: {
      type: String,
      default: "",
    },
    mainImageCenterId: {
      type: String,
      default: "",
    },
    createdAt: {
      type: String,
    },
    updatedAt: {
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
