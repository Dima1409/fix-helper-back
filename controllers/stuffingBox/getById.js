const service = require("../../services/stuffingBox");
const { NotFound } = require("http-errors");

const getById = async (req, res, next) => {
    const { id } = req.params;
    const result = await service.getById(id);
    if (!result) {
        return next(NotFound(`Stuffing-box with id: ${id} not found`));
    }
    res.status(200).json({
        status: "success",
        message: `Stuffing-box with id: ${id} founded`,
        data: {
            result,
        },
    });
};

module.exports = {
    getById,
};
