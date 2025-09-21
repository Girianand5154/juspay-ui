import React from 'react';
import { AppBar, Toolbar, IconButton, InputBase, Box, Badge, Tooltip, Typography, Chip, useTheme as muiUseTheme } from '@mui/material';
import { Search, Brightness4, History, Notifications, NavigateNext, Settings, AccountCircle, Menu } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const SearchWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '16px',
  backgroundColor: theme.palette.mode === 'dark'
    ? 'rgba(30, 41, 59, 0.8)'
    : 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark'
      ? 'rgba(30, 41, 59, 0.9)'
      : 'rgba(255, 255, 255, 0.95)',
    transform: 'translateY(-1px)',
  },
  marginLeft: 0,
  width: '100%',
  maxWidth: 320,
  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(168, 85, 247, 0.2)' : 'rgba(124, 58, 237, 0.15)'}`,
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
    : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1.5),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.mode === 'dark' ? '#94a3b8' : '#64748b',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 1.5, 1.5, 0),
    fontSize: '0.875rem',
    fontWeight: 500,
    '&::placeholder': {
      color: theme.palette.mode === 'dark' ? '#94a3b8' : '#64748b',
      opacity: 0.8,
    },
  },
}));

const iconVariants = {
  hover: { scale: 1.1, rotate: 5 },
  tap: { scale: 0.95 },
};

const buttonVariants = {
  hover: { scale: 1.05, y: -1 },
  tap: { scale: 0.95 },
};

