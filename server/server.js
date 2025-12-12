const http = require('http');
const nodemailer = require('nodemailer');

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

//* Creating an email transporter

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS
  }
});


//* So this is the endpoint for the email
app.post('api/send-email', async (req, res) => {
  try {
    const {to, subject, text} = req.body;
    let info = await transporter.sendMail({ 
      from: `"CS 437 Final Project Update" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject, 
      text: text  
    })
  } catch (error) {
    console.error("Error Sending Email: ", error); 
    res.status(500).json({
      success: false, 
      message: "Failed to send email",
      error: error.message
    })
  }
});


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




app.get('/api/stocks/prices', async (req, res) => {
  try {
    const { symbols } = req.query;
    if (!symbols) {
      return res.status(400).json({
        success: false,
        message: "Missing parameter: symbols"
      });
    }

    const apiKey = process.env.STOCK_API_KEY;
    const symbolArr = symbols.split(',');
    const result = {};

    for (const symbol of symbolArr) {
      const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
      const response = await axios.get(url);
      
      if (response.data['Global Quote']) {
        const quote = response.data['Global Quote'];
        result[symbol] = {
          usd: parseFloat(quote["05. price"]),
          usd_24h_change: parseFloat(quote["10. change percent"].replace("%", ""))
        };
      }
    }

    res.json({
      success: true,
      data: result,
      message: "Stock prices fetched successfully!"
    });

  } catch (error) {
    console.error("Error Fetching Stock Data: ", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching stock prices from AlphaVantage"
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
