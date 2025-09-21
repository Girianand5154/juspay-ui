import React, { useState } from 'react';
import { Box, Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, Legend, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ShowChartIcon from '@mui/icons-material/ShowChart';

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
              {entry.value}M
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
  {
    label: 'Customers',
    value: '3,781',
    change: '+11.01%',
    positive: true,
    bgColor: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    icon: PeopleIcon,
    iconColor: '#ffffff'
  },
  {
    label: 'Orders',
    value: '1,219',
    change: '-0.03%',
    positive: false,
    bgColor: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
    icon: ShoppingCartIcon,
    iconColor: '#ffffff'
  },
  {
    label: 'Revenue',
    value: '$695',
    change: '+15.03%',
    positive: true,
    bgColor: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    icon: MonetizationOnIcon,
    iconColor: '#ffffff'
  },
  {
    label: 'Growth',
    value: '30.1%',
    change: '+6.08%',
    positive: true,
    bgColor: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    icon: ShowChartIcon,
    iconColor: '#ffffff'
  },
];

const projectionsData = [
  { month: 'Jan', actual: 15, projection: 20, actualM: '15M', projectionM: '20M' },
  { month: 'Feb', actual: 18, projection: 22, actualM: '18M', projectionM: '22M' },
  { month: 'Mar', actual: 16, projection: 19, actualM: '16M', projectionM: '19M' },
  { month: 'Apr', actual: 20, projection: 25, actualM: '20M', projectionM: '25M' },
  { month: 'May', actual: 14, projection: 18, actualM: '14M', projectionM: '18M' },
  { month: 'Jun', actual: 21, projection: 23, actualM: '21M', projectionM: '23M' },
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
  { name: 'Direct', value: 300.56, color: '#6366f1' },
  { name: 'Affiliate', value: 135.18, color: '#10b981' },
  { name: 'Sponsored', value: 154.02, color: '#f59e0b' },
  { name: 'E-mail', value: 48.96, color: '#14b8a6' },
];

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#14b8a6'];

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
    <Box
      sx={{
        p: 3,
        overflowY: 'auto',
        minHeight: '100vh',
        background: darkMode
          ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
          : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: darkMode
            ? 'radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)'
            : 'radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(20, 184, 166, 0.05) 0%, transparent 50%)',
          pointerEvents: 'none',
          zIndex: 0,
        }
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h4"
            gutterBottom
            fontWeight="700"
            sx={{
              color: darkMode ? '#f1f5f9' : '#1e293b',
              mb: 3,
              fontSize: '2.5rem',
              background: darkMode
                ? 'linear-gradient(135deg, #818cf8 0%, #5eead4 100%)'
                : 'linear-gradient(135deg, #6366f1 0%, #14b8a6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            eCommerce Dashboard
          </Typography>
        </motion.div>

      {/* First Row - Stats Cards and Projections */}
      <Grid container spacing={2} mb={2}>
        <Grid item xs={6} sm={3}>
          <Grid container spacing={2} direction="column">
            {ecomStats.filter(stat => stat.label === 'Customers' || stat.label === 'Revenue').map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Grid item key={stat.label}>
                  <motion.div
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Paper
                      sx={{
                        p: 2.5,
                        background: stat.bgColor,
                        height: 140,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: darkMode
                          ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                          : '0 8px 32px rgba(0, 0, 0, 0.1)',
                        border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(229, 231, 235, 1)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: 3,
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          width: '60px',
                          height: '60px',
                          background: `radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)`,
                          borderRadius: '50%',
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color: '#ffffff',
                            fontWeight: 600,
                            opacity: 0.9,
                            fontSize: '0.875rem'
                          }}
                        >
                          {stat.label}
                        </Typography>
                        <IconComponent sx={{ color: stat.iconColor, fontSize: 24, opacity: 0.9 }} />
                      </Box>

                      <Typography
                        variant="h4"
                        fontWeight="700"
                        sx={{
                          color: '#ffffff',
                          mb: 1,
                          fontSize: '1.75rem',
                          textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                        }}
                      >
                        {stat.value}
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        {stat.positive ? (
                          <TrendingUpIcon sx={{ color: '#ffffff', fontSize: 16, opacity: 0.9 }} />
                        ) : (
                          <TrendingDownIcon sx={{ color: '#ffffff', fontSize: 16, opacity: 0.9 }} />
                        )}
                        <Typography
                          variant="caption"
                          sx={{
                            color: '#ffffff',
                            fontWeight: 600,
                            opacity: 0.9,
                            fontSize: '0.75rem'
                          }}
                        >
                          {stat.change}
                        </Typography>
                      </Box>
                    </Paper>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
        </Grid>

        <Grid item xs={6} sm={3}>
          <Grid container spacing={2} direction="column">
            {ecomStats.filter(stat => stat.label === 'Orders' || stat.label === 'Growth').map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Grid item key={stat.label}>
                  <motion.div
                    custom={index + 2}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Paper
                      sx={{
                        p: 2.5,
                        background: stat.bgColor,
                        height: 140,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: darkMode
                          ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                          : '0 8px 32px rgba(0, 0, 0, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: 3,
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          width: '60px',
                          height: '60px',
                          background: `radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)`,
                          borderRadius: '50%',
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color: '#ffffff',
                            fontWeight: 600,
                            opacity: 0.9,
                            fontSize: '0.875rem'
                          }}
                        >
                          {stat.label}
                        </Typography>
                        <IconComponent sx={{ color: stat.iconColor, fontSize: 24, opacity: 0.9 }} />
                      </Box>

                      <Typography
                        variant="h4"
                        fontWeight="700"
                        sx={{
                          color: '#ffffff',
                          mb: 1,
                          fontSize: '1.75rem',
                          textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                        }}
                      >
                        {stat.value}
                      </Typography>

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        {stat.positive ? (
                          <TrendingUpIcon sx={{ color: '#ffffff', fontSize: 16, opacity: 0.9 }} />
                        ) : (
                          <TrendingDownIcon sx={{ color: '#ffffff', fontSize: 16, opacity: 0.9 }} />
                        )}
                        <Typography
                          variant="caption"
                          sx={{
                            color: '#ffffff',
                            fontWeight: 600,
                            opacity: 0.9,
                            fontSize: '0.75rem'
                          }}
                        >
                          {stat.change}
                        </Typography>
                      </Box>
                    </Paper>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
        </Grid>

        <Grid item xs={12} sm={6}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                height: 280,
                background: darkMode
                  ? 'rgba(30, 41, 59, 0.9)'
                  : 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: darkMode
                  ? '1px solid rgba(129, 140, 248, 0.2)'
                  : '1px solid rgba(99, 102, 241, 0.1)',
                boxShadow: darkMode
                  ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                  : '0 8px 32px rgba(0, 0, 0, 0.1)',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 3,
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '100px',
                  height: '100px',
                  background: `radial-gradient(circle, rgba(20, 184, 166, 0.1) 0%, transparent 70%)`,
                  borderRadius: '50%',
                }
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                fontWeight="600"
                sx={{
                  color: darkMode ? '#f1f5f9' : '#1e293b',
                  mb: 2,
                  fontSize: '1.125rem'
                }}
              >
                Projections vs Actuals
              </Typography>
              <ResponsiveContainer width="100%" height="85%">
                <BarChart
                  data={projectionsData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 12,
                      fill: darkMode ? '#94a3b8' : '#64748b',
                      fontWeight: 500
                    }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 12,
                      fill: darkMode ? '#94a3b8' : '#64748b',
                      fontWeight: 500
                    }}
                    tickFormatter={(value) => `${value}M`}
                    domain={[0, 30]}
                  />
                  <Tooltip content={<CustomBarTooltip darkMode={darkMode} />} />
                  <Bar
                    dataKey="actual"
                    stackId="a"
                    fill="url(#actualGradient)"
                    radius={[2, 2, 0, 0]}
                  />
                  <Bar
                    dataKey="projection"
                    stackId="a"
                    fill="url(#projectionGradient)"
                    radius={[4, 4, 2, 2]}
                  />
                  <defs>
                    <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#059669" stopOpacity={0.6} />
                    </linearGradient>
                    <linearGradient id="projectionGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#4f46e5" stopOpacity={0.6} />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>

      {/* Second Row - Revenue Chart and Location */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={8}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                height: 340,
                background: darkMode
                  ? 'rgba(30, 41, 59, 0.9)'
                  : 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: darkMode
                  ? '1px solid rgba(129, 140, 248, 0.2)'
                  : '1px solid rgba(99, 102, 241, 0.1)',
                boxShadow: darkMode
                  ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                  : '0 8px 32px rgba(0, 0, 0, 0.1)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '120px',
                  height: '120px',
                  background: `radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)`,
                  borderRadius: '50%',
                }
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                fontWeight="600"
                sx={{
                  color: darkMode ? '#f1f5f9' : '#1e293b',
                  mb: 2,
                  fontSize: '1.125rem'
                }}
              >
                Revenue Analytics &nbsp;
                <Box component="span" sx={{
                  fontWeight: 'normal',
                  color: darkMode ? '#94a3b8' : '#64748b',
                  fontSize: '0.875rem'
                }}>
                  | Current Week $58,211 &nbsp; Previous Week $68,768
                </Box>
              </Typography>
              <ResponsiveContainer width="100%" height="85%">
                <LineChart data={revenueData}>
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 12,
                      fill: darkMode ? '#94a3b8' : '#64748b',
                      fontWeight: 500
                    }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 12,
                      fill: darkMode ? '#94a3b8' : '#64748b',
                      fontWeight: 500
                    }}
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                  />
                  <Tooltip content={<CustomLineTooltip darkMode={darkMode} />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="current"
                    stroke="url(#currentGradient)"
                    strokeWidth={3}
                    dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#6366f1', strokeWidth: 2 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="previous"
                    stroke="url(#previousGradient)"
                    strokeWidth={3}
                    strokeDasharray="8 4"
                    dot={{ fill: '#14b8a6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#14b8a6', strokeWidth: 2 }}
                  />
                  <defs>
                    <linearGradient id="currentGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
                      <stop offset="100%" stopColor="#4f46e5" stopOpacity={0.8} />
                    </linearGradient>
                    <linearGradient id="previousGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#14b8a6" stopOpacity={1} />
                      <stop offset="100%" stopColor="#0d9488" stopOpacity={0.8} />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={4}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                position: 'relative',
                overflow: 'hidden',
                height: 340,
                background: darkMode
                  ? 'rgba(30, 41, 59, 0.9)'
                  : 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: darkMode
                  ? '1px solid rgba(129, 140, 248, 0.2)'
                  : '1px solid rgba(99, 102, 241, 0.1)',
                boxShadow: darkMode
                  ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                  : '0 8px 32px rgba(0, 0, 0, 0.1)',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '80px',
                  height: '80px',
                  background: `radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%)`,
                  borderRadius: '50%',
                }
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                fontWeight="600"
                sx={{
                  color: darkMode ? '#f1f5f9' : '#1e293b',
                  mb: 2,
                  fontSize: '1.125rem'
                }}
              >
                Revenue by Location
              </Typography>

            {/* Accurate World Map Background */}
            <Box
              sx={{
                position: 'relative',
                height: 80,
                mb: 1.5,
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

            {/* Enhanced Location List with Progress Bars */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {revenueByLocation.map((loc, index) => {
                const maxValue = Math.max(...revenueByLocation.map(l => l.value));
                const percentage = (loc.value / maxValue) * 100;
                const colors = ['#6366f1', '#10b981', '#f59e0b', '#14b8a6'];

                return (
                  <Box key={loc.city}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.3 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: '0.8rem',
                          color: darkMode ? '#f9fafb' : '#374151',
                          fontWeight: '500'
                        }}
                      >
                        {loc.city}
                      </Typography>
                      <Typography
                        variant="body2"
                        fontWeight="bold"
                        sx={{
                          fontSize: '0.8rem',
                          color: darkMode ? '#f9fafb' : '#374151'
                        }}
                      >
                        {loc.shortValue}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        width: '100%',
                        height: 3,
                        bgcolor: darkMode ? '#374151' : '#e5e7eb',
                        borderRadius: 2,
                        overflow: 'hidden',
                        position: 'relative'
                      }}
                    >
                      <Box
                        sx={{
                          width: `${percentage}%`,
                          height: '100%',
                          bgcolor: colors[index % colors.length],
                          borderRadius: 2,
                          transition: 'width 0.8s ease-in-out',
                          boxShadow: `0 0 8px ${colors[index % colors.length]}40`
                        }}
                      />
                    </Box>
                  </Box>
                );
              })}
            </Box>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>

      {/* Third Row - Products Table and Sales */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={8}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <Paper
              sx={{
                p: 0,
                borderRadius: 3,
                height: 400,
                display: 'flex',
                flexDirection: 'column',
                background: darkMode
                  ? 'rgba(30, 41, 59, 0.9)'
                  : 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: darkMode
                  ? '1px solid rgba(129, 140, 248, 0.2)'
                  : '1px solid rgba(99, 102, 241, 0.1)',
                boxShadow: darkMode
                  ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                  : '0 8px 32px rgba(0, 0, 0, 0.1)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100px',
                  height: '100px',
                  background: `radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%)`,
                  borderRadius: '50%',
                }
              }}
            >
              <Box sx={{ p: 3, pb: 2 }}>
                <Typography
                  variant="h6"
                  fontWeight="600"
                  sx={{
                    color: darkMode ? '#f1f5f9' : '#1e293b',
                    fontSize: '1.125rem'
                  }}
                >
                  Top Selling Products
                </Typography>
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
                    }}>Product</TableCell>
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
                    }}>Revenue</TableCell>
                    <TableCell sx={{
                      fontWeight: 'bold',
                      backgroundColor: darkMode ? '#111827' : '#f8fafc',
                      fontSize: '0.875rem',
                      py: 1.5,
                      borderBottom: darkMode ? '1px solid #374151' : '1px solid #e5e7eb',
                      color: darkMode ? '#f9fafb' : '#374151'
                    }}>Performance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topProducts.map((product, index) => {
                    const maxRevenue = Math.max(...topProducts.map(p => p.amount));
                    const performancePercentage = (product.amount / maxRevenue) * 100;
                    const performanceColors = ['#10b981', '#f59e0b', '#ef4444', '#6366f1', '#14b8a6'];

                    return (
                      <TableRow
                        key={product.name}
                        sx={{
                          backgroundColor: index % 2 === 0 ? (darkMode ? '#1f2937' : '#ffffff') : (darkMode ? '#111827' : '#f9fafb'),
                          '&:hover': {
                            backgroundColor: darkMode ? '#374151' : '#f3f4f6',
                            transform: 'scale(1.01)',
                            transition: 'all 0.2s ease-in-out'
                          }
                        }}
                      >
                        <TableCell sx={{ fontSize: '0.875rem', py: 1.5, color: darkMode ? '#f9fafb' : '#374151' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box
                              sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: performanceColors[index % performanceColors.length],
                                opacity: 0.8
                              }}
                            />
                            <Typography variant="body2" sx={{ fontWeight: '500' }}>
                              {product.name}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.875rem', py: 1.5, color: darkMode ? '#f9fafb' : '#374151' }}>
                          <Typography variant="body2" sx={{ fontWeight: '600', color: darkMode ? '#10b981' : '#059669' }}>
                            ${product.price.toFixed(2)}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.875rem', py: 1.5, color: darkMode ? '#f9fafb' : '#374151' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2">{product.quantity}</Typography>
                            <Typography variant="caption" sx={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>
                              units
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.875rem', py: 1.5, color: darkMode ? '#f9fafb' : '#374151' }}>
                          <Typography variant="body2" sx={{ fontWeight: '600' }}>
                            ${product.amount.toFixed(2)}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ fontSize: '0.875rem', py: 1.5 }}>
                          <Box
                            sx={{
                              width: '100%',
                              height: 4,
                              bgcolor: darkMode ? '#374151' : '#e5e7eb',
                              borderRadius: 2,
                              overflow: 'hidden'
                            }}
                          >
                            <Box
                              sx={{
                                width: `${performancePercentage}%`,
                                height: '100%',
                                bgcolor: performanceColors[index % performanceColors.length],
                                borderRadius: 2,
                                transition: 'width 0.8s ease-in-out',
                                boxShadow: `0 0 8px ${performanceColors[index % performanceColors.length]}40`
                              }}
                            />
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            </Paper>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={4}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                textAlign: 'center',
                height: 400,
                background: darkMode
                  ? 'rgba(30, 41, 59, 0.9)'
                  : 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                border: darkMode
                  ? '1px solid rgba(129, 140, 248, 0.2)'
                  : '1px solid rgba(99, 102, 241, 0.1)',
                boxShadow: darkMode
                  ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                  : '0 8px 32px rgba(0, 0, 0, 0.1)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '90px',
                  height: '90px',
                  background: `radial-gradient(circle, rgba(20, 184, 166, 0.1) 0%, transparent 70%)`,
                  borderRadius: '50%',
                }
              }}
            >
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="h6"
                  fontWeight="600"
                  sx={{
                    color: darkMode ? '#f1f5f9' : '#1e293b',
                    mb: 1,
                    fontSize: '1.125rem'
                  }}
                >
                  Total Sales
                </Typography>

              </Box>

              {/* Center Content */}
              <Box sx={{ position: 'relative', height: 80, mb: 0.5 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={totalSalesData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={15}
                      outerRadius={40}
                      startAngle={90}
                      endAngle={450}
                      paddingAngle={3}
                      cornerRadius={6}
                      labelLine={false}
                    >
                      {totalSalesData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          stroke={darkMode ? '#1e293b' : '#ffffff'}
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomPieTooltip darkMode={darkMode} />} />
                  </PieChart>
                </ResponsiveContainer>
              </Box>

              {/* Enhanced Legend */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.2, paddingBottom: 1 }}>
                {/* Total Revenue Header */}
                <Box sx={{ textAlign: 'center', mb: 0.3 }}>
                  <Typography
                    variant="body2"
                    fontWeight="600"
                    sx={{
                      color: darkMode ? '#f1f5f9' : '#1e293b',
                      fontSize: '0.8rem',
                      lineHeight: 1.2
                    }}
                  >
                    Total: ${totalSalesData.reduce((sum, entry) => sum + entry.value, 0).toFixed(2)}
                  </Typography>
                </Box>

                {/* Legend Items */}
                {totalSalesData.map((entry, index) => {
                  const percentage = ((entry.value / totalSalesData.reduce((sum, e) => sum + e.value, 0)) * 100);
                  return (
                    <Box key={entry.name} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box
                          sx={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            bgcolor: entry.color,
                            boxShadow: `0 0 6px ${entry.color}40`
                          }}
                        />
                        <Typography
                          variant="body2"
                          sx={{
                            color: darkMode ? '#f9fafb' : '#374151',
                            fontSize: '0.75rem',
                            fontWeight: '500'
                          }}
                        >
                          {entry.name}
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: darkMode ? '#f9fafb' : '#374151',
                            fontSize: '0.75rem',
                            fontWeight: '600'
                          }}
                        >
                          ${entry.value.toFixed(2)}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: darkMode ? '#94a3b8' : '#64748b',
                            fontSize: '0.65rem'
                          }}
                        >
                          {percentage.toFixed(1)}%
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
      </Box>
    </Box>
  );
}
