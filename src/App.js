import React from 'react';
import {Container, Box, Paper, Typography} from '@mui/material'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function App() {

  //* Hardcoded data for now, will be usings api in the future, after backend implementation
  const data = [
    { date: 'Jan 1', bitcoin: 45000, ethereum: 3200 },
    { date: 'Jan 2', bitcoin: 45500, ethereum: 3250 },
    { date: 'Jan 3', bitcoin: 45200, ethereum: 3180 },
    { date: 'Jan 4', bitcoin: 44800, ethereum: 3150 },
    { date: 'Jan 5', bitcoin: 46000, ethereum: 3300 },
    { date: 'Jan 6', bitcoin: 45800, ethereum: 3280 },
    { date: 'Jan 7', bitcoin: 46200, ethereum: 3320 },
  ];

  return (
    <Box sx = {
      {
        backgroundColor: 'gray',
        height: '100vh',
        py:4
      }
    }>

    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align= "center" sx = {{color: "white"}}>
          Real Time Crypto Stocks 
        </Typography>
        <Paper elevation={3} sx={{ backgroundColor:"black", p: 2 }}>
          <Typography variant="h6" gutterBottom align = "center" sx = {{color: "white"}}>
            Bitcoin and Ethereum Price Trends
          </Typography>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="bitcoin" stroke="#8884d8" name="Bitcoin" />
              <Line type="monotone" dataKey="ethereum" stroke="#82ca9d" name="Ethereum" />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Box>
    </Container>

    </Box>
  );


}

export default App;
