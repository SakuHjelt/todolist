var express = require('express');
var router = express.Router();


router.route('/')
.get((req, res, next) => {
  res.send()
})
.post((req, res) => {
  const data = req.body;
  res.status(201)
  .location('/api/data/'+100)
  .send();
});


module.exports = router;
