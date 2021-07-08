"use strict";

// index.html
(function (win) {
  // * 默认缩放值
  var scale = {
    width: "1",
    height: "1"
  };
  // * 设计稿尺寸（px）
  var baseWidth = 1920;
  var baseHeight = 1080;

  var timer = null;

  // * 需保持的比例（默认1.77778）
  var baseProportion = parseFloat((baseWidth / baseHeight).toFixed(5));

  var dom = document.getElementById("app");

  var calcRate = function calcRate() {
    // 当前宽高比
    var currentRate = parseFloat((window.innerWidth / window.innerHeight).toFixed(5));
    if (currentRate > baseProportion) {
      // 表示更宽
      scale.width = (window.innerHeight * baseProportion / baseWidth).toFixed(5);
      scale.height = (window.innerHeight / baseHeight).toFixed(5);
      dom.style.transform = "scale(" + scale.width + ", " + scale.height + ") translate(-50%, -50%)";
    } else {
      // 表示更高
      scale.height = (window.innerWidth / baseProportion / baseHeight).toFixed(5);
      scale.width = (window.innerWidth / baseWidth).toFixed(5);
      dom.style.transform = "scale(" + scale.width + ", " + scale.height + ") translate(-50%, -50%)";
    }
  };

  var resize = function resize() {
    clearTimeout(timer);
    timer.value = setTimeout(function () {
      calcRate();
    }, 200);
  };

  // 改变窗口大小重新绘制
  var windowDraw = function windowDraw() {
    window.addEventListener("resize", resize);
  };

  windowDraw();
  calcRate();
})(window);