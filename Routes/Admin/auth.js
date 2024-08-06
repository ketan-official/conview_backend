const express = require('express');
const { signup, signin , getUser,getOne,deleteUser,updateUser,updatePassword} = require('../../Controllers/admin/auth');
const { validateSignupRequest, validateSigninRequest, isRequestValidated, } = require('../../Validator/auth');
const router = express.Router();
router.get('/admin/get', getUser);
router.post('/user/signup', signup);
router.post('/user/signin', signin);
router.get('/user/getAll', getUser);
router.get('/user/getsingle/:id', getOne);
router.delete('/user/delete/:id', deleteUser);
router.put('/user/update/:id',updateUser );
router.post('/user/update-password',updatePassword );

module.exports = router;