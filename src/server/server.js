var express = require('express');
var path = require('path');
var http = require("http");
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var discussion = require('./routes/discussionForum');
const { BASE_REPORT_URL } = require('./config/constants');
var session = require('express-session');
const {DMW_SESSION_SECRET_KEY, DMW_SESSION_TTL}  = require('./config/environment');

var app = express();
const PORT = 3000;
const DIST_PATH = '/dist/';

app.set("port", PORT);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(session({
  secret: DMW_SESSION_SECRET_KEY,
  resave: true,
  cookie: {
    maxAge: DMW_SESSION_TTL
  },
  saveUninitialized: false,
  store: new session.MemoryStore()
}))


app.use(BASE_REPORT_URL, discussion);

app.get(`${BASE_REPORT_URL}/health`, (req, res) => {
  res.send({message: "Health Response"})
});


app.use(express.static(path.join(__dirname, DIST_PATH)));
app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname,  DIST_PATH +"index.html"))
});

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
  res.send(err);
});


http.createServer(app).listen(app.get("port"), PORT, () => console.log('Server running on port: ', PORT));
