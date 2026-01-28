const express = require('express');
const { getUserById,putUser,getMyProfile} = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');


const user_router = express.Router();

user_router.get('/myprofile',authMiddleware,getMyProfile);
user_router.get('/:id',getUserById);
user_router.put('/:id',putUser);

module.exports = user_router;