import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { BiUserCircle } from 'react-icons/bi';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import { removeToken } from '../services/config';

export default function MenuAppBar({ setIsAuthenticatd }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const first_name = localStorage.getItem('first_name');

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const Logout = () => {
    setAnchorEl(null);
    setIsAuthenticatd(false);
    removeToken();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position='static'
        sx={{
          p: (theme) => theme.spacing(0.5),
        }}
      >
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            My-Todos
          </Typography>
          <Stack direction={'row'} spacing={1} alignItems={'center'}>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              Welcome {first_name}
            </Typography>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleMenu}
              color='inherit'
            >
              <BiUserCircle />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Account</MenuItem>
              <MenuItem onClick={Logout}>Logout</MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
