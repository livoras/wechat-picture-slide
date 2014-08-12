data = require "./data.json"
util = require "./util.coffee"
world = require "./world.coffee"
background = require "./background.coffee"
images = data.images 
slideData = require "./slide-data.coffee"
Thumb = require "./thumb.coffee"
console.log slideData

{$, Iterator, addClass, removeClass, setBackground, setRotate} = util

canvas = $ "#canvas"
canvasBack = $ "#canvas-back"
ctx = canvas.getContext "2d"

resizeCanvas = ->
    canvas.height = window.outerHeight
    canvas.width = window.outerWidth
    canvasBack.height = window.outerHeight
    canvasBack.width = window.outerWidth

init = ->
    resizeCanvas()
    initImages()
    initBackground()
    world.start()

initBackground = ->
    background.init canvas, canvasBack
    world.add background

initImages = ->
    for img in images
        data = new Image
        data.src = img.url
        img.data = data

init()

# visibleImgsCount = 0
# degs = null
# perDeg = 0
# radius = 0
# headIter = null
# tailIter = null
# imgDoms = []
# isSliding = no

# $cover = null
# $wall = null
# $left = null
# $right = null
# $dashboard = null
# $currentActive = null

# THUMB_HEIGHT = 100
# THUMB_WIDTH = 65
# SLIDE_DURATION = 530


# init = ->
#     $wall = $ "div.wall"
#     $cover = $ "div.cover"
#     $left = $ "div.left"
#     $right = $ "div.right"
#     $dashboard = $ "div.dashboard"
#     initData()
#     initSwitches()
#     initDashboard()
#     next()

# initData = ->
#     images.forEach (img, i)->
#         img.index = i

# initSwitches = ->   
#     $left.on "touchstart", -> prev()
#     $right.on "touchstart", -> next()

# initDashboard = ->
#     rh = $dashboard.offsetHeight - THUMB_HEIGHT
#     rw = $dashboard.offsetWidth / 2
#     radius = 0.5 * (rw * rw + rh * rh) / rh

#     l = rw * 2
#     w = THUMB_WIDTH * 2
#     r = radius
#     perPI = Math.atan 0.5 * w / r
#     perDeg = piToDeg perPI

#     totalPI = 2 * Math.asin 0.5 * l / r
#     totalDeg = piToDeg totalPI

#     visibleImgsCount = Math.round totalPI / perPI
#     if visibleImgsCount % 2 is 0 then visibleImgsCount++

#     imgLoops = [0]
#     half = (visibleImgsCount - 1) / 2
#     for i in [1..half]
#         imgLoops.push i * perDeg
#         imgLoops.unshift -i * perDeg
#     degs = imgLoops

#     appenStyle radius + THUMB_HEIGHT
#     initImages()
#     initSlideCircle()

# initImages = ->
#     imgIter = new util.Iterator images, yes
#     headIter = new util.Iterator images, yes
#     for deg, i in degs
#         img = imgIter.current()
#         imgIter.next()

#         $div = document.createElement "div"
#         $div.className = "img transition"
#         $div.style.webkitTransform = "rotateZ(#{deg + 'deg'})"
#         $div.imgIndex = img.index

#         setBackground $div, img.url
#         imgDoms.push $div
#         $dashboard.appendChild $div

#     tailIter = imgIter
#     tailIter.prev()

# initSlideCircle = ->
#     currentPageX = originPageX = 0
#     THRESHOLD = 50

#     $dashboard.on "touchstart", (event)->
#         event.preventDefault()
#         touch = event.touches[0];
#         currentPageX = originPageX = touch.pageX

#     $dashboard.on "touchmove", (event)->
#         event.preventDefault()
#         touch = event.touches[0];
#         currentPageX = touch.pageX

#     $dashboard.on "touchend", (event)->
#         event.preventDefault()
#         if currentPageX > originPageX and currentPageX - originPageX > THRESHOLD
#             prev()
#         else if originPageX > currentPageX and originPageX - currentPageX > THRESHOLD
#             next()

# appenStyle = (radius)->
#     style = document.createElement "style"
#     style.innerHTML = """
#         div.dashboard div.img,
#         div.dashboard {
#             transform-origin: 50% #{radius}px;
#             -webkit-transform-origin: 50% #{radius}px;
#         }
#     """
#     document.body.appendChild style

# next = ->
#     if isSliding then return
#     isSliding = yes
#     setTimeout ->
#         isSliding = no
#     , SLIDE_DURATION
#     imgData = slideForward()
#     $wall.style.backgroundImage = "url(#{imgData.url})"
#     $cover.style.backgroundImage = "url(#{imgData.url})"

# prev = ->
#     if isSliding then return
#     isSliding = yes
#     setTimeout ->
#         isSliding = no
#     , SLIDE_DURATION
#     imgData = slideBackward()
#     $wall.style.backgroundImage = "url(#{imgData.url})"
#     $cover.style.backgroundImage = "url(#{imgData.url})"

# slideForward = ->    
#     deactive $currentActive
#     $img = imgDoms.shift()
#     headIter.next()
#     imgData = tailIter.next()
#     imgDoms.push $img
#     processSlideDom $img, imgData
#     $currentActive = imgDoms[(visibleImgsCount - 1) / 2]
#     active $currentActive
#     nextImgIndex = $currentActive.imgIndex
#     images[nextImgIndex]
    
# slideBackward = ->    
#     deactive $currentActive
#     $img = imgDoms.pop()
#     tailIter.prev()
#     imgData = headIter.prev()
#     imgDoms.unshift $img
#     processSlideDom $img, imgData
#     $currentActive = imgDoms[(visibleImgsCount - 1) / 2]
#     active $currentActive
#     nextImgIndex = $currentActive.imgIndex
#     images[nextImgIndex]

# active = ($img)->
#     addClass $img, "active"

# deactive = ($img)->
#     removeClass $img, "active"

# processSlideDom = ($img, imgData)->
#     removeClass $img, "transition"
#     setBackground $img, imgData.url
#     $img.imgIndex = imgData.index
#     resetRotate()
#     setTimeout ->
#         addClass $img, "transition"
#     , SLIDE_DURATION

# resetRotate = ->
#     for $img, i in imgDoms
#         setRotate $img, degs[i]

# init()

