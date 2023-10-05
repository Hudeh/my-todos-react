import { axiosInstance } from './config';

import Toastify from 'toastify-js';

const taskServices = {};

//create task
taskServices.create_task = async (taskData) => {
        console.log(taskData);
  try {
    const { data } = await axiosInstance.post('tasks', { ...taskData });
    Toastify({
      text: data?.message,
      style: {
        background: '#19C37D',
      },
    }).showToast();
    return data;
  } catch (err) {
    Toastify({
      text: err?.response?.data?.message,
      style: {
        background: '#EB3145',
      },
    }).showToast();
  }
};
//edit task
taskServices.edit_task = async (taskData) => {
        console.log(taskData);
  try {
    const { data } = await axiosInstance.patch(`tasks/${taskData.taskID}`, { ...taskData });
    Toastify({
      text: data?.message,
      style: {
        background: '#19C37D',
      },
    }).showToast();
    return data;
  } catch (err) {
    Toastify({
      text: err?.response?.data?.message,
      style: {
        background: '#EB3145',
      },
    }).showToast();
  }
};
//delete task
taskServices.delete_task = async (taskID) => {
  try {
    const { data } = await axiosInstance.delete(`tasks/${taskID}`);
    Toastify({
      text: data?.message,
      style: {
        background: '#19C37D',
      },
    }).showToast();
    return data;
  } catch (err) {
    Toastify({
      text: err?.response?.data?.message,
      style: {
        background: '#EB3145',
      },
    }).showToast();
  }
};

//all task
taskServices.fetchTaskList = async () => {
  try {
    const { data } = await axiosInstance.get('tasks');
    return data;
  } catch (err) {}
};

//by id task
taskServices.getTaskByID = async (id) => {
  try {
    const { data } = await axiosInstance.get(`tasks/${id}`);
    return data;
  } catch (err) {}
};

export default taskServices;
