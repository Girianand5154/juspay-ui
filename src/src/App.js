import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './components/Dashboard';
import NotificationsPanel from './components/NotificationsPanel';

function App() {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const toggleNotifications = () => {
    setNotificationsOpen((prev) => !prev);
  };

  const closeNotifications = () => {
    setNotificationsOpen(false);
  };

  return (
    <>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh', bgcolor: '#f9fafb', position: 'relative' }}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Topbar toggleNotifications={toggleNotifications} notificationsOpen={notificationsOpen} />
          <Dashboard />
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
    </>
  );
}

export default App;
