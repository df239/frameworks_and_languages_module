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
    for (const [key, value] of Object.entries(items)) {
        arr.push(value);
    }
    if(Object.keys(arr).length == 0){
      res.status(204).json({message:"No available items."});
    }
    else{
      res.status(200).json(arr);
    }
});

module.exports = router;