const express = require('express');
const multer = require('multer');
const cors = require('cors');


const app=express();
app.use(cors());

// const uploads = multer({ dest: 'uploads/' })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() ;
        // console.log(file);  fieldname:'file', originalname:'your file's actual name',encoding:7bit,mimetype:'application/{pdf/png/image/..}'
      const arr = file.originalname.split('.');
     const fileFormat = arr[arr.length-1];
     console.log(fileFormat);
      return cb(null, file.originalname + '-' + uniqueSuffix+'.'+fileFormat)
    }
  })
  
  const upload = multer({ storage: storage })


app.post('/',upload.single('uploaded-file'),(req,res)=>{
    // console.log(req.file) // details of the upload file 


    res.status(200).send('okkay hai')
})


const PORT = 5000;
app.listen(PORT,()=>{
    console.log(`server running at ${PORT}`)
})