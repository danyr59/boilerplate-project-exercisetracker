const express = require('express')
const router = express.Router();

const { Exercise } = require("../models/Exercise")
const { User } = require("../models/User")
const { Log } = require("../models/Log")

/**
  * @Route POST /api/users/:_id/exercise
  * @desc create tracker 
  */
router.post("/:_id/exercises", async (req, res) => {
  const { _id } = req.params;
  const { description, duration, date } = req.body;

  try {
    //buscar si existe usuario de lo contrario me salgo
    const user = await User.findById(_id)
    if (!user) {
      return res.json("no existe id")
    }
    const { username } = user;
    const _date = /\d{4}[-]\d{1,2}[-]\d{1,2}/.test(date) ? new Date(date).toDateString() : new Date().toDateString()//toUTCString()

    //creo el Obj exercise para inicializar el Array
    const exercise = new Exercise({
      description,
      duration: new Number(duration),
      date: _date
    })


    //busco si existe un log bajo ese id, de lo contrario se crea
    const logs = await Log.findById({ _id })
    if (!logs) {
      const log = new Log({
        username,
        _id,
        log: [exercise]
      })

      await log.save();
    } else {

      logs.count++;
      logs.log.push(exercise)
      await logs.save();
      // no tendria sentido , ya que para realizar eso habria que pasarle un callback para la logica sobre los datos y ya que es una promesa no tendria sentido
      //await Log.update({ _id }, { count: 2, $push: { log: logs } })
      // console.log(await Log.findOneAndUpdate({ _id }, { $push: { log: logs } }, { new: true }))
    }

    res.json({
      username,
      description,
      duration: new Number(duration),
      _date,
      _id,
    })

  } catch (error) {
    console.log(error.message)
    res.json("fail server")
  }
})

module.exports = router;
