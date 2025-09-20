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
} from '@mui/material';
import {
  Search,
  Add,
  FilterList,
  MoreHoriz,
  CalendarToday,
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
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
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black, 0.05),
  '&:hover': {
    backgroundColor: alpha(theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black, 0.1),
  },
  marginLeft: 0,
  width: '100%',
  maxWidth: 300,
  border: `1px solid ${theme.palette.mode === 'dark' ? '#374151' : '#e5e7eb'}`,
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

export default function OrderList() {
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
    <Box sx={{ p: 3, bgcolor: darkMode ? '#111827' : '#f9fafb', minHeight: '100vh' }}>
      <Paper sx={{ p: 0, borderRadius: 2 }}>
        {/* Header */}
        <Box sx={{ p: 2, borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}` }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" fontWeight="bold">
              Order List
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title="Add">
                <IconButton size="small" sx={{ bgcolor: darkMode ? '#374151' : '#f3f4f6', '&:hover': { bgcolor: darkMode ? '#4b5563' : '#e5e7eb' } }}>
                  <Add fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Filter">
                <IconButton size="small" sx={{ bgcolor: darkMode ? '#374151' : '#f3f4f6', '&:hover': { bgcolor: darkMode ? '#4b5563' : '#e5e7eb' } }}>
                  <FilterList fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="More">
                <IconButton size="small" sx={{ bgcolor: darkMode ? '#374151' : '#f3f4f6', '&:hover': { bgcolor: darkMode ? '#4b5563' : '#e5e7eb' } }}>
                  <MoreHoriz fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>

        {/* Search Bar */}
        <Toolbar sx={{ pl: 2, pr: 2, pt: 1, pb: 1 }}>
          <SearchWrapper>
            <SearchIconWrapper>
              <Search sx={{ color: darkMode ? '#9ca3af' : '#6b7280' }} />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search" inputProps={{ 'aria-label': 'search' }} />
          </SearchWrapper>
        </Toolbar>

        {/* Table */}
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: darkMode ? '#111827' : '#f9fafb' }}>
                <TableCell padding="checkbox" sx={{ borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}` }}>
                  <Checkbox
                    indeterminate={selected.length > 0 && selected.length < orderData.length}
                    checked={orderData.length > 0 && selected.length === orderData.length}
                    onChange={handleSelectAllClick}
                    sx={{ color: darkMode ? '#d1d5db' : '#6b7280' }}
                  />
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem', borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}` }}>
                  Order ID
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem', borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}` }}>
                  User
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem', borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}` }}>
                  Project
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem', borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}` }}>
                  Address
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem', borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}` }}>
                  Date
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem', borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}` }}>
                  Status
                </TableCell>
                <TableCell sx={{ borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}` }} />
              </TableRow>
            </TableHead>
            <TableBody>
              {orderData.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    key={row.id}
                    sx={{
                      bgcolor: index % 2 === 0 ? (darkMode ? '#1f2937' : '#ffffff') : (darkMode ? '#111827' : '#f9fafb'),
                      '&:hover': { bgcolor: darkMode ? '#374151' : '#f3f4f6' },
                    }}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        onClick={(event) => handleClick(event, row.id)}
                        sx={{ color: darkMode ? '#d1d5db' : '#6b7280' }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.875rem' }}>
                      {row.id}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar
                          src={row.user.avatar}
                          sx={{ width: 32, height: 32 }}
                        />
                        <Typography sx={{ fontSize: '0.875rem' }}>
                          {row.user.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.875rem' }}>
                      {row.project}
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.875rem' }}>
                      {row.address}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <CalendarToday sx={{ fontSize: 16, color: darkMode ? '#9ca3af' : '#6b7280' }} />
                        <Typography sx={{ fontSize: '0.875rem' }}>
                          {row.date}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={row.status}
                        sx={{
                          bgcolor: alpha(row.statusColor, 0.1),
                          color: row.statusColor,
                          fontSize: '0.75rem',
                          fontWeight: 'medium',
                          '& .MuiChip-label': {
                            px: 1,
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton size="small">
                        <MoreHoriz fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 2, borderTop: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}` }}>
          <Stack spacing={2}>
            <Pagination
              count={5}
              page={page}
              onChange={handleChangePage}
              variant="outlined"
              shape="rounded"
              sx={{
                '& .MuiPaginationItem-root': {
                  color: darkMode ? '#d1d5db' : '#6b7280',
                  borderColor: darkMode ? '#374151' : '#d1d5db',
                },
                '& .MuiPaginationItem-root.Mui-selected': {
                  bgcolor: '#000000',
                  color: '#ffffff',
                  borderColor: '#000000',
                },
              }}
            />
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}
