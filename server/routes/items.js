var express = require('express');
var router = express.Router();
var cors = require('cors');

var items = require('/app/itemsObject.js');

/* CORS setup */
var corsSetupGeneral = {
    origin: '*',
    methods: 'GET,POST,OPTIONS',
    allowedHeaders: 'Content-Type'
}

/* GET all items */
router.get('/', cors(corsSetupGeneral), function(req, res){
  arr = []
  for (let [key, value] of Object.entries(items)) {
    arr.push(value);
  }
  if(Object.keys(arr).length == 0){
    res.status(204).json({message:"No available items."});
  }
  else{
    var filters = req.query;
    if (filters == null || filters.length == 0){
      res.status(200).json(arr);
    }
    else{
      let filtered = arr.filter(function(item){
        for (let [key,value] of Object.entries(filters)){
          if (item[key] != value){
            return false;
          }
        }
        return true;
      });
      res.status(200).json(filtered);
    }
  }
});

module.exports = router;