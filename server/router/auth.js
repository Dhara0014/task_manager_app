const express = require('express');
const { createUser, loginUser } = require('../schema/user');
const { successResponse, failerResponse, InternalServerErrorResponse } = require('../helpers/responses');

const router = express.Router();

router.post('/signin',async(req, res) => {
    try {
     const user = await createUser(req.body);
     const {status, message, result} = user;
     if(status){
         return successResponse(res,message, result);
     }
     return failerResponse(res, message)
    } catch (error) {
         return InternalServerErrorResponse(res);
    }
 });
 
 router.post("/login", async(req,res) => {
     try {
         const user = await loginUser(req.body);
         const {status, message, result} = user;
         if(status){
             return successResponse(res, message, result);
         }
         return failerResponse(res, message);
     } catch (error) {
         return InternalServerErrorResponse(res);
     }
 });

 module.exports = router;