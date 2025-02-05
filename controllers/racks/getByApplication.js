const service = require('../../services/rack');

const getByApplication = async (req, res, next) => {
    try {
        const {application} = req.query;

        if(!application) {
            return res.status(400).json({
                status: 'error',
                code: 400,
                message: 'Application part not found',
            })
        }

        const result = await service.getRacksByApplication(application);
        res.json({
            status: "success",
            code: 200,
            data: {
                result
            }
        });
    } catch (err) {
        console.error(err);
        next(err)
    }
}


module.exports = {
    getByApplication,
}