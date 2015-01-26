
c = require 'cassowary'
$ = require 'jquery'

c.trace = true
solver = new c.SimplexSolver

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

        @_left = new c.Variable({ value: 400 })
        @_top = new c.Variable({ value: 400 })
        @_right = new c.Variable({ value: 400 })
        @_bottom = new c.Variable({ value: 400 })

        solver.add(new c.Inequality(c.minus(@_right, @_left), c.GEQ, 100))
        solver.add(new c.Inequality(c.minus(@_bottom, @_top), c.GEQ, 100))

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
        solver.add(new c.Inequality(@_top, c.GEQ, @_container._top))
        solver.add(new c.Inequality(@_right, c.LEQ, @_container._right))
        solver.add(new c.Inequality(@_bottom, c.LEQ, @_container._bottom))
        solver.add(new c.Inequality(@_left, c.GEQ, @_container._left))
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
        cx = c.times(c.plus(@_container._left, @_container._right), 0.5)
        cy = c.times(c.plus(@_container._top, @_container._bottom), 0.5)
        solver.add(new c.Equation(@_left, cx, c.Strength.weak))
        solver.add(new c.Equation(@_right, cx, c.Strength.weak))
        solver.add(new c.Equation(@_top, cy, c.Strength.weak))
        solver.add(new c.Equation(@_bottom, cy, c.Strength.weak))
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
