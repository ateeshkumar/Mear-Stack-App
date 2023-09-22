const express = require('express');
const { getAllusers, registerController, loginController } = require('../controllers/userController');

//route object
const route = express.Router();

// GET ALL USER
route.get('/all-user',getAllusers)

//CREATE USER || POST
route.post('/register',registerController);

//LOGIN USER || POST
route.post('/login',loginController);
module.exports = route;