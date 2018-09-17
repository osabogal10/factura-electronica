const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

//Paths
const indexRouter = require('./routes/index');
const productoRouter = require('./api/routes/producto.js');
const facturaRouter = require('./api/routes/factura.js');
const usuarioRouter = require('./api/routes/usuario.js');

const app = express();

//Database connection
// mongoose.connect('mongodb://localhost:27017/facturaelectronica');
mongoose.connect('mongodb://usuarioFactura:clavesecreta123@ds125041.mlab.com:25041/facturaelectronica');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Fixing CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'front/build')));


//Define Routers
app.use('/', indexRouter);
app.use('/productos', productoRouter);
app.use('/facturas', facturaRouter);
app.use('/usuarios', usuarioRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
