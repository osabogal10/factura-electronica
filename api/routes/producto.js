const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

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
  let pNombre = req.body.nombre;
  let pDescripcion = req.body.descripcion;
  let pPrecio = req.body.precio;

  let nuevo = new Producto({
    _id: new mongoose.Types.ObjectId,
    nombre: pNombre,
    descripcion: pDescripcion,
    precio: pPrecio
  });

  res.status(201).json({
    message: 'Handling POST requests to /productos',
    createdProduct: nuevo
  });
});

//DELETE product 
router.delete('/:idProducto', (req, res, next) => {
  let idProducto = req.params.idProducto;
  res.status(200).json({
    message: 'Producto deleted',
    idProducto: idProducto
  });
});


module.exports = router;