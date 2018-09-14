const express = require('express');
const router = express.Router();

const Producto = require('../models/producto');

//GET all products
router.get('/', (req, res, next) => {

  Producto.find().then(result => {
    res.status(200).send(result)
  }).catch(err => {
    res.status(500).send();
  });
});

//POST a new product
router.post('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling POST requests to /productos'
  });
});


module.exports = router;