var LCD = require('lcd'),
    device = new LCD({
        rs: 12,
        e: 21,
        data: [5, 6, 17, 18],
        cols: 16,
        rows: 2
    });

module.exports = {
    device: device,
    print: function(str, callback) {
        device.clear(function() {
            if (str.length > 16) {
                device.setCursor(0, 0);
                device.print(data.content.substring(0, 16), function() {
                    device.setCursor(0, 1);
                    device.print(data.content.substring(16, 32), function() {
                        if (callback) {
                            callback();
                        }
                    });
                });
            } else {
                device.setCursor(0, 0);
                device.print(data.content, function() {
                    if (callback) {
                        callback();
                    }
                });
            }
        });
    }
}