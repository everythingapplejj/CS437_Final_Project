import React from 'react';
import {useState, useEffect } from 'react'; //* This one allows to utilize states for the timer
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


  //* Constructin timer components and formatters
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());}, 1000); 
    return () => clearInterval(timer);
    }, []);
  

    const formatTime = (date) => {
      return date.toLocaleTimeString('en-US', {
        hour12: true, 
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    };

    const formatDate = (date) => {
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };


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
        {/* Adding the clock compoenent */}
      <Paper elevation={2} sx={{ backgroundColor: "#333", p: 2, mb: 3, textAlign: "center" }}>
          <Typography variant="h5" sx={{ color: "#fff", fontWeight: "bold" }}>
            {formatTime(currentTime)}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "#ccc" }}>
            {formatDate(currentTime)}
          </Typography>
      </Paper>


        {/* //* this is for the chart compoenent */}
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
