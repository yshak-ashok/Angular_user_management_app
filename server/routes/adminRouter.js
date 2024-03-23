const express=require('express');
const adminRouter=express()
const adminController=require('../controllers/adminController')
const authToken=require('../middleware/auth')

adminRouter.get('/getAllUsers',authToken,adminController.getAllUsers)
adminRouter.post('/createUser',authToken,adminController.createUser);
adminRouter.post('/updateUser',authToken,adminController.updateUser);
adminRouter.get('/deleteUser',authToken,adminController.deleteUser);
adminRouter.get('/getEditUser',authToken,adminController.getEditUser);

module.exports=adminRouter;