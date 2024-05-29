var ellipseAlpha = 100 // initialized variable for alpha
var ellipseSize = 50; // initialized variable for size
var socket;

var isConnected;

function setup() {
	createCanvas(500, 500);
	setupOsc(3333, 6000); // OSC ports. you'll need 3333 in your Sonic Pi code
	isConnected = false;
}

function draw() {
	background(0, 0, 255);
	fill(0, 255, 0, ellipseAlpha); // fill using alpha variable
	ellipse(200, 200, ellipseSize, ellipseSize); // ellipses function using size variable

	socket.emit('message',  '/pos', 300);
}

// this function controls the incoming OSC messages
function receiveOsc(address, value) {
	console.log("received OSC: " + address + ", " + value);

// This conditional statement looks for "cutoff" message and assigns its value to alpha variable
	if (address == '/cutoff') { 
		ellipseAlpha= value[0];
	}
// This conditional statement looks for "amp" message and assigns its value to size variable
	if (address == '/amp') {
			ellipseSize = value[0];
		}
}

// This function is for sending OSC messages
// This is not relevant for receiving OSC messages
// function sendOsc(address, value) {
// 	socket.emit('message', [address].concat(value));
// }

function setupOsc(oscPortIn, oscPortOut) {
	socket = io.connect('http://127.0.0.1:8081', { port: 8081, rememberTransport: false });
	socket.on('connect', function() {
		socket.emit('config', {
			server: { port: oscPortIn,  host: '127.0.0.1'},
			client: { port: oscPortOut, host: '127.0.0.1'}
		});
	});

	socket.on('connect', function() {
        isConnected = true;
    });

    socket.on('message', function(msg) {
        if (msg[0] == '#bundle') {
            for (var i=2; i<msg.length; i++) {
                receiveOsc(msg[i][0], msg[i].splice(1));
            }
        } else {
            receiveOsc(msg[0], msg.splice(1));
        }
    });
}