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


/* 季节主题切换 */
(function () {
  var SEASONS = [
    { id: "spring", label: "春 · SPRING", c: "#4a8f4e" },
    { id: "summer", label: "夏 · SUMMER", c: "#2f7fb5" },
    { id: "autumn", label: "秋 · AUTUMN", c: "#d9772f" },
    { id: "winter", label: "冬 · WINTER", c: "#5f8fc9" }
  ];
  function current() {
    return document.body.getAttribute("data-season") || "";
  }
  function apply(season) {
    if (season) document.body.setAttribute("data-season", season);
    else document.body.removeAttribute("data-season");
    try { localStorage.setItem("xunmeng-season", season); } catch (e) {}
    var on = season || "";
    var opts = document.querySelectorAll(".season-opt");
    for (var i = 0; i < opts.length; i++) {
      opts[i].classList.toggle("on", opts[i].getAttribute("data-season") === on);
    }
    var btn = document.querySelector(".season-btn");
    if (btn) {
      var s = null;
      for (var j = 0; j < SEASONS.length; j++) if (SEASONS[j].id === on) s = SEASONS[j];
      var label = btn.querySelector(".season-label");
      if (label) label.textContent = s ? s.label : "季节";
      var dot = btn.querySelector(".season-dot");
      if (dot) dot.style.background = s ? s.c : "#e8422f";
    }
  }
  function init() {
    if (document.querySelector(".season-btn")) return;
    var btn = document.createElement("button");
    btn.className = "season-btn";
    btn.type = "button";
    btn.setAttribute("aria-label", "切换季节主题");
    btn.innerHTML = '<span class="season-dot"></span><span class="season-label">季节</span>';
    var menu = document.createElement("div");
    menu.className = "season-menu";
    for (var i = 0; i < SEASONS.length; i++) {
      var o = document.createElement("button");
      o.type = "button";
      o.className = "season-opt";
      o.setAttribute("data-season", SEASONS[i].id);
      o.innerHTML = '<span class="sd" style="background:' + SEASONS[i].c + '"></span>' + SEASONS[i].label;
      o.addEventListener("click", function () {
        apply(this.getAttribute("data-season"));
        menu.classList.remove("open");
      });
      menu.appendChild(o);
    }
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      menu.classList.toggle("open");
    });
    document.addEventListener("click", function (e) {
      if (!menu.contains(e.target) && e.target !== btn && !btn.contains(e.target)) menu.classList.remove("open");
    });
    document.body.appendChild(btn);
    document.body.appendChild(menu);
    var saved = "";
    try { saved = localStorage.getItem("xunmeng-season") || ""; } catch (e) {}
    apply(saved);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
