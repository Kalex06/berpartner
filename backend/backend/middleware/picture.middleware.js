const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: 'upload/items_picture',
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E8);
        cb(null, uniqueName + path.extname(file.originalname));
    }
});

const upload = multer({ storage:storage,limits:{
    fileSize: 5*1024*1024
}}).array('selectedFiles',4);


function pictureMiddleware(req,res,next){

    upload(req,res,function (err){
    if(err instanceof multer.MulterError){
        return res.status(400).json({message: `Feltöltési hiba: ${err.code}`});
    }
    else if(err){
        return res.status(500).json({message: err.message});
    }

    next();
});
    
}

module.exports = pictureMiddleware;