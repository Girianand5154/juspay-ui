import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Chip,
  IconButton,
  Badge,
  Paper,
  Tabs,
  Tab,
  Button,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Schedule as ScheduleIcon,
  People as PeopleIcon,
  Close as CloseIcon,
  MoreVert as MoreVertIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const notifications = [
  {
    id: 1,
    type: 'error',
    text: 'You have a bug that needs to be fixed',
    time: 'Just now',
    avatar: 'https://i.pravatar.cc/40?img=1',
    unread: true,
    priority: 'high'
  },
  {
    id: 2,
    type: 'success',
    text: 'New user registered successfully',
    time: '59 minutes ago',
    avatar: 'https://i.pravatar.cc/40?img=2',
    unread: true,
    priority: 'medium'
  },
  {
    id: 3,
    type: 'warning',
    text: 'Server maintenance scheduled',
    time: '12 hours ago',
    avatar: 'https://i.pravatar.cc/40?img=3',
    unread: false,
    priority: 'low'
  },
  {
    id: 4,
    type: 'info',
    text: 'Andi Lane subscribed to you',
    time: 'Today, 11:59 AM',
    avatar: 'https://i.pravatar.cc/40?img=4',
    unread: true,
    priority: 'medium'
  },
];

const activities = [
  {
    id: 1,
    text: 'You have a bug that needs to be fixed',
    time: 'Just now',
    avatar: 'https://i.pravatar.cc/40?img=5',
    action: 'reported'
  },
  {
    id: 2,
    text: 'Released a new version',
    time: '59 minutes ago',
    avatar: 'https://i.pravatar.cc/40?img=6',
    action: 'deployed'
  },
  {
    id: 3,
    text: 'Submitted a bug report',
    time: '12 hours ago',
    avatar: 'https://i.pravatar.cc/40?img=7',
    action: 'created'
  },
  {
    id: 4,
    text: 'Modified data in Page X',
    time: 'Today, 11:59 AM',
    avatar: 'https://i.pravatar.cc/40?img=8',
    action: 'updated'
  },
  {
    id: 5,
    text: 'Deleted a page in Project X',
    time: 'Feb 2, 2023',
    avatar: 'https://i.pravatar.cc/40?img=9',
    action: 'deleted'
  },
];

const contacts = [
  {
    id: 1,
    name: 'Natali Craig',
    avatar: 'https://i.pravatar.cc/40?img=10',
    status: 'online',
    lastSeen: 'Active now'
  },
  {
    id: 2,
    name: 'Drew Cano',
    avatar: 'https://i.pravatar.cc/40?img=11',
    status: 'away',
    lastSeen: '2 hours ago'
  },
  {
    id: 3,
    name: 'Orlando Diggs',
    avatar: 'https://i.pravatar.cc/40?img=12',
    status: 'offline',
    lastSeen: 'Yesterday'
  },
  {
    id: 4,
    name: 'Andi Lane',
    avatar: 'https://i.pravatar.cc/40?img=13',
    status: 'online',
    lastSeen: 'Active now'
  },
  {
    id: 5,
    name: 'Kate Morrison',
    avatar: 'https://i.pravatar.cc/40?img=14',
    status: 'busy',
    lastSeen: 'In a meeting'
  },
  {
    id: 6,
    name: 'Koray Okumus',
    avatar: 'https://i.pravatar.cc/40?img=15',
    status: 'online',
    lastSeen: 'Active now'
  },
];

const getNotificationIcon = (type) => {
  switch (type) {
    case 'error':
      return <ErrorIcon sx={{ color: '#ef4444' }} />;
    case 'success':
      return <CheckCircleIcon sx={{ color: '#10b981' }} />;
    case 'warning':
      return <InfoIcon sx={{ color: '#f59e0b' }} />;
    default:
      return <NotificationsIcon sx={{ color: '#3b82f6' }} />;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'online':
      return '#10b981';
    case 'away':
      return '#f59e0b';
    case 'busy':
      return '#ef4444';
    default:
      return '#6b7280';
  }
};

