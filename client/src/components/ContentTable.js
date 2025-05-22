// File: DataTableWithSearch.jsx
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { addTaskListApi, deleteTaskListApi, taskListApi, updateTaskListApi } from '../constants/apis';
import { deleteAuthApi, postAuthApi, putAuthApi } from '../heplers/apiCalls/apis';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ToastContainer, toast } from 'react-toastify';
import { formSchema } from './validationScehema/authSchema';

const ContentTable = () => {
  const [open, setOpen] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', status: 'Pending' });
  const [errors, setErrors] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("");


  const editTaskHandler = (data) => {
    setForm({ title: data.title, description: data.description, status: data.status });
    setIsEdit(true);
    setEditId(data._id);
    setOpen(true);
  }

  const deleteTaskHandler = async(data) => {
    const response = await deleteAuthApi(`${deleteTaskListApi}/${data}`);
    const {status, message} = response;
    if(status){
      toast.success(message);
      getData();
    }else {
      toast.error(message)
    }
  }


  const columns =  [
    { name: 'Title', selector: row => row.title, sortable: true },
    { name: 'Description', selector: row => row.description, sortable: false },
    { name: 'Status', selector: row => row.status, sortable: false },
    {
      name: '',
      cell: row => (
        <>
          <IconButton onClick={() => editTaskHandler(row)}><EditIcon /></IconButton>
          <IconButton onClick={() => deleteTaskHandler(row._id)}><DeleteIcon /></IconButton>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const getData = async(filterData) => {
    const response = await postAuthApi({
      url: taskListApi,
      body: filterData ? {status: filterData} : {}
    });
    const {status, message, result} = response;
    if(status){
      setTaskList(result)
    }else {
      toast.error(message);
    }
  }

  useEffect(() => {
      getData();
  },[]);

  const handleOpen = () => {
    setForm({ title: '', description: '', status: 'Pending' });
    setIsEdit(false);
    setEditId(null);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setForm({ title: '', description: '', status: 'Pending' });
    setErrors({});
  };

  const handleSubmit = async () => {
    const { error } = formSchema.validate(form, { abortEarly: false });
    if (error) {
      const errorObj = {};
      error.details.forEach(detail => {
        errorObj[detail.path[0]] = detail.message;
      });
      setErrors(errorObj);
      return;
    }
    setErrors({});

    const url = isEdit ? `${updateTaskListApi}/${editId}` : addTaskListApi;
    const method = isEdit ? putAuthApi : postAuthApi;
    const response = await method({ url, body: form });
    const { status, message } = response;
    if (status) {
      toast.success(message);
      getData();
      handleClose();
    } else {
      toast.error(message);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: '80%', mx: 'auto', border: '1px solid lightgray' }}>
    <ToastContainer />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'end',
          mb: 2,
          gap: 2,
          flexWrap: 'wrap'
        }}
      >
      
      <FormControl sx={{ minWidth: 100 }} size="small">
      <Select
              name="status"
              displayEmpty
              value={filterStatus}
              onChange={(e) => {
              setFilterStatus(e.target.value);
              getData(e.target.value);
            }}
            >
              <MenuItem value=""> Select Status</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
            </FormControl>
        <Button variant="contained" onClick={handleOpen}>
          Add
        </Button>
      </Box>

      <DataTable
        columns={columns}
        data={taskList}
        pagination
        highlightOnHover
        striped
        responsive
      />

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
          {isEdit ? 'Edit Task' : 'Add New Task'}
          </Typography>
          <TextField
            fullWidth
            label="Title"
            name="title"
            margin="normal"
            value={form.title}
            onChange={(e) => setForm({...form, title: e.target.value})}
            error={!!errors.title}
            helperText={errors.title}
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            margin="normal"
            value={form.description}
            onChange={(e) => setForm({...form, description: e.target.value})}
            error={!!errors.description}
            helperText={errors.description}
          />
          <FormControl fullWidth margin="normal" error={!!errors.status}>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              label="Status"
              value={form.status}
              onChange={(e) => setForm({...form, status: e.target.value})}
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
            {errors.status && <Typography color="error" variant="caption">{errors.status}</Typography>}
          </FormControl>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button onClick={handleClose} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
            {isEdit ? 'Update' : 'Add'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ContentTable;
