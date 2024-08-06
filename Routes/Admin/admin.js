const express = require('express');
const { signup, signin , getUser,getOne,deleteUser,updateUser,updatePassword} = require('../../Controllers/admin/admin');
const { validateSignupRequest, validateSigninRequest, isRequestValidated, } = require('../../Validator/auth');
const router = express.Router();
router.get('/admin/get', getUser);
router.post('/admin/signup', signup);
router.post('/admin/signin', signin);
router.get('/admin/getAll', getUser);
router.get('/admin/getsingle/:id', getOne);
router.delete('/admin/delete/:id', deleteUser);
router.put('/admin/update/:id',updateUser );
router.post('/admin/update-password',updatePassword );

module.exports = router;