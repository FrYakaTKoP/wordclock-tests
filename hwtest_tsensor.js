var sensor = require('ds18x20');

// ---- trap the SIGINT and reset before exit
process.on('SIGINT', function () {
  process.nextTick(function () { process.exit(0); });
});
console.log('Press <ctrl>+C to exit.');


// ---- sensor
var isLoaded = sensor.isDriverLoaded();
console.log(isLoaded);

var listOfDeviceIds = sensor.list();
console.log(listOfDeviceIds);


setInterval(function () {
	var tempObj = sensor.getAll();
	console.log(tempObj);
}, 1000);

