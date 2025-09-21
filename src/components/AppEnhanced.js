import React, { useState } from 'react';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { motion } from 'framer-motion';
import { ThemeProvider as ThemeProviderContext } from '../contexts/ThemeContext';
import SidebarEnhanced from './SidebarEnhanced';
import TopbarEnhanced from './TopbarEnhanced';
import OrderListEnhanced from './OrderListEnhanced';
import NotificationsPanel from './NotificationsPanel';

export default function AppEnhanced() {
  const [currentPage, setCurrentPage] = useState('Order List');
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'Order List':
        return <OrderListEnhanced />;
      case 'Overview':
        return (
          <Box sx={{ p: 3 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1>Overview Dashboard</h1>
              <p>This is the overview page content.</p>
            </motion.div>
          </Box>
        );
      case 'Projects':
        return (
          <Box sx={{ p: 3 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1>Projects Dashboard</h1>
              <p>This is the projects page content.</p>
            </motion.div>
          </Box>
        );
      default:
        return <OrderListEnhanced />;
    }
  };

  return (
    <ThemeProviderContext>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        {/* Sidebar */}
        <motion.div
          initial={{ x: -250 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <SidebarEnhanced
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </motion.div>

        {/* Main Content */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Topbar */}
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TopbarEnhanced
              toggleNotifications={toggleNotifications}
              notificationsOpen={notificationsOpen}
              currentPage={currentPage}
            />
          </motion.div>

          {/* Page Content */}
          <Box sx={{ flex: 1, position: 'relative' }}>
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              style={{ height: '100%' }}
            >
              {renderContent()}
            </motion.div>

            {/* Notifications Panel */}
            <NotificationsPanel
              open={notificationsOpen}
              onClose={() => setNotificationsOpen(false)}
            />
          </Box>
        </Box>
      </Box>
    </ThemeProviderContext>
  );
}
