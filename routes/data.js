var express = require('express');
var router = express.Router();
var fs = require('fs');
var uuid = require('uuidv4').default;
var bodyParser = require('body-parser');

var parser = bodyParser.urlencoded({ extended:true });

var userData = [];

let prevData = fs.readFile('userData.json', (err, data) => {
  userData = JSON.parse(data);
});

userData.push(prevData);


router.route('/')
.get((req, res, next) => {
  var userEntries = res.json(userData)
  res.send(userEntries);
})
.post(parser, (req, res) => {
  console.log('testi');
  const data = req.body;
  data.id = uuid();
  console.dir(data);
  userData.push(data);
  save();
  res.status(201).location('/api/data/'+100);
  res.json(data);
 
  console.log(data.desc);
})

router.route('/:title')
.get((req, res) => {
    for (var data of userData) {
        if (data.title == req.params.title) {
            res.json(data);
            return;
        }
    }
    res.json("{'msg': 'Error, no such thing to do!'}");
})
.delete((req, res) => {
  console.log("Delete: " + req.params.title);
  console.log('kuks minä olen' + req.params.title);
  for (let i=0; i<userData.length; i++) {
      if (userData[i].title == req.params.title) {
      userData.splice(i, 1);
      res.json({msg:"deleted: " + req.params.title})
      save();
      return;
  }
}
  res.json({msg:"No such topic"});
})
.put(parser, (req, res) => {
  console.log("testiPut");
  console.log(req.body);
  let body = req.body;
  for (let i=0; i<userData.length; i++) {
    if (userData[i].title == req.params.title) {
    userData[i].title = body.updateTitleValue;
    userData[i].desc = body.updateDescValue;
    console.log(body.updateDescValue);
    // userData.splice(i, 1);
    res.json({msg:"updated: " + req.params.title})
    save();
    return;
    }
  }
})

function save () {
  fs.writeFileSync('userData.json', JSON.stringify(userData), () => { console.log('Dataentry saved.')})
}

module.exports = router;