export default function TopbarEnhanced({ toggleNotifications, notificationsOpen, currentPage = 'eCommerce', toggleSidebar }) {
  const { darkMode, toggleDarkMode } = useTheme();
  const muiTheme = muiUseTheme();

  return (
    <AppBar
      position="static"
      color="transparent"
      elevation={0}
      sx={(theme) => ({
        background: darkMode
          ? 'rgba(30, 41, 59, 0.85)'
          : 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${darkMode ? 'rgba(168, 85, 247, 0.15)' : 'rgba(124, 58, 237, 0.1)'}`,
        boxShadow: darkMode
          ? '0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)'
          : '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
      })}
    >
      <Toolbar
        sx={(theme) => ({
          justifyContent: 'space-between',
          px: 3,
          [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            alignItems: 'stretch',
            gap: 1,
            px: 2,
            py: 1,
          },
        })}
      >
        {/* Left side - Navigation/Breadcrumbs */}
        <Box
          sx={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            [theme.breakpoints.down('sm')]: {
              justifyContent: 'space-between',
              width: '100%',
            },
          })}
        >
          {/* Hamburger Menu Button - Mobile/Tablet Only */}
          <Tooltip title="Toggle Sidebar">
            <motion.div
              whileHover="hover"
              whileTap="tap"
              variants={iconVariants}
              style={{ display: 'inline-block' }}
            >
              <IconButton
                size="large"
                onClick={toggleSidebar}
                sx={{
                  background: darkMode
                    ? 'rgba(30, 41, 59, 0.6)'
                    : 'rgba(255, 255, 255, 0.7)',
                  borderRadius: '12px',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    background: darkMode
                      ? 'rgba(30, 41, 59, 0.8)'
                      : 'rgba(255, 255, 255, 0.9)',
                    transform: 'translateY(-1px)',
                  },
                  [muiTheme.breakpoints.up('md')]: {
                    display: 'none',
                  },
                }}
              >
                <Menu sx={{ color: darkMode ? '#cbd5e1' : '#475569' }} />
              </IconButton>
            </motion.div>
          </Tooltip>

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                cursor: 'pointer',
                background: darkMode
                  ? 'linear-gradient(135deg, #a855f7 0%, #67e8f9 100%)'
                  : 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontSize: '1.25rem',
              }}
            >
              Dashboard
            </Typography>
          </motion.div>

          <NavigateNext
            sx={{
              fontSize: 18,
              color: darkMode ? '#94a3b8' : '#64748b',
              mx: 0.5,
              [muiTheme.breakpoints.down('sm')]: {
                display: 'none',
              },
            }}
          />

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            // Removed sx prop with theme usage to fix "theme is not defined" error
            // Using style prop instead without theme dependency
            style={{
              flexGrow: 1,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                cursor: 'pointer',
                color: darkMode ? '#f1f5f9' : '#1e293b',
                fontSize: '1.1rem',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {currentPage === 'Order List' ? 'Management' : currentPage}
            </Typography>
          </motion.div>

          {(currentPage === 'Order List') && (
            <>
              <NavigateNext
                sx={{
                  fontSize: 18,
                  color: darkMode ? '#94a3b8' : '#64748b',
                  mx: 0.5,
                  [muiTheme.breakpoints.down('sm')]: {
                    display: 'none',
                  },
                }}
              />
              <Chip
                label={currentPage}
                size="small"
                sx={{
                  background: darkMode
                    ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(251, 191, 36, 0.1) 100%)'
                    : 'linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(245, 158, 11, 0.08) 100%)',
                  border: `1px solid ${darkMode ? 'rgba(168, 85, 247, 0.2)' : 'rgba(124, 58, 237, 0.15)'}`,
                  color: darkMode ? '#a855f7' : '#7c3aed',
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  whiteSpace: 'nowrap',
                  [muiTheme.breakpoints.down('sm')]: {
                    maxWidth: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  },
                }}
              />
            </>
          )}
        </Box>

        {/* Right side - Search and Icons */}
        <Box
          sx={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            [theme.breakpoints.down('sm')]: {
              justifyContent: 'space-between',
              width: '100%',
              mt: 1,
            },
          })}
        >
          {/* Search Bar */}
          <motion.div
            whileHover="hover"
            variants={buttonVariants}
            transition={{ duration: 0.2 }}
            style={{
              flexGrow: 1,
              maxWidth: '100%',
            }}
          >
            <SearchWrapper>
              <SearchIconWrapper>
                <Search sx={{ fontSize: 20 }} />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search for anything..." inputProps={{ 'aria-label': 'search' }} />
            </SearchWrapper>
          </motion.div>

          {/* Action Icons */}
          <Tooltip title="Toggle Dark Mode">
            <motion.div
              whileHover="hover"
              whileTap="tap"
              variants={iconVariants}
              style={{ display: 'inline-block' }}
            >
              <IconButton
                size="large"
                onClick={toggleDarkMode}
                sx={{
                  background: darkMode
                    ? 'rgba(168, 85, 247, 0.08)'
                    : 'rgba(124, 58, 237, 0.06)',
                  border: `1px solid ${darkMode ? 'rgba(168, 85, 247, 0.15)' : 'rgba(124, 58, 237, 0.1)'}`,
                  borderRadius: '12px',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    background: darkMode
                      ? 'rgba(168, 85, 247, 0.15)'
                      : 'rgba(124, 58, 237, 0.12)',
                    transform: 'translateY(-1px)',
                    boxShadow: darkMode
                      ? '0 4px 12px rgba(168, 85, 247, 0.2)'
                      : '0 4px 12px rgba(124, 58, 237, 0.15)',
                  },
                }}
              >
                <Brightness4 sx={{ color: darkMode ? '#a855f7' : '#7c3aed' }} />
              </IconButton>
            </motion.div>
          </Tooltip>

          <Tooltip title="History">
            <motion.div
              whileHover="hover"
              whileTap="tap"
              variants={iconVariants}
              style={{ display: 'inline-block' }}
            >
              <IconButton
                size="large"
                sx={{
                  background: darkMode
                    ? 'rgba(30, 41, 59, 0.6)'
                    : 'rgba(255, 255, 255, 0.7)',
                  borderRadius: '12px',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    background: darkMode
                      ? 'rgba(30, 41, 59, 0.8)'
                      : 'rgba(255, 255, 255, 0.9)',
                    transform: 'translateY(-1px)',
                  },
                }}
              >
                <History sx={{ color: darkMode ? '#cbd5e1' : '#475569' }} />
              </IconButton>
            </motion.div>
          </Tooltip>

          <Tooltip title="Notifications">
            <motion.div
              whileHover="hover"
              whileTap="tap"
              variants={iconVariants}
              style={{ display: 'inline-block' }}
            >
              <IconButton
                size="large"
                onClick={toggleNotifications}
                sx={{
                  background: notificationsOpen
                    ? (darkMode
                        ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(251, 191, 36, 0.1) 100%)'
                        : 'linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(245, 158, 11, 0.08) 100%)')
                    : (darkMode
                        ? 'rgba(30, 41, 59, 0.6)'
                        : 'rgba(255, 255, 255, 0.7)'),
                  border: notificationsOpen
                    ? `1px solid ${darkMode ? 'rgba(168, 85, 247, 0.2)' : 'rgba(124, 58, 237, 0.15)'}`
                    : '1px solid transparent',
                  borderRadius: '12px',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    background: darkMode
                      ? 'rgba(30, 41, 59, 0.8)'
                      : 'rgba(255, 255, 255, 0.9)',
                    transform: 'translateY(-1px)',
                    boxShadow: darkMode
                      ? '0 4px 12px rgba(0, 0, 0, 0.2)'
                      : '0 4px 12px rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                <Badge
                  badgeContent={3}
                  sx={{
                    '& .MuiBadge-badge': {
                      background: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
                      color: '#ffffff',
                      fontWeight: 600,
                      fontSize: '0.7rem',
                    },
                  }}
                >
                  <Notifications sx={{ color: darkMode ? '#cbd5e1' : '#475569' }} />
                </Badge>
              </IconButton>
            </motion.div>
          </Tooltip>

          {/* User Menu */}
          <Tooltip title="Account Settings">
            <motion.div
              whileHover="hover"
              whileTap="tap"
              variants={iconVariants}
              style={{ display: 'inline-block' }}
            >
              <IconButton
                size="large"
                sx={{
                  background: darkMode
                    ? 'rgba(30, 41, 59, 0.6)'
                    : 'rgba(255, 255, 255, 0.7)',
                  borderRadius: '12px',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    background: darkMode
                      ? 'rgba(30, 41, 59, 0.8)'
                      : 'rgba(255, 255, 255, 0.9)',
                    transform: 'translateY(-1px)',
                  },
                }}
              >
                <AccountCircle sx={{ color: darkMode ? '#cbd5e1' : '#475569' }} />
              </IconButton>
            </motion.div>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
