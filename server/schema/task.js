const mongoose = require("mongoose");
const User = require('./user');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ['Pending', 'Completed'],
      default: 'Pending',
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
  );

const Task = mongoose.model('Task', taskSchema);

const createTask = async({title, description, status, userId}) => {
    try {
        if(!title.trim() || !description.trim() || !title.trim() || !status.trim() || !userId.trim()){
            return {
                status: false,
                message: "Please enter all the values"
            }
        }
        const task = await Task.create({
            title,
            description,
            status,
            user: userId,
        });
        if(task){
            return {
                status: true,
                message: 'Task created successfully',
              };
        }
        return {
            status: false,
            message: "Enable to create task"  
        }
    } catch (error) {
        return {
            status: false,
            message: "Something wen't wrong"
        }
    }
}

const getUserTaskList = async (userId, status) => {
    try {
        const query = { user: userId };
        if (status) {
        query.status = status;
        }
      const tasklist = await Task.find(query).sort({ createdAt: -1 });
      if(tasklist) {
        return {
            status: true,
            message: 'Task fetched successfuly',
            result: tasklist,
          };
      }
      return {
        status: false,
        message: 'Enable to fetch tasks'
      };
    } catch (error) {
      console.error('getUserTasks error:', error);
      return {
        status: false,
        message: "Something wen't wrong"
      };
    }
  };

  const updateTask = async (taskId, userId, updates) => {
    try {
      const task = await Task.findOneAndUpdate(
        { _id: taskId, user: userId },
        updates,
        { new: true }
      );
  
      if (task) {
        return {
            status: true,
            message: 'Task updated successfully',
            result: task
          };
       
      }
      return {
        status: false,
        message: 'Enable to update the task',
      };
      
    } catch (error) {
      console.error('updateTask error:', error);
      return {
        status: false,
        message: "Something wen't wrong",
      };
    }
  };
  
  const deleteTask = async (taskId, userId) => {
    try {
      const task = await Task.findOneAndDelete({ _id: taskId, user: userId });
  
      if (task) {
        return {
            status: true,
            message: 'Task deleted successfully',
          };
        
      }
      return {
        status: false,
        message: 'Enable to delete the task',
      };
     
    } catch (error) {
      console.error('deleteTask error:', error);
      return {
        status: false,
        message: "Something wen't wrong",
      };
    }
  };

module.exports = {Task, createTask, getUserTaskList, updateTask, deleteTask};