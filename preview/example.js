var fs = require('fs');
var insertStyle = require('insert-css');

var css = fs.readFileSync(__dirname + '/reset.css', 'utf8');
insertStyle(css);

var b = require('../');

b.display(
    b.overlap([
        b.west(topMenu = b.box()),
        b.center(topBarLogo = b.icon()),
        b.east(
            b.row([
                searchBox = b.box(),
                profileIcon = b.box(),
                searchBox = b.box()
            ])
        )
    ])
)
