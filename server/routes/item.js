var express = require('express');
var router = express.Router();
var cors = require('cors');

var items = {
  1: { id: 1, user_id: "User1", description: "My cat",
  lat: 18.684, lon: 148.394, keywords: ["cat","kitten"]
}
};

/* CORS setup */
var corsSetupGeneral = {
  origin: '*',
  methods: 'GET,POST,OPTIONS',
  allowedHeaders: 'Content-Type'
}
var corsSetupSpecific = {
  origin: '*',
  methods: 'GET,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type'
}

/* GET all items */
router.get('/', cors(corsSetupGeneral), function(req, res){
  if(Object.keys(items).length == 0){
    res.status(204).json({message:"No available items."});
  }
  else{
    res.json(items);
  }
});

/* GET a specific item */
router.get('/:itemId', cors(corsSetupSpecific), function(req, res){
  if(Object.keys(items).length == 0){
    res.status(204).json({message:"No available items."});
  }
  else{
    var key = parseInt(req.params.itemId);
    if(items.hasOwnProperty(key)){
      var item = items[key];
      res.json(item);
    }
    else{
      res.status(404).json({message:"Item does not exist."});
    }
  }
});

/* POST a new item */
router.post('/', cors(corsSetupGeneral), function(req, res){
  var maxIndex = Math.max.apply(null,Object.keys(items));
  var newID = maxIndex + 1;
  var body = req.body;
  console.log(body);
  var required = ["user_id","description","lat","lon","keywords"];
  if((Object.keys(body)).every(i => required.includes(i))){
    items[newID] = {
      id:newID,
      user_id: req.body.user_id,
      description: req.body.description,
      lat: req.body.lat,
      lon: req.body.lon,
      keywords: req.body.keywords
    };
    if(items.hasOwnProperty(newID)){
      res.status(201).json(items[newID]);
    }
  }
  else{
    res.status(405).json({message:"Post unsuccessful."})
  }
  

});

/* DELETE a specific item */
router.delete('/:itemId', cors(corsSetupSpecific), function(req,res){
  var index = parseInt(req.params.itemId);
  if(items.hasOwnProperty(index)){
    delete items[index];
    res.status(204).json({message:"Deletion successful."})
  }
  else{
    res.json({message:"Item does not exist."});
  }  
});

/* OPTIONS request */
router.options("/", cors(corsSetupGeneral));
router.options("/:itemId", cors(corsSetupSpecific));

module.exports = router;