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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleNotifications = () => {
    setNotificationsOpen((prev) => !prev);
  };

  const closeNotifications = () => {
    setNotificationsOpen(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
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
      sx={(theme) => ({
        display: 'flex',
        minHeight: '100vh',
        background: darkMode
          ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
          : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        [theme.breakpoints.down('md')]: {
          flexDirection: 'column',
        },
      })}
    >
      <SidebarEnhanced
        currentPage={currentPage}
        onPageChange={handlePageChange}
        open={sidebarOpen}
        zIndex={sidebarOpen ? 1400 : 'auto'}
      />
      <Box
        sx={(theme) => ({
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        [theme.breakpoints.down('md')]: {
          width: '100%',
          marginLeft: sidebarOpen ? 280 : 0, // Account for sidebar width on mobile (280px)
          transition: 'margin-left 0.3s ease-in-out',
        },
        })}
      >
        <TopbarEnhanced
          toggleNotifications={toggleNotifications}
          notificationsOpen={notificationsOpen}
          currentPage={currentPage}
          toggleSidebar={toggleSidebar}
        />
        <Box
          sx={(theme) => ({
            flex: 1,
            background: darkMode
              ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
              : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
            [theme.breakpoints.down('md')]: {
              marginLeft: sidebarOpen ? 0 : 0, // Don't shift content on mobile/tablet
              width: '100%',
            },
          })}
        >
          {renderCurrentPage()}
        </Box>
      </Box>
      {sidebarOpen && (
        <Box
          onClick={toggleSidebar}
          sx={(theme) => ({
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            bgcolor: 'rgba(0,0,0,0.3)',
            zIndex: 1200, // Lower than sidebar z-index (1400)
            pointerEvents: 'none', // Allow clicks to pass through to sidebar
            [theme.breakpoints.up('md')]: {
              display: 'none',
            },
          })}
        />
      )}
      {sidebarOpen && (
        <Box
          onClick={toggleSidebar}
          sx={(theme) => ({
            position: 'fixed',
            top: 0,
            left: 240,
            right: 0,
            height: '100vh',
            bgcolor: 'transparent',
            zIndex: 1300, // Lower than sidebar z-index (1400)
            pointerEvents: 'none', // Allow clicks to pass through to sidebar
            [theme.breakpoints.down('md')]: {
              display: 'none',
            },
          })}
        />
      )}
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
          <NotificationsPanelEnhanced onClose={closeNotifications} />
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
