var express = require('express');
var router = express.Router();
var cors = require('cors');

//include the items dictionary from itemsObject.js, so that it can be modified by HTTP requests
var items = require('/app/itemsObject.js');

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

/* GET a specific item */
router.get('/:itemId', cors(corsSetupSpecific), function(req, res){
  //check if there are any items stored rith now
  if(Object.keys(items).length == 0){
    res.status(204).json({message:"No available items."});
  }
  else{
    //find if the provided ID appears in the items dictionary
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
  //find max ID and add 1 to it to create ID for the new item
  var maxIndex = Math.max.apply(null,Object.keys(items));
  var newID = maxIndex + 1;
  var body = req.body;
  console.log(body);
  var required = ["user_id","description","lat","lon","keywords"];
  //check if all required parameters for the new item are present
  if (required.every(i => (Object.keys(body)).includes(i))){
    items[newID] = {
      id:newID,
      user_id: req.body.user_id,
      description: req.body.description,
      image: req.body.image,
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
    res.status(201).json({message:"Deletion successful."})
  }
  else{
    res.status(404).json({message:"Item does not exist."});
  }  
});

/* OPTIONS request */
router.options("/", cors(corsSetupGeneral));
router.options("/:itemId", cors(corsSetupSpecific));

module.exports = router;