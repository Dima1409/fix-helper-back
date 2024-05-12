const service = require("../../services/rack");

const addImage = async (req, res, next) => {
  console.log(req.file);
  const { id } = req.params;
  const mainImage = req.file ? req.file.path : req.rack.mainImage;
  const mainImageId = req.file ? req.file.filename : req.rack.mainImageId;
  console.log("image in controllers:", mainImage);
  console.log("imageId in controllers:", mainImageId);
  // if (req.rack.mainImageId) {
  //   await service.deleteImage(req.rack.mainImageId);
  // }
  const result = await service.addRackImage(
    id,
    {
      mainImage,
      mainImageId,
    },
    { new: true }
  );
  console.log("result in controllers", result);
  res.status(201).json({
    status: "success",
    message: "photo added successfully",
    data: {
      mainImage: result.mainImage,
      mainImageId: result.mainImageId,
    },
  });
};

module.exports = {
  addImage,
};
