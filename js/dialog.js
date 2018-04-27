'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var uploadNode = setup.querySelector('.upload');
  var avatarInput = setup.querySelector('input[name=avatar]');

  // block avatar
  avatarInput.addEventListener('click', function (e) {
    e.preventDefault();
  });

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

  uploadNode.addEventListener('mousedown', handleSetupForDrag);

  window.setupPopup = setup;
})();

(function () {
  var setupArtifacts = 'setup-artifacts';
  var artifactCell = setupArtifacts + '-cell';
  var artifactsShop = setupArtifacts + '-shop';
  var dragged;

  var artifactsCells = window.setupPopup.querySelectorAll('.' + artifactCell + ' > *');
  var setupArtifactsZone = window.setupPopup.querySelector('.' + setupArtifacts);

  var dragRule = function (target) {
    if (target.parentNode.className !== artifactsShop &&
        target.className === artifactCell &&
        target.children.length === 0) {
      return true;
    }
    return false;
  };

  // mark content of cell as draggable
  for (var i = 0; i < artifactsCells.length; i += 1) {
    artifactsCells[i].draggable = true;
  }

  // highlight dropzone
  document.addEventListener('dragstart', function (e) {
    dragged = e.target;
    setupArtifactsZone.style.outline = '2px dashed red';
  });

  // prevent default actions when dragging
  document.addEventListener('dragover', function (e) {
    e.preventDefault();
  });

  // drag enter cell
  document.addEventListener('dragenter', function (e) {
    // highlight potential target if it's empty
    if (dragRule(e.target)) {
      e.target.style.background = 'yellow';
    }
  });

  // drag leave cell
  document.addEventListener('dragleave', function (e) {
    if (e.target.className === artifactCell) {
      e.target.style.background = null;
    }
  });

  // drop item to cell
  document.addEventListener('drop', function (e) {
    e.preventDefault();
    // reset dropzone outline style
    setupArtifactsZone.style.outline = null;
    // move dragged item if it's empty
    if (dragRule(e.target)) {
      // reset background
      e.target.style.background = null;

      var item = dragged.cloneNode();

      // if dragging started not from shop
      if (e.target.parentNode.className === setupArtifacts &&
          dragged.parentNode.parentNode.className !== artifactsShop) {
        dragged.parentNode.removeChild(dragged);
      }
      e.target.appendChild(item);
    }
  });
})();
