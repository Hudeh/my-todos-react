import React from 'react';
import { Card, CardHeader, Typography, Modal, InputAdornment, TextField } from '@mui/material';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import CategoryDropdown from './CategoryDropdown';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { modelStyle } from '../modalStyle';
import { useMutation } from '@tanstack/react-query';
import TablePagination from '@mui/material/TablePagination';
import Div from '../Div';
import { MdAdd, MdSearch } from 'react-icons/md';
import { queryClient } from '../../App';
import taskServices from '../../services/todos-services';
import TablePaginationActions from '../TablePaginationActions';

const Todos = ({ data }) => {
  const [activeCategory, setActiveCategory] = React.useState('all');
  const [openModal, setOpenModal] = React.useState(false);
  const [taskForm, setTaskForm] = React.useState({});
  const [taskID, setTaskID] = React.useState('');
  const [filteredTasks, setFilteredTasks] = React.useState(data);
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

// pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // filter func
  let taskCategories = [];
  function removeDuplicates() {
    let uniqueObject = {};
    for (let i in data) {
      const objStatus = data[i]['task_priority'];
      uniqueObject[objStatus] = data[i];
    }
    for (let j in uniqueObject) {
      taskCategories.push(uniqueObject[j]['task_priority']);
    }
  }
  removeDuplicates();
  React.useEffect(() => {
    if (activeCategory && activeCategory !== 'all')
      setFilteredTasks(data?.filter((task) => task?.task_priority === activeCategory));
    else setFilteredTasks(data);
  }, [activeCategory, removeDuplicates]);

  // search task
    const [searchText, setSearchText] = React.useState('');
    const containsText = (text, searchText) =>
      text?.toLowerCase().indexOf(searchText?.toLowerCase()) > -1;
    const searchTasks = React.useMemo(
      () =>
        data?.filter(
          (option) =>
            containsText(option?.task_priority, searchText) +
            containsText(option?.task_category, searchText) +
            containsText(option?.task_title, searchText)+
            containsText(option?.task_description, searchText)
        ),
      [searchText]
    );

  // close add modal and edit modal
  const closeModal = () => {
    setOpenModal(false);
    setTaskForm({});
  };

  // hndle change for task form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskForm((prev) => ({ ...prev, [name]: value }));
  };

  // handle submit and edit task
  const TaskFormMutation = useMutation({
    mutationFn: taskID ? taskServices.edit_task : taskServices.create_task,
  });
  const handleSubmit = () => {
    setLoading(true);
    TaskFormMutation.mutate(
      { ...taskForm, taskID },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['todos_list'] });
          setLoading(false);
          closeModal();
        },
      }
    );
  };

  return (
    <>
      <Card sx={{ minWidth: 620, maxWidth: 620, backgroundColor: '#F5F7FA' }}>
        <CardHeader
          title={
            <Typography variant={'h4'} mb={0}>
              Tasks
            </Typography>
          }
          subheader={
            <Typography sx={{ mt: 1, color: 'text.secondary' }}>A complete todo list</Typography>
          }
          action={
            <Stack direction={'row'} spacing={1} alignItems={'center'}>
              <TextField
                sx={{
                  width: 150,
                }}
                size='small'
                placeholder='search...'
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <MdSearch size='25px' />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key !== 'Escape') {
                    // Prevents autoselecting item while typing (default Select behaviour)
                    e.stopPropagation();
                  }
                }}
              />
              <CategoryDropdown
                taskCategories={taskCategories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
              <Fab
                size='small'
                color='primary'
                aria-label='add'
                onClick={() => {
                  setOpenModal(true);
                  setTaskID('');
                }}
              >
                <MdAdd size='30px' />
              </Fab>
            </Stack>
          }
        />
        <Scrollbars autoHeight autoHeightMin={150} autoHeightMax={250}>
          {data?.length ? (
            <TaskList
              tasks={searchText?.length >= 1 ? searchTasks : filteredTasks}
              setOpenModal={setOpenModal}
              setTaskID={setTaskID}
              taskForm={taskForm}
              setTaskForm={setTaskForm}
              rowsPerPage={rowsPerPage}
              page={page}
            />
          ) : (
            <Typography variant={'h4'} mb={0} textAlign={'center'}>
              No Tasks
            </Typography>
          )}
        </Scrollbars>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
          count={searchText?.length >= 1 ? searchTasks?.length : filteredTasks?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </Card>
      <Modal
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        open={openModal}
      >
        <Div
          sx={{
            ...modelStyle,
            width: 300,
            height: 400,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ mt: 4 }}>{taskID ? 'Edit Task' : 'Add Task'}</Typography>
          <TaskForm
            closeModal={closeModal}
            handleChange={handleChange}
            taskForm={taskForm}
            handleSubmit={handleSubmit}
            loading={loading}
          />
        </Div>
      </Modal>
    </>
  );
};

export default Todos;
