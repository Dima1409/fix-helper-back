const service = require('../../services/stuffingBox');
const {joiAddStuffingBoxSchema} = require('../../models/stuffing-box')

const createNew = async (req, res, next) => {
    const {error} = joiAddStuffingBoxSchema.validate(req.body);
    if (error) {
        return res.status(400).json({message: "Missing fields"});
    }
    const {name, type, position, d1, d2, D, h1, H} = req.body;
    try {
        const result = await service.createNew(
            name, type, position, d1, d2, D, h1, H
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
    createNew,
};