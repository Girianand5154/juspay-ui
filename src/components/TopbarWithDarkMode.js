import React from 'react';
import { AppBar, Toolbar, IconButton, InputBase, Box, Badge, Tooltip, Typography } from '@mui/material';
import { Search, Brightness4, History, Notifications, NavigateNext } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const SearchWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black, 0.05),
  '&:hover': {
    backgroundColor: alpha(theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black, 0.1),
  },
  marginLeft: 0,
  width: '100%',
  maxWidth: 300,
  border: `1px solid ${theme.palette.mode === 'dark' ? '#374151' : '#e5e7eb'}`,
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  paddingLeft: `calc(1em + ${theme.spacing(3)})`,
}));

const iconVariants = {
  hover: { scale: 1.2 },
  tap: { scale: 0.9 },
};

export default function Topbar({ toggleNotifications, notificationsOpen, currentPage = 'eCommerce' }) {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left side - Navigation/Breadcrumbs */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', cursor: 'pointer' }}>
            Dashboard
          </Typography>
          <NavigateNext sx={{ mx: 1, fontSize: 20 }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold', cursor: 'pointer' }}>
            {currentPage === 'Order List' ? 'Management' : currentPage}
          </Typography>
          {(currentPage === 'Order List') && (
            <>
              <NavigateNext sx={{ mx: 1, fontSize: 20 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {currentPage}
              </Typography>
            </>
          )}
        </Box>

        {/* Right side - Search and Icons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Search Bar */}
          <SearchWrapper>
            <SearchIconWrapper>
              <Search />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
          </SearchWrapper>

          {/* Icons */}
          <Tooltip title="Toggle Dark Mode">
            <motion.div whileHover="hover" whileTap="tap" variants={iconVariants} style={{ display: 'inline-block' }}>
              <IconButton size="large" color="inherit" onClick={toggleDarkMode}>
                <Brightness4 />
              </IconButton>
            </motion.div>
          </Tooltip>
          <Tooltip title="History">
            <motion.div whileHover="hover" whileTap="tap" variants={iconVariants} style={{ display: 'inline-block' }}>
              <IconButton size="large" color="inherit">
                <History />
              </IconButton>
            </motion.div>
          </Tooltip>
          <Tooltip title="Notifications">
            <motion.div whileHover="hover" whileTap="tap" variants={iconVariants} style={{ display: 'inline-block' }}>
              <IconButton size="large" color={notificationsOpen ? 'primary' : 'inherit'} onClick={toggleNotifications}>
                <Badge badgeContent={3} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
            </motion.div>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
