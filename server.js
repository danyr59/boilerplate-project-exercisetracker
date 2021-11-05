const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/db')

//conect to data base 
connectDB();

//middlewares
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))


//routes
app.use("/", require("./routes/index"))
app.use("/api", require("./routes/users"));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
