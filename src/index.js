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
        return makeShell(h('div', {
            style: {
                position: 'absolute',
                left: x + 'px',
                top: y + 'px',
                width: width + 'px',
                height: height + 'px',
            }
        }, this));
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

        box: function() {
            var contents = Array.prototype.slice.call(arguments, 0);

            return makeShell(h('div', {
                style: {
                    position: 'absolute',
                    left: '0px',
                    top: '0px',
                    right: '0px',
                    bottom: '0px'
                }
            }, contents));
        },

        text: function (string) {
            return makeShell(renderCenteredContent([ h('span', {
                style: {
                    fontFamily: 'Roboto',
                    fontSize: '20px',
                    fontWeight: '400',
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
                    fontFamily: 'Roboto',
                    fontSize: '20px',
                    fontWeight: '400',
                    background: '#2F6957',
                    border: '0',
                    borderRadius: '5px',
                    color: '#F5FAEF'
                }
            }, [ text.toString() ]) ]));
        },

        form: function () {
            // last argument is the submit callback
            var contents = Array.prototype.slice.call(arguments, 0);
            var onsubmit = contents.pop();

            return makeShell(renderCenteredContent([ h('form', {
                onsubmit: function (e) {
                    e.preventDefault();

                    var fields = this.getElementsByTagName('textarea');
                    var args = [];

                    for (var i = 0; i < fields.length; i += 1) {
                        args.push(fields[i].value);
                    }

                    onsubmit.apply(null, args);
                },
                style: {
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    margin: 0,
                    padding: 0
                }
            }, contents) ]));
        },

        field: function (text) {
            return makeShell(h('textarea', {
                onsubmit: onsubmit,
                placeholder: text,
                style: {
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: '100%',
                    margin: 0,
                    padding: '5px',
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    fontWeight: '400',
                    color: '#2F6957',
                    background: '#f8f8fa'
                }
            }));
        },

        submit: function (text) {
            return b.button(text);
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
    })('<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Roboto:400" type="text/css" />'));

    document.body.parentNode.style.width = '100%';
    document.body.parentNode.style.height = '100%';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    document.body.style.background = '#f8f8fa';

    // enter the vdom-live zone
    vdomLive(function (renderLive, h) {
        var b = factory(h);

        // request body renderer
        var screenBodyCallback = cb(b, h);

        // start up the render loop and attach to body
        var dom = renderLive(function () {
            var screenBody = screenBodyCallback();

            return h('div', {
                style: {
                    position: 'absolute',
                    boxSizing: 'content-box',
                    top: '50%',
                    left: '50%',
                    margin: '-' + (b.screenHeight / 2 + 1) + 'px -' + (b.screenWidth / 2 + 1) + 'px',
                    width: b.screenWidth + 'px',
                    height: b.screenHeight + 'px',
                    border: '1px solid #f0f0f8',
                    background: '#fff',
                }
            }, screenBody);
        });

        document.body.appendChild(dom);
    });
}

module.exports.run = run;
