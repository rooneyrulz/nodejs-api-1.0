const express = require('express');
const router = express.Router();

const signupController = require('../controllers/signup_controller');

//HANDLING GET REQUEST-------------------------------------------------------------->
router.get('/', signupController.signup_get_all);


//HANDLING POST REQUEST------------------------------------------------------------->
router.post('/', signupController.signup_create_post);


//HANDLING DELETE REQUEST--------------------------------------------------------------->
router.delete('/:id', signupController.signup_delete_post);


//HANDLING PATCH REQUEST---------------------------------------------------------------->
router.patch('/:id', signupController.signup_patch_post);


//Handling Get Request To Get The Unique Data You Want----------------------------------->
router.get('/:id', signupController.signup_get_unique);

module.exports = router;