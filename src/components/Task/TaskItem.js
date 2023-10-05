import React from 'react';
import { Chip, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import taskServices from '../../services/todos-services';
import { queryClient } from '../../App';
import { MdOutlineModeEditOutline, MdDeleteOutline } from 'react-icons/md';

const TaskItem = ({ task, setOpenModal, setTaskID, setTaskForm, taskForm }) => {
  // get single task
  const getTaskByID = (taskID) => {
    taskServices.getTaskByID(taskID).then((data) => {
      setTaskForm({
        ...taskForm,
        task_category: data?.data?.task_category,
        task_title: data?.data?.task_title,
        task_description: data?.data?.task_description,
        start_date: data?.data?.start_date,
        due_date: data?.data?.due_date,
      });
    });
  };
  // delete task by id
  const deleteTaskByID = (taskID) => {
    taskServices.delete_task(taskID);
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ['todos_list'] });
    }, 2000);
  };
  return (
    <ListItemButton
      alignItems={'flex-start'}
      key={task.id}
      sx={{
        px: 3,
        borderBottom: 1,
        borderBottomColor: 'divider',

        '&:hover .update-task': {
          opacity: 1,
          color: 'grey.700',
          backgroundColor: 'common.white',
          transform: 'translateY(-50%) scale(1)',
        },
      }}
    >
      <ListItemIcon sx={{ minWidth: 40, mt: 0 }}>
        <MdDeleteOutline edge='start' size='25px' onClick={() => deleteTaskByID(task?.id)} />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography variant={'h6'} mb={0.5}>
            {task?.task_title}
          </Typography>
        }
        secondary={
          <Typography component={'div'}>
            <Typography variant={'body1'} color={'text.secondary'} mb={1}>
              {task?.task_description}
            </Typography>

            <Chip
              label={task?.task_category}
              size={'small'}
              color={
                task?.task_priority === 'Low'
                  ? 'info'
                  : task?.task_priority === 'Medium'
                  ? 'warning'
                  : 'error'
              }
            />
          </Typography>
        }
      />
      <IconButton
        className={'update-task'}
        aria-label='update-task'
        onClick={() => {
          setOpenModal(true);
          setTaskID(task?.id);
          getTaskByID(task?.id);
        }}
        sx={{
          position: 'absolute',
          zIndex: 5,
          right: 20,
          top: '50%',
          opacity: 0,
          boxShadow: 1,
          color: 'text.primary',
          backgroundColor: 'common.white',
          transform: 'translateY(-50%) scale(0.5)',
          transition: 'all 0.2s ease-in-out',
        }}
      >
        <MdOutlineModeEditOutline size='30px' />
      </IconButton>
    </ListItemButton>
  );
};
/* Todo item prop define */
export default TaskItem;
