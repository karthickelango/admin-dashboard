import React from 'react'
import Header from '../components/Header'
import { Box, colors } from '@mui/material'
import GeographyChart from '../components/GeographyChart'

const Geography = () => {
  return (
    <Box m='20px'>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Header title='Geography Chart' subtitle='Simple Geography Chart' />
      </Box>
      <Box height='70vh' border={`1px solid ${colors.grey[100]}`} borderRadius='4px'>
        <GeographyChart />
      </Box>
    </Box>
  )
}

export default Geography