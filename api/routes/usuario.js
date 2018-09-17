const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');

const Orden = require('../models/orden');
const Factura = require('../models/factura');
const Producto = require('../models/producto');
const Usuario = require('../models/usuario');

//Registrarse
router.post('/signup', (req, res, next) => {
  
  Usuario.find({email: req.body.email})
    .exec()
    .then(user => {
      if(user.length >= 1) {
        return res.status(409).json({message: 'Mail already exists'});
      } else {
        const nuevoUsuario = new Usuario({
          _id: new mongoose.Types.ObjectId(),
          nombre: req.body.nombre,
          email: req.body.email,
          password: req.body.password
        });
      
        nuevoUsuario.save().then((result) => {
          console.log(result);
          res.status(201).json({
            message: 'Usuario creado exitosamente',
            createdUser: result
          });
        })
          .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
          });

      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });

});

//Iniciar Sesión
router.post('/login', (req, res, next) => {
  Usuario.find({email: req.body.email})
    .exec()
    .then(user => {
      if(user.length < 1) {
        return res.status(401).json({
          message: 'Error en el correo o la contraseña'
        });
      }

      if(user[0].password === req.body.password) {
        const token = jwt.sign(
          {
            email: user[0].email,
            idUsuario: user[0]._id
          },
          //Secreto para el token!
          'Secret',
          {
            expiresIn: '1h'
          }
        );


        return res.status(200).json({
          message: 'Autenticación Exitosa',
          token: token,
          idUsuario: user[0]._id
        });
      } else {
        return res.status(401).json({
          message: 'Error en el correo o la contraseña'
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err}); 
    });


});

//Borrar cuenta
router.delete('/:idUsuario', (req, res, next) => {
  let idUsuario = req.params.idUsuario;
  Usuario.remove({_id: idUsuario}).exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err}); 
    });

});


//SERVICIOS PARA LOS PRODUCTOS DE UN USUARIO


//Get productos del usuario
router.get('/:idUsuario/productos', checkAuth, (req, res, next) => {
  const idUsuario = req.params.idUsuario;
  console.log(idUsuario);
  Usuario.findById(idUsuario)
    .populate('productos')
    .exec()
    .then(doc => {
      console.log(doc);
      if(doc) {
        const productosUsuario = doc.productos;
        res.status(200).json(productosUsuario);
      } else {
        res.status(404).json({message: 'No se encontraron productos'});
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });
});

//Crear producto para usuario
router.post('/:idUsuario/productos', checkAuth, (req, res, next) => {
  let pNombre = req.body.nombre;
  let pDescripcion = req.body.descripcion;
  let pPrecio = req.body.precio;

  let nuevo = new Producto({
    _id: new mongoose.Types.ObjectId(),
    nombre: pNombre,
    descripcion: pDescripcion,
    precio: pPrecio
  });

  nuevo.save();

  Usuario.update({_id: req.params.idUsuario}, {$push: {productos: nuevo}}).exec()
    .then(doc => {
      res.status(200).json({
        message: 'Producto creado exitosamente',
        result: doc
      });
    });


});


//Borrar producto para usuario
router.delete('/:idUsuario/productos/:idProducto', checkAuth, (req, res, next) => {
  let idProducto = req.params.idProducto;
  Producto.remove({_id: idProducto}).exec()
    .then()
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });

  Usuario.update({_id: req.params.idUsuario}, {$pull: {productos: {_id: idProducto}}}).exec()
    .then(doc => {
      res.status(200).json({
        message: 'Producto eliminado exitosamente',
        result: doc
      });
    });

});


//SERVICIOS PARA FACTURAS DE UN USUARIO

//Get facturas de un usuario
router.get('/:idUsuario/facturas', checkAuth, (req, res, next) => {
  const idUsuario = req.params.idUsuario;

  Usuario.findById(idUsuario)
    .populate({path: 'facturas', populate: {path: 'ordenes.producto'}})
    .exec()
    .then(doc => {
      console.log('Primer populateeeeeeee ', doc);
      if(doc) {
        const facturasUsuario = doc.facturas;
        res.status(200).json(facturasUsuario);
      } else {
        res.status(404).json({message: 'No se encontraron facturas'});
      }  
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });
});

//Get factura con id idFactura de un usuario
router.get('/:idUsuario/facturas/:idFactura', checkAuth, (req, res, next) => {
  const idUsuario = req.params.idUsuario;
  const idFactura = req.params.idFactura;

  Usuario.findById(idUsuario)
    .populate({path: 'facturas', populate: {path: 'ordenes.producto'}})
    .exec()
    .then(doc => {
      console.log('Primer populateeeeeeee ', doc);
      if(doc) {
        const facturasUsuario = doc.facturas;
        let result = facturasUsuario.filter(obj => String(obj._id)===String(idFactura));
        res.status(200).json(result[0]);
      } else {
        res.status(404).json({message: 'No se encontraron facturas'});
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });
});

//Crear factura para usuario
router.post('/:idUsuario/facturas', checkAuth, (req, res, next) => {
  let pNombreCliente = req.body.nombreCliente;
  let pCedulaCliente = req.body.cedulaCliente;
  let pFecha = req.body.fecha;
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
            total += (element.cantidad * prod.precio);
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
        fecha: pFecha,
        ordenes: nuevasOrdenes,
        total: total
      });
    
      nuevo.save();

      Usuario.update({_id: req.params.idUsuario}, {$push: {facturas: nuevo}}).exec()
        .then(doc => {
          res.status(200).json({
            message: 'Factura creada exitosamente',
            result: doc
          });
        });

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });


});


//Borrar factura para un usuario
router.delete('/:idUsuario/facturas/:idFactura', checkAuth, (req, res, next) => {
  let idFactura = req.params.idFactura;
  Factura.remove({_id: idFactura}).exec()
    .then()
    .catch(err => {
      console.log(err);
      res.status(500).json({error: err});
    });

  Usuario.update({_id: req.params.idUsuario}, {$pull: {facturas: {_id: idFactura}}}).exec()
    .then(doc => {
      res.status(200).json({
        message: 'Factura eliminada exitosamente',
        result: doc
      });
    });

});



module.exports = router;