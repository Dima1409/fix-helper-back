const addImage = async (req, res, next) => {
  const { _id } = req.rack;
  const avatarURL = req.file ? req.file.path : req.rack.avatarURL;
  const imgId = req.file ? req.file.filename : req.rack.imgId;
  if (req.rack.imgId) {
    await services.deleteImage(req.rack.imgId);
  }
  const result = await services.updateUserAvatar(
    _id,
    {
      avatarURL,
      imgId,
    },
    { new: true }
  );
  res.status(201).json({
    status: "success",
    message: "photo added successfully",
    data: {
      avatarURL: result.avatarURL,
      imgId: result.imgId,
    },
  });
};

module.exports = {
  addImage,
};
