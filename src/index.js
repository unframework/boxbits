var h = require('virtual-dom/h');
var createElement = require('virtual-dom/create-element');

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

module.exports = {
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

    box: function(opts, content) {
        return h('div', {
            style: {
                margin: opts.expand ? 0 : 'auto', // center or expand in flex
                padding: (opts.padding || 0) * 1 + 'px',
                borderRadius: (opts.borderRadius || 0) * 1 + 'px',
                backgroundColor: opts.backgroundColor || 'transparent',
                display: 'flex',
                flexDirection: 'inherit' // @todo this just seems like an intuitive value
            }
        }, content);
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

    display: function(vdom) {
        return document.body.appendChild(createElement(vdom));
    }
};
