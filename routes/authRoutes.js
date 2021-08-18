const express=require('express');
const authController=require('../controllers/authControllers')

const router=express.Router();


router.post('/register',authController().registerUser);

router.post('/login',authController().loginUser);

router.post('/logout',authController().logoutUser);

router.get('/list',authController().getList);

module.exports=router;