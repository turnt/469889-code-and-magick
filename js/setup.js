'use strict';
var keycodes = {
  esc: 27,
  enter: 13,
};
// props from task
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

  fireballColors: [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848',
  ],
};

// return random value from array
var getRandomArrayItem = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// generate array of objects with users
var generateUsers = function (props) {
  var users = [];

  for (var i = 0, length = props.numberOfUsers; i < length; i += 1) {
    var user = {};

    user.name = getRandomArrayItem(props.names) + ' ' +
      getRandomArrayItem(props.surnames);
    user.coatColor = getRandomArrayItem(props.coatColors);
    user.eyesColor = getRandomArrayItem(props.eyesColors);

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

// get element by selector from document or optional block
var getBlockBySelector = function (target, block) {
  // get context
  var ctx = block || document;

  return ctx.querySelector(target);
};

// remove hidden class
var removeHiddenFromBlock = function (ctx) {
  ctx.classList.remove('hidden');
};

// add hidden class
var addHiddenForBlock = function (ctx) {
  ctx.classList.add('hidden');
};

// show setup block and render similar wizards
var renderSetup = function (ctx, props) {
  // generate users
  var users = generateUsers(props);
  // similar block in setup
  var setupSimilar = getBlockBySelector('.setup-similar', ctx);
  // get block for list of wizards
  var similarWizardsList = getBlockBySelector('.setup-similar-list');

  // get template for wizards
  var template = getBlockBySelector('#similar-wizard-template');
  var templateItem = getBlockBySelector(
      '.setup-similar-item',
      template.content
  );

  // render list with generated users
  renderSimilarWizards(users, templateItem, similarWizardsList);

  // make block of similar wizards visible
  removeHiddenFromBlock(setupSimilar);
};

// create listeners for setup block
var createSetupListeners = function (ctx, props) {
  var setupOpen = getBlockBySelector('.setup-open');
  var setupClose = getBlockBySelector('.setup-close', ctx);

  var userName = getBlockBySelector('.setup-title .setup-user-name', ctx);
  var userEyes = getBlockBySelector('.setup-player .wizard-eyes', ctx);
  var userCoat = getBlockBySelector('.setup-player .wizard-coat', ctx);
  var userFireball = getBlockBySelector(
      '.setup-player .setup-fireball-wrap',
      ctx
  );

  // rule of escape key for setup hidden
  var onPopupEscPress = function (e) {
    if (e.keyCode === keycodes.esc) {
      closeSetupPopup();
    }
  };

  // rule of enter key for setup popup visibility
  var onEnterPress = function (e) {
    if (e.keyCode === keycodes.enter) {
      if (ctx.classList.contains('hidden')) {
        openSetupPopup();
      } else {
        closeSetupPopup();
      }
    }
  };

  var openSetupPopup = function () {
    removeHiddenFromBlock(ctx);
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closeSetupPopup = function () {
    addHiddenForBlock(ctx);
    document.removeEventListener('keydown', onPopupEscPress);
  };

  // on eyes click
  var onClickEyes = function () {
    var newColor = getRandomArrayItem(props.eyesColors);
    var hiddenEyesInput = getBlockBySelector(
        'input[name="eyes-color"]',
        ctx
    );

    userEyes.style.fill = newColor;
    hiddenEyesInput.value = newColor;
  };

  // on fireball click
  var onClickFireball = function () {
    var newColor = getRandomArrayItem(props.fireballColors);
    var hiddenFireballInput = getBlockBySelector(
        'input[name="fireball-color"]',
        ctx
    );

    userFireball.style.backgroundColor = newColor;
    hiddenFireballInput.value = newColor;
  };

  // on coat click
  var onClickCoat = function () {
    var newColor = getRandomArrayItem(props.coatColors);
    var hiddenCoatInput = getBlockBySelector(
        'input[name="coat-color"]',
        ctx
    );

    userCoat.style.fill = newColor;
    hiddenCoatInput.value = newColor;
  };

  // ways to open setup popup
  setupOpen.addEventListener('click', openSetupPopup);
  setupOpen.addEventListener('keydown', onEnterPress);

  // way to close setup popup
  setupClose.addEventListener('keydown', onEnterPress);

  // prevent esc if name input focused
  userName.addEventListener('keydown', function (e) {
    if (e.keyCode === keycodes.esc) {
      e.stopPropagation();
    }
  });

  // wizard colors customization
  userEyes.addEventListener('click', onClickEyes);
  userCoat.addEventListener('click', onClickCoat);
  userFireball.addEventListener('click', onClickFireball);
};

// find setup block
var setupBlock = getBlockBySelector('.setup');

renderSetup(setupBlock, setupProps);
createSetupListeners(setupBlock, setupProps);
