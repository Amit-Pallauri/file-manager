const express = require('express')
const { config } = require('dotenv')
const bodyparser = require('body-parser')
const AppError = require('./utils/appError')
const cors = require('cors')
config()
require('./db')
const path = require('path')

const userRoutes = require('./routes/userRoutes')
const errorHandler = require('./handler/errorHandler')

const app = express()
// app.use(cookieParser());
app.use(bodyparser.json())
app.use(express.json())
app.use(
  cors() 
  // cors({
  //       origin: "http://localhost:3001",
  //       credentials: true,
  //       allowedHeaders: ["Content-Type"]
  //     })
)
app.options('*', cors())
app.use(userRoutes)

app.all( '*', (req, _, next) => {
  next(new AppError(`can not find route ${req.originalUrl} in this server`, 404))
})

app.use(errorHandler)

// for heroku deployement
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.resolve(__dirname, 'client', 'build')));
  app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

module.exports  = app