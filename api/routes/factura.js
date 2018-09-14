const express = require('express');
const router = express.Router();

const Factura = require('../models/factura');

//GET all facturas
router.get('/', (req, res, next) => {

  Factura.find().then(result => {
    res.status(200).send(result)
  }).catch(err => {
    res.status(500).send();
    console.log(err);
  });
});

//GET by Id
router.get('/:idFactura', (req, res, next) => {
  let idFactura = req.params.idFactura;
  res.status(200).json({
    message: 'Factura Details',
    idFactura: idFactura
  });
});

//POST a new factura
router.post('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling POST requests to /facturas'
  });
});

//DELETE factura 
router.delete('/:idFactura', (req, res, next) => {
  let idFactura = req.params.idFactura;
  res.status(200).json({
    message: 'Factura deleted',
    idFactura: idFactura
  });
});

module.exports = router;