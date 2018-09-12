const express = require('express');
const router = express.Router();

const Producto = require('../models/producto');

router.get('/', (req, res, next) => {

  Producto.find().then(result => {
    res.status(200).send(result)
  }).catch(err => {
    res.status(500).send();
  });
});

module.exports = router;