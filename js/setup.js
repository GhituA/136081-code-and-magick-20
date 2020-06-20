'use strict';

var wizardSetupWindow = document.querySelector('.setup');
var wizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('div');
var similarWizardList = document.querySelector('.setup-similar-list');
var fragment = document.createDocumentFragment();
var wizards = [];

wizardSetupWindow.classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');

var WIZARD_NAME = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LASTNAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYE_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

var getRandom = function (elements) {
  var randomElement = elements[Math.floor(Math.random() * elements.length)];
  return randomElement;
};

for (var i = 0; i < 4; i++) {
  wizards[i] = {
    name: getRandom(WIZARD_NAME) + ' ' + getRandom(WIZARD_LASTNAME),
    coatColor: getRandom(COAT_COLOR),
    eyesColor: getRandom(EYE_COLOR)
  };
}

var upgradeWizard = function (wizard) {
  var element = wizardTemplate.cloneNode(true);
  element.querySelector('.setup-similar-label').textContent = wizard.name;
  element.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  element.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return element;
};

for (var j = 0; j < wizards.length; j++) {
  fragment.appendChild(upgradeWizard(wizards[j]));
}
similarWizardList.appendChild(fragment);
