const express = require('express');
const connectDB = require('./config/db')

const app = express();

// Connect db
connectDB();

// Init middleware
app.use(express.json({extended:false}))

app.get('/', (req, res)=> res.send('API Running'))

// define routes
app.use('/api/user', require('./routes/api/user'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/people', require('./routes/api/people'))

const PORT = process.env.PORT || 7000;

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));