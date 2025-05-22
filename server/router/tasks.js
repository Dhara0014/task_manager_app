const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const { createTask, getUserTaskList, updateTask, deleteTask } = require('../schema/task');
const { InternalServerErrorResponse, successResponse, failerResponse } = require('../helpers/responses');

const router = express.Router();

router.post('/add', verifyToken, async(req, res) => {
    try {
        const userId = req.user.userId;
        const task = await createTask({...req.body, userId});
        const {status, message, result} = task;
        if(status){
            return successResponse(res,message, result);
        }
        return failerResponse(res, message)
    } catch (error) {
        return InternalServerErrorResponse(res);
    }
});

router.post('/list', verifyToken, async(req, res) => {
    try {
        const userId = req.user.userId;
        const taskList = await getUserTaskList(userId, req.body?.status);
        const {status, message, result} = taskList;
        if(status){
            return successResponse(res,message, result);
        }
        return failerResponse(res, message)
    } catch (error) {
        return InternalServerErrorResponse(res);
    }
});

router.put('/update/:taskId', verifyToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const {taskId} = req.params;
      const task = await updateTask(taskId, userId, req.body);
      const {status, message, result} = task;
      if(status){
        return successResponse(res,message, result);
    }
    return failerResponse(res, message)
    } catch (error) {
      return InternalServerErrorResponse(res);
    }
  });
  
  router.delete('/delete/:taskId', verifyToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const {taskId} = req.params;
      const task = await deleteTask(taskId, userId);
      const {status, message, result} = task;
      if(status){
        return successResponse(res,message, result);
    }
    return failerResponse(res, message)
    } catch (error) {
      return InternalServerErrorResponse(res);
    }
  });

module.exports = router;
