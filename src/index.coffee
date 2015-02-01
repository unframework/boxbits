
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


class OldBox
    constructor: (containerIsh, size) ->
        @_container = containerIsh

        @_dom = $('<div></div>').css({
            position: 'absolute'
            boxSizing: 'border-box'
            transition: 'top 0.8s ease-in, left 0.8s ease-in, width 0.8s ease-in, height 0.8s ease-in'
            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.5)'
        }).appendTo(document.body)

        @_left = new c.Variable({ value: 0 })
        @_top = new c.Variable({ value: 0 })
        @_right = new c.Variable({ value: size || 10 })
        @_bottom = new c.Variable({ value: size || 10 })
        @_cx = new c.Variable({ value: (size || 10) / 2 })
        @_cy = new c.Variable({ value: (size || 10) / 2 })

        solver.add(new c.Inequality(c.minus(@_right, @_left), c.GEQ, size || 10))
        solver.add(new c.Inequality(c.minus(@_bottom, @_top), c.GEQ, size || 10))
        solver.add(new c.Equation(@_cx, c.times(c.plus(@_left, @_right), 0.5)))
        solver.add(new c.Equation(@_cy, c.times(c.plus(@_top, @_bottom), 0.5)))

        @_updateDom()

        boxes.push this

    _updateDom: ->
        @_dom.css({
            left: "#{ @_left.value }px"
            top: "#{ @_top.value }px"
            width: "#{ @_right.value - @_left.value }px"
            height: "#{ @_bottom.value - @_top.value }px"
        })

    in: (containerIsh) ->
        @_container = containerIsh
        solver.add(new c.Inequality(@_top, c.GEQ, @_container._top))
        solver.add(new c.Inequality(@_right, c.LEQ, @_container._right))
        solver.add(new c.Inequality(@_bottom, c.LEQ, @_container._bottom))
        solver.add(new c.Inequality(@_left, c.GEQ, @_container._left))
        this

    north: () ->
        solver.add(new c.Equation(@_top, @_container._top))
        solver.add(new c.Equation(@_cx, @_container._cx))
        this

    west: () ->
        solver.add(new c.Equation(@_left, @_container._left))
        solver.add(new c.Equation(@_cy, @_container._cy))
        this

    east: () ->
        solver.add(new c.Equation(@_right, @_container._right))
        solver.add(new c.Equation(@_cy, @_container._cy))
        this

    center: () ->
        solver.add(new c.Equation(@_cx, @_container._cx))
        solver.add(new c.Equation(@_cy, @_container._cy))
        this

    wide: () ->
        solver.add(new c.Equation(@_left, @_container._left))
        solver.add(new c.Equation(@_right, @_container._right))
        this

window.setInterval ->
    solver.resolve()

    for b in boxes
        b._updateDom()

, 500

rootContainer = {
    _left: new c.Expression(0)
    _top: new c.Expression(0)
    _right: new c.Expression(1000)
    _bottom: new c.Expression(800)
    _cx: new c.Expression(500)
    _cy: new c.Expression(400)
}

window._root = rootContainer

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

# module.exports.windowTop = ->
#     {
#         _constrainToBottom: (cexpr) ->
#             solver.add(new c.Equation(cexpr, new c.Expression(0)))
#     }
