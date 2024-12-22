const service = require("../../services/stuffingBox");

const getByParameters = async (req, res, next) => {
    const {d1, d2, D, h1, H, type, position, ...ranges} = req.query;
    try {
        const searchParams = {
            d1: d1 ? Number(d1) : undefined,
            d2: d2 ? Number(d2) : undefined,
            D: D ? Number(D) : undefined,
            h1: h1 ? Number(h1) : undefined,
            H: H ? Number(H) : undefined,
            type: type || undefined,
            position: position || undefined,
        };

        const numericRanges = {};
        for (const key in ranges) {
            if (key.startsWith("range_")) {
                numericRanges[key] = Number(ranges[key]);
            }
        }

        const result = await service.getByParameters(searchParams, numericRanges);

        console.log(result, 'result');
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
    getByParameters,
};
