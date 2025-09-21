import React from 'react';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography, Divider, Avatar } from '@mui/material';
import { Dashboard, ShoppingCart, Folder, School, Person, AccountBox, Business, Article, Share, List as ListIcon } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const menuItems = [
  { label: 'Overview', type: 'favorite' },
  { label: 'Projects', type: 'favorite' },
  {
    label: 'Dashboards',
    type: 'section',
    children: [
      { label: 'Default', icon: <Dashboard /> },
      { label: 'eCommerce', icon: <ShoppingCart /> },
      { label: 'Projects', icon: <Folder /> },
      { label: 'Online Courses', icon: <School /> },
    ],
  },
  {
    label: 'Management',
    type: 'section',
    children: [
      { label: 'Order List', icon: <ListIcon /> },
    ],
  },
  {
    label: 'Pages',
    type: 'section',
    children: [
      {
        label: 'User Profile',
        icon: <Person />,
        children: [
          { label: 'Overview' },
          { label: 'Projects' },
          { label: 'Campaigns' },
          { label: 'Documents' },
          { label: 'Followers' },
        ],
      },
      { label: 'Account', icon: <AccountBox /> },
      { label: 'Corporate', icon: <Business /> },
      { label: 'Blog', icon: <Article /> },
      { label: 'Social', icon: <Share /> },
    ],
  },
];

const collapseVariants = {
  open: { opacity: 1, height: 'auto', transition: { duration: 0.3 } },
  closed: { opacity: 0, height: 0, transition: { duration: 0.3 } },
};

