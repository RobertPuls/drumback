const express = require('express');
const router = express.Router();

const queries = require("../db/queries");

router.get('/' (req, res) => {
  queries.getAllBeats().then(beats => res.json({
    "beats": beats
  }));
});

router.post('/' (req, res) => {
  console.log(req.body.pattern);
  queries.create(req.body).then(beat => res.json({
    'beats': beat
  }));
})

module.exports = router;
