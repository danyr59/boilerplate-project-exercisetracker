const express = require('express')
const router = express.Router();

const { User } = require("../models/User")

/**
  * @Route POST /api/users/
  * @desc Create a users
  */

router.post("/users", async (req, res) => {
  const { username } = req.body
  const usuario = new User({ username })
  await usuario.save();
  res.json(usuario)
})

module.exports = router;
