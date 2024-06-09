const service = require("../../services/rack");

const addImage = async (req, res, next) => {
  const { id } = req.params;
  const mainImage = req.file ? req.file.path : req.rack.mainImage;
  const mainImageId = req.file ? req.file.filename : req.rack.mainImageId;
  console.log("mainImage in ADDMAIN", mainImage);
  const result = await service.addRackImage(
    id,
    {
      mainImage,
      mainImageId,
    },
    { new: true }
  );
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
