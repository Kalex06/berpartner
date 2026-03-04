const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const {getAllMessagesByOwner,messageAccept,messageReject,getIsOpenedCountByOwner} = require('../controllers/message.controller');



const message_router = express.Router();

message_router.get('/all',authMiddleware,getAllMessagesByOwner);
message_router.patch('/accept',authMiddleware,messageAccept);
message_router.patch('/reject',authMiddleware,messageReject);
message_router.get('/notRead',authMiddleware,getIsOpenedCountByOwner);

module.exports = message_router;