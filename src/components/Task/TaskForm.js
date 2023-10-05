import React from 'react';
import {
  MenuItem,
  ButtonGroup,
  Button,
  TextField,
  TextareaAutosize,
} from '@mui/material';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import Div from '../Div';

// task value of a form
const defaultIfEmpty = (value) => {
  return value === '' ? '' : value;
};

// category types
const task_priority = [
  {
    value: 'Low',
    label: 'Low',
  },
  {
    value: 'Medium',
    label: 'Medium',
  },
  {
    value: 'High',
    label: 'High',
  },
];

const TaskForm = ({ closeModal, handleChange, taskForm, handleSubmit, loading }) => {
  return (
    <Stack direction='column' justifyContent='center' alignItems='center' spacing={2} mt={2}>
      <TextField
        fullWidth
        label='Task Title'
        name='task_title'
        onChange={handleChange}
        value={defaultIfEmpty(taskForm.task_title)}
        variant='outlined'
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextareaAutosize
        placeholder='Task Details'
        style={{ width: 328, height: 90, mb: 2 }}
        name='task_description'
        onChange={handleChange}
        value={defaultIfEmpty(taskForm.task_description)}
        variant='outlined'
      />

      <Stack direction='row' justifyContent='center' alignItems='center' spacing={1}>
        <TextField
          label='Task Category'
          name='task_category'
          onChange={handleChange}
          value={defaultIfEmpty(taskForm.task_category)}
          variant='outlined'
          sx={{ width: 165 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          sx={{ width: 165 }}
          select
          label='Task Priority'
          name='task_priority'
          onChange={handleChange}
          value={defaultIfEmpty(taskForm.task_priority)}
          variant='outlined'
          InputLabelProps={{
            shrink: true,
          }}
        >
          {task_priority?.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Stack>
      <Stack direction='row' justifyContent='center' alignItems='center' spacing={1}>
        <TextField
          sx={{ width: 165 }}
          id='date'
          label='Start Date'
          type='date'
          name='start_date'
          onChange={handleChange}
          value={defaultIfEmpty(taskForm.start_date)}
          InputLabelProps={{
            shrink: true,
          }}
          variant='outlined'
        />
        <TextField
          sx={{ width: 165 }}
          id='date'
          label='Due Date'
          type='date'
          name='due_date'
          onChange={handleChange}
          value={defaultIfEmpty(taskForm.due_date)}
          InputLabelProps={{
            shrink: true,
          }}
          variant='outlined'
        />
      </Stack>
      <Div
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          // pt: 2,
        }}
      ></Div>

      <ButtonGroup variant='text'>
        <Button onClick={closeModal}>Close</Button>
        <LoadingButton onClick={handleSubmit} loading={loading}>
          Save
        </LoadingButton>
      </ButtonGroup>
    </Stack>
  );
};

export default TaskForm;
