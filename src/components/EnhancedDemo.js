import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

export default function EnhancedDemo() {
  const { darkMode } = useTheme();

  return (
    <Box
      sx={{
        p: 4,
        minHeight: '100vh',
        background: darkMode
          ? 'linear-gradient(135deg, #0c0a1a 0%, #1a1a2e 50%, #16213e 100%)'
          : 'linear-gradient(135deg, #fef7ff 0%, #f0f9ff 50%, #fef3c7 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            background: darkMode
              ? 'linear-gradient(135deg, #a855f7 0%, #fbbf24 50%, #67e8f9 100%)'
              : 'linear-gradient(135deg, #7c3aed 0%, #f59e0b 50%, #06b6d4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textAlign: 'center',
            mb: 2,
          }}
        >
          🎉 Modern UI Enhancement Complete!
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Typography
          variant="h5"
          sx={{
            color: darkMode ? '#cbd5e1' : '#475569',
            textAlign: 'center',
            mb: 4,
            maxWidth: 600,
          }}
        >
          Your dashboard has been transformed with modern design elements, smooth animations,
          and beautiful visual effects. Experience the new enhanced components!
        </Typography>
      </motion.div>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            variant="contained"
            sx={{
              borderRadius: '16px',
              px: 4,
              py: 2,
              fontSize: '1.1rem',
              fontWeight: 600,
              background: darkMode
                ? 'linear-gradient(135deg, #a855f7 0%, #fbbf24 100%)'
                : 'linear-gradient(135deg, #7c3aed 0%, #f59e0b 100%)',
              boxShadow: darkMode
                ? '0 8px 25px rgba(168, 85, 247, 0.3)'
                : '0 8px 25px rgba(124, 58, 237, 0.2)',
              '&:hover': {
                background: darkMode
                  ? 'linear-gradient(135deg, #7c3aed 0%, #f59e0b 100%)'
                  : 'linear-gradient(135deg, #6d28d9 0%, #d97706 100%)',
                transform: 'translateY(-2px)',
                boxShadow: darkMode
                  ? '0 12px 35px rgba(168, 85, 247, 0.4)'
                  : '0 12px 35px rgba(124, 58, 237, 0.3)',
              },
            }}
          >
            ✨ View Enhanced Components
          </Button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            variant="outlined"
            sx={{
              borderRadius: '16px',
              px: 4,
              py: 2,
              fontSize: '1.1rem',
              fontWeight: 600,
              borderColor: darkMode ? 'rgba(168, 85, 247, 0.3)' : 'rgba(124, 58, 237, 0.2)',
              color: darkMode ? '#a855f7' : '#7c3aed',
              '&:hover': {
                borderColor: darkMode ? 'rgba(168, 85, 247, 0.5)' : 'rgba(124, 58, 237, 0.3)',
                background: darkMode
                  ? 'rgba(168, 85, 247, 0.08)'
                  : 'rgba(124, 58, 237, 0.06)',
                transform: 'translateY(-2px)',
              },
            }}
          >
            🎨 Try Dark Mode
          </Button>
        </motion.div>
      </Box>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <Typography
          variant="body1"
          sx={{
            color: darkMode ? '#94a3b8' : '#64748b',
            textAlign: 'center',
            mt: 4,
            fontStyle: 'italic',
          }}
        >
          Enhanced with modern design principles, smooth animations, and beautiful visual effects
        </Typography>
      </motion.div>
    </Box>
  );
}
