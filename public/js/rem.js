// !(function(e) {
//   function t(a) {
//     if (i[a]) return i[a].exports;
//     var n = (i[a] = {
//       exports: {},
//       id: a,
//       loaded: !1
//     });
//     return e[a].call(n.exports, n, n.exports, t), (n.loaded = !0), n.exports;
//   }
//   var i = {};
//   return (t.m = e), (t.c = i), (t.p = ""), t(0);
// })([
//   function(e, t) {
//     "use strict";
//     Object.defineProperty(t, "__esModule", {
//       value: !0
//     });
//     var i = window;
//     (t["default"] = i.flex = function(e, t) {
//       var a = e || 100,
//         n = t || 1,
//         r = i.document,
//         o = navigator.userAgent,
//         d = o.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i),
//         l = o.match(/U3\/((\d+|\.){5,})/i),
//         c = l && parseInt(l[1].split(".").join(""), 10) >= 80,
//         p = navigator.appVersion.match(/(iphone|ipad|ipod)/gi),
//         s = i.devicePixelRatio || 1;
//       p || (d && d[1] > 534) || c || (s = 1);
//       var u = 1 / s,
//         m = r.querySelector('meta[name="viewport"]');
//       m ||
//         ((m = r.createElement("meta")),
//         m.setAttribute("name", "viewport"),
//         r.head.appendChild(m)),
//         m.setAttribute(
//           "content",
//           "width=device-width,user-scalable=no,initial-scale=" +
//             u +
//             ",maximum-scale=" +
//             u +
//             ",minimum-scale=" +
//             u
//         ),
//         (r.documentElement.style.fontSize = (a / 2) * s * n + "px");
//     }),
//       (e.exports = t["default"]);
//   }
// ]);
// flex(100, 1);
// 基准大小
const baseSize = 32;
// 设置 rem 函数
function setRem() {
    // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
    const scale = document.documentElement.clientWidth / 750;
    // 设置页面根节点字体大小
    document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + "px";
}
// 初始化
setRem();
// 改变窗口大小时重新设置 rem
window.onresize = function() {
    setRem();
};
