// import React from 'react';
// import {useState, useEffect } from 'react';
// import {Container, Box, Paper, Typography, Button, ButtonGroup, Chip} from '@mui/material'
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// function App() {


//   //* For 
//   const allAssets = [
//     { id: 'bitcoin', name: 'Bitcoin', color: '#8884d8' },
//     { id: 'ethereum', name: 'Ethereum', color: '#82ca9d' },
//     { id: 'voo', name: 'Voo', color: '#ff7300' },
//     { id: 'nasdaq', name: 'Nasdaq', color: '#003f5c' },
//     { id: 'dogecoin', name: 'Dogecoin', color: '#ffa600' },
//     { id: 'ripple', name: 'Ripple', color: '#0088fe' },
//   ];

//   const [selectedAssets, setSelectedAssets] = useState(['bitcoin', 'ethereum']);
//   const [data, setData] = useState([]);

//   //* Hardcoded data for all assets for now, will be using api for later
//   const allAssetsData = [
//     { date: 'Jan 1', bitcoin: 45000, ethereum: 3200, voo: 120, nasdaq: 0.5, dogecoin: 0.15, ripple: 0.8 },
//     { date: 'Jan 2', bitcoin: 45500, ethereum: 3250, voo: 125, nasdaq: 0.52, dogecoin: 0.16, ripple: 0.82 },
//     { date: 'Jan 3', bitcoin: 45200, ethereum: 3180, voo: 118, nasdaq: 0.48, dogecoin: 0.14, ripple: 0.78 },
//     { date: 'Jan 4', bitcoin: 44800, ethereum: 3150, voo: 115, nasdaq: 0.47, dogecoin: 0.13, ripple: 0.75 },
//     { date: 'Jan 5', bitcoin: 46000, ethereum: 3300, voo: 130, nasdaq: 0.55, dogecoin: 0.18, ripple: 0.85 },
//     { date: 'Jan 6', bitcoin: 45800, ethereum: 3280, voo: 128, nasdaq: 0.53, dogecoin: 0.17, ripple: 0.83 },
//     { date: 'Jan 7', bitcoin: 46200, ethereum: 3320, voo: 135, nasdaq: 0.58, dogecoin: 0.19, ripple: 0.88 },
//   ];

//   useEffect(() => {
//     const filteredData = allAssetsData.map(item => {
//       const filteredItem = { date: item.date };
//       selectedAssets.forEach(asset => {
//         filteredItem[asset] = item[asset];
//       });
//       return filteredItem;
//     });
//     setData(filteredData);
//   }, [selectedAssets]);

//   const toggleAsset = (assetId) => {
//     setSelectedAssets(prev => {
//       if (prev.includes(assetId)) {
//         if (prev.length === 1) return prev;
//         return prev.filter(id => id !== assetId);
//       } else {
//         return [...prev, assetId];
//       }
//     });
//   };

//   const selectAllAssets = () => {
//     setSelectedAssets(allAssets.map(asset => asset.id));
//   };

//   const clearAllAssets = () => {
//     setSelectedAssets(['bitcoin']);
//   };

//   const [currentTime, setCurrentTime] = useState(new Date());

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000); 
//     return () => clearInterval(timer);
//   }, []);

//   const formatTime = (date) => {
//     return date.toLocaleTimeString('en-US', {
//       hour12: true, 
//       hour: '2-digit',
//       minute: '2-digit',
//       second: '2-digit'
//     });
//   };

//   const formatDate = (date) => {
//     return date.toLocaleDateString('en-US', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   return (
//     <Box sx={{
//       backgroundColor: 'gray',
//       minHeight: '100vh',
//       py: 4
//     }}>
//       <Container maxWidth="lg">
//         <Box sx={{ my: 4 }}>
//           <Typography variant="h4" component="h1" gutterBottom align="center" sx={{
//             color: "white",
//             fontFamily: "'Inter', sans-serif", 
//             fontWeight: 700, 
//             letterSpacing: 1.5
//           }}>
//             Real Time Asset Tracker  
//           </Typography>

