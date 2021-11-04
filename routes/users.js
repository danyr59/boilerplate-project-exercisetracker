const express = require('express')

const router = express.Router();

router.post("/users", (req, res) => {
  res.json("hola")
})

module.exports = router;
