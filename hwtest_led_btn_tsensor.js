var ws281x = require('rpi-ws281x-native');
var sensor = require('ds18x20');
var gpio = require('rpi-gpio');

// ---- trap the SIGINT and reset before exit
process.on('SIGINT', function () {
  ws281x.reset();
  gpio.destroy();
  process.nextTick(function () { process.exit(0); });
});
console.log('Press <ctrl>+C to exit.');


// button

gpio.on('change', function(channel, value) {
	console.log('Channel ' + channel + ' value is now ' + value);
});
gpio.setMode('mode_bcm');
gpio.setup(21, gpio.DIR_IN, gpio.EDGE_BOTH);

// ---- sensor
var isLoaded = sensor.isDriverLoaded();
console.log(isLoaded);

var listOfDeviceIds = sensor.list();
console.log(listOfDeviceIds);


setInterval(function () {
	var tempObj = sensor.getAll();
	console.log(tempObj);
}, 1000);

// ---- led 
var NUM_LEDS = parseInt(process.argv[2], 10) || 136,
    pixelData = new Uint32Array(NUM_LEDS);

ws281x.init(NUM_LEDS);

var offset = 0;
setInterval(function () {
  var i=NUM_LEDS;
  while(i--) {
      pixelData[i] = 0;
  }
  pixelData[offset] = 0xffffff;

  offset = (offset + 1) % NUM_LEDS;
  ws281x.render(pixelData);
}, 100);

