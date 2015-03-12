var http = require('http')
var finalhandler = require('finalhandler')
var b = require('browserify')();
var concat = require('concat-stream')

var baseHtml = '<!DOCTYPE html><html><body><div id="container"></div><script src="main.js"></script></body></html>';

module.exports = function (jsFile) {
    var jsCache;

    b.add(jsFile);
    b.bundle().pipe(concat(function(js) {
        jsCache = js;
    }));

    var server = http.createServer(function(req, res){
        var done = finalhandler(req, res)

        if (req.url === '/main.js') {
            res.setHeader('Content-Type', 'application/javascript');
            res.end(jsCache.toString());
        } else if (req.url === '/') {
            res.setHeader('Content-Type', 'text/html');
            res.end(baseHtml);
        } else {
            done();
        }
    });

    server.listen(3000);
}
