const express = require('express');
const condition_router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const adminMiddleware = require("../middleware/admin.middleware");
const {getAllConditions,deleteCondition,updateCondition,createCondition} = require('../controllers/condition.controller');

condition_router.get('/all',authMiddleware,getAllConditions);
condition_router.delete('/delete/:id',authMiddleware,adminMiddleware,deleteCondition);
condition_router.patch('/update',authMiddleware,adminMiddleware,updateCondition);
condition_router.post('/post',authMiddleware,adminMiddleware,createCondition);

module.exports = condition_router;