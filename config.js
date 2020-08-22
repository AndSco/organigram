require("dotenv").config(); // loads any environment variable into process.env

module.exports = {
  atlasUserName: process.env.ATLAS_USERNAME,
  atlasPword: process.env.ATLAS_PWORD,
  cloudName: process.env.CLOUD_NAME,
  cloudinaryKey: process.env.CLOUDINARY_KEY,
  cloudinarySecret: process.env.CLOUDINARY_SECRET,
  adminLogin: process.env.ADMIN_LOGIN,
  readerLogin: process.env.READER_LOGIN
};
