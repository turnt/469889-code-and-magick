'use strict';

(function () {
  // get element by selector from document or optional block
  var getNodesBySelector = function (selector, node) {
    // get context
    var ctx = node || document;

    if (node && ctx.length) {
      return ctx.querySelectorAll(selector);
    }

    return ctx.querySelector(selector);
  };

  // remove hidden class
  var toggleClass = function (ctx, className) {
    ctx.classList.toggle(className);
  };

  // return random value from array
  var getRandomArrayItem = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  // get max element in array
  var getMaxElement = function (arr) {
    var maxElement = arr[0];

    for (var i = 0, length = arr.length; i < length; i += 1) {
      if (arr[i] > maxElement) {
        maxElement = arr[i];
      }
    }

    return maxElement;
  };

  window.util = {
    getNodesBySelector: getNodesBySelector,
    toggleClass: toggleClass,
    getRandomArrayItem: getRandomArrayItem,
    getMaxElement: getMaxElement,
  };
})();
