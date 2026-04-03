const express = require('express');
const {login,regist,AdminLogin} = require('../controllers/auth.controller');


const auth_router = express.Router();

auth_router.post('/login',login);
auth_router.post('/login/admin',AdminLogin);
auth_router.post('/regist',regist);


module.exports = auth_router;