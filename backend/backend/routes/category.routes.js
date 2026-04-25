const express = require('express');
const category_router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const {getAllcategory,getCategory,getMaincategory} = require('../controllers/category.controller'); 


category_router.get('/all',authMiddleware,getAllcategory);
category_router.get('/main/all',authMiddleware,getMaincategory);
category_router.get('/subcategory/:id',authMiddleware,getCategory);


module.exports = category_router;