const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/auth');
const studentController = require('../controllers/student_controller');

//Handling Post Request------------------------------------------------------------>
router.post('/', checkAuth, studentController.post_some);


//Handling Get Request To Get All Of Data------------------------------------------>
router.get('/', checkAuth, studentController.get_all);


//Handling Get Request To Get Data Uniquely----------------------------------------->
router.get('/:id', checkAuth, studentController.get_unique);


//Handling Delete Request--------------------------------------------------------------->
router.delete('/:id', checkAuth, studentController.delete_some);


//Handling Patch Request---------------------------------------------------------------->
router.patch('/:id', checkAuth, studentController.update_some);

module.exports = router;