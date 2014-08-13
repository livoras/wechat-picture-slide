cover = {}
canvas = null
ctx = null

currentImg = nextImg = null
slideData = require "./slide-data.coffee"
PACE = slideData.OPACITY_PACE
opacity = 0
isChange = no
util = require "./util.coffee"
clip = util.clip

x = y = width = height = 0


cover.change = (img)->
    nextImg = img
    opacity =   0
    isChange = yes

cover.move = ->
    if isChange
        opacity += PACE
        renderCurrentImage()
        renderNextImage()
        if opacity >= 1
            isChange = no
            opacity = 0
            currentImg = nextImg
    else
        drawCurrentImage()

renderNextImage = ->
    if not currentImg then return
    ctx.save()
    ctx.globalAlpha = opacity
    draw nextImg
    ctx.restore()

renderCurrentImage = ->    
    if not currentImg then return
    ctx.save()
    ctx.globalAlpha = 1 - opacity
    draw currentImg
    ctx.restore()

drawCurrentImage = ->
    if not currentImg or isChange then return
    ctx.save()
    ctx.shadowBlur = 10
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 3
    ctx.shadowColor = "#000"
    draw currentImg
    ctx.restore()

draw = (img)->
    ctx.translate x, y
    {sx, sy, sw, sh} = clip img, width, height
    ctx.drawImage img, sx, sy, sw, sh, 0, 0, width, height

cover.init = (cvs)->
    canvas = cvs
    ctx = canvas.getContext "2d"
    width = slideData.coverWidth
    height = slideData.coverHeight
    x = slideData.coverX
    y = slideData.coverY

module.exports = cover   