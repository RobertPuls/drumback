var express = require('express');
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

module.exports = router;
