(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// From http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
// By @PaulIrish, thx god!
var lastTime = 0;
var vendors = ['webkit', 'moz'];

for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame =
      window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
}

if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); },
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };

if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };

// Fastclick for mobile
window.addEventListener("load", function() {
    // FastClick.attach(document.body)
})

},{}],2:[function(require,module,exports){
var $, BUTTON_SIZE, Button, GAP, RADIUS, buttons, canvas, canvasHeight, canvasWidth, ctx, init, initClear, initEvents, moveBack, moveFront, resizeCanvas, test, util, world;

util = require("./util.coffee");

world = require("./world.coffee");

$ = util.$;

canvas = $("#canvas");

canvasWidth = window.innerWidth;

canvasHeight = window.innerHeight;

ctx = canvas.getContext("2d");

BUTTON_SIZE = 95;

GAP = 8;

RADIUS = 0.5 * canvasWidth - (0.5 * BUTTON_SIZE + GAP);

buttons = [];

init = function() {
  resizeCanvas();
  initClear();
  initEvents();
  world.start();
  return test();
};

resizeCanvas = function() {
  canvas.width = canvasWidth;
  return canvas.height = canvasHeight;
};

initClear = function() {
  var bg;
  bg = new Image;
  bg.src = "img/bg.png";
  return world.add({
    move: function() {
      ctx.save();
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(bg, 0, 0, canvasWidth, canvasHeight);
      return ctx.restore();
    }
  });
};

initEvents = function() {
  var pageX, pageY;
  pageX = 0;
  pageY = 0;
  canvas.addEventListener("touchstart", function(event) {
    var touch;
    event.preventDefault();
    touch = event.touches[0];
    pageX = touch.pageX;
    return pageY = touch.pageY;
  });
  return canvas.addEventListener("touchmove", function(event) {
    var touch, x, y;
    event.preventDefault();
    touch = event.touches[0];
    x = touch.pageX;
    y = touch.pageY;
    if (Math.abs(x - pageX) < 15) {
      return;
    }
    if (y > canvasHeight / 2) {
      if (x > pageX) {
        moveBack();
      } else {
        moveFront();
      }
    } else {
      if (x > pageX) {
        moveFront();
      } else {
        moveBack();
      }
    }
    pageX = x;
    return pageY = y;
  });
};

moveFront = function() {
  var button, _i, _len, _results;
  _results = [];
  for (_i = 0, _len = buttons.length; _i < _len; _i++) {
    button = buttons[_i];
    _results.push(button.go());
  }
  return _results;
};

moveBack = function() {
  var button, _i, _len, _results;
  _results = [];
  for (_i = 0, _len = buttons.length; _i < _len; _i++) {
    button = buttons[_i];
    _results.push(button.back());
  }
  return _results;
};

test = function() {
  var button, currentDeg, img, imgPath, imgsPath, perDeg, _i, _len, _results;
  imgsPath = ["img/button1.png", "img/button2.png", "img/button3.png", "img/button4.png", "img/button5.png", "img/button6.png"];
  perDeg = 360 / imgsPath.length;
  currentDeg = 0;
  _results = [];
  for (_i = 0, _len = imgsPath.length; _i < _len; _i++) {
    imgPath = imgsPath[_i];
    img = new Image;
    img.src = imgPath;
    button = new Button(currentDeg, img);
    currentDeg += perDeg;
    buttons.push(button);
    _results.push(world.add(button));
  }
  return _results;
};

Button = (function() {
  function Button(deg, img) {
    this.deg = deg;
    this.img = img;
    this.max = 14;
    this.v = 0;
    this.pace = 0.7;
    this.force = 0.1;
  }

  Button.prototype.move = function() {
    var piDeg;
    this.updateDeg();
    piDeg = this.deg / 180 * Math.PI;
    ctx.save();
    ctx.translate(canvasWidth / 2, canvasHeight / 2);
    ctx.rotate(piDeg);
    ctx.drawImage(this.img, -BUTTON_SIZE / 2, RADIUS - BUTTON_SIZE / 2, BUTTON_SIZE, BUTTON_SIZE);
    return ctx.restore();
  };

  Button.prototype.go = function() {
    this.v += this.pace;
    if (this.v >= this.max) {
      return this.v = this.max;
    }
  };

  Button.prototype.back = function() {
    this.v -= this.pace;
    if (this.v <= -this.max) {
      return this.v = -this.max;
    }
  };

  Button.prototype.stop = function() {
    return this.v = 0;
  };

  Button.prototype.updateDeg = function() {
    this.deg += this.v;
    if ((this.v + 0.001) * (this.v - this.force) < 0) {
      return this.v = 0;
    } else {
      if (this.v > 0) {
        return this.v -= this.force;
      } else {
        return this.v += this.force;
      }
    }
  };

  return Button;

})();

init();



},{"./util.coffee":3,"./world.coffee":4}],3:[function(require,module,exports){
var $;

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

module.exports = {
  $: $
};



},{}],4:[function(require,module,exports){
var spirts, timer, world;

require("../../lib/anim");

world = {};

timer = null;

spirts = [];

world.start = function() {
  var run;
  run = function() {
    var spirt, _i, _len;
    for (_i = 0, _len = spirts.length; _i < _len; _i++) {
      spirt = spirts[_i];
      spirt.move();
    }
    return timer = requestAnimationFrame(run);
  };
  return run();
};

world.add = function(spirt) {
  return spirts.push(spirt);
};

module.exports = world;



},{"../../lib/anim":1}]},{},[2]);