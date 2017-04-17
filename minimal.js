var ws281x = require('rpi-ws281x-native'),
    canvas = require('../index.js').create(12,12),
    ctx = canvas.getContext('2d');

function rnd(max) { return (max || 1) * Math.random(); }
function rndi(max) { return Math.round(rnd(max)); }

ws281x.init(144);
ws281x.setIndexMapping(ws281x.indexMapping.alternatingMatrix(12,12));
	
setInterval(function() {
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#' + rndi(0xffffff).toString(16);
    ctx.fillRect(rndi(10)-2, rndi(10)-2, rndi(10), rndi(10));

    ws281x.render(canvas.toUint32Array());
}, 100);