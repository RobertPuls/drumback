var express = require('express');
var Gpio = require('pigpio').Gpio;
var router = express.Router();

var motor = new Gpio(4, {
  mode: Gpio.OUTPUT
});
var motor1 = new Gpio(2, {
  mode: Gpio.OUTPUT
});
var pulseWidth = 500;
var play = true;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function alternate(arr) {
  for (let i = 0; play = true; i++) {
    console.log("arr", arr[0][i]);
    if (arr[0][i] == 1) {
      motor.servoWrite(pulseWidth);
      await sleep(75);
      pulseWidth = 1000;

      motor.servoWrite(pulseWidth);
      await sleep(75);
      pulseWidth = 500;
    } else {
      await sleep(150);
    }

    if (arr[1][i] == 1) {
      motor1.servoWrite(pulseWidth);
      await sleep(75);
      pulseWidth = 1000;

      motor1.servoWrite(pulseWidth);
      await sleep(75);
      pulseWidth = 500;
    } else {
      await sleep(150);
    }

  }
}

async function right() {
  motor.servoWrite(pulseWidth);
  await sleep(75);
  pulseWidth = 1000;

  motor.servoWrite(pulseWidth);
  await sleep(75);
  pulseWidth = 500;
}

async function left() {
  motor1.servoWrite(pulseWidth);
  await sleep(75);
  pulseWidth = 1000;

  motor1.servoWrite(pulseWidth);
  await sleep(75);
  pulseWidth = 500;
}

router.post('/', function(req, res, next) {
  console.log(req.body.pattern);
  alternate(req.body.pattern).then(() => {
    res.json({
      "message": "did it"
    });
  });
});

router.post('/stop', function(req, res, next) {
  play = false;
  res.json({
    "message": "did it"
  });
});

router.post('/right', function(req, res, next) {
  console.log(req.body.pattern);
  right().then(() => {
    res.json({
      "message": "did it"
    });
  });
});

router.post('/left', function(req, res, next) {
  console.log(req.body.pattern);
  left().then(() => {
    res.json({
      "message": "did it"
    });
  });
});

module.exports = router;
