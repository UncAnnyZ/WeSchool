! function (e, t) {
  if ("object" == typeof exports && "object" == typeof module) module.exports = t();
  else if ("function" == typeof define && define.amd) define([], t);
  else {
    var o = t();
    for (var n in o)("object" == typeof exports ? exports : e)[n] = o[n]
  }
}(window, (function () {
  return function (e) {
    var t = {};

    function o(n) {
      if (t[n]) return t[n].exports;
      var i = t[n] = {
        i: n,
        l: !1,
        exports: {}
      };
      return e[n].call(i.exports, i, i.exports, o), i.l = !0, i.exports
    }
    return o.m = e, o.c = t, o.d = function (e, t, n) {
      o.o(e, t) || Object.defineProperty(e, t, {
        enumerable: !0,
        get: n
      })
    }, o.r = function (e) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(e, "__esModule", {
        value: !0
      })
    }, o.t = function (e, t) {
      if (1 & t && (e = o(e)), 8 & t) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var n = Object.create(null);
      if (o.r(n), Object.defineProperty(n, "default", {
          enumerable: !0,
          value: e
        }), 2 & t && "string" != typeof e)
        for (var i in e) o.d(n, i, function (t) {
          return e[t]
        }.bind(null, i));
      return n
    }, o.n = function (e) {
      var t = e && e.__esModule ? function () {
        return e.default
      } : function () {
        return e
      };
      return o.d(t, "a", t), t
    }, o.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t)
    }, o.p = "", o(o.s = 0)
  }([function (e, t, o) {
    "use strict";

    function n(e, t) {
      for (var o = 0; o < t.length; o++) {
        var n = t[o];
        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
      }
    }
    o.r(t);
    var i = function () {
      function e(t, o) {
        var n = t.miniprogram,
          i = t.connectSocketParams,
          r = t.pingTimeout,
          s = void 0 === r ? 15e3 : r,
          c = t.pongTimeout,
          a = void 0 === c ? 1e4 : c,
          u = t.reconnectTimeout,
          p = void 0 === u ? 2e3 : u,
          f = t.pingMsg,
          m = void 0 === f ? "heartbeat" : f,
          h = t.repeatLimit,
          l = void 0 === h ? null : h,
          k = o.resolve,
          g = o.reject;
        if (function (e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
          }(this, e), !n) {
          var d = Error("请传入小程序全局实例：Taro:Taro,支付宝:my,百度:swan，微信:wx等");
          throw g(d), d
        }
        if (!i || !i.url) {
          var v = Error("小程序connectSocket参数不全");
          throw g(v), v
        }
        this.opts = {
          connectSocketParams: i,
          miniprogram: n,
          pingTimeout: s,
          pongTimeout: a,
          reconnectTimeout: p,
          pingMsg: m,
          repeatLimit: l
        }, this.socketTask = null, this.repeat = 0, this.onClose = function () {}, this.onError = function () {}, this.onOpen = function () {}, this.onMessage = function () {}, this.onReconnect = function () {}, this.createWebSocket(k)
      }
      var t, o, i;
      return t = e, (o = [{
        key: "createWebSocket",
        value: function (e) {
          var t = this;
          this.opts.miniprogram.offSocketClose ? (this.opts.miniprogram.offSocketClose(), this.opts.miniprogram.offSocketMessage(), this.opts.miniprogram.offSocketOpen(), this.opts.miniprogram.offSocketError(), this.socketTask = {
            onClose: this.opts.miniprogram.onSocketClose,
            onMessage: this.opts.miniprogram.onSocketMessage,
            onOpen: this.opts.miniprogram.onSocketOpen,
            onError: this.opts.miniprogram.onSocketError,
            send: this.opts.miniprogram.sendSocketMessage,
            close: this.opts.miniprogram.closeSocket
          }, this.opts.miniprogram.connectSocket(this.opts.miniprogram.connectSocket(Object.assign({
            complete: function () {}
          }, this.opts.connectSocketParams))), this.registerHeartBeatEvent(), e && e(this)) : new Promise((function (e) {
            e(t.opts.miniprogram.connectSocket(Object.assign({
              complete: function () {}
            }, t.opts.connectSocketParams)))
          })).then((function (o) {
            t.socketTask = o, t.registerHeartBeatEvent(), e && e(t)
          }))
        }
      }, {
        key: "registerHeartBeatEvent",
        value: function () {
          var e = this;
          this.socketTask.onClose((function () {
            e.onClose(), e.reconnect()
          })), this.socketTask.onError((function () {
            e.onError(), e.reconnect()
          })), this.socketTask.onOpen((function () {
            e.repeat = 0, e.onOpen(), e.heartCheck()
          })), this.socketTask.onMessage((function (t) {
            e.onMessage(t), e.heartCheck()
          }))
        }
      }, {
        key: "reconnect",
        value: function () {
          var e = this;
          this.opts.repeatLimit > 0 && this.opts.repeatLimit <= this.repeat || this.lockReconnect || this.forbidReconnect || (this.lockReconnect = !0, this.repeat++, this.onReconnect(), setTimeout((function () {
            e.createWebSocket(), e.lockReconnect = !1
          }), this.opts.reconnectTimeout))
        }
      }, {
        key: "send",
        value: function (e) {
          this.socketTask.send(e)
        }
      }, {
        key: "heartCheck",
        value: function () {
          this.heartReset(), this.heartStart()
        }
      }, {
        key: "heartStart",
        value: function () {
          var e = this;
          this.forbidReconnect || (this.pingTimeoutId = setTimeout((function () {
            e.send({
              data: e.opts.pingMsg
            }), e.pongTimeoutId = setTimeout((function () {
              e.socketTask.close()
            }), e.opts.pongTimeout)
          }), this.opts.pingTimeout))
        }
      }, {
        key: "heartReset",
        value: function () {
          clearTimeout(this.pingTimeoutId), clearTimeout(this.pongTimeoutId)
        }
      }, {
        key: "close",
        value: function (e) {
          this.forbidReconnect = !0, this.heartReset(), this.socketTask.close(e)
        }
      }]) && n(t.prototype, o), i && n(t, i), e
    }();
    t.default = function (e) {
      return new Promise((function (t, o) {
        new i(e, {
          resolve: t,
          reject: o
        })
      }))
    }
  }])
}));