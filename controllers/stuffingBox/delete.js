const service = require("../../services/stuffingBox");
const { NotFound } = require("http-errors");

const deleteStuff = async (req, res, next) => {
    const { id } = req.params;
    const result = await service.deleteElement(id);
    if (!result) {
        return next(NotFound(`Stuff with id: ${id} not found`));
    }
    res.status(200).json({
        status: "success",
        message: `Stuffing-box with id: ${id} deleted`,
        data: {
            result,
        },
    });
};

module.exports = {
    deleteStuff,
};
