
var gpio = require('rpi-gpio');

// ---- trap the SIGINT and reset before exit
process.on('SIGINT', function () {
  gpio.destroy();
  process.nextTick(function () { process.exit(0); });
});
console.log('Press <ctrl>+C to exit.');



gpio.on('change', function(channel, value) {
	console.log('Channel ' + channel + ' value is now ' + value);
});
gpio.setMode('mode_bcm');
gpio.setup(21, gpio.DIR_IN, gpio.EDGE_BOTH);




