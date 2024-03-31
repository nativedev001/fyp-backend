'use strict';
const express = require('express')
const router = express.Router();
const userHandlers = require('../controllers/userController');

// module.exports = function(app){
//     var userHandlers = require('../controllers/userController');
//   app.route('/auth/register').post(userHandlers.register);
//   app.route('/auth/login').post(userHandlers.login);
//   app.route('/profile').post(userHandlers.loginRequired, userHandlers.profile);    
// }


router.post('/auth/register', userHandlers.register);
router.post('/auth/login', userHandlers.login);
router.post('/profile', userHandlers.loginRequired, userHandlers.profile);

module.exports = router;