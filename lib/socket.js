module.exports = function(server) {
    var io = require('socket.io')(server),
        lcd = require('./lcd.js'),
        five = require("johnny-five"),
        Raspi = require("raspi-io"),
        board = new five.Board({
            io: new Raspi()
        });

    var messages = [];
    board.on("ready", function() {
        var led = new five.Led("P1-22"),
            button = new five.Button('P1-16'),
            piezo = new five.Piezo('P1-18');

        board.repl.inject({
            button: button
        });
        board.repl.inject({
            piezo: piezo
        });
        io.on('connection', function(socket) {
            console.log('connected');
            socket.on('message', function(data) {
                messages.push(data.content);
                piezo.play({
                    // song is composed by an array of pairs of notes and beats
                    // The first argument is the note (null means "no note")
                    // The second argument is the length of time (beat) of the note (or non-note)
                    song: [
                        ["C4", 1 / 4],
                        ["D4", 1 / 4],
                        ["F4", 1 / 4]
                    ],
                    tempo: 100
                });
                led.blink();
            })
            lcd.device.on('ready', function() {})
            button.on('down', function() {
                console.log(messages);
                if (messages.length) {
                    console.log("print message");
                    lcd.print(messages.shift(), function() {
                        console.log(messages);
                        if (!messages.length) {
                            led.off();
                        }
                    });
                }
            })
        });
    });
}