import React from 'react';
import { List } from '@mui/material';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, setOpenModal, setTaskID, taskForm, setTaskForm, rowsPerPage, page }) => {
  return (
    <List disablePadding>
      {tasks?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((task, index) => (
        <TaskItem
          task={task}
          key={index}
          setOpenModal={setOpenModal}
          setTaskID={setTaskID}
          taskForm={taskForm}
          setTaskForm={setTaskForm}
        />
      ))}
    </List>
  );
};
/* Todo tasks prop define */
export default TaskList;
