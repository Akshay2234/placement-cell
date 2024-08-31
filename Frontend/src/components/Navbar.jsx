import React, { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import io from 'socket.io-client';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  width: '60%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newJobsCount, setNewJobsCount] = useState(0);
  const [lastChecked, setLastChecked] = useState(new Date().toISOString());
  const [notifications, setNotifications] = useState([]); // Store notifications
  const [notificationOpen, setNotificationOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const socket = io('http://localhost:8000'); // Replace with your server's URL
    
    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
    });
  
    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    socket.on('newJob', (job) => {
      console.log('New job received:', job);
      setNotifications((prevNotifications) => [...prevNotifications, { company: job.companyName, title: job.jobTitle }]);
      setNewJobsCount((prevCount) => prevCount + 1);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    if (event.key === 'Enter') {
      navigate(`/search?query=${searchQuery}`);
      setLastChecked(new Date().toISOString());
    }
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMobileMoreAnchorEl(null);
  };

  //const handleNotificationClick = () => {
  //  navigate('/home');
  //};

  const logOut = () => {
    localStorage.clear();
    navigate('/sign-in');
  };
  const handleNotificationClick = () => {
    setNotificationOpen(!notificationOpen); // Toggle notification box
  };

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => { navigate('/home/user-profile'); handleMenuClose(); }}>Profile</MenuItem>
      <MenuItem onClick={logOut}>Log Out</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>
        <IconButton size='large' aria-label='show 4 new mails' color='inherit'>
          <Badge badgeContent={0} color='error'>
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size='large'
          aria-label='show new notifications'
          color='inherit'
          onClick={handleNotificationClick}
        >
          <Badge badgeContent={newJobsCount} color='error'>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={() => { navigate('/home/user-profile'); handleMenuClose(); }}>
        <IconButton
          size='large'
          aria-label='account of current user'
          aria-controls={menuId}
          aria-haspopup='true'
          color='inherit'
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

 // useEffect(() => {
 //   const fetchNewJobsCount = async () => {
 //     try {
 //       const response = await axios.get('/api/jobs/new-count', {
 //         params: { since: lastChecked }
 //       });
 //       setNewJobsCount(response.data.count);
 //     } catch (error) {
 //       console.error('Error fetching new jobs count:', error);
 //     }
 //   };
//
 //   fetchNewJobsCount();
//
 //   // Poll every 30 seconds
 //   const interval = setInterval(() => {
 //     fetchNewJobsCount();
 //   }, 30000);
//
 //   return () => clearInterval(interval);
 // }, [lastChecked]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' sx={{ backgroundColor: '#ef4444' }}>
        <Toolbar>
          <img className='h-24 w-24 mx-2' src='./pc-msit-logo.png' alt="msit-logo" />
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder='Search jobs...'
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleSearchSubmit}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size='large' aria-label='show 4 new mails' color='inherit'>
              <Badge badgeContent={0} color='error'>
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size='large'
              aria-label={`show ${newJobsCount} new notifications`}
              color='inherit'
              onClick={handleNotificationClick}
            >
              <Badge badgeContent={newJobsCount} color='error'>
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size='large'
              edge='end'
              aria-label='account of current user'
              aria-controls={menuId}
              aria-haspopup='true'
              onClick={handleProfileMenuOpen}
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={(event) => setMobileMoreAnchorEl(event.currentTarget)}
              color='inherit'
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {notificationOpen && (
        <Box
          sx={{
            position: 'absolute',
            right: 20,
            top: 70,
            width: 300,
            bgcolor: 'background.paper',
            boxShadow: 1,
            borderRadius: 1,
            p: 2,
            zIndex: 1201,
          }}
        >
          <Typography variant="h6">Notifications</Typography>
          <ul>
      {notifications.length === 0 ? (
        <li>No new notifications</li>
      ) : (
        notifications.map((notification, index) => (
          <li key={index}>
            A new company {notification.company || 'Unknown'} is here: {notification.title || 'No title available'}
          </li>
        ))
      )}
    </ul>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;
