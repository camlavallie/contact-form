const express = require('express');
const connectDb = require('./config/db');
const app = express();
require('dotenv').config()
const morgan = require('morgan')
const nodemailer = require('nodemailer')
const cors = require('cors')
connectDb();
app.use(morgan('dev'))
app.use(
  express.json({
    extended: false,
  })
);

app.get('/', (req, res) => res.send('API Running...'));
app.use(cors());
app.use('/api/contact', require('./routes/api/contact'));
app.use('/api/sendtome', require('./routes/api/sendToMe'))
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));