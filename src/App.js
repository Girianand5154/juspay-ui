import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Sidebar from './components/SidebarWithDarkMode';
import Topbar from './components/TopbarWithDarkMode';
import Dashboard from './components/Dashboard';
import OrderList from './components/OrderListDark';
import NotificationsPanel from './components/NotificationsPanel';
import { ThemeContextProvider } from './contexts/ThemeContext';

function App() {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('eCommerce');

  const toggleNotifications = () => {
    setNotificationsOpen((prev) => !prev);
  };

  const closeNotifications = () => {
    setNotificationsOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'Order List':
        return <OrderList />;
      case 'eCommerce':
        return <Dashboard />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeContextProvider>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <Sidebar
          open={sidebarOpen}
          toggleOpen={toggleSidebar}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Topbar
            toggleNotifications={toggleNotifications}
            notificationsOpen={notificationsOpen}
            toggleSidebar={toggleSidebar}
            sidebarOpen={sidebarOpen}
            currentPage={currentPage}
          />
          {renderCurrentPage()}
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
              <NotificationsPanel />
            </Box>
          </>
        )}
      </Box>
    </ThemeContextProvider>
  );
}

export default App;