//           <Paper elevation={2} sx={{ backgroundColor: "#333", p: 2, mb: 3, textAlign: "center" }}>
//             <Typography variant="h5" sx={{ color: "#fff", fontWeight: "bold" }}>
//               {formatTime(currentTime)}
//             </Typography>
//             <Typography variant="subtitle1" sx={{ color: "#ccc" }}>
//               {formatDate(currentTime)}
//             </Typography>
//           </Paper>

//           <Paper elevation={2} sx={{ backgroundColor: "#1a1a1a", p: 3, mb: 3 }}>

//             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'Center' }}>
//               {allAssets.map(asset => (
//                 <Chip
//                   key={asset.id}
//                   label={asset.name}
//                   onClick={() => toggleAsset(asset.id)}
//                   color={selectedAssets.includes(asset.id) ? "primary" : "default"}
//                   variant={selectedAssets.includes(asset.id) ? "filled" : "outlined"}
//                   sx={{
//                     color: selectedAssets.includes(asset.id) ? 'white' : 'gray',
//                     borderColor: asset.color,
//                     backgroundColor: selectedAssets.includes(asset.id) ? asset.color : 'transparent',
//                     '&:hover': {
//                       backgroundColor: selectedAssets.includes(asset.id) ? asset.color : '#333',
//                     }
//                   }}
//                 />
//               ))}
//             </Box>
//           </Paper>
//           <Paper elevation={3} sx={{ backgroundColor: "black", p: 2 }}>
//             <Typography variant="h6" gutterBottom align="center" sx={{ color: "white" }}>
//               Cryptocurrency Price Trends
//             </Typography>
//             <ResponsiveContainer width="100%" height={400}>
//               <LineChart data={data}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#444" />
//                 <XAxis dataKey="date" stroke="#ccc" />
//                 <YAxis stroke="#ccc" />
//                 <Tooltip 
//                   contentStyle={{ 
//                     backgroundColor: '#333', 
//                     border: '1px solid #555',
//                     borderRadius: '8px'
//                   }} 
//                 />
//                 <Legend />
//                 {selectedAssets.map(assetId => {
//                   const asset = allAssets.find(a => a.id === assetId);
//                   return (
//                     <Line 
//                       key={assetId}
//                       type="monotone" 
//                       dataKey={assetId} 
//                       stroke={asset.color} 
//                       name={asset.name}
//                       strokeWidth={2}
//                       dot={{ fill: asset.color, strokeWidth: 2, r: 4 }}
//                       activeDot={{ r: 6, stroke: asset.color, strokeWidth: 2 }}
//                     />
//                   );
//                 })}
//               </LineChart>
//             </ResponsiveContainer>
//           </Paper>
//         </Box>
//       </Container>
//     </Box>
//   );
// }

// export default App;


// //! TEST 2
// import React from 'react';
// import {useState, useEffect } from 'react';
// import {Container, Box, Paper, Typography, Chip} from '@mui/material'
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// function App() {
//   const allAssets = [
//     { id: 'bitcoin', name: 'Bitcoin', color: '#8884d8' },
//     { id: 'ethereum', name: 'Ethereum', color: '#82ca9d' },
//   ];

