/**
 * Thư viện cần thiết
 */


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors =require('cors');
const hbs = require('hbs');
require('dotenv').config();
const session = require('express-session');
const mongoose = require('mongoose');
require('./models/userModel');
require('./models/categoryModel');
require('./models/productModel');
/**
 * Khởi tạo app
 */
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.JWT_SECRET_KEY,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true }
}))
mongoose.connect(process.env.MONGODB_KEY, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('>>>>>>>>>>>>>>>DB Connected<<<<<<<<<<<<<<'))
  .catch(err => console.log('>>>>>>>>>>DB Error: ', err))


  app.use(cors());
/**
 * HBS
 * */
hbs.registerHelper('soThuTu', function (a, b) {
  return a + 1;
})
hbs.registerHelper('formatDate', function (a, type, b) {
  let date = new Date(a);
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  month = month.toString().length === 1 ? '0' + month : month;
  let day = date.getDate().toString().length === 1 ? '0' + date.getDate().toString() : date.getDate().toString();
  if (type == 1) {
    return day + '-' + month + '-' + year;
  }
  return year + '-' + month + '-' + day;

})
hbs.registerHelper('getCategoryName', function (_id, categories, b) {
  const category = categories.filter(c => c._id.toString() === _id.toString())[0];
  return category?.name;
})

hbs.registerHelper('compareCategory', function (_id, id, b) {
  return _id.toString() === id.toString();
})
/**
 * Routing,định tuyến
 */
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var indexAPIRouter = require('./routes/index_api');
var productAPIRouter = require('./routes/index_api');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/san-pham', productsRouter);
app.use('/api-index', indexAPIRouter);
app.use('/api-product', productAPIRouter);









// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
