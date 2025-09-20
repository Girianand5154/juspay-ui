import React, { useState } from 'react';
import { Box, Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, Legend, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

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
            height: 280,
            bgcolor: darkMode ? '#1f2937' : '#ffffff',
            border: darkMode ? '1px solid #374151' : 'none'
          }}>
            <Typography variant="subtitle2" gutterBottom fontWeight="bold" sx={{ color: darkMode ? '#f9fafb' : '#374151' }}>Projections vs Actuals</Typography>
            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={projectionsData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
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
                <Tooltip />
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

            {/* Simple World Map Background */}
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
              {/* Minimalist World Map SVG */}
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 400 120"
                style={{ position: 'absolute', top: 0, left: 0 }}
              >
                {/* Simple continent shapes - very minimal */}
                <g opacity="0.4">
                  {/* North America - simple blob */}
                  <path
                    d="M40 25 Q80 15 120 25 Q160 35 180 25 Q200 15 220 25 Q240 35 220 55 Q200 75 180 55 Q160 35 140 55 Q120 75 100 55 Q80 35 60 55 Q40 35 40 25 Z"
                    fill={darkMode ? '#4b5563' : '#e5e7eb'}
                  />
                  {/* Europe/Africa - simple blob */}
                  <path
                    d="M240 20 Q280 10 320 20 Q360 30 400 20 Q440 10 480 20 Q500 30 480 50 Q460 70 440 50 Q420 30 400 50 Q380 70 360 50 Q340 30 320 50 Q300 70 280 50 Q260 30 240 50 Q240 20 240 20 Z"
                    fill={darkMode ? '#4b5563' : '#e5e7eb'}
                  />
                  {/* Asia - simple blob */}
                  <path
                    d="M280 45 Q320 35 360 45 Q400 55 440 45 Q480 35 520 45 Q540 55 520 75 Q500 95 480 75 Q460 55 440 75 Q420 95 400 75 Q380 55 360 75 Q340 95 320 75 Q300 55 280 75 Q280 45 280 45 Z"
                    fill={darkMode ? '#4b5563' : '#e5e7eb'}
                  />
                  {/* South America - simple blob */}
                  <path
                    d="M160 60 Q180 50 200 60 Q220 70 240 60 Q260 50 280 60 Q290 70 280 90 Q270 110 250 90 Q230 70 210 90 Q190 110 170 90 Q150 70 160 90 Q160 60 160 60 Z"
                    fill={darkMode ? '#4b5563' : '#e5e7eb'}
                  />
                  {/* Australia - simple blob */}
                  <path
                    d="M360 80 Q380 75 400 80 Q420 85 440 80 Q460 75 480 80 Q490 85 480 95 Q470 105 450 95 Q430 85 410 95 Q390 105 370 95 Q360 85 360 95 Q360 80 360 80 Z"
                    fill={darkMode ? '#4b5563' : '#e5e7eb'}
                  />
                </g>
              </svg>

              {/* Location Dots */}
              <Box
                sx={{
                  position: 'absolute',
                  top: '20%',
                  left: '12%',
                  width: 6,
                  height: 6,
                  bgcolor: darkMode ? '#f9fafb' : '#000',
                  borderRadius: '50%',
                  zIndex: 2,
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: '25%',
                  left: '8%',
                  width: 6,
                  height: 6,
                  bgcolor: darkMode ? '#f9fafb' : '#000',
                  borderRadius: '50%',
                  zIndex: 2,
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: '65%',
                  right: '20%',
                  width: 6,
                  height: 6,
                  bgcolor: darkMode ? '#f9fafb' : '#000',
                  borderRadius: '50%',
                  zIndex: 2,
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: '70%',
                  right: '12%',
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
