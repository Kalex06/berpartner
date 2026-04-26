const express = require('express');
const category_router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require("../middleware/admin.middleware");
const {getAllcategory,
    getCategory,
    getMaincategory,
    deleteMaincategory,
    deletecategory,
    updateMaincategory,
    updatecategory,
    createMaincategory,
    createcategory} = require('../controllers/category.controller'); 


category_router.get('/all',authMiddleware,getAllcategory);
category_router.get('/main/all',authMiddleware,getMaincategory);
category_router.get('/sub/:id',authMiddleware,getCategory);
category_router.delete('/main/delete/:id',authMiddleware,adminMiddleware,deleteMaincategory);
category_router.delete('/sub/delete/:id',authMiddleware,adminMiddleware,deletecategory);
category_router.patch('/main/update',authMiddleware,adminMiddleware,updateMaincategory);
category_router.patch('/sub/update',authMiddleware,adminMiddleware,updatecategory);
category_router.post('/sub/post',authMiddleware,adminMiddleware,createcategory);
category_router.post('/main/post',authMiddleware,adminMiddleware,createMaincategory);

module.exports = category_router;