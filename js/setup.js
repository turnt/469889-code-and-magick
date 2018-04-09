'use strict';
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

    user.name = getRandomArrayItem(props.names) + ' ' + getRandomArrayItem(props.surnames);
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
}

// remove hidden class
var removeHiddenFromBlock = function (ctx) {
  ctx.classList.remove('hidden');
}

// show setup block and render similar wizards
var renderSetup = function(props) {
  // generate users
  var users = generateUsers(props);
  // find setup block
  var setupBlock = getBlockBySelector('.setup');
  // similar block in setup
  var setupSimilar = getBlockBySelector('.setup-similar', setupBlock);

  // get template for wizards
  var template = getBlockBySelector('#similar-wizard-template');
  var templateItem = getBlockBySelector('.setup-similar-item', template.content);

  // get block for list of wizards
  var similarWizardsList = getBlockBySelector('.setup-similar-list');

  // make setup block visible
  removeHiddenFromBlock(setupBlock);

  // render list with generated users
  renderSimilarWizards(users, templateItem, similarWizardsList);

  // make block of similar wizards visible
  removeHiddenFromBlock(setupSimilar);
};

renderSetup(setupProps);
