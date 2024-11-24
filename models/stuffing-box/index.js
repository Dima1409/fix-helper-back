const {model, Schema} = require("mongoose");
const Joi = require("joi");
const {nameP, diameterP, positionP, typeP, heightP} = require("../patterns/stuffing-box-patterns")

const joiAddStuffingBoxSchema = Joi.object({
    id: Joi.string(),
    name: Joi.string().pattern(nameP).required(),
    type: Joi.string().valid(...typeP).required(),
    position: Joi.string().pattern(positionP).required(),
    d1: Joi.string().pattern(diameterP).required(),
    d2: Joi.string().pattern(diameterP),
    D: Joi.string().pattern(diameterP).required(),
    h1: Joi.string().pattern(heightP),
    H: Joi.string().pattern(heightP).required(),
    analogs: Joi.array().items(Joi.string()),
    mainImage: Joi.string(),
    mainImageId: Joi.string(),
    imgFile: Joi.object(),
    createdAt: Joi.string(),
    updatedAt: Joi.string(),
});

const stuffingBox = new Schema(
    {
        id: {
            type: String,
        },
        name: {
            type: String,
            required: [true, "Field is required"],
            match: nameP,
        },
        type: {
            type: String,
            required: [true, "Field is required"],
        },
        position: {
            type: String,
            required: [true, "Field is required"],
            match: positionP
        },
        d1: {
            type: String,
            required: [true, "Field is required"],
            match: diameterP
        },
        d2: {
            type: String,
            match: diameterP
        },
        D: {
            type: String,
            required: [true, "Field is required"],
            match: diameterP
        },
        h1: {
            type: String,
            match: heightP
        },
        H: {
            type: String,
            required: [true, "Field is required"],
            match: heightP
        },
        analogs: {
            type: [String],
        },
        mainImage: {
            type: String,
        },
        mainImageId: {
            type: String,
        },
        imgFile: {
            type: Object,
        },
        createdAt: {
            type: String,
        },
        updatedAt: {
            type: String,
        },
    },
    {versionKey: false, timestamps: true}
);

const StuffingBoxSchema = model("stuffing-box", stuffingBox);

module.exports = {
    joiAddStuffingBoxSchema,
    StuffingBoxSchema
}