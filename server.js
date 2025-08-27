const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const multer = require('multer');
const upload = multer();
require('dotenv').config();
const app = express();
app.use(express.json());

const productRoute = require('./routes/api/ProductRoute');

// Connect to MongoDB database
let mongodb_url = 'mongodb://localhost/';
let dbName = 'ecommerce';

// define a url to connect to the database
const MONGODB_URI = process.env.MONGODB_URI || mongodb_url + dbName
mongoose.connect(MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true  
});

let db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to MongoDB');
});

db.on('error', (error)=>{
    console.log(error);
})

app.use(upload.array()); 

// Cors 
app.use(cors());

// Use Route
app.use('/api/products', productRoute)

// Define the PORT
const PORT = process.env.PORT || 5000

// Start server
app.listen(PORT, () => {
  console.log('Server running on http://localhost:5050');
});
