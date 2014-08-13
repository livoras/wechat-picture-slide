util = require "./util.coffee"
world = require "./world.coffee"

$ = util.$

canvas = $ "#canvas"
canvasWidth = window.innerWidth
canvasHeight = window.innerHeight
ctx = canvas.getContext "2d"

BUTTON_SIZE = 95
GAP = 8
RADIUS = 0.5 * canvasWidth - (0.5 * BUTTON_SIZE + GAP)
buttons = []

init = ->
    resizeCanvas()
    initClear()
    initEvents()
    world.start()
    test()

resizeCanvas = ->
    canvas.width = canvasWidth
    canvas.height = canvasHeight

initClear = ->
    bg = new Image
    bg.src = "img/bg.png"
    world.add
        move: -> 
            ctx.save()
            ctx.clearRect 0, 0, canvasWidth, canvasHeight
            ctx.drawImage bg, 0, 0, canvasWidth, canvasHeight
            ctx.restore()

initEvents = ->
    pageX = 0
    pageY = 0

    canvas.addEventListener "touchstart", (event)->
        event.preventDefault()
        touch = event.touches[0]
        pageX = touch.pageX
        pageY = touch.pageY

    canvas.addEventListener "touchmove", (event)->
        event.preventDefault()
        touch = event.touches[0]
        x = touch.pageX
        y = touch.pageY
        if Math.abs(x - pageX) < 15 then return
        if y > canvasHeight / 2
            if x > pageX
                moveBack()
            else
                moveFront()
        else
            if x > pageX
                moveFront()
            else
                moveBack()
        pageX = x
        pageY = y

moveFront = ->        
    for button in buttons
        button.go()

moveBack = ->        
    for button in buttons
        button.back()

test = ->
    imgsPath = [
        "img/button1.png"
        "img/button2.png"
        "img/button3.png"
        "img/button4.png"
        "img/button5.png"
        "img/button6.png"
    ]
    perDeg = 360 / imgsPath.length
    currentDeg = 0
    for imgPath in imgsPath
        img = new Image
        img.src = imgPath
        button = new Button currentDeg, img
        currentDeg += perDeg
        buttons.push button
        world.add button

class Button
    constructor: (@deg, @img)->
        @max = 14
        @v = 0

        @pace = 0.7
        @force = 0.1

    move: -> 
        @updateDeg()
        piDeg = @deg / 180 * Math.PI
        ctx.save()
        ctx.translate canvasWidth / 2, canvasHeight / 2
        ctx.rotate piDeg
        ctx.drawImage @img, -BUTTON_SIZE / 2, RADIUS - BUTTON_SIZE / 2, BUTTON_SIZE, BUTTON_SIZE
        ctx.restore()

    go: ->
        @v += @pace
        if @v >= @max then @v = @max

    back: ->
        @v -= @pace
        if @v <= -@max then @v = -@max

    stop: ->
        @v = 0

    updateDeg: ->
        @deg += @v
        if (@v + 0.001) * (@v - @force) < 0
            @v = 0
        else
            if @v > 0
                @v -= @force
            else
                @v += @force


init()
