const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const {getAllMessagesByOwner} = require('../controllers/message.controller');


const message_router = express.Router();

message_router.get('/all',authMiddleware,getAllMessagesByOwner);

module.exports = message_router;