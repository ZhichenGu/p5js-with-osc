const osc = require("osc");

// Create an OSC UDP Port for sending messages.
const udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 57122,
    remoteAddress: "127.0.0.1",
    remotePort: 8000
});

// Open the port.
udpPort.open();

// Send an OSC message once the port is ready.
udpPort.on("ready", function () {
    udpPort.send({
        address: "/example",
        args: [
            {
                type: "f",
                value: 440.0
            },
            {
                type: "s",
                value: "A note"
            }
        ]
    });
});
