const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const pictureMiddleware = require('../middleware/picture.middleware');
const {uploadItem,getAllItem,getItemById} = require('../controllers/item.controller'); 


const item_router = express.Router();

item_router.post('/upload/pictures',authMiddleware,pictureMiddleware,uploadItem);
item_router.get('/getAll',authMiddleware,getAllItem);
item_router.get('/:id',authMiddleware,getItemById);


module.exports = item_router;