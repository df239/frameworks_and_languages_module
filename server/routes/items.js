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

/* GET all items */
router.get('/', cors(corsSetupGeneral), function(req, res){
  //copy data from the items dictionary into a temporary array
  arr = []
  for (let value of Object.values(items)) {
    arr.push(value);
  }
  if(Object.keys(arr).length == 0){
    res.status(204).json({message:"No available items."});
  }
  else{
    //get filters from the query string
    var filters = req.query;
    if (filters == null || filters.length == 0){
      res.status(200).json(arr);
    }
    else{
      //filter all items based on the filters from the query string
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