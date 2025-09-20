import React from 'react';
import { Box, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider } from '@mui/material';

const notifications = [
  { id: 1, text: 'You have a bug that needs...', time: 'Just now', avatar: 'https://i.pravatar.cc/40?img=1' },
  { id: 2, text: 'New user registered', time: '59 minutes ago', avatar: 'https://i.pravatar.cc/40?img=2' },
  { id: 3, text: 'You have a bug that needs...', time: '12 hours ago', avatar: 'https://i.pravatar.cc/40?img=3' },
  { id: 4, text: 'Andi Lane subscribed to you', time: 'Today, 11:59 AM', avatar: 'https://i.pravatar.cc/40?img=4' },
];

const activities = [
  { id: 1, text: 'You have a bug that needs...', time: 'Just now', avatar: 'https://i.pravatar.cc/40?img=5' },
  { id: 2, text: 'Released a new version', time: '59 minutes ago', avatar: 'https://i.pravatar.cc/40?img=6' },
  { id: 3, text: 'Submitted a bug', time: '12 hours ago', avatar: 'https://i.pravatar.cc/40?img=7' },
  { id: 4, text: 'Modified A data in Page X', time: 'Today, 11:59 AM', avatar: 'https://i.pravatar.cc/40?img=8' },
  { id: 5, text: 'Deleted a page in Project X', time: 'Feb 2, 2023', avatar: 'https://i.pravatar.cc/40?img=9' },
];

const contacts = [
  { id: 1, name: 'Natali Craig', avatar: 'https://i.pravatar.cc/40?img=10' },
  { id: 2, name: 'Drew Cano', avatar: 'https://i.pravatar.cc/40?img=11' },
  { id: 3, name: 'Orlando Diggs', avatar: 'https://i.pravatar.cc/40?img=12' },
  { id: 4, name: 'Andi Lane', avatar: 'https://i.pravatar.cc/40?img=13' },
  { id: 5, name: 'Kate Morrison', avatar: 'https://i.pravatar.cc/40?img=14' },
  { id: 6, name: 'Koray Okumus', avatar: 'https://i.pravatar.cc/40?img=15' },
];

export default function NotificationsPanel() {
  return (
    <Box
      sx={{
        width: { xs: 280, sm: 280 },
        bgcolor: '#fff',
        borderLeft: '1px solid #e0e0e0',
        p: 2,
        overflowY: 'auto',
        height: '100vh',
        position: 'sticky',
        top: 0,
      }}
    >
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        Notifications
      </Typography>
      <List dense>
        {notifications.map((item) => (
          <ListItem key={item.id} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar src={item.avatar} />
            </ListItemAvatar>
            <ListItemText primary={item.text} secondary={item.time} />
          </ListItem>
        ))}
      </List>

      <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ mt: 3 }}>
        Activities
      </Typography>
      <List dense>
        {activities.map((item) => (
          <ListItem key={item.id} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar src={item.avatar} />
            </ListItemAvatar>
            <ListItemText primary={item.text} secondary={item.time} />
          </ListItem>
        ))}
      </List>

      <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ mt: 3 }}>
        Contacts
      </Typography>
      <List dense>
        {contacts.map((contact) => (
          <ListItem key={contact.id}>
            <ListItemAvatar>
              <Avatar src={contact.avatar} />
            </ListItemAvatar>
            <ListItemText primary={contact.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
