import { React, useContext, useState } from 'react'
import { Avatar, Box, IconButton, Menu, MenuItem, useTheme } from '@mui/material'
import { ColorModeContext, tokens } from '../../theme'
import InputBase from '@mui/material/InputBase'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import SearchIcon from '@mui/icons-material/Search'
import DataContext from '../../context/DataContext'

import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../constant/apiurl'

const Topbar = () => {
  const { userDetail } = useContext(DataContext)
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const colorMode = useContext(ColorModeContext)
  const [profileMenu, setProfileMenu] = useState(null);
  const open = Boolean(profileMenu);
  const isUserSignedIn = localStorage?.getItem('token')
  const navigate = useNavigate()

  // handel logout
  const handelSignOut = () => {
    localStorage.removeItem('token')
    navigate('/')
    window.location.reload()
  }
  // handel open menu
  const handleClick = (event) => {
    setProfileMenu(event.currentTarget);
  };
  //handel clode menu
  const handleClose = () => {
    setProfileMenu(null);
  };

  return (
    <Box display='flex' justifyContent='space-between' p={2}>
      {/* search box */}
      <Box display='flex' backgroundColor={colors.primary[400]} borderRadius='3px'>
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder='Search' />
        <IconButton type='button' sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>
      {/* icons */}
      <Box display='flex'>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default Topbar