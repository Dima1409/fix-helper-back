const service = require("../../services/stuffingBox");

const getByName = async (req, res, next) => {
    const {name, oem} = req.query;
    try {
        const result = await service.getByName(name, oem);
        res.json({
            status: "success",
            code: 200,
            data: {
                result,
            },
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

module.exports = {
    getByName,
};
