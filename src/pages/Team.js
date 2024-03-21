import React, { useContext, useEffect, useState } from 'react'
import { Typography, Box, useTheme, Button } from '@mui/material'
import { tokens } from '../theme'
import { DataGrid, GridActionsCellItem, GridRowModes } from '@mui/x-data-grid'
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined'
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined'
import Header from '../components/Header'
import DataContext from '../context/DataContext'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'
import { DELETE_USER } from '../constant/apiurl'
import { ShoppingCartRounded } from '@mui/icons-material'

const Team = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const { processedData, userDetail, setIsLoading, setAllUser, allUser } = useContext(DataContext)

  const handleEditClick = (id) => () => {
    console.log('edit')
  }
  const handleDeleteClick = (id) => async () => {
    try {
      setIsLoading(true)
      const response = await axios.delete(`${DELETE_USER}/${id}`)
      if (response.status >= 200 && response.status <= 299) {
        setAllUser(allUser.filter(user => user._id !== id));
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  const columns = [
    { field: '_id', headerName: 'ID' },
    {
      field: 'username',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column--cell'
    },
    {
      field: 'contact',
      headerName: 'Phone Number',
      flex: 1
    },
    {
      field: 'email',
      headerName: 'Email Id',
      flex: 1
    },
    {
      field: 'userType',
      headerName: 'Access Level',
      flex: 1,
      renderCell: ({ row: { userType } }) => {
        return (
          <Box
            width='100px'
            borderRadius='5px'
            p='5px'
            display='flex'
            justifyContent='center'
            backgroundColor={
              userType === 'admin'
                ? colors.greenAccent[600] : colors.greenAccent[700]
            }
          >
            {userType === 'Admin' && <AdminPanelSettingsOutlinedIcon />}
            {/* {access === 'manager' && <SecurityOutlinedIcon />} */}
            {userType === 'User' && <LockOpenOutlinedIcon />}
            <Typography color={colors.gray[100]} sx={{ ml: '5px' }}>
              {userType}
            </Typography>
          </Box>
        )
      }
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      renderCell: ({ id }) => {
        if (userDetail.userType === 'Admin') {
          return [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={handleDeleteClick(id)}
              color="inherit"
            />,
          ];
        }
        return null
      },
    },
  ];

  return (
    <Box m='20px'>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Header title='TEAM' subtitle='Managing the Team Members' />
      </Box>
      <Box margin='10px 0 0 0' height='50vh'
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none'
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none'
          },
          '& .name-column--cell': {
            color: colors.greenAccent[300]
          },
          '& .MuiDataGrid-columnHeaders': {
            borderBottom: 'none',
            backgroundColor: colors.blueAccent[700]
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400]
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700]
          },
        }}>
        <DataGrid
          rows={processedData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
        />
      </Box>
    </Box>
  )
}

export default Team