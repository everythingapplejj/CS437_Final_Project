const http = require('http');

require('dotenv').config({ path: './Server/.env' });

const cluster = require('cluster');
const os = require('os');
const express = require('express')
const cors = require('cors')
const app = express() //* Using express for the app, axios setup for the frontend 

//* this is setting up the middleware
app.use(cors())
app.use(express.json()) 


const PORT = process.env.PORT || 3001;

const server = http.createServer(app);

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
