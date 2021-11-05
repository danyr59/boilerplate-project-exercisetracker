const mongoose = require('mongoose')
require("dotenv").config()

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongoURI, {
      useNewUrlParser: true,
      ssl: true,
      sslValidate: false
    });

    console.log("DB conencted....")
  } catch (error) {

    console.log(error.message)
  }
}

module.exports = connectDB;
