const osc = require("osc");

// Create an OSC UDP Port listening on port 57121.
const udpPort = new osc.UDPPort({
    localAddress: "127.0.0.1",
    localPort: 6000
});

// Open the port.
udpPort.open();

// Listen for incoming OSC messages.
udpPort.on("message", function (oscMsg) {
    console.log("Received OSC message:", oscMsg);
});
