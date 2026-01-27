const express = require('express');
const {login,regist} = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

const auth_router = express.Router();

auth_router.post('/login',login);
auth_router.post('/regist',regist);

module.exports = auth_router;