import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  IconButton,
  Avatar,
  Chip,
  Toolbar,
  InputBase,
  Tooltip,
  Pagination,
  Stack,
  Button,
} from '@mui/material';
import {
  Search,
  Add,
  FilterList,
  MoreHoriz,
  CalendarToday,
  Download,
  Refresh,
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

// Sample data matching the image
const orderData = [
  {
    id: '#CM9801',
    user: { name: 'Natali Craig', avatar: 'https://i.pravatar.cc/40?img=1' },
    project: 'Landing Page',
    address: 'Meadow Lane Oakland',
    date: 'Just now',
    status: 'In Progress',
    statusColor: '#10b981',
  },
  {
    id: '#CM9802',
    user: { name: 'Kate Morrison', avatar: 'https://i.pravatar.cc/40?img=2' },
    project: 'CRM Admin pages',
    address: 'Larry San Francisco',
    date: 'A minute ago',
    status: 'Complete',
    statusColor: '#10b981',
  },
  {
    id: '#CM9803',
    user: { name: 'Drew Cano', avatar: 'https://i.pravatar.cc/40?img=3' },
    project: 'Client Project',
    address: 'Bagwell Avenue Ocala',
    date: '1 hour ago',
    status: 'Pending',
    statusColor: '#f59e0b',
  },
  {
    id: '#CM9804',
    user: { name: 'Orlando Diggs', avatar: 'https://i.pravatar.cc/40?img=4' },
    project: 'Admin Dashboard',
    address: 'Washburn Baton Rouge',
    date: 'Yesterday',
    status: 'Approved',
    statusColor: '#3b82f6',
  },
  {
    id: '#CM9805',
    user: { name: 'Andi Lane', avatar: 'https://i.pravatar.cc/40?img=5' },
    project: 'App Landing Page',
    address: 'Nest Lane Olivette',
    date: 'Feb 2, 2023',
    status: 'Rejected',
    statusColor: '#ef4444',
  },
  {
    id: '#CM9801',
    user: { name: 'Natali Craig', avatar: 'https://i.pravatar.cc/40?img=1' },
    project: 'Landing Page',
    address: 'Meadow Lane Oakland',
    date: 'Just now',
    status: 'In Progress',
    statusColor: '#10b981',
  },
  {
    id: '#CM9802',
    user: { name: 'Kate Morrison', avatar: 'https://i.pravatar.cc/40?img=2' },
    project: 'CRM Admin pages',
    address: 'Larry San Francisco',
    date: 'A minute ago',
    status: 'Complete',
    statusColor: '#10b981',
  },
  {
    id: '#CM9803',
    user: { name: 'Drew Cano', avatar: 'https://i.pravatar.cc/40?img=3' },
    project: 'Client Project',
    address: 'Bagwell Avenue Ocala',
    date: '1 hour ago',
    status: 'Pending',
    statusColor: '#f59e0b',
  },
  {
    id: '#CM9804',
    user: { name: 'Orlando Diggs', avatar: 'https://i.pravatar.cc/40?img=4' },
    project: 'Admin Dashboard',
    address: 'Washburn Baton Rouge',
    date: 'Yesterday',
    status: 'Approved',
    statusColor: '#3b82f6',
  },
  {
    id: '#CM9805',
    user: { name: 'Andi Lane', avatar: 'https://i.pravatar.cc/40?img=5' },
    project: 'App Landing Page',
    address: 'Nest Lane Olivette',
    date: 'Feb 2, 2023',
    status: 'Rejected',
    statusColor: '#ef4444',
  },
];

const SearchWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '16px',
  backgroundColor: theme.palette.mode === 'dark'
    ? 'rgba(30, 41, 59, 0.8)'
    : 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark'
      ? 'rgba(30, 41, 59, 0.9)'
      : 'rgba(255, 255, 255, 0.95)',
    transform: 'translateY(-1px)',
  },
  marginLeft: 0,
  width: '100%',
  maxWidth: 320,
  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(168, 85, 247, 0.2)' : 'rgba(124, 58, 237, 0.15)'}`,
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
    : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1.5),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.mode === 'dark' ? '#94a3b8' : '#64748b',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 1.5, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    fontSize: '0.875rem',
    fontWeight: 500,
    '&::placeholder': {
      color: theme.palette.mode === 'dark' ? '#94a3b8' : '#64748b',
      opacity: 0.8,
    },
  },
}));

