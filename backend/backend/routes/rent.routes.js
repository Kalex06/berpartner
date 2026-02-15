const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const {uploadRent} = require('../controllers/rent.controller');

const rent_router = express.Router();


rent_router.post('/upload',authMiddleware,uploadRent);

module.exports = rent_router;