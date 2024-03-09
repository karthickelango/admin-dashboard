import { React, useContext, useState } from 'react'
import { Avatar, Box, IconButton, Menu, MenuItem, useTheme } from '@mui/material'
import { ColorModeContext, tokens } from '../../theme'
import InputBase from '@mui/material/InputBase'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import SearchIcon from '@mui/icons-material/Search'
import profile from '../../../src/assets/user.svg'
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
  console.log(userDetail)

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
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <div style={{ position: 'relative' }}>
          <Avatar alt={userDetail.username} src={`${BASE_URL}/${userDetail.avatar}`}
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick} 
            style={{width: '30px', height: '30px'}}/>
          <Menu
            id="menu"
            profileMenu={profileMenu}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}><Link to='/myaccount'>My account</Link></MenuItem>
            <MenuItem onClick={() => handelSignOut()}>Logout</MenuItem>
          </Menu>
        </div>
      </Box>
    </Box>
  )
}

export default Topbar