const getStatusGradient = (status, darkMode) => {
  switch (status) {
    case 'In Progress':
    case 'Complete':
      return darkMode
        ? 'linear-gradient(135deg, rgba(52, 211, 153, 0.15) 0%, rgba(110, 231, 183, 0.1) 100%)'
        : 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(52, 211, 153, 0.08) 100%)';
    case 'Pending':
      return darkMode
        ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(252, 211, 77, 0.1) 100%)'
        : 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(251, 191, 36, 0.08) 100%)';
    case 'Approved':
      return darkMode
        ? 'linear-gradient(135deg, rgba(96, 165, 250, 0.15) 0%, rgba(147, 197, 253, 0.1) 100%)'
        : 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(96, 165, 250, 0.08) 100%)';
    case 'Rejected':
      return darkMode
        ? 'linear-gradient(135deg, rgba(248, 113, 113, 0.15) 0%, rgba(252, 165, 165, 0.1) 100%)'
        : 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(248, 113, 113, 0.08) 100%)';
    default:
      return darkMode
        ? 'linear-gradient(135deg, rgba(156, 163, 175, 0.15) 0%, rgba(209, 213, 219, 0.1) 100%)'
        : 'linear-gradient(135deg, rgba(107, 114, 128, 0.1) 0%, rgba(156, 163, 175, 0.08) 100%)';
  }
};

