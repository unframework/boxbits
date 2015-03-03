
h = require 'virtual-dom/h'
createElement = require 'virtual-dom/create-element'
$ = require 'jquery'

# note: by default, parent dictates display? or opposite?
# seems as though many elements have a fixed size, so it's more likely for compound parent to listen to children

flexChild = (spec) ->
    [ content, grow ] =
        if Object.prototype.hasOwnProperty.call spec, 'length'
            [ spec[0], 1 ]
        else
            [ spec, null ]

    h 'div', style: {
        flexBasis: if grow then 0 else null
        flexGrow: grow
    }, content

module.exports = {
    column: (specList...) ->
        h 'div', style: {
            display: 'flex'
            justifyContent: 'space-between'
            flexDirection: 'column'
        }, ((h 'div', spec) for spec in specList)

    row: (specList...) ->
        h 'div', style: {
            display: 'flex'
            justifyContent: 'space-between'
            flexDirection: 'row'
        }, ((flexChild spec) for spec in specList)

    box: () ->
        h 'div', style: {
            background: '#f00'
            width: '40px'
            height: '40px'
            boxShadow: '0 1px 5px -1px rgba(0,0,0,0.2)'
            borderRadius: '3px'
        }

    icon: () ->
        h 'div', style: {
            background: '#0f0'
            width: '40px'
            height: '40px'
            boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
            borderRadius: '3px'
        }

    display: (vdom) ->
        $('#container').append createElement vdom
}
