var express = require('express');
var router = express.Router();
var cors = require('cors');

var items = [
  {id:1, description:"Hello World"},
  {id:2, description:"Hello Everyone!"}
];

var corsSetup = {
  origin: '*',
  methods: 'GET,POST,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type'
}

/* GET items listing */
router.get('/', cors(corsSetup), function(req, res) {
  res.json(items);
});

/* GET specific item */
router.get('/:itemId', cors(corsSetup), function(req, res){
  var item = items.filter(obj => {
    return obj.id == req.params.itemId
  })[0];

  res.json(item);
});

/* POST new item */
router.post('/', cors(corsSetup), function(req, res){
  var newID = items[items.length - 1].id + 1;
  items.push({
    id: newID,
    description: req.body.description
  });
  //res.send("post successful");
});

/* DELETE a specific item */
router.delete('/:itemId', cors(corsSetup), function(req,res){
  //var itemIndex = items.map(mymapfunc).indexOf(req.params.itemId);
  /*
  function mymapfunc(value){
    return value.id;
  }*/
  //items.splice(itemIndex,1);

  //items = items.filter(obj => obj.id != req.params.itemId);

  var itemFound = false;

  for(let i = 0; i < items.length; i++){
    if(items[i].id == req.params.itemId){
      items.splice(i,1);
      itemFound = true;
      break;
    }
  }

  res.send(itemFound? "successful deletion" : "item not found");
});

router.options("/*", cors(corsSetup));

module.exports = router;