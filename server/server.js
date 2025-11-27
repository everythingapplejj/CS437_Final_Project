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

//* creating the asynchrnous function for the api, allows non-blocking operations
app.get('/api/crypto/prices/real', async (req, res) => {

    try{

    } catch (error) {
        console.error("Error Fetching Data: ", error);
        //* Now gets the error response to the frontend
        res.status(500).json({
            sucess: false, 
            message: "Error Fetching Crypto Prices ...."
        })
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