export default function NotificationsPanelEnhanced({ onClose }) {
  const { darkMode } = useTheme();
  const [activeTab, setActiveTab] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
    >
      <Paper
        elevation={0}
        sx={{
          width: { xs: 320, sm: 360 },
          bgcolor: darkMode ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${darkMode ? 'rgba(168, 85, 247, 0.2)' : 'rgba(124, 58, 237, 0.1)'}`,
          borderRadius: '20px 0 0 20px',
          p: 0,
          overflow: 'hidden',
          boxShadow: darkMode
            ? '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)'
            : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: `1px solid ${darkMode ? 'rgba(168, 85, 247, 0.2)' : 'rgba(124, 58, 237, 0.1)'}`,
            background: darkMode
              ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(251, 191, 36, 0.05) 100%)'
              : 'linear-gradient(135deg, rgba(124, 58, 237, 0.05) 0%, rgba(251, 191, 36, 0.03) 100%)',
          }}
        >
          <Typography
            variant="h6"
            fontWeight="700"
            sx={{
              background: 'linear-gradient(135deg, #7c3aed 0%, #f59e0b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Notifications
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              size="small"
              sx={{
                color: darkMode ? '#94a3b8' : '#6b7280',
                '&:hover': {
                  backgroundColor: darkMode ? 'rgba(168, 85, 247, 0.1)' : 'rgba(124, 58, 237, 0.08)',
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={onClose}
              sx={{
                color: darkMode ? '#94a3b8' : '#6b7280',
                '&:hover': {
                  backgroundColor: darkMode ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.08)',
                  color: '#ef4444',
                  transform: 'scale(1.05)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            '& .MuiTabs-indicator': {
              background: 'linear-gradient(135deg, #7c3aed 0%, #f59e0b 100%)',
              height: 3,
              borderRadius: '3px 3px 0 0',
            },
            '& .MuiTab-root': {
              color: darkMode ? '#94a3b8' : '#6b7280',
              fontWeight: 500,
              fontSize: '0.875rem',
              textTransform: 'none',
              minHeight: 48,
              '&.Mui-selected': {
                color: '#7c3aed',
                fontWeight: 600,
              },
            },
          }}
        >
          <Tab
            icon={<NotificationsIcon />}
            iconPosition="start"
            label={`Notifications (${notifications.filter(n => n.unread).length})`}
          />
          <Tab
            icon={<ScheduleIcon />}
            iconPosition="start"
            label="Activities"
          />
          <Tab
            icon={<PeopleIcon />}
            iconPosition="start"
            label="Contacts"
          />
        </Tabs>

        {/* Content */}
        <Box sx={{ maxHeight: 'calc(100vh - 140px)', overflowY: 'auto' }}>
          <AnimatePresence mode="wait">
            {activeTab === 0 && (
              <motion.div
                key="notifications"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <List dense sx={{ p: 0 }}>
                  {notifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <ListItem
                        sx={{
                          px: 2,
                          py: 1.5,
                          borderLeft: notification.unread ? '3px solid #7c3aed' : '3px solid transparent',
                          backgroundColor: notification.unread
                            ? (darkMode ? 'rgba(124, 58, 237, 0.08)' : 'rgba(124, 58, 237, 0.04)')
                            : 'transparent',
                          '&:hover': {
                            backgroundColor: darkMode
                              ? 'rgba(168, 85, 247, 0.08)'
                              : 'rgba(124, 58, 237, 0.04)',
                          },
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            src={notification.avatar}
                            sx={{
                              width: 40,
                              height: 40,
                              border: `2px solid ${darkMode ? 'rgba(168, 85, 247, 0.2)' : 'rgba(124, 58, 237, 0.1)'}`,
                            }}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography
                              variant="body2"
                              fontWeight={notification.unread ? 600 : 400}
                              sx={{ color: darkMode ? '#f1f5f9' : '#0f172a' }}
                            >
                              {notification.text}
                            </Typography>
                          }
                          secondary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                              <Typography
                                variant="caption"
                                sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}
                              >
                                {notification.time}
                              </Typography>
                              {notification.priority === 'high' && (
                                <Chip
                                  label="High"
                                  size="small"
                                  sx={{
                                    height: 16,
                                    fontSize: '0.625rem',
                                    bgcolor: 'rgba(239, 68, 68, 0.1)',
                                    color: '#ef4444',
                                    fontWeight: 600,
                                  }}
                                />
                              )}
                            </Box>
                          }
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          {getNotificationIcon(notification.type)}
                        </Box>
                      </ListItem>
                      {index < notifications.length - 1 && (
                        <Divider sx={{ bgcolor: darkMode ? 'rgba(168, 85, 247, 0.1)' : 'rgba(124, 58, 237, 0.08)' }} />
                      )}
                    </motion.div>
                  ))}
                </List>
              </motion.div>
            )}

            {activeTab === 1 && (
              <motion.div
                key="activities"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <List dense sx={{ p: 0 }}>
                  {activities.map((activity, index) => (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <ListItem sx={{ px: 2, py: 1.5 }}>
                        <ListItemAvatar>
                          <Avatar
                            src={activity.avatar}
                            sx={{
                              width: 40,
                              height: 40,
                              border: `2px solid ${darkMode ? 'rgba(168, 85, 247, 0.2)' : 'rgba(124, 58, 237, 0.1)'}`,
                            }}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography
                              variant="body2"
                              sx={{ color: darkMode ? '#f1f5f9' : '#0f172a' }}
                            >
                              {activity.text}
                            </Typography>
                          }
                          secondary={
                            <Typography
                              variant="caption"
                              sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}
                            >
                              {activity.time}
                            </Typography>
                          }
                        />
                        <Chip
                          label={activity.action}
                          size="small"
                          variant="outlined"
                          sx={{
                            color: '#7c3aed',
                            borderColor: 'rgba(124, 58, 237, 0.3)',
                            fontSize: '0.625rem',
                            fontWeight: 600,
                          }}
                        />
                      </ListItem>
                      {index < activities.length - 1 && (
                        <Divider sx={{ bgcolor: darkMode ? 'rgba(168, 85, 247, 0.1)' : 'rgba(124, 58, 237, 0.08)' }} />
                      )}
                    </motion.div>
                  ))}
                </List>
              </motion.div>
            )}

            {activeTab === 2 && (
              <motion.div
                key="contacts"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <List dense sx={{ p: 0 }}>
                  {contacts.map((contact, index) => (
                    <motion.div
                      key={contact.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <ListItem sx={{ px: 2, py: 1.5 }}>
                        <ListItemAvatar>
                          <Box sx={{ position: 'relative' }}>
                            <Avatar
                              src={contact.avatar}
                              sx={{
                                width: 40,
                                height: 40,
                                border: `2px solid ${darkMode ? 'rgba(168, 85, 247, 0.2)' : 'rgba(124, 58, 237, 0.1)'}`,
                              }}
                            />
                            <Box
                              sx={{
                                position: 'absolute',
                                bottom: -2,
                                right: -2,
                                width: 12,
                                height: 12,
                                borderRadius: '50%',
                                bgcolor: getStatusColor(contact.status),
                                border: `2px solid ${darkMode ? '#1f2937' : '#fff'}`,
                              }}
                            />
                          </Box>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography
                              variant="body2"
                              fontWeight="500"
                              sx={{ color: darkMode ? '#f1f5f9' : '#0f172a' }}
                            >
                              {contact.name}
                            </Typography>
                          }
                          secondary={
                            <Typography
                              variant="caption"
                              sx={{ color: darkMode ? '#94a3b8' : '#64748b' }}
                            >
                              {contact.lastSeen}
                            </Typography>
                          }
                        />
                        <Chip
                          label={contact.status}
                          size="small"
                          sx={{
                            bgcolor: getStatusColor(contact.status) + '20',
                            color: getStatusColor(contact.status),
                            fontSize: '0.625rem',
                            fontWeight: 600,
                            textTransform: 'capitalize',
                          }}
                        />
                      </ListItem>
                      {index < contacts.length - 1 && (
                        <Divider sx={{ bgcolor: darkMode ? 'rgba(168, 85, 247, 0.1)' : 'rgba(124, 58, 237, 0.08)' }} />
                      )}
                    </motion.div>
                  ))}
                </List>
              </motion.div>
            )}
          </AnimatePresence>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            p: 2,
            borderTop: `1px solid ${darkMode ? 'rgba(168, 85, 247, 0.2)' : 'rgba(124, 58, 237, 0.1)'}`,
            textAlign: 'center',
          }}
        >
          <Button
            variant="text"
            size="small"
            sx={{
              color: '#7c3aed',
              fontWeight: 600,
              fontSize: '0.875rem',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: darkMode ? 'rgba(124, 58, 237, 0.08)' : 'rgba(124, 58, 237, 0.04)',
              },
            }}
          >
            View All Notifications
          </Button>
        </Box>
      </Paper>
    </motion.div>
  );
}
