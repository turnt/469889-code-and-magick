'use strict';

(function () {
  // return new shuffled array
  var shuffleArray = function (arr) {
    var shuffledArray = arr.slice();
    var counter = shuffledArray.length;

    while (counter > 0) {
      var index = Math.floor(Math.random() * counter);

      counter -= 1;

      var temp = shuffledArray[counter];
      shuffledArray[counter] = shuffledArray[index];
      shuffledArray[index] = temp;
    }

    return shuffledArray;
  };

  // Array with multiple values from array
  // and shuffle it if straight is undefined or false
  var getMultipleRandomArrayItems = function (arr, straight, n) {
    var items = [];
    var resultArray = straight ? arr.slice() : shuffleArray(arr);
    var length = n || Math.ceil(Math.random() * resultArray.length);

    for (var i = 0; i < length; i += 1) {
      items.push(resultArray[i]);
    }

    return items;
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

  // export utils
  window.util = {
    toggleClass: toggleClass,
    getRandomArrayItem: getRandomArrayItem,
    getMaxElement: getMaxElement,
    getMultipleRandomArrayItems: getMultipleRandomArrayItems,
  };
})();
