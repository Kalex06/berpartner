const express = require('express');
const authMiddleware = require('../middleware/auth.middleware');
const {uploadRent,getMyRents,getRentsDateByItemId} = require('../controllers/rent.controller');

const rent_router = express.Router();


rent_router.post('/upload',authMiddleware,uploadRent);
rent_router.get('/myrents',authMiddleware,getMyRents);
rent_router.get('/dates/:id',authMiddleware,getRentsDateByItemId);



module.exports = rent_router;