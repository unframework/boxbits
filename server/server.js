var http = require('http')
var finalhandler = require('finalhandler')
var serveStatic = require('serve-static')
var b = require('browserify')();
var concat = require('concat-stream')

var serve = serveStatic(__dirname + '/static', {'index': ['index.html', 'index.htm']})

module.exports = function (jsFile) {
  var jsCache;
  
  b.add(jsFile);
  b.bundle().pipe(concat(function(js) {
    jsCache = js;
  }));

  var server = http.createServer(function(req, res){
    var done = finalhandler(req, res)

    if (req.url == '/main.js') {
      res.setHeader('Content-Type', 'application/javascript');
      res.end(jsCache.toString());
    }
    else {
      serve(req, res, done)  
    }
  })

  server.listen(3000);
}
