// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;

const openIdClient = require("openid-client");
const process = require("process");
const axios = require("axios");
const url = "https://api.fusionfabric.cloud/corporate/profile/me/v1/beneficiaries";
const discover =  openIdClient.Issuer.discover(process.env.AUTHORIZATION_WELLKNOWN);
discover.then(async (issuer) => {
  const client = new issuer.Client({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET
  })
  const token = await client.grant({
    grant_type: "client_credentials",
    scope: "openid"
  })
  // console.log(token);
  const instance =  axios.create({
    timeout: 8000,
    headers: {Authorization: "Bearer " + token.access_token}
  });
  const response = await instance.get(url);
  // console.log(response);
  // response.data.currencies.forEach(e => console.log(e.name))
}).catch(err => console.log('not working', err))