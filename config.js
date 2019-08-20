require("dotenv").config(); // loads any environment variable into process.env

module.exports = {
  mlabUserName: process.env.MLAB_USERNAME,
  mlabPword: process.env.MLAB_PWORD, 
  cloudName: process.env.CLOUD_NAME,
  cloudinaryKey: process.env.CLOUDINARY_KEY, 
  cloudinarySecret: process.env.CLOUDINARY_SECRET
};