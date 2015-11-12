var vdomLive = require('vdom-live');

var backgroundCss = require('./backgroundCss');

// note: by default, parent dictates display? or opposite?
// seems as though many elements have a fixed size, so it's more likely for compound parent to listen to children

// every element assumes it is inside a flexbox flow

// an icon has a fixed size, etc
// row lines up items to stretch them (add spacers as needed), but vertically aligns (no stretch)
// avoid relying on variable things like text for sizing (what about height?)

function factory(h) {
    var b = {
        box: function(x, y, width, height) {
            var contents = Array.prototype.slice.call(arguments, 4);

            return h('div', {
                style: {
                    position: 'absolute',
                    boxSizing: 'border-box',
                    left: x + 'px',
                    top: y + 'px',
                    width: width + 'px',
                    height: height + 'px',
                    boxShadow: 'inset 0 0 5px rgba(47, 105, 87, 0.5)',
                    borderRadius: '3px',
                    backgroundColor: 'rgba(47, 105, 87, 0.1)'
                }
            }, contents);
        },

        image: function(width, height, imageData) {
            return h('div', {
                style: {
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    background: 'url(data:application/octet-stream;base64,' + imageData + ') no-repeat center',
                    backgroundSize: 1 * width + 'px ' + 1 * height + 'px'
                }
            });
        }
    };

    return b;
}

function run(cb) {
    // @todo find existing runs
    // @todo reconsider how this is done
    document.getElementsByTagName('head')[0].appendChild((function (html) {
        var span = document.createElement('span');
        span.innerHTML = html;
        return span.firstChild;
    })('<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300" type="text/css" />'));

    document.body.parentNode.style.width = '100%';
    document.body.parentNode.style.height = '100%';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    document.body.style.background = backgroundCss;

    // enter the vdom-live zone
    vdomLive(function (renderLive, h) {
        var b = factory(h);

        // request body renderer
        var screenBodyCallback = cb(b, h);

        // start up the render loop and attach to body
        var dom = renderLive(function () {
            var screenBody = screenBodyCallback(b, h);

            return h('div', {
                style: {
                    position: 'absolute',
                    boxSizing: 'content-box',
                    top: '50%',
                    left: '50%',
                    margin: '-250px -370px',
                    width: '740px',
                    height: '500px',
                    background: 'repeating-linear-gradient(45deg, #112B44 0px, #112B44 10px, #214B74 10px, #214B74 20px)',
                    borderRadius: '5px',
                    boxShadow: '5px 5px 0 #ad9e7e'
                }
            }, h('div', {
                style: {
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    bottom: '10px',
                    right: '10px',
                    overflow: 'hidden',
                    borderRadius: '3px',
                    background: '#F5FAEF',
                    boxShadow: 'inset 1px 1px 7px -2px #214B74'
                }
            }, screenBody));
        });

        document.body.appendChild(dom);
    });
}

module.exports.run = run;
