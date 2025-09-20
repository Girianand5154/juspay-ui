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
        <Typography variant="h6" fontWeight="bold">ByeWind</Typography>
      </Box>

      <Typography variant="subtitle2" color="textSecondary" gutterBottom>Favorites</Typography>
      <List dense disablePadding>
        {menuItems.filter(item => item.type === 'favorite').map((item) => (
          <ListItemButton
            key={item.label}
            sx={{ pl: 2 }}
            onClick={() => handleMenuClick(item)}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>

      <Divider sx={{ my: 2, bgcolor: darkMode ? '#374151' : '#e0e0e0' }} />

      {menuItems.filter(item => item.type === 'section').map((section) => (
        <Box key={section.label} sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="textSecondary" sx={{ pl: 2, mb: 1 }}>{section.label}</Typography>
          <List dense disablePadding>
            {section.children.map((item) => (
              <React.Fragment key={item.label}>
                <ListItemButton
                  onClick={() => item.children ? handleToggle(item.label) : handleChildClick(item)}
                  sx={{ pl: item.children ? 2 : 3 }}
                >
                  {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
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
                          <ListItemButton key={child.label} sx={{ pl: 4 }} onClick={() => handleChildClick(child)}>
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
