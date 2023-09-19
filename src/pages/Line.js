import React from 'react'
import Header from '../components/Header'
import { Box } from '@mui/material'
import LineChart from '../components/LineChart'

const Line = () => {
  return (
    <Box m='20px'>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Header title='Line Chart' subtitle='Simple Line Chart' />
      </Box>
      <Box height='70vh'>
        <LineChart />
      </Box>
    </Box>
  )
}

export default Line