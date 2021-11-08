const express = require('express')
const { User } = require("../models/User")
const router = express.Router();

router.post("/users", async (req, res) => {
  const { username } = req.body
  const usuario = new User({ username })
  await usuario.save();
  res.json(usuario)
})

module.exports = router;
