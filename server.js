const express = require('express')
const app = express()
const PORT = 3003
const mongoose = require('mongoose')
const cors = require('cors')


// Error / Disconnection
mongoose.connection.on('error', err => console.log(err.message + ' is Mongod not running?'))
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'))

//...farther down the page

mongoose.connect('mongodb+srv://rayv156:1234@sei.hyibv.mongodb.net/bookmarks-ray?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once('open', ()=>{
console.log('connected to mongoose...')
})

//middleware

app.use(express.json()); //use.json(), not .urlencoded()


// cors
const whitelist = ['http://localhost:3000', 'https://fathomless-sierra-68956.herokuapp.com']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors()) // Note: all routes are now exposed. If you want to limit access for specific verbs like POST or DELETE you can look at the npm documentaion for cors (for example with OMDB - it's ok for anyone to see the movies, but you don't want just anyone adding a movie)

// controllers:
const bookmarksController = require('./controllers/bookmarks.js')

app.use('/bookmarks', bookmarksController)
   



app.listen(PORT, () => {
      console.log('🎉🎊', 'celebrations happening on port', PORT, '🎉🎊',)
    })