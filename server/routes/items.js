var express = require('express');
var router = express.Router();
var cors = require('cors');

var items = {
  1: {id:1, description:"Hello World"},
  2: {id:2, description:"Hello Everyone!"}
};

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
  var key = parseInt(req.params.itemId);
  if(items.hasOwnProperty(key)){
    var item = items[key];
    res.json(item);
  }
  else{
    res.json({message:"Item does not exist."});
  }  
});

/* POST new item */
router.post('/', cors(corsSetup), function(req, res){
  var maxIndex = Math.max.apply(null,Object.keys(items));
  var newID = maxIndex + 1;
  items[newID] = {id:newID, description:req.body.description};
  if(items.hasOwnProperty(newID)){
    res.json({message:"Post successful, new ID is "+newID+"."});
  }
  else{
    res.json({message:"Post unsuccessful."})
  }

});

/* DELETE a specific item */
router.delete('/:itemId', cors(corsSetup), function(req,res){
  var index = parseInt(req.params.itemId);
  if(items.hasOwnProperty(index)){
    delete items[index];
    res.json({message:"Deletion successful."})
  }
  else{
    res.json({message:"Item does not exist."});
  }  
});

router.options("/*", cors(corsSetup));

module.exports = router;