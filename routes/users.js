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

  try {
    const log = new Log({
      username,
      count: 0,
      _id: usuario._id,
      log: []
    })
    await usuario.save();
    await log.save();
    res.json(usuario)
  } catch (error) {
    console.log(error.message);
    res.json("server Fail");
  }
})

module.exports = router;
