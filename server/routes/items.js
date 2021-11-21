var express = require('express');
var router = express.Router();

var items = [
  {id:1, description:"Hello World"},
  {id:2, description:"Hello Everyone!"}
];

/* GET items listing */
router.get('/', function(req, res) {
  res.json(items);
});

/* POST new item */
router.post('/', function(req, res){
  var newID = items[items.length - 1].id + 1;
  items.push({
    id: newID,
    description: req.body.description
  });
  res.send("successful post");
});

module.exports = router;