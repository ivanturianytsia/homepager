var five = require("johnny-five");
var Raspi = require("raspi-io");
var board = new five.Board({
    io: new Raspi()
});

board.on("ready", function() {
    var led = new five.Led("P1-22"),
        button = new five.Button('P1-16'),
        piezo = new five.Piezo('P1-18');

    board.repl.inject({
        button: button,
        piezo: piezo
    });
    module.exports = {
        led: {
            on: function() {
                led.blink();
            },
            off: function() {
                led.off();
            }
        },
        buzz: function() {
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
        },
        button: button
    }
});