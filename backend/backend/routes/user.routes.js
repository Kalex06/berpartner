const express = require('express');
const {
     getUserById,putUser,
     getMyProfile,updateProfilePic,
     updateEmail,updatePhoneNumber,
     updatePassword,
     updateUsername,
     updateAddress,
     getAllUsers,
     deleteUser,
     deleteUserByAdmin } = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');
const profilePictureMiddleware = require('../middleware/profile_picture.middleware');
const adminMiddleware = require('../middleware/admin.middleware');
const passwordMiddleware = require('../middleware/password.middleware');

const user_router = express.Router();

user_router.get('/myprofile',authMiddleware,getMyProfile);
user_router.get('/getAll',authMiddleware,adminMiddleware,getAllUsers);
user_router.get('/:id',getUserById);
user_router.put('/:id',putUser);
user_router.patch('/update/avatar',authMiddleware,profilePictureMiddleware,updateProfilePic);
user_router.patch('/update/email',authMiddleware,passwordMiddleware,updateEmail);
user_router.patch('/update/phone',authMiddleware,passwordMiddleware,updatePhoneNumber);
user_router.patch('/update/username',authMiddleware,passwordMiddleware,updateUsername);
user_router.patch('/update/password',authMiddleware,passwordMiddleware,updatePassword);
user_router.patch('/update/address',authMiddleware,passwordMiddleware,updateAddress);
user_router.post('/delete',authMiddleware,passwordMiddleware,deleteUser);
user_router.delete('/admin/delete/:id',authMiddleware,adminMiddleware,deleteUserByAdmin);


module.exports = user_router;