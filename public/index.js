/* eslint-disable */
!(function (e) {
  var a,
    t,
    r,
    n,
    o,
    c,
    s,
    d = function () {},
    l = !0,
    h = !1;
  var g = {
    init: function (i) {
      (c = e("script[url*=lotteryMachine]").attr("url")),
        (s = c.replace(/lotteryMachine.*\.js.*$/, ""));
      var g = 0,
        u = function () {
          ++g < 10 || p();
        },
        p = function () {
          d();
        },
        m = new Image();
      (m.onload = u), (m.src = "./balls/img (1).png");
      var b = new Image();
      (b.onload = u), (b.src = "./balls/img (2).png");
      var y = new Image();
      (y.onload = u), (y.src = "./balls/img (3).png");
      var k = new Image();
      (k.onload = u), (k.src = "./balls/img (4).png");
      var v = new Image();
      (v.onload = u), (v.src = "./balls/img (5).png");
      var w = new Image();
      (w.onload = u), (w.src = "./balls/img (6).png");
      var x = new Image();
      (x.onload = u), (x.src = "./balls/img (7).png");
      var f = new Image();
      (f.onload = u), (f.src = "./balls/img (8).png");
      var I = new Image();
      (I.onload = u), (I.src = "./balls/img (9).png");
      var M = new Image();
      (M.onload = u), (M.src = "./balls/img (0).png");
      var P = new Image();
      function T(e, a, t, i, r, n) {
        return {
          number: e,
          x: a,
          lastX: a,
          y: t,
          lastY: t,
          dx: i,
          dy: r,
          r: n,
          normX: 0,
          normY: 0,
          picked: 0,
          drawn: !1,
          hit: !0,
        };
      }
      (P.onload = u),
        (P.src = s + "images/tube.png"),
        (n = i.callback),
        (a = i.containerRadius || 150),
        (t = i.waitInterval || 1e3),
        (o = i.playSound),
        e(this).append(
          '<canvas id="myCanvas" style="background-image:url(\'' +
            "./balls/ball.png'); background-position: center; background-size: cover;\"></canvas>"
        ),
        e(this).append("</br>"),
        e(this).append(
          '<canvas id="myCanvas2" style="background: #fff"></canvas>'
        );
      var A = !1,
        C = document.getElementById("myCanvas"),
        S = C.getContext("2d");
      (C.width = 2 * a),
        (C.height = 2 * a),
        (C.style["border-radius"] = a + "px");
      var j = document.getElementById("myCanvas2"),
        B = j.getContext("2d");
      (j.width = 3 * ((a / 5) * 2 + 10)),
        (j.height = (a / 5) * 2 + 5),
        (j.style["border-radius"] = (3 * ((a / 5) * 2 + 10)) / 20 + "px"),
        (j.style["padding"] = `${(3 * ((a / 5) * 2 + 10)) / 20 + "px"} ${
          (3 * ((a / 5) * 2 + 10)) / 20 + "px"
        }`);
      var O = -3.5;
      r = [
        T(0, C.width / 2, C.height - 30, O, 5, a / 5),
        T(1, C.width / 3, C.height - 50, O, 5, a / 5),
        T(2, C.width / 4, C.height - 60, O, 5, a / 5),
        T(3, C.width / 2, C.height / 5, O, 5, a / 5),
        T(4, C.width / 3, C.height - 55, O, 5, a / 5),
        T(5, C.width / 2, C.height - 47, O, 5, a / 5),
        T(6, C.width / 2, C.height / 10, O, 5, a / 5),
        T(7, C.width / 2, C.height - 40, O, 5, a / 5),
        T(8, C.width / 2, C.height - 45, O, 5, a / 5),
        T(9, C.width / 2, C.height - 35, O, 5, a / 5),
      ];
      var X = 0,
        Y = 180;
      function R(e, a, t, i, r) {
        var n = t * (Math.PI / 180),
          o = Math.cos(n),
          c = Math.sin(n),
          s = o * i + e,
          d = c * i + a,
          l = o * r + s,
          h = c * r + d;
        S.beginPath(),
          S.moveTo(s, d),
          S.lineTo(l, h),
          (S.lineWidth = 5),
          S.stroke(),
          S.closePath();
      }
      d = function () {
        (S.globalAlpha = 1),
          S.clearRect(0, 0, C.width, C.height),
          S.beginPath(),
          S.arc(C.width / 2, C.height / 2, 5, 0, 2 * Math.PI, !0),
          (S.lineWidth = 1),
          (S.strokeStyle = "#5e3434"),
          S.stroke(),
          S.closePath(),
          l || ((X += 5), (Y += 5)),
          R(C.width / 2, C.height / 2, X, 5, a),
          R(C.width / 2, C.height / 2, Y, 5, a);
        for (var e = 0; e < r.length; e++) {
          var i,
            n = r[e];
          switch (
            (h && (B.clearRect(0, 0, j.width, j.height), (h = !1)),
            S.beginPath(),
            S.arc(n.x, n.y, n.r, 0, 2 * Math.PI),
            S.closePath(),
            (S.fillStyle = "rgba(255, 255, 255, 1)"),
            S.fill(),
            (S.globalCompositeOperation = "source-atop"),
            n.number)
          ) {
            case 1:
              i = m;
              break;
            case 2:
              i = b;
              break;
            case 3:
              i = y;
              break;
            case 4:
              i = k;
              break;
            case 5:
              i = v;
              break;
            case 6:
              i = w;
              break;
            case 7:
              i = x;
              break;
            case 8:
              i = f;
              break;
            case 9:
              i = I;
              break;
            case 0:
              i = M;
              break;
            default:
              i = m;
          }
          var o = a / 20,
            c = n.x - n.r - o,
            s = n.y - n.r - o,
            g = 2 * n.r + 2 * o,
            u = 2 * n.r + 2 * o;
          if (
            (S.drawImage(i, c, s, g, u),
            (S.globalCompositeOperation = "source-over"),
            (S.font = "22px  'Montserrat', sans-serif"),
            (S.fontWeight = "900"),
            (S.textAlign = "center"),
            (S.textBaseline = "middle"),
            (S.fillStyle = "transparent"),
            S.fillText(n.number, n.x, n.y),
            !l)
          )
            if (n.picked) {
              (n.lastX = n.x), (n.lastY = n.y), (n.x += n.dx), (n.y += n.dy);
              var p = a,
                T = 2 * a - n.r;
              if (
                (n.x - p > -5 && n.x - p < 5 && (n.x = p),
                n.y - T > -5 && n.y - T < 5 && (n.y = T),
                n.x < p ? (n.dx = 5) : n.x > p ? (n.dx = -5) : (n.dx = 0),
                n.y < T ? (n.dy = 5) : n.y > T ? (n.dy = -5) : (n.dy = 0),
                n.x == p && n.y == T)
              ) {
                var O = n.number;
                A ||
                  ((A = !0),
                  setTimeout(function () {
                    var e,
                      t = 5 + r[O].r + (r[O].picked - 1) * (2 * r[O].r + 10),
                      i = j.height / 2;
                    switch (
                      (B.beginPath(),
                      B.arc(t, i, r[O].r, 0, 2 * Math.PI),
                      B.closePath(),
                      (B.fillStyle = "rgba(255, 255, 255, 1)"),
                      B.fill(),
                      (B.globalCompositeOperation = "source-atop"),
                      r[O].number)
                    ) {
                      case 1:
                        e = m;
                        break;
                      case 2:
                        e = b;
                        break;
                      case 3:
                        e = y;
                        break;
                      case 4:
                        e = k;
                        break;
                      case 5:
                        e = v;
                        break;
                      case 6:
                        e = w;
                        break;
                      case 7:
                        e = x;
                        break;
                      case 8:
                        e = f;
                        break;
                      case 9:
                        e = I;
                        break;
                      case 0:
                        e = M;
                        break;
                      default:
                        e = m;
                    }
                    var n = a / 20,
                      o = t - r[O].r - n,
                      c = i - r[O].r - n,
                      s = 2 * r[O].r + 2 * n,
                      d = 2 * r[O].r + 2 * n;
                    B.drawImage(e, o, c, s, d),
                      (B.globalCompositeOperation = "source-over"),
                      (B.font = "22px  'Montserrat', sans-serif"),
                      (B.fontWeight = "900"),
                      (B.textAlign = "center"),
                      (B.textBaseline = "middle"),
                      (B.fillStyle = "transparent"),
                      B.fillText(r[O].number, t, i),
                      (r[O].drawn = !0),
                      (r[O].picked = 0),
                      (r[O].x = C.width / 2),
                      (r[O].y = C.height - 47),
                      (r[O].dx = -3.5),
                      (r[O].dy = 5),
                      (A = !1);
                  }, t));
              }
            } else {
              (n.lastX = n.x), (n.lastY = n.y), (n.x += n.dx), (n.y += n.dy);
              var q = n.x - a,
                E = n.y - a,
                Q = Math.sqrt(q * q + E * E);
              if (Q >= a - n.r) {
                var W = q / Q,
                  z = E / Q,
                  F = -z,
                  $ = W,
                  D = -(W * n.dx + z * n.dy),
                  G = F * n.dx + $ * n.dy;
                (n.dx = D * W + G * F), (n.dy = D * z + G * $);
              }
            }
        }
        (S.globalAlpha = 0.5),
          S.drawImage(P, 115, 210, (a / 5) * 2 + 10, (a / 5) * 3),
          requestAnimationFrame(d);
      };
    },
    run: function (a) {
      for (i = 0; i < 9; i++) r[i].picked = 0;
      (h = !0), (l = !1), o && e("#backgroundAudio")[0].play();
      var c = a.toString().split("");
      setTimeout(function () {
        setTimeout(function () {
          r[c[0]].picked = 1;
        }, 3000),
          setTimeout(function () {
            r[c[1]].picked = 2;
          }, 7000),
          setTimeout(function () {
            (r[c[2]].picked = 3),
              setTimeout(function () {
                (l = !0),
                  o && e("#backgroundAudio")[0].pause(),
                  n.call(this, a);
              }, 2 * t);
          }, 11000);
      }, 0);
    },
  };
  e.fn.lotteryMachine = function (a) {
    return g[a]
      ? g[a].apply(this, Array.prototype.slice.call(arguments, 1))
      : "object" != typeof a && a
      ? void e.error("Method " + a + " does not exist on jQuery.lotteryMachine")
      : g.init.apply(this, arguments);
  };
})(jQuery);
/* eslint-disable */

window.startRadmonLuckyNumber = function start(winNumber) {
  setTimeout(() => {
    if (typeof $("#lotteryMachine")?.lotteryMachine === "function") {
      $("#lotteryMachine").lotteryMachine("run", winNumber);
    }
  }, 500);
};
