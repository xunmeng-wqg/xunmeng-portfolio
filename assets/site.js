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


/* 洞洞板卡片：点一下浮到最前面（其他卡片拨开），再点一下打开 */
(function () {
  var cards = Array.prototype.slice.call(document.querySelectorAll(".obj.clickable"));
  if (!cards.length) return;
  var ROT = { "key-tag": "-2.5deg", "acrylic": ".6deg", "home-card": "2deg", "skill-tags": "-1.6deg", "mail-env": "-1.2deg", "exp-timeline": ".8deg",
    "s1": "-2deg", "s2": "1.5deg", "s3": "-1deg", "s4": "2deg", "s5": "-2deg", "n1": ".4deg", "n2": "-1.5deg", "n3": "1.5deg", "business-card": "1.5deg" };
  var PUSH = { "key-tag": [-38, -34, 1.15], "acrylic": [-46, -26, 1.08], "home-card": [40, -26, 1.15], "skill-tags": [-32, 36, 1.15], "mail-env": [38, 34, 1.15], "exp-timeline": [30, 42, 1.15],
    "s1": [-24, -16, 1.32], "s2": [20, -16, 1.32], "s3": [-10, 22, 1.32], "s4": [24, 20, 1.32], "s5": [-20, 24, 1.32], "n1": [0, -18, 1.26], "n2": [-14, -16, 1.22], "n3": [8, 8, 1.14], "business-card": [10, -12, 1.1] };
  function keyOf(o) { for (var k in PUSH) if (o.classList.contains(k)) return k; return null; }
  function setState(o, state) {
    var k = keyOf(o), p = PUSH[k], r = ROT[k];
    if (!p) return;
    o.style.animation = "none";
    o.style.transition = "transform .55s cubic-bezier(.22,1,.36,1),opacity .45s,filter .45s,box-shadow .45s";
    if (state === "front") {
      o.style.transform = "translate(0,-18px) scale(" + p[2] + ") rotate(0deg)";
      o.style.zIndex = "30"; o.style.opacity = "1"; o.style.filter = "none";
      o.style.boxShadow = "0 24px 46px rgba(56,34,14,.42)";
    } else if (state === "dim") {
      o.style.transform = "translate(" + p[0] + "px," + p[1] + "px) scale(0.84) rotate(" + r + ")";
      o.style.zIndex = "1"; o.style.opacity = "0.5"; o.style.filter = "blur(1.5px) saturate(0.8)";
      o.style.boxShadow = "";
    } else {
      o.style.transform = ""; o.style.zIndex = ""; o.style.opacity = ""; o.style.filter = ""; o.style.boxShadow = "";
    }
  }
  function resetAll() { cards.forEach(function (x) { x.classList.remove("front", "dim"); setState(x, "reset"); }); }
  cards.forEach(function (c) {
    c.addEventListener("click", function (e) {
      e.preventDefault();
      if (c.classList.contains("front")) {
        var href = c.dataset.href;
        if (href) { window.location.href = href; return; }
      }
      cards.forEach(function (x) { x.classList.remove("front", "dim"); x.classList.add("dim"); setState(x, "dim"); });
      c.classList.remove("dim"); c.classList.add("front"); setState(c, "front");
    });
  });
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".obj.clickable")) resetAll();
  });
})();
