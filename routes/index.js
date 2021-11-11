const express = require('express')
const router = express.Router();

const { User } = require("../models/User.js")

const { Log } = require("../models/Log")

// @Route GET /api/users
// @desc  Obtener todos los datos 
router.get("/api/users", async (req, res) => {
  try {
    const usuarios = await User.find();
    if (!usuarios) {
      res.json("no existen usuarios")
    }

    console.log("Exito, todos los datos obtenidos ", usuarios)
    res.json(usuarios)
  } catch (error) {
    console.log(error.message)
    res.json("fail server")
  }
})

// @Route GET /api/users/:_id/logs
// @desc  obtinene los datos del log del id en concreto
// @return retorna un objeto con los datos del log sin restriccion de fecha 
router.get("/api/users/:_id/logs", async (req, res) => {
  const { _id } = req.params;

  try {
    const log = await Log.findById(_id);
    if (!log) {
      console.log("log no existe")
      return res.json("log no existe bajo ese id");
    }

    res.json(log)
    console.log("exito, datos obtenidos", log)
  } catch (error) {

    console.log(error.message)
    res.json("fail server")
  }
})
module.exports = router;
