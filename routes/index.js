const express = require('express')
const router = express.Router();

const { User } = require("../models/User.js")

const { Log } = require("../models/Log");
const { json } = require('express');

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
// @Route GET /api/users/:_id/logs?[from=yyyy-mm-dd][&to=yyyy-mm-dd][&limit=integer]
// @optionals [] optionals in the route
// @desc  obtinene los datos del log del id en concreto
// @return Log 
router.get("/api/users/:_id/logs", async (req, res) => {
  const query = JSON.parse(JSON.stringify(req.query).replace(/\[|\]/g, ""))
  const { _id } = req.params;

  try {
    //Comporobar si existe 
    const log = await Log.findById(_id);
    if (!log) {
      console.log("log no existe")
      return res.json("log no existe bajo ese id");
    }

    //Verifica si no posee req.params 
    //en caso de ser isObjEmpy() -> true , devuelvo el log completo sin filtrado 
    if (isObjEmpy(query)) {
      return res.json(log);
    } else {

      const from = new Date(query['from']).getTime();
      const to = new Date(query['to']).getTime();
      const limit = query['limit'];
      let _log = JSON.parse(JSON.stringify(log));

      //case from=null and case to=null and limit=null
      if (!from && !to && !limit) {
        return res.json(`/api/users/:_id/logs?[from=yyyy-mm-dd][&to=yyyy-mm-dd][&limit=integer] ([] optionals) - check`)
      }

      //case limit sea el unico argumento de query [Obj] - devolvemos el numero limite de coincidencias como Log objeto  
      if (!from && !to && limit) {
        _log.log = log.log.slice(0, Number(limit))
        return res.json(_log)
      }

      //JSON.parse(JSON.stringify(log.log)) Permite copiar con profundidad 
      //filtrado de log Array - devolvemos Log con la modificacion del array 
      const logs = log.log.filter((exercise) => {
        const date = new Date(exercise.date).getTime()
        return (
          (from && to)
            ? (from <= date && date <= to)
              ? true
              : false
            : (!to && from)
              ? (from <= date)
                ? true
                : false
              : (date <= to)
                ? true
                : false
        )
      })
      _log.log = (limit) ? logs.slice(0, Number(limit)) : logs;
      res.json(_log)

    }
  } catch (error) {

    console.log(error.message)
    res.json("fail server")
  }
})
module.exports = router;
