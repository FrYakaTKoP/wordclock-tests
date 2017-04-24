var ws281x = require('rpi-ws281x-native'),
	time = require('time');
	
var NUM_LEDS = 136;



// define when the clock change to next hour 'foif vor halbi nüni '
var changeToNextHour = "25";

var staticWords = [
	[23, 24], // äs
	[18, 21] // isch
];


var hourWords = [
  [118, 120], // eis
  [73, 76], // zwei
  [77, 80], // drüh
  [92, 96], // vieri
  [55, 59], // foifi
  [97, 102], // sächsi
  [85, 90], // siebni
  [103, 107], // achti
  [114, 117], // nüni
  [109, 113], // zähni
  [81, 84], // elfi
  [121, 126] //zwölfi
];

var miscWords = [
  [13, 16], // foif
  [25, 27], // zäh
  [28, 34], // viertel
  [43, 48], // zwänzg
  [49, 53], // halbi
  [37, 39], // vor
  [40, 41] // ab
];

var minuteSentences = {
  '0':[]
  '5': [0, 6], 
  '10': [1, 6],
  '15': [2, 6],
  '20': [3, 6],
  '25': [0, 4, 5],
  '30': [4],
  '35': [0, 4, 6],
  '40': [3, 5],
  '45': [2, 5],
  '50': [1, 5],
  '55': [0, 5]
};

var minutePixels = getSentencesPixels(minuteSentences, miscWords);
var staticPixels = getWordsPixels(staticWords);
var hourPixels = getWordsPixels(hourWords);
var singlePixels = [133,134,135,136];

ws281x.init(NUM_LEDS);


// start
main();
var loop = setInterval(function(){
  main();
}, 20000)

function main() {
	showClock(minutePixels,staticPixels,hourPixels,singlePixels);
}

function showClock(minutePixels,staticPixels,hourPixels,singlePixels) {
	// Get time
	var time = new Date();  
	var hour = time.getHours();
	var minute = time.getMinutes();
	var minuteExact = minute; 
	//console.log(hour+':'+minute);
  
	// change to next our if needed 
	if (minute > changeToNextHour) {
		hour++;
	}
	
	// correct 'foif ab null'
	if(hour == 0) {
		hour = 12;
	}
  	
	// start build the pixel array
	pixels = new Array;
	
	 // Turn on static words
	if(hour > 12) {
		hour = hour - 12;
	}

	// floor to five minutes
	if(minute % 5 != 0) {
		while(minute % 5 != 0) {
			minute--;
		}
	}    
	 
   
	//console.log(hour+':'+minute);
   
   
	for (i = 0; i < staticPixels.length; i++) {
		pixels.push(...staticPixels[i]);
	}	
	if(minute != 0) {
		pixels.push(...minutePixels[minute]);
	}
	pixels.push(...hourPixels[1-1]);
  
		
	// TBD find diff netween rounded and exact minutes
	
	
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

// This is taken from the rainbow.js example in rpi-ws281x-native
function rgb2Int(r, g, b) {
  return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff);
}


function getSentencesPixels(sentences,words) {
	var pixels = new Object;
	for (i in sentences) {
		var sentence = sentences[i];
		for (y = 0; y < sentence.length; y++) {
			var key = sentence[y];
			var word = words[key];
			var wordPixels = getPixels(word);
			
			if (pixels[i] == undefined) {
			pixels[i] = wordPixels;
			} else {
				pixels[i].push(...wordPixels);
			}
		}
	}
  //console.log(pixels);
  return pixels;
}

function getWordsPixels(words) {
	var pixels = new Array;
  for (i = 0; i < words.length; i++) {
		var wordPixels = getPixels(words[i]);
    	if (pixels[i] == undefined) {
				pixels[i] = wordPixels;
			} else {
				pixels[i].push(...wordPixels);
			}
	}
  //console.log(pixels);
  return pixels;
}

function getPixels(word) {
	var firstPixel = word[0];
	var lastPixel = word[1];
  var pixels = new Array;
	var x = 0;
	for (var q = firstPixel; q <= lastPixel; q++) {
		pixels[x] = q;
		x++;
	}
	return pixels;
}

// function getRndColor() {
    // var r = 255*Math.random()|0,
        // g = 255*Math.random()|0,
        // b = 255*Math.random()|0;
    // return 'rgb(' + r + ',' + g + ',' + b + ')';
// }

// ---- trap the SIGINT and reset before exit
process.on('SIGINT', function () {
  ws281x.reset();
  process.nextTick(function () { process.exit(0); });
});
console.log('Press <ctrl>+C to exit.');

