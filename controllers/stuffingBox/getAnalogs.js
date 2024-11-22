const service = require("../../services/stuffingBox");

const getAnalogs = async (req, res, next) => {
    const {name} = req.query;
    try {
        const result = await service.getAnalogs(name);
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
    getAnalogs,
};
