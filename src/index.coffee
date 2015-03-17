
h = require 'virtual-dom/h'
createElement = require 'virtual-dom/create-element'
$ = require 'jquery'

# note: by default, parent dictates display? or opposite?
# seems as though many elements have a fixed size, so it's more likely for compound parent to listen to children

# every element assumes it is inside a flexbox flow

# an icon has a fixed size, etc
# row lines up items to stretch them (add spacers as needed), but vertically aligns (no stretch)
# avoid relying on variable things like text for sizing (what about height?)

# @todo reconsider how this is done
$('head').append('<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300" type="text/css" />')

module.exports = {
    column: (specList...) ->
        h 'div', style: {
            flex: 1

            display: 'flex'
            justifyContent: 'space-around' # automatic centering when just one item
            flexDirection: 'column'
        }, ((spec) for spec in specList)

    row: (specList...) ->
        h 'div', style: {
            flex: 1

            display: 'flex'
            justifyContent: 'space-around' # automatic centering when just one item
            flexDirection: 'row'
        }, ((spec) for spec in specList)

    spacer: (vdom) ->
        h 'div', style: {
            flex: 1
        }, vdom

    box: (opts, content) ->
        h 'div', style: {
            margin: if opts.expand then 0 else 'auto' # center or expand in flex
            padding: (opts.padding || 0) * 1 + 'px'
            borderRadius: (opts.borderRadius || 0) * 1 + 'px'
            backgroundColor: (opts.backgroundColor || 'transparent')

            display: 'flex'
            flexDirection: 'inherit' # @todo this just seems like an intuitive value
        }, content

    button: (contents..., handler) ->
        h 'button', onclick: handler, style: {
            margin: 0
            padding: 0
            flex: 1

            display: 'flex'
            justifyContent: 'space-around' # automatic centering when just one item
            flexDirection: 'row'
        }, contents

    verticalScroll: (content) ->
        h 'div', style: {
            flex: 1 # fill available space
            overflowX: 'hidden'
            overflowY: 'scroll'
        }, h 'div', style: {
            display: 'flex'
            flexDirection: 'column'
        }, content

    list: (opts, specList...) ->
        separator = (opts.spacing || 0) + 'px'

        h 'div', style: {
            flex: 1

            display: 'flex'
            justifyContent: 'flex-start'
            flexDirection: 'inherit' # @todo more explicit?
        }, (for spec, i in specList
            [
                if i is 0 then null else h 'div', style: { flexGrow: 0, flexShrink: 0, flexBasis: separator }
                spec
            ]
        )

    text: (content) ->
        h 'div', style: {
            flexGrow: 0
            flexShrink: 0
            margin: 'auto' # center in flex
            fontFamily: 'Open Sans'
            fontWeight: 300
            fontSize: '16px'
            lineHeight: '16px'
            whiteSpace: 'nowrap'
            width: 'auto'
            height: '18px' # compensate for ascenders
            overflow: 'hidden'
        }, '' + content

    icon: (width, height, imageData) ->
        h 'div', style: {
            flexGrow: 0
            flexShrink: 0
            background: 'url(data:application/octet-stream;base64,' + imageData + ')'
            backgroundSize: 1 * width + 'px ' + 1 * height + 'px'
            margin: 'auto' # center in flex
            width: width + 'px'
            height: height + 'px'
        }

    display: (vdom) ->
        $('#container').append createElement vdom
}
