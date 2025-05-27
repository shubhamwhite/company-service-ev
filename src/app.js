const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}

// Middleware
app.set('trust proxy', true)
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/company-service', (req, res) => {
  res.send('Hello from the Express app!')
})

module.exports = app
