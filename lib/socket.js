module.exports = function(server) {
    var io = require('socket.io')(server),
        lcd = require('./lcd.js'),
        devices = require('./devices.js');

    var messages = [];

    io.on('connection', function(socket) {
        console.log('connected');
        socket.on('message', function(data) {
            messages.push(data.content);
            devices.buzz();
            devices.led.on();
        })
    });
    lcd.device.on('ready', function() {
        devices.button.on('up', function() {
            console.log("print message");
            if (messages.length) {
                lcd.print(messages.shift(), function() {
                    if (!messages.length) {
                        devices.led.off();
                    }
                });
            }
        })
    })
}