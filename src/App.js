import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Construction } from '@mui/icons-material';
import SidebarEnhanced from './components/SidebarEnhanced';
import TopbarEnhanced from './components/TopbarEnhanced';
import Dashboard from './components/Dashboard';
import OrderListEnhanced from './components/OrderListEnhanced';
import NotificationsPanelEnhanced from './components/NotificationsPanelEnhanced';
import { ThemeContextProvider, useTheme } from './contexts/ThemeContext';

function AppContent() {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('eCommerce');
  const { darkMode } = useTheme();

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
        return (
          <Dashboard />
        );
      case 'Overview':
        return (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '60vh',
              p: 3
            }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 4,
                textAlign: 'center',
                maxWidth: 400,
                width: '100%'
              }}
            >
              <Construction sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h4" gutterBottom>
                Page Under Construction
              </Typography>
              <Typography variant="body1" color="text.secondary">
                This page is currently being developed. Please check back later.
              </Typography>
            </Paper>
          </Box>
        );
      case 'Projects':
        return (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '60vh',
              p: 3
            }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 4,
                textAlign: 'center',
                maxWidth: 400,
                width: '100%'
              }}
            >
              <Construction sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h4" gutterBottom>
                Page Under Construction
              </Typography>
              <Typography variant="body1" color="text.secondary">
                This page is currently being developed. Please check back later.
              </Typography>
            </Paper>
          </Box>
        );
      case 'Default':
        return (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '60vh',
              p: 3
            }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 4,
                textAlign: 'center',
                maxWidth: 400,
                width: '100%'
              }}
            >
              <Construction sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h4" gutterBottom>
                Page Under Construction
              </Typography>
              <Typography variant="body1" color="text.secondary">
                This page is currently being developed. Please check back later.
              </Typography>
            </Paper>
          </Box>
        );
      case 'Online Courses':
        return (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '60vh',
              p: 3
            }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 4,
                textAlign: 'center',
                maxWidth: 400,
                width: '100%'
              }}
            >
              <Construction sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h4" gutterBottom>
                Page Under Construction
              </Typography>
              <Typography variant="body1" color="text.secondary">
                This page is currently being developed. Please check back later.
              </Typography>
            </Paper>
          </Box>
        );
      default:
        return <OrderListEnhanced />;
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        background: darkMode
          ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
          : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
      }}
    >
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
        <Box
          sx={{
            flex: 1,
            background: darkMode
              ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
              : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
          }}
        >
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
  );
}

function App() {
  return (
    <ThemeContextProvider>
      <CssBaseline />
      <AppContent />
    </ThemeContextProvider>
  );
}

export default App;
