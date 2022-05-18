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


//config
app.set("port", process.env.PORT || 3000)

//routes
app.use("/", require("./routes/index"))
app.use("/api", require("./routes/users"));
app.use("/api/users", require("./routes/exercises"))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


app.listen(app.get("port"), () => {
  console.log(`Your app is listening on port  ${app.get("port")}`)
})
