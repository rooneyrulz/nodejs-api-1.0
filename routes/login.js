const express = require('express');
const router = express.Router();

const login_Controller = require('../controllers/login_controller');


router.post('/', login_Controller.get_logged_in);


module.exports = router;