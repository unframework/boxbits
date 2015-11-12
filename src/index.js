var vdomLive = require('vdom-live');

// note: by default, parent dictates display? or opposite?
// seems as though many elements have a fixed size, so it's more likely for compound parent to listen to children

// every element assumes it is inside a flexbox flow

// an icon has a fixed size, etc
// row lines up items to stretch them (add spacers as needed), but vertically aligns (no stretch)
// avoid relying on variable things like text for sizing (what about height?)

function factory(h) {
    var b = {
        area: function(options) {
            var contents = Array.prototype.slice.call(arguments, 1);

            return h('div', {
                style: {
                    position: 'absolute',

                    left: (options.left !== undefined ? options.left + 'px' : 'auto'),
                    top: (options.top !== undefined ? options.top + 'px' : 'auto'),
                    right: (options.right !== undefined ? options.right + 'px' : 'auto'),
                    bottom: (options.bottom !== undefined ? options.bottom + 'px' : 'auto'),

                    width: (options.left !== undefined && options.right !== undefined ? 'auto' : options.width + 'px'),
                    height: (options.top !== undefined && options.bottom !== undefined ? 'auto' : options.height + 'px')
                }
            }, contents);
        },

        pad: function (pad) {
            var contents = Array.prototype.slice.call(arguments, 1);

            return b.area({ left: pad, top: pad, right: pad, bottom: pad }, contents);
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
        },

        box: function(options) {
            var contents = Array.prototype.slice.call(arguments, 1);

            return h('div', {
                style: {
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: (options.borderRadius || 0) * 1 + 'px',
                    backgroundColor: options.backgroundColor || 'transparent'
                }
            }, contents);
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
                    top: '50%',
                    left: '50%',
                    margin: '-360px -240px',
                    width: '480px',
                    height: '720px',
                    background: '#ecf0f1',
                    border: '3px #95a5a6 solid',
                    borderRadius: '3px',
                    boxShadow: '3px 3px 0 #bdc3c7'
                }
            }, screenBody);
        });

        document.body.appendChild(dom);
    });
}

module.exports.run = run;
