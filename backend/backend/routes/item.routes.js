const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const pictureMiddleware = require('../middleware/picture.middleware');
const {uploadItem} = require('../controllers/item.controller'); 


const item_router = express.Router();

item_router.post('/upload/pictures',pictureMiddleware,uploadItem);

module.exports = item_router;