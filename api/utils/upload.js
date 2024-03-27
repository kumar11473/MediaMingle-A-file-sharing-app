const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

const storage = new GridFsStorage({
    url: process.env.MONGO_URI,
    file: (req, file) => {
      
      return new Promise((resolve, reject) => {
        const filename = file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: "newBucket"
        };
        resolve(fileInfo);
      });
    }
  });
  
  
 
  const upload = multer({storage});

module.exports =  upload ;
