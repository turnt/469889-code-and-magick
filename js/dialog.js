'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var dialogHandler = setup.querySelector('.setup-user-pic');
  var uploadNode = setup.querySelector('.upload');
  var avatarInput = setup.querySelector('input[name=avatar]');

  // block avatar
  avatarInput.addEventListener('click', function (e) {
    e.preventDefault();
  })

  var handleSetupForDrag = function (e) {
    e.preventDefault();

    var startCoords = {
      x: e.clientX,
      y: e.clientY,
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  uploadNode.addEventListener('mousedown', handleSetupForDrag, true);
})();
