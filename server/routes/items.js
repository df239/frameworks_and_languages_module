var express = require('express');
var router = express.Router();

var items = [
  {id:'1', description:"Hello World"},
  {id:'2', description:"Hello Everyone!"}
];

/* GET users listing. */
router.get('/', function(req, res) {
  res.json(items);
});

module.exports = router;