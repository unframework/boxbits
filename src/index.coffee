
c = require 'cassowary'
$ = require 'jquery'

solver = new c.SimplexSolver
solver.autoSolve = false

boxes = []

class Box
    constructor: (w, h, cssColor) ->
        @_finalWidth = w || 10 # @todo cast to number
        @_finalHeight = h || 10 # @todo cast to number

        @_wExpr = new c.Expression(@_finalWidth)
        @_hExpr = new c.Expression(@_finalHeight)
        @_cxExpr = new c.Variable({ value: 0 })
        @_cyExpr = new c.Variable({ value: 0 })

        @_dom = $('<div></div>').css({
            position: 'absolute'
            boxSizing: 'border-box'
            transition: 'top 0.8s ease-in, left 0.8s ease-in, width 0.8s ease-in, height 0.8s ease-in'
            background: cssColor || 'rgba(255, 127, 0, 0.3)'
            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.5)'
            width: "#{ @_finalWidth }px"
            height: "#{ @_finalHeight }px"
        }).appendTo(document.body)

        @_updateDom()

        boxes.push this

    _updateDom: ->
        @_dom.css({
            left: "#{ @_cxExpr.value - @_finalWidth * 0.5 }px"
            top: "#{ @_cyExpr.value - @_finalHeight * 0.5 }px"
        })


window.setInterval ->
    solver.resolve()

    for b in boxes
        b._updateDom()

, 500

module.exports = {
    box: ->
        new Box()

    icon: () ->
        new Box(10, 100, '#f00')

    overlap: () ->
        throw new Error 'not implemented'

    east: () ->
        throw new Error 'not implemented'

    west: () ->
        throw new Error 'not implemented'

    row: () ->
        throw new Error 'not implemented'

    center: () ->
        throw new Error 'not implemented'
}
