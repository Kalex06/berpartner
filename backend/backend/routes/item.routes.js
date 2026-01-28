const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const pictureMiddleware = require('../middleware/picture.middleware')


const item_router = express.Router();

item_router.post('/upload/pictures',authMiddleware,pictureMiddleware,)

module.exports = user_router;