//   const [selectedAssets, setSelectedAssets] = useState(['bitcoin', 'ethereum']);
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchCryptoData = async () => {
//     if (selectedAssets.length === 0) return;
    
//     setLoading(true);
//     setError(null);
    
//     try {
//       const ids = selectedAssets.join(',');
//       const response = await fetch(`http://localhost:3001/api/crypto/prices/real?ids=${ids}`);
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const result = await response.json();
      
//       if (result.success) {
//         const transformedData = transformApiData(result.data);
//         setData(transformedData);
//       } else {
//         throw new Error(result.message || 'Failed to fetch data');
//       }
//     } catch (err) {
//       console.error('Error fetching crypto data:', err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const transformApiData = (apiData) => {
//     const currentPrices = {};
//     selectedAssets.forEach(assetId => {
//       if (apiData[assetId]) {
//         currentPrices[assetId] = apiData[assetId].price;
//       }
//     });

//     return generateMockTimeSeries(currentPrices);
//   };

//   const generateMockTimeSeries = (currentPrices) => {
//     const timeSeries = [];
//     const days = 7;
    
//     for (let i = days; i >= 0; i--) {
//       const date = new Date();
//       date.setDate(date.getDate() - i);
      
//       const dataPoint = {
//         date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
//       };
      
//       selectedAssets.forEach(assetId => {
//         if (currentPrices[assetId]) {
//           const variation = (Math.random() - 0.5) * 0.1; //* for chart variation :) 
//           dataPoint[assetId] = currentPrices[assetId] * (1 - (i * 0.02) + variation);
//         }
//       });
      
//       timeSeries.push(dataPoint);
//     }
    
//     return timeSeries;
//   };

//   useEffect(() => {
//     fetchCryptoData();
    
//     const interval = setInterval(fetchCryptoData, 30000); //* this is for every 30 seconds
    
//     return () => clearInterval(interval);
//   }, [selectedAssets]);

//   const toggleAsset = (assetId) => {
//     setSelectedAssets(prev => {
//       if (prev.includes(assetId)) {
//         if (prev.length === 1) return prev;
//         return prev.filter(id => id !== assetId);
//       } else {
//         return [...prev, assetId];
//       }
//     });
//   };

//   const [currentTime, setCurrentTime] = useState(new Date());

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const formatTime = (date) => {
//     return date.toLocaleTimeString('en-US', {
//       hour12: true,
//       hour: '2-digit',
//       minute: '2-digit',
//       second: '2-digit'
//     });
//   };

//   const formatDate = (date) => {
//     return date.toLocaleDateString('en-US', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   return (
//     <Box sx={{
//       backgroundColor: 'gray',
//       minHeight: '100vh',
//       py: 4
//     }}>
//       <Container maxWidth="lg">
//         <Box sx={{ my: 4 }}>
//           <Typography variant="h4" component="h1" gutterBottom align="center" sx={{
//             color: "white",
//             fontFamily: "'Inter', sans-serif",
//             fontWeight: 700,
//             letterSpacing: 1.5
//           }}>
//             Real Time Asset Tracker
//           </Typography>

//           <Paper elevation={2} sx={{ backgroundColor: "#333", p: 2, mb: 3, textAlign: "center" }}>
//             <Typography variant="h5" sx={{ color: "#fff", fontWeight: "bold" }}>
//               {formatTime(currentTime)}
//             </Typography>
//             <Typography variant="subtitle1" sx={{ color: "#ccc" }}>
//               {formatDate(currentTime)}
//             </Typography>
//           </Paper>

//           <Paper elevation={2} sx={{ backgroundColor: "#1a1a1a", p: 3, mb: 3 }}>
//             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', mb: 2 }}>
//               {allAssets.map(asset => (
//                 <Chip
//                   key={asset.id}
//                   label={asset.name}
//                   onClick={() => toggleAsset(asset.id)}
//                   color={selectedAssets.includes(asset.id) ? "primary" : "default"}
//                   variant={selectedAssets.includes(asset.id) ? "filled" : "outlined"}
//                   sx={{
//                     color: selectedAssets.includes(asset.id) ? 'white' : 'gray',
//                     borderColor: asset.color,
//                     backgroundColor: selectedAssets.includes(asset.id) ? asset.color : 'transparent',
//                     '&:hover': {
//                       backgroundColor: selectedAssets.includes(asset.id) ? asset.color : '#333',
//                     }
//                   }}
//                 />
//               ))}
//             </Box>
            
//             {loading && (
//               <Typography variant="body2" sx={{ color: '#ffa500', textAlign: 'center' }}>
//                 Loading data...
//               </Typography>
//             )}
            
//             {error && (
//               <Typography variant="body2" sx={{ color: '#ff4444', textAlign: 'center' }}>
//                 Error: {error}
//               </Typography>
//             )}
//           </Paper>

//           <Paper elevation={3} sx={{ backgroundColor: "black", p: 2 }}>
//             <Typography variant="h6" gutterBottom align="center" sx={{ color: "white" }}>
//               Cryptocurrency Price Trends
//             </Typography>
            
//             {data.length > 0 ? (
//               <ResponsiveContainer width="100%" height={400}>
//                 <LineChart data={data}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#444" />
//                   <XAxis dataKey="date" stroke="#ccc" />
//                   <YAxis stroke="#ccc" />
//                   <Tooltip 
//                     contentStyle={{ 
//                       backgroundColor: '#333', 
//                       border: '1px solid #555',
//                       borderRadius: '8px'
//                     }} 
//                     formatter={(value) => [`$${value.toFixed(2)}`, 'Price']}
//                   />
//                   <Legend />
//                   {selectedAssets.map(assetId => {
//                     const asset = allAssets.find(a => a.id === assetId);
//                     return (
//                       <Line 
//                         key={assetId}
//                         type="monotone" 
//                         dataKey={assetId} 
//                         stroke={asset.color} 
//                         name={asset.name}
//                         strokeWidth={2}
//                         dot={{ fill: asset.color, strokeWidth: 2, r: 4 }}
//                         activeDot={{ r: 6, stroke: asset.color, strokeWidth: 2 }}
//                       />
//                     );
//                   })}
//                 </LineChart>
//               </ResponsiveContainer>
//             ) : (
//               <Box sx={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                 <Typography variant="h6" sx={{ color: '#ccc' }}>
//                   {loading ? 'Loading data...' : 'No data available'}
//                 </Typography>
//               </Box>
//             )}
//           </Paper>
//         </Box>
//       </Container>
//     </Box>
//   );
// }

// export default App;

// //! Test 3 !!!!!! AHHHHHHHHHHHHHHH
// import React from 'react';
// import {useState, useEffect } from 'react';
// import {Container, Box, Paper, Typography, Chip} from '@mui/material'
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// function App() {
//   const allAssets = [
//     { id: 'bitcoin', name: 'Bitcoin', color: '#8884d8' },
//     { id: 'ethereum', name: 'Ethereum', color: '#82ca9d' },
//   ];

//   const [selectedAssets, setSelectedAssets] = useState(['bitcoin', 'ethereum']);
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchCryptoData = async () => {
//     if (selectedAssets.length === 0) return;
    
//     setLoading(true);
//     setError(null);
    
//     try {
//       const ids = selectedAssets.join(',');
//       const response = await fetch(`http://localhost:3001/api/crypto/prices/real?ids=${ids}`);
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const result = await response.json();
      
//       if (result.success) {
//         const transformedData = transformApiData(result.data);
//         setData(transformedData);
//       } else {
//         throw new Error(result.message || 'Failed to fetch data');
//       }
//     } catch (err) {
//       console.error('Error fetching crypto data:', err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const transformApiData = (apiData) => {
//     const currentPrices = {};
//     selectedAssets.forEach(assetId => {
//       if (apiData[assetId]) {
//         // FIX: Use 'usd' instead of 'price'
//         currentPrices[assetId] = apiData[assetId].usd;
//       }
//     });

//     return generateHourlyTimeSeries(currentPrices);
//   };

//   const generateHourlyTimeSeries = (currentPrices) => {
//     const timeSeries = [];
//     const hours = 24; // 24 hours of data
    
//     for (let i = hours; i >= 0; i--) {
//       const date = new Date();
//       date.setHours(date.getHours() - i);
      
//       const dataPoint = {
//         timestamp: date.getTime(),
//         time: date.toLocaleTimeString('en-US', { 
//           hour: '2-digit', 
//           minute: '2-digit',
//           hour12: true 
//         }),
//         date: date.toLocaleDateString('en-US', { 
//           month: 'short', 
//           day: 'numeric',
//           hour: '2-digit',
//           minute: '2-digit',
//           hour12: true 
//         })
//       };
      
//       selectedAssets.forEach(assetId => {
//         if (currentPrices[assetId]) {
//           // More realistic hourly variation (smaller changes)
//           const variation = (Math.random() - 0.5) * 0.02; // ±1% variation
//           const timeDecay = (i / hours) * 0.05; // Small decay based on time distance
//           dataPoint[assetId] = currentPrices[assetId] * (1 - timeDecay + variation);
//         }
//       });
      
//       timeSeries.push(dataPoint);
//     }
    
//     return timeSeries;
//   };

//   useEffect(() => {
//     fetchCryptoData();
    
//     const interval = setInterval(fetchCryptoData, 30000); // every 30 seconds
    
//     return () => clearInterval(interval);
//   }, [selectedAssets]);

//   const toggleAsset = (assetId) => {
//     setSelectedAssets(prev => {
//       if (prev.includes(assetId)) {
//         if (prev.length === 1) return prev;
//         return prev.filter(id => id !== assetId);
//       } else {
//         return [...prev, assetId];
//       }
//     });
//   };

//   const [currentTime, setCurrentTime] = useState(new Date());

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const formatTime = (date) => {
//     return date.toLocaleTimeString('en-US', {
//       hour12: true,
//       hour: '2-digit',
//       minute: '2-digit',
//       second: '2-digit'
//     });
//   };

//   const formatDate = (date) => {
//     return date.toLocaleDateString('en-US', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   return (
//     <Box sx={{
//       backgroundColor: 'gray',
//       minHeight: '100vh',
//       py: 4
//     }}>
//       <Container maxWidth="lg">
//         <Box sx={{ my: 4 }}>
//           <Typography variant="h4" component="h1" gutterBottom align="center" sx={{
//             color: "white",
//             fontFamily: "'Inter', sans-serif",
//             fontWeight: 700,
//             letterSpacing: 1.5
//           }}>
//             Real Time Asset Tracker
//           </Typography>

//           <Paper elevation={2} sx={{ backgroundColor: "#333", p: 2, mb: 3, textAlign: "center" }}>
//             <Typography variant="h5" sx={{ color: "#fff", fontWeight: "bold" }}>
//               {formatTime(currentTime)}
//             </Typography>
//             <Typography variant="subtitle1" sx={{ color: "#ccc" }}>
//               {formatDate(currentTime)}
//             </Typography>
//           </Paper>

//           <Paper elevation={2} sx={{ backgroundColor: "#1a1a1a", p: 3, mb: 3 }}>
//             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', mb: 2 }}>
//               {allAssets.map(asset => (
//                 <Chip
//                   key={asset.id}
//                   label={asset.name}
//                   onClick={() => toggleAsset(asset.id)}
//                   color={selectedAssets.includes(asset.id) ? "primary" : "default"}
//                   variant={selectedAssets.includes(asset.id) ? "filled" : "outlined"}
//                   sx={{
//                     color: selectedAssets.includes(asset.id) ? 'white' : 'gray',
//                     borderColor: asset.color,
//                     backgroundColor: selectedAssets.includes(asset.id) ? asset.color : 'transparent',
//                     '&:hover': {
//                       backgroundColor: selectedAssets.includes(asset.id) ? asset.color : '#333',
//                     }
//                   }}
//                 />
//               ))}
//             </Box>
            
//             {loading && (
//               <Typography variant="body2" sx={{ color: '#ffa500', textAlign: 'center' }}>
//                 Loading data...
//               </Typography>
//             )}
            
//             {error && (
//               <Typography variant="body2" sx={{ color: '#ff4444', textAlign: 'center' }}>
//                 Error: {error}
//               </Typography>
//             )}
//           </Paper>

//           <Paper elevation={3} sx={{ backgroundColor: "black", p: 2 }}>
//             <Typography variant="h6" gutterBottom align="center" sx={{ color: "white" }}>
//               Cryptocurrency Price Trends (24 Hours)
//             </Typography>
            
//             {data.length > 0 ? (
//               <ResponsiveContainer width="100%" height={400}>
//                 <LineChart data={data}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#444" />
//                   <XAxis 
//                     dataKey="time" 
//                     stroke="#ccc"
//                     interval="preserveStartEnd"
//                     minTickGap={50}
//                   />
//                   <YAxis 
//                     stroke="#ccc"
//                     tickFormatter={(value) => `$${value.toLocaleString()}`}
//                   />
//                   <Tooltip 
//                     contentStyle={{ 
//                       backgroundColor: '#333', 
//                       border: '1px solid #555',
//                       borderRadius: '8px'
//                     }} 
//                     formatter={(value) => [`$${value.toFixed(2)}`, 'Price']}
//                     labelFormatter={(label, payload) => {
//                       if (payload && payload[0]) {
//                         const dataPoint = payload[0].payload;
//                         return `Time: ${dataPoint.date}`;
//                       }
//                       return `Time: ${label}`;
//                     }}
//                   />
//                   <Legend />
//                   {selectedAssets.map(assetId => {
//                     const asset = allAssets.find(a => a.id === assetId);
//                     return (
//                       <Line 
//                         key={assetId}
//                         type="monotone" 
//                         dataKey={assetId} 
//                         stroke={asset.color} 
//                         name={asset.name}
//                         strokeWidth={2}
//                         dot={{ fill: asset.color, strokeWidth: 2, r: 3 }}
//                         activeDot={{ r: 5, stroke: asset.color, strokeWidth: 2 }}
//                       />
//                     );
//                   })}
//                 </LineChart>
//               </ResponsiveContainer>
//             ) : (
//               <Box sx={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                 <Typography variant="h6" sx={{ color: '#ccc' }}>
//                   {loading ? 'Loading data...' : 'No data available'}
//                 </Typography>
//               </Box>
//             )}
//           </Paper>
//         </Box>
//       </Container>
//     </Box>
//   );
// }

// export default App;


//! Test 4, working potential


// import React from 'react';
// import {useState, useEffect } from 'react';
// import {Container, Box, Paper, Typography, Chip} from '@mui/material'
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// function App() {
//   const allAssets = [
//     { id: 'bitcoin', name: 'Bitcoin', color: '#8884d8' },
//     { id: 'ethereum', name: 'Ethereum', color: '#82ca9d' },
//   ];

//   const [selectedAssets, setSelectedAssets] = useState(['bitcoin', 'ethereum']);
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [lastUpdate, setLastUpdate] = useState(null);

//   const fetchCryptoData = async () => {
//     if (selectedAssets.length === 0) return;
    
//     setLoading(true);
//     setError(null);
    
//     try {
//       const ids = selectedAssets.join(',');
//       const response = await fetch(`http://localhost:3001/api/crypto/prices/real?ids=${ids}`);
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const result = await response.json();
      
//       if (result.success) {
//         const transformedData = transformApiData(result.data);
//         setData(transformedData);
//         setLastUpdate(new Date());
//       } else {
//         throw new Error(result.message || 'Failed to fetch data');
//       }
//     } catch (err) {
//       console.error('Error fetching crypto data:', err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const transformApiData = (apiData) => {
//     const currentPrices = {};
//     const priceChanges = {};
    
//     selectedAssets.forEach(assetId => {
//       if (apiData[assetId]) {
//         //* Need to use .usd for such change
//         currentPrices[assetId] = apiData[assetId].usd;
//         priceChanges[assetId] = apiData[assetId].usd_24h_change;
//       }
//     });

//     return generateTimeSeries(currentPrices, priceChanges);
//   };

//   const generateTimeSeries = (currentPrices, priceChanges) => {
//     const timeSeries = [];
//     const totalPoints = 30; //* initialize to 30 data points for each frame in the graph shown
    
//     for (let i = totalPoints; i >= 0; i--) {
//       const date = new Date();
//       date.setSeconds(date.getSeconds() - (i * 30)); //* 30 seconds intervals
      
//       const dataPoint = {
//         timestamp: date.getTime(),
//         time: date.toLocaleTimeString('en-US', { 
//           hour: '2-digit', 
//           minute: '2-digit',
//           second: '2-digit',
//           hour12: true 
//         }),
//         displayTime: i === 0 ? 'Now' : date.toLocaleTimeString('en-US', { 
//           hour: '2-digit', 
//           minute: '2-digit',
//           hour12: true 
//         })
//       };
      
//       selectedAssets.forEach(assetId => {
//         if (currentPrices[assetId]) {
//           const baseVariation = (priceChanges[assetId] || 0) / 100 / 2880; //* 24 hours base 
//           const randomVariation = (Math.random() - 0.5) * 0.001; 
//           const timeFactor = (i / totalPoints) * 0.005; //* decay variation
          
//           dataPoint[assetId] = currentPrices[assetId] * (1 - timeFactor + baseVariation + randomVariation);
//         }
//       });
      
//       timeSeries.push(dataPoint);
//     }
    
//     return timeSeries;
//   };

//   useEffect(() => {
//     fetchCryptoData(); //*Initial fetch
    
//     const interval = setInterval(fetchCryptoData, 10000); //* 30000 -> 30 seconds!, 10000 -> 10 seconds
    
//     return () => clearInterval(interval);
//   }, [selectedAssets]);

//   const toggleAsset = (assetId) => {
//     setSelectedAssets(prev => {
//       if (prev.includes(assetId)) {
//         if (prev.length === 1) return prev;
//         return prev.filter(id => id !== assetId);
//       } else {
//         return [...prev, assetId];
//       }
//     });
//   };

//   const [currentTime, setCurrentTime] = useState(new Date());

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const formatTime = (date) => {
//     return date.toLocaleTimeString('en-US', {
//       hour12: true,
//       hour: '2-digit',
//       minute: '2-digit',
//       second: '2-digit'
//     });
//   };

//   const formatDate = (date) => {
//     return date.toLocaleDateString('en-US', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   return (
//     <Box sx={{
//       backgroundColor: 'gray',
//       minHeight: '100vh',
//       py: 4
//     }}>
//       <Container maxWidth="lg">
//         <Box sx={{ my: 4 }}>
//           <Typography variant="h4" component="h1" gutterBottom align="center" sx={{
//             color: "white",
//             fontFamily: "'Inter', sans-serif",
//             fontWeight: 700,
//             letterSpacing: 1.5
//           }}>
//             Real Time Asset Tracker
//           </Typography>

//           <Paper elevation={2} sx={{ backgroundColor: "#333", p: 2, mb: 3, textAlign: "center" }}>
//             <Typography variant="h5" sx={{ color: "#fff", fontWeight: "bold" }}>
//               {formatTime(currentTime)}
//             </Typography>
//             <Typography variant="subtitle1" sx={{ color: "#ccc" }}>
//               {formatDate(currentTime)}
//             </Typography>
//             {lastUpdate && (
//               <Typography variant="caption" sx={{ color: "#aaa", display: 'block', mt: 1 }}>
//                 Last updated: {formatTime(lastUpdate)}
//                 {loading && ' (Updating...)'}
//               </Typography>
//             )}
//           </Paper>

//           <Paper elevation={2} sx={{ backgroundColor: "#1a1a1a", p: 3, mb: 3 }}>
//             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', mb: 2 }}>
//               {allAssets.map(asset => (
//                 <Chip
//                   key={asset.id}
//                   label={asset.name}
//                   onClick={() => toggleAsset(asset.id)}
//                   color={selectedAssets.includes(asset.id) ? "primary" : "default"}
//                   variant={selectedAssets.includes(asset.id) ? "filled" : "outlined"}
//                   sx={{
//                     color: selectedAssets.includes(asset.id) ? 'white' : 'gray',
//                     borderColor: asset.color,
//                     backgroundColor: selectedAssets.includes(asset.id) ? asset.color : 'transparent',
//                     '&:hover': {
//                       backgroundColor: selectedAssets.includes(asset.id) ? asset.color : '#333',
//                     }
//                   }}
//                 />
//               ))}
//             </Box>
            
//             {loading && (
//               <Typography variant="body2" sx={{ color: 'white', textAlign: 'center' }}>
//                 Updating data... (Every 30 seconds)
//               </Typography>
//             )}
            
//             {error && (
//               <Typography variant="body2" sx={{ color: '#ff4444', textAlign: 'center' }}>
//                 Error: {error}
//               </Typography>
//             )}
//           </Paper>

//           <Paper elevation={3} sx={{ backgroundColor: "black", p: 2 }}>
//             <Typography variant="h6" gutterBottom align="center" sx={{ color: "white" }}>
//               Real-time Price Trends
//             </Typography>
            
//             {data.length > 0 ? (
//               <ResponsiveContainer width="100%" height={400}>
//                 <LineChart data={data}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#444" />
//                   <XAxis 
//                     dataKey="displayTime" 
//                     stroke="#ccc"
//                     interval="preserveStartEnd"
//                     minTickGap={30}
//                   />
//                   <YAxis 
//                       stroke="#ccc"
//                       tickFormatter={(value) => `$${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
//                       domain={['auto', 'auto']}
//                       allowDataOverflow={false}
//                       tickCount={6}
//                       type="number"
//                     />

//                   <Tooltip 
//                     contentStyle={{ 
//                       backgroundColor: '#333', 
//                       border: '1px solid #555',
//                       borderRadius: '8px'
//                     }} 
//                     formatter={(value, name) => {
//                       const asset = allAssets.find(a => a.id === name);
//                       return [`$${Number(value).toFixed(2)}`, asset?.name || name];
//                     }}
//                     labelFormatter={(label) => `Time: ${label === 'Now' ? 'Current' : label}`}
//                   />
//                   <Legend />
//                   {selectedAssets.map(assetId => {
//                     const asset = allAssets.find(a => a.id === assetId);
//                     return (
//                       <Line 
//                         key={assetId}
//                         type="monotone" 
//                         dataKey={assetId} 
//                         stroke={asset.color} 
//                         name={asset.name}
//                         strokeWidth={2}
//                         dot={false}
//                         activeDot={{ r: 4, stroke: asset.color, strokeWidth: 2 }}
//                       />
//                     );
//                   })}
//                 </LineChart>
//               </ResponsiveContainer>
//             ) : (
//               <Box sx={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                 <Typography variant="h6" sx={{ color: '#ccc' }}>
//                   {loading ? 'Loading data...' : 'No data available'}
//                 </Typography>
//               </Box>
//             )}
//           </Paper>
//         </Box>
//       </Container>
//     </Box>
//   );
// }

// export default App;


//! TEST 5

import React from 'react';
import {useState, useEffect } from 'react';
import {Container, Box, Paper, Typography, Chip, Grid, Card, CardContent} from '@mui/material'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function App() {
  const allAssets = [
    { id: 'bitcoin', name: 'Bitcoin', color: '#8884d8' },
    { id: 'ethereum', name: 'Ethereum', color: '#82ca9d' },
  ];

  const [selectedAssets, setSelectedAssets] = useState(['bitcoin', 'ethereum']);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [latestPrices, setLatestPrices] = useState({});

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
    fetchCryptoData();
    
    const interval = setInterval(fetchCryptoData, 30000);
    
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