const express=require('express');
const router=express.Router();

const userController=require('../controllers/users_controller');
const postsController=require('../controllers/posts_controller');

router.get('/profile',userController.profile);
router.get('/sign-up',userController.signUp);
router.get('/sign-in',userController.signIn);

router.post('/create',userController.create);

router.get('/posts',postsController.posts);



module.exports=router;