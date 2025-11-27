const http = require('http');

require('dotenv').config({ path: './Server/.env' });

const cluster = require('cluster');
const os = require('os');
const express = require('express')
const cors = require('cors')
const app = express() //* Using express for the app, axios setup for the frontend 
const axios = require('axios');

//* this is setting up the middleware
app.use(cors())
app.use(express.json()) 


const PORT = process.env.PORT || 3001;

const server = http.createServer(app);

app.get('/api/crypto/prices/real', async (req, res) => {
    try {
        const { ids } = req.query;
        console.log('Received request with ids:', ids);
        
        if (!ids) {
            return res.status(400).json({
                success: false, 
                message: "Missing parameter: ids"
            });
        }
        console.log('Fetching from CoinGecko for:', ids);
        const response = await axios.get(
            `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
        );

        console.log('CoinGecko response received');
        res.json({
            success: true, 
            data: response.data,
            message: 'Real crypto prices fetched successfully!'
        });

    } catch (error) {
        console.error("Error Fetching Data: ", error.message);
        res.status(500).json({
            success: false, 
            message: "Error fetching crypto prices from external API"
        });
    }
});





async function startServer() {
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

if (cluster.isPrimary) {
  console.log('master has been started!');
  cluster.schedulingPolicy = cluster.SCHED_RR; 
  const NUM_WORKERS = os.cpus().length;
  for (let i = 0; i < NUM_WORKERS; i++) {
    cluster.fork();
  }
}
else {
  console.log('work process has been started!');
  startServer();
}
