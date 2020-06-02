'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SHADOW_GAP = 10;
var GAP = 20;
var TEXT_HEIGHT = 16;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_GAP = 50;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var renderText = function (ctx, text, x, y) {
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText(text, x, y);
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + SHADOW_GAP, CLOUD_Y + SHADOW_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  var maxTime = getMaxElement(times);

  renderText(ctx, 'Ура вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP);
  renderText(ctx, 'Список результатов:', CLOUD_X + GAP, CLOUD_Y + GAP + 16);

  for (var i = 0; i < players.length; i++) {
    var CHART_GAP = (CLOUD_WIDTH - BAR_WIDTH * players.length - BAR_GAP * (players.length - 1)) / 2;

    ctx.fillStyle = 'hsl( 220, 50%, ' + 100 * Math.random() + '%)';

    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }
    ctx.fillRect(CLOUD_X + CHART_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - GAP / 2 - TEXT_HEIGHT - (BAR_HEIGHT * times[i] / maxTime), BAR_WIDTH, BAR_HEIGHT * times[i] / maxTime);
    renderText(ctx, players[i], CLOUD_X + CHART_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - GAP);
    renderText(ctx, Math.round(times[i]), CLOUD_X + CHART_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - GAP * 1.5 - TEXT_HEIGHT - (BAR_HEIGHT * times[i] / maxTime));
  }
};
