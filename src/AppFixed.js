import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import SidebarEnhanced from './components/SidebarEnhanced';
import TopbarEnhanced from './components/TopbarEnhanced';
import Dashboard from './components/Dashboard';
import OrderListEnhanced from './components/OrderListEnhanced';
import NotificationsPanelEnhanced from './components/NotificationsPanelEnhanced';
import { ThemeContextProvider } from './contexts/ThemeContext';

function App() {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('Order List');

  const toggleNotifications = () => {
    setNotificationsOpen((prev) => !prev);
  };

  const closeNotifications = () => {
    setNotificationsOpen(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'Order List':
        return <OrderListEnhanced />;
      case 'eCommerce':
        return <Dashboard />;
      case 'Overview':
        return (
          <Box sx={{ p: 3 }}>
            <h1>Overview Dashboard</h1>
            <p>This is the overview page content with modern styling.</p>
          </Box>
        );
      case 'Projects':
        return (
          <Box sx={{ p: 3 }}>
            <h1>Projects Dashboard</h1>
            <p>This is the projects page content with modern styling.</p>
          </Box>
        );
      default:
        return <OrderListEnhanced />;
    }
  };

  return (
    <ThemeContextProvider>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <SidebarEnhanced
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <TopbarEnhanced
            toggleNotifications={toggleNotifications}
            notificationsOpen={notificationsOpen}
            currentPage={currentPage}
          />
          <Box sx={{ flex: 1, background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
            {renderCurrentPage()}
          </Box>
        </Box>
        {notificationsOpen && (
          <>
            <Box
              onClick={closeNotifications}
              sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                bgcolor: 'rgba(0,0,0,0.3)',
                zIndex: 1200,
              }}
            />
            <Box sx={{ position: 'relative', zIndex: 1300 }}>
              <NotificationsPanelEnhanced onClose={closeNotifications} />
            </Box>
          </>
        )}
      </Box>
    </ThemeContextProvider>
  );
}

export default App;
