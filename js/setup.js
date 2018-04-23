'use strict';
// starter
window.fireballSize = 22;
window.wizardSpeed = 3;
window.wizardWidth = 70;

window.getFireballSpeed = function(left) {
  var beforeWind = 5;
  var againstWind = 2;

  return left ? beforeWind : againstWind;
};

window.getWizardHeight = function() {
  var heightRatio = 1.337;

  return heightRatio * wizardWidth;
};

window.getWizardX = function(width) {
  return width / 2 - wizardWidth / 2;
};

window.getWizardY = function(height) {
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

      width: 70,
      position: 2 / 3,
    },
  };

  // generate array of objects with users
  var generateUsers = function (props) {
    var users = [];

    for (var i = 0, length = props.numberOfUsers; i < length; i += 1) {
      var user = {};

      user.name = util.getRandomArrayItem(props.names) + ' ' +
          util.getRandomArrayItem(props.surnames);
      user.coatColor = util.getRandomArrayItem(props.wizard.coatColors);
      user.eyesColor = util.getRandomArrayItem(props.wizard.eyesColors);

      users.push(user);
    }

    return users;
  };

  // return wizard filled by template
  var renderWizard = function (user, template) {
    var wizard = template.cloneNode(true);

    wizard.querySelector('.setup-similar-label').textContent = user.name;
    wizard.querySelector('.wizard-coat').style.fill = user.coatColor;
    wizard.querySelector('.wizard-eyes').style.fill = user.eyesColor;

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
  var renderSetup = function (ctx, props) {
    // generate users
    var users = generateUsers(props);
    // similar block in setup
    var setupSimilar = ctx.querySelector('.setup-similar');
    // get block for list of wizards
    var similarWizardsList = setupSimilar.querySelector('.setup-similar-list');

    // get template for wizards
    var template = document.querySelector('#similar-wizard-template');
    var templateItem = template.content.querySelector('.setup-similar-item');

    // render list with generated users
    renderSimilarWizards(users, templateItem, similarWizardsList);

    // make block of similar wizards visible
    util.toggleClass(setupSimilar, 'hidden');
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
      util.toggleClass(ctx, 'hidden');
      document.addEventListener('keydown', onPopupEscPress);
    };

    var closeSetupPopup = function () {
      util.toggleClass(ctx, 'hidden');
      ctx.style.left = initialContextPositionX;
      ctx.style.top = initialContextPositionY;
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
      var newColor = util.getRandomArrayItem(props.wizard.eyesColors);
      var hiddenEyesInput = ctx.querySelector('input[name="eyes-color"]');

      userEyes.style.fill = newColor;
      hiddenEyesInput.value = newColor;
    };

    // on fireball click
    var onClickFireball = function () {
      var newColor = util.getRandomArrayItem(props.wizard.fireball.colors);
      var hiddenFireballInput = ctx.querySelector(
          'input[name="fireball-color"]'
      );

      userFireball.style.backgroundColor = newColor;
      hiddenFireballInput.value = newColor;
    };

    // on coat click
    var onClickCoat = function () {
      var newColor = util.getRandomArrayItem(props.wizard.coatColors);
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

  // find setup block
  var setupBlock = document.querySelector('.setup');

  renderSetup(setupBlock, setupProps);
  createSetupListeners(setupBlock, setupProps);
})();
