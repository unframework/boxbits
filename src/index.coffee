
c = require 'cassowary'
$ = require 'jquery'

solver = new c.SimplexSolver
solver.autoSolve = false

boxes = []

class Box
    constructor: (containerIsh) ->
        @_container = containerIsh

        @_dom = $('<div></div>').css({
            position: 'absolute'
            boxSizing: 'border-box'
            transition: 'top 0.8s ease-in, left 0.8s ease-in, width 0.8s ease-in, height 0.8s ease-in'
            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.5)'
        }).appendTo(document.body)

        @_left = new c.Variable({ value: 0 })
        @_top = new c.Variable({ value: 0 })
        @_right = new c.Variable({ value: 0 })
        @_bottom = new c.Variable({ value: 0 })
        @_cx = new c.Variable({ value: 0 })
        @_cy = new c.Variable({ value: 0 })

        solver.add(new c.Inequality(c.minus(@_right, @_left), c.GEQ, 100))
        solver.add(new c.Inequality(c.minus(@_bottom, @_top), c.GEQ, 100))
        solver.add(new c.Equation(@_cx, c.times(c.plus(@_left, @_right), 0.5)))
        solver.add(new c.Equation(@_cy, c.times(c.plus(@_top, @_bottom), 0.5)))
        solver.add(new c.Equation(@_left, @_right, c.Strength.weak))
        solver.add(new c.Equation(@_top, @_bottom, c.Strength.weak))

        @_updateDom()

        boxes.push this

    _updateDom: ->
        @_dom.css({
            left: "#{ @_left.value }px"
            top: "#{ @_top.value }px"
            width: "#{ @_right.value - @_left.value }px"
            height: "#{ @_bottom.value - @_top.value }px"
        })

    attachBelow: (anchorIsh) ->
        anchorIsh._constrainToBottom @_top
        this

    placeInside: (containerIsh) ->
        @_container = containerIsh
        solver.add(new c.Inequality(@_top, c.LEQ, @_container._top))
        solver.add(new c.Inequality(@_right, c.GEQ, @_container._right))
        solver.add(new c.Inequality(@_bottom, c.GEQ, @_container._bottom))
        solver.add(new c.Inequality(@_left, c.LEQ, @_container._left))
        this

    pullNorth: () ->
        solver.add(new c.Equation(@_top, @_container._top))
        solver.add(new c.Equation(@_bottom, @_container._top, c.Strength.weak))
        this

    pullWest: () ->
        solver.add(new c.Equation(@_left, @_container._left))
        solver.add(new c.Equation(@_right, @_container._left, c.Strength.weak))
        this

    pullEast: () ->
        solver.add(new c.Equation(@_right, @_container._right))
        solver.add(new c.Equation(@_left, @_container._right, c.Strength.weak))
        this

    center: () ->
        solver.add(new c.Equation(@_cx, @_container._cx, c.Strength.weak))
        solver.add(new c.Equation(@_cy, @_container._cy, c.Strength.weak))
        this

    fillWidth: () ->
        solver.add(new c.Equation(@_left, @_container._left))
        solver.add(new c.Equation(@_right, @_container._right))
        this

    makeIcon: () ->
        @_dom.css({ background: '#f00' })
        this

    _constrainInside: (cexprTop, cexprRight, cexprBottom, cexprLeft) ->
        solver.add(new c.Inequality(cexprTop, c.GEQ, @_top))
        solver.add(new c.Inequality(cexprTop, c.GEQ, @_top))

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
    addBox: ->
        new Box(rootContainer)
}

# module.exports.windowTop = ->
#     {
#         _constrainToBottom: (cexpr) ->
#             solver.add(new c.Equation(cexpr, new c.Expression(0)))
#     }
