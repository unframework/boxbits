
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
        'flex-basis': if grow then 0 else null
        'flex-grow': grow
    }, content

module.exports = {
    column: (specList...) ->
        h 'div', style: {
            display: 'flex'
            'justify-content': 'space-between'
            'flex-direction': 'column'
        }, ((h 'div', spec) for spec in specList)

    row: (specList...) ->
        h 'div', style: {
            display: 'flex'
            'justify-content': 'space-between'
            'flex-direction': 'row'
        }, ((flexChild spec) for spec in specList)

    box: () ->
        h 'div', style: {
            background: '#f00'
            width: '40px'
            height: '40px'
        }

    icon: () ->
        h 'div', style: {
            background: '#0f0'
            width: '40px'
            height: '40px'
        }

    display: (vdom) ->
        $('#container').append createElement vdom
}
