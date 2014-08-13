(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var $, BUTTON_SIZE, GAP, RADIUS, canvas, canvasHeight, canvasWidth, init, resizeCanvas, test, util;

util = require("./util.coffee");

$ = util.$;

canvas = $("#canvas");

canvasWidth = window.innerWidth;

canvasHeight = window.innerHeight;

BUTTON_SIZE = 50;

GAP = 10;

RADIUS = 0.5 * canvasWidth - (0.5 * BUTTON_SIZE + GAP);

init = function() {
  resizeCanvas();
  return test();
};

resizeCanvas = function() {
  canvas.width = canvasWidth;
  return canvas.height = canvasHeight;
};

test = function() {};

init();



},{"./util.coffee":2}],2:[function(require,module,exports){
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



},{}]},{},[1]);