import React, { useState } from 'react';
import { Box, Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, Legend, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

// Custom Tooltip Components
const CustomBarTooltip = ({ active, payload, label, darkMode }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          bgcolor: darkMode ? '#1f2937' : '#ffffff',
          border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
          borderRadius: 2,
          p: 2,
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          minWidth: 200,
        }}
      >
        <Typography variant="subtitle2" sx={{ color: darkMode ? '#f9fafb' : '#374151', fontWeight: 'bold', mb: 1 }}>
          {label}
        </Typography>
        {payload.map((entry, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                bgcolor: entry.color,
                mr: 1,
              }}
            />
            <Typography variant="body2" sx={{ color: darkMode ? '#d1d5db' : '#6b7280', mr: 2 }}>
              {entry.dataKey === 'projection' ? 'Projection' : 'Actual'}:
            </Typography>
            <Typography variant="body2" sx={{ color: darkMode ? '#f9fafb' : '#374151', fontWeight: 'bold' }}>
              {entry.value}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  }
  return null;
};

const CustomLineTooltip = ({ active, payload, label, darkMode }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          bgcolor: darkMode ? '#1f2937' : '#ffffff',
          border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
          borderRadius: 2,
          p: 2,
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          minWidth: 220,
        }}
      >
        <Typography variant="subtitle2" sx={{ color: darkMode ? '#f9fafb' : '#374151', fontWeight: 'bold', mb: 1 }}>
          {label}
        </Typography>
        {payload.map((entry, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                bgcolor: entry.color,
                mr: 1,
              }}
            />
            <Typography variant="body2" sx={{ color: darkMode ? '#d1d5db' : '#6b7280', mr: 2 }}>
              {entry.dataKey === 'current' ? 'Current Week' : 'Previous Week'}:
            </Typography>
            <Typography variant="body2" sx={{ color: darkMode ? '#f9fafb' : '#374151', fontWeight: 'bold' }}>
              ${entry.value.toLocaleString()}
            </Typography>
          </Box>
        ))}
        {payload.length === 2 && (
          <Box sx={{ mt: 2, pt: 1, borderTop: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}` }}>
            <Typography variant="body2" sx={{ color: darkMode ? '#d1d5db' : '#6b7280', fontSize: '0.75rem' }}>
              Difference: <span style={{ color: darkMode ? '#f9fafb' : '#374151', fontWeight: 'bold' }}>
                ${(payload[0].value - payload[1].value).toLocaleString()}
              </span>
            </Typography>
          </Box>
        )}
      </Box>
    );
  }
  return null;
};

const CustomPieTooltip = ({ active, payload, darkMode }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <Box
        sx={{
          bgcolor: darkMode ? '#1f2937' : '#ffffff',
          border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
          borderRadius: 2,
          p: 2,
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          minWidth: 180,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              bgcolor: data.payload.color,
              mr: 1,
            }}
          />
          <Typography variant="subtitle2" sx={{ color: darkMode ? '#f9fafb' : '#374151', fontWeight: 'bold' }}>
            {data.name}
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: darkMode ? '#d1d5db' : '#6b7280', mb: 0.5 }}>
          Value: <span style={{ color: darkMode ? '#f9fafb' : '#374151', fontWeight: 'bold' }}>
            ${data.value.toFixed(2)}
          </span>
        </Typography>
        <Typography variant="body2" sx={{ color: darkMode ? '#d1d5db' : '#6b7280' }}>
          Percentage: <span style={{ color: darkMode ? '#f9fafb' : '#374151', fontWeight: 'bold' }}>
            {((data.value / totalSalesData.reduce((sum, entry) => sum + entry.value, 0)) * 100).toFixed(1)}%
          </span>
        </Typography>
      </Box>
    );
  }
  return null;
};

const ecomStats = [
  { label: 'Customers', value: '3,781', change: '+11.01%', positive: true, bgColor: '#dbeafe' },
  { label: 'Orders', value: '1,219', change: '-0.03%', positive: false, bgColor: '#f3f4f6' },
  { label: 'Revenue', value: '$695', change: '+15.03%', positive: true, bgColor: '#e0e7ff' },
  { label: 'Growth', value: '30.1%', change: '+6.08%', positive: true, bgColor: '#cbd5e1' },
];

const projectionsData = [
  { month: 'Jan', actual: 15, projection: 20 },
  { month: 'Feb', actual: 18, projection: 22 },
  { month: 'Mar', actual: 16, projection: 19 },
  { month: 'Apr', actual: 20, projection: 25 },
  { month: 'May', actual: 14, projection: 18 },
  { month: 'Jun', actual: 21, projection: 23 },
];

const revenueData = [
  { month: 'Jan', current: 10000, previous: 8000 },
  { month: 'Feb', current: 15000, previous: 12000 },
  { month: 'Mar', current: 12000, previous: 14000 },
  { month: 'Apr', current: 18000, previous: 16000 },
  { month: 'May', current: 13000, previous: 11000 },
  { month: 'Jun', current: 20000, previous: 19000 },
];

const revenueByLocation = [
  { city: 'New York', value: 72000, shortValue: '72K' },
  { city: 'San Francisco', value: 39000, shortValue: '39K' },
  { city: 'Sydney', value: 25000, shortValue: '25K' },
  { city: 'Singapore', value: 61000, shortValue: '61K' },
];

const topProducts = [
  { name: 'ASOS Ridley High Waist', price: 79.49, quantity: 82, amount: 6518.18 },
  { name: 'Marco Lightweight Shirt', price: 128.5, quantity: 37, amount: 4754.5 },
  { name: 'Half Sleeve Shirt', price: 39.99, quantity: 64, amount: 2559.36 },
  { name: 'Lightweight Jacket', price: 20.0, quantity: 184, amount: 3680.0 },
  { name: 'Marco Shoes', price: 79.49, quantity: 64, amount: 1965.81 },
];

const totalSalesData = [
  { name: 'Direct', value: 300.56, color: '#000000' },
  { name: 'Affiliate', value: 135.18, color: '#a8d5ba' },
  { name: 'Sponsored', value: 154.02, color: '#a3bffa' },
  { name: 'E-mail', value: 48.96, color: '#b3d4fc' },
];

const COLORS = ['#000000', '#a8d5ba', '#a3bffa', '#b3d4fc'];

const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 },
  }),
};

export default function Dashboard() {
  const { darkMode } = useTheme();

  return (
    <Box sx={{ p: 2, overflowY: 'auto', bgcolor: darkMode ? '#111827' : '#f9fafb' }}>
      <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ color: darkMode ? '#f9fafb' : '#374151' }}>eCommerce</Typography>

      {/* First Row - Stats Cards and Projections */}
      <Grid container spacing={2} mb={2}>
        <Grid item xs={6} sm={3}>
          <Grid container spacing={2} direction="column">
            {ecomStats.filter(stat => stat.label === 'Customers' || stat.label === 'Revenue').map((stat, index) => (
              <Grid item key={stat.label}>
                <motion.div
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                >
                  <Paper sx={{
                    p: 2,
                    bgcolor: darkMode ? '#1f2937' : stat.bgColor,
                    borderRadius: 2,
                    height: 120,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    border: darkMode ? '1px solid #374151' : 'none'
                  }}>
                    <Typography variant="subtitle2" color="textSecondary">{stat.label}</Typography>
                    <Typography variant="h5" fontWeight="bold" sx={{ color: darkMode ? '#f9fafb' : '#374151' }}>{stat.value}</Typography>
                    <Typography variant="caption" color={stat.positive ? 'success.main' : 'error.main'}>
                      {stat.change} {stat.positive ? '▲' : '▼'}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Grid container spacing={2} direction="column">
            {ecomStats.filter(stat => stat.label === 'Orders' || stat.label === 'Growth').map((stat, index) => (
              <Grid item key={stat.label}>
                <motion.div
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                >
                  <Paper sx={{
                    p: 2,
                    bgcolor: darkMode ? '#1f2937' : stat.bgColor,
                    borderRadius: 2,
                    height: 120,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    border: darkMode ? '1px solid #374151' : 'none'
                  }}>
                    <Typography variant="subtitle2" color="textSecondary">{stat.label}</Typography>
                    <Typography variant="h5" fontWeight="bold" sx={{ color: darkMode ? '#f9fafb' : '#374151' }}>{stat.value}</Typography>
                    <Typography variant="caption" color={stat.positive ? 'success.main' : 'error.main'}>
                      {stat.change} {stat.positive ? '▲' : '▼'}
                    </Typography>
                  </Paper>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper sx={{
            p: 2,
            borderRadius: 2,
            height: 255,
            bgcolor: darkMode ? '#1f2937' : '#ffffff',
            border: darkMode ? '1px solid #374151' : 'none'
          }}>
            <Typography variant="subtitle2" gutterBottom fontWeight="bold" sx={{ color: darkMode ? '#f9fafb' : '#374151' }}>Projections vs Actuals</Typography>
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={projectionsData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<CustomBarTooltip darkMode={darkMode} />} />
                <Bar dataKey="projection" stackId="a" fill="#a3bffa" />
                <Bar dataKey="actual" stackId="a" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Second Row - Revenue Chart and Location */}
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} sm={8}>
          <Paper sx={{
            p: 2,
            borderRadius: 2,
            height: 320,
            bgcolor: darkMode ? '#1f2937' : '#ffffff',
            border: darkMode ? '1px solid #374151' : 'none'
          }}>
            <Typography variant="subtitle2" gutterBottom fontWeight="bold" sx={{ color: darkMode ? '#f9fafb' : '#374151' }}>
              Revenue &nbsp;
              <Box component="span" sx={{ fontWeight: 'normal', color: 'text.secondary' }}>
                | Current Week $58,211 &nbsp; Previous Week $68,768
              </Box>
            </Typography>
            <ResponsiveContainer width="100%" height="85%">
              <LineChart data={revenueData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<CustomLineTooltip darkMode={darkMode} />} />
                <Legend />
                <Line type="monotone" dataKey="current" stroke="#000" strokeWidth={2} />
                <Line type="monotone" dataKey="previous" stroke="#a3bffa" strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Paper sx={{
            p: 2,
            borderRadius: 2,
            position: 'relative',
            overflow: 'hidden',
            height: 320,
            bgcolor: darkMode ? '#1f2937' : '#ffffff',
            border: darkMode ? '1px solid #374151' : 'none'
          }}>
            <Typography variant="subtitle2" gutterBottom fontWeight="bold" sx={{ color: darkMode ? '#f9fafb' : '#374151' }}>Revenue by Location</Typography>

            {/* Accurate World Map Background */}
            <Box
              sx={{
                position: 'relative',
                height: 140,
                mb: 2,
                backgroundColor: darkMode ? '#374151' : '#f8fafc',
                borderRadius: 1,
                overflow: 'hidden',
              }}
            >
              {/* Accurate World Map SVG */}
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 400 120"
                style={{ position: 'absolute', top: 0, left: 0 }}
              >
                {/* Accurate continent shapes */}
                <g opacity="0.4">
                  {/* North America */}
                  <path
                    d="M20 30 L60 25 L85 20 L110 25 L130 30 L140 35 L135 45 L125 55 L110 60 L95 55 L80 50 L65 45 L50 40 L35 35 L25 32 Z"
                    fill={darkMode ? '#4b5563' : '#e5e7eb'}
                  />
                  {/* South America */}
                  <path
                    d="M120 65 L135 60 L145 65 L150 75 L145 85 L140 95 L135 105 L130 115 L125 110 L120 100 L115 90 L110 80 L105 70 L110 65 Z"
                    fill={darkMode ? '#4b5563' : '#e5e7eb'}
                  />
                  {/* Europe */}
                  <path
                    d="M220 25 L240 20 L260 25 L275 30 L280 35 L275 40 L265 45 L250 40 L235 35 L225 30 Z"
                    fill={darkMode ? '#4b5563' : '#e5e7eb'}
                  />
                  {/* Africa */}
                  <path
                    d="M240 45 L260 40 L280 45 L295 50 L300 60 L295 70 L285 80 L270 85 L255 80 L245 70 L240 60 L235 50 Z"
                    fill={darkMode ? '#4b5563' : '#e5e7eb'}
                  />
                  {/* Asia */}
                  <path
                    d="M290 25 L320 20 L350 25 L375 30 L385 35 L380 40 L370 45 L355 50 L340 45 L325 40 L310 35 L300 30 Z"
                    fill={darkMode ? '#4b5563' : '#e5e7eb'}
                  />
                  {/* Australia */}
                  <path
                    d="M340 70 L365 65 L385 70 L390 75 L385 80 L375 85 L360 80 L345 75 Z"
                    fill={darkMode ? '#4b5563' : '#e5e7eb'}
                  />
                </g>
              </svg>

              {/* Location Dots - Accurately positioned */}
              {/* New York (Eastern US) */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '35%',
                  left: '22%',
                  width: 6,
                  height: 6,
                  bgcolor: darkMode ? '#f9fafb' : '#000',
                  borderRadius: '50%',
                  zIndex: 2,
                }}
              />
              {/* San Francisco (Western US) */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '40%',
                  left: '12%',
                  width: 6,
                  height: 6,
                  bgcolor: darkMode ? '#f9fafb' : '#000',
                  borderRadius: '50%',
                  zIndex: 2,
                }}
              />
              {/* Sydney (Australia) */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '75%',
                  left: '85%',
                  width: 6,
                  height: 6,
                  bgcolor: darkMode ? '#f9fafb' : '#000',
                  borderRadius: '50%',
                  zIndex: 2,
                }}
              />
              {/* Singapore (Southeast Asia) */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '65%',
                  left: '92%',
                  width: 6,
                  height: 6,
                  bgcolor: darkMode ? '#f9fafb' : '#000',
                  borderRadius: '50%',
                  zIndex: 2,
                }}
              />
            </Box>

            {/* Location List */}
            {revenueByLocation.map((loc) => (
              <Box key={loc.city} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, alignItems: 'center' }}>
                <Typography variant="body2" sx={{ fontSize: '0.875rem', color: darkMode ? '#f9fafb' : '#374151' }}>{loc.city}</Typography>
                <Typography variant="body2" fontWeight="bold" sx={{ fontSize: '0.875rem', color: darkMode ? '#f9fafb' : '#374151' }}>{loc.shortValue}</Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>

      {/* Third Row - Products Table and Sales */}
      <Grid container spacing={2} mb={2}>
        <Grid item xs={12} sm={8}>
          <Paper sx={{
            p: 0,
            borderRadius: 2,
            height: 380,
            display: 'flex',
            flexDirection: 'column',
            bgcolor: darkMode ? '#1f2937' : '#ffffff',
            border: darkMode ? '1px solid #374151' : 'none'
          }}>
            <Box sx={{ p: 2, pb: 1 }}>
              <Typography variant="subtitle2" fontWeight="bold" sx={{ color: darkMode ? '#f9fafb' : '#374151' }}>Top Selling Products</Typography>
            </Box>
            <TableContainer sx={{ flex: 1, overflow: 'auto' }}>
              <Table size="small" aria-label="top selling products" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{
                      fontWeight: 'bold',
                      backgroundColor: darkMode ? '#111827' : '#f8fafc',
                      fontSize: '0.875rem',
                      py: 1.5,
                      borderBottom: darkMode ? '1px solid #374151' : '1px solid #e5e7eb',
                      color: darkMode ? '#f9fafb' : '#374151'
                    }}>Name</TableCell>
                    <TableCell sx={{
                      fontWeight: 'bold',
                      backgroundColor: darkMode ? '#111827' : '#f8fafc',
                      fontSize: '0.875rem',
                      py: 1.5,
                      borderBottom: darkMode ? '1px solid #374151' : '1px solid #e5e7eb',
                      color: darkMode ? '#f9fafb' : '#374151'
                    }}>Price</TableCell>
                    <TableCell sx={{
                      fontWeight: 'bold',
                      backgroundColor: darkMode ? '#111827' : '#f8fafc',
                      fontSize: '0.875rem',
                      py: 1.5,
                      borderBottom: darkMode ? '1px solid #374151' : '1px solid #e5e7eb',
                      color: darkMode ? '#f9fafb' : '#374151'
                    }}>Quantity</TableCell>
                    <TableCell sx={{
                      fontWeight: 'bold',
                      backgroundColor: darkMode ? '#111827' : '#f8fafc',
                      fontSize: '0.875rem',
                      py: 1.5,
                      borderBottom: darkMode ? '1px solid #374151' : '1px solid #e5e7eb',
                      color: darkMode ? '#f9fafb' : '#374151'
                    }}>Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topProducts.map((product, index) => (
                    <TableRow
                      key={product.name}
                      sx={{
                        backgroundColor: index % 2 === 0 ? (darkMode ? '#1f2937' : '#ffffff') : (darkMode ? '#111827' : '#f9fafb'),
                        '&:hover': {
                          backgroundColor: darkMode ? '#374151' : '#f3f4f6',
                        }
                      }}
                    >
                      <TableCell sx={{ fontSize: '0.875rem', py: 1.5, color: darkMode ? '#f9fafb' : '#374151' }}>{product.name}</TableCell>
                      <TableCell sx={{ fontSize: '0.875rem', py: 1.5, color: darkMode ? '#f9fafb' : '#374151' }}>${product.price.toFixed(2)}</TableCell>
                      <TableCell sx={{ fontSize: '0.875rem', py: 1.5, color: darkMode ? '#f9fafb' : '#374151' }}>{product.quantity}</TableCell>
                      <TableCell sx={{ fontSize: '0.875rem', py: 1.5, color: darkMode ? '#f9fafb' : '#374151' }}>${product.amount.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Paper sx={{
            p: 2,
            borderRadius: 2,
            textAlign: 'center',
            height: 380,
            bgcolor: darkMode ? '#1f2937' : '#ffffff',
            border: darkMode ? '1px solid #374151' : 'none'
          }}>
            <Typography variant="subtitle2" gutterBottom fontWeight="bold" sx={{ color: darkMode ? '#f9fafb' : '#374151' }}>Total Sales</Typography>
            <ResponsiveContainer width="100%" height="80%">
              <PieChart>
                <Pie
                  data={totalSalesData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="40%"
                  innerRadius={50}
                  outerRadius={70}
                  startAngle={90}
                  endAngle={450}
                  paddingAngle={5}
                  cornerRadius={10}
                  labelLine={false}
                  label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
                    const RADIAN = Math.PI / 180;
                    const radius = outerRadius + 20; // place label outside the chart
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);
                    if (index === 0) {
                      return (
                        <text x={x} y={y} fill={darkMode ? '#f9fafb' : '#000'} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontWeight="bold" fontSize={14}>
                          {`${(percent * 100).toFixed(1)}%`}
                        </text>
                      );
                    }
                    return null;
                  }}
                >
                  {totalSalesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip darkMode={darkMode} />} />
                <Legend
                  layout="vertical"
                  verticalAlign="bottom"
                  align="center"
                  iconSize={10}
                  formatter={(value, entry, index) => (
                    <span style={{ color: darkMode ? '#f9fafb' : totalSalesData[index].color, fontWeight: 'bold' }}>
                      {value} ${totalSalesData[index].value.toFixed(2)}
                    </span>
                  )}
                  wrapperStyle={{ paddingTop: 10 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
