var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const routes = require("./routes");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cors());

var Gpio = require('pigpio').Gpio;
var router = express.Router();

var motor = new Gpio(4, {
  mode: Gpio.OUTPUT
});
var arr = [1, 1, 0, 1, 1];
var pulseWidth = 500;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function test() {
  if (arr[i] == 1) {
    motor.servoWrite(pulseWidth);
    await sleep(100);
    pulseWidth = 1000;

    motor.servoWrite(pulseWidth);
    await sleep(100);
    pulseWidth = 500;
  } else {
    await sleep(200);
  }
}

router.get('/', function(req, res, next) {
  console.log("HEY LISTEN")
  test();
});

// app.use("/", routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get("env") === "development" ? err : {}
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("ready");
});

module.exports = app;
