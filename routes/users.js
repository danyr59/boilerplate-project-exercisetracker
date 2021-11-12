const express = require('express')
const router = express.Router();

const { User } = require("../models/User")

const { Log } = require("../models/Log")

/**
  * @Route POST /api/users/
  * @desc Create a users
  */

router.post("/users", async (req, res) => {
  const { username } = req.body
  const usuario = new User({ username })
  const log = new Log({
    username,
    count: 0,
    _id: usuario._id,
    log: []
  })
  await usuario.save();
  await log.save(); 
  console.log(usuario._id)
  res.json(usuario)
})

module.exports = router;
