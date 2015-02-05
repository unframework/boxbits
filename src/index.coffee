
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

class Layers
    constructor: (boxList) ->
        @_wExpr = new c.Variable({ value: 0 })
        @_hExpr = new c.Variable({ value: 0 })
        @_cxExpr = new c.Variable({ value: 0 })
        @_cyExpr = new c.Variable({ value: 0 })

        for b in boxList
            solver.add new c.Equation(@_cxExpr, b._cxExpr)
            solver.add new c.Equation(@_cyExpr, b._cyExpr)
            solver.add new c.Equation(@_wExpr, b._wExpr)
            solver.add new c.Equation(@_hExpr, b._hExpr)

class Aligner
    constructor: (box, xPos, yPos) ->
        @_wExpr = new c.Variable({ value: 0 })
        @_hExpr = new c.Variable({ value: 0 })
        @_cxExpr = new c.Variable({ value: 0 })
        @_cyExpr = new c.Variable({ value: 0 })

        solver.add new c.Equation(c.plus(@_cxExpr, c.times @_wExpr, 0.5 * xPos), c.plus(box._cxExpr, c.times box._wExpr, 0.5 * xPos))
        solver.add new c.Equation(c.plus(@_cyExpr, c.times @_hExpr, 0.5 * yPos), c.plus(box._cyExpr, c.times box._hExpr, 0.5 * yPos))
        solver.add new c.Inequality(@_wExpr, c.GEQ, box._wExpr)
        solver.add new c.Inequality(@_hExpr, c.GEQ, box._hExpr)

        @_dom = $('<div></div>').css({
            position: 'absolute'
            boxSizing: 'border-box'
            transition: 'top 0.8s ease-in, left 0.8s ease-in, width 0.8s ease-in, height 0.8s ease-in'
            background: 'rgba(127, 255, 0, 0.3)'
            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.5)'
        }).appendTo(document.body)

        @_updateDom()

        boxes.push this

    _updateDom: ->
        @_dom.css({
            left: "#{ @_cxExpr.value - @_wExpr.value * 0.5 }px"
            top: "#{ @_cyExpr.value - @_hExpr.value * 0.5 }px"
            width: "#{ @_wExpr.value }px"
            height: "#{ @_hExpr.value }px"
        })

class Row
    constructor: (boxList) ->
        @_wExpr = new c.Variable({ value: 0 })
        @_hExpr = new c.Variable({ value: 0 })
        @_cxExpr = new c.Variable({ value: 0 })
        @_cyExpr = new c.Variable({ value: 0 })

        wSum = 0
        leftExpr = c.minus @_cxExpr, c.times(@_wExpr, 0.5)

        for b in boxList
            solver.add new c.Equation(b._cxExpr, c.plus leftExpr, c.times(b._wExpr, 0.5))
            solver.add new c.Equation(b._cyExpr, @_cyExpr)
            solver.add new c.Inequality(@_hExpr, c.GEQ, b._hExpr)
            wSum = c.plus wSum, b._wExpr
            leftExpr = c.plus leftExpr, b._wExpr

        solver.add new c.Equation(@_wExpr, wSum)

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

    layers: (boxList) ->
        new Layers(boxList)

    east: (box) ->
        new Aligner(box, 1, 0)

    west: (box) ->
        new Aligner(box, -1, 0)

    row: (boxList) ->
        new Row(boxList)

    center: (box) ->
        new Aligner(box, 0, 0)

    display: (b) ->
        solver.add new c.Equation(b._cxExpr, 300)
        solver.add new c.Equation(b._cyExpr, 300)
        solver.add new c.Equation(b._wExpr, 300)
        solver.add new c.Equation(b._hExpr, 300)
}
