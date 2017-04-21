var ws281x = require('rpi-ws281x-native'),
    canvas = require('rpi-ws281x-canvas').create(12,12),
    ctx = canvas.getContext('2d'),
	time = require('time'),
	date = require('date-and-time');


ws281x.init(144);
ws281x.setIndexMapping(ws281x.indexMapping.alternatingMatrix(12,12));
	
		var now = new time.Date();
        var text = "";
        var textDirection ="";
         

		textDirection ="left";
		textXpos = 0;
		//text = date.format(now, 'HH:mm:ss');   
		
		setInterval(animate, 20); 

//http://jsfiddle.net/bS79G/644/
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
