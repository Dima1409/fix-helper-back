const service = require("../../services/stuffingBox");
const { joiAddStuffingBoxSchema } = require("../../models/stuffing-box");

const updateStuff = async (req, res, next) => {
    const { error } = joiAddStuffingBoxSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Missing fields" });
    }
    const { id } = req.params;
    try {
        const { name, type, position, d1, d2, D, h1, H } = req.body;
        const result = await service.edit(
            id, name, type, position, d1, d2, D, h1, H
        );
        res.json({
            status: "success",
            code: 201,
            data: {
                result,
            },
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports = {
    updateStuff,
};
