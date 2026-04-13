const express = require('express');
const condition_router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const {getAllConditions} = require('../controllers/condition.controller');

condition_router.get('/all',authMiddleware,getAllConditions);

module.exports = condition_router;