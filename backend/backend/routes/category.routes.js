const express = require('express');
const category_router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const {getAllcategory} = require('../controllers/category.controller'); 


category_router.get('/all',authMiddleware,getAllcategory);


module.exports = category_router;