'use strict';
// starter
window.fireballSize = 22;
window.wizardSpeed = 3;
window.wizardWidth = 70;

window.getFireballSpeed = function (left) {
  var beforeWind = 5;
  var againstWind = 2;

  return left ? beforeWind : againstWind;
};

window.getWizardHeight = function () {
  var heightRatio = 1.337;

  return heightRatio * window.wizardWidth;
};

window.getWizardX = function (width) {
  return width / 2 - window.wizardWidth / 2;
};

window.getWizardY = function (height) {
  var wizardPosition = 1 - 2 / 3;

  return height * wizardPosition;
};

(function () {
  // keycodes
  var keycodes = {
    ESC: 27,
    ENTER: 13,
  };

  var setupProps = {
    numberOfUsers: 4,

    names: [
      'Иван',
      'Хуан Себастьян',
      'Мария',
      'Кристоф',
      'Виктор',
      'Юлия',
      'Люпита',
      'Вашингтон',
    ],

    surnames: [
      'да Марья',
      'Верон',
      'Мирабелла',
      'Вальц',
      'Онопко',
      'Топольницкая',
      'Нионго',
      'Ирвинг',
    ],

    wizard: {
      coatColors: [
        'rgb(101, 137, 164)',
        'rgb(241, 43, 107)',
        'rgb(146, 100, 161)',
        'rgb(56, 159, 117)',
        'rgb(215, 210, 55)',
        'rgb(0, 0, 0)',
      ],

      eyesColors: [
        'black',
        'red',
        'blue',
        'yellow',
        'green',
      ],

      fireball: {
        colors: [
          '#ee4830',
          '#30a8ee',
          '#5ce6c0',
          '#e848d5',
          '#e6e848',
        ],
      },
    },
  };

  // return wizard filled by template
  var renderWizard = function (user, template) {
    var wizard = template.cloneNode(true);

    wizard.querySelector('.setup-similar-label').textContent = user.name;
    wizard.querySelector('.wizard-coat').style.fill = user.colorCoat;
    wizard.querySelector('.wizard-eyes').style.fill = user.colorEyes;

    return wizard;
  };

  // render wizards to list block
  var renderSimilarWizards = function (users, template, target) {
    // use fragment for creating full list of wizards
    var fragment = document.createDocumentFragment();

    for (var i = 0, length = users.length; i < length; i += 1) {
      fragment.appendChild(renderWizard(users[i], template));
    }

    // fill target block with fragment
    target.appendChild(fragment);
  };

  // show setup block and render similar wizards
  var renderSetup = function (ctx, users) {
    // similar block in setup
    var setupSimilar = ctx.querySelector('.setup-similar');
    // get block for list of wizards
    var similarWizardsList = setupSimilar.querySelector('.setup-similar-list');

    // get template for wizards
    var template = document.querySelector('#similar-wizard-template');
    var templateItem = template.content.querySelector('.setup-similar-item');

    // render list with generated users
    renderSimilarWizards(
        window.util.getMultipleRandomArrayItems(
            users,
            false,
            setupProps.numberOfUsers
        ),
        templateItem,
        similarWizardsList
    );

    // make block of similar wizards visible
    window.util.toggleClass(setupSimilar, 'hidden');
  };

  // create listeners for setup block
  var createSetupListeners = function (ctx, props) {
    var initialCtxPositionX = ctx.style.left;
    var initialCtxPositionY = ctx.style.top;
    var setupOpen = document.querySelector('.setup-open');
    var setupClose = ctx.querySelector('.setup-close');

    var userName = ctx.querySelector('.setup-title .setup-user-name');
    var userEyes = ctx.querySelector('.setup-player .wizard-eyes');
    var userCoat = ctx.querySelector('.setup-player .wizard-coat');
    var userFireball = ctx.querySelector('.setup-player .setup-fireball-wrap');

    var openSetupPopup = function () {
      window.util.toggleClass(ctx, 'hidden');
      document.addEventListener('keydown', onPopupEscPress);
    };

    var closeSetupPopup = function () {
      window.util.toggleClass(ctx, 'hidden');
      ctx.style.left = initialCtxPositionX;
      ctx.style.top = initialCtxPositionY;
      document.removeEventListener('keydown', onPopupEscPress);
    };

    // rule of escape key for setup hidden
    var onPopupEscPress = function (e) {
      if (e.keyCode === keycodes.ESC) {
        closeSetupPopup();
      }
    };

    // rule of enter key for setup popup visibility
    var onEnterPress = function (e) {
      if (e.keyCode === keycodes.ENTER) {
        if (ctx.classList.contains('hidden')) {
          openSetupPopup();
        } else {
          closeSetupPopup();
        }
      }
    };

    // on eyes click
    var onClickEyes = function () {
      var newColor = window.util.getRandomArrayItem(props.wizard.eyesColors);
      var hiddenEyesInput = ctx.querySelector('input[name="eyes-color"]');

      userEyes.style.fill = newColor;
      hiddenEyesInput.value = newColor;
    };

    // on fireball click
    var onClickFireball = function () {
      var newColor = window.util.getRandomArrayItem(props.wizard.fireball.colors);
      var hiddenFireballInput = ctx.querySelector(
          'input[name="fireball-color"]'
      );

      userFireball.style.backgroundColor = newColor;
      hiddenFireballInput.value = newColor;
    };

    // on coat click
    var onClickCoat = function () {
      var newColor = window.util.getRandomArrayItem(props.wizard.coatColors);
      var hiddenCoatInput = ctx.querySelector('input[name="coat-color"]');

      userCoat.style.fill = newColor;
      hiddenCoatInput.value = newColor;
    };

    // ways to open setup popup
    setupOpen.addEventListener('click', openSetupPopup);
    setupOpen.addEventListener('keydown', onEnterPress);

    // way to close setup popup
    setupClose.addEventListener('click', closeSetupPopup);
    setupClose.addEventListener('keydown', onEnterPress);

    // prevent esc if name input focused
    userName.addEventListener('keydown', function (e) {
      if (e.keyCode === keycodes.ESC) {
        e.stopPropagation();
      }
    });

    // wizard colors customization
    userEyes.addEventListener('click', onClickEyes);
    userCoat.addEventListener('click', onClickCoat);
    userFireball.addEventListener('click', onClickFireball);
  };

  var successHandler = function (wizards) {
    renderSetup(window.setupPopup, wizards);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    var style = node.style;
    var alertStyle = {
      position: 'fixed',
      top: '0',
      left: '0',
      zIndex: 100,
      fontSize: '24px',
      color: 'red',
      textAlign: 'center',
      width: '100%',
      padding: '2vh 0',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px 2px rgba(0, 0, 0, 0.4)',
    };

    var keys = Object.keys(alertStyle);

    for (var i = 0; i < keys.length; i += 1) {
      style[keys[i]] = alertStyle[keys[i]];
    }

    node.textContent = errorMessage;
    node.id = 'system-alert';
    document.body.insertAdjacentElement('beforeend', node);
  };

  var form = window.setupPopup.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      window.setupPopup.classList.add('hidden');
    }, errorHandler);
    evt.preventDefault();
  });

  window.backend.load(successHandler, errorHandler);
  createSetupListeners(window.setupPopup, setupProps);
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
