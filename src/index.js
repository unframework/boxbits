var vdomLive = require('vdom-live');

var backgroundCss = require('./backgroundCss');

// note: by default, parent dictates display? or opposite?
// seems as though many elements have a fixed size, so it's more likely for compound parent to listen to children

// every element assumes it is inside a flexbox flow

// an icon has a fixed size, etc
// row lines up items to stretch them (add spacers as needed), but vertically aligns (no stretch)
// avoid relying on variable things like text for sizing (what about height?)

function factory(h) {
    function shellAt(x, y, width, height) {
        // @todo wrap in another shell
        return b.box(x, y, width, height, this);
    }

    function makeShell(vnode) {
        var shell = [ vnode ];

        shell.at = shellAt;

        return shell;
    }

    function renderCenteredContent(contents) {
        return h('div', {
            style: {
                position: 'absolute',
                display: 'table',
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                width: '100%',
                height: '100%'
            }
        }, [ h('div', {
            style: {
                display: 'table-cell',
                textAlign: 'center',
                verticalAlign: 'middle'
            }
        }, contents) ]);
    }

    var b = {
        screenWidth: 720,
        screenHeight: 480,

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
                    boxShadow: 'inset 0 0 2px rgba(47, 105, 87, 0.8)',
                    borderRadius: '3px',
                    backgroundColor: 'rgba(47, 105, 87, 0.1)'
                }
            }, contents);
        },

        text: function (string) {
            return makeShell(renderCenteredContent([ h('span', {
                style: {
                    fontFamily: 'Open Sans',
                    fontSize: '20px',
                    fontWeight: '300',
                    color: '#0B1920'
                }
            }, string.toString()) ]));
        },

        button: function (text, onclick) {
            return makeShell(renderCenteredContent([ h('button', {
                onclick: onclick,
                style: {
                    display: 'inline-block',
                    padding: '5px 20px',
                    fontFamily: 'Open Sans',
                    fontSize: '20px',
                    fontWeight: '300',
                    background: '#2F6957',
                    border: '0',
                    borderRadius: '5px',
                    color: '#86C270'
                }
            }, [ text.toString() ]) ]));
        },

        image: function(width, height, imageData) {
            return makeShell(h('div', {
                style: {
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    background: 'url(data:application/octet-stream;base64,' + imageData + ') no-repeat center',
                    backgroundSize: 1 * width + 'px ' + 1 * height + 'px'
                }
            }));
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
            var screenBody = screenBodyCallback();
            var paddedWidth = (b.screenWidth + 10);
            var paddedHeight = (b.screenHeight + 10);

            return h('div', {
                style: {
                    position: 'absolute',
                    boxSizing: 'content-box',
                    top: '50%',
                    left: '50%',
                    margin: '-' + (paddedHeight / 2) + 'px -' + (paddedWidth / 2) + 'px',
                    width: paddedWidth + 'px',
                    height: paddedHeight + 'px',
                    background: 'repeating-linear-gradient(45deg, #EFC84A 0px, #EFC84A 40px, #DBB538 40px, #DBB538 80px)',
                    borderRadius: '5px',
                    boxShadow: '1px 1px 7px -1px rgba(0, 0, 0, 0.3)'
                }
            }, h('div', {
                style: {
                    position: 'absolute',
                    top: '5px',
                    left: '5px',
                    bottom: '5px',
                    right: '5px',
                    overflow: 'hidden',
                    borderRadius: '3px',
                    background: '#F5FAEF',
                    boxShadow: 'inset 1px 1px 5px -1px #411113'
                }
            }, screenBody));
        });

        document.body.appendChild(dom);
    });
}

module.exports.run = run;
