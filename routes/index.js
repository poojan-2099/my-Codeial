const express=require('express')
const router=express.Router();


const homeController=require('../controllers/home_controller')

console.log('router loaded')

router.get('/',homeController.home);
router.use('/users',require('./users'));

//for further to link other router given syntax
//router.use('/routername',require('./routerfile'))
module.exports=router;