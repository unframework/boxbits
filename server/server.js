var http = require('http');
var WebSocketServer = require('ws').Server;
var finalhandler = require('finalhandler');
var browserify = require('browserify');
var concat = require('concat-stream');

var baseHtml = '<!DOCTYPE html><html><body><div id="container"></div><script src="bridge.js"></script><script src="main.js"></script></body></html>';

module.exports = function (jsFile) {
    var b = browserify();
    b.add(jsFile);

    var bridge = browserify();
    bridge.require(__dirname + '/bridge.js', { expose: 'server' });

    var server = http.createServer(function(req, res){
        var done = finalhandler(req, res)

        if (req.url === '/main.js') {
            res.setHeader('Content-Type', 'application/javascript');
            b.bundle().pipe(concat(function(js) {
                res.end(js.toString());
            }));
        } else if (req.url === '/bridge.js') {
            res.setHeader('Content-Type', 'application/javascript');
            bridge.bundle().pipe(concat(function(js) {
                res.end(js.toString());
            }));
        } else if (req.url === '/') {
            res.setHeader('Content-Type', 'text/html');
            res.end(baseHtml);
        } else {
            done();
        }
    });

    server.listen(3000);

    var bridgeServer = new WebSocketServer({ port: 9090 });

    bridgeServer.on('connection', function connection(ws) {
        ws.on('message', function incoming(message) {
            console.log('received: %s', message);
        });
    });
}
