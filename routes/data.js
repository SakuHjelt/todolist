var express = require('express');
var router = express.Router();
var fs = require('fs');
var uuid = require('uuidv4').default;
var bodyParser = require('body-parser');
var parser = bodyParser.urlencoded({ extended: true });

var userData = [];
let prevData = fs.readFile('userData.json', (err, data) => {
  userData = JSON.parse(data);
});
userData.push(prevData);

//API'S
router.route('/')
  .get((req, res, next) => {
    var userEntries = res.json(userData)
    res.send(userEntries);
  })
  .post(parser, (req, res) => {
    const data = req.body;
    data.id = uuid();
    userData.push(data);
    save();
    res.status(201).location('/api/data/' + 100);
    res.json(data);
  })


router.route('/:id')
  .get((req, res) => {
    for (var data of userData) {
      if (data.id == req.params.id) {
        res.json(data);
        return;
      }
    }
    res.json("{'msg': 'Error, no such thing to do!'}");
  })
  .delete((req, res) => {
    for (let i = 0; i < userData.length; i++) {
      if (userData[i].id == req.params.id) {
        userData.splice(i, 1);
        res.json({ msg: "deleted: " + req.params.title })
        save();
        return;
      }
    }
    res.json({ msg: "No such topic" });
  })
  .put(parser, (req, res) => {
    let body = req.body;
    for (let i = 0; i < userData.length; i++) {
      if (userData[i].id == req.params.id) {
        userData[i].title = body.updateTitleValue;
        userData[i].desc = body.updateDescValue;
        res.json({ msg: "updated: " + req.params.title })
        save();
        return;
      }
    }
  })

function save() {
  fs.writeFileSync('userData.json', JSON.stringify(userData), () => { console.log('Data entry saved.') })
}

module.exports = router;
