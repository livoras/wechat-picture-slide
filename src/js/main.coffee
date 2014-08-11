data = require "./data.json"
util = require "./util.coffee"

images = data.images 
currentIndex = images.length - 1
visibleImgsCount = 0
degs = null
perDeg = 0
radius = 0
$ = util.$
headIter = null
tailIter = null
imgDoms = []

$cover = null
$wall = null
$left = null
$right = null
$dashboard = null

THUMB_HEIGHT = 100
THUMB_WIDTH = 65


init = ->
    $wall = $ "div.wall"
    $cover = $ "div.cover"
    $left = $ "div.left"
    $right = $ "div.right"
    $dashboard = $ "div.dashboard"
    next()
    initSwitches()
    initDashboard()

initSwitches = ->   
    $left.on "touchstart", -> prev()
    $right.on "touchstart", -> next()

initDashboard = ->
    rh = $dashboard.offsetHeight - THUMB_HEIGHT
    rw = $dashboard.offsetWidth / 2
    radius = 0.5 * (rw * rw + rh * rh) / rh

    l = rw * 2
    w = THUMB_WIDTH * 2
    r = radius
    perPI = Math.atan 0.5 * w / r
    perDeg = piToDeg perPI

    totalPI = 2 * Math.asin 0.5 * l / r
    totalDeg = piToDeg totalPI

    visibleImgsCount = Math.round totalPI / perPI
    if visibleImgsCount % 2 is 0 then visibleImgsCount++

    imgLoops = [0]
    half = (visibleImgsCount - 1) / 2
    for i in [1..half]
        imgLoops.push i * perDeg
        imgLoops.unshift -i * perDeg
    degs = imgLoops

    appenStyle radius + THUMB_HEIGHT
    initImages()
    initSlideCircle()

initImages = ->
    imgIter = new util.Iterator images, yes
    headIter = new util.Iterator images, yes
    for deg, i in degs
        img = imgIter.current()
        imgIter.next()
        $div = document.createElement "div"
        $div.className = "img"
        $div.style.backgroundImage = "url(#{img.url})"
        $div.style.webkitTransform = "rotateZ(#{deg + 'deg'})"
        imgDoms.push $div
        $dashboard.appendChild $div
    console.log imgDoms
    tailIter = imgIter
    tailIter.prev()

initSlideCircle = ->
    deg = 0

piToDeg = (pi)->        
    pi / Math.PI * 180

appenStyle = (radius)->
    style = document.createElement "style"
    style.innerHTML = """
        div.dashboard div.img,
        div.dashboard {
            transform-origin: 50% #{radius}px;
            -webkit-transform-origin: 50% #{radius}px;
        }
    """
    document.body.appendChild style

next = ->
    currentIndex++
    if currentIndex is images.length then currentIndex = 0
    $wall.style.backgroundImage = "url(#{images[currentIndex].url})"
    $cover.style.backgroundImage = "url(#{images[currentIndex].url})"

prev = ->
    currentIndex--
    if currentIndex is -1 then currentIndex = images.length - 1
    $wall.style.backgroundImage = "url(#{images[currentIndex].url})"
    $cover.style.backgroundImage = "url(#{images[currentIndex].url})"

init()
