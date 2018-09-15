const Producto = require('../api/models/producto');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/facturaelectronica');

var product = new Producto({
    _id: new mongoose.Types.ObjectId(),
    nombre: 'Tratamiento Urgencia',
    descripcion: 'Se realizó un tratamiento de urgencia',
    precio: 350000
});

product.save(() => {
    mongoose.disconnect();
});

