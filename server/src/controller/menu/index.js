const { MenuModel, ImageModel } = require("../../database/allModels");

exports.getMenuListById = async (req, res) => {
  try {
    
    const { id } = req.params;
    
    const menus = await MenuModel.findById(id);
   
    if (!menus) {
      return res
        .status(404)
        .json({ error: "No Menu Available for this restaurant" });
    }

    return res.json({ menus });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getMenuImageListById = async (req, res) => {
  try {
    const { _id } = req.params;

    const menuImages = await ImageModel.findById(_id);

    if (!menuImages) {
      return res.status(404).json({ message: "No menu images found" });
    }
    return res.status(200).json({ menuImages });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
