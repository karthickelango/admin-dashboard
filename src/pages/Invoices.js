import React from 'react'
import { Typography, Box, useTheme } from '@mui/material'
import { tokens } from '../theme'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { mockDataInvoices } from '../data/mockData'
import Header from '../components/Header'

const Invoices = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  const columns = [
    { field: 'id', headerName: 'ID'},
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column--cell'
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
      field: 'cost',
      headerName: 'Cost',
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          ${params.row.cost}
        </Typography>
      )
    },
    {
      field: 'date',
      headerName: 'Date',
      flex: 1
    }
  ];

  return (
    <Box m='20px'>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Header title='INVOICES' subtitle='List of Invoices' />
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
        '& .MuiCheckbox-root': {
          color: `${colors.greenAccent[200]} !important`
        },
      }}> 
        <DataGrid
          rows={mockDataInvoices}
          columns={columns}
          checkboxSelection
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

export default Invoices