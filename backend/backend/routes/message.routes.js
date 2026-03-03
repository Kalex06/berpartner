const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const {getAllMessagesByOwner,messageAccept,messageReject} = require('../controllers/message.controller');
const { getIsOpenedByOwnerId } = require('../models/message.model');


const message_router = express.Router();

message_router.get('/all',authMiddleware,getAllMessagesByOwner);
message_router.patch('/accept',authMiddleware,messageAccept);
message_router.patch('/reject',authMiddleware,messageReject);
message_router.get('/notReaded',authMiddleware,getIsOpenedByOwnerId);

module.exports = message_router;