const express = require('express')
const { Exercise } = require("../models/Exercise")
const { User } = require("../models/User")
const router = express.Router();

// const ejercicio = new Exercise({})
router.post("/:_id/exercises", async (req, res) => {
  const { _id } = req.params;
  const { description, duration, date } = req.body;
  console.log(typeof _id, typeof description, typeof duration, typeof date)
  console.log(description, duration, date)
  //buscar
  const user = await User.findById(_id)
  if (!user) {
    return res.json("no existe usuario")
  }
  const { username } = user;
  const _date = /\d{4}[-]\d{1,2}[-]\d{1,2}/.test(date) ? new Date(date).toUTCString() : new Date().toUTCString()
  console.log(_date)

  //crear exercise
  const exercise = new Exercise({
    username,
    _id,
    description,
    duration: new Number(duration),
    date: _date
  })
  console.log(exercise)
  res.json(exercise)
})

module.exports = router;
