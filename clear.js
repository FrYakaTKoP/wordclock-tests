var ws281x = require('rpi-ws281x-native'),
    canvas = require('rpi-ws281x-canvas').create(12,12),
    ctx = canvas.getContext('2d');


ws281x.init(144);
ctx.clearRect(0, 0,12, 12);
ws281x.render(canvas.toUint32Array());