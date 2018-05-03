'use strict';

(function () {
  // statistics block properties
  var statistics = {
    positionX: 100,
    positionY: 10,
    width: 420,
    height: 270,
    backgroundColor: '#ffffff',

    shadow: {
      shift: 10,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    getShadowPositionX: function () {
      return this.positionX + this.shadow.shift;
    },
    getShadowPositionY: function () {
      return this.positionY + this.shadow.shift;
    },

    textStyle: {
      fontSize: '16px',
      fontFamily: 'PT Mono',
      color: 'black',
      startGapX: 20,
      startGapY: 30,
    },
    getTextBasePaddingX: function () {
      return this.positionX + this.textStyle.startGapX;
    },
    getTextBasePaddingY: function () {
      return this.positionY + this.textStyle.startGapY;
    },
    getTextLineHeight: function () {
      return parseInt(this.textStyle.fontSize, 10) * 1.25;
    },

    title: ['Ура вы победили!', 'Список результатов:'],

    gist: {
      height: 150,
      width: 50,
      gap: 50,
      selfColor: 'rgba(255, 0, 0, 1)',
    },
  };

  // change ctx fillStyle color
  var changeColor = function (ctx, color) {
    ctx.fillStyle = color;
  };

  // draw cloud
  var renderCloud = function (ctx, props) {
    // cloud shadow
    changeColor(ctx, props.shadow.backgroundColor);
    ctx.fillRect(
        props.getShadowPositionX(),
        props.getShadowPositionY(),
        props.width, props.height
    );

    // statistics block
    changeColor(ctx, props.backgroundColor);
    ctx.fillRect(props.positionX, props.positionY, props.width, props.height);
  };

  // draw title
  var renderTitle = function (ctx, props) {
    changeColor(ctx, props.textStyle.color);
    ctx.font = props.textStyle.fontSize + ' ' + props.textStyle.fontFamily;

    for (var i = 0, length = props.title.length; i < length; i += 1) {
      var additionVerticalGap = props.getTextLineHeight() * i;

      ctx.fillText(
          props.title[i],
          props.getTextBasePaddingX(),
          props.getTextBasePaddingY() + additionVerticalGap
      );
    }
  };

  // draw graph
  var renderGraph = function (ctx, props, players, times) {
    var maxTime = window.util.getMaxElement(times);
    var lineHeight = props.getTextLineHeight();
    var titleHeight = props.title.length * lineHeight;

    var gistWidth = props.gist.width;
    var gistBaseHeight = props.gist.height;
    var gistGap = props.gist.gap;

    // graph size and position props
    var graphWidth = players.length * (gistWidth + gistGap) - gistGap;
    var graphPositionX = props.positionX + (props.width - graphWidth) / 2;
    var graphPositionY = props.positionY + titleHeight + lineHeight;

    // walk through players
    for (var i = 0, length = players.length; i < length; i++) {
      // gist size and position props
      var gistHeight = times[i] * gistBaseHeight / maxTime;

      var gistPositionX = graphPositionX + (gistGap + gistWidth) * i;
      var gistPositionY = graphPositionY + gistBaseHeight -
          gistHeight + lineHeight;

      // Y position for labels
      var timePositionY = gistPositionY - lineHeight / 2;
      var namePositionY = props.getTextBasePaddingY() + gistBaseHeight +
          titleHeight + lineHeight * 1.5;

      // fill player name
      ctx.fillText(players[i], gistPositionX, namePositionY);
      // fill player time
      ctx.fillText(Math.round(times[i]), gistPositionX, timePositionY);

      // check user and choose gist color
      if (players[i] === 'Вы') {
        changeColor(ctx, props.gist.selfColor);
      } else {
        // blue color with random opacity
        var blueColorStyle = 'rgba(0,0,255,' + Math.random() + ')';
        changeColor(ctx, blueColorStyle);
      }
      // draw gist
      ctx.fillRect(gistPositionX, gistPositionY, gistWidth, gistHeight);
      // drop color to default
      changeColor(ctx, props.textStyle.color);
    }
  };

  // render statistics
  window.renderStatistics = function (ctx, names, times) {
    renderCloud(ctx, statistics);
    renderTitle(ctx, statistics);
    renderGraph(ctx, statistics, names, times);
  };
})();
