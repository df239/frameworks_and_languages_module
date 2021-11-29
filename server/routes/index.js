var express = require('express');
var router = express.Router();
var cors = require('cors');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var corsOptions = {
  origin: '*',
  methods: 'GET,POST,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type',
  optionsSuccessStatus: 204
}
router.options('/', cors(corsOptions));

module.exports = router;
