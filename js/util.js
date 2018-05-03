'use strict';

(function () {
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

  // export utils
  window.util = {
    toggleClass: toggleClass,
    getRandomArrayItem: getRandomArrayItem,
    getMaxElement: getMaxElement,
  };
})();
