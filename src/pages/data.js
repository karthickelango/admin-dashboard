import React, { useEffect, useState } from 'react'
import { Typography, Box, useTheme } from '@mui/material'
import { tokens } from '../theme'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { mockDataContacts } from '../data/mockData'
import Header from '../components/Header'
import { BASE_URL, GET_DB_FILE } from '../constant/apiurl'
import axios from 'axios'

const ImportedData = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [newFile, setNewFile] = useState('')

  const getUploadedFile = async () => {
    try {
      const response = await axios.get(GET_DB_FILE);
      if (response.status >= 200 && response.status <= 299) {
        setNewFile(response.data.files);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUploadedFile()
  }, [])

  const result = newFile?.map(x => x.file)
  const res =   `${BASE_URL}/${result}`
  console.log(res)

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    { field: 'registrarId', headerName: 'Registrar ID'},
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column--cell'
    },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      headerAlign: 'left',
      align: 'left'
    },
    {
      field: 'phone',
      headerName: 'Phone Number',
      flex: 1
    },
    {
      field: 'email',
      headerName: 'Email Id',
      flex: 1
    },
    {
      field: 'address',
      headerName: 'Address',
      flex: 1
    },
    {
      field: 'city',
      headerName: 'City',
      flex: 1
    },
    {
      field: 'zipCode',
      headerName: 'ZipCode',
      flex: 1
    },
  ];

  return (
    <Box m='20px'>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Header title='CONTACTS' subtitle='List of Contacts' />
      </Box>
      <Box margin='10px 0 0 0' height='70vh'
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
        '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
          color: `${colors.gray[100]} !important`
        },
      }}> 
        <DataGrid
          rows={mockDataContacts}
          columns={columns}
          components={{Toolbar: GridToolbar}}
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

export default ImportedData