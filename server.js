const express = require('express')
const app = express();
const connectDb = require('./config/db')


connectDb();
app.use(express.json({
  extended: false
}))


app.use('/api/contact', require('./routes/api/contact'))
app.get('/', (req, res) => res.send('API Running...'))
const PORT = process.env.PORT || 5000;




app.listen(PORT, () => console.log(`Server started on port ${PORT}`));