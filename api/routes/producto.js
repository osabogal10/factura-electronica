const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Producto = require('../models/producto');

//GET all products
router.get('/', (req, res, next) => {

  Producto.find()
  .exec()
  .then(docs => {

    res.status(200).json(docs);    
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });

});

//GET product by id
router.get('/:idProducto', (req, res, next) => {
  const idProducto = req.params.idProducto;

  Producto.findById(idProducto)
  .exec()
  .then(doc => {
    console.log(doc);
    if(doc) {
      res.status(200).json(doc);
    } else {
      res.status(404).json({message: "No se encontró producto con ese id"});
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
});


//POST a new product
//Recibe nombre, descripción y precio
router.post('/', (req, res, next) => {
  let pNombre = req.body.nombre;
  let pDescripcion = req.body.descripcion;
  let pPrecio = req.body.precio;

  let nuevo = new Producto({
    _id: new mongoose.Types.ObjectId(),
    nombre: pNombre,
    descripcion: pDescripcion,
    precio: pPrecio
  });

  nuevo.save().then((result) => {
    console.log(result);
    res.status(201).json({
      message: 'Producto creado exitosamente',
      createdProduct: result
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
  
});


//UPDATE product
router.patch('/:idProducto', (req, res, next) => {
  let idProducto = req.params.idProducto;
  let pNombre = req.body.nombre;
  let pDescripcion = req.body.descripcion;
  let pPrecio = req.body.precio;

  const updateOps = {
    nombre: pNombre,
    descripcion: pDescripcion,
    precion: pPrecio
  };

  Producto.update({_id: idProducto}, { $set: updateOps }).exec()
  .then(result => {
    console.log(result);
    res.status(200).json(result);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  }); 
});


//DELETE product 
router.delete('/:idProducto', (req, res, next) => {
  let idProducto = req.params.idProducto;
  Producto.remove({_id: idProducto}).exec()
  .then(result => {
    res.status(200).json(result);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });

});


module.exports = router;