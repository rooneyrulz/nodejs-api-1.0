const express = require('express');
const router = express.Router();

const courseController = require('../controllers/course_controller');
const checkAuth = require('../middleware/auth');


//Posting Some Data To The DataBase---------------------------------------------------------->
router.post('/', checkAuth, courseController.post_some);


//Getting All Data From The DataBase---------------------------------------------------------->
router.get('/', checkAuth, courseController.get_all);



//Getting Data Uniquely---------------------------------------------------------------------->
router.get('/:id', checkAuth, courseController.get_unique);


//Deleting Some Data------------------------------------------------------------------------->
router.delete('/:id', checkAuth, courseController.delete_some);



//Patching Some Data-------------------------------------------------------------------------->
router.patch('/:id', checkAuth, courseController.patch_some);




module.exports = router;