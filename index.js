const express = require('express')
const app = express()
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./User');
const morgan = require('morgan');
const PORT = 3000 || process.env.PORT;

dotenv.config();
// Middlewares
app.use(morgan('dev'));
app.use(express.json());
// connect to DB
mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
    console.log('connected to db');
});


const api = require('./routes/api')


// Route Middleware
app.use('/api', api);
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})










/*
const http = require('http')

const port = process.env.PORT || 3000

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.end('<h1>Hello World!</h1>')
})

server.listen(port, () => {
  console.log(`Server running at port ${port}`)
})
*/