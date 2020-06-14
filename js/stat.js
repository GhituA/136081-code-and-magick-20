'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var SHADOW_GAP = 10;
var GAP = 15;
var TEXT_HEIGHT = 16;
var BAR_WIDTH = 40;
var BAR_MAXHEIGHT = 150;
var BAR_GAP = 50;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function (ctx, text, x, y) {
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText(text, x, y);
};

var getMaxElement = function (playerScore) {
  var maxElement = playerScore[0];

  for (var i = 1; i < playerScore.length; i++) {
    if (playerScore[i] > maxElement) {
      maxElement = playerScore[i];
    }
  }
  return maxElement;
};

var renderBar = function (ctx, players, barX, barY, barHeight) {
  ctx.fillStyle = 'hsl( 230,' + 100 * Math.random() + '%, 50%)';

  if (players === 'Вы') {
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
  }
  ctx.fillRect(barX, barY, BAR_WIDTH, barHeight);
};

var renderChart = function (ctx, players, times) {
  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    var CHART_GAP = (CLOUD_WIDTH - BAR_WIDTH * players.length - BAR_GAP * (players.length - 1)) / 2;

    var barX = CLOUD_X + CHART_GAP + (BAR_GAP + BAR_WIDTH) * i;
    var barHeight = BAR_MAXHEIGHT * times[i] / maxTime;
    var barY = CLOUD_HEIGHT - GAP / 2 - TEXT_HEIGHT - barHeight;
    var nameY = CLOUD_HEIGHT - GAP;
    var scoreY = CLOUD_HEIGHT - GAP * 2 - TEXT_HEIGHT - barHeight;

    renderText(ctx, players[i], barX, nameY);
    renderText(ctx, Math.round(times[i]), barX, scoreY);
    renderBar(ctx, players[i], barX, barY, barHeight);
  }
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + SHADOW_GAP, CLOUD_Y + SHADOW_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  renderText(ctx, 'Ура вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP);
  renderText(ctx, 'Список результатов:', CLOUD_X + GAP, CLOUD_Y + GAP + 16);

  renderChart(ctx, players, times);
};
