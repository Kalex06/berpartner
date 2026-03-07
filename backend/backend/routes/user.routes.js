const express = require('express');
const { getUserById,putUser,getMyProfile,updateProfilePic} = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');
const profilePictureMiddleware = require('../middleware/profile_picture.middleware');


const user_router = express.Router();

user_router.get('/myprofile',authMiddleware,getMyProfile);
user_router.get('/:id',getUserById);
user_router.put('/:id',putUser);
user_router.patch('/avatar',authMiddleware,profilePictureMiddleware,updateProfilePic);

module.exports = user_router;