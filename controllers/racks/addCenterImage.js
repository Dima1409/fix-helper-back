const service = require("../../services/rack");

const addCenterImage = async (req, res, next) => {
  const { id } = req.params;
  const mainCenterImage = req.file ? req.file.path : req.rack.mainCenterImage;
  const mainCenterImageId = req.file
    ? req.file.filename
    : req.rack.mainCenterImageId;
  console.log("mainCenterImage in ADDCENTER", mainCenterImage)
  const result = await service.addRackCenterImage(
    id,
    {
      mainCenterImage,
      mainCenterImageId,
    },
    { new: true }
  );

  res.status(201).json({
    status: "success",
    message: "center photo added successfully",
    data: {
      mainCenterImage: result.mainCenterImage,
      mainCenterImageId: result.mainCenterImageId,
    },
  });
};

module.exports = {
  addCenterImage,
};