export default function OrderListEnhanced() {
  const { darkMode } = useTheme();
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = orderData.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Box
      sx={{
        p: 3,
        background: darkMode
          ? 'linear-gradient(135deg, #0c0a1a 0%, #1a1a2e 50%, #16213e 100%)'
          : 'linear-gradient(135deg, #fef7ff 0%, #f0f9ff 50%, #fef3c7 100%)',
        minHeight: '100vh',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper
          sx={{
            borderRadius: '20px',
            background: darkMode
              ? 'rgba(30, 41, 59, 0.95)'
              : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${darkMode ? 'rgba(168, 85, 247, 0.15)' : 'rgba(124, 58, 237, 0.1)'}`,
            boxShadow: darkMode
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
              : '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <Box
            sx={{
              p: 3,
              borderBottom: `1px solid ${darkMode ? 'rgba(168, 85, 247, 0.15)' : 'rgba(124, 58, 237, 0.1)'}`,
              background: darkMode
                ? 'linear-gradient(135deg, rgba(168, 85, 247, 0.08) 0%, rgba(30, 41, 59, 0.05) 100%)'
                : 'linear-gradient(135deg, rgba(124, 58, 237, 0.04) 0%, rgba(255, 255, 255, 0.02) 100%)',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="800"
                  sx={{
                    background: darkMode
                      ? 'linear-gradient(135deg, #a855f7 0%, #67e8f9 100%)'
                      : 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    mb: 0.5,
                  }}
                >
                  Order Management
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: darkMode ? '#cbd5e1' : '#64748b',
                    fontWeight: 500,
                  }}
                >
                  Manage and track all your orders in one place
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outlined"
                    startIcon={<Refresh />}
                    sx={{
                      borderRadius: '12px',
                      borderColor: darkMode ? 'rgba(168, 85, 247, 0.3)' : 'rgba(124, 58, 237, 0.2)',
                      color: darkMode ? '#a855f7' : '#7c3aed',
                      '&:hover': {
                        borderColor: darkMode ? 'rgba(168, 85, 247, 0.5)' : 'rgba(124, 58, 237, 0.3)',
                        background: darkMode
                          ? 'rgba(168, 85, 247, 0.08)'
                          : 'rgba(124, 58, 237, 0.06)',
                      },
                    }}
                  >
                    Refresh
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="contained"
                    startIcon={<Download />}
                    sx={{
                      borderRadius: '12px',
                      background: darkMode
                        ? 'linear-gradient(135deg, #a855f7 0%, #fbbf24 100%)'
                        : 'linear-gradient(135deg, #7c3aed 0%, #f59e0b 100%)',
                      boxShadow: darkMode
                        ? '0 4px 12px rgba(168, 85, 247, 0.3)'
                        : '0 4px 12px rgba(124, 58, 237, 0.2)',
                      '&:hover': {
                        background: darkMode
                          ? 'linear-gradient(135deg, #7c3aed 0%, #f59e0b 100%)'
                          : 'linear-gradient(135deg, #6d28d9 0%, #d97706 100%)',
                        transform: 'translateY(-1px)',
                        boxShadow: darkMode
                          ? '0 6px 16px rgba(168, 85, 247, 0.4)'
                          : '0 6px 16px rgba(124, 58, 237, 0.3)',
                      },
                    }}
                  >
                    Export
                  </Button>
                </motion.div>
              </Box>
            </Box>
          </Box>

          {/* Search Bar */}
          <Toolbar sx={{ pl: 3, pr: 3, pt: 2, pb: 2 }}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <SearchWrapper>
                <SearchIconWrapper>
                  <Search sx={{ fontSize: 20 }} />
                </SearchIconWrapper>
                <StyledInputBase placeholder="Search orders, users, or projects..." inputProps={{ 'aria-label': 'search' }} />
              </SearchWrapper>
            </motion.div>
          </Toolbar>

          {/* Table */}
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow
                  sx={{
                    background: darkMode
                      ? 'rgba(168, 85, 247, 0.04)'
                      : 'rgba(124, 58, 237, 0.02)',
                  }}
                >
                  <TableCell padding="checkbox" sx={{ borderBottom: `1px solid ${darkMode ? 'rgba(168, 85, 247, 0.15)' : 'rgba(124, 58, 237, 0.1)'}` }}>
                    <Checkbox
                      indeterminate={selected.length > 0 && selected.length < orderData.length}
                      checked={orderData.length > 0 && selected.length === orderData.length}
                      onChange={handleSelectAllClick}
                      sx={{ color: darkMode ? '#a855f7' : '#7c3aed' }}
                    />
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      fontSize: '0.875rem',
                      color: darkMode ? '#f1f5f9' : '#1e293b',
                      borderBottom: `1px solid ${darkMode ? 'rgba(168, 85, 247, 0.15)' : 'rgba(124, 58, 237, 0.1)'}`,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Order ID
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      fontSize: '0.875rem',
                      color: darkMode ? '#f1f5f9' : '#1e293b',
                      borderBottom: `1px solid ${darkMode ? 'rgba(168, 85, 247, 0.15)' : 'rgba(124, 58, 237, 0.1)'}`,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    User
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      fontSize: '0.875rem',
                      color: darkMode ? '#f1f5f9' : '#1e293b',
                      borderBottom: `1px solid ${darkMode ? 'rgba(168, 85, 247, 0.15)' : 'rgba(124, 58, 237, 0.1)'}`,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Project
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      fontSize: '0.875rem',
                      color: darkMode ? '#f1f5f9' : '#1e293b',
                      borderBottom: `1px solid ${darkMode ? 'rgba(168, 85, 247, 0.15)' : 'rgba(124, 58, 237, 0.1)'}`,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Address
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      fontSize: '0.875rem',
                      color: darkMode ? '#f1f5f9' : '#1e293b',
                      borderBottom: `1px solid ${darkMode ? 'rgba(168, 85, 247, 0.15)' : 'rgba(124, 58, 237, 0.1)'}`,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Date
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      fontSize: '0.875rem',
                      color: darkMode ? '#f1f5f9' : '#1e293b',
                      borderBottom: `1px solid ${darkMode ? 'rgba(168, 85, 247, 0.15)' : 'rgba(124, 58, 237, 0.1)'}`,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    sx={{
                      borderBottom: `1px solid ${darkMode ? 'rgba(168, 85, 247, 0.15)' : 'rgba(124, 58, 237, 0.1)'}`,
                    }}
                  />
                </TableRow>
              </TableHead>
              <TableBody>
                {orderData.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <motion.tr
                      key={row.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      style={{
                        backgroundColor: index % 2 === 0
                          ? (darkMode ? 'rgba(30, 41, 59, 0.3)' : 'rgba(255, 255, 255, 0.5)')
                          : (darkMode ? 'rgba(15, 23, 42, 0.3)' : 'rgba(248, 250, 252, 0.5)'),
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = darkMode
                          ? 'rgba(168, 85, 247, 0.06)'
                          : 'rgba(124, 58, 237, 0.04)';
                        e.currentTarget.style.transform = 'scale(1.005)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = index % 2 === 0
                          ? (darkMode ? 'rgba(30, 41, 59, 0.3)' : 'rgba(255, 255, 255, 0.5)')
                          : (darkMode ? 'rgba(15, 23, 42, 0.3)' : 'rgba(248, 250, 252, 0.5)');
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          onClick={(event) => handleClick(event, row.id)}
                          sx={{ color: darkMode ? '#a855f7' : '#7c3aed' }}
                        />
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          color: darkMode ? '#f1f5f9' : '#1e293b',
                        }}
                      >
                        {row.id}
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Avatar
                            src={row.user.avatar}
                            sx={{
                              width: 36,
                              height: 36,
                              border: `2px solid ${darkMode ? 'rgba(168, 85, 247, 0.2)' : 'rgba(124, 58, 237, 0.15)'}`,
                            }}
                          />
                          <Typography
                            sx={{
                              fontSize: '0.875rem',
                              fontWeight: 500,
                              color: darkMode ? '#f1f5f9' : '#1e293b',
                            }}
                          >
                            {row.user.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: '0.875rem',
                          color: darkMode ? '#cbd5e1' : '#475569',
                        }}
                      >
                        {row.project}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: '0.875rem',
                          color: darkMode ? '#cbd5e1' : '#475569',
                        }}
                      >
                        {row.address}
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <CalendarToday
                            sx={{
                              fontSize: 16,
                              color: darkMode ? '#94a3b8' : '#64748b',
                            }}
                          />
                          <Typography
                            sx={{
                              fontSize: '0.875rem',
                              color: darkMode ? '#cbd5e1' : '#475569',
                            }}
                          >
                            {row.date}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={row.status}
                          sx={{
                            background: getStatusGradient(row.status, darkMode),
                            border: `1px solid ${darkMode ? 'rgba(168, 85, 247, 0.2)' : 'rgba(124, 58, 237, 0.15)'}`,
                            color: row.statusColor,
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            '& .MuiChip-label': {
                              px: 1.5,
                            },
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          sx={{
                            borderRadius: '8px',
                            '&:hover': {
                              background: darkMode
                                ? 'rgba(168, 85, 247, 0.15)'
                                : 'rgba(124, 58, 237, 0.1)',
                            },
                          }}
                        >
                          <MoreHoriz fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </motion.tr>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              p: 3,
              borderTop: `1px solid ${darkMode ? 'rgba(168, 85, 247, 0.15)' : 'rgba(124, 58, 237, 0.1)'}`,
              background: darkMode
                ? 'rgba(30, 41, 59, 0.3)'
                : 'rgba(255, 255, 255, 0.3)',
            }}
          >
            <Stack spacing={2}>
              <Pagination
                count={5}
                page={page}
                onChange={handleChangePage}
                variant="outlined"
                shape="rounded"
                sx={{
                  '& .MuiPaginationItem-root': {
                    color: darkMode ? '#cbd5e1' : '#475569',
                    borderColor: darkMode ? 'rgba(168, 85, 247, 0.2)' : 'rgba(124, 58, 237, 0.15)',
                    borderRadius: '8px',
                    '&:hover': {
                      borderColor: darkMode ? 'rgba(168, 85, 247, 0.3)' : 'rgba(124, 58, 237, 0.2)',
                      background: darkMode
                        ? 'rgba(168, 85, 247, 0.08)'
                        : 'rgba(124, 58, 237, 0.06)',
                    },
                  },
                  '& .MuiPaginationItem-root.Mui-selected': {
                    background: darkMode
                      ? 'linear-gradient(135deg, #a855f7 0%, #fbbf24 100%)'
                      : 'linear-gradient(135deg, #7c3aed 0%, #f59e0b 100%)',
                    color: '#ffffff',
                    borderColor: 'transparent',
                    '&:hover': {
                      background: darkMode
                        ? 'linear-gradient(135deg, #7c3aed 0%, #f59e0b 100%)'
                        : 'linear-gradient(135deg, #6d28d9 0%, #d97706 100%)',
                    },
                  },
                }}
              />
            </Stack>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
}
