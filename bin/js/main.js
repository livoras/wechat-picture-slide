(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
	"images": [
		{"url": "img/foo4.jpg", "text": "这是一个美女", "name": "Jimmy"},
		{"url": "img/foo1.png", "text": "这是一个美女", "name": "Lucy"},
		{"url": "img/foo2.jpg", "text": "这是一个美女", "name": "Tony"},
		{"url": "img/foo3.jpg", "text": "这是一个美女", "name": "Honey"},
		{"url": "img/foo5.jpg", "text": "这是一个美女", "name": "Jerry"}
	]
}
},{}],2:[function(require,module,exports){
var $, $cover, $dashboard, $left, $right, $wall, THUMB_HEIGHT, THUMB_WIDTH, appenStyle, currentIndex, data, degs, headIter, images, imgDoms, init, initDashboard, initImages, initSlideCircle, initSwitches, next, perDeg, piToDeg, prev, radius, tailIter, util, visibleImgsCount;

data = require("./data.json");

util = require("./util.coffee");

images = data.images;

currentIndex = images.length - 1;

visibleImgsCount = 0;

degs = null;

perDeg = 0;

radius = 0;

$ = util.$;

headIter = null;

tailIter = null;

imgDoms = [];

$cover = null;

$wall = null;

$left = null;

$right = null;

$dashboard = null;

THUMB_HEIGHT = 100;

THUMB_WIDTH = 65;

init = function() {
  $wall = $("div.wall");
  $cover = $("div.cover");
  $left = $("div.left");
  $right = $("div.right");
  $dashboard = $("div.dashboard");
  next();
  initSwitches();
  return initDashboard();
};

initSwitches = function() {
  $left.on("touchstart", function() {
    return prev();
  });
  return $right.on("touchstart", function() {
    return next();
  });
};

initDashboard = function() {
  var half, i, imgLoops, l, perPI, r, rh, rw, totalDeg, totalPI, w, _i;
  rh = $dashboard.offsetHeight - THUMB_HEIGHT;
  rw = $dashboard.offsetWidth / 2;
  radius = 0.5 * (rw * rw + rh * rh) / rh;
  l = rw * 2;
  w = THUMB_WIDTH * 2;
  r = radius;
  perPI = Math.atan(0.5 * w / r);
  perDeg = piToDeg(perPI);
  totalPI = 2 * Math.asin(0.5 * l / r);
  totalDeg = piToDeg(totalPI);
  visibleImgsCount = Math.round(totalPI / perPI);
  if (visibleImgsCount % 2 === 0) {
    visibleImgsCount++;
  }
  imgLoops = [0];
  half = (visibleImgsCount - 1) / 2;
  for (i = _i = 1; 1 <= half ? _i <= half : _i >= half; i = 1 <= half ? ++_i : --_i) {
    imgLoops.push(i * perDeg);
    imgLoops.unshift(-i * perDeg);
  }
  degs = imgLoops;
  appenStyle(radius + THUMB_HEIGHT);
  initImages();
  return initSlideCircle();
};

initImages = function() {
  var $div, deg, i, img, imgIter, _i, _len;
  imgIter = new util.Iterator(images, true);
  headIter = new util.Iterator(images, true);
  for (i = _i = 0, _len = degs.length; _i < _len; i = ++_i) {
    deg = degs[i];
    img = imgIter.current();
    imgIter.next();
    $div = document.createElement("div");
    $div.className = "img";
    $div.style.backgroundImage = "url(" + img.url + ")";
    $div.style.webkitTransform = "rotateZ(" + (deg + 'deg') + ")";
    imgDoms.push($div);
    $dashboard.appendChild($div);
  }
  console.log(imgDoms);
  tailIter = imgIter;
  return tailIter.prev();
};

initSlideCircle = function() {
  var deg;
  return deg = 0;
};

piToDeg = function(pi) {
  return pi / Math.PI * 180;
};

appenStyle = function(radius) {
  var style;
  style = document.createElement("style");
  style.innerHTML = "div.dashboard div.img,\ndiv.dashboard {\n	transform-origin: 50% " + radius + "px;\n	-webkit-transform-origin: 50% " + radius + "px;\n}";
  return document.body.appendChild(style);
};

next = function() {
  currentIndex++;
  if (currentIndex === images.length) {
    currentIndex = 0;
  }
  $wall.style.backgroundImage = "url(" + images[currentIndex].url + ")";
  return $cover.style.backgroundImage = "url(" + images[currentIndex].url + ")";
};

prev = function() {
  currentIndex--;
  if (currentIndex === -1) {
    currentIndex = images.length - 1;
  }
  $wall.style.backgroundImage = "url(" + images[currentIndex].url + ")";
  return $cover.style.backgroundImage = "url(" + images[currentIndex].url + ")";
};

init();



},{"./data.json":1,"./util.coffee":3}],3:[function(require,module,exports){
var $, Iterator;

$ = function(selector) {
  var dom, doms;
  doms = document.querySelectorAll(selector);
  if (doms.length === 1) {
    dom = doms[0];
    dom.on = function() {
      return dom.addEventListener.apply(dom, arguments);
    };
    return doms[0];
  }
  return doms;
};

Iterator = (function() {
  function Iterator(list, isLoop) {
    this.list = list;
    this.index = 0;
    this.isLoop = isLoop || false;
  }

  Iterator.prototype.set = function(index) {
    return this.index = index;
  };

  Iterator.prototype.next = function() {
    if (this.index + 1 === this.list.length) {
      if (this.isLoop) {
        this.index = 0;
      } else {
        return;
      }
    } else {
      this.index++;
    }
    return this.list[this.index];
  };

  Iterator.prototype.prev = function() {
    if (this.index - 1 === 0) {
      if (this.isLoop) {
        this.index = this.list.length - 1;
      } else {
        return;
      }
    } else {
      this.index--;
    }
    return this.list[this.index];
  };

  Iterator.prototype.current = function() {
    return this.list[this.index];
  };

  return Iterator;

})();

module.exports = {
  $: $,
  Iterator: Iterator
};



},{}]},{},[2]);