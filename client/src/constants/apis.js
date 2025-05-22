
const api = process.env.REACT_APP_MAIN_API;

export const loginApi = `${api}/auth/login`;
export const signinApi = `${api}/auth/signin`;

// task apis
export const taskListApi = `${api}/tasks/list`;
export const addTaskListApi = `${api}/tasks/add`;
export const updateTaskListApi = `${api}/tasks/update`;
export const deleteTaskListApi = `${api}/tasks/delete`;
