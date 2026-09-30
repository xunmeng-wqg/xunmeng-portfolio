/* 公共动效：首页卡片入场弹跳 */
(function () {
  // 首页卡片：打开时向前弹一下再慢慢回位
  var objs = document.querySelectorAll(".obj");
  if (objs.length) {
    objs.forEach(function (o, i) {
      var cs = getComputedStyle(o);
      var r = cs.getPropertyValue("--r") || "0deg";
      o.animate([
        { transform: "translate(0,0) scale(1) rotate(" + r + ")" },
        { transform: "translate(0,-14px) scale(1.1) rotate(" + r + ")", offset: 0.35 },
        { transform: "translate(0,2px) scale(0.97) rotate(" + r + ")", offset: 0.7 },
        { transform: "translate(0,0) scale(1) rotate(" + r + ")" }
      ], { duration: 900, delay: 700 + i * 140, easing: "ease-out" });
    });
  }
})();
