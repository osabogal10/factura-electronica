const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Orden = require('../models/orden');
const Factura = require('../models/factura');
const Producto = require('../models/producto');

//GET all facturas
router.get('/', (req, res, next) => {

  Factura.find()
  .exec()
  .then(docs => {

    res.status(200).json(docs);    
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  })
});

//GET by Id
router.get('/:idFactura', (req, res, next) => {
  const idFactura = req.params.idFactura;

  Factura.findById(idFactura)
  .exec()
  .then(doc => {
    console.log(doc);
    if(doc) {
      res.status(200).json(doc);
    } else {
      res.status(404).json({message: "No se encontró factura con ese id"});
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
});

//POST a new factura
// Recibe nombreCliente, cedulaCliente, arreglo de Ordenes
router.post('/', (req, res, next) => {
  let pNombreCliente = req.body.nombreCliente;
  let pCedulaCliente = req.body.cedulaCliente;
  let pOrdenes = req.body.ordenes;

  console.log(pOrdenes);
  let nuevasOrdenes = [];  
  let total = 0;


  Producto.find()
  .exec()
  .then(docs => {

    pOrdenes.forEach(element => {

      for (let prod of docs) {
        if(String(element.producto) === String(prod._id)) {
          total += (element.cantidad * prod.precio)
          console.log(total);
        }
      }

      const nuevaOrden = new Orden({
        producto: element.producto,
        cantidad: element.cantidad
      });

      nuevasOrdenes.push(nuevaOrden);
    });

    let nuevo = new Factura({
      _id: new mongoose.Types.ObjectId(),
      nombreCliente: pNombreCliente,
      cedulaCliente: pCedulaCliente,
      ordenes: nuevasOrdenes,
      total: total
    });
  
    nuevo.save().then((result) => {
      console.log(result);
      res.status(201).json({
        message: 'Factura creada exitosamente',
        createdFactura: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });
   
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
});


//UPDATE factura
router.patch('/:idFactura', (req, res, next) => {
  let idFactura = req.params.idFactura;
  let pNombreCliente = req.body.nombreCliente
  let pCedulaCliente = req.body.cedulaCliente;
  let pOrdenes = req.body.ordenes;

  console.log(pOrdenes);
  let nuevasOrdenes = [];  
  let total = 0;

  Producto.find()
  .exec()
  .then(docs => {

    pOrdenes.forEach(element => {

      for (let prod of docs) {
        if(String(element.producto) === String(prod._id)) {
          total += (element.cantidad * prod.precio)
          console.log(total);
        }
      }

      const nuevaOrden = new Orden({
        producto: element.producto,
        cantidad: element.cantidad
      });

      nuevasOrdenes.push(nuevaOrden);
    });

    const updateOps = {
      nombreCliente: pNombreCliente,
      cedulaCliente: pCedulaCliente,
      ordenes: nuevasOrdenes,
      total: total
    };

    Factura.update({_id: idFactura}, { $set: updateOps }).exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    }); 
  });

});


//DELETE factura 
router.delete('/:idFactura', (req, res, next) => {
  let idFactura = req.params.idFactura;
  Factura.remove({_id: idFactura}).exec()
  .then(result => {
    res.status(200).json(result);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: err});
  });
});

module.exports = router;