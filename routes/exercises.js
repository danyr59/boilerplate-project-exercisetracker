const express = require('express')
const { Exercise } = require("../models/Exercise")
const { User } = require("../models/User")
const { Log } = require("../models/Log")
const router = express.Router();

// const ejercicio = new Exercise({})
router.post("/:_id/exercises", async (req, res) => {
  const { _id } = req.params;
  const { description, duration, date } = req.body;
  // console.log(typeof _id, typeof description, typeof duration, typeof date)
  // console.log(description, duration, date)
  //buscar
  try {
    const user = await User.findById(_id)
    if (!user) {
      return res.json("no existe usuario")
    }

    let count = 1;
    const { username } = user;
    const _date = /\d{4}[-]\d{1,2}[-]\d{1,2}/.test(date) ? new Date(date).toUTCString() : new Date().toUTCString()
    console.log(_date)

    //crear exercise
    const exercise = new Exercise({
      description,
      duration: new Number(duration),
      date: _date
    })

    //crear Log 
    const logs = await Log.findById(_id)

    if (!logs) {
      const log = new Log({
        username,
        count,
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


    //guardar el Log directamente 
    console.log(exercise)

    //guardo exercise
    // await exercise.save()

    //response json 
    res.json({
      username,
      description,
      duration: new Number(duration),
      _date,
      _id,
    })

  } catch (error) {
    console.log(error.message)
    res.json("Server fail")
  }
})

module.exports = router;
