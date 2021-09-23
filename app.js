var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('./config/passport');
const session = require('express-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bicicletasRouter = require('./routes/bicicletas');
var bicicletasAPIRouter = require('./routes/api/bicicletas.js')
var UsuarioAPIRouter = require('./routes/api/usuarios.js')
var usuariosRouter = require('./routes/usuarios.js')
var tokenRouter = require('./routes/TokenC.js')

const Usuario = require('./models/usuario');
const Token = require('./models/Token');

const store = new session.MemoryStore;

var app = express();
app.use(session({
  cookie: {maxAge: 240*60*60*1000},
  store: store,
  saveUninitialized: true,
  reaseve:'true',
  secret: 'red_bicis_!!***__123980abc.p'
}))
var mongoose = require('mongoose');
const { token } = require('morgan');

var mongoDB = 'mongodb://localhost/red_bicicletas';
mongoose.connect(mongoDB, {useNewUrlParser:true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb connectio error: '))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/login', (req, res)=>{
  res.render('session/login')
})

app.post('/login', (req, res, next)=>{
  passport.authenticate('local', (err,usuario, info)=>{
    if(err) return next(err);
    if(!usuario) return res.render('session/login', {info: info});
    req.logIn(usuario, (err)=>{
      if(err) return next(err);
      return res.redirect('/')
    });
  })(req, res, next);
})

app.get('/logout', (req, res)=>{
  req.logout();
  res.redirect('/')
})

app.get('/forgotPassword', (req, res)=>{
  res.render('session/forgotPassword');
});

app.post('/forgotPassword', (req, res, next)=>{
  Usuario.findOne({email: req.body.email }, (err, usuario)=>{
    if (!usuario) return res.render('session/forgotPassword', { info: {message: 'No existe el email para un usuario existente.'}});

    usuario.resetPassword((err)=>{
      if(err) next(err);
      console.log('session/forgotPasswordMessage');
    });

    res.render('session/forgotPasswordMessage')
  })
});

app.get('/resetPassword/:token', (req, res, next)=>{
  token.findOne({token:req.params.token}, (err, token)=>{
    if (!token) return res.status(400).send({ type: 'not-verified', msg: 'No existe un usuario asociado al token. Verifique que su token no haya expirado.'});

    Usuario.findById(token._userId, (err, usuario) => {
      if(!usuario) return res.status(400).send({msg: 'No existe un usuario asociado al token'});
      res.render('session/resetPassword', {errors:{}, usuario:usuario});
    })
  })
})


app.post('/resetPassword', function(req, res){
  if(req.body.password != req.body.confirm_password) {
    res.render('session/resetPassword', {errors: {confirm_password: { message: 'no coincide el password ingresado'}}, usuario: new Usuario({email: req.body.email})});
    return;
  }
  Usuario.findOne({ email: req.body.email }, function (err, usuario) {
    usuario.password = req.body.password;
    usuario.save(function(err){
      if (err) {
        res.render('session/resetPassword', {errors: err.errors, usuario: new Usuario({email: req.body.email})});
      }else{
        res.redirect('/login');
      }});
  });
});


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/bicicletas', loggedIn, bicicletasRouter);
app.use('/api/bicicletas', bicicletasAPIRouter);
app.use('/api/usuarios', UsuarioAPIRouter);
app.use('/usuarios', usuariosRouter)
app.use('/token', tokenRouter)

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

function loggedIn(req, res, next) {
  if(req.user) next();
  else{
    console.log('user sin loguearse');
    res.redirect('/login');
  }
};


module.exports = app;
