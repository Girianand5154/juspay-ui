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

export default function Sidebar({ open, currentPage, onPageChange }) {
  const [openSections, setOpenSections] = React.useState({});
  const { darkMode } = useTheme();

  const handleToggle = (label) => {
    setOpenSections((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handlePageClick = (page) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  return (
    <Box
      sx={{
        width: 220,
        bgcolor: darkMode ? '#1f2937' : '#fff',
        borderRight: `1px solid ${darkMode ? '#374151' : '#e0e0e0'}`,
        display: 'flex',
        flexDirection: 'column',
        p: 2,
        transition: 'width 0.3s ease',
        overflowX: 'hidden',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Avatar alt="User" src="https://i.pravatar.cc/40" sx={{ mr: 1, width: 40, height: 40 }} />
        <Typography variant="h6" fontWeight="bold" sx={{ color: darkMode ? '#f9fafb' : '#374151' }}>ByeWind</Typography>
      </Box>

      <Typography variant="subtitle2" color="textSecondary" gutterBottom sx={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>Favorites</Typography>
      <List dense disablePadding>
        {menuItems.filter(item => item.type === 'favorite').map((item) => (
          <ListItemButton
            key={item.label}
            sx={{
              pl: 2,
              '&:hover': { bgcolor: darkMode ? '#374151' : '#f3f4f6' },
              color: darkMode ? '#f9fafb' : '#374151'
            }}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>

      <Divider sx={{ my: 2, bgcolor: darkMode ? '#374151' : '#e0e0e0' }} />

      {menuItems.filter(item => item.type === 'section').map((section) => (
        <Box key={section.label} sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="textSecondary" sx={{ pl: 2, mb: 1, color: darkMode ? '#9ca3af' : '#6b7280' }}>{section.label}</Typography>
          <List dense disablePadding>
            {section.children.map((item) => (
              <React.Fragment key={item.label}>
                <ListItemButton
                  onClick={() => {
                    if (item.children) {
                      handleToggle(item.label);
                    } else {
                      handlePageClick(item.label);
                    }
                  }}
                  sx={{
                    pl: item.children ? 2 : 3,
                    '&:hover': { bgcolor: darkMode ? '#374151' : '#f3f4f6' },
                    color: darkMode ? '#f9fafb' : '#374151',
                    bgcolor: currentPage === item.label ? (darkMode ? '#374151' : '#e5e7eb') : 'transparent'
                  }}
                >
                  {item.icon && <ListItemIcon sx={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>{item.icon}</ListItemIcon>}
                  <ListItemText primary={item.label} />
                </ListItemButton>
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
                        {item.children.map((child) => (
                          <ListItemButton
                            key={child.label}
                            onClick={() => handlePageClick(child.label)}
                            sx={{
                              pl: 4,
                              '&:hover': { bgcolor: darkMode ? '#374151' : '#f3f4f6' },
                              color: darkMode ? '#f9fafb' : '#374151',
                              bgcolor: currentPage === child.label ? (darkMode ? '#374151' : '#e5e7eb') : 'transparent'
                            }}
                          >
                            <ListItemText primary={child.label} />
                          </ListItemButton>
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
