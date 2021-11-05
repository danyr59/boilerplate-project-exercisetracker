const express = require('express')
const Exercise = require("../models/Exercise")
const router = express.Router();

// const ejercicio = new Exercise({})
router.post("/:_id/exercises", (req, res) => {
  const { _id } = req.params;
  console.log(_id)
  res.json("hola")
})

module.exports = router;
