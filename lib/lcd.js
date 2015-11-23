var LCD = require('lcd'),
    device = new LCD({
        rs: 12,
        e: 21,
        data: [5, 6, 17, 18],
        cols: 16,
        rows: 2
    }),
    message = '',
    print = function(str, callback) {
        message = str;
        device.clear(function() {
            if (str.length > 16) {
                device.setCursor(0, 0);
                device.print(str.substring(0, 16), function() {
                    device.setCursor(0, 1);
                    device.print(str.substring(16, 32), function() {
                        if (callback) {
                            callback();
                        }
                    });
                });
            } else {
                device.setCursor(0, 0);
                device.print(str, function() {
                    if (callback) {
                        callback();
                    }
                });
            }
        });
    }
module.exports = {
    device: device,
    print: print,
    noNew: function() {
        print('No new messages!');
        setTimeout(function() {
            print(message);
        }, 1000);
    }
}