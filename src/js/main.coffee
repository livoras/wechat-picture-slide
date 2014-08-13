util = require "./util.coffee"

$ = util.$

canvas = $ "#canvas"
canvasWidth = window.innerWidth
canvasHeight = window.innerHeight

BUTTON_SIZE = 50
GAP = 10
RADIUS = 0.5 * canvasWidth - (0.5 * BUTTON_SIZE + GAP)

init = ->
    resizeCanvas()
    test()

resizeCanvas = ->
    canvas.width = canvasWidth
    canvas.height = canvasHeight

test = ->


init()
