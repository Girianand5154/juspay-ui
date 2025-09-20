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
    transition: {
      delay: i * 0.1,
    },
  }),
};

export default function Dashboard() {
  const { darkMode } = useTheme();

  return (
    <Box sx={{ p: 3, bgcolor: darkMode ? '#111827' : '#f9fafb', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
        Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {ecomStats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={stat.label}>
            <motion.div
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              <Paper
                sx={{
                  p: 3,
                  borderRadius: 2,
                  bgcolor: darkMode ? '#1f2937' : stat.bgColor,
                  border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
                }}
              >
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {stat.label}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: stat.positive ? '#10b981' : '#ef4444',
                    fontWeight: 'medium',
                  }}
                >
                  {stat.change}
                </Typography>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Projections Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 2, bgcolor: darkMode ? '#1f2937' : '#ffffff', border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}` }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Projections vs Actuals
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={projectionsData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="actual" fill="#3b82f6" />
                <Bar dataKey="projection" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Revenue by Location */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 2, bgcolor: darkMode ? '#1f2937' : '#ffffff', border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}` }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Revenue by Location
            </Typography>
            <Box sx={{ mt: 2 }}>
              {revenueByLocation.map((item, index) => (
                <Box key={item.city} sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="body2">{item.city}</Typography>
                  <Typography variant="body2" fontWeight="bold">
                    {item.shortValue}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Revenue Chart */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 2, bgcolor: darkMode ? '#1f2937' : '#ffffff', border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}` }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Revenue
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="current" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="previous" stroke="#ef4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Top Products Table */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 2, bgcolor: darkMode ? '#1f2937' : '#ffffff', border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}` }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Top Products
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>Product</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 'bold', fontSize: '0.875rem' }}>Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topProducts.map((product, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ fontSize: '0.875rem' }}>
                        <Typography variant="body2" fontWeight="medium">
                          {product.name}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          ${product.price} × {product.quantity}
                        </Typography>
                      </TableCell>
                      <TableCell align="right" sx={{ fontSize: '0.875rem', fontWeight: 'medium' }}>
                        ${product.amount.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Total Sales Pie Chart */}
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, borderRadius: 2, textAlign: 'center', bgcolor: darkMode ? '#1f2937' : '#ffffff', border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}` }}>
            <Typography variant="subtitle2" gutterBottom fontWeight="bold">Total Sales</Typography>
            <ResponsiveContainer width="100%" height="280">
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
                    const radius = outerRadius + 20;
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
