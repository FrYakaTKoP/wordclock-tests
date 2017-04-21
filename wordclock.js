var ws281x = require('rpi-ws281x-native'),
	time = require('time');
	
var NUM_LEDS = 136;
var pixelData = new Uint32Array(NUM_LEDS)
	
var staticLeds = [[13,14],  [16,19]] // äs, isch 
var minutesLeds = [[29,32], [39,41], [14,20], [23,28], [34,37]] // foif, zäh, viertel, zwänzg, halbi
var modLeds = [[44,45], [46,48]] // vor,ab 
var hoursLeds = [[109, 111], [73,76], [77,80], [85,89], [56,60], [97,102], [91,96], [103,107], [112,115], [116,120], [81,84], [121,126]] // eis, zwei, drüh, vieri,foifi,sächsi,siebni,achti,nüni,zähni,elfi,zwölfi
	
	
var now = new time.Date();


ws281x.init(NUM_LEDS);

var loop = setInterval(function(){
  // main()
}, 10000)

function animate() {
    ctx.clearRect(0, 0, 12, 12);
    ctx.globalAlpha = 1;
    //ctx.fillStyle = "#FFF";
    //ctx.fillRect(0, 0, 12, 12);
	
	now = new time.Date();
	text = date.format(now, 'HH:mm:ss');   
    var metrics = ctx.measureText(text);
    var textWidth = metrics.width;

    if (textDirection == "right") {
      textXpos = textWidth + 12 +1;
      textDirection = "left";
    } else {
      textXpos -= 1;

      if (textXpos < -textWidth) {
        textDirection = "right";
      }
    }

	ctx.font = '10px Sans Mono';
	ctx.fillStyle = "#F00";		  
	ctx.textBaseline = 'top';
	ctx.fillText  ( text, textXpos, 0);  
	
	ws281x.render(canvas.toUint32Array());			
  }  

function getRndColor() {
    var r = 255*Math.random()|0,
        g = 255*Math.random()|0,
        b = 255*Math.random()|0;
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}
