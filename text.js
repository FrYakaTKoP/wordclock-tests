var ws281x = require('rpi-ws281x-native'),
    canvas = require('rpi-ws281x-canvas').create(12,12),
    ctx = canvas.getContext('2d');


ws281x.init(144);
ws281x.setIndexMapping(ws281x.indexMapping.alternatingMatrix(12,12));


        var text = "";
        var textDirection ="";
         
		setInterval(animate, 20);

		textDirection ="left";
		textXpos = 0;
		text = "aus aus aus!!";    


function animate() {
    ctx.clearRect(0, 0, 12, 12);
    ctx.globalAlpha = 1;
    //ctx.fillStyle = "#FFF";
    //ctx.fillRect(0, 0, 12, 12);

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
	ctx.fillStyle = "#000";		  
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
