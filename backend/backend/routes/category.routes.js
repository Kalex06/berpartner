const express = require('express');
const category_router = express.Router();
const {getAllcategory} = require('../controllers/category.controller'); 


category_router.get('/',getAllcategory);


module.exports = category_router;