const { ImageModel } = require("../../database/allModels");
const { s3Upload } = require("../../utils/s3");

exports.getImageDetails = async (req, res) => {
  try {
    const image = await ImageModel.findById(req.params._id);

    return res.status(200).json({ image });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.uploadSingleImageInS3Bucket = async (req, res) => {
  try {
    const file = req.file;
    
    const bucketOptions = {
      Bucket: "zomato-clone-41022",
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read", //Access control list
    };

    const uploadImage = await s3Upload(bucketOptions);

    const dbUpload = await ImageModel.create({
      images: [
        {
          location: uploadImage.Location,
        },
      ],
    });

    return res.status(200).json({ dbUpload });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.uploadMultipleImagesInS3Bucket = async (req, res) => {
  try {
    const file = req.files;
    let multipleImage = [] ;
   
   for(let i = 0 ; i < file.length ; i++){   
      const bucketOptions = {
        Bucket: "zomato-clone-41022",
        Key: file[i].originalname,
        Body: file[i].buffer,
        ContentType: file[i].mimetype,
        ACL: "public-read", // Access Control List
      };
       multipleImage[i] = await s3Upload(bucketOptions);
    }     
    const imageArray =  multipleImage.map((image) => {
      return {location : image.Location};
    });
    const dbUpload = await ImageModel.create({
      images: 
          imageArray,      
    });
    return res.status(200).json({ dbUpload });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};