export default function SidebarEnhanced({ open, currentPage, onPageChange, zIndex = 'auto' }) {
  const { darkMode } = useTheme();
  const [openSections, setOpenSections] = React.useState({});

  const handleToggle = (label) => {
    setOpenSections((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handleMenuClick = (item) => {
    if (item.type === 'favorite') {
      onPageChange(item.label);
    } else if (item.children) {
      // Handle section clicks if needed
    }
  };

  const handleChildClick = (child) => {
    onPageChange(child.label);
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 768) {
      // The sidebar will close via the backdrop click handler
    }
  };

  return (
    <Box
      sx={(theme) => ({
        width: 240,
        background: darkMode
          ? 'linear-gradient(180deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)'
          : 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.98) 100%)',
        backdropFilter: 'blur(20px)',
        borderRight: `1px solid ${darkMode ? 'rgba(168, 85, 247, 0.15)' : 'rgba(124, 58, 237, 0.1)'}`,
        display: 'flex',
        flexDirection: 'column',
        p: 2.5,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        overflowX: 'hidden',
        position: 'relative',
        zIndex: zIndex,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: darkMode
            ? 'linear-gradient(90deg, transparent 0%, rgba(168, 85, 247, 0.3) 50%, transparent 100%)'
            : 'linear-gradient(90deg, transparent 0%, rgba(124, 58, 237, 0.2) 50%, transparent 100%)',
        },
        [theme.breakpoints.down('md')]: {
          position: 'fixed',
          zIndex: 1300,
          width: 240,
          left: 0,
          top: 0,
          transition: 'transform 0.3s ease-in-out',
          boxShadow: darkMode
            ? '2px 0 8px rgba(168, 85, 247, 0.3)'
            : '2px 0 8px rgba(124, 58, 237, 0.2)',
          pointerEvents: 'auto',
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
        },
        [theme.breakpoints.down('sm')]: {
          position: 'fixed',
          zIndex: 1400,
          height: '100vh',
          width: 280,
          left: 0,
          top: 0,
          transition: 'transform 0.3s ease-in-out',
          boxShadow: darkMode
            ? '2px 0 8px rgba(168, 85, 247, 0.3)'
            : '2px 0 8px rgba(124, 58, 237, 0.2)',
          background: darkMode
            ? 'linear-gradient(180deg, rgba(30, 41, 59, 0.98) 0%, rgba(15, 23, 42, 1) 100%)'
            : 'linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 1) 100%)',
          pointerEvents: 'auto',
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
        },
        [theme.breakpoints.down('xs')]: {
          width: '100vw',
          maxWidth: '100vw',
        },
      })}
    >
      {/* User Profile Section */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 4,
          p: 1.5,
          borderRadius: '16px',
          background: darkMode
            ? 'rgba(168, 85, 247, 0.08)'
            : 'rgba(124, 58, 237, 0.04)',
          border: `1px solid ${darkMode ? 'rgba(168, 85, 247, 0.15)' : 'rgba(124, 58, 237, 0.1)'}`,
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            background: darkMode
              ? 'rgba(168, 85, 247, 0.12)'
              : 'rgba(124, 58, 237, 0.08)',
            transform: 'translateY(-1px)',
          },
        }}
      >
        <Avatar
          alt="User"
          src="https://i.pravatar.cc/40"
          sx={{
            mr: 1.5,
            width: 44,
            height: 44,
            border: `2px solid ${darkMode ? 'rgba(168, 85, 247, 0.3)' : 'rgba(124, 58, 237, 0.2)'}`,
            boxShadow: darkMode
              ? '0 4px 12px rgba(168, 85, 247, 0.2)'
              : '0 4px 12px rgba(124, 58, 237, 0.15)',
          }}
        />
        <Box>
          <Typography
            variant="h6"
            fontWeight="700"
            sx={{
              background: darkMode
                ? 'linear-gradient(135deg, #a855f7 0%, #67e8f9 100%)'
                : 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontSize: '1.1rem',
            }}
          >
            ByeWind
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: darkMode ? '#cbd5e1' : '#64748b',
              fontSize: '0.75rem',
              fontWeight: 500,
            }}
          >
            Premium User
          </Typography>
        </Box>
      </Box>

      {/* Favorites Section */}
      <Typography
        variant="subtitle2"
        sx={{
          color: darkMode ? '#cbd5e1' : '#475569',
          fontWeight: 600,
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          mb: 2,
          pl: 0.5,
        }}
      >
        Favorites
      </Typography>
      <List dense disablePadding sx={{ mb: 3 }}>
        {menuItems.filter(item => item.type === 'favorite').map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <ListItemButton
              sx={{
                pl: 2,
                py: 1.5,
                mb: 0.5,
                borderRadius: '12px',
                background: currentPage === item.label
                  ? (darkMode
                      ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(251, 191, 36, 0.1) 100%)'
                      : 'linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(245, 158, 11, 0.08) 100%)')
                  : 'transparent',
                border: currentPage === item.label
                  ? `1px solid ${darkMode ? 'rgba(168, 85, 247, 0.2)' : 'rgba(124, 58, 237, 0.15)'}`
                  : '1px solid transparent',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  background: darkMode
                    ? 'rgba(168, 85, 247, 0.08)'
                    : 'rgba(124, 58, 237, 0.06)',
                  transform: 'translateX(4px)',
                  border: `1px solid ${darkMode ? 'rgba(168, 85, 247, 0.15)' : 'rgba(124, 58, 237, 0.1)'}`,
                },
              }}
              onClick={() => handleMenuClick(item)}
            >
              <ListItemText
                primary={item.label}
                sx={{
                  '& .MuiListItemText-primary': {
                    fontWeight: currentPage === item.label ? 600 : 500,
                    fontSize: '0.9rem',
                    color: currentPage === item.label
                      ? (darkMode ? '#a855f7' : '#7c3aed')
                      : (darkMode ? '#f1f5f9' : '#1e293b'),
                  },
                }}
              />
            </ListItemButton>
          </motion.div>
        ))}
      </List>

      <Divider
        sx={{
          my: 2,
          bgcolor: darkMode ? 'rgba(168, 85, 247, 0.15)' : 'rgba(124, 58, 237, 0.1)',
          height: '1px',
        }}
      />

      {/* Menu Sections */}
      {menuItems.filter(item => item.type === 'section').map((section, sectionIndex) => (
        <Box key={section.label} sx={{ mb: 3 }}>
          <Typography
            variant="subtitle2"
            sx={{
              color: darkMode ? '#cbd5e1' : '#475569',
              fontWeight: 600,
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              mb: 2,
              pl: 0.5,
            }}
          >
            {section.label}
          </Typography>
          <List dense disablePadding>
            {section.children.map((item, itemIndex) => (
              <React.Fragment key={item.label}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (sectionIndex * 0.1) + (itemIndex * 0.05), duration: 0.3 }}
                >
                  <ListItemButton
                    onClick={() => item.children ? handleToggle(item.label) : handleChildClick(item)}
                    sx={{
                      pl: item.children ? 2 : 3,
                      py: 1.5,
                      mb: 0.5,
                      borderRadius: '12px',
                      background: currentPage === item.label
                        ? (darkMode
                            ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(251, 191, 36, 0.1) 100%)'
                            : 'linear-gradient(135deg, rgba(124, 58, 237, 0.1) 0%, rgba(245, 158, 11, 0.08) 100%)')
                        : 'transparent',
                      border: currentPage === item.label
                        ? `1px solid ${darkMode ? 'rgba(168, 85, 247, 0.2)' : 'rgba(124, 58, 237, 0.15)'}`
                        : '1px solid transparent',
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        background: darkMode
                          ? 'rgba(168, 85, 247, 0.08)'
                          : 'rgba(124, 58, 237, 0.06)',
                        transform: 'translateX(4px)',
                        border: `1px solid ${darkMode ? 'rgba(168, 85, 247, 0.15)' : 'rgba(124, 58, 237, 0.1)'}`,
                      },
                    }}
                  >
                    {item.icon && (
                      <ListItemIcon
                        sx={{
                          minWidth: 36,
                          color: currentPage === item.label
                            ? (darkMode ? '#a855f7' : '#7c3aed')
                            : (darkMode ? '#94a3b8' : '#64748b'),
                          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                    )}
                    <ListItemText
                      primary={item.label}
                      sx={{
                        '& .MuiListItemText-primary': {
                          fontWeight: currentPage === item.label ? 600 : 500,
                          fontSize: '0.9rem',
                          color: currentPage === item.label
                            ? (darkMode ? '#a855f7' : '#7c3aed')
                            : (darkMode ? '#f1f5f9' : '#1e293b'),
                        },
                      }}
                    />
                  </ListItemButton>
                </motion.div>

                <AnimatePresence initial={false}>
                  {item.children && openSections[item.label] && (
                    <motion.div
                      initial="closed"
                      animate="open"
                      exit="closed"
                      variants={collapseVariants}
                      style={{ overflow: 'hidden' }}
                    >
                      <List component="div" disablePadding>
                        {item.children.map((child, childIndex) => (
                          <motion.div
                            key={child.label}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: childIndex * 0.05, duration: 0.2 }}
                          >
                            <ListItemButton
                              sx={{
                                pl: 5,
                                py: 1.2,
                                mb: 0.5,
                                borderRadius: '10px',
                                ml: 1,
                                mr: 1,
                                background: currentPage === child.label
                                  ? (darkMode
                                      ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.12) 0%, rgba(251, 191, 36, 0.08) 100%)'
                                      : 'linear-gradient(135deg, rgba(124, 58, 237, 0.08) 0%, rgba(245, 158, 11, 0.06) 100%)')
                                  : 'transparent',
                                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                '&:hover': {
                                  background: darkMode
                                    ? 'rgba(168, 85, 247, 0.06)'
                                    : 'rgba(124, 58, 237, 0.04)',
                                  transform: 'translateX(2px)',
                                },
                              }}
                              onClick={() => handleChildClick(child)}
                            >
                              <ListItemText
                                primary={child.label}
                                sx={{
                                  '& .MuiListItemText-primary': {
                                    fontWeight: currentPage === child.label ? 600 : 400,
                                    fontSize: '0.85rem',
                                    color: currentPage === child.label
                                      ? (darkMode ? '#a855f7' : '#7c3aed')
                                      : (darkMode ? '#cbd5e1' : '#64748b'),
                                  },
                                }}
                              />
                            </ListItemButton>
                          </motion.div>
                        ))}
                      </List>
                    </motion.div>
                  )}
                </AnimatePresence>
              </React.Fragment>
            ))}
          </List>
        </Box>
      ))}
    </Box>
  );
}
