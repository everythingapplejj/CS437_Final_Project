import React from 'react';
import {useState, useEffect } from 'react';
import {Container, Box, Paper, Typography, Button, ButtonGroup, Chip} from '@mui/material'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function App() {


  //* For 
  const allAssets = [
    { id: 'bitcoin', name: 'Bitcoin', color: '#8884d8' },
    { id: 'ethereum', name: 'Ethereum', color: '#82ca9d' },
    { id: 'solana', name: 'Solana', color: '#ff7300' },
    { id: 'cardano', name: 'Cardano', color: '#003f5c' },
    { id: 'dogecoin', name: 'Dogecoin', color: '#ffa600' },
    { id: 'ripple', name: 'Ripple', color: '#0088fe' },
  ];

  const [selectedAssets, setSelectedAssets] = useState(['bitcoin', 'ethereum']);
  const [data, setData] = useState([]);

  //* Hardcoded data for all assets for now, will be using api for later
  const allAssetsData = [
    { date: 'Jan 1', bitcoin: 45000, ethereum: 3200, solana: 120, cardano: 0.5, dogecoin: 0.15, ripple: 0.8 },
    { date: 'Jan 2', bitcoin: 45500, ethereum: 3250, solana: 125, cardano: 0.52, dogecoin: 0.16, ripple: 0.82 },
    { date: 'Jan 3', bitcoin: 45200, ethereum: 3180, solana: 118, cardano: 0.48, dogecoin: 0.14, ripple: 0.78 },
    { date: 'Jan 4', bitcoin: 44800, ethereum: 3150, solana: 115, cardano: 0.47, dogecoin: 0.13, ripple: 0.75 },
    { date: 'Jan 5', bitcoin: 46000, ethereum: 3300, solana: 130, cardano: 0.55, dogecoin: 0.18, ripple: 0.85 },
    { date: 'Jan 6', bitcoin: 45800, ethereum: 3280, solana: 128, cardano: 0.53, dogecoin: 0.17, ripple: 0.83 },
    { date: 'Jan 7', bitcoin: 46200, ethereum: 3320, solana: 135, cardano: 0.58, dogecoin: 0.19, ripple: 0.88 },
  ];

  useEffect(() => {
    const filteredData = allAssetsData.map(item => {
      const filteredItem = { date: item.date };
      selectedAssets.forEach(asset => {
        filteredItem[asset] = item[asset];
      });
      return filteredItem;
    });
    setData(filteredData);
  }, [selectedAssets]);

  const toggleAsset = (assetId) => {
    setSelectedAssets(prev => {
      if (prev.includes(assetId)) {
        if (prev.length === 1) return prev;
        return prev.filter(id => id !== assetId);
      } else {
        return [...prev, assetId];
      }
    });
  };

  const selectAllAssets = () => {
    setSelectedAssets(allAssets.map(asset => asset.id));
  };

  const clearAllAssets = () => {
    setSelectedAssets(['bitcoin']);
  };

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); 
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
    <Box sx={{
      backgroundColor: 'gray',
      minHeight: '100vh',
      py: 4
    }}>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{
            color: "white",
            fontFamily: "'Inter', sans-serif", 
            fontWeight: 700, 
            letterSpacing: 1.5
          }}>
            Real Time Asset Tracker  
          </Typography>

          <Paper elevation={2} sx={{ backgroundColor: "#333", p: 2, mb: 3, textAlign: "center" }}>
            <Typography variant="h5" sx={{ color: "#fff", fontWeight: "bold" }}>
              {formatTime(currentTime)}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#ccc" }}>
              {formatDate(currentTime)}
            </Typography>
          </Paper>

          <Paper elevation={2} sx={{ backgroundColor: "#1a1a1a", p: 3, mb: 3 }}>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'Center' }}>
              {allAssets.map(asset => (
                <Chip
                  key={asset.id}
                  label={asset.name}
                  onClick={() => toggleAsset(asset.id)}
                  color={selectedAssets.includes(asset.id) ? "primary" : "default"}
                  variant={selectedAssets.includes(asset.id) ? "filled" : "outlined"}
                  sx={{
                    color: selectedAssets.includes(asset.id) ? 'white' : 'gray',
                    borderColor: asset.color,
                    backgroundColor: selectedAssets.includes(asset.id) ? asset.color : 'transparent',
                    '&:hover': {
                      backgroundColor: selectedAssets.includes(asset.id) ? asset.color : '#333',
                    }
                  }}
                />
              ))}
            </Box>
          </Paper>
          <Paper elevation={3} sx={{ backgroundColor: "black", p: 2 }}>
            <Typography variant="h6" gutterBottom align="center" sx={{ color: "white" }}>
              Cryptocurrency Price Trends
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="date" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#333', 
                    border: '1px solid #555',
                    borderRadius: '8px'
                  }} 
                />
                <Legend />
                {selectedAssets.map(assetId => {
                  const asset = allAssets.find(a => a.id === assetId);
                  return (
                    <Line 
                      key={assetId}
                      type="monotone" 
                      dataKey={assetId} 
                      stroke={asset.color} 
                      name={asset.name}
                      strokeWidth={2}
                      dot={{ fill: asset.color, strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: asset.color, strokeWidth: 2 }}
                    />
                  );
                })}
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

export default App;
