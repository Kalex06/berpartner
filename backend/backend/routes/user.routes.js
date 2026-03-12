const express = require('express');
const { getUserById,putUser,getMyProfile,updateProfilePic,updateEmail,updatePhoneNumber,updateUsername} = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');
const profilePictureMiddleware = require('../middleware/profile_picture.middleware');


const user_router = express.Router();

user_router.get('/myprofile',authMiddleware,getMyProfile);
user_router.get('/:id',getUserById);
user_router.put('/:id',putUser);
user_router.patch('/update/avatar',authMiddleware,profilePictureMiddleware,updateProfilePic);
user_router.patch('/update/email',authMiddleware,updateEmail);
user_router.patch('/update/phone',authMiddleware,updatePhoneNumber);
user_router.patch('/update/username',authMiddleware,updateUsername);

module.exports = user_router;