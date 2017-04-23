var ws281x = require('rpi-ws281x-native'),
    canvas = require('rpi-ws281x-canvas').create(12,12),
    ctx = canvas.getContext('2d');

ws281x.init(144);
ws281x.setIndexMapping(ws281x.indexMapping.alternatingMatrix(12,12));

	
setInterval(function() {
    ctx.globalAlpha = 1;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 12, 12);

    ws281x.render(canvas.toUint32Array());
}, 100);



// ---- trap the SIGINT and reset before exit
process.on('SIGINT', function () {
  ws281x.reset();
  process.nextTick(function () { process.exit(0); });
});
console.log('Press <ctrl>+C to exit.');

