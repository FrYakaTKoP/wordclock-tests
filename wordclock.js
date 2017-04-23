var ws281x = require('rpi-ws281x-native'),
	time = require('time');
	
var NUM_LEDS = 136;
	
var staticLeds = [[23,24],  [18,21]] // äs, isch 
var minutesLeds = [[13,16], [25,27], [28,34], [43,48], [49,53]] // foif, zäh, viertel, zwänzg, halbi
var modLeds = [[37,39], [40,41]] // vor,ab 
var hoursLeds = [[118, 120], [73,76], [77,80], [92,96], [55,59], [97,102], [85,90], [103,107], [114,117], [109,113], [81,84], [121,126]] // eis, zwei, drüh, vieri,foifi,sächsi,siebni,achti,nüni,zähni,elfi,zwölfi
	
	
var now = new time.Date();


ws281x.init(NUM_LEDS);

parseTime(getTime());
var loop = setInterval(function(){
  parseTime(getTime());
}, 20000)


function parseTime(time) {
  // Because we're calling currentTime and it returns an array of hour/minute - it is expected that parseTime will receive an array.
  // [hour, minute]
  var hour = time[0]
  var minute = time[1]

  var currentWords = []

  // Turn on 'IT IS'
  currentWords.push(staticLeds[0], staticLeds[1])

  // Find out if we need to display to the hour, past the hour, or O'Clock.
  if (minute == 0) {
	  // nop
  } else if (minute <= 20) { 
    currentWords.push(modLeds[1])
  } else if (minute > 35) {
    currentWords.push(modLeds[0])
    // We're now 'to' the hour, so increment the hour
    hour++
  }

  // Must be a better way to do this than persistent if-elses.
  // Correspond minute to appropriate word
  if (minute == 5 || minute == 55) {
    currentWords.push(minutesLeds[0])
  } else if (minute == 10 || minute == 50) {
    currentWords.push(minutesLeds[1])
  } else if (minute == 15 || minute == 45) {
    currentWords.push(minutesLeds[2])
  } else if (minute == 20 || minute == 40) {
    currentWords.push(minutesLeds[3])
  } else if (minute == 25 || minute == 35) {
    currentWords.push(minutesLeds[3], minutesLeds[0])
  } else if (minute == 30) {
    currentWords.push(minutesLeds[4])
  }

  // We need to parse the hour too. Tedious.
  if (hour == 0 || hour == 12 || hour == 24) { // Hour '24' so that we display 'TWELVE' after 23:30
      currentWords.push(hoursLeds[11])
  } else if (hour == 1 || hour == 13) {
      currentWords.push(hoursLeds[0])
  } else if (hour == 2 || hour == 14) {
      currentWords.push(hoursLeds[1])
  } else if (hour == 3 || hour == 15) {
      currentWords.push(hoursLeds[2])
  } else if (hour == 4 || hour == 16) {
      currentWords.push(hoursLeds[3])
  } else if (hour == 5 || hour == 17) {
      currentWords.push(hoursLeds[4])
  } else if (hour == 6 || hour == 18) {
      currentWords.push(hoursLeds[5])
  } else if (hour == 7 || hour == 19) {
      currentWords.push(hoursLeds[6])
  } else if (hour == 8 || hour == 20) {
      currentWords.push(hoursLeds[7])
  } else if (hour == 9 || hour == 21) {
      currentWords.push(hoursLeds[8])
  } else if (hour == 10 || hour == 22) {
      currentWords.push(hoursLeds[9])
  } else if (hour == 11 || hour == 23) {
      currentWords.push(hoursLeds[10])
  }

  // Let's turn the leds on
  turnOnLeds(currentWords)
}

function turnOnLeds(words) {
  // When turnonLeds is called it will receive an array of all the
  // leds corresponding with words to be lit

  // Turn on all not-in-use LEDs as a 'background' - uncomment below to enable
  //for (var i=0; i<NUM_LEDS; i++) {
  //  pixelData[i] = rgb2Int(50, 50, 100)
  //}
  
 var pixelData = new Uint32Array(NUM_LEDS)
  
  // Turn on the leds given in an array.
  var l = words.length
  for (var i=0; i<l; i++) {
    // For each word in the array
    var beginLed = words[i][0]
    var endLed = words[i][1]
    for (var q = beginLed; q <= endLed; q++) {
      // We've named the pixels as index-1, but we're using an array which is index-0 and so we need to adjust
	  pixelData[q-1] = rgb2Int(255, 255, 255)
    }
  }
  
  // Render to the strip
  ws281x.render(pixelData)

}

function getTime() {
  // Get the current time.
  var currentTime = new Date()
  //console.log(currentTime)
  var hour = currentTime.getHours()
  var minute = currentTime.getMinutes()

  //console.log("Time in hours: " + hour + ". Time in minutes: " + minute + ".")

  // Round to the nearest five minutes.
  var coeff = 1000 * 60 * 5; // Five minutes in ms
  var rounded = new Date(Math.round(currentTime.getTime() / coeff) * coeff) // Magic

  //console.log("Current hours: " + rounded.getHours() + ". Current minutes: " + rounded.getMinutes())

  return [rounded.getHours(), rounded.getMinutes()]

}

// This is taken from the rainbow.js example in rpi-ws281x-native
function rgb2Int(r, g, b) {
  return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);
}
  

function getRndColor() {
    var r = 255*Math.random()|0,
        g = 255*Math.random()|0,
        b = 255*Math.random()|0;
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

// ---- trap the SIGINT and reset before exit
process.on('SIGINT', function () {
  ws281x.reset();
  process.nextTick(function () { process.exit(0); });
});
console.log('Press <ctrl>+C to exit.');

