var fs = require("fs");
var fileName = "/home/UDPServer/sensordata.txt";
var dgram = require('dgram');

var HOST = '192.168.1.39';
var PORT = 6972;

var server = dgram.createSocket('udp4');

server.on('listening', function() {
  var address = server.address();
  console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', function(message, remote) {

  console.log(remote.address + ':' + remote.port + ' - ' + message);

  //Set the interval to send data
  myVar = setInterval(function() {

    var data = fs.readFileSync(fileName);

    var okBuffer = new Buffer(data);

    //Send the read Data
    server.send(okBuffer, 0, okBuffer.length, remote.port, remote.address, function(err, bytes) {
      if (err) {
        throw err;
      }
      //print out to the server's console that we've successfully sent the response to the client
      console.log("OK sent to client");
    });

  }, 100); //End of TimeOut

});

server.bind(PORT, HOST);
