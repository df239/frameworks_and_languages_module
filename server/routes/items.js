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

/* GET specific item */
router.get('/:itemId', function(req, res){
  var item = items.filter(obj => {
    return obj.id == req.params.itemId
  })[0];

  res.json(item);
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

/* DELETE a specific item */
router.delete('/:itemId', function(req,res){
  var itemIndex = items.map(mymapfunc).indexOf(req.params.itemId);

  function mymapfunc(value){
    return value.id;
  }

  items.splice(itemIndex,1);
  res.send("successful deletion");
});

module.exports = router;