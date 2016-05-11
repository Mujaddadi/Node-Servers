var http = require('http');
var PORT=8081;
var fs = require('fs');
var index = fs.readFileSync('../index.html');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
}).listen(PORT);

console.log("Server running at http://localhost:" + PORT);
