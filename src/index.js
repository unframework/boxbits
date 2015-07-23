var h = require('virtual-dom/h');

// note: by default, parent dictates display? or opposite?
// seems as though many elements have a fixed size, so it's more likely for compound parent to listen to children

// every element assumes it is inside a flexbox flow

// an icon has a fixed size, etc
// row lines up items to stretch them (add spacers as needed), but vertically aligns (no stretch)
// avoid relying on variable things like text for sizing (what about height?)

// @todo reconsider how this is done
document.getElementsByTagName('head')[0].appendChild((function (html) {
    var span = document.createElement('span');
    span.innerHTML = html;
    return span.firstChild;
})('<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300" type="text/css" />'));

var b = {
    column: function() {
        var specList = Array.prototype.slice.call(arguments, 0);

        return h('div', {
            style: {
                flex: 1,
                display: 'flex',
                justifyContent: 'space-around', // automatic centering when just one item
                flexDirection: 'column'
            }
        }, specList);
    },

    row: function() {
        var specList = Array.prototype.slice.call(arguments, 0);

        return h('div', {
            style: {
                flex: 1,
                display: 'flex',
                justifyContent: 'space-around', // automatic centering when just one item
                flexDirection: 'row'
            }
        }, specList);
    },

    spacer: function(vdom) {
        return h('div', {
            style: {
                flex: 1
            }
        }, vdom);
    },

    button: function() {
        var contents = Array.prototype.slice.call(arguments, 0);
        var handler = contents.pop();

        return h('button', {
            onclick: handler,
            style: {
                margin: 0,
                padding: 0,
                flex: 1,
                display: 'flex',
                justifyContent: 'space-around', // automatic centering when just one item
                flexDirection: 'row'
            }
        }, contents);
    },

    verticalScroll: function(content) {
        return h('div', {
            style: {
                flex: 1,
                overflowX: 'hidden',
                overflowY: 'scroll'
            }
        }, h('div', {
            style: {
                display: 'flex',
                flexDirection: 'column'
            }
        }, content));
    },

    list: function(opts) {
        var specList =  Array.prototype.slice.call(arguments, 1);
        var separator = (opts.spacing || 0) + 'px';

        return h('div', {
            style: {
                flex: 1,
                display: 'flex',
                justifyContent: 'flex-start',
                flexDirection: 'inherit' // @todo more explicit?
            }
        }, specList.map(function(spec, i) {
            return [
                i === 0 ? null : h('div', {
                    style: {
                        flexGrow: 0,
                        flexShrink: 0,
                        flexBasis: separator
                    }
                }),
                spec
            ];
        }));
    },

    text: function(content) {
        return h('div', {
            style: {
                flexGrow: 0,
                flexShrink: 0,
                margin: 'auto', // center in flex
                fontFamily: 'Open Sans',
                fontWeight: 300,
                fontSize: '16px',
                lineHeight: '16px',
                whiteSpace: 'nowrap',
                width: 'auto',
                height: '18px', // compensate for ascenders
                overflow: 'hidden'
            }
        }, '' + content);
    },

    icon: function(width, height, imageData) {
        return h('div', {
            style: {
                flexGrow: 0,
                flexShrink: 0,
                background: 'url(data:application/octet-stream;base64,' + imageData + ')',
                backgroundSize: 1 * width + 'px ' + 1 * height + 'px',
                margin: 'auto',
                width: width + 'px',
                height: height + 'px'
            }
        });
    },


    // testing abs-layout
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
    },

    mobilePortrait: function () {
        var contents = Array.prototype.slice.call(arguments, 0);

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
        }, contents);
    }
};

module.exports = b;
