//! TEST 5

import React from 'react';
import {useState, useEffect } from 'react';
import {Container, Box, Paper, Typography, Chip, Grid, Card, CardContent, TextField, Button, Slider} from '@mui/material'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function App() {
  // const allAssets = [
  //   { id: 'bitcoin', name: 'Bitcoin', color: '#ff7300' },
  //   { id: 'ethereum', name: 'Ethereum', color: '#82ca9d' },
  //   { id: 'AAPL', name: 'Apple', color: '#1a73e8'},
  //   { id: 'VOO', name: 'Vanguard S&P 500 (VOO)', color: '#8884d8' },
  //   { id: 'NFLX', name: 'Netflix', color: '#e50914' },
    
  // ];

  const [allAssets, setAllAssets] = useState([
    { id: 'bitcoin', name: 'Bitcoin', color: '#ff7300' },
    { id: 'ethereum', name: 'Ethereum', color: '#82ca9d' },
    { id: 'AAPL', name: 'Apple', color: '#1a73e8'},
    { id: 'VOO', name: 'Vanguard S&P 500 (VOO)', color: '#8884d8' },
    { id: 'NFLX', name: 'Netflix', color: '#e50914' },
  ]);
  

  const [selectedAssets, setSelectedAssets] = useState(['bitcoin', 'ethereum']);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [latestPrices, setLatestPrices] = useState({});
  const [newSymbol, setNewSymbol] = useState("");


  const [emailEnabled, setEmailEnabled] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailSuccess, setEmailSuccess] = useState('');


  const [alertEnabled, setAlertEnabled] = useState(false);
  const [alertThreshold, setAlertThreshold] = useState(5); 
  const [lastAlertedPrices, setLastAlertedPrices] = useState({});
  const [alertCooldown, setAlertCooldown] = useState({});




  // const checkPriceAlerts = (newPrices) => {
  //   if (!alertEnabled || !emailAddress) return false;
    
  //   const currentTime = Date.now();
  //   const COOLDOWN_PERIOD = 300000; // 5 minutes in milliseconds
    
  //   let shouldSendAlert = false;
  //   const alerts = [];
    
  //   selectedAssets.forEach(assetId => {
  //     const asset = allAssets.find(a => a.id === assetId);
  //     const newPriceData = newPrices[assetId];
  //     const lastAlertedPrice = lastAlertedPrices[assetId];
      
  //     if (!asset || !newPriceData) return;
      
  //     // Check if we have a previous price to compare
  //     if (lastAlertedPrice && latestPrices[assetId]) {
  //       const priceChange = Math.abs(
  //         ((newPriceData.usd - latestPrices[assetId].usd) / latestPrices[assetId].usd) * 100
  //       );
        
  //       const lastAlertTime = alertCooldown[assetId] || 0;
  //       const timeSinceLastAlert = currentTime - lastAlertTime;
        
  //       if (priceChange >= alertThreshold && timeSinceLastAlert > COOLDOWN_PERIOD) {
  //         shouldSendAlert = true;
  //         alerts.push({
  //           asset: asset.name,
  //           oldPrice: latestPrices[assetId].usd,
  //           newPrice: newPriceData.usd,
  //           change: ((newPriceData.usd - latestPrices[assetId].usd) / latestPrices[assetId].usd) * 100,
  //           direction: newPriceData.usd > latestPrices[assetId].usd ? 'up' : 'down'
  //         });
          
  //         // Update cooldown for this asset
  //         setAlertCooldown(prev => ({
  //           ...prev,
  //           [assetId]: currentTime
  //         }));
  //       }
  //     }
  //   });
    
  //   if (shouldSendAlert && alerts.length > 0) {
  //     sendAlertEmail(alerts, newPrices);
  //   }
    
  //   // Update last alerted prices for future comparisons
  //   const updatedLastAlertedPrices = { ...lastAlertedPrices };
  //   selectedAssets.forEach(assetId => {
  //     if (newPrices[assetId]) {
  //       updatedLastAlertedPrices[assetId] = newPrices[assetId].usd;
  //     }
  //   });
  //   setLastAlertedPrices(updatedLastAlertedPrices);
    
  //   return shouldSendAlert;
  // };


  const checkPriceAlerts = (newPrices) => {
  if (!alertEnabled || !emailAddress || !emailEnabled) {
    console.log('Alerts disabled or no email address');
    return false;
  }
  
  const currentTime = Date.now();
  const COOLDOWN_PERIOD = 300000; // 5 minutes in milliseconds
  
  let shouldSendAlert = false;
  const alerts = [];
  
  selectedAssets.forEach(assetId => {
    const asset = allAssets.find(a => a.id === assetId);
    const newPriceData = newPrices[assetId];
    
    if (!asset || !newPriceData || !latestPrices[assetId]) return;
    
    // Calculate percentage change
    const priceChange = Math.abs(
      ((newPriceData.usd - latestPrices[assetId].usd) / latestPrices[assetId].usd) * 100
    );
    
    // Check cooldown
    const lastAlertTime = alertCooldown[assetId] || 0;
    const timeSinceLastAlert = currentTime - lastAlertTime;
    
    // Check if threshold is met and cooldown has passed
    if (priceChange >= alertThreshold && timeSinceLastAlert > COOLDOWN_PERIOD) {
      shouldSendAlert = true;
      alerts.push({
        asset: asset.name,
        oldPrice: latestPrices[assetId].usd,
        newPrice: newPriceData.usd,
        change: ((newPriceData.usd - latestPrices[assetId].usd) / latestPrices[assetId].usd) * 100,
        direction: newPriceData.usd > latestPrices[assetId].usd ? 'up' : 'down'
      });
      
      // Update cooldown for this asset
      setAlertCooldown(prev => ({
        ...prev,
        [assetId]: currentTime
      }));
      
      console.log(`⚠️ Alert triggered for ${asset.name}: ${priceChange.toFixed(2)}% change`);
    }
  });
  
  // Send alert email if we have any alerts
  if (shouldSendAlert && alerts.length > 0) {
    console.log(`📧 Sending alert email for ${alerts.length} assets`);
    sendAlertEmail(alerts, newPrices);
  }
  
  // Update last alerted prices for future comparisons
  const updatedLastAlertedPrices = { ...lastAlertedPrices };
  selectedAssets.forEach(assetId => {
    if (newPrices[assetId]) {
      updatedLastAlertedPrices[assetId] = newPrices[assetId].usd;
    }
  });
  setLastAlertedPrices(updatedLastAlertedPrices);
  
  return shouldSendAlert;
};

  const sendEmailNotification = async (data) => {
    if (!emailEnabled || !emailAddress) return;
    
    try {
      const subject = `Asset Update - ${new Date().toLocaleString()}`;
      
      let text = "Asset Price Update:\n\n";
      selectedAssets.forEach(assetId => {
        const asset = allAssets.find(a => a.id === assetId);
        const priceData = data[assetId];
        if (asset && priceData) {
          text += `${asset.name}: $${priceData.usd.toFixed(2)} `;
          if (priceData.usd_24h_change) {
            text += `(${priceData.usd_24h_change >= 0 ? '+' : ''}${priceData.usd_24h_change.toFixed(2)}%)\n`;
          }
        }
      });
      text += `\nLast updated: ${new Date().toLocaleString()}`;
      
      const response = await fetch('http://localhost:3001/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: emailAddress,
          subject: subject,
          text: text
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setEmailSuccess('Email sent successfully!');
        setTimeout(() => setEmailSuccess(''), 3000);
      } else {
        setEmailError('Failed to send email');
      }
    } catch (err) {
      console.error('Error sending email:', err);
      setEmailError('Error sending email notification');
    }
  };



  // const sendAlertEmail = async (alerts, currentPrices) => {
  //   try {
  //     const subject = `Price Alert - ${alerts.length} asset${alerts.length > 1 ? 's' : ''} exceeded ${alertThreshold}% threshold`;
      
  //     let text = "PRICE ALERT!\n\n";
  //     text += `One or more assets have changed by ${alertThreshold}% or more:\n\n`;
      
  //     alerts.forEach(alert => {
  //       text += `${alert.asset}:\n`;
  //       text += `  Previous: $${alert.oldPrice.toFixed(2)}\n`;
  //       text += `  Current: $${alert.newPrice.toFixed(2)}\n`;
  //       text += `  Change: ${alert.change >= 0 ? '+' : ''}${alert.change.toFixed(2)}%\n`;
  //       text += `  Direction: ${alert.direction.toUpperCase()}\n\n`;
  //     });
      
  //     text += "\nCurrent Prices:\n";
  //     selectedAssets.forEach(assetId => {
  //       const asset = allAssets.find(a => a.id === assetId);
  //       const priceData = currentPrices[assetId];
  //       if (asset && priceData) {
  //         text += `${asset.name}: $${priceData.usd.toFixed(2)}\n`;
  //       }
  //     });
      
  //     text += `\nTime: ${new Date().toLocaleString()}\n`;
  //     text += "Alert Threshold: " + alertThreshold + "%\n";
      
  //     const response = await fetch('http://localhost:3001/api/send-email', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         to: emailAddress,
  //         subject: subject,
  //         text: text
  //       })
  //     });
      
  //     const result = await response.json();
      
  //     if (result.success) {
  //       console.log('Alert email sent successfully!');
  //     } else {
  //       console.error('Failed to send alert email');
  //     }
  //   } catch (err) {
  //     console.error('Error sending alert email:', err);
  //   }
  // };



  const sendAlertEmail = async (alerts, currentPrices) => {
  if (!emailAddress) return; // Ensure email address is set
  
  try {
    const subject = `🚨 Price Alert - ${alerts.length} asset${alerts.length > 1 ? 's' : ''} changed by ${alertThreshold}%+`;
    
    let text = "🚨 PRICE ALERT NOTIFICATION 🚨\n\n";
    text += `One or more assets have changed by ${alertThreshold}% or more:\n\n`;
    text += "=".repeat(50) + "\n\n";
    
    alerts.forEach((alert, index) => {
      text += `ALERT ${index + 1}: ${alert.asset}\n`;
      text += `• Previous Price: $${alert.oldPrice.toFixed(2)}\n`;
      text += `• Current Price: $${alert.newPrice.toFixed(2)}\n`;
      text += `• Change: ${alert.change >= 0 ? '+' : ''}${alert.change.toFixed(2)}%\n`;
      text += `• Direction: ${alert.direction === 'up' ? '📈 INCREASE' : '📉 DECREASE'}\n`;
      text += `• Alert Threshold: ${alertThreshold}%\n`;
      text += "\n" + "─".repeat(40) + "\n\n";
    });
    
    text += "CURRENT PORTFOLIO STATUS:\n";
    text += "=".repeat(50) + "\n";
    selectedAssets.forEach(assetId => {
      const asset = allAssets.find(a => a.id === assetId);
      const priceData = currentPrices[assetId];
      if (asset && priceData) {
        const change = priceData.usd_24h_change || 0;
        text += `${asset.name}: $${priceData.usd.toFixed(2)} `;
        text += `(${change >= 0 ? '+' : ''}${change.toFixed(2)}%)\n`;
      }
    });
    
    text += `\n⏰ Alert Time: ${new Date().toLocaleString()}\n`;
    text += `📊 Total Assets Monitored: ${selectedAssets.length}\n`;
    text += `⚠️ Alert Threshold: ${alertThreshold}%\n`;
    text += `⏳ Next Alert (Cooldown): 5 minutes per asset\n\n`;
    text += "This is an automated alert from your Asset Tracker.\n";
    text += "You can adjust your alert settings in the application.";
    
    // Send email via your backend
    const response = await fetch('http://localhost:3001/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: emailAddress,
        subject: subject,
        text: text,
        isAlert: true // Optional flag to distinguish alert emails
      })
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Alert email sent successfully!');
      // Show a temporary success message in UI
      setEmailSuccess(`Alert sent for ${alerts.length} asset${alerts.length > 1 ? 's' : ''}`);
      setTimeout(() => setEmailSuccess(''), 3000);
    } else {
      console.error('❌ Failed to send alert email');
      setEmailError('Failed to send alert email');
      setTimeout(() => setEmailError(''), 3000);
    }
  } catch (err) {
    console.error('Error sending alert email:', err);
    setEmailError('Error sending alert notification');
    setTimeout(() => setEmailError(''), 3000);
  }
};
  

  const fetchStockData = async (stockids) => {
    try {
      const apiKey = process.env.STOCK_API_KEY;
      let stocksData ={};

      for (const stockid of stockids) {
        const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockid}&apikey=${apiKey}`;
        const response = await fetch(url);
        const result = await response.json(); //json response from the api
    
    
        //parse the result and get the stocks price
        const adaptedStock = adaptStockData(result, stockid);
        if (adaptedStock) {
          stocksData = { ...stocksData, ...adaptedStock };
        }
      }
      
      let newPrices;

      //in case crypto doesnt update fast
      if (Object.keys(latestPrices).length === 0) {
        newPrices = stocksData;
        setLatestPrices(stocksData);
      } else {
        newPrices = { ...latestPrices, ...stocksData };
        setLatestPrices(newPrices);
      }
  
      setData(transformApiData(newPrices));
      setLastUpdate(new Date());
  
      return stocksData;
    }
    catch (err) {
      console.error("Stock fetch failed: ",err);
      return null;
    }
  };


  const fetchCryptoData = async () => {
    if (selectedAssets.length === 0) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const ids = selectedAssets.join(',');
      const response = await fetch(`http://localhost:3001/api/crypto/prices/real?ids=${ids}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        const transformedData = transformApiData(result.data);
        setData(transformedData);
        setLatestPrices(result.data); 
        setLastUpdate(new Date());
      } else {
        throw new Error(result.message || 'Failed to fetch data');
      }
    } catch (err) {
      console.error('Error fetching crypto data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllData = async () => {
    if (selectedAssets.length === 0) return;
  
    setLoading(true);
    setError(null);
  
    try {
      // Fetch cryptos — updates chart + latestPrices itself
      await fetchCryptoData();
  
      // Determine which are stocks
      const stockIds = selectedAssets.filter(id => !['bitcoin', 'ethereum'].includes(id));
  
      // Fetch stocks — updates chart + latestPrices itself
      if (stockIds.length > 0) {
        await fetchStockData(stockIds);
      }
  
      // Global UI timestamp
      setLastUpdate(new Date());



      if (alertEnabled && Object.keys(latestPrices).length > 0) {
        checkPriceAlerts(latestPrices);
      }

      if(emailEnabled && emailAddress) {
        sendEmailNotification(latestPrices);
      }
      
  
    } catch (err) {
      setError(err.message || "Failed to update asset data.");
      console.error("fetchAllData error:", err);
    } finally {
      setLoading(false);
    }
  };
  



  const adaptStockData = (stockResponse, stockId) => {
      const quote = stockResponse["Global Quote"];
      if (!quote) return null;

      const price = parseFloat(quote["05. price"]);
      const percentChange = parseFloat(
        quote["10. change percent"].replace("%", "")
      );
      return {
        [stockId]: {
          usd: price,
          usd_24h_change: percentChange
        }
      };
    };

    const addNewStock = async (symbol) => {
      if (!symbol) return;
      if (allAssets.find(a => a.id === symbol)) {
        alert("This symbol is already added!");
        return;
      }
    
      const apiKey = process.env.REACT_APP_STOCK_API_KEY;
      const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
    
      try {
        const response = await fetch(url);
        const result = await response.json();
    
        if (!result["Global Quote"]) {
          alert("Invalid stock symbol or no data available");
          return;
        }
    
        const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    
        const newAsset = {
          id: symbol,
          name: symbol.toUpperCase(),
          color: randomColor
        };
    
        setAllAssets(prev => [...prev, newAsset]);
        setSelectedAssets(prev => [...prev, symbol]);
    
        const adaptedData = adaptStockData(result, symbol);
        setLatestPrices(prev => ({
          ...prev,
          ...adaptedData
        }));
    
        setNewSymbol("");
      } catch (error) {
        console.error("Error adding stock:", error);
      }
    };
    

  const transformApiData = (apiData) => {
    const currentPrices = {};
    const priceChanges = {};
    
    selectedAssets.forEach(assetId => {
      if (apiData[assetId]) {
        currentPrices[assetId] = apiData[assetId].usd;
        priceChanges[assetId] = apiData[assetId].usd_24h_change;
      }
    });

    return generateTimeSeries(currentPrices, priceChanges);
  };

  const generateTimeSeries = (currentPrices, priceChanges) => {
    const timeSeries = [];
    const totalPoints = 30;
    
    for (let i = totalPoints; i >= 0; i--) {
      const date = new Date();
      date.setSeconds(date.getSeconds() - (i * 30));
      
      const dataPoint = {
        timestamp: date.getTime(),
        time: date.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          second: '2-digit',
          hour12: true 
        }),
        displayTime: i === 0 ? 'Now' : date.toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        })
      };
      
      selectedAssets.forEach(assetId => {
        if (currentPrices[assetId]) {
          const baseVariation = (priceChanges[assetId] || 0) / 100 / 2880;
          const randomVariation = (Math.random() - 0.5) * 0.001;
          const timeFactor = (i / totalPoints) * 0.005;
          
          dataPoint[assetId] = currentPrices[assetId] * (1 - timeFactor + baseVariation + randomVariation);
        }
      });
      
      timeSeries.push(dataPoint);
    }
    
    return timeSeries;
  };

  useEffect(() => {
    fetchAllData();
    
    const interval = setInterval(fetchAllData, 30000);
    
    return () => clearInterval(interval);
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

  const formatPrice = (price) => {
    if (price >= 1000) {
      return `$${price.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
    }
    return `$${price.toFixed(2)}`;
  };

  const getPriceChangeColor = (change) => {
    if (!change) return '#ccc';
    return change >= 0 ? '#4caf50' : '#f44336';
  };

  const getPriceChangeIcon = (change) => {
    if (!change) return '→';
    return change >= 0 ? '↗' : '↘';
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
            {lastUpdate && (
              <Typography variant="caption" sx={{ color: "#aaa", display: 'block', mt: 1 }}>
                Last updated: {formatTime(lastUpdate)}
                {loading && ' (Updating...)'}
              </Typography>
            )}
          </Paper>
          <Paper elevation={2} sx={{ backgroundColor: "#1a1a1a", p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Enter stock symbol (e.g., TSLA)"
              sx={{ backgroundColor: "#fff", borderRadius: 1 }}
              value={newSymbol.toUpperCase()}
              onChange={(e) => setNewSymbol(e.target.value.toUpperCase())}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => addNewStock(newSymbol)}
            >
              Add
            </Button>
          </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', mb: 2 }}>
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
            
            {loading && (
              <Typography variant="body2" sx={{ color: 'white', textAlign: 'center' }}>
                Updating data... (Every 30 seconds)
              </Typography>
            )}
            
            {error && (
              <Typography variant="body2" sx={{ color: '#ff4444', textAlign: 'center' }}>
                Error: {error}
              </Typography>
            )}
          </Paper>

        {Object.keys(latestPrices).length > 0 && (
            <Paper elevation={3} sx={{ backgroundColor: "#1a1a1a", p: 3, mb: 3 }}>
            <Paper elevation={2} sx={{ backgroundColor: "#1a1a1a", p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ color: "white", mb: 2 }}>
              Email Notifications
            </Typography>
            
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body1" sx={{ color: 'white', mr: 2 }}>
                    Enable Email Updates:
                  </Typography>
                  <Box
                    onClick={() => setEmailEnabled(!emailEnabled)}
                    sx={{
                      width: 60,
                      height: 30,
                      backgroundColor: emailEnabled ? '#4caf50' : '#666',
                      borderRadius: 15,
                      cursor: 'pointer',
                      position: 'relative',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 3,
                        left: emailEnabled ? 33 : 3,
                        width: 24,
                        height: 24,
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder="Enter your email address"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: 1,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: emailEnabled ? '#4caf50' : '#666',
                      },
                    }
                  }}
                  disabled={!emailEnabled}
                />
              </Grid>
              
              <Grid item xs={12} sm={2}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => sendEmailNotification(latestPrices)}
                  disabled={!emailEnabled || !emailAddress}
                  sx={{ height: '40px' }}
                >
                  Test Email
                </Button>
              </Grid>
            </Grid>
            
            {emailError && (
              <Typography variant="body2" sx={{ color: '#ff4444', mt: 2 }}>
                {emailError}
              </Typography>
            )}
            
            {emailSuccess && (
              <Typography variant="body2" sx={{ color: '#4caf50', mt: 2 }}>
                {emailSuccess}
              </Typography>
            )}
            
            <Typography variant="caption" sx={{ color: '#aaa', display: 'block', mt: 2 }}>
              {emailEnabled 
                ? 'Email notifications will be sent every 30 seconds with updates.' 
                : 'Toggle on to receive email updates every 30 seconds.'}
            </Typography>
          </Paper>
          <Paper elevation={2} sx={{ backgroundColor: "#1a1a1a", p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ color: "white", mb: 2 }}>
              Price Alert Settings
            </Typography>
            
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body1" sx={{ color: 'white', mr: 2 }}>
                    Enable Price Alerts:
                  </Typography>
                  <Box
                    onClick={() => setAlertEnabled(!alertEnabled)}
                    sx={{
                      width: 60,
                      height: 30,
                      backgroundColor: alertEnabled ? '#ff9800' : '#666',
                      borderRadius: 15,
                      cursor: 'pointer',
                      position: 'relative',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 3,
                        left: alertEnabled ? 33 : 3,
                        width: 24,
                        height: 24,
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Box sx={{ pl: 2 }}>
                  <Typography variant="body2" sx={{ color: 'white', mb: 1 }}>
                    Alert Threshold: {alertThreshold}%
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="caption" sx={{ color: '#aaa' }}>
                      1%
                    </Typography>
                    <Slider
                      value={alertThreshold}
                      onChange={(e, newValue) => setAlertThreshold(newValue)}
                      min={1}
                      max={20}
                      step={0.5}
                      disabled={!alertEnabled}
                      sx={{
                        color: alertEnabled ? '#ff9800' : '#666',
                        '& .MuiSlider-thumb': {
                          backgroundColor: alertEnabled ? '#ff9800' : '#666',
                        },
                        '& .MuiSlider-track': {
                          backgroundColor: alertEnabled ? '#ff9800' : '#666',
                        }
                      }}
                    />
                    <Typography variant="caption" sx={{ color: '#aaa' }}>
                      20%
                    </Typography>
                  </Box>
                  <Typography variant="caption" sx={{ color: '#aaa', display: 'block', mt: 1 }}>
                    {alertEnabled 
                      ? `Email alerts will be sent when any asset changes by ${alertThreshold}% or more (5-minute cooldown)` 
                      : 'Toggle on to enable price change alerts'}
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={2}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    // Force check for alerts with simulated price changes
                    if (Object.keys(latestPrices).length > 0 && alertEnabled && emailAddress) {
                      // Create test alerts by simulating price changes
                      const testAlerts = [];
                      const testPrices = { ...latestPrices };
                      
                      // Modify first asset for testing
                      const testAssetId = selectedAssets[0];
                      if (testAssetId && latestPrices[testAssetId]) {
                        const testAsset = allAssets.find(a => a.id === testAssetId);
                        const currentPrice = latestPrices[testAssetId].usd;
                        const testPrice = currentPrice * (1 + (alertThreshold / 100) + 0.01); // Exceed threshold
                        
                        testAlerts.push({
                          asset: testAsset?.name || testAssetId,
                          oldPrice: currentPrice,
                          newPrice: testPrice,
                          change: alertThreshold + 1,
                          direction: 'up'
                        });
                        
                        console.log(`🧪 Test alert: ${testAsset?.name} changed by ${alertThreshold + 1}%`);
                        
                        // Send test alert
                        sendAlertEmail(testAlerts, latestPrices);
                      } else {
                        setEmailError('No assets available for testing');
                        setTimeout(() => setEmailError(''), 3000);
                      }
                    }
                  }}
                  disabled={!alertEnabled || !emailAddress || selectedAssets.length === 0}
                  sx={{ 
                    height: '40px',
                    backgroundColor: '#ff9800',
                    '&:hover': {
                      backgroundColor: '#f57c00',
                    }
                  }}
                >
                  Test Alert
                </Button>
              </Grid>
            </Grid>
            
          {alertEnabled && (
            <Box sx={{ mt: 2, p: 2, backgroundColor: '#2a2a2a', borderRadius: 1 }}>
              <Typography variant="body2" sx={{ color: '#ff9800', mb: 1 }}>
                ⚠️ Monitoring {selectedAssets.length} asset{selectedAssets.length !== 1 ? 's' : ''}:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {selectedAssets.map(assetId => {
                  const asset = allAssets.find(a => a.id === assetId);
                  const lastAlertTime = alertCooldown[assetId];
                  const isOnCooldown = lastAlertTime && (Date.now() - lastAlertTime < 300000);
                  
                  return asset ? (
                    <Box key={assetId} sx={{ display: 'flex', alignItems: 'center' }}>
                      <Chip
                        label={asset.name}
                        size="small"
                        sx={{
                          backgroundColor: isOnCooldown ? '#333' : '#444',
                          color: isOnCooldown ? '#888' : 'white',
                          fontSize: '0.75rem'
                        }}
                      />
                      {isOnCooldown && (
                        <Typography variant="caption" sx={{ color: '#888', ml: 1 }}>
                          (⏳)
                        </Typography>
                      )}
                    </Box>
                  ) : null;
                })}
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" sx={{ color: '#aaa', display: 'block' }}>
                  📧 Alerts will be sent to: {emailAddress || 'No email set'}
                </Typography>
                <Typography variant="caption" sx={{ color: '#aaa', display: 'block', mt: 0.5 }}>
                  ⚡ Current threshold: {alertThreshold}% price change
                </Typography>
                {Object.keys(alertCooldown).filter(id => alertCooldown[id] && (Date.now() - alertCooldown[id] < 300000)).length > 0 && (
                  <Typography variant="caption" sx={{ color: '#ff9800', display: 'block', mt: 1 }}>
                    ⏳ Some assets are on cooldown (5 minutes between alerts)
                  </Typography>
                )}
              </Box>
            </Box>
          )}
          </Paper>
              <Typography variant="h6" gutterBottom align="center" sx={{ color: "white", mb: 3 }}>
                Current Prices
              </Typography>
              <Grid container spacing={3} justifyContent="center">
                {allAssets.map(asset => {
                  const priceData = latestPrices[asset.id];
                  
                  if (!priceData) return null;
                  
                  return (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={asset.id}>
                      <Card sx={{ 
                        backgroundColor: '#2a2a2a', 
                        border: `2px solid ${asset.color}20`,
                        borderRadius: 2,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: `0 8px 25px ${asset.color}40`,
                          border: `2px solid ${asset.color}60`,
                        }
                      }}>
                        <CardContent sx={{ textAlign: 'center', p: 3 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                            <Box 
                              sx={{ 
                                width: 12, 
                                height: 12, 
                                borderRadius: '50%', 
                                backgroundColor: asset.color,
                                mr: 1 
                              }} 
                            />
                            <Typography 
                              variant="h6" 
                              sx={{ 
                                color: 'white',
                                fontWeight: 600
                              }}
                            >
                              {asset.name}
                            </Typography>
                          </Box>
                          
                          <Typography 
                            variant="h4" 
                            sx={{ 
                              color: asset.color,
                              fontWeight: 700,
                              fontSize: { xs: '1.75rem', sm: '2rem' },
                              mb: 1,
                              textShadow: `0 0 20px ${asset.color}40`
                            }}
                          >
                            {formatPrice(priceData.usd)}
                          </Typography>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography 
                              variant="body1" 
                              sx={{ 
                                color: getPriceChangeColor(priceData.usd_24h_change),
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '0.9rem'
                              }}
                            >
                              <span style={{ marginRight: 4, fontSize: '1.1rem' }}>
                                {getPriceChangeIcon(priceData.usd_24h_change)}
                              </span>
                              {priceData.usd_24h_change ? 
                                `${Math.abs(priceData.usd_24h_change).toFixed(2)}%` : 
                                '0.00%'
                              }
                              <span style={{ marginLeft: 8, color: '#ccc', fontSize: '0.8rem' }}>
                                (24h)
                              </span>
                            </Typography>
                          </Box>
                          
                          {priceData.usd_24h_change && (
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                color: '#aaa',
                                display: 'block',
                                mt: 1
                              }}
                            >
                              {priceData.usd_24h_change >= 0 ? 'Gaining' : 'Declining'} today
                            </Typography>
                          )}
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </Paper>
          )}

          <Paper elevation={3} sx={{ backgroundColor: "black", p: 2 }}>
            <Typography variant="h6" gutterBottom align="center" sx={{ color: "white" }}>
              Real-time Price Trends
            </Typography>
            
            {data.length > 0 ? (
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis 
                    dataKey="displayTime" 
                    stroke="#ccc"
                    interval="preserveStartEnd"
                    minTickGap={30}
                  />
                  <YAxis 
                    stroke="#ccc"
                    tickFormatter={(value) => `$${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
                    domain={['auto', 'auto']}
                    allowDataOverflow={false}
                    tickCount={6}
                    type="number"
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#333', 
                      border: '1px solid #555',
                      borderRadius: '8px'
                    }} 
                    formatter={(value, name) => {
                      const asset = allAssets.find(a => a.id === name);
                      return [`$${Number(value).toFixed(2)}`, asset?.name || name];
                    }}
                    labelFormatter={(label) => `Time: ${label === 'Now' ? 'Current' : label}`}
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
                        dot={false}
                        activeDot={{ r: 4, stroke: asset.color, strokeWidth: 2 }}
                      />
                    );
                  })}
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <Box sx={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h6" sx={{ color: '#ccc' }}>
                  {loading ? 'Loading data...' : 'No data available'}
                </Typography>
              </Box>
            )}
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

export default App;