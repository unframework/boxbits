var http = require('http');
var finalhandler = require('finalhandler');
var browserify = require('browserify');
var concat = require('concat-stream');

var RpcServer = require('./rpcServer.js');

var baseHtml = '<!DOCTYPE html><html><body><div id="container"></div><script src="bridge.js"></script><script src="main.js"></script></body></html>';

module.exports = function (jsFile, serverJsFile) {
    var rpcServer;
    var methods = { doSomething: function () { console.log('hey!'); } };

    var b = browserify();
    b.add(jsFile);

    var server = http.createServer(function(req, res){
        var done = finalhandler(req, res)

        if (req.url === '/main.js') {
            res.setHeader('Content-Type', 'application/javascript');
            b.bundle().pipe(concat(function(js) {
                res.end(js.toString());
            }));
        } else if (req.url === '/bridge.js') {
            res.setHeader('Content-Type', 'application/javascript');
            res.end(rpcServer.clientSideCode);
        } else if (req.url === '/') {
            res.setHeader('Content-Type', 'text/html');
            res.end(baseHtml);
        } else {
            done();
        }
    });

    server.listen(3000);

    rpcServer = new RpcServer(methods, server);
}
