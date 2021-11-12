const express = require('express')
const router = express.Router();

const { User } = require("../models/User.js")

const { Log } = require("../models/Log");
const { json } = require('express');
//[from=2021-11-5][&to=2021-11-12][&limit=10]
let isObjEmpy = (Obj) => {
  return Object.keys(Obj).length === 0;
}

// @Route GET /api/users
// @desc  Obtener todos los datos 
router.get("/api/users", async (req, res) => {
  try {
    const usuarios = await User.find();
    if (!usuarios) {
      res.json("no existen usuarios")
    }

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
  const query = JSON.parse(JSON.stringify(req.query).replace(/\[|\]/g, ""))
  const { _id } = req.params;

  try {
    const log = await Log.findById(_id);
    // log.log.forEach(x => console.log(x))
    if (!log) {
      console.log("log no existe")
      return res.json("log no existe bajo ese id");
    }
    //Obtiene todos los datos de Log 
    if (isObjEmpy(query)) {


      res.json(log)

    } else {
      //Obtiene los datos filtrados por fechas(from,to), y numero de coincidencias 
      // console.log(query.from, query.to)
      const from = new Date(query['from']).getTime();
      const to = new Date(query['to']).getTime();
      if (!from && !to) {
        return res.json("From, to - format invalid")
      }
      // console.log(from, to)
      const logs = JSON.parse(JSON.stringify(log.log)).filter((exercise) => {
        const date = new Date(exercise.date).getTime()
        return (
          (from && to)
            ? (from < date && date < to)
              ? true
              : false
            : (!to && from)
              ? (from < date)
                ? true
                : false
              : (date < to)
                ? true
                : false
        )
      }).slice(0, Number(query.limit))
      log.log = logs;
      res.json(log)
      console.log("datos del log", logs)

    }
  } catch (error) {

    console.log(error.message)
    res.json("fail server")
  }
})
module.exports = router;
