const express = require('express')
const router = express.Router();

const { User } = require("../models/User.js")
// @Route GET /api/users
// @desc  Obtener todos los datos 
router.get("/api/users", async (req, res) => {
  try {
    const usuarios = await User.find();

    console.log("Exito, todos los datos obtenidos ", usuarios)
    res.json(usuarios)
  } catch (error) {
    console.log(error.message)
    res.json("fail server")
  }
})
module.exports = router;
