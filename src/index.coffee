
c = require 'cassowary'
$ = require 'jquery'

solver = new c.SimplexSolver

boxes = []

class Box
    constructor: ->
        @_dom = $('<div></div>').css({
            position: 'absolute'
            boxSizing: 'border-box'
            transition: 'top 0.2s ease-in, left 0.2s ease-in, width 0.2s ease-in, height 0.2s ease-in'
            boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)'
        }).appendTo(document.body)

        @_left = new c.Variable({ value: 400 })
        @_top = new c.Variable({ value: 400 })
        @_right = new c.Variable({ value: 500 })
        @_bottom = new c.Variable({ value: 500 })

        @_updateDom()

        boxes.push this

    _updateDom: ->
        @_dom.css({
            left: "#{ @_left.value }px"
            top: "#{ @_top.value }px"
            width: "#{ @_right.value - @_left.value }px"
            height: "#{ @_bottom.value - @_top.value }px"
        })

    addBox: ->
        new Box()

    attachBelow: (anchorIsh) ->
        this

    placeInside: (anchorIsh) ->
        this

    pullWest: () ->
        this

    pullEast: () ->
        this

    makeIcon: () ->
        this

window.setInterval ->
    solver.resolve()

    for b in boxes
        b._updateDom()
, 500

module.exports = new Box()

module.exports.windowTop = ->
    {}
