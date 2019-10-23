var express = require('express');
var router = express.Router();
var fs = require('fs');
var uuid = require('uuidv4').default;
var bodyParser = require('body-parser');

var parser = bodyParser.urlencoded({ extended:true });

var userData = [];

//let prevData = fs.readFileSync('userData.json', 'utf-8',  JSON.stringify);

let prevData = fs.readFile('userData.json', (err, data) => {
  userData = JSON.parse(data);
  // console.log(userData)
});

// console.log(prevData);

// console.log(userData);
userData.push(prevData);

// var MyFuncs = require('./rest-functions');
// var method = MyFuncs.save;
// MyFuncs.log('Hello');

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
  res.status(201)
  res.json(data)
  .location('/api/data/'+100)
  .send(data);
  console.log(data.desc);
})

.delete((req, res) => {
  console.log("Delete: " + req.params.id);
  for (let i = 0; i < userData.length; i++) {
    if (userData[i].id == req.params.key) {
      userData.splice(i, 1);
      res.json({ msg: "deleted: " + req.params.id });
      save();
      return;
    }
  }
});

function save () {
  fs.writeFileSync('userData.json', JSON.stringify(userData), () => { console.log('Dataentry saved.')})
}

// function read () {
//   fs.readFileSync('userData.json', JSON.stringify(userData), () => { console.log('Dataentry saved.')})
// }


module.exports = router;
