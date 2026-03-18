const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const pictureMiddleware = require('../middleware/picture.middleware');
const {uploadItem,getAllItem,getItemById,getItemsByOwner,searchItems,deleteItem,putItem} = require('../controllers/item.controller'); 


const item_router = express.Router();

item_router.post('/upload',authMiddleware,pictureMiddleware,uploadItem);
item_router.get('/all',authMiddleware,getAllItem);
item_router.get('/search',authMiddleware,searchItems);
item_router.get('/:id',authMiddleware,getItemById);
item_router.get('/owner/:id',authMiddleware,getItemsByOwner);
item_router.delete('/delete/:id',authMiddleware,deleteItem);
item_router.put('/update',authMiddleware,pictureMiddleware,putItem);


module.exports = item_router;