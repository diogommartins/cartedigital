var FORMALIZE = function(e, t, n, r) {
    function i(e) {
        var t = n.createElement("b");
        return t.innerHTML = "<!--[if IE " + e + "]><br><![endif]-->", !!t.getElementsByTagName("br").length
    }
    var s = "placeholder"in n.createElement("input"), o = "autofocus"in n.createElement("input"), u = i(6), a = i(7);
    return {
        go: function() {
            var e, t = this.init;
            for (e in t)
                t.hasOwnProperty(e) && t[e]()
        },
        init: {
            disable_link_button: function() {
                e(n.documentElement).on("click", "a.button_disabled", function() {
                    return !1
                })
            },
            full_input_size: function() {
                if (!a ||!e("textarea, input.input_full").length)
                    return;
                e("textarea, input.input_full").wrap('<span class="input_full_wrap"></span>')
            },
            ie6_skin_inputs: function() {
                if (!u ||!e("input, select, textarea").length)
                    return;
                var t = /button|submit|reset/, n = /date|datetime|datetime-local|email|month|number|password|range|search|tel|text|time|url|week/;
                e("input").each(function() {
                    var r = e(this);
                    this.getAttribute("type").match(t) ? (r.addClass("ie6_button"), this.disabled && r.addClass("ie6_button_disabled")) : this.getAttribute("type").match(n) && (r.addClass("ie6_input"), this.disabled && r.addClass("ie6_input_disabled"))
                }), e("textarea, select").each(function() {
                    this.disabled && e(this).addClass("ie6_input_disabled")
                })
            },
            autofocus: function() {
                if (o ||!e(":input[autofocus]").length)
                    return;
                var t = e("[autofocus]")[0];
                t.disabled || t.focus()
            },
            placeholder: function() {
                if (s ||!e(":input[placeholder]").length)
                    return;
                FORMALIZE.misc.add_placeholder(), e(":input[placeholder]").each(function() {
                    if (this.type === "password")
                        return;
                    var t = e(this), n = t.attr("placeholder");
                    t.focus(function() {
                        t.val() === n && t.val("").removeClass("placeholder_text")
                    }).blur(function() {
                        FORMALIZE.misc.add_placeholder()
                    }), t.closest("form").submit(function() {
                        t.val() === n && t.val("").removeClass("placeholder_text")
                    }).on("reset", function() {
                        setTimeout(FORMALIZE.misc.add_placeholder, 50)
                    })
                })
            }
        },
        misc: {
            add_placeholder: function() {
                if (s ||!e(":input[placeholder]").length)
                    return;
                e(":input[placeholder]").each(function() {
                    if (this.type === "password")
                        return;
                    var t = e(this), n = t.attr("placeholder");
                    (!t.val() || t.val() === n) && t.val(n).addClass("placeholder_text")
                })
            }
        }
    }
}(jQuery, this, this.document);
jQuery(document).ready(function() {
    FORMALIZE.go()
});
(function(e, t) {
    "use strict";
    var n = function() {
        var n = {
            bcClass: "sf-breadcrumb",
            menuClass: "sf-js-enabled",
            anchorClass: "sf-with-ul",
            menuArrowClass: "sf-arrows"
        }, r = function() {
            var n = /iPhone|iPad|iPod/i.test(navigator.userAgent);
            return n && e(t).load(function() {
                e("body").children().on("click", e.noop)
            }), n
        }(), i = function() {
            var e = document.documentElement.style;
            return "behavior"in e && "fill"in e && /iemobile/i.test(navigator.userAgent)
        }(), o = function() {
            return !!t.PointerEvent
        }(), u = function(e, t) {
            var r = n.menuClass;
            t.cssArrows && (r += " " + n.menuArrowClass), e.toggleClass(r)
        }, a = function(t, r) {
            return t.find("li." + r.pathClass).slice(0, r.pathLevels).addClass(r.hoverClass + " " + n.bcClass).filter(function() {
                return e(this).children(r.popUpSelector).hide().show().length
            }).removeClass(r.pathClass)
        }, f = function(e) {
            e.children("a").toggleClass(n.anchorClass)
        }, l = function(e) {
            var t = e.css("ms-touch-action"), n = e.css("touch-action");
            n = n || t, n = "pan-y" === n ? "auto" : "pan-y", e.css({
                "ms-touch-action": n,
                "touch-action": n
            })
        }, c = function(t, n) {
            var s = "li:has(" + n.popUpSelector + ")";
            e.fn.hoverIntent&&!n.disableHI ? t.hoverIntent(p, d, s) : t.on("mouseenter.superfish", s, p).on("mouseleave.superfish", s, d);
            var u = "MSPointerDown.superfish";
            o && (u = "pointerdown.superfish"), r || (u += " touchend.superfish"), i && (u += " mousedown.superfish"), t.on("focusin.superfish", "li", p).on("focusout.superfish", "li", d).on(u, "a", n, h)
        }, h = function(t) {
            var n = e(this), r = n.siblings(t.data.popUpSelector);
            r.length > 0 && r.is(":hidden") && (n.one("click.superfish", !1), "MSPointerDown" === t.type || "pointerdown" === t.type ? n.trigger("focus") : e.proxy(p, n.parent("li"))())
        }, p = function() {
            var t = e(this), n = g(t);
            clearTimeout(n.sfTimer), t.siblings().superfish("hide").end().superfish("show")
        }, d = function() {
            var t = e(this), n = g(t);
            r ? e.proxy(v, t, n)() : (clearTimeout(n.sfTimer), n.sfTimer = setTimeout(e.proxy(v, t, n), n.delay))
        }, v = function(t) {
            t.retainPath = e.inArray(this[0], t.$path)>-1, this.superfish("hide"), this.parents("." + t.hoverClass).length || (t.onIdle.call(m(this)), t.$path.length && e.proxy(p, t.$path)())
        }, m = function(e) {
            return e.closest("." + n.menuClass)
        }, g = function(e) {
            return m(e).data("sf-options")
        };
        return {
            hide: function(t) {
                if (this.length) {
                    var n = this, r = g(n);
                    if (!r)
                        return this;
                    var i = r.retainPath===!0 ? r.$path: "", s = n.find("li." + r.hoverClass).add(this).not(i).removeClass(r.hoverClass).children(r.popUpSelector), o = r.speedOut;
                    t && (s.show(), o = 0), r.retainPath=!1, r.onBeforeHide.call(s), s.stop(!0, !0).animate(r.animationOut, o, function() {
                        var t = e(this);
                        r.onHide.call(t)
                    })
                }
                return this
            },
            show: function() {
                var e = g(this);
                if (!e)
                    return this;
                var t = this.addClass(e.hoverClass), n = t.children(e.popUpSelector);
                return e.onBeforeShow.call(n), n.stop(!0, !0).animate(e.animation, e.speed, function() {
                    e.onShow.call(n)
                }), this
            },
            destroy: function() {
                return this.each(function() {
                    var t, r = e(this), i = r.data("sf-options");
                    return i ? (t = r.find(i.popUpSelector).parent("li"), clearTimeout(i.sfTimer), u(r, i), f(t), l(r), r.off(".superfish").off(".hoverIntent"), t.children(i.popUpSelector).attr("style", function(e, t) {
                        return t.replace(/display[^;]+;?/g, "")
                    }), i.$path.removeClass(i.hoverClass + " " + n.bcClass).addClass(i.pathClass), r.find("." + i.hoverClass).removeClass(i.hoverClass), i.onDestroy.call(r), r.removeData("sf-options"), void 0) : !1
                })
            },
            init: function(t) {
                return this.each(function() {
                    var r = e(this);
                    if (r.data("sf-options"))
                        return !1;
                    var i = e.extend({}, e.fn.superfish.defaults, t), o = r.find(i.popUpSelector).parent("li");
                    i.$path = a(r, i), r.data("sf-options", i), u(r, i), f(o), l(r), c(r, i), o.not("." + n.bcClass).superfish("hide", !0), i.onInit.call(this)
                })
            }
        }
    }();
    e.fn.superfish = function(t) {
        return n[t] ? n[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? e.error("Method " + t + " does not exist on jQuery.fn.superfish") : n.init.apply(this, arguments)
    }, e.fn.superfish.defaults = {
        popUpSelector: "ul,.sf-mega",
        hoverClass: "sfHover",
        pathClass: "overrideThisToUse",
        pathLevels: 1,
        delay: 800,
        animation: {
            opacity: "show"
        },
        animationOut: {
            opacity: "hide"
        },
        speed: "normal",
        speedOut: "fast",
        cssArrows: !0,
        disableHI: !1,
        onInit: e.noop,
        onBeforeShow: e.noop,
        onShow: e.noop,
        onBeforeHide: e.noop,
        onHide: e.noop,
        onIdle: e.noop,
        onDestroy: e.noop
    }
})(jQuery, window);
(function() {
    var e, t, n, r, i, s = function(e, t) {
        return function() {
            return e.apply(t, arguments)
        }
    }, o = [].indexOf || function(e) {
            for (var t = 0, n = this.length; n > t; t++)
                if (t in this && this[t] === e)
                    return t;
            return - 1
        };
    t = function() {
        function e() {}
        return e.prototype.extend = function(e, t) {
            var n, r;
            for (n in t)
                r = t[n], null == e[n] && (e[n] = r);
            return e
        }, e.prototype.isMobile = function(e) {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(e)
        }, e.prototype.addEvent = function(e, t, n) {
            return null != e.addEventListener ? e.addEventListener(t, n, !1) : null != e.attachEvent ? e.attachEvent("on" + t, n) : e[t] = n
        }, e.prototype.removeEvent = function(e, t, n) {
            return null != e.removeEventListener ? e.removeEventListener(t, n, !1) : null != e.detachEvent ? e.detachEvent("on" + t, n) : delete e[t]
        }, e.prototype.innerHeight = function() {
            return "innerHeight"in window ? window.innerHeight : document.documentElement.clientHeight
        }, e
    }(), n = this.WeakMap || this.MozWeakMap || (n = function() {
            function e() {
                this.keys = [], this.values = []
            }
            return e.prototype.get = function(e) {
                var t, n, r, i, s;
                for (s = this.keys, t = r = 0, i = s.length; i > r; t=++r)
                    if (n = s[t], n === e)
                        return this.values[t]
            }, e.prototype.set = function(e, t) {
                var n, r, i, s, o;
                for (o = this.keys, n = i = 0, s = o.length; s > i; n=++i)
                    if (r = o[n], r === e)
                        return void (this.values[n] = t);
                return this.keys.push(e), this.values.push(t)
            }, e
        }()), e = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (e = function() {
            function e() {
                "undefined" != typeof console && null !== console && console.warn("MutationObserver is not supported by your browser."), "undefined" != typeof console && null !== console && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")
            }
            return e.notSupported=!0, e.prototype.observe = function() {}, e
        }()), r = this.getComputedStyle || function(e) {
            return this.getPropertyValue = function(t) {
                var n;
                return "float" === t && (t = "styleFloat"), i.test(t) && t.replace(i, function(e, t) {
                    return t.toUpperCase()
                }), (null != (n = e.currentStyle) ? n[t] : void 0) || null
            }, this
        }, i = /(\-([a-z]){1})/g, this.WOW = function() {
        function i(e) {
            null == e && (e = {}), this.scrollCallback = s(this.scrollCallback, this), this.scrollHandler = s(this.scrollHandler, this), this.start = s(this.start, this), this.scrolled=!0, this.config = this.util().extend(e, this.defaults), this.animationNameCache = new n
        }
        return i.prototype.defaults = {
            boxClass: "wow",
            animateClass: "animated",
            offset: 0,
            mobile: !0,
            live: !0
        }, i.prototype.init = function() {
            var e;
            return this.element = window.document.documentElement, "interactive" === (e = document.readyState) || "complete" === e ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start), this.finished = []
        }, i.prototype.start = function() {
            var t, n, r, i;
            if (this.stopped=!1, this.boxes = function() {
                    var e, n, r, i;
                    for (r = this.element.querySelectorAll("." + this.config.boxClass), i = [], e = 0, n = r.length; n > e; e++)
                        t = r[e], i.push(t);
                    return i
                }.call(this), this.all = function() {
                    var e, n, r, i;
                    for (r = this.boxes, i = [], e = 0, n = r.length; n > e; e++)
                        t = r[e], i.push(t);
                    return i
                }.call(this), this.boxes.length)
                if (this.disabled())
                    this.resetStyle();
                else
                    for (i = this.boxes, n = 0, r = i.length; r > n; n++)
                        t = i[n], this.applyStyle(t, !0);
            return this.disabled() || (this.util().addEvent(window, "scroll", this.scrollHandler), this.util().addEvent(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), this.config.live ? (new e(function(e) {
                return function(t) {
                    var n, r, i, s, o;
                    for (o = [], i = 0, s = t.length; s > i; i++)
                        r = t[i], o.push(function() {
                            var e, t, i, s;
                            for (i = r.addedNodes || [], s = [], e = 0, t = i.length; t > e; e++)
                                n = i[e], s.push(this.doSync(n));
                            return s
                        }.call(e));
                    return o
                }
            }(this))).observe(document.body, {
                childList: !0,
                subtree: !0
            }) : void 0
        }, i.prototype.stop = function() {
            return this.stopped=!0, this.util().removeEvent(window, "scroll", this.scrollHandler), this.util().removeEvent(window, "resize", this.scrollHandler), null != this.interval ? clearInterval(this.interval) : void 0
        }, i.prototype.sync = function() {
            return e.notSupported ? this.doSync(this.element) : void 0
        }, i.prototype.doSync = function(e) {
            var t, n, r, i, s;
            if (null == e && (e = this.element), 1 === e.nodeType) {
                for (e = e.parentNode || e, i = e.querySelectorAll("." + this.config.boxClass), s = [], n = 0, r = i.length; r > n; n++)
                    t = i[n], o.call(this.all, t) < 0 ? (this.boxes.push(t), this.all.push(t), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(t, !0), s.push(this.scrolled=!0)) : s.push(void 0);
                return s
            }
        }, i.prototype.show = function(e) {
            return this.applyStyle(e), e.className = "" + e.className + " " + this.config.animateClass
        }, i.prototype.applyStyle = function(e, t) {
            var n, r, i;
            return r = e.getAttribute("data-wow-duration"), n = e.getAttribute("data-wow-delay"), i = e.getAttribute("data-wow-iteration"), this.animate(function(s) {
                return function() {
                    return s.customStyle(e, t, r, n, i)
                }
            }(this))
        }, i.prototype.animate = function() {
            return "requestAnimationFrame"in window ? function(e) {
                return window.requestAnimationFrame(e)
            } : function(e) {
                return e()
            }
        }(), i.prototype.resetStyle = function() {
            var e, t, n, r, i;
            for (r = this.boxes, i = [], t = 0, n = r.length; n > t; t++)
                e = r[t], i.push(e.style.visibility = "visible");
            return i
        }, i.prototype.customStyle = function(e, t, n, r, i) {
            return t && this.cacheAnimationName(e), e.style.visibility = t ? "hidden" : "visible", n && this.vendorSet(e.style, {
                animationDuration: n
            }), r && this.vendorSet(e.style, {
                animationDelay: r
            }), i && this.vendorSet(e.style, {
                animationIterationCount: i
            }), this.vendorSet(e.style, {
                animationName: t ? "none": this.cachedAnimationName(e)
            }), e
        }, i.prototype.vendors = ["moz", "webkit"], i.prototype.vendorSet = function(e, t) {
            var n, r, i, s;
            s = [];
            for (n in t)
                r = t[n], e["" + n] = r, s.push(function() {
                    var t, s, o, u;
                    for (o = this.vendors, u = [], t = 0, s = o.length; s > t; t++)
                        i = o[t], u.push(e["" + i + n.charAt(0).toUpperCase() + n.substr(1)] = r);
                    return u
                }.call(this));
            return s
        }, i.prototype.vendorCSS = function(e, t) {
            var n, i, s, o, u, a;
            for (i = r(e), n = i.getPropertyCSSValue(t), a = this.vendors, o = 0, u = a.length; u > o; o++)
                s = a[o], n = n || i.getPropertyCSSValue("-" + s + "-" + t);
            return n
        }, i.prototype.animationName = function(e) {
            var t;
            try {
                t = this.vendorCSS(e, "animation-name").cssText
            } catch (n) {
                t = r(e).getPropertyValue("animation-name")
            }
            return "none" === t ? "" : t
        }, i.prototype.cacheAnimationName = function(e) {
            return this.animationNameCache.set(e, this.animationName(e))
        }, i.prototype.cachedAnimationName = function(e) {
            return this.animationNameCache.get(e)
        }, i.prototype.scrollHandler = function() {
            return this.scrolled=!0
        }, i.prototype.scrollCallback = function() {
            var e;
            return !this.scrolled || (this.scrolled=!1, this.boxes = function() {
                var t, n, r, i;
                for (r = this.boxes, i = [], t = 0, n = r.length; n > t; t++)
                    e = r[t], e && (this.isVisible(e) ? this.show(e) : i.push(e));
                return i
            }.call(this), this.boxes.length || this.config.live) ? void 0 : this.stop()
        }, i.prototype.offsetTop = function(e) {
            for (var t; void 0 === e.offsetTop;)
                e = e.parentNode;
            for (t = e.offsetTop; e = e.offsetParent;)
                t += e.offsetTop;
            return t
        }, i.prototype.isVisible = function(e) {
            var t, n, r, i, s;
            return n = e.getAttribute("data-wow-offset") || this.config.offset, s = window.pageYOffset, i = s + Math.min(this.element.clientHeight, this.util().innerHeight()) - n, r = this.offsetTop(e), t = r + e.clientHeight, i >= r && t >= s
        }, i.prototype.util = function() {
            return null != this._util ? this._util : this._util = new t
        }, i.prototype.disabled = function() {
            return !this.config.mobile && this.util().isMobile(navigator.userAgent)
        }, i
    }()
}).call(this);
(function() {
    function e() {}
    function t(e, t) {
        for (var n = e.length; n--;)
            if (e[n].listener === t)
                return n;
        return - 1
    }
    function n(e) {
        return function() {
            return this[e].apply(this, arguments)
        }
    }
    var r = e.prototype, i = this, s = i.EventEmitter;
    r.getListeners = function(e) {
        var t, n, r = this._getEvents();
        if ("object" == typeof e) {
            t = {};
            for (n in r)
                r.hasOwnProperty(n) && e.test(n) && (t[n] = r[n])
        } else
            t = r[e] || (r[e] = []);
        return t
    }, r.flattenListeners = function(e) {
        var t, n = [];
        for (t = 0; e.length > t; t += 1)
            n.push(e[t].listener);
        return n
    }, r.getListenersAsObject = function(e) {
        var t, n = this.getListeners(e);
        return n instanceof Array && (t = {}, t[e] = n), t || n
    }, r.addListener = function(e, n) {
        var r, i = this.getListenersAsObject(e), s = "object" == typeof n;
        for (r in i)
            i.hasOwnProperty(r)&&-1 === t(i[r], n) && i[r].push(s ? n : {
                listener: n,
                once: !1
            });
        return this
    }, r.on = n("addListener"), r.addOnceListener = function(e, t) {
        return this.addListener(e, {
            listener: t,
            once: !0
        })
    }, r.once = n("addOnceListener"), r.defineEvent = function(e) {
        return this.getListeners(e), this
    }, r.defineEvents = function(e) {
        for (var t = 0; e.length > t; t += 1)
            this.defineEvent(e[t]);
        return this
    }, r.removeListener = function(e, n) {
        var r, i, s = this.getListenersAsObject(e);
        for (i in s)
            s.hasOwnProperty(i) && (r = t(s[i], n), - 1 !== r && s[i].splice(r, 1));
        return this
    }, r.off = n("removeListener"), r.addListeners = function(e, t) {
        return this.manipulateListeners(!1, e, t)
    }, r.removeListeners = function(e, t) {
        return this.manipulateListeners(!0, e, t)
    }, r.manipulateListeners = function(e, t, n) {
        var r, i, s = e ? this.removeListener: this.addListener, o = e ? this.removeListeners: this.addListeners;
        if ("object" != typeof t || t instanceof RegExp)
            for (r = n.length; r--;)
                s.call(this, t, n[r]);
        else
            for (r in t)
                t.hasOwnProperty(r) && (i = t[r]) && ("function" == typeof i ? s.call(this, r, i) : o.call(this, r, i));
        return this
    }, r.removeEvent = function(e) {
        var t, n = typeof e, r = this._getEvents();
        if ("string" === n)
            delete r[e];
        else if ("object" === n)
            for (t in r)
                r.hasOwnProperty(t) && e.test(t) && delete r[t];
        else
            delete this._events;
        return this
    }, r.removeAllListeners = n("removeEvent"), r.emitEvent = function(e, t) {
        var n, r, i, s, o = this.getListenersAsObject(e);
        for (i in o)
            if (o.hasOwnProperty(i))
                for (r = o[i].length; r--;)
                    n = o[i][r], n.once===!0 && this.removeListener(e, n.listener), s = n.listener.apply(this, t || []), s === this._getOnceReturnValue() && this.removeListener(e, n.listener);
        return this
    }, r.trigger = n("emitEvent"), r.emit = function(e) {
        var t = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(e, t)
    }, r.setOnceReturnValue = function(e) {
        return this._onceReturnValue = e, this
    }, r._getOnceReturnValue = function() {
        return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
    }, r._getEvents = function() {
        return this._events || (this._events = {})
    }, e.noConflict = function() {
        return i.EventEmitter = s, e
    }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function() {
        return e
    }) : "object" == typeof module && module.exports ? module.exports = e : this.EventEmitter = e
}).call(this), function(e) {
    function t(t) {
        var n = e.event;
        return n.target = n.target || n.srcElement || t, n
    }
    var n = document.documentElement, r = function() {};
    n.addEventListener ? r = function(e, t, n) {
        e.addEventListener(t, n, !1)
    } : n.attachEvent && (r = function(e, n, r) {
        e[n + r] = r.handleEvent ? function() {
            var n = t(e);
            r.handleEvent.call(r, n)
        } : function() {
            var n = t(e);
            r.call(e, n)
        }, e.attachEvent("on" + n, e[n + r])
    });
    var i = function() {};
    n.removeEventListener ? i = function(e, t, n) {
        e.removeEventListener(t, n, !1)
    } : n.detachEvent && (i = function(e, t, n) {
        e.detachEvent("on" + t, e[t + n]);
        try {
            delete e[t + n]
        } catch (r) {
            e[t + n] = void 0
        }
    });
    var s = {
        bind: r,
        unbind: i
    };
    "function" == typeof define && define.amd ? define("eventie/eventie", s) : e.eventie = s
}(this), function(e, t) {
    "function" == typeof define && define.amd ? define(["eventEmitter/EventEmitter", "../../node_modules/eventie/eventie"], function(n, r) {
        return t(e, n, r)
    }) : "object" == typeof exports ? module.exports = t(e, require("wolfy87-eventemitter"), require("eventie")) : e.imagesLoaded = t(e, e.EventEmitter, e.eventie)
}(window, function(e, t, n) {
    function r(e, t) {
        for (var n in t)
            e[n] = t[n];
        return e
    }
    function i(e) {
        return "[object Array]" === h.call(e)
    }
    function s(e) {
        var t = [];
        if (i(e))
            t = e;
        else if ("number" == typeof e.length)
            for (var n = 0, r = e.length; r > n; n++)
                t.push(e[n]);
        else
            t.push(e);
        return t
    }
    function o(e, t, n) {
        if (!(this instanceof o))
            return new o(e, t);
        "string" == typeof e && (e = document.querySelectorAll(e)), this.elements = s(e), this.options = r({}, this.options), "function" == typeof t ? n = t : r(this.options, t), n && this.on("always", n), this.getImages(), f && (this.jqDeferred = new f.Deferred);
        var i = this;
        setTimeout(function() {
            i.check()
        })
    }
    function u(e) {
        this.img = e
    }
    function a(e) {
        this.src = e, p[e] = this
    }
    var f = e.jQuery, l = e.console, c = l !== void 0, h = Object.prototype.toString;
    o.prototype = new t, o.prototype.options = {}, o.prototype.getImages = function() {
        this.images = [];
        for (var e = 0, t = this.elements.length; t > e; e++) {
            var n = this.elements[e];
            "IMG" === n.nodeName && this.addImage(n);
            var r = n.nodeType;
            if (r && (1 === r || 9 === r || 11 === r))
                for (var i = n.querySelectorAll("img"), s = 0, o = i.length; o > s; s++) {
                    var u = i[s];
                    this.addImage(u)
                }
        }
    }, o.prototype.addImage = function(e) {
        var t = new u(e);
        this.images.push(t)
    }, o.prototype.check = function() {
        function e(e, i) {
            return t.options.debug && c && l.log("confirm", e, i), t.progress(e), n++, n === r && t.complete(), !0
        }
        var t = this, n = 0, r = this.images.length;
        if (this.hasAnyBroken=!1, !r)
            return this.complete(), void 0;
        for (var i = 0; r > i; i++) {
            var s = this.images[i];
            s.on("confirm", e), s.check()
        }
    }, o.prototype.progress = function(e) {
        this.hasAnyBroken = this.hasAnyBroken ||!e.isLoaded;
        var t = this;
        setTimeout(function() {
            t.emit("progress", t, e), t.jqDeferred && t.jqDeferred.notify && t.jqDeferred.notify(t, e)
        })
    }, o.prototype.complete = function() {
        var e = this.hasAnyBroken ? "fail": "done";
        this.isComplete=!0;
        var t = this;
        setTimeout(function() {
            if (t.emit(e, t), t.emit("always", t), t.jqDeferred) {
                var n = t.hasAnyBroken ? "reject": "resolve";
                t.jqDeferred[n](t)
            }
        })
    }, f && (f.fn.imagesLoaded = function(e, t) {
        var n = new o(this, e, t);
        return n.jqDeferred.promise(f(this))
    }), u.prototype = new t, u.prototype.check = function() {
        var e = p[this.img.src] || new a(this.img.src);
        if (e.isConfirmed)
            return this.confirm(e.isLoaded, "cached was confirmed"), void 0;
        if (this.img.complete && void 0 !== this.img.naturalWidth)
            return this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), void 0;
        var t = this;
        e.on("confirm", function(e, n) {
            return t.confirm(e.isLoaded, n), !0
        }), e.check()
    }, u.prototype.confirm = function(e, t) {
        this.isLoaded = e, this.emit("confirm", this, t)
    };
    var p = {};
    return a.prototype = new t, a.prototype.check = function() {
        if (!this.isChecked) {
            var e = new Image;
            n.bind(e, "load", this), n.bind(e, "error", this), e.src = this.src, this.isChecked=!0
        }
    }, a.prototype.handleEvent = function(e) {
        var t = "on" + e.type;
        this[t] && this[t](e)
    }, a.prototype.onload = function(e) {
        this.confirm(!0, "onload"), this.unbindProxyEvents(e)
    }, a.prototype.onerror = function(e) {
        this.confirm(!1, "onerror"), this.unbindProxyEvents(e)
    }, a.prototype.confirm = function(e, t) {
        this.isConfirmed=!0, this.isLoaded = e, this.emit("confirm", this, t)
    }, a.prototype.unbindProxyEvents = function(e) {
        n.unbind(e.target, "load", this), n.unbind(e.target, "error", this)
    }, o
});
(function(e, t, n) {
    function r(n, r, i) {
        var s = t.createElement(n);
        return r && (s.id = Z + r), i && (s.style.cssText = i), e(s)
    }
    function i() {
        return n.innerHeight ? n.innerHeight : e(n).height()
    }
    function s(t, n) {
        n !== Object(n) && (n = {}), this.cache = {}, this.el = t, this.value = function(t) {
            var r;
            return void 0 === this.cache[t] && (r = e(this.el).attr("data-cbox-" + t), void 0 !== r ? this.cache[t] = r : void 0 !== n[t] ? this.cache[t] = n[t] : void 0 !== G[t] && (this.cache[t] = G[t])), this.cache[t]
        }, this.get = function(t) {
            var n = this.value(t);
            return e.isFunction(n) ? n.call(this.el, this) : n
        }
    }
    function o(e) {
        var t = C.length, n = (z + e)%t;
        return 0 > n ? t + n : n
    }
    function u(e, t) {
        return Math.round((/%/.test(e) ? ("x" === t ? k.width() : i()) / 100 : 1) * parseInt(e, 10))
    }
    function a(e, t) {
        return e.get("photo") || e.get("photoRegex").test(t)
    }
    function f(e, t) {
        return e.get("retinaUrl") && n.devicePixelRatio > 1 ? t.replace(e.get("photoRegex"), e.get("retinaSuffix")) : t
    }
    function l(e) {
        "contains"in b[0]&&!b[0].contains(e.target) && e.target !== y[0] && (e.stopPropagation(), b.focus())
    }
    function c(e) {
        c.str !== e && (b.add(y).removeClass(c.str).addClass(e), c.str = e)
    }
    function h(t) {
        z = 0, t && t!==!1 && "nofollow" !== t ? (C = e("." + et).filter(function() {
            var n = e.data(this, Y), r = new s(this, n);
            return r.get("rel") === t
        }), z = C.index(F.el), - 1 === z && (C = C.add(F.el), z = C.length - 1)) : C = e(F.el)
    }
    function p(n) {
        e(t).trigger(n), ut.triggerHandler(n)
    }
    function d(n) {
        var i;
        if (!$) {
            if (i = e(n).data(Y), F = new s(n, i), h(F.get("rel")), !X) {
                X = V=!0, c(F.get("className")), b.css({
                    visibility: "hidden",
                    display: "block",
                    opacity: ""
                }), L = r(at, "LoadedContent", "width:0; height:0; overflow:hidden; visibility:hidden"), E.css({
                    width: "",
                    height: ""
                }).append(L), I = S.height() + N.height() + E.outerHeight(!0) - E.height(), q = x.width() + T.width() + E.outerWidth(!0) - E.width(), R = L.outerHeight(!0), U = L.outerWidth(!0);
                var o = u(F.get("initialWidth"), "x"), a = u(F.get("initialHeight"), "y"), f = F.get("maxWidth"), d = F.get("maxHeight");
                F.w = (f!==!1 ? Math.min(o, u(f, "x")) : o) - U - q, F.h = (d!==!1 ? Math.min(a, u(d, "y")) : a) - R - I, L.css({
                    width: "",
                    height: F.h
                }), K.position(), p(tt), F.get("onOpen"), j.add(M).hide(), b.focus(), F.get("trapFocus") && t.addEventListener && (t.addEventListener("focus", l, !0), ut.one(st, function() {
                    t.removeEventListener("focus", l, !0)
                })), F.get("returnFocus") && ut.one(st, function() {
                    e(F.el).focus()
                })
            }
            var v = parseFloat(F.get("opacity"));
            y.css({
                opacity: v === v ? v: "",
                cursor: F.get("overlayClose") ? "zoom-out": "",
                visibility: "visible"
            }).show(), F.get("closeButton") ? B.html(F.get("close")).appendTo(E) : B.appendTo("<div/>"), g()
        }
    }
    function v() {
        b || (Q=!1, k = e(n), b = r(at).attr({
            id: Y,
            "class": e.support.opacity===!1 ? Z + "IE": "",
            role: "dialog",
            tabindex: "-1"
        }).hide(), y = r(at, "Overlay").hide(), O = e([r(at, "LoadingOverlay")[0], r(at, "LoadingGraphic")[0]]), w = r(at, "Wrapper"), E = r(at, "Content").append(M = r(at, "Title"), _ = r(at, "Current"), H = e('<button type="button"/>').attr({
            id: Z + "Previous"
        }), P = e('<button type="button"/>').attr({
            id: Z + "Next"
        }), D = r("button", "Slideshow"), O), B = e('<button type="button"/>').attr({
            id: Z + "Close"
        }), w.append(r(at).append(r(at, "TopLeft"), S = r(at, "TopCenter"), r(at, "TopRight")), r(at, !1, "clear:left").append(x = r(at, "MiddleLeft"), E, T = r(at, "MiddleRight")), r(at, !1, "clear:left").append(r(at, "BottomLeft"), N = r(at, "BottomCenter"), r(at, "BottomRight"))).find("div div").css({
            "float": "left"
        }), A = r(at, !1, "position:absolute; width:9999px; visibility:hidden; display:none; max-width:none;"), j = P.add(H).add(_).add(D)), t.body&&!b.parent().length && e(t.body).append(y, b.append(w, A))
    }
    function m() {
        function n(e) {
            e.which > 1 || e.shiftKey || e.altKey || e.metaKey || e.ctrlKey || (e.preventDefault(), d(this))
        }
        return b ? (Q || (Q=!0, P.click(function() {
            K.next()
        }), H.click(function() {
            K.prev()
        }), B.click(function() {
            K.close()
        }), y.click(function() {
            F.get("overlayClose") && K.close()
        }), e(t).bind("keydown." + Z, function(e) {
            var t = e.keyCode;
            X && F.get("escKey") && 27 === t && (e.preventDefault(), K.close()), X && F.get("arrowKey") && C[1]&&!e.altKey && (37 === t ? (e.preventDefault(), H.click()) : 39 === t && (e.preventDefault(), P.click()))
        }), e.isFunction(e.fn.on) ? e(t).on("click." + Z, "." + et, n) : e("." + et).live("click." + Z, n)), !0) : !1
    }
    function g() {
        var t, i, s, o = K.prep, l=++ft;
        if (V=!0, W=!1, p(ot), p(nt), F.get("onLoad"), F.h = F.get("height") ? u(F.get("height"), "y") - R - I : F.get("innerHeight") && u(F.get("innerHeight"), "y"), F.w = F.get("width") ? u(F.get("width"), "x") - U - q : F.get("innerWidth") && u(F.get("innerWidth"), "x"), F.mw = F.w, F.mh = F.h, F.get("maxWidth") && (F.mw = u(F.get("maxWidth"), "x") - U - q, F.mw = F.w && F.w < F.mw ? F.w : F.mw), F.get("maxHeight") && (F.mh = u(F.get("maxHeight"), "y") - R - I, F.mh = F.h && F.h < F.mh ? F.h : F.mh), t = F.get("href"), J = setTimeout(function() {
                O.show()
            }, 100), F.get("inline")) {
            var c = e(t);
            s = e("<div>").hide().insertBefore(c), ut.one(ot, function() {
                s.replaceWith(c)
            }), o(c)
        } else
            F.get("iframe") ? o(" ") : F.get("html") ? o(F.get("html")) : a(F, t) ? (t = f(F, t), W = new Image, e(W).addClass(Z + "Photo").bind("error", function() {
                o(r(at, "Error").html(F.get("imgError")))
            }).one("load", function() {
                l === ft && setTimeout(function() {
                    var t;
                    e.each(["alt", "longdesc", "aria-describedby"], function(t, n) {
                        var r = e(F.el).attr(n) || e(F.el).attr("data-" + n);
                        r && W.setAttribute(n, r)
                    }), F.get("retinaImage") && n.devicePixelRatio > 1 && (W.height = W.height / n.devicePixelRatio, W.width = W.width / n.devicePixelRatio), F.get("scalePhotos") && (i = function() {
                        W.height -= W.height * t, W.width -= W.width * t
                    }, F.mw && W.width > F.mw && (t = (W.width - F.mw) / W.width, i()), F.mh && W.height > F.mh && (t = (W.height - F.mh) / W.height, i())), F.h && (W.style.marginTop = Math.max(F.mh - W.height, 0) / 2 + "px"), C[1] && (F.get("loop") || C[z + 1]) && (W.style.cursor = "pointer", W.onclick = function() {
                        K.next()
                    }), W.style.width = W.width + "px", W.style.height = W.height + "px", o(W)
                }, 1)
            }), W.src = t) : t && A.load(t, F.get("data"), function(t, n) {
                l === ft && o("error" === n ? r(at, "Error").html(F.get("xhrError")) : e(this).contents())
            })
    }
    var y, b, w, E, S, x, T, N, C, k, L, A, O, M, _, D, P, H, B, j, F, I, q, R, U, z, W, X, V, $, J, K, Q, G = {
        html: !1,
        photo: !1,
        iframe: !1,
        inline: !1,
        transition: "elastic",
        speed: 300,
        fadeOut: 300,
        width: !1,
        initialWidth: "600",
        innerWidth: !1,
        maxWidth: !1,
        height: !1,
        initialHeight: "450",
        innerHeight: !1,
        maxHeight: !1,
        scalePhotos: !0,
        scrolling: !0,
        opacity: .9,
        preloading: !0,
        className: !1,
        overlayClose: !0,
        escKey: !0,
        arrowKey: !0,
        top: !1,
        bottom: !1,
        left: !1,
        right: !1,
        fixed: !1,
        data: void 0,
        closeButton: !0,
        fastIframe: !0,
        open: !1,
        reposition: !0,
        loop: !0,
        slideshow: !1,
        slideshowAuto: !0,
        slideshowSpeed: 2500,
        slideshowStart: "start slideshow",
        slideshowStop: "stop slideshow",
        photoRegex: /\.(gif|png|jp(e|g|eg)|bmp|ico|webp|jxr|svg)((#|\?).*)?$/i,
        retinaImage: !1,
        retinaUrl: !1,
        retinaSuffix: "@2x.$1",
        current: "image {current} of {total}",
        previous: "previous",
        next: "next",
        close: "close",
        xhrError: "This content failed to load.",
        imgError: "This image failed to load.",
        returnFocus: !0,
        trapFocus: !0,
        onOpen: !1,
        onLoad: !1,
        onComplete: !1,
        onCleanup: !1,
        onClosed: !1,
        rel: function() {
            return this.rel
        }, href : function() {
            return e(this).attr("href")
        }, title: function() {
            return this.title
        }
    }, Y = "colorbox", Z = "cbox", et = Z + "Element", tt = Z + "_open", nt = Z + "_load", rt = Z + "_complete", it = Z + "_cleanup", st = Z + "_closed", ot = Z + "_purge", ut = e("<a/>"), at = "div", ft = 0, lt = {}, ct = function() {
        function e() {
            clearTimeout(o)
        }
        function t() {
            (F.get("loop") || C[z + 1]) && (e(), o = setTimeout(K.next, F.get("slideshowSpeed")))
        }
        function n() {
            D.html(F.get("slideshowStop")).unbind(a).one(a, r), ut.bind(rt, t).bind(nt, e), b.removeClass(u + "off").addClass(u + "on")
        }
        function r() {
            e(), ut.unbind(rt, t).unbind(nt, e), D.html(F.get("slideshowStart")).unbind(a).one(a, function() {
                K.next(), n()
            }), b.removeClass(u + "on").addClass(u + "off")
        }
        function i() {
            s=!1, D.hide(), e(), ut.unbind(rt, t).unbind(nt, e), b.removeClass(u + "off " + u + "on")
        }
        var s, o, u = Z + "Slideshow_", a = "click." + Z;
        return function() {
            s ? F.get("slideshow") || (ut.unbind(it, i), i()) : F.get("slideshow") && C[1] && (s=!0, ut.one(it, i), F.get("slideshowAuto") ? n() : r(), D.show())
        }
    }(); e[Y] || (e(v), K = e.fn[Y] = e[Y] = function(t, n) {
        var r, i = this;
        if (t = t || {}, e.isFunction(i))
            i = e("<a/>"), t.open=!0;
        else if (!i[0])
            return i;
        return i[0] ? (v(), m() && (n && (t.onComplete = n), i.each(function() {
            var n = e.data(this, Y) || {};
            e.data(this, Y, e.extend(n, t))
        }).addClass(et), r = new s(i[0], t), r.get("open") && d(i[0])), i) : i
    }, K.position = function(t, n) {
        function r() {
            S[0].style.width = N[0].style.width = E[0].style.width = parseInt(b[0].style.width, 10) - q + "px", E[0].style.height = x[0].style.height = T[0].style.height = parseInt(b[0].style.height, 10) - I + "px"
        }
        var s, o, a, f = 0, l = 0, c = b.offset();
        if (k.unbind("resize." + Z), b.css({
                top: - 9e4,
                left: - 9e4
            }), o = k.scrollTop(), a = k.scrollLeft(), F.get("fixed") ? (c.top -= o, c.left -= a, b.css({
                position: "fixed"
            })) : (f = o, l = a, b.css({
                position: "absolute"
            })), l += F.get("right")!==!1 ? Math.max(k.width() - F.w - U - q - u(F.get("right"), "x"), 0) : F.get("left")!==!1 ? u(F.get("left"), "x") : Math.round(Math.max(k.width() - F.w - U - q, 0) / 2), f += F.get("bottom")!==!1 ? Math.max(i() - F.h - R - I - u(F.get("bottom"), "y"), 0) : F.get("top")!==!1 ? u(F.get("top"), "y") : Math.round(Math.max(i() - F.h - R - I, 0) / 2), b.css({
                top: c.top,
                left: c.left,
                visibility: "visible"
            }), w[0].style.width = w[0].style.height = "9999px", s = {
                width: F.w + U + q,
                height: F.h + R + I,
                top: f,
                left: l
            }, t) {
            var h = 0;
            e.each(s, function(e) {
                return s[e] !== lt[e] ? (h = t, void 0) : void 0
            }), t = h
        }
        lt = s, t || b.css(s), b.dequeue().animate(s, {
            duration: t || 0,
            complete: function() {
                r(), V=!1, w[0].style.width = F.w + U + q + "px", w[0].style.height = F.h + R + I + "px", F.get("reposition") && setTimeout(function() {
                    k.bind("resize." + Z, K.position)
                }, 1), e.isFunction(n) && n()
            },
            step: r
        })
    }, K.resize = function(e) {
        var t;
        X && (e = e || {}, e.width && (F.w = u(e.width, "x") - U - q), e.innerWidth && (F.w = u(e.innerWidth, "x")), L.css({
            width: F.w
        }), e.height && (F.h = u(e.height, "y") - R - I), e.innerHeight && (F.h = u(e.innerHeight, "y")), e.innerHeight || e.height || (t = L.scrollTop(), L.css({
            height: "auto"
        }), F.h = L.height()), L.css({
            height: F.h
        }), t && L.scrollTop(t), K.position("none" === F.get("transition") ? 0 : F.get("speed")))
    }, K.prep = function(n) {
        function i() {
            return F.w = F.w || L.width(), F.w = F.mw && F.mw < F.w ? F.mw : F.w, F.w
        }
        function u() {
            return F.h = F.h || L.height(), F.h = F.mh && F.mh < F.h ? F.mh : F.h, F.h
        }
        if (X) {
            var l, h = "none" === F.get("transition") ? 0: F.get("speed");
            L.remove(), L = r(at, "LoadedContent").append(n), L.hide().appendTo(A.show()).css({
                width: i(),
                overflow: F.get("scrolling") ? "auto": "hidden"
            }).css({
                height: u()
            }).prependTo(E), A.hide(), e(W).css({
                "float": "none"
            }), c(F.get("className")), l = function() {
                function n() {
                    e.support.opacity===!1 && b[0].style.removeAttribute("filter")
                }
                var r, i, u = C.length;
                X && (i = function() {
                    clearTimeout(J), O.hide(), p(rt), F.get("onComplete")
                }, M.html(F.get("title")).show(), L.show(), u > 1 ? ("string" == typeof F.get("current") && _.html(F.get("current").replace("{current}", z + 1).replace("{total}", u)).show(), P[F.get("loop") || u - 1 > z ? "show": "hide"]().html(F.get("next")), H[F.get("loop") || z ? "show": "hide"]().html(F.get("previous")), ct(), F.get("preloading") && e.each([o( - 1), o(1)], function() {
                    var n, r = C[this], i = new s(r, e.data(r, Y)), o = i.get("href");
                    o && a(i, o) && (o = f(i, o), n = t.createElement("img"), n.src = o)
                })) : j.hide(), F.get("iframe") ? (r = t.createElement("iframe"), "frameBorder"in r && (r.frameBorder = 0), "allowTransparency"in r && (r.allowTransparency = "true"), F.get("scrolling") || (r.scrolling = "no"), e(r).attr({
                    src: F.get("href"),
                    name: (new Date).getTime(),
                    "class": Z + "Iframe",
                    allowFullScreen: !0
                }).one("load", i).appendTo(L), ut.one(ot, function() {
                    r.src = "//about:blank"
                }), F.get("fastIframe") && e(r).trigger("load")) : i(), "fade" === F.get("transition") ? b.fadeTo(h, 1, n) : n())
            }, "fade" === F.get("transition") ? b.fadeTo(h, 0, function() {
                K.position(0, l)
            }) : K.position(h, l)
        }
    }, K.next = function() {
        !V && C[1] && (F.get("loop") || C[z + 1]) && (z = o(1), d(C[z]))
    }, K.prev = function() {
        !V && C[1] && (F.get("loop") || z) && (z = o( - 1), d(C[z]))
    }, K.close = function() {
        X&&!$ && ($=!0, X=!1, p(it), F.get("onCleanup"), k.unbind("." + Z), y.fadeTo(F.get("fadeOut") || 0, 0), b.stop().fadeTo(F.get("fadeOut") || 0, 0, function() {
            b.hide(), y.hide(), p(ot), L.remove(), setTimeout(function() {
                $=!1, p(st), F.get("onClosed")
            }, 1)
        }))
    }, K.remove = function() {
        b && (b.stop(), e[Y].close(), b.stop(!1, !0).remove(), y.remove(), $=!1, b = null, e("." + et).removeData(Y).removeClass(et), e(t).unbind("click." + Z).unbind("keydown." + Z))
    }, K.element = function() {
        return e(F.el)
    }, K.settings = G)
})(jQuery, document, window);
!function(e) {
    "use strict";
    function t(e) {
        return (e || "").toLowerCase()
    }
    var n = "2.1.6";
    e.fn.cycle = function(n) {
        var r;
        return 0 !== this.length || e.isReady ? this.each(function() {
            var r, i, s, o, u = e(this), f = e.fn.cycle.log;
            if (!u.data("cycle.opts")) {
                (u.data("cycle-log")===!1 || n && n.log===!1 || i && i.log===!1) && (f = e.noop), f("--c2 init--"), r = u.data();
                for (var l in r)
                    r.hasOwnProperty(l) && /^cycle[A-Z]+/.test(l) && (o = r[l], s = l.match(/^cycle(.*)/)[1].replace(/^[A-Z]/, t), f(s + ":", o, "(" + typeof o + ")"), r[s] = o);
                i = e.extend({}, e.fn.cycle.defaults, r, n || {}), i.timeoutId = 0, i.paused = i.paused ||!1, i.container = u, i._maxZ = i.maxZ, i.API = e.extend({
                    _container: u
                }, e.fn.cycle.API), i.API.log = f, i.API.trigger = function(e, t) {
                    return i.container.trigger(e, t), i.API
                }, u.data("cycle.opts", i), u.data("cycle.API", i.API), i.API.trigger("cycle-bootstrap", [i, i.API]), i.API.addInitialSlides(), i.API.preInitSlideshow(), i.slides.length && i.API.initSlideshow()
            }
        }) : (r = {
            s: this.selector,
            c: this.context
        }, e.fn.cycle.log("requeuing slideshow (dom not ready)"), e(function() {
            e(r.s, r.c).cycle(n)
        }), this)
    }, e.fn.cycle.API = {
        opts: function() {
            return this._container.data("cycle.opts")
        },
        addInitialSlides: function() {
            var t = this.opts(), n = t.slides;
            t.slideCount = 0, t.slides = e(), n = n.jquery ? n : t.container.find(n), t.random && n.sort(function() {
                return Math.random() - .5
            }), t.API.add(n)
        },
        preInitSlideshow: function() {
            var t = this.opts();
            t.API.trigger("cycle-pre-initialize", [t]);
            var n = e.fn.cycle.transitions[t.fx];
            n && e.isFunction(n.preInit) && n.preInit(t), t._preInitialized=!0
        },
        postInitSlideshow: function() {
            var t = this.opts();
            t.API.trigger("cycle-post-initialize", [t]);
            var n = e.fn.cycle.transitions[t.fx];
            n && e.isFunction(n.postInit) && n.postInit(t)
        },
        initSlideshow: function() {
            var t, n = this.opts(), r = n.container;
            n.API.calcFirstSlide(), "static" == n.container.css("position") && n.container.css("position", "relative"), e(n.slides[n.currSlide]).css({
                opacity: 1,
                display: "block",
                visibility: "visible"
            }), n.API.stackSlides(n.slides[n.currSlide], n.slides[n.nextSlide], !n.reverse), n.pauseOnHover && (n.pauseOnHover!==!0 && (r = e(n.pauseOnHover)), r.hover(function() {
                n.API.pause(!0)
            }, function() {
                n.API.resume(!0)
            })), n.timeout && (t = n.API.getSlideOpts(n.currSlide), n.API.queueTransition(t, t.timeout + n.delay)), n._initialized=!0, n.API.updateView(!0), n.API.trigger("cycle-initialized", [n]), n.API.postInitSlideshow()
        },
        pause: function(t) {
            var n = this.opts(), r = n.API.getSlideOpts(), i = n.hoverPaused || n.paused;
            t ? n.hoverPaused=!0 : n.paused=!0, i || (n.container.addClass("cycle-paused"), n.API.trigger("cycle-paused", [n]).log("cycle-paused"), r.timeout && (clearTimeout(n.timeoutId), n.timeoutId = 0, n._remainingTimeout -= e.now() - n._lastQueue, (n._remainingTimeout < 0 || isNaN(n._remainingTimeout)) && (n._remainingTimeout = void 0)))
        },
        resume: function(e) {
            var t = this.opts(), n=!t.hoverPaused&&!t.paused;
            e ? t.hoverPaused=!1 : t.paused=!1, n || (t.container.removeClass("cycle-paused"), 0 === t.slides.filter(":animated").length && t.API.queueTransition(t.API.getSlideOpts(), t._remainingTimeout), t.API.trigger("cycle-resumed", [t, t._remainingTimeout]).log("cycle-resumed"))
        },
        add: function(t, n) {
            var r, i = this.opts(), s = i.slideCount, o=!1;
            "string" == e.type(t) && (t = e.trim(t)), e(t).each(function() {
                var t, r = e(this);
                n ? i.container.prepend(r) : i.container.append(r), i.slideCount++, t = i.API.buildSlideOpts(r), i.slides = n ? e(r).add(i.slides) : i.slides.add(r), i.API.initSlide(t, r, --i._maxZ), r.data("cycle.opts", t), i.API.trigger("cycle-slide-added", [i, t, r])
            }), i.API.updateView(!0), o = i._preInitialized && 2 > s && i.slideCount >= 1, o && (i._initialized ? i.timeout && (r = i.slides.length, i.nextSlide = i.reverse ? r - 1 : 1, i.timeoutId || i.API.queueTransition(i)) : i.API.initSlideshow())
        },
        calcFirstSlide: function() {
            var e, t = this.opts();
            e = parseInt(t.startingSlide || 0, 10), (e >= t.slides.length || 0 > e) && (e = 0), t.currSlide = e, t.reverse ? (t.nextSlide = e - 1, t.nextSlide < 0 && (t.nextSlide = t.slides.length - 1)) : (t.nextSlide = e + 1, t.nextSlide == t.slides.length && (t.nextSlide = 0))
        },
        calcNextSlide: function() {
            var e, t = this.opts();
            t.reverse ? (e = t.nextSlide - 1 < 0, t.nextSlide = e ? t.slideCount - 1 : t.nextSlide - 1, t.currSlide = e ? 0 : t.nextSlide + 1) : (e = t.nextSlide + 1 == t.slides.length, t.nextSlide = e ? 0 : t.nextSlide + 1, t.currSlide = e ? t.slides.length - 1 : t.nextSlide - 1)
        },
        calcTx: function(t, n) {
            var r, i = t;
            return i._tempFx ? r = e.fn.cycle.transitions[i._tempFx] : n && i.manualFx && (r = e.fn.cycle.transitions[i.manualFx]), r || (r = e.fn.cycle.transitions[i.fx]), i._tempFx = null, this.opts()._tempFx = null, r || (r = e.fn.cycle.transitions.fade, i.API.log('Transition "' + i.fx + '" not found.  Using fade.')), r
        },
        prepareTx: function(e, t) {
            var n, r, i, s, o, u = this.opts();
            return u.slideCount < 2 ? void (u.timeoutId = 0) : (!e || u.busy&&!u.manualTrump || (u.API.stopTransition(), u.busy=!1, clearTimeout(u.timeoutId), u.timeoutId = 0), void (u.busy || (0 !== u.timeoutId || e) && (r = u.slides[u.currSlide], i = u.slides[u.nextSlide], s = u.API.getSlideOpts(u.nextSlide), o = u.API.calcTx(s, e), u._tx = o, e && void 0 !== s.manualSpeed && (s.speed = s.manualSpeed), u.nextSlide != u.currSlide && (e ||!u.paused&&!u.hoverPaused && u.timeout) ? (u.API.trigger("cycle-before", [s, r, i, t]), o.before && o.before(s, r, i, t), n = function() {
                u.busy=!1, u.container.data("cycle.opts") && (o.after && o.after(s, r, i, t), u.API.trigger("cycle-after", [s, r, i, t]), u.API.queueTransition(s), u.API.updateView(!0))
            }, u.busy=!0, o.transition ? o.transition(s, r, i, t, n) : u.API.doTransition(s, r, i, t, n), u.API.calcNextSlide(), u.API.updateView()) : u.API.queueTransition(s))))
        },
        doTransition: function(t, n, r, i, s) {
            var o = t, u = e(n), f = e(r), l = function() {
                f.animate(o.animIn || {
                        opacity: 1
                    }, o.speed, o.easeIn || o.easing, s)
            };
            f.css(o.cssBefore || {}), u.animate(o.animOut || {}, o.speed, o.easeOut || o.easing, function() {
                u.css(o.cssAfter || {}), o.sync || l()
            }), o.sync && l()
        },
        queueTransition: function(t, n) {
            var r = this.opts(), i = void 0 !== n ? n : t.timeout;
            return 0 === r.nextSlide && 0===--r.loop ? (r.API.log("terminating; loop=0"), r.timeout = 0, i ? setTimeout(function() {
                r.API.trigger("cycle-finished", [r])
            }, i) : r.API.trigger("cycle-finished", [r]), void (r.nextSlide = r.currSlide)) : void 0 !== r.continueAuto && (r.continueAuto===!1 || e.isFunction(r.continueAuto) && r.continueAuto()===!1) ? (r.API.log("terminating automatic transitions"), r.timeout = 0, void (r.timeoutId && clearTimeout(r.timeoutId))) : void (i && (r._lastQueue = e.now(), void 0 === n && (r._remainingTimeout = t.timeout), r.paused || r.hoverPaused || (r.timeoutId = setTimeout(function() {
                r.API.prepareTx(!1, !r.reverse)
            }, i))))
        },
        stopTransition: function() {
            var e = this.opts();
            e.slides.filter(":animated").length && (e.slides.stop(!1, !0), e.API.trigger("cycle-transition-stopped", [e])), e._tx && e._tx.stopTransition && e._tx.stopTransition(e)
        },
        advanceSlide: function(e) {
            var t = this.opts();
            return clearTimeout(t.timeoutId), t.timeoutId = 0, t.nextSlide = t.currSlide + e, t.nextSlide < 0 ? t.nextSlide = t.slides.length - 1 : t.nextSlide >= t.slides.length && (t.nextSlide = 0), t.API.prepareTx(!0, e >= 0), !1
        },
        buildSlideOpts: function(n) {
            var r, i, s = this.opts(), o = n.data() || {};
            for (var u in o)
                o.hasOwnProperty(u) && /^cycle[A-Z]+/.test(u) && (r = o[u], i = u.match(/^cycle(.*)/)[1].replace(/^[A-Z]/, t), s.API.log("[" + (s.slideCount - 1) + "]", i + ":", r, "(" + typeof r + ")"), o[i] = r);
            o = e.extend({}, e.fn.cycle.defaults, s, o), o.slideNum = s.slideCount;
            try {
                delete o.API, delete o.slideCount, delete o.currSlide, delete o.nextSlide, delete o.slides
            } catch (f) {}
            return o
        },
        getSlideOpts: function(t) {
            var n = this.opts();
            void 0 === t && (t = n.currSlide);
            var r = n.slides[t], i = e(r).data("cycle.opts");
            return e.extend({}, n, i)
        },
        initSlide: function(t, n, r) {
            var i = this.opts();
            n.css(t.slideCss || {}), r > 0 && n.css("zIndex", r), isNaN(t.speed) && (t.speed = e.fx.speeds[t.speed] || e.fx.speeds._default), t.sync || (t.speed = t.speed / 2), n.addClass(i.slideClass)
        },
        updateView: function(e, t) {
            var n = this.opts();
            if (n._initialized) {
                var r = n.API.getSlideOpts(), i = n.slides[n.currSlide];
                !e && t!==!0 && (n.API.trigger("cycle-update-view-before", [n, r, i]), n.updateView < 0) || (n.slideActiveClass && n.slides.removeClass(n.slideActiveClass).eq(n.currSlide).addClass(n.slideActiveClass), e && n.hideNonActive && n.slides.filter(":not(." + n.slideActiveClass + ")").css("visibility", "hidden"), 0 === n.updateView && setTimeout(function() {
                    n.API.trigger("cycle-update-view", [n, r, i, e])
                }, r.speed / (n.sync ? 2 : 1)), 0 !== n.updateView && n.API.trigger("cycle-update-view", [n, r, i, e]), e && n.API.trigger("cycle-update-view-after", [n, r, i]))
            }
        },
        getComponent: function(t) {
            var n = this.opts(), r = n[t];
            return "string" == typeof r ? /^\s*[\>|\+|~]/.test(r) ? n.container.find(r) : e(r) : r.jquery ? r : e(r)
        },
        stackSlides: function(t, n, r) {
            var i = this.opts();
            t || (t = i.slides[i.currSlide], n = i.slides[i.nextSlide], r=!i.reverse), e(t).css("zIndex", i.maxZ);
            var s, o = i.maxZ - 2, u = i.slideCount;
            if (r) {
                for (s = i.currSlide + 1; u > s; s++)
                    e(i.slides[s]).css("zIndex", o--);
                for (s = 0; s < i.currSlide; s++)
                    e(i.slides[s]).css("zIndex", o--)
            } else {
                for (s = i.currSlide - 1; s >= 0; s--)
                    e(i.slides[s]).css("zIndex", o--);
                for (s = u - 1; s > i.currSlide; s--)
                    e(i.slides[s]).css("zIndex", o--)
            }
            e(n).css("zIndex", i.maxZ - 1)
        },
        getSlideIndex: function(e) {
            return this.opts().slides.index(e)
        }
    }, e.fn.cycle.log = function() {
        window.console && console.log && console.log("[cycle2] " + Array.prototype.join.call(arguments, " "))
    }, e.fn.cycle.version = function() {
        return "Cycle2: " + n
    }, e.fn.cycle.transitions = {
        custom: {},
        none: {
            before: function(e, t, n, r) {
                e.API.stackSlides(n, t, r), e.cssBefore = {
                    opacity: 1,
                    visibility: "visible",
                    display: "block"
                }
            }
        },
        fade: {
            before: function(t, n, r, i) {
                var s = t.API.getSlideOpts(t.nextSlide).slideCss || {};
                t.API.stackSlides(n, r, i), t.cssBefore = e.extend(s, {
                    opacity: 0,
                    visibility: "visible",
                    display: "block"
                }), t.animIn = {
                    opacity: 1
                }, t.animOut = {
                    opacity: 0
                }
            }
        },
        fadeout: {
            before: function(t, n, r, i) {
                var s = t.API.getSlideOpts(t.nextSlide).slideCss || {};
                t.API.stackSlides(n, r, i), t.cssBefore = e.extend(s, {
                    opacity: 1,
                    visibility: "visible",
                    display: "block"
                }), t.animOut = {
                    opacity: 0
                }
            }
        },
        scrollHorz: {
            before: function(e, t, n, r) {
                e.API.stackSlides(t, n, r);
                var i = e.container.css("overflow", "hidden").width();
                e.cssBefore = {
                    left: r ? i: - i,
                    top: 0,
                    opacity: 1,
                    visibility: "visible",
                    display: "block"
                }, e.cssAfter = {
                    zIndex: e._maxZ - 2,
                    left: 0
                }, e.animIn = {
                    left: 0
                }, e.animOut = {
                    left: r?-i: i
                }
            }
        }
    }, e.fn.cycle.defaults = {
        allowWrap: !0,
        autoSelector: ".cycle-slideshow[data-cycle-auto-init!=false]",
        delay: 0,
        easing: null,
        fx: "fade",
        hideNonActive: !0,
        loop: 0,
        manualFx: void 0,
        manualSpeed: void 0,
        manualTrump: !0,
        maxZ: 100,
        pauseOnHover: !1,
        reverse: !1,
        slideActiveClass: "cycle-slide-active",
        slideClass: "cycle-slide",
        slideCss: {
            position: "absolute",
            top: 0,
            left: 0
        }, slides : "> img", speed : 500, startingSlide : 0, sync : !0, timeout : 4e3, updateView : 0
    }, e(document).ready(function() {
        e(e.fn.cycle.defaults.autoSelector).cycle()
    })
}(jQuery), function(e) {
    "use strict";
    function t(t, r) {
        var i, s, o, u = r.autoHeight;
        if ("container" == u)
            s = e(r.slides[r.currSlide]).outerHeight(), r.container.height(s);
        else if (r._autoHeightRatio)
            r.container.height(r.container.width() / r._autoHeightRatio);
        else if ("calc" === u || "number" == e.type(u) && u >= 0) {
            if (o = "calc" === u ? n(t, r) : u >= r.slides.length ? 0 : u, o == r._sentinelIndex)
                return;
            r._sentinelIndex = o, r._sentinel && r._sentinel.remove(), i = e(r.slides[o].cloneNode(!0)), i.removeAttr("id name rel").find("[id],[name],[rel]").removeAttr("id name rel"), i.css({
                position: "static",
                visibility: "hidden",
                display: "block"
            }).prependTo(r.container).addClass("cycle-sentinel cycle-slide").removeClass("cycle-slide-active"), i.find("*").css("visibility", "hidden"), r._sentinel = i
        }
    }
    function n(t, n) {
        var r = 0, i =- 1;
        return n.slides.each(function(t) {
            var n = e(this).height();
            n > i && (i = n, r = t)
        }), r
    }
    function r(t, n, r, i) {
        var s = e(i).outerHeight();
        n.container.animate({
            height: s
        }, n.autoHeightSpeed, n.autoHeightEasing)
    }
    function i(n, s) {
        s._autoHeightOnResize && (e(window).off("resize orientationchange", s._autoHeightOnResize), s._autoHeightOnResize = null), s.container.off("cycle-slide-added cycle-slide-removed", t), s.container.off("cycle-destroyed", i), s.container.off("cycle-before", r), s._sentinel && (s._sentinel.remove(), s._sentinel = null)
    }
    e.extend(e.fn.cycle.defaults, {
        autoHeight: 0,
        autoHeightSpeed: 250,
        autoHeightEasing: null
    }), e(document).on("cycle-initialized", function(n, s) {
        function o() {
            t(n, s)
        }
        var u, f = s.autoHeight, l = e.type(f), c = null;
        ("string" === l || "number" === l) && (s.container.on("cycle-slide-added cycle-slide-removed", t), s.container.on("cycle-destroyed", i), "container" == f ? s.container.on("cycle-before", r) : "string" === l && /\d+\:\d+/.test(f) && (u = f.match(/(\d+)\:(\d+)/), u = u[1] / u[2], s._autoHeightRatio = u), "number" !== l && (s._autoHeightOnResize = function() {
            clearTimeout(c), c = setTimeout(o, 50)
        }, e(window).on("resize orientationchange", s._autoHeightOnResize)), setTimeout(o, 30))
    })
}(jQuery), function(e) {
    "use strict";
    e.extend(e.fn.cycle.defaults, {
        caption: "> .cycle-caption",
        captionTemplate: "{{slideNum}} / {{slideCount}}",
        overlay: "> .cycle-overlay",
        overlayTemplate: "<div>{{title}}</div><div>{{desc}}</div>",
        captionModule: "caption"
    }), e(document).on("cycle-update-view", function(t, n, r, i) {
        if ("caption" === n.captionModule) {
            e.each(["caption", "overlay"], function() {
                var e = this, t = r[e + "Template"], s = n.API.getComponent(e);
                s.length && t ? (s.html(n.API.tmpl(t, r, n, i)), s.show()) : s.hide()
            })
        }
    }), e(document).on("cycle-destroyed", function(t, n) {
        var r;
        e.each(["caption", "overlay"], function() {
            var e = this, t = n[e + "Template"];
            n[e] && t && (r = n.API.getComponent("caption"), r.empty())
        })
    })
}(jQuery), function(e) {
    "use strict";
    var t = e.fn.cycle;
    e.fn.cycle = function(n) {
        var r, i, s, o = e.makeArray(arguments);
        return "number" == e.type(n) ? this.cycle("goto", n) : "string" == e.type(n) ? this.each(function() {
            var u;
            return r = n, s = e(this).data("cycle.opts"), void 0 === s ? void t.log('slideshow must be initialized before sending commands; "' + r + '" ignored') : (r = "goto" == r ? "jump" : r, i = s.API[r], e.isFunction(i) ? (u = e.makeArray(o), u.shift(), i.apply(s.API, u)) : void t.log("unknown command: ", r))
        }) : t.apply(this, arguments)
    }, e.extend(e.fn.cycle, t), e.extend(t.API, {
        next: function() {
            var e = this.opts();
            if (!e.busy || e.manualTrump) {
                var t = e.reverse?-1 : 1;
                e.allowWrap===!1 && e.currSlide + t >= e.slideCount || (e.API.advanceSlide(t), e.API.trigger("cycle-next", [e]).log("cycle-next"))
            }
        },
        prev: function() {
            var e = this.opts();
            if (!e.busy || e.manualTrump) {
                var t = e.reverse ? 1: - 1;
                e.allowWrap===!1 && e.currSlide + t < 0 || (e.API.advanceSlide(t), e.API.trigger("cycle-prev", [e]).log("cycle-prev"))
            }
        },
        destroy: function() {
            this.stop();
            var t = this.opts(), n = e.isFunction(e._data) ? e._data: e.noop;
            clearTimeout(t.timeoutId), t.timeoutId = 0, t.API.stop(), t.API.trigger("cycle-destroyed", [t]).log("cycle-destroyed"), t.container.removeData(), n(t.container[0], "parsedAttrs", !1), t.retainStylesOnDestroy || (t.container.removeAttr("style"), t.slides.removeAttr("style"), t.slides.removeClass(t.slideActiveClass)), t.slides.each(function() {
                var r = e(this);
                r.removeData(), r.removeClass(t.slideClass), n(this, "parsedAttrs", !1)
            })
        },
        jump: function(e, t) {
            var n, r = this.opts();
            if (!r.busy || r.manualTrump) {
                var i = parseInt(e, 10);
                if (isNaN(i) || 0 > i || i >= r.slides.length)
                    return void r.API.log("goto: invalid slide index: " + i);
                if (i == r.currSlide)
                    return void r.API.log("goto: skipping, already on slide", i);
                r.nextSlide = i, clearTimeout(r.timeoutId), r.timeoutId = 0, r.API.log("goto: ", i, " (zero-index)"), n = r.currSlide < r.nextSlide, r._tempFx = t, r.API.prepareTx(!0, n)
            }
        },
        stop: function() {
            var t = this.opts(), n = t.container;
            clearTimeout(t.timeoutId), t.timeoutId = 0, t.API.stopTransition(), t.pauseOnHover && (t.pauseOnHover!==!0 && (n = e(t.pauseOnHover)), n.off("mouseenter mouseleave")), t.API.trigger("cycle-stopped", [t]).log("cycle-stopped")
        },
        reinit: function() {
            var e = this.opts();
            e.API.destroy(), e.container.cycle()
        },
        remove: function(t) {
            for (var n, r, i = this.opts(), s = [], o = 1, u = 0; u < i.slides.length; u++)
                n = i.slides[u], u == t ? r = n : (s.push(n), e(n).data("cycle.opts").slideNum = o, o++);
            r && (i.slides = e(s), i.slideCount--, e(r).remove(), t == i.currSlide ? i.API.advanceSlide(1) : t < i.currSlide ? i.currSlide-- : i.currSlide++, i.API.trigger("cycle-slide-removed", [i, t, r]).log("cycle-slide-removed"), i.API.updateView())
        }
    }), e(document).on("click.cycle", "[data-cycle-cmd]", function(t) {
        t.preventDefault();
        var n = e(this), r = n.data("cycle-cmd"), i = n.data("cycle-context") || ".cycle-slideshow";
        e(i).cycle(r, n.data("cycle-arg"))
    })
}(jQuery), function(e) {
    "use strict";
    function t(t, n) {
        var r;
        return t._hashFence ? void (t._hashFence=!1) : (r = window.location.hash.substring(1), void t.slides.each(function(i) {
            if (e(this).data("cycle-hash") == r) {
                if (n===!0)
                    t.startingSlide = i;
                else {
                    var s = t.currSlide < i;
                    t.nextSlide = i, t.API.prepareTx(!0, s)
                }
                return !1
            }
        }))
    }
    e(document).on("cycle-pre-initialize", function(n, r) {
        t(r, !0), r._onHashChange = function() {
            t(r, !1)
        }, e(window).on("hashchange", r._onHashChange)
    }), e(document).on("cycle-update-view", function(e, t, n) {
        n.hash && "#" + n.hash != window.location.hash && (t._hashFence=!0, window.location.hash = n.hash)
    }), e(document).on("cycle-destroyed", function(t, n) {
        n._onHashChange && e(window).off("hashchange", n._onHashChange)
    })
}(jQuery), function(e) {
    "use strict";
    e.extend(e.fn.cycle.defaults, {
        loader: !1
    }), e(document).on("cycle-bootstrap", function(t, n) {
        function r(t, r) {
            function s(t) {
                var s;
                "wait" == n.loader ? (u.push(t), 0 === l && (u.sort(o), i.apply(n.API, [u, r]), n.container.removeClass("cycle-loading"))) : (s = e(n.slides[n.currSlide]), i.apply(n.API, [t, r]), s.show(), n.container.removeClass("cycle-loading"))
            }
            function o(e, t) {
                return e.data("index") - t.data("index")
            }
            var u = [];
            if ("string" == e.type(t))
                t = e.trim(t);
            else if ("array" === e.type(t))
                for (var f = 0; f < t.length; f++)
                    t[f] = e(t[f])[0];
            t = e(t);
            var l = t.length;
            l && (t.css("visibility", "hidden").appendTo("body").each(function(t) {
                function o() {
                    0===--f && (--l, s(p))
                }
                var f = 0, p = e(this), v = p.is("img") ? p: p.find("img");
                return p.data("index", t), v = v.filter(":not(.cycle-loader-ignore)").filter(':not([src=""])'), v.length ? (f = v.length, void v.each(function() {
                    this.complete ? o() : e(this).load(function() {
                        o()
                    }).on("error", function() {
                        0===--f && (n.API.log("slide skipped; img not loaded:", this.src), 0===--l && "wait" == n.loader && i.apply(n.API, [u, r]))
                    })
                })) : (--l, void u.push(p))
            }), l && n.container.addClass("cycle-loading"))
        }
        var i; n.loader && (i = n.API.add, n.API.add = r)
    })
}(jQuery), function(e) {
    "use strict";
    function t(t, n, r) {
        var i, s = t.API.getComponent("pager");
        s.each(function() {
            var s = e(this);
            if (n.pagerTemplate) {
                var o = t.API.tmpl(n.pagerTemplate, n, t, r[0]);
                i = e(o).appendTo(s)
            } else
                i = s.children().eq(t.slideCount - 1);
            i.on(t.pagerEvent, function(e) {
                t.pagerEventBubble || e.preventDefault(), t.API.page(s, e.currentTarget)
            })
        })
    }
    function n(e, t) {
        var n = this.opts();
        if (!n.busy || n.manualTrump) {
            var r = e.children().index(t), i = r, s = n.currSlide < i;
            n.currSlide != i && (n.nextSlide = i, n._tempFx = n.pagerFx, n.API.prepareTx(!0, s), n.API.trigger("cycle-pager-activated", [n, e, t]))
        }
    }
    e.extend(e.fn.cycle.defaults, {
        pager: "> .cycle-pager",
        pagerActiveClass: "cycle-pager-active",
        pagerEvent: "click.cycle",
        pagerEventBubble: void 0,
        pagerTemplate: "<span>&bull;</span>"
    }), e(document).on("cycle-bootstrap", function(e, n, r) {
        r.buildPagerLink = t
    }), e(document).on("cycle-slide-added", function(e, t, r, i) {
        t.pager && (t.API.buildPagerLink(t, r, i), t.API.page = n)
    }), e(document).on("cycle-slide-removed", function(t, n, r) {
        if (n.pager) {
            var i = n.API.getComponent("pager");
            i.each(function() {
                var t = e(this);
                e(t.children()[r]).remove()
            })
        }
    }), e(document).on("cycle-update-view", function(t, n) {
        var r;
        n.pager && (r = n.API.getComponent("pager"), r.each(function() {
            e(this).children().removeClass(n.pagerActiveClass).eq(n.currSlide).addClass(n.pagerActiveClass)
        }))
    }), e(document).on("cycle-destroyed", function(e, t) {
        var n = t.API.getComponent("pager");
        n && (n.children().off(t.pagerEvent), t.pagerTemplate && n.empty())
    })
}(jQuery), function(e) {
    "use strict";
    e.extend(e.fn.cycle.defaults, {
        next: "> .cycle-next",
        nextEvent: "click.cycle",
        disabledClass: "disabled",
        prev: "> .cycle-prev",
        prevEvent: "click.cycle",
        swipe: !1
    }), e(document).on("cycle-initialized", function(e, t) {
        if (t.API.getComponent("next").on(t.nextEvent, function(e) {
                e.preventDefault(), t.API.next()
            }), t.API.getComponent("prev").on(t.prevEvent, function(e) {
                e.preventDefault(), t.API.prev()
            }), t.swipe) {
            var n = t.swipeVert ? "swipeUp.cycle": "swipeLeft.cycle swipeleft.cycle", r = t.swipeVert ? "swipeDown.cycle": "swipeRight.cycle swiperight.cycle";
            t.container.on(n, function() {
                t._tempFx = t.swipeFx, t.API.next()
            }), t.container.on(r, function() {
                t._tempFx = t.swipeFx, t.API.prev()
            })
        }
    }), e(document).on("cycle-update-view", function(e, t) {
        if (!t.allowWrap) {
            var n = t.disabledClass, r = t.API.getComponent("next"), i = t.API.getComponent("prev"), s = t._prevBoundry || 0, o = void 0 !== t._nextBoundry ? t._nextBoundry : t.slideCount - 1;
            t.currSlide == o ? r.addClass(n).prop("disabled", !0) : r.removeClass(n).prop("disabled", !1), t.currSlide === s ? i.addClass(n).prop("disabled", !0) : i.removeClass(n).prop("disabled", !1)
        }
    }), e(document).on("cycle-destroyed", function(e, t) {
        t.API.getComponent("prev").off(t.nextEvent), t.API.getComponent("next").off(t.prevEvent), t.container.off("swipeleft.cycle swiperight.cycle swipeLeft.cycle swipeRight.cycle swipeUp.cycle swipeDown.cycle")
    })
}(jQuery), function(e) {
    "use strict";
    e.extend(e.fn.cycle.defaults, {
        progressive: !1
    }), e(document).on("cycle-pre-initialize", function(t, n) {
        if (n.progressive) {
            var r, i, s = n.API, o = s.next, u = s.prev, f = s.prepareTx, l = e.type(n.progressive);
            if ("array" == l)
                r = n.progressive;
            else if (e.isFunction(n.progressive))
                r = n.progressive(n);
            else if ("string" == l) {
                if (i = e(n.progressive), r = e.trim(i.html()), !r)
                    return;
                if (/^(\[)/.test(r))
                    try {
                        r = e.parseJSON(r)
                    } catch (c) {
                        return void s.log("error parsing progressive slides", c)
                    } else
                    r = r.split(new RegExp(i.data("cycle-split") || "\n")), r[r.length - 1] || r.pop()
            }
            f && (s.prepareTx = function(e, t) {
                var i, s;
                return e || 0 === r.length ? void f.apply(n.API, [e, t]) : void (t && n.currSlide == n.slideCount - 1 ? (s = r[0], r = r.slice(1), n.container.one("cycle-slide-added", function(e, t) {
                    setTimeout(function() {
                        t.API.advanceSlide(1)
                    }, 50)
                }), n.API.add(s)) : t || 0 !== n.currSlide ? f.apply(n.API, [e, t]) : (i = r.length - 1, s = r[i], r = r.slice(0, i), n.container.one("cycle-slide-added", function(e, t) {
                    setTimeout(function() {
                        t.currSlide = 1, t.API.advanceSlide( - 1)
                    }, 50)
                }), n.API.add(s, !0)))
            }), o && (s.next = function() {
                var e = this.opts();
                if (r.length && e.currSlide == e.slideCount - 1) {
                    var t = r[0];
                    r = r.slice(1), e.container.one("cycle-slide-added", function(e, t) {
                        o.apply(t.API), t.container.removeClass("cycle-loading")
                    }), e.container.addClass("cycle-loading"), e.API.add(t)
                } else
                    o.apply(e.API)
            }), u && (s.prev = function() {
                var e = this.opts();
                if (r.length && 0 === e.currSlide) {
                    var t = r.length - 1, n = r[t];
                    r = r.slice(0, t), e.container.one("cycle-slide-added", function(e, t) {
                        t.currSlide = 1, t.API.advanceSlide( - 1), t.container.removeClass("cycle-loading")
                    }), e.container.addClass("cycle-loading"), e.API.add(n, !0)
                } else
                    u.apply(e.API)
            })
        }
    })
}(jQuery), function(e) {
    "use strict";
    e.extend(e.fn.cycle.defaults, {
        tmplRegex: "{{((.)?.*?)}}"
    }), e.extend(e.fn.cycle.API, {
        tmpl: function(t, n) {
            var r = new RegExp(n.tmplRegex || e.fn.cycle.defaults.tmplRegex, "g"), i = e.makeArray(arguments);
            return i.shift(), t.replace(r, function(t, n) {
                var r, s, o, u, f = n.split(".");
                for (r = 0; r < i.length; r++)
                    if (o = i[r]) {
                        if (f.length > 1)
                            for (u = o, s = 0; s < f.length; s++)
                                o = u, u = u[f[s]] || n;
                        else
                            u = o[n];
                        if (e.isFunction(u))
                            return u.apply(o, i);
                        if (void 0 !== u && null !== u && u != n)
                            return u
                    }
                return n
            })
        }
    })
}(jQuery);
(function(e) {
    e.fn.hoverIntent = function(t, n, r) {
        var i = {
            interval: 100,
            sensitivity: 7,
            timeout: 0
        };
        if (typeof t === "object") {
            i = e.extend(i, t)
        } else if (e.isFunction(n)) {
            i = e.extend(i, {
                over: t,
                out: n,
                selector: r
            })
        } else {
            i = e.extend(i, {
                over: t,
                out: t,
                selector: n
            })
        }
        var s, o, u, a;
        var f = function(e) {
            s = e.pageX;
            o = e.pageY
        };
        var l = function(t, n) {
            n.hoverIntent_t = clearTimeout(n.hoverIntent_t);
            if (Math.abs(u - s) + Math.abs(a - o) < i.sensitivity) {
                e(n).off("mousemove.hoverIntent", f);
                n.hoverIntent_s = 1;
                return i.over.apply(n, [t])
            } else {
                u = s;
                a = o;
                n.hoverIntent_t = setTimeout(function() {
                    l(t, n)
                }, i.interval)
            }
        };
        var c = function(e, t) {
            t.hoverIntent_t = clearTimeout(t.hoverIntent_t);
            t.hoverIntent_s = 0;
            return i.out.apply(t, [e])
        };
        var h = function(t) {
            var n = jQuery.extend({}, t);
            var r = this;
            if (r.hoverIntent_t) {
                r.hoverIntent_t = clearTimeout(r.hoverIntent_t)
            }
            if (t.type == "mouseenter") {
                u = n.pageX;
                a = n.pageY;
                e(r).on("mousemove.hoverIntent", f);
                if (r.hoverIntent_s != 1) {
                    r.hoverIntent_t = setTimeout(function() {
                        l(n, r)
                    }, i.interval)
                }
            } else {
                e(r).off("mousemove.hoverIntent", f);
                if (r.hoverIntent_s == 1) {
                    r.hoverIntent_t = setTimeout(function() {
                        c(n, r)
                    }, i.timeout)
                }
            }
        };
        return this.on({
            "mouseenter.hoverIntent": h,
            "mouseleave.hoverIntent": h
        }, i.selector)
    }
})(jQuery);
(function(e) {
    function t(t, n, r, i) {
        var s = t.text(), o = s.split(n), u = "";
        if (o.length) {
            e(o).each(function(e, t) {
                u += '<span class="' + r + (e + 1) + '" aria-hidden="true">' + t + "</span>" + i
            });
            t.attr("aria-label", s).empty().append(u)
        }
    }
    var n = {
        init: function() {
            return this.each(function() {
                t(e(this), "", "char", "")
            })
        },
        words: function() {
            return this.each(function() {
                t(e(this), " ", "word", " ")
            })
        },
        lines: function() {
            return this.each(function() {
                var n = "eefec303079ad17405c889e092e105b0";
                t(e(this).children("br").replaceWith(n).end(), n, "line", "")
            })
        }
    };
    e.fn.lettering = function(t) {
        if (t && n[t]) {
            return n[t].apply(this, [].slice.call(arguments, 1))
        } else if (t === "letters" ||!t) {
            return n.init.apply(this, [].slice.call(arguments, 0))
        }
        e.error("Method " + t + " does not exist on jQuery.lettering");
        return this
    }
})(jQuery);
(function(e) {
    if (typeof define === "function" && define.amd) {
        define(["jquery"], e)
    } else {
        e(jQuery)
    }
})(function(e) {
    function r(t, n, r) {
        var i = n.hash.slice(1), s = document.getElementById(i) || document.getElementsByName(i)[0];
        if (!s)
            return;
        if (t)
            t.preventDefault();
        var o = e(r.target);
        if (r.lock && o.is(":animated") || r.onBefore && r.onBefore(t, s, o) === false)
            return;
        if (r.stop)
            o._scrollable().stop(true);
        if (r.hash) {
            var u = s.id === i ? "id": "name", a = e("<a> </a>").attr(u, i).css({
                position: "absolute",
                top: e(window).scrollTop(),
                left: e(window).scrollLeft()
            });
            s[u] = "";
            e("body").prepend(a);
            location.hash = n.hash;
            a.remove();
            s[u] = i
        }
        o.scrollTo(s, r).trigger("notify.serialScroll", [s])
    }
    var t = location.href.replace(/#.*/, "");
    var n = e.localScroll = function(t) {
        e("body").localScroll(t)
    };
    n.defaults = {
        duration: 1e3,
        axis: "y",
        event: "click",
        stop: true,
        target: window
    };
    e.fn.localScroll = function(i) {
        function s() {
            return !!this.href&&!!this.hash && this.href.replace(this.hash, "") == t && (!i.filter || e(this).is(i.filter))
        }
        i = e.extend({}, n.defaults, i);
        if (i.hash && location.hash) {
            if (i.target)
                window.scrollTo(0, 0);
            r(0, location, i)
        }
        return i.lazy ? this.on(i.event, "a,area", function(e) {
            if (s.call(this)) {
                r(e, this, i)
            }
        }) : this.find("a,area").filter(s).bind(i.event, function(e) {
            r(e, this, i)
        }).end().end()
    };
    n.hash = function() {};
    return n
});
!function(e) {
    "use strict";
    e.event.special.swipe = e.event.special.swipe || {
            scrollSupressionThreshold: 10,
            durationThreshold: 1e3,
            horizontalDistanceThreshold: 30,
            verticalDistanceThreshold: 75,
            setup: function() {
                var t = e(this);
                t.bind("touchstart", function(n) {
                    function r(t) {
                        if (o) {
                            var n = t.originalEvent.touches ? t.originalEvent.touches[0]: t;
                            i = {
                                time: (new Date).getTime(),
                                coords: [n.pageX, n.pageY]
                            }, Math.abs(o.coords[0] - i.coords[0]) > e.event.special.swipe.scrollSupressionThreshold && t.preventDefault()
                        }
                    }
                    var i, s = n.originalEvent.touches ? n.originalEvent.touches[0]: n, o = {
                        time: (new Date).getTime(),
                        coords: [s.pageX, s.pageY],
                        origin: e(n.target)
                    };
                    t.bind("touchmove", r).one("touchend", function() {
                        t.unbind("touchmove", r), o && i && i.time - o.time < e.event.special.swipe.durationThreshold && Math.abs(o.coords[0] - i.coords[0]) > e.event.special.swipe.horizontalDistanceThreshold && Math.abs(o.coords[1] - i.coords[1]) < e.event.special.swipe.verticalDistanceThreshold && o.origin.trigger("swipe").trigger(o.coords[0] > i.coords[0] ? "swipeleft" : "swiperight"), o = i = void 0
                    })
                })
            }
        }, e.event.special.swipeleft = e.event.special.swipeleft || {
            setup: function() {
                e(this).bind("swipe", e.noop)
            }
        }, e.event.special.swiperight = e.event.special.swiperight || e.event.special.swipeleft
}(jQuery);
(function(e) {
    var t=!1, n=!1, r = 5e3, i = 2e3, s = 0, o = function() {
        var e = document.getElementsByTagName("script"), e = e[e.length - 1].src.split("?")[0];
        return 0 < e.split("/").length ? e.split("/").slice(0, - 1).join("/") + "/" : ""
    }();
    Array.prototype.forEach || (Array.prototype.forEach = function(e, t) {
        for (var n = 0, r = this.length; n < r; ++n)
            e.call(t, this[n], n, this)
    });
    var u = window.requestAnimationFrame ||!1, f = window.cancelAnimationFrame ||!1;
    ["ms", "moz", "webkit", "o"].forEach(function(e) {
        u || (u = window[e + "RequestAnimationFrame"]);
        f || (f = window[e + "CancelAnimationFrame"] || window[e + "CancelRequestAnimationFrame"])
    });
    var l = window.MutationObserver || window.WebKitMutationObserver ||!1, c = {
        zindex: "auto",
        cursoropacitymin: 0,
        cursoropacitymax: 1,
        cursorcolor: "#424242",
        cursorwidth: "5px",
        cursorborder: "1px solid #fff",
        cursorborderradius: "5px",
        scrollspeed: 60,
        mousescrollstep: 24,
        touchbehavior: !1,
        hwacceleration: !0,
        usetransition: !0,
        boxzoom: !1,
        dblclickzoom: !0,
        gesturezoom: !0,
        grabcursorenabled: !0,
        autohidemode: !0,
        background: "",
        iframeautoresize: !0,
        cursorminheight: 32,
        preservenativescrolling: !0,
        railoffset: !1,
        bouncescroll: !0,
        spacebarenabled: !0,
        railpadding: {
            top: 0,
            right: 0,
            left: 0,
            bottom: 0
        },
        disableoutline: !0,
        horizrailenabled: !0,
        railalign: "right",
        railvalign: "bottom",
        enabletranslate3d: !0,
        enablemousewheel: !0,
        enablekeyboard: !0,
        smoothscroll: !0,
        sensitiverail: !0,
        enablemouselockapi: !0,
        cursorfixedheight: !1,
        directionlockdeadzone: 6,
        hidecursordelay: 400,
        nativeparentscrolling: !0,
        enablescrollonselection: !0,
        overflowx: !0,
        overflowy: !0,
        cursordragspeed: .3,
        rtlmode: !1,
        cursordragontouch: !1
    }, h=!1, p = function() {
        if (h)
            return h;
        var e = document.createElement("DIV"), t = {
            haspointerlock: "pointerLockElement"in document || "mozPointerLockElement"in document || "webkitPointerLockElement"in document
        };
        t.isopera = "opera"in window;
        t.isopera12 = t.isopera && "getUserMedia"in navigator;
        t.isie = "all"in document && "attachEvent"in e&&!t.isopera;
        t.isieold = t.isie&&!("msInterpolationMode"in e.style);
        t.isie7 = t.isie&&!t.isieold && (!("documentMode"in document) || 7 == document.documentMode);
        t.isie8 = t.isie && "documentMode"in document && 8 == document.documentMode;
        t.isie9 = t.isie && "performance"in window && 9 <= document.documentMode;
        t.isie10 = t.isie && "performance"in window && 10 <= document.documentMode;
        t.isie9mobile = /iemobile.9/i.test(navigator.userAgent);
        t.isie9mobile && (t.isie9=!1);
        t.isie7mobile=!t.isie9mobile && t.isie7 && /iemobile/i.test(navigator.userAgent);
        t.ismozilla = "MozAppearance"in e.style;
        t.iswebkit = "WebkitAppearance"in e.style;
        t.ischrome = "chrome"in window;
        t.ischrome22 = t.ischrome && t.haspointerlock;
        t.ischrome26 = t.ischrome && "transition"in e.style;
        t.cantouch = "ontouchstart"in document.documentElement || "ontouchstart"in window;
        t.hasmstouch = window.navigator.msPointerEnabled ||!1;
        t.ismac = /^mac$/i.test(navigator.platform);
        t.isios = t.cantouch && /iphone|ipad|ipod/i.test(navigator.platform);
        t.isios4 = t.isios&&!("seal"in Object);
        t.isandroid = /android/i.test(navigator.userAgent);
        t.trstyle=!1;
        t.hastransform=!1;
        t.hastranslate3d=!1;
        t.transitionstyle=!1;
        t.hastransition=!1;
        t.transitionend=!1;
        for (var n = ["transform", "msTransform", "webkitTransform", "MozTransform", "OTransform"], r = 0; r < n.length; r++)
            if ("undefined" != typeof e.style[n[r]]) {
                t.trstyle = n[r];
                break
            }
        t.hastransform=!1 != t.trstyle;
        t.hastransform && (e.style[t.trstyle] = "translate3d(1px,2px,3px)", t.hastranslate3d = /translate3d/.test(e.style[t.trstyle]));
        t.transitionstyle=!1;
        t.prefixstyle = "";
        t.transitionend=!1;
        for (var n = "transition webkitTransition MozTransition OTransition OTransition msTransition KhtmlTransition".split(" "), i = " -webkit- -moz- -o- -o -ms- -khtml-".split(" "), s = "transitionend webkitTransitionEnd transitionend otransitionend oTransitionEnd msTransitionEnd KhtmlTransitionEnd".split(" "), r = 0; r < n.length; r++)
            if (n[r]in e.style) {
                t.transitionstyle = n[r];
                t.prefixstyle = i[r];
                t.transitionend = s[r];
                break
            }
        t.ischrome26 && (t.prefixstyle = i[1]);
        t.hastransition = t.transitionstyle;
        e: {
            n = ["-moz-grab", "-webkit-grab", "grab"];
            if (t.ischrome&&!t.ischrome22 || t.isie)
                n = [];
            for (r = 0; r < n.length; r++)
                if (i = n[r], e.style.cursor = i, e.style.cursor == i) {
                    n = i;
                    break e
                }
            n = "url(http://www.google.com/intl/en_ALL/mapfiles/openhand.cur),n-resize"
        }
        t.cursorgrabvalue = n;
        t.hasmousecapture = "setCapture"in e;
        t.hasMutationObserver=!1 !== l;
        return h = t
    }, d = function(a, h) {
        function d() {
            var e = b.win;
            if ("zIndex"in e)
                return e.zIndex();
            for (; 0 < e.length && 9 != e[0].nodeType;) {
                var t = e.css("zIndex");
                if (!isNaN(t) && 0 != t)
                    return parseInt(t);
                e = e.parent()
            }
            return !1
        }
        function m(e, t, n) {
            t = e.css(t);
            e = parseFloat(t);
            return isNaN(e) ? (e = N[t] || 0, n = 3 == e ? n ? b.win.outerHeight() - b.win.innerHeight() : b.win.outerWidth() - b.win.innerWidth() : 1, b.isie8 && e && (e += 1), n ? e : 0) : e
        }
        function g(e, t, n, r) {
            b._bind(e, t, function(r) {
                r = r ? r : window.event;
                var i = {
                    original: r,
                    target: r.target || r.srcElement,
                    type: "wheel",
                    deltaMode: "MozMousePixelScroll" == r.type ? 0: 1,
                    deltaX: 0,
                    deltaZ: 0,
                    preventDefault: function() {
                        r.preventDefault ? r.preventDefault() : r.returnValue=!1;
                        return !1
                    },
                    stopImmediatePropagation: function() {
                        r.stopImmediatePropagation ? r.stopImmediatePropagation() : r.cancelBubble=!0
                    }
                };
                "mousewheel" == t ? (i.deltaY =- .025 * r.wheelDelta, r.wheelDeltaX && (i.deltaX =- .025 * r.wheelDeltaX)) : i.deltaY = r.detail;
                return n.call(e, i)
            }, r)
        }
        function y(e, t, n) {
            var r, i;
            0 == e.deltaMode ? (r =- Math.floor(e.deltaX * (b.opt.mousescrollstep / 54)), i =- Math.floor(e.deltaY * (b.opt.mousescrollstep / 54))) : 1 == e.deltaMode && (r =- Math.floor(e.deltaX * b.opt.mousescrollstep), i =- Math.floor(e.deltaY * b.opt.mousescrollstep));
            t && 0 == r && i && (r = i, i = 0);
            r && (b.scrollmom && b.scrollmom.stop(), b.lastdeltax += r, b.debounced("mousewheelx", function() {
                var e = b.lastdeltax;
                b.lastdeltax = 0;
                b.rail.drag || b.doScrollLeftBy(e)
            }, 120));
            if (i) {
                if (b.opt.nativeparentscrolling && n&&!b.ispage&&!b.zoomactive)
                    if (0 > i) {
                        if (b.getScrollTop() >= b.page.maxh)
                            return !0
                    } else if (0 >= b.getScrollTop())
                        return !0;
                b.scrollmom && b.scrollmom.stop();
                b.lastdeltay += i;
                b.debounced("mousewheely", function() {
                    var e = b.lastdeltay;
                    b.lastdeltay = 0;
                    b.rail.drag || b.doScrollBy(e)
                }, 120)
            }
            e.stopImmediatePropagation();
            return e.preventDefault()
        }
        var b = this;
        this.version = "3.4.0";
        this.name = "nicescroll";
        this.me = h;
        this.opt = {
            doc: e("body"),
            win: !1
        };
        e.extend(this.opt, c);
        this.opt.snapbackspeed = 80;
        if (a)
            for (var E in b.opt)
                "undefined" != typeof a[E] && (b.opt[E] = a[E]);
        this.iddoc = (this.doc = b.opt.doc) && this.doc[0] ? this.doc[0].id || "" : "";
        this.ispage = /BODY|HTML/.test(b.opt.win ? b.opt.win[0].nodeName : this.doc[0].nodeName);
        this.haswrapper=!1 !== b.opt.win;
        this.win = b.opt.win || (this.ispage ? e(window) : this.doc);
        this.docscroll = this.ispage&&!this.haswrapper ? e(window) : this.win;
        this.body = e("body");
        this.iframe = this.isfixed = this.viewport=!1;
        this.isiframe = "IFRAME" == this.doc[0].nodeName && "IFRAME" == this.win[0].nodeName;
        this.istextarea = "TEXTAREA" == this.win[0].nodeName;
        this.forcescreen=!1;
        this.canshowonmouseevent = "scroll" != b.opt.autohidemode;
        this.page = this.view = this.onzoomout = this.onzoomin = this.onscrollcancel = this.onscrollend = this.onscrollstart = this.onclick = this.ongesturezoom = this.onkeypress = this.onmousewheel = this.onmousemove = this.onmouseup = this.onmousedown=!1;
        this.scroll = {
            x: 0,
            y: 0
        };
        this.scrollratio = {
            x: 0,
            y: 0
        };
        this.cursorheight = 20;
        this.scrollvaluemax = 0;
        this.observerremover = this.observer = this.scrollmom = this.scrollrunning = this.checkrtlmode=!1;
        do
            this.id = "ascrail" + i++;
        while (document.getElementById(this.id));
        this.hasmousefocus = this.hasfocus = this.zoomactive = this.zoom = this.selectiondrag = this.cursorfreezed = this.cursor = this.rail=!1;
        this.visibility=!0;
        this.hidden = this.locked=!1;
        this.cursoractive=!0;
        this.overflowx = b.opt.overflowx;
        this.overflowy = b.opt.overflowy;
        this.nativescrollingarea=!1;
        this.checkarea = 0;
        this.events = [];
        this.saved = {};
        this.delaylist = {};
        this.synclist = {};
        this.lastdeltay = this.lastdeltax = 0;
        this.detected = p();
        var S = e.extend({}, this.detected);
        this.ishwscroll = (this.canhwscroll = S.hastransform && b.opt.hwacceleration) && b.haswrapper;
        this.istouchcapable=!1;
        S.cantouch && S.ischrome&&!S.isios&&!S.isandroid && (this.istouchcapable=!0, S.cantouch=!1);
        S.cantouch && S.ismozilla&&!S.isios && (this.istouchcapable=!0, S.cantouch=!1);
        b.opt.enablemouselockapi || (S.hasmousecapture=!1, S.haspointerlock=!1);
        this.delayed = function(e, t, n, r) {
            var i = b.delaylist[e], s = (new Date).getTime();
            if (!r && i && i.tt)
                return !1;
            i && i.tt && clearTimeout(i.tt);
            if (i && i.last + n > s&&!i.tt)
                b.delaylist[e] = {
                    last: s + n,
                    tt: setTimeout(function() {
                        b.delaylist[e].tt = 0;
                        t.call()
                    }, n)
                };
            else if (!i ||!i.tt)
                b.delaylist[e] = {
                    last: s,
                    tt: 0
                }, setTimeout(function() {
                    t.call()
                }, 0)
        };
        this.debounced = function(e, t, n) {
            var r = b.delaylist[e];
            (new Date).getTime();
            b.delaylist[e] = t;
            r || setTimeout(function() {
                var t = b.delaylist[e];
                b.delaylist[e]=!1;
                t.call()
            }, n)
        };
        this.synched = function(e, t) {
            b.synclist[e] = t;
            (function() {
                b.onsync || (u(function() {
                    b.onsync=!1;
                    for (e in b.synclist) {
                        var t = b.synclist[e];
                        t && t.call(b);
                        b.synclist[e]=!1
                    }
                }), b.onsync=!0)
            })();
            return e
        };
        this.unsynched = function(e) {
            b.synclist[e] && (b.synclist[e]=!1)
        };
        this.css = function(e, t) {
            for (var n in t)
                b.saved.css.push([e, n, e.css(n)]), e.css(n, t[n])
        };
        this.scrollTop = function(e) {
            return "undefined" == typeof e ? b.getScrollTop() : b.setScrollTop(e)
        };
        this.scrollLeft = function(e) {
            return "undefined" == typeof e ? b.getScrollLeft() : b.setScrollLeft(e)
        };
        BezierClass = function(e, t, n, r, i, s, o) {
            this.st = e;
            this.ed = t;
            this.spd = n;
            this.p1 = r || 0;
            this.p2 = i || 1;
            this.p3 = s || 0;
            this.p4 = o || 1;
            this.ts = (new Date).getTime();
            this.df = this.ed - this.st
        };
        BezierClass.prototype = {
            B2: function(e) {
                return 3 * e * e * (1 - e)
            },
            B3: function(e) {
                return 3 * e * (1 - e) * (1 - e)
            },
            B4: function(e) {
                return (1 - e) * (1 - e) * (1 - e)
            },
            getNow: function() {
                var e = 1 - ((new Date).getTime() - this.ts) / this.spd, t = this.B2(e) + this.B3(e) + this.B4(e);
                return 0 > e ? this.ed : this.st + Math.round(this.df * t)
            },
            update: function(e, t) {
                this.st = this.getNow();
                this.ed = e;
                this.spd = t;
                this.ts = (new Date).getTime();
                this.df = this.ed - this.st;
                return this
            }
        };
        if (this.ishwscroll) {
            this.doc.translate = {
                x: 0,
                y: 0,
                tx: "0px",
                ty: "0px"
            };
            S.hastranslate3d && S.isios && this.doc.css("-webkit-backface-visibility", "hidden");
            var T = function() {
                var e = b.doc.css(S.trstyle);
                return e && "matrix" == e.substr(0, 6) ? e.replace(/^.*\((.*)\)$/g, "$1").replace(/px/g, "").split(/, +/) : !1
            };
            this.getScrollTop = function(e) {
                if (!e) {
                    if (e = T())
                        return 16 == e.length?-e[13] : - e[5];
                    if (b.timerscroll && b.timerscroll.bz)
                        return b.timerscroll.bz.getNow()
                }
                return b.doc.translate.y
            };
            this.getScrollLeft = function(e) {
                if (!e) {
                    if (e = T())
                        return 16 == e.length?-e[12] : - e[4];
                    if (b.timerscroll && b.timerscroll.bh)
                        return b.timerscroll.bh.getNow()
                }
                return b.doc.translate.x
            };
            this.notifyScrollEvent = document.createEvent ? function(e) {
                var t = document.createEvent("UIEvents");
                t.initUIEvent("scroll", !1, !0, window, 1);
                e.dispatchEvent(t)
            } : document.fireEvent ? function(e) {
                var t = document.createEventObject();
                e.fireEvent("onscroll");
                t.cancelBubble=!0
            } : function(e, t) {};
            S.hastranslate3d && b.opt.enabletranslate3d ? (this.setScrollTop = function(e, t) {
                b.doc.translate.y = e;
                b.doc.translate.ty =- 1 * e + "px";
                b.doc.css(S.trstyle, "translate3d(" + b.doc.translate.tx + "," + b.doc.translate.ty + ",0px)");
                t || b.notifyScrollEvent(b.win[0])
            }, this.setScrollLeft = function(e, t) {
                b.doc.translate.x = e;
                b.doc.translate.tx =- 1 * e + "px";
                b.doc.css(S.trstyle, "translate3d(" + b.doc.translate.tx + "," + b.doc.translate.ty + ",0px)");
                t || b.notifyScrollEvent(b.win[0])
            }) : (this.setScrollTop = function(e, t) {
                b.doc.translate.y = e;
                b.doc.translate.ty =- 1 * e + "px";
                b.doc.css(S.trstyle, "translate(" + b.doc.translate.tx + "," + b.doc.translate.ty + ")");
                t || b.notifyScrollEvent(b.win[0])
            }, this.setScrollLeft = function(e, t) {
                b.doc.translate.x = e;
                b.doc.translate.tx =- 1 * e + "px";
                b.doc.css(S.trstyle, "translate(" + b.doc.translate.tx + "," + b.doc.translate.ty + ")");
                t || b.notifyScrollEvent(b.win[0])
            })
        } else
            this.getScrollTop = function() {
                return b.docscroll.scrollTop()
            }, this.setScrollTop = function(e) {
                return b.docscroll.scrollTop(e)
            }, this.getScrollLeft = function() {
                return b.docscroll.scrollLeft()
            }, this.setScrollLeft = function(e) {
                return b.docscroll.scrollLeft(e)
            };
        this.getTarget = function(e) {
            return !e?!1 : e.target ? e.target : e.srcElement ? e.srcElement : !1
        };
        this.hasParent = function(e, t) {
            if (!e)
                return !1;
            for (var n = e.target || e.srcElement || e ||!1; n && n.id != t;)
                n = n.parentNode ||!1;
            return !1 !== n
        };
        var N = {
            thin: 1,
            medium: 3,
            thick: 5
        };
        this.getOffset = function() {
            if (b.isfixed)
                return {
                    top: parseFloat(b.win.css("top")),
                    left: parseFloat(b.win.css("left"))
                };
            if (!b.viewport)
                return b.win.offset();
            var e = b.win.offset(), t = b.viewport.offset();
            return {
                top: e.top - t.top + b.viewport.scrollTop(),
                left: e.left - t.left + b.viewport.scrollLeft()
            }
        };
        this.updateScrollBar = function(e) {
            if (b.ishwscroll)
                b.rail.css({
                    height: b.win.innerHeight()
                }), b.railh && b.railh.css({
                    width: b.win.innerWidth()
                });
            else {
                var t = b.getOffset(), n = t.top, r = t.left, n = n + m(b.win, "border-top-width", !0);
                b.win.outerWidth();
                b.win.innerWidth();
                var r = r + (b.rail.align ? b.win.outerWidth() - m(b.win, "border-right-width") - b.rail.width : m(b.win, "border-left-width")), i = b.opt.railoffset;
                i && (i.top && (n += i.top), b.rail.align && i.left && (r += i.left));
                b.locked || b.rail.css({
                    top: n,
                    left: r,
                    height: e ? e.h: b.win.innerHeight()
                });
                b.zoom && b.zoom.css({
                    top: n + 1,
                    left: 1 == b.rail.align ? r - 20: r + b.rail.width + 4
                });
                b.railh&&!b.locked && (n = t.top, r = t.left, e = b.railh.align ? n + m(b.win, "border-top-width", !0) + b.win.innerHeight() - b.railh.height : n + m(b.win, "border-top-width", !0), r += m(b.win, "border-left-width"), b.railh.css({
                    top: e,
                    left: r,
                    width: b.railh.width
                }))
            }
        };
        this.doRailClick = function(e, t, n) {
            var r;
            b.locked || (b.cancelEvent(e), t ? (t = n ? b.doScrollLeft : b.doScrollTop, r = n ? (e.pageX - b.railh.offset().left - b.cursorwidth / 2) * b.scrollratio.x : (e.pageY - b.rail.offset().top - b.cursorheight / 2) * b.scrollratio.y, t(r)) : (t = n ? b.doScrollLeftBy : b.doScrollBy, r = n ? b.scroll.x : b.scroll.y, e = n ? e.pageX - b.railh.offset().left : e.pageY - b.rail.offset().top, n = n ? b.view.w : b.view.h, r >= e ? t(n) : t( - n)))
        };
        b.hasanimationframe = u;
        b.hascancelanimationframe = f;
        b.hasanimationframe ? b.hascancelanimationframe || (f = function() {
            b.cancelAnimationFrame=!0
        }) : (u = function(e) {
            return setTimeout(e, 15 - Math.floor( + (new Date) / 1e3)%16)
        }, f = clearInterval);
        this.init = function() {
            b.saved.css = [];
            if (S.isie7mobile)
                return !0;
            S.hasmstouch && b.css(b.ispage ? e("html") : b.win, {
                "-ms-touch-action": "none"
            });
            b.zindex = "auto";
            b.zindex=!b.ispage && "auto" == b.opt.zindex ? d() || "auto" : b.opt.zindex;
            !b.ispage && "auto" != b.zindex && b.zindex > s && (s = b.zindex);
            b.isie && 0 == b.zindex && "auto" == b.opt.zindex && (b.zindex = "auto");
            if (!b.ispage ||!S.cantouch&&!S.isieold&&!S.isie9mobile) {
                var i = b.docscroll;
                b.ispage && (i = b.haswrapper ? b.win : b.doc);
                S.isie9mobile || b.css(i, {
                    "overflow-y": "hidden"
                });
                b.ispage && S.isie7 && ("BODY" == b.doc[0].nodeName ? b.css(e("html"), {
                    "overflow-y": "hidden"
                }) : "HTML" == b.doc[0].nodeName && b.css(e("body"), {
                    "overflow-y": "hidden"
                }));
                S.isios&&!b.ispage&&!b.haswrapper && b.css(e("body"), {
                    "-webkit-overflow-scrolling": "touch"
                });
                var u = e(document.createElement("div"));
                u.css({
                    position: "relative",
                    top: 0,
                    "float": "right",
                    width: b.opt.cursorwidth,
                    height: "0px",
                    "background-color": b.opt.cursorcolor,
                    border: b.opt.cursorborder,
                    "background-clip": "padding-box",
                    "-webkit-border-radius": b.opt.cursorborderradius,
                    "-moz-border-radius": b.opt.cursorborderradius,
                    "border-radius": b.opt.cursorborderradius
                });
                u.hborder = parseFloat(u.outerHeight() - u.innerHeight());
                b.cursor = u;
                var a = e(document.createElement("div"));
                a.attr("id", b.id);
                a.addClass("nicescroll-rails");
                var f, c, h = ["left", "right"], p;
                for (p in h)
                    c = h[p], (f = b.opt.railpadding[c]) ? a.css("padding-" + c, f + "px") : b.opt.railpadding[c] = 0;
                a.append(u);
                a.width = Math.max(parseFloat(b.opt.cursorwidth), u.outerWidth()) + b.opt.railpadding.left + b.opt.railpadding.right;
                a.css({
                    width: a.width + "px",
                    zIndex: b.zindex,
                    background: b.opt.background,
                    cursor: "default"
                });
                a.visibility=!0;
                a.scrollable=!0;
                a.align = "left" == b.opt.railalign ? 0 : 1;
                b.rail = a;
                u = b.rail.drag=!1;
                b.opt.boxzoom&&!b.ispage&&!S.isieold && (u = document.createElement("div"), b.bind(u, "click", b.doZoom), b.zoom = e(u), b.zoom.css({
                    cursor: "pointer",
                    "z-index": b.zindex,
                    backgroundImage: "url(" + o + "zoomico.png)",
                    height: 18,
                    width: 18,
                    backgroundPosition: "0px 0px"
                }), b.opt.dblclickzoom && b.bind(b.win, "dblclick", b.doZoom), S.cantouch && b.opt.gesturezoom && (b.ongesturezoom = function(e) {
                    1.5 < e.scale && b.doZoomIn(e);
                    .8 > e.scale && b.doZoomOut(e);
                    return b.cancelEvent(e)
                }, b.bind(b.win, "gestureend", b.ongesturezoom)));
                b.railh=!1;
                if (b.opt.horizrailenabled) {
                    b.css(i, {
                        "overflow-x": "hidden"
                    });
                    u = e(document.createElement("div"));
                    u.css({
                        position: "relative",
                        top: 0,
                        height: b.opt.cursorwidth,
                        width: "0px",
                        "background-color": b.opt.cursorcolor,
                        border: b.opt.cursorborder,
                        "background-clip": "padding-box",
                        "-webkit-border-radius": b.opt.cursorborderradius,
                        "-moz-border-radius": b.opt.cursorborderradius,
                        "border-radius": b.opt.cursorborderradius
                    });
                    u.wborder = parseFloat(u.outerWidth() - u.innerWidth());
                    b.cursorh = u;
                    var m = e(document.createElement("div"));
                    m.attr("id", b.id + "-hr");
                    m.addClass("nicescroll-rails");
                    m.height = Math.max(parseFloat(b.opt.cursorwidth), u.outerHeight());
                    m.css({
                        height: m.height + "px",
                        zIndex: b.zindex,
                        background: b.opt.background
                    });
                    m.append(u);
                    m.visibility=!0;
                    m.scrollable=!0;
                    m.align = "top" == b.opt.railvalign ? 0 : 1;
                    b.railh = m;
                    b.railh.drag=!1
                }
                b.ispage ? (a.css({
                    position: "fixed",
                    top: "0px",
                    height: "100%"
                }), a.align ? a.css({
                    right: "0px"
                }) : a.css({
                    left: "0px"
                }), b.body.append(a), b.railh && (m.css({
                    position: "fixed",
                    left: "0px",
                    width: "100%"
                }), m.align ? m.css({
                    bottom: "0px"
                }) : m.css({
                    top: "0px"
                }), b.body.append(m))) : (b.ishwscroll ? ("static" == b.win.css("position") && b.css(b.win, {
                    position: "relative"
                }), i = "HTML" == b.win[0].nodeName ? b.body : b.win, b.zoom && (b.zoom.css({
                    position: "absolute",
                    top: 1,
                    right: 0,
                    "margin-right": a.width + 4
                }), i.append(b.zoom)), a.css({
                    position: "absolute",
                    top: 0
                }), a.align ? a.css({
                    right: 0
                }) : a.css({
                    left: 0
                }), i.append(a), m && (m.css({
                    position: "absolute",
                    left: 0,
                    bottom: 0
                }), m.align ? m.css({
                    bottom: 0
                }) : m.css({
                    top: 0
                }), i.append(m))) : (b.isfixed = "fixed" == b.win.css("position"), i = b.isfixed ? "fixed" : "absolute", b.isfixed || (b.viewport = b.getViewport(b.win[0])), b.viewport && (b.body = b.viewport, !1 == /relative|absolute/.test(b.viewport.css("position")) && b.css(b.viewport, {
                    position: "relative"
                })), a.css({
                    position: i
                }), b.zoom && b.zoom.css({
                    position: i
                }), b.updateScrollBar(), b.body.append(a), b.zoom && b.body.append(b.zoom), b.railh && (m.css({
                    position: i
                }), b.body.append(m))), S.isios && b.css(b.win, {
                    "-webkit-tap-highlight-color": "rgba(0,0,0,0)",
                    "-webkit-touch-callout": "none"
                }), S.isie && b.opt.disableoutline && b.win.attr("hideFocus", "true"), S.iswebkit && b.opt.disableoutline && b.win.css({
                    outline: "none"
                }));
                !1 === b.opt.autohidemode ? (b.autohidedom=!1, b.rail.css({
                    opacity: b.opt.cursoropacitymax
                }), b.railh && b.railh.css({
                    opacity: b.opt.cursoropacitymax
                })) : !0 === b.opt.autohidemode ? (b.autohidedom = e().add(b.rail), S.isie8 && (b.autohidedom = b.autohidedom.add(b.cursor)), b.railh && (b.autohidedom = b.autohidedom.add(b.railh)), b.railh && S.isie8 && (b.autohidedom = b.autohidedom.add(b.cursorh))) : "scroll" == b.opt.autohidemode ? (b.autohidedom = e().add(b.rail), b.railh && (b.autohidedom = b.autohidedom.add(b.railh))) : "cursor" == b.opt.autohidemode ? (b.autohidedom = e().add(b.cursor), b.railh && (b.autohidedom = b.autohidedom.add(b.cursorh))) : "hidden" == b.opt.autohidemode && (b.autohidedom=!1, b.hide(), b.locked=!1);
                if (S.isie9mobile)
                    b.scrollmom = new v(b), b.onmangotouch = function(e) {
                        e = b.getScrollTop();
                        var t = b.getScrollLeft();
                        if (e == b.scrollmom.lastscrolly && t == b.scrollmom.lastscrollx)
                            return !0;
                        var n = e - b.mangotouch.sy, r = t - b.mangotouch.sx;
                        if (0 != Math.round(Math.sqrt(Math.pow(r, 2) + Math.pow(n, 2)))) {
                            var i = 0 > n?-1 : 1, s = 0 > r?-1 : 1, o =+ (new Date);
                            b.mangotouch.lazy && clearTimeout(b.mangotouch.lazy);
                            80 < o - b.mangotouch.tm || b.mangotouch.dry != i || b.mangotouch.drx != s ? (b.scrollmom.stop(), b.scrollmom.reset(t, e), b.mangotouch.sy = e, b.mangotouch.ly = e, b.mangotouch.sx = t, b.mangotouch.lx = t, b.mangotouch.dry = i, b.mangotouch.drx = s, b.mangotouch.tm = o) : (b.scrollmom.stop(), b.scrollmom.update(b.mangotouch.sx - r, b.mangotouch.sy - n), b.mangotouch.tm = o, n = Math.max(Math.abs(b.mangotouch.ly - e), Math.abs(b.mangotouch.lx - t)), b.mangotouch.ly = e, b.mangotouch.lx = t, 2 < n && (b.mangotouch.lazy = setTimeout(function() {
                                b.mangotouch.lazy=!1;
                                b.mangotouch.dry = 0;
                                b.mangotouch.drx = 0;
                                b.mangotouch.tm = 0;
                                b.scrollmom.doMomentum(30)
                            }, 100)))
                        }
                    }, a = b.getScrollTop(), m = b.getScrollLeft(), b.mangotouch = {
                        sy: a,
                        ly: a,
                        dry: 0,
                        sx: m,
                        lx: m,
                        drx: 0,
                        lazy: !1,
                        tm: 0
                    }, b.bind(b.docscroll, "scroll", b.onmangotouch);
                else {
                    if (S.cantouch || b.istouchcapable || b.opt.touchbehavior || S.hasmstouch) {
                        b.scrollmom = new v(b);
                        b.ontouchstart = function(t) {
                            if (t.pointerType && 2 != t.pointerType)
                                return !1;
                            if (!b.locked) {
                                if (S.hasmstouch)
                                    for (var n = t.target ? t.target : !1; n;) {
                                        var r = e(n).getNiceScroll();
                                        if (0 < r.length && r[0].me == b.me)
                                            break;
                                        if (0 < r.length)
                                            return !1;
                                        if ("DIV" == n.nodeName && n.id == b.id)
                                            break;
                                        n = n.parentNode ? n.parentNode : !1
                                    }
                                b.cancelScroll();
                                if ((n = b.getTarget(t)) && /INPUT/i.test(n.nodeName) && /range/i.test(n.type))
                                    return b.stopPropagation(t);
                                !("clientX"in t) && "changedTouches"in t && (t.clientX = t.changedTouches[0].clientX, t.clientY = t.changedTouches[0].clientY);
                                b.forcescreen && (r = t, t = {
                                    original: t.original ? t.original: t
                                }, t.clientX = r.screenX, t.clientY = r.screenY);
                                b.rail.drag = {
                                    x: t.clientX,
                                    y: t.clientY,
                                    sx: b.scroll.x,
                                    sy: b.scroll.y,
                                    st: b.getScrollTop(),
                                    sl: b.getScrollLeft(),
                                    pt: 2,
                                    dl: !1
                                };
                                if (b.ispage ||!b.opt.directionlockdeadzone)
                                    b.rail.drag.dl = "f";
                                else {
                                    var r = e(window).width(), i = e(window).height(), s = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth), o = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight), i = Math.max(0, o - i), r = Math.max(0, s - r);
                                    b.rail.drag.ck=!b.rail.scrollable && b.railh.scrollable ? 0 < i ? "v" : !1 : b.rail.scrollable&&!b.railh.scrollable ? 0 < r ? "h" : !1 : !1;
                                    b.rail.drag.ck || (b.rail.drag.dl = "f")
                                }
                                b.opt.touchbehavior && b.isiframe && S.isie && (r = b.win.position(), b.rail.drag.x += r.left, b.rail.drag.y += r.top);
                                b.hasmoving=!1;
                                b.lastmouseup=!1;
                                b.scrollmom.reset(t.clientX, t.clientY);
                                if (!S.cantouch&&!this.istouchcapable&&!S.hasmstouch) {
                                    if (!n ||!/INPUT|SELECT|TEXTAREA/i.test(n.nodeName))
                                        return !b.ispage && S.hasmousecapture && n.setCapture(), b.cancelEvent(t);
                                    /SUBMIT|CANCEL|BUTTON/i.test(e(n).attr("type")) && (pc = {
                                        tg: n,
                                        click: !1
                                    }, b.preventclick = pc)
                                }
                            }
                        };
                        b.ontouchend = function(e) {
                            if (e.pointerType && 2 != e.pointerType)
                                return !1;
                            if (b.rail.drag && 2 == b.rail.drag.pt && (b.scrollmom.doMomentum(), b.rail.drag=!1, b.hasmoving && (b.hasmoving=!1, b.lastmouseup=!0, b.hideCursor(), S.hasmousecapture && document.releaseCapture(), !S.cantouch)))
                                return b.cancelEvent(e)
                        };
                        var g = b.opt.touchbehavior && b.isiframe&&!S.hasmousecapture;
                        b.ontouchmove = function(t, n) {
                            if (t.pointerType && 2 != t.pointerType)
                                return !1;
                            if (b.rail.drag && 2 == b.rail.drag.pt) {
                                if (S.cantouch && "undefined" == typeof t.original)
                                    return !0;
                                b.hasmoving=!0;
                                b.preventclick&&!b.preventclick.click && (b.preventclick.click = b.preventclick.tg.onclick ||!1, b.preventclick.tg.onclick = b.onpreventclick);
                                t = e.extend({
                                    original: t
                                }, t);
                                "changedTouches"in t && (t.clientX = t.changedTouches[0].clientX, t.clientY = t.changedTouches[0].clientY);
                                if (b.forcescreen) {
                                    var r = t;
                                    t = {
                                        original: t.original ? t.original: t
                                    };
                                    t.clientX = r.screenX;
                                    t.clientY = r.screenY
                                }
                                r = ofy = 0;
                                if (g&&!n) {
                                    var i = b.win.position(), r =- i.left;
                                    ofy =- i.top
                                }
                                var s = t.clientY + ofy, i = s - b.rail.drag.y, o = t.clientX + r, u = o - b.rail.drag.x, a = b.rail.drag.st - i;
                                b.ishwscroll && b.opt.bouncescroll ? 0 > a ? a = Math.round(a / 2) : a > b.page.maxh && (a = b.page.maxh + Math.round((a - b.page.maxh) / 2)) : (0 > a && (s = a = 0), a > b.page.maxh && (a = b.page.maxh, s = 0));
                                if (b.railh && b.railh.scrollable) {
                                    var f = b.rail.drag.sl - u;
                                    b.ishwscroll && b.opt.bouncescroll ? 0 > f ? f = Math.round(f / 2) : f > b.page.maxw && (f = b.page.maxw + Math.round((f - b.page.maxw) / 2)) : (0 > f && (o = f = 0), f > b.page.maxw && (f = b.page.maxw, o = 0))
                                }
                                r=!1;
                                if (b.rail.drag.dl)
                                    r=!0, "v" == b.rail.drag.dl ? f = b.rail.drag.sl : "h" == b.rail.drag.dl && (a = b.rail.drag.st);
                                else {
                                    var i = Math.abs(i), u = Math.abs(u), l = b.opt.directionlockdeadzone;
                                    if ("v" == b.rail.drag.ck) {
                                        if (i > l && u <= .3 * i)
                                            return b.rail.drag=!1, !0;
                                        u > l && (b.rail.drag.dl = "f", e("body").scrollTop(e("body").scrollTop()))
                                    } else if ("h" == b.rail.drag.ck) {
                                        if (u > l && i <= .3 * az)
                                            return b.rail.drag=!1, !0;
                                        i > l && (b.rail.drag.dl = "f", e("body").scrollLeft(e("body").scrollLeft()))
                                    }
                                }
                                b.synched("touchmove", function() {
                                    b.rail.drag && 2 == b.rail.drag.pt && (b.prepareTransition && b.prepareTransition(0), b.rail.scrollable && b.setScrollTop(a), b.scrollmom.update(o, s), b.railh && b.railh.scrollable ? (b.setScrollLeft(f), b.showCursor(a, f)) : b.showCursor(a), S.isie10 && document.selection.clear())
                                });
                                S.ischrome && b.istouchcapable && (r=!1);
                                if (r)
                                    return b.cancelEvent(t)
                            }
                        }
                    }
                    b.onmousedown = function(e, t) {
                        if (!(b.rail.drag && 1 != b.rail.drag.pt)) {
                            if (b.locked)
                                return b.cancelEvent(e);
                            b.cancelScroll();
                            b.rail.drag = {
                                x: e.clientX,
                                y: e.clientY,
                                sx: b.scroll.x,
                                sy: b.scroll.y,
                                pt: 1,
                                hr: !!t
                            };
                            var n = b.getTarget(e);
                            !b.ispage && S.hasmousecapture && n.setCapture();
                            b.isiframe&&!S.hasmousecapture && (b.saved.csspointerevents = b.doc.css("pointer-events"), b.css(b.doc, {
                                "pointer-events": "none"
                            }));
                            return b.cancelEvent(e)
                        }
                    };
                    b.onmouseup = function(e) {
                        if (b.rail.drag && (S.hasmousecapture && document.releaseCapture(), b.isiframe&&!S.hasmousecapture && b.doc.css("pointer-events", b.saved.csspointerevents), 1 == b.rail.drag.pt))
                            return b.rail.drag=!1, b.cancelEvent(e)
                    };
                    b.onmousemove = function(e) {
                        if (b.rail.drag && 1 == b.rail.drag.pt) {
                            if (S.ischrome && 0 == e.which)
                                return b.onmouseup(e);
                            b.cursorfreezed=!0;
                            if (b.rail.drag.hr) {
                                b.scroll.x = b.rail.drag.sx + (e.clientX - b.rail.drag.x);
                                0 > b.scroll.x && (b.scroll.x = 0);
                                var t = b.scrollvaluemaxw;
                                b.scroll.x > t && (b.scroll.x = t)
                            } else
                                b.scroll.y = b.rail.drag.sy + (e.clientY - b.rail.drag.y), 0 > b.scroll.y && (b.scroll.y = 0), t = b.scrollvaluemax, b.scroll.y > t && (b.scroll.y = t);
                            b.synched("mousemove", function() {
                                b.rail.drag && 1 == b.rail.drag.pt && (b.showCursor(), b.rail.drag.hr ? b.doScrollLeft(Math.round(b.scroll.x * b.scrollratio.x), b.opt.cursordragspeed) : b.doScrollTop(Math.round(b.scroll.y * b.scrollratio.y), b.opt.cursordragspeed))
                            });
                            return b.cancelEvent(e)
                        }
                    };
                    if (S.cantouch || b.opt.touchbehavior)
                        b.onpreventclick = function(e) {
                            if (b.preventclick)
                                return b.preventclick.tg.onclick = b.preventclick.click, b.preventclick=!1, b.cancelEvent(e)
                        }, b.bind(b.win, "mousedown", b.ontouchstart), b.onclick = S.isios?!1 : function(e) {
                            return b.lastmouseup ? (b.lastmouseup=!1, b.cancelEvent(e)) : !0
                        }, b.opt.grabcursorenabled && S.cursorgrabvalue && (b.css(b.ispage ? b.doc : b.win, {
                            cursor: S.cursorgrabvalue
                        }), b.css(b.rail, {
                            cursor: S.cursorgrabvalue
                        }));
                    else {
                        var y = function(e) {
                            if (b.selectiondrag) {
                                if (e) {
                                    var t = b.win.outerHeight();
                                    e = e.pageY - b.selectiondrag.top;
                                    0 < e && e < t && (e = 0);
                                    e >= t && (e -= t);
                                    b.selectiondrag.df = e
                                }
                                0 != b.selectiondrag.df && (b.doScrollBy(2*-Math.floor(b.selectiondrag.df / 6)), b.debounced("doselectionscroll", function() {
                                    y()
                                }, 50))
                            }
                        };
                        b.hasTextSelected = "getSelection"in document ? function() {
                            return 0 < document.getSelection().rangeCount
                        } : "selection"in document ? function() {
                            return "None" != document.selection.type
                        } : function() {
                            return !1
                        };
                        b.onselectionstart = function(e) {
                            b.ispage || (b.selectiondrag = b.win.offset())
                        };
                        b.onselectionend = function(e) {
                            b.selectiondrag=!1
                        };
                        b.onselectiondrag = function(e) {
                            b.selectiondrag && b.hasTextSelected() && b.debounced("selectionscroll", function() {
                                y(e)
                            }, 250)
                        }
                    }
                    S.hasmstouch && (b.css(b.rail, {
                        "-ms-touch-action": "none"
                    }), b.css(b.cursor, {
                        "-ms-touch-action": "none"
                    }), b.bind(b.win, "MSPointerDown", b.ontouchstart), b.bind(document, "MSPointerUp", b.ontouchend), b.bind(document, "MSPointerMove", b.ontouchmove), b.bind(b.cursor, "MSGestureHold", function(e) {
                        e.preventDefault()
                    }), b.bind(b.cursor, "contextmenu", function(e) {
                        e.preventDefault()
                    }));
                    this.istouchcapable && (b.bind(b.win, "touchstart", b.ontouchstart), b.bind(document, "touchend", b.ontouchend), b.bind(document, "touchcancel", b.ontouchend), b.bind(document, "touchmove", b.ontouchmove));
                    b.bind(b.cursor, "mousedown", b.onmousedown);
                    b.bind(b.cursor, "mouseup", b.onmouseup);
                    b.railh && (b.bind(b.cursorh, "mousedown", function(e) {
                        b.onmousedown(e, !0)
                    }), b.bind(b.cursorh, "mouseup", function(e) {
                        if (!(b.rail.drag && 2 == b.rail.drag.pt))
                            return b.rail.drag=!1, b.hasmoving=!1, b.hideCursor(), S.hasmousecapture && document.releaseCapture(), b.cancelEvent(e)
                    }));
                    if (b.opt.cursordragontouch ||!S.cantouch&&!b.opt.touchbehavior)
                        b.rail.css({
                            cursor: "default"
                        }), b.railh && b.railh.css({
                            cursor: "default"
                        }), b.jqbind(b.rail, "mouseenter", function() {
                            b.canshowonmouseevent && b.showCursor();
                            b.rail.active=!0
                        }), b.jqbind(b.rail, "mouseleave", function() {
                            b.rail.active=!1;
                            b.rail.drag || b.hideCursor()
                        }), b.opt.sensitiverail && (b.bind(b.rail, "click", function(e) {
                            b.doRailClick(e, !1, !1)
                        }), b.bind(b.rail, "dblclick", function(e) {
                            b.doRailClick(e, !0, !1)
                        }), b.bind(b.cursor, "click", function(e) {
                            b.cancelEvent(e)
                        }), b.bind(b.cursor, "dblclick", function(e) {
                            b.cancelEvent(e)
                        })), b.railh && (b.jqbind(b.railh, "mouseenter", function() {
                            b.canshowonmouseevent && b.showCursor();
                            b.rail.active=!0
                        }), b.jqbind(b.railh, "mouseleave", function() {
                            b.rail.active=!1;
                            b.rail.drag || b.hideCursor()
                        }), b.opt.sensitiverail && (b.bind(b.railh, "click", function(e) {
                            b.doRailClick(e, !1, !0)
                        }), b.bind(b.railh, "dblclick", function(e) {
                            b.doRailClick(e, !0, !0)
                        }), b.bind(b.cursorh, "click", function(e) {
                            b.cancelEvent(e)
                        }), b.bind(b.cursorh, "dblclick", function(e) {
                            b.cancelEvent(e)
                        })));
                    !S.cantouch&&!b.opt.touchbehavior ? (b.bind(S.hasmousecapture ? b.win : document, "mouseup", b.onmouseup), b.bind(document, "mousemove", b.onmousemove), b.onclick && b.bind(document, "click", b.onclick), !b.ispage && b.opt.enablescrollonselection && (b.bind(b.win[0], "mousedown", b.onselectionstart), b.bind(document, "mouseup", b.onselectionend), b.bind(b.cursor, "mouseup", b.onselectionend), b.cursorh && b.bind(b.cursorh, "mouseup", b.onselectionend), b.bind(document, "mousemove", b.onselectiondrag)), b.zoom && (b.jqbind(b.zoom, "mouseenter", function() {
                        b.canshowonmouseevent && b.showCursor();
                        b.rail.active=!0
                    }), b.jqbind(b.zoom, "mouseleave", function() {
                        b.rail.active=!1;
                        b.rail.drag || b.hideCursor()
                    }))) : (b.bind(S.hasmousecapture ? b.win : document, "mouseup", b.ontouchend), b.bind(document, "mousemove", b.ontouchmove), b.onclick && b.bind(document, "click", b.onclick), b.opt.cursordragontouch && (b.bind(b.cursor, "mousedown", b.onmousedown), b.bind(b.cursor, "mousemove", b.onmousemove), b.cursorh && b.bind(b.cursorh, "mousedown", b.onmousedown), b.cursorh && b.bind(b.cursorh, "mousemove", b.onmousemove)));
                    b.opt.enablemousewheel && (b.isiframe || b.bind(S.isie && b.ispage ? document : b.docscroll, "mousewheel", b.onmousewheel), b.bind(b.rail, "mousewheel", b.onmousewheel), b.railh && b.bind(b.railh, "mousewheel", b.onmousewheelhr));
                    !b.ispage&&!S.cantouch&&!/HTML|BODY/.test(b.win[0].nodeName) && (b.win.attr("tabindex") || b.win.attr({
                        tabindex: r++
                    }), b.jqbind(b.win, "focus", function(e) {
                        t = b.getTarget(e).id ||!0;
                        b.hasfocus=!0;
                        b.canshowonmouseevent && b.noticeCursor()
                    }), b.jqbind(b.win, "blur", function(e) {
                        t=!1;
                        b.hasfocus=!1
                    }), b.jqbind(b.win, "mouseenter", function(e) {
                        n = b.getTarget(e).id ||!0;
                        b.hasmousefocus=!0;
                        b.canshowonmouseevent && b.noticeCursor()
                    }), b.jqbind(b.win, "mouseleave", function() {
                        n=!1;
                        b.hasmousefocus=!1
                    }))
                }
                b.onkeypress = function(e) {
                    if (b.locked && 0 == b.page.maxh)
                        return !0;
                    e = e ? e : window.e;
                    var r = b.getTarget(e);
                    if (r && /INPUT|TEXTAREA|SELECT|OPTION/.test(r.nodeName) && (!r.getAttribute("type")&&!r.type ||!/submit|button|cancel/i.tp))
                        return !0;
                    if (b.hasfocus || b.hasmousefocus&&!t || b.ispage&&!t&&!n) {
                        r = e.keyCode;
                        if (b.locked && 27 != r)
                            return b.cancelEvent(e);
                        var i = e.ctrlKey ||!1, s = e.shiftKey ||!1, o=!1;
                        switch (r) {
                            case 38:
                            case 63233:
                                b.doScrollBy(72);
                                o=!0;
                                break;
                            case 40:
                            case 63235:
                                b.doScrollBy( - 72);
                                o=!0;
                                break;
                            case 37:
                            case 63232:
                                b.railh && (i ? b.doScrollLeft(0) : b.doScrollLeftBy(72), o=!0);
                                break;
                            case 39:
                            case 63234:
                                b.railh && (i ? b.doScrollLeft(b.page.maxw) : b.doScrollLeftBy( - 72), o=!0);
                                break;
                            case 33:
                            case 63276:
                                b.doScrollBy(b.view.h);
                                o=!0;
                                break;
                            case 34:
                            case 63277:
                                b.doScrollBy( - b.view.h);
                                o=!0;
                                break;
                            case 36:
                            case 63273:
                                b.railh && i ? b.doScrollPos(0, 0) : b.doScrollTo(0);
                                o=!0;
                                break;
                            case 35:
                            case 63275:
                                b.railh && i ? b.doScrollPos(b.page.maxw, b.page.maxh) : b.doScrollTo(b.page.maxh);
                                o=!0;
                                break;
                            case 32:
                                b.opt.spacebarenabled && (s ? b.doScrollBy(b.view.h) : b.doScrollBy( - b.view.h), o=!0);
                                break;
                            case 27:
                                b.zoomactive && (b.doZoom(), o=!0)
                        }
                        if (o)
                            return b.cancelEvent(e)
                    }
                };
                b.opt.enablekeyboard && b.bind(document, S.isopera&&!S.isopera12 ? "keypress" : "keydown", b.onkeypress);
                b.bind(window, "resize", b.lazyResize);
                b.bind(window, "orientationchange", b.lazyResize);
                b.bind(window, "load", b.lazyResize);
                if (S.ischrome&&!b.ispage&&!b.haswrapper) {
                    var w = b.win.attr("style"), a = parseFloat(b.win.css("width")) + 1;
                    b.win.css("width", a);
                    b.synched("chromefix", function() {
                        b.win.attr("style", w)
                    })
                }
                b.onAttributeChange = function(e) {
                    b.lazyResize(250)
                };
                !b.ispage&&!b.haswrapper && (!1 !== l ? (b.observer = new l(function(e) {
                    e.forEach(b.onAttributeChange)
                }), b.observer.observe(b.win[0], {
                    childList: !0,
                    characterData: !1,
                    attributes: !0,
                    subtree: !1
                }), b.observerremover = new l(function(e) {
                    e.forEach(function(e) {
                        if (0 < e.removedNodes.length)
                            for (var t in e.removedNodes)
                                if (e.removedNodes[t] == b.win[0])
                                    return b.remove()
                    })
                }), b.observerremover.observe(b.win[0].parentNode, {
                    childList: !0,
                    characterData: !1,
                    attributes: !1,
                    subtree: !1
                })) : (b.bind(b.win, S.isie&&!S.isie9 ? "propertychange" : "DOMAttrModified", b.onAttributeChange), S.isie9 && b.win[0].attachEvent("onpropertychange", b.onAttributeChange), b.bind(b.win, "DOMNodeRemoved", function(e) {
                    e.target == b.win[0] && b.remove()
                })));
                !b.ispage && b.opt.boxzoom && b.bind(window, "resize", b.resizeZoom);
                b.istextarea && b.bind(b.win, "mouseup", b.lazyResize);
                b.checkrtlmode=!0;
                b.lazyResize(30)
            }
            if ("IFRAME" == this.doc[0].nodeName) {
                var E = function(t) {
                    b.iframexd=!1;
                    try {
                        var n = "contentDocument"in this ? this.contentDocument: this.contentWindow.document
                    } catch (r) {
                        b.iframexd=!0, n=!1
                    }
                    if (b.iframexd)
                        return "console"in window && console.log("NiceScroll error: policy restriced iframe"), !0;
                    b.forcescreen=!0;
                    b.isiframe && (b.iframe = {
                        doc: e(n),
                        html: b.doc.contents().find("html")[0],
                        body: b.doc.contents().find("body")[0]
                    }, b.getContentSize = function() {
                        return {
                            w: Math.max(b.iframe.html.scrollWidth, b.iframe.body.scrollWidth),
                            h: Math.max(b.iframe.html.scrollHeight, b.iframe.body.scrollHeight)
                        }
                    }, b.docscroll = e(b.iframe.body));
                    !S.isios && b.opt.iframeautoresize&&!b.isiframe && (b.win.scrollTop(0), b.doc.height(""), t = Math.max(n.getElementsByTagName("html")[0].scrollHeight, n.body.scrollHeight), b.doc.height(t));
                    b.lazyResize(30);
                    S.isie7 && b.css(e(b.iframe.html), {
                        "overflow-y": "hidden"
                    });
                    b.css(e(b.iframe.body), {
                        "overflow-y": "hidden"
                    });
                    "contentWindow"in this ? b.bind(this.contentWindow, "scroll", b.onscroll) : b.bind(n, "scroll", b.onscroll);
                    b.opt.enablemousewheel && b.bind(n, "mousewheel", b.onmousewheel);
                    b.opt.enablekeyboard && b.bind(n, S.isopera ? "keypress" : "keydown", b.onkeypress);
                    if (S.cantouch || b.opt.touchbehavior)
                        b.bind(n, "mousedown", b.onmousedown), b.bind(n, "mousemove", function(e) {
                            b.onmousemove(e, !0)
                        }), b.opt.grabcursorenabled && S.cursorgrabvalue && b.css(e(n.body), {
                            cursor: S.cursorgrabvalue
                        });
                    b.bind(n, "mouseup", b.onmouseup);
                    b.zoom && (b.opt.dblclickzoom && b.bind(n, "dblclick", b.doZoom), b.ongesturezoom && b.bind(n, "gestureend", b.ongesturezoom))
                };
                this.doc[0].readyState && "complete" == this.doc[0].readyState && setTimeout(function() {
                    E.call(b.doc[0], !1)
                }, 500);
                b.bind(this.doc, "load", E)
            }
        };
        this.showCursor = function(e, t) {
            b.cursortimeout && (clearTimeout(b.cursortimeout), b.cursortimeout = 0);
            if (b.rail) {
                b.autohidedom && (b.autohidedom.stop().css({
                    opacity: b.opt.cursoropacitymax
                }), b.cursoractive=!0);
                if (!b.rail.drag || 1 != b.rail.drag.pt)
                    "undefined" != typeof e&&!1 !== e && (b.scroll.y = Math.round(1 * e / b.scrollratio.y)), "undefined" != typeof t && (b.scroll.x = Math.round(1 * t / b.scrollratio.x));
                b.cursor.css({
                    height: b.cursorheight,
                    top: b.scroll.y
                });
                b.cursorh && (!b.rail.align && b.rail.visibility ? b.cursorh.css({
                    width: b.cursorwidth,
                    left: b.scroll.x + b.rail.width
                }) : b.cursorh.css({
                    width: b.cursorwidth,
                    left: b.scroll.x
                }), b.cursoractive=!0);
                b.zoom && b.zoom.stop().css({
                    opacity: b.opt.cursoropacitymax
                })
            }
        };
        this.hideCursor = function(e) {
            !b.cursortimeout && b.rail && b.autohidedom && (b.cursortimeout = setTimeout(function() {
                if (!b.rail.active ||!b.showonmouseevent)
                    b.autohidedom.stop().animate({
                        opacity: b.opt.cursoropacitymin
                    }), b.zoom && b.zoom.stop().animate({
                        opacity: b.opt.cursoropacitymin
                    }), b.cursoractive=!1;
                b.cursortimeout = 0
            }, e || b.opt.hidecursordelay))
        };
        this.noticeCursor = function(e, t, n) {
            b.showCursor(t, n);
            b.rail.active || b.hideCursor(e)
        };
        this.getContentSize = b.ispage ? function() {
            return {
                w: Math.max(document.body.scrollWidth, document.documentElement.scrollWidth),
                h: Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
            }
        } : b.haswrapper ? function() {
            return {
                w: b.doc.outerWidth() + parseInt(b.win.css("paddingLeft")) + parseInt(b.win.css("paddingRight")),
                h: b.doc.outerHeight() + parseInt(b.win.css("paddingTop")) + parseInt(b.win.css("paddingBottom"))
            }
        } : function() {
            return {
                w: b.docscroll[0].scrollWidth,
                h: b.docscroll[0].scrollHeight
            }
        };
        this.onResize = function(e, t) {
            if (!b.win)
                return !1;
            if (!b.haswrapper&&!b.ispage) {
                if ("none" == b.win.css("display"))
                    return b.visibility && b.hideRail().hideRailHr(), !1;
                !b.hidden&&!b.visibility && b.showRail().showRailHr()
            }
            var n = b.page.maxh, r = b.page.maxw, i = b.view.w;
            b.view = {
                w: b.ispage ? b.win.width(): parseInt(b.win[0].clientWidth),
                h: b.ispage ? b.win.height(): parseInt(b.win[0].clientHeight)
            };
            b.page = t ? t : b.getContentSize();
            b.page.maxh = Math.max(0, b.page.h - b.view.h);
            b.page.maxw = Math.max(0, b.page.w - b.view.w);
            if (b.page.maxh == n && b.page.maxw == r && b.view.w == i) {
                if (b.ispage)
                    return b;
                n = b.win.offset();
                if (b.lastposition && (r = b.lastposition, r.top == n.top && r.left == n.left))
                    return b;
                b.lastposition = n
            }
            0 == b.page.maxh ? (b.hideRail(), b.scrollvaluemax = 0, b.scroll.y = 0, b.scrollratio.y = 0, b.cursorheight = 0, b.setScrollTop(0), b.rail.scrollable=!1) : b.rail.scrollable=!0;
            0 == b.page.maxw ? (b.hideRailHr(), b.scrollvaluemaxw = 0, b.scroll.x = 0, b.scrollratio.x = 0, b.cursorwidth = 0, b.setScrollLeft(0), b.railh.scrollable=!1) : b.railh.scrollable=!0;
            b.locked = 0 == b.page.maxh && 0 == b.page.maxw;
            if (b.locked)
                return b.ispage || b.updateScrollBar(b.view), !1;
            !b.hidden&&!b.visibility ? b.showRail().showRailHr() : !b.hidden&&!b.railh.visibility && b.showRailHr();
            b.istextarea && b.win.css("resize") && "none" != b.win.css("resize") && (b.view.h -= 20);
            b.cursorheight = Math.min(b.view.h, Math.round(b.view.h * (b.view.h / b.page.h)));
            b.cursorheight = b.opt.cursorfixedheight ? b.opt.cursorfixedheight : Math.max(b.opt.cursorminheight, b.cursorheight);
            b.cursorwidth = Math.min(b.view.w, Math.round(b.view.w * (b.view.w / b.page.w)));
            b.cursorwidth = b.opt.cursorfixedheight ? b.opt.cursorfixedheight : Math.max(b.opt.cursorminheight, b.cursorwidth);
            b.scrollvaluemax = b.view.h - b.cursorheight - b.cursor.hborder;
            b.railh && (b.railh.width = 0 < b.page.maxh ? b.view.w - b.rail.width : b.view.w, b.scrollvaluemaxw = b.railh.width - b.cursorwidth - b.cursorh.wborder);
            b.checkrtlmode && b.railh && (b.checkrtlmode=!1, b.opt.rtlmode && 0 == b.scroll.x && b.setScrollLeft(b.page.maxw));
            b.ispage || b.updateScrollBar(b.view);
            b.scrollratio = {
                x: b.page.maxw / b.scrollvaluemaxw,
                y: b.page.maxh / b.scrollvaluemax
            };
            b.getScrollTop() > b.page.maxh ? b.doScrollTop(b.page.maxh) : (b.scroll.y = Math.round(b.getScrollTop() * (1 / b.scrollratio.y)), b.scroll.x = Math.round(b.getScrollLeft() * (1 / b.scrollratio.x)), b.cursoractive && b.noticeCursor());
            b.scroll.y && 0 == b.getScrollTop() && b.doScrollTo(Math.floor(b.scroll.y * b.scrollratio.y));
            return b
        };
        this.resize = b.onResize;
        this.lazyResize = function(e) {
            e = isNaN(e) ? 30 : e;
            b.delayed("resize", b.resize, e);
            return b
        };
        this._bind = function(e, t, n, r) {
            b.events.push({
                e: e,
                n: t,
                f: n,
                b: r,
                q: !1
            });
            e.addEventListener ? e.addEventListener(t, n, r ||!1) : e.attachEvent ? e.attachEvent("on" + t, n) : e["on" + t] = n
        };
        this.jqbind = function(t, n, r) {
            b.events.push({
                e: t,
                n: n,
                f: r,
                q: !0
            });
            e(t).bind(n, r)
        };
        this.bind = function(e, t, n, r) {
            var i = "jquery"in e ? e[0]: e;
            "mousewheel" == t ? "onwheel"in b.win ? b._bind(i, "wheel", n, r ||!1) : (e = "undefined" != typeof document.onmousewheel ? "mousewheel" : "DOMMouseScroll", g(i, e, n, r ||!1), "DOMMouseScroll" == e && g(i, "MozMousePixelScroll", n, r ||!1)) : i.addEventListener ? (S.cantouch && /mouseup|mousedown|mousemove/.test(t) && b._bind(i, "mousedown" == t ? "touchstart" : "mouseup" == t ? "touchend" : "touchmove", function(e) {
                if (e.touches) {
                    if (2 > e.touches.length) {
                        var t = e.touches.length ? e.touches[0]: e;
                        t.original = e;
                        n.call(this, t)
                    }
                } else
                    e.changedTouches && (t = e.changedTouches[0], t.original = e, n.call(this, t))
            }, r ||!1), b._bind(i, t, n, r ||!1), S.cantouch && "mouseup" == t && b._bind(i, "touchcancel", n, r ||!1)) : b._bind(i, t, function(e) {
                if ((e = e || window.event ||!1) && e.srcElement)
                    e.target = e.srcElement;
                "pageY"in e || (e.pageX = e.clientX + document.documentElement.scrollLeft, e.pageY = e.clientY + document.documentElement.scrollTop);
                return !1 === n.call(i, e) ||!1 === r ? b.cancelEvent(e) : !0
            })
        };
        this._unbind = function(e, t, n, r) {
            e.removeEventListener ? e.removeEventListener(t, n, r) : e.detachEvent ? e.detachEvent("on" + t, n) : e["on" + t]=!1
        };
        this.unbindAll = function() {
            for (var e = 0; e < b.events.length; e++) {
                var t = b.events[e];
                t.q ? t.e.unbind(t.n, t.f) : b._unbind(t.e, t.n, t.f, t.b)
            }
        };
        this.cancelEvent = function(e) {
            e = e.original ? e.original : e ? e : window.event ||!1;
            if (!e)
                return !1;
            e.preventDefault && e.preventDefault();
            e.stopPropagation && e.stopPropagation();
            e.preventManipulation && e.preventManipulation();
            e.cancelBubble=!0;
            e.cancel=!0;
            return e.returnValue=!1
        };
        this.stopPropagation = function(e) {
            e = e.original ? e.original : e ? e : window.event ||!1;
            if (!e)
                return !1;
            if (e.stopPropagation)
                return e.stopPropagation();
            e.cancelBubble && (e.cancelBubble=!0);
            return !1
        };
        this.showRail = function() {
            if (0 != b.page.maxh && (b.ispage || "none" != b.win.css("display")))
                b.visibility=!0, b.rail.visibility=!0, b.rail.css("display", "block");
            return b
        };
        this.showRailHr = function() {
            if (!b.railh)
                return b;
            if (0 != b.page.maxw && (b.ispage || "none" != b.win.css("display")))
                b.railh.visibility=!0, b.railh.css("display", "block");
            return b
        };
        this.hideRail = function() {
            b.visibility=!1;
            b.rail.visibility=!1;
            b.rail.css("display", "none");
            return b
        };
        this.hideRailHr = function() {
            if (!b.railh)
                return b;
            b.railh.visibility=!1;
            b.railh.css("display", "none");
            return b
        };
        this.show = function() {
            b.hidden=!1;
            b.locked=!1;
            return b.showRail().showRailHr()
        };
        this.hide = function() {
            b.hidden=!0;
            b.locked=!0;
            return b.hideRail().hideRailHr()
        };
        this.toggle = function() {
            return b.hidden ? b.show() : b.hide()
        };
        this.remove = function() {
            b.stop();
            b.cursortimeout && clearTimeout(b.cursortimeout);
            b.doZoomOut();
            b.unbindAll();
            !1 !== b.observer && b.observer.disconnect();
            !1 !== b.observerremover && b.observerremover.disconnect();
            b.events = [];
            b.cursor && (b.cursor.remove(), b.cursor = null);
            b.cursorh && (b.cursorh.remove(), b.cursorh = null);
            b.rail && (b.rail.remove(), b.rail = null);
            b.railh && (b.railh.remove(), b.railh = null);
            b.zoom && (b.zoom.remove(), b.zoom = null);
            for (var e = 0; e < b.saved.css.length; e++) {
                var t = b.saved.css[e];
                t[0].css(t[1], "undefined" == typeof t[2] ? "" : t[2])
            }
            b.saved=!1;
            b.me.data("__nicescroll", "");
            b.me = null;
            b.doc = null;
            b.docscroll = null;
            b.win = null;
            return b
        };
        this.scrollstart = function(e) {
            this.onscrollstart = e;
            return b
        };
        this.scrollend = function(e) {
            this.onscrollend = e;
            return b
        };
        this.scrollcancel = function(e) {
            this.onscrollcancel = e;
            return b
        };
        this.zoomin = function(e) {
            this.onzoomin = e;
            return b
        };
        this.zoomout = function(e) {
            this.onzoomout = e;
            return b
        };
        this.isScrollable = function(t) {
            t = t.target ? t.target : t;
            if ("OPTION" == t.nodeName)
                return !0;
            for (; t && 1 == t.nodeType&&!/BODY|HTML/.test(t.nodeName);) {
                var n = e(t), n = n.css("overflowY") || n.css("overflowX") || n.css("overflow") || "";
                if (/scroll|auto/.test(n))
                    return t.clientHeight != t.scrollHeight;
                t = t.parentNode ? t.parentNode : !1
            }
            return !1
        };
        this.getViewport = function(t) {
            for (t = t && t.parentNode ? t.parentNode : !1; t && 1 == t.nodeType&&!/BODY|HTML/.test(t.nodeName);) {
                var n = e(t), r = n.css("overflowY") || n.css("overflowX") || n.css("overflow") || "";
                if (/scroll|auto/.test(r) && t.clientHeight != t.scrollHeight || 0 < n.getNiceScroll().length)
                    return n;
                t = t.parentNode ? t.parentNode : !1
            }
            return !1
        };
        this.onmousewheel = function(e) {
            if (b.locked)
                return !0;
            if (b.rail.drag)
                return b.cancelEvent(e);
            if (!b.rail.scrollable)
                return b.railh && b.railh.scrollable ? b.onmousewheelhr(e) : !0;
            var t =+ (new Date), n=!1;
            b.opt.preservenativescrolling && b.checkarea + 600 < t && (b.nativescrollingarea = b.isScrollable(e), n=!0);
            b.checkarea = t;
            if (b.nativescrollingarea)
                return !0;
            if (e = y(e, !1, n))
                b.checkarea = 0;
            return e
        };
        this.onmousewheelhr = function(e) {
            if (b.locked ||!b.railh.scrollable)
                return !0;
            if (b.rail.drag)
                return b.cancelEvent(e);
            var t =+ (new Date), n=!1;
            b.opt.preservenativescrolling && b.checkarea + 600 < t && (b.nativescrollingarea = b.isScrollable(e), n=!0);
            b.checkarea = t;
            return b.nativescrollingarea?!0 : b.locked ? b.cancelEvent(e) : y(e, !0, n)
        };
        this.stop = function() {
            b.cancelScroll();
            b.scrollmon && b.scrollmon.stop();
            b.cursorfreezed=!1;
            b.scroll.y = Math.round(b.getScrollTop() * (1 / b.scrollratio.y));
            b.noticeCursor();
            return b
        };
        this.getTransitionSpeed = function(e) {
            var t = Math.round(10 * b.opt.scrollspeed);
            e = Math.min(t, Math.round(e / 20 * b.opt.scrollspeed));
            return 20 < e ? e : 0
        };
        b.opt.smoothscroll ? b.ishwscroll && S.hastransition && b.opt.usetransition ? (this.prepareTransition = function(e, t) {
            var n = t ? 20 < e ? e: 0: b.getTransitionSpeed(e), r = n ? S.prefixstyle + "transform " + n + "ms ease-out": "";
            if (!b.lasttransitionstyle || b.lasttransitionstyle != r)
                b.lasttransitionstyle = r, b.doc.css(S.transitionstyle, r);
            return n
        }, this.doScrollLeft = function(e, t) {
            var n = b.scrollrunning ? b.newscrolly: b.getScrollTop();
            b.doScrollPos(e, n, t)
        }, this.doScrollTop = function(e, t) {
            var n = b.scrollrunning ? b.newscrollx: b.getScrollLeft();
            b.doScrollPos(n, e, t)
        }, this.doScrollPos = function(e, t, n) {
            var r = b.getScrollTop(), i = b.getScrollLeft();
            (0 > (b.newscrolly - r) * (t - r) || 0 > (b.newscrollx - i) * (e - i)) && b.cancelScroll();
            !1 == b.opt.bouncescroll && (0 > t ? t = 0 : t > b.page.maxh && (t = b.page.maxh), 0 > e ? e = 0 : e > b.page.maxw && (e = b.page.maxw));
            if (b.scrollrunning && e == b.newscrollx && t == b.newscrolly)
                return !1;
            b.newscrolly = t;
            b.newscrollx = e;
            b.newscrollspeed = n ||!1;
            if (b.timer)
                return !1;
            b.timer = setTimeout(function() {
                var n = b.getScrollTop(), r = b.getScrollLeft(), i, s;
                i = e - r;
                s = t - n;
                i = Math.round(Math.sqrt(Math.pow(i, 2) + Math.pow(s, 2)));
                i = b.newscrollspeed && 1 < b.newscrollspeed ? b.newscrollspeed : b.getTransitionSpeed(i);
                b.newscrollspeed && 1 >= b.newscrollspeed && (i*=b.newscrollspeed);
                b.prepareTransition(i, !0);
                b.timerscroll && b.timerscroll.tm && clearInterval(b.timerscroll.tm);
                0 < i && (!b.scrollrunning && b.onscrollstart && b.onscrollstart.call(b, {
                    type: "scrollstart",
                    current: {
                        x: r,
                        y: n
                    },
                    request: {
                        x: e,
                        y: t
                    },
                    end: {
                        x: b.newscrollx,
                        y: b.newscrolly
                    },
                    speed: i
                }), S.transitionend ? b.scrollendtrapped || (b.scrollendtrapped=!0, b.bind(b.doc, S.transitionend, b.onScrollEnd, !1)) : (b.scrollendtrapped && clearTimeout(b.scrollendtrapped), b.scrollendtrapped = setTimeout(b.onScrollEnd, i)), b.timerscroll = {
                    bz: new BezierClass(n, b.newscrolly, i, 0, 0, .58, 1),
                    bh: new BezierClass(r, b.newscrollx, i, 0, 0, .58, 1)
                }, b.cursorfreezed || (b.timerscroll.tm = setInterval(function() {
                    b.showCursor(b.getScrollTop(), b.getScrollLeft())
                }, 60)));
                b.synched("doScroll-set", function() {
                    b.timer = 0;
                    b.scrollendtrapped && (b.scrollrunning=!0);
                    b.setScrollTop(b.newscrolly);
                    b.setScrollLeft(b.newscrollx);
                    if (!b.scrollendtrapped)
                        b.onScrollEnd()
                })
            }, 50)
        }, this.cancelScroll = function() {
            if (!b.scrollendtrapped)
                return !0;
            var e = b.getScrollTop(), t = b.getScrollLeft();
            b.scrollrunning=!1;
            S.transitionend || clearTimeout(S.transitionend);
            b.scrollendtrapped=!1;
            b._unbind(b.doc, S.transitionend, b.onScrollEnd);
            b.prepareTransition(0);
            b.setScrollTop(e);
            b.railh && b.setScrollLeft(t);
            b.timerscroll && b.timerscroll.tm && clearInterval(b.timerscroll.tm);
            b.timerscroll=!1;
            b.cursorfreezed=!1;
            b.showCursor(e, t);
            return b
        }, this.onScrollEnd = function() {
            b.scrollendtrapped && b._unbind(b.doc, S.transitionend, b.onScrollEnd);
            b.scrollendtrapped=!1;
            b.prepareTransition(0);
            b.timerscroll && b.timerscroll.tm && clearInterval(b.timerscroll.tm);
            b.timerscroll=!1;
            var e = b.getScrollTop(), t = b.getScrollLeft();
            b.setScrollTop(e);
            b.railh && b.setScrollLeft(t);
            b.noticeCursor(!1, e, t);
            b.cursorfreezed=!1;
            0 > e ? e = 0 : e > b.page.maxh && (e = b.page.maxh);
            0 > t ? t = 0 : t > b.page.maxw && (t = b.page.maxw);
            if (e != b.newscrolly || t != b.newscrollx)
                return b.doScrollPos(t, e, b.opt.snapbackspeed);
            b.onscrollend && b.scrollrunning && b.onscrollend.call(b, {
                type: "scrollend",
                current: {
                    x: t,
                    y: e
                },
                end: {
                    x: b.newscrollx,
                    y: b.newscrolly
                }
            });
            b.scrollrunning=!1
        }) : (this.doScrollLeft = function(e, t) {
            var n = b.scrollrunning ? b.newscrolly: b.getScrollTop();
            b.doScrollPos(e, n, t)
        }, this.doScrollTop = function(e, t) {
            var n = b.scrollrunning ? b.newscrollx: b.getScrollLeft();
            b.doScrollPos(n, e, t)
        }, this.doScrollPos = function(e, t, n) {
            function r() {
                if (b.cancelAnimationFrame)
                    return !0;
                b.scrollrunning=!0;
                if (c = 1 - c)
                    return b.timer = u(r) || 1;
                var e = 0, t = sy = b.getScrollTop();
                if (b.dst.ay) {
                    var t = b.bzscroll ? b.dst.py + b.bzscroll.getNow() * b.dst.ay: b.newscrolly, n = t - sy;
                    if (0 > n && t < b.newscrolly || 0 < n && t > b.newscrolly)
                        t = b.newscrolly;
                    b.setScrollTop(t);
                    t == b.newscrolly && (e = 1)
                } else
                    e = 1;
                var i = sx = b.getScrollLeft();
                if (b.dst.ax) {
                    i = b.bzscroll ? b.dst.px + b.bzscroll.getNow() * b.dst.ax : b.newscrollx;
                    n = i - sx;
                    if (0 > n && i < b.newscrollx || 0 < n && i > b.newscrollx)
                        i = b.newscrollx;
                    b.setScrollLeft(i);
                    i == b.newscrollx && (e += 1)
                } else
                    e += 1;
                2 == e ? (b.timer = 0, b.cursorfreezed=!1, b.bzscroll=!1, b.scrollrunning=!1, 0 > t ? t = 0 : t > b.page.maxh && (t = b.page.maxh), 0 > i ? i = 0 : i > b.page.maxw && (i = b.page.maxw), i != b.newscrollx || t != b.newscrolly ? b.doScrollPos(i, t) : b.onscrollend && b.onscrollend.call(b, {
                    type: "scrollend",
                    current: {
                        x: sx,
                        y: sy
                    },
                    end: {
                        x: b.newscrollx,
                        y: b.newscrolly
                    }
                })) : b.timer = u(r) || 1
            }
            t = "undefined" == typeof t ||!1 === t ? b.getScrollTop(!0) : t;
            if (b.timer && b.newscrolly == t && b.newscrollx == e)
                return !0;
            b.timer && f(b.timer);
            b.timer = 0;
            var i = b.getScrollTop(), s = b.getScrollLeft();
            (0 > (b.newscrolly - i) * (t - i) || 0 > (b.newscrollx - s) * (e - s)) && b.cancelScroll();
            b.newscrolly = t;
            b.newscrollx = e;
            if (!b.bouncescroll ||!b.rail.visibility)
                0 > b.newscrolly ? b.newscrolly = 0 : b.newscrolly > b.page.maxh && (b.newscrolly = b.page.maxh);
            if (!b.bouncescroll ||!b.railh.visibility)
                0 > b.newscrollx ? b.newscrollx = 0 : b.newscrollx > b.page.maxw && (b.newscrollx = b.page.maxw);
            b.dst = {};
            b.dst.x = e - s;
            b.dst.y = t - i;
            b.dst.px = s;
            b.dst.py = i;
            var o = Math.round(Math.sqrt(Math.pow(b.dst.x, 2) + Math.pow(b.dst.y, 2)));
            b.dst.ax = b.dst.x / o;
            b.dst.ay = b.dst.y / o;
            var a = 0, l = o;
            0 == b.dst.x ? (a = i, l = t, b.dst.ay = 1, b.dst.py = 0) : 0 == b.dst.y && (a = s, l = e, b.dst.ax = 1, b.dst.px = 0);
            o = b.getTransitionSpeed(o);
            n && 1 >= n && (o*=n);
            b.bzscroll = 0 < o ? b.bzscroll ? b.bzscroll.update(l, o) : new BezierClass(a, l, o, 0, 1, 0, 1) : !1;
            if (!b.timer) {
                (i == b.page.maxh && t >= b.page.maxh || s == b.page.maxw && e >= b.page.maxw) && b.checkContentSize();
                var c = 1;
                b.cancelAnimationFrame=!1;
                b.timer = 1;
                b.onscrollstart&&!b.scrollrunning && b.onscrollstart.call(b, {
                    type: "scrollstart",
                    current: {
                        x: s,
                        y: i
                    },
                    request: {
                        x: e,
                        y: t
                    },
                    end: {
                        x: b.newscrollx,
                        y: b.newscrolly
                    },
                    speed: o
                });
                r();
                (i == b.page.maxh && t >= i || s == b.page.maxw && e >= s) && b.checkContentSize();
                b.noticeCursor()
            }
        }, this.cancelScroll = function() {
            b.timer && f(b.timer);
            b.timer = 0;
            b.bzscroll=!1;
            b.scrollrunning=!1;
            return b
        }) : (this.doScrollLeft = function(e, t) {
            var n = b.getScrollTop();
            b.doScrollPos(e, n, t)
        }, this.doScrollTop = function(e, t) {
            var n = b.getScrollLeft();
            b.doScrollPos(n, e, t)
        }, this.doScrollPos = function(e, t, n) {
            var r = e > b.page.maxw ? b.page.maxw: e;
            0 > r && (r = 0);
            var i = t > b.page.maxh ? b.page.maxh: t;
            0 > i && (i = 0);
            b.synched("scroll", function() {
                b.setScrollTop(i);
                b.setScrollLeft(r)
            })
        }, this.cancelScroll = function() {});
        this.doScrollBy = function(e, t) {
            var n = 0, n = t ? Math.floor((b.scroll.y - e) * b.scrollratio.y): (b.timer ? b.newscrolly : b.getScrollTop(!0)) - e;
            if (b.bouncescroll) {
                var r = Math.round(b.view.h / 2);
                n<-r ? n =- r : n > b.page.maxh + r && (n = b.page.maxh + r)
            }
            b.cursorfreezed=!1;
            py = b.getScrollTop(!0);
            if (0 > n && 0 >= py)
                return b.noticeCursor();
            if (n > b.page.maxh && py >= b.page.maxh)
                return b.checkContentSize(), b.noticeCursor();
            b.doScrollTop(n)
        };
        this.doScrollLeftBy = function(e, t) {
            var n = 0, n = t ? Math.floor((b.scroll.x - e) * b.scrollratio.x): (b.timer ? b.newscrollx : b.getScrollLeft(!0)) - e;
            if (b.bouncescroll) {
                var r = Math.round(b.view.w / 2);
                n<-r ? n =- r : n > b.page.maxw + r && (n = b.page.maxw + r)
            }
            b.cursorfreezed=!1;
            px = b.getScrollLeft(!0);
            if (0 > n && 0 >= px || n > b.page.maxw && px >= b.page.maxw)
                return b.noticeCursor();
            b.doScrollLeft(n)
        };
        this.doScrollTo = function(e, t) {
            t && Math.round(e * b.scrollratio.y);
            b.cursorfreezed=!1;
            b.doScrollTop(e)
        };
        this.checkContentSize = function() {
            var e = b.getContentSize();
            (e.h != b.page.h || e.w != b.page.w) && b.resize(!1, e)
        };
        b.onscroll = function(e) {
            b.rail.drag || b.cursorfreezed || b.synched("scroll", function() {
                b.scroll.y = Math.round(b.getScrollTop() * (1 / b.scrollratio.y));
                b.railh && (b.scroll.x = Math.round(b.getScrollLeft() * (1 / b.scrollratio.x)));
                b.noticeCursor()
            })
        };
        b.bind(b.docscroll, "scroll", b.onscroll);
        this.doZoomIn = function(t) {
            if (!b.zoomactive) {
                b.zoomactive=!0;
                b.zoomrestore = {
                    style: {}
                };
                var n = "position top left zIndex backgroundColor marginTop marginBottom marginLeft marginRight".split(" "), r = b.win[0].style, i;
                for (i in n) {
                    var o = n[i];
                    b.zoomrestore.style[o] = "undefined" != typeof r[o] ? r[o] : ""
                }
                b.zoomrestore.style.width = b.win.css("width");
                b.zoomrestore.style.height = b.win.css("height");
                b.zoomrestore.padding = {
                    w: b.win.outerWidth() - b.win.width(),
                    h: b.win.outerHeight() - b.win.height()
                };
                S.isios4 && (b.zoomrestore.scrollTop = e(window).scrollTop(), e(window).scrollTop(0));
                b.win.css({
                    position: S.isios4 ? "absolute": "fixed",
                    top: 0,
                    left: 0,
                    "z-index": s + 100,
                    margin: "0px"
                });
                n = b.win.css("backgroundColor");
                ("" == n || /transparent|rgba\(0, 0, 0, 0\)|rgba\(0,0,0,0\)/.test(n)) && b.win.css("backgroundColor", "#fff");
                b.rail.css({
                    "z-index": s + 101
                });
                b.zoom.css({
                    "z-index": s + 102
                });
                b.zoom.css("backgroundPosition", "0px -18px");
                b.resizeZoom();
                b.onzoomin && b.onzoomin.call(b);
                return b.cancelEvent(t)
            }
        };
        this.doZoomOut = function(t) {
            if (b.zoomactive)
                return b.zoomactive=!1, b.win.css("margin", ""), b.win.css(b.zoomrestore.style), S.isios4 && e(window).scrollTop(b.zoomrestore.scrollTop), b.rail.css({
                    "z-index": b.zindex
                }), b.zoom.css({
                    "z-index": b.zindex
                }), b.zoomrestore=!1, b.zoom.css("backgroundPosition", "0px 0px"), b.onResize(), b.onzoomout && b.onzoomout.call(b), b.cancelEvent(t)
        };
        this.doZoom = function(e) {
            return b.zoomactive ? b.doZoomOut(e) : b.doZoomIn(e)
        };
        this.resizeZoom = function() {
            if (b.zoomactive) {
                var t = b.getScrollTop();
                b.win.css({
                    width: e(window).width() - b.zoomrestore.padding.w + "px",
                    height: e(window).height() - b.zoomrestore.padding.h + "px"
                });
                b.onResize();
                b.setScrollTop(Math.min(b.page.maxh, t))
            }
        };
        this.init();
        e.nicescroll.push(this)
    }, v = function(e) {
        var t = this;
        this.nc = e;
        this.steptime = this.lasttime = this.speedy = this.speedx = this.lasty = this.lastx = 0;
        this.snapy = this.snapx=!1;
        this.demuly = this.demulx = 0;
        this.lastscrolly = this.lastscrollx =- 1;
        this.timer = this.chky = this.chkx = 0;
        this.time = function() {
            return + (new Date)
        };
        this.reset = function(e, n) {
            t.stop();
            var r = t.time();
            t.steptime = 0;
            t.lasttime = r;
            t.speedx = 0;
            t.speedy = 0;
            t.lastx = e;
            t.lasty = n;
            t.lastscrollx =- 1;
            t.lastscrolly =- 1
        };
        this.update = function(e, n) {
            var r = t.time();
            t.steptime = r - t.lasttime;
            t.lasttime = r;
            var r = n - t.lasty, i = e - t.lastx, s = t.nc.getScrollTop(), o = t.nc.getScrollLeft(), s = s + r, o = o + i;
            t.snapx = 0 > o || o > t.nc.page.maxw;
            t.snapy = 0 > s || s > t.nc.page.maxh;
            t.speedx = i;
            t.speedy = r;
            t.lastx = e;
            t.lasty = n
        };
        this.stop = function() {
            t.nc.unsynched("domomentum2d");
            t.timer && clearTimeout(t.timer);
            t.timer = 0;
            t.lastscrollx =- 1;
            t.lastscrolly =- 1
        };
        this.doSnapy = function(e, n) {
            var r=!1;
            0 > n ? (n = 0, r=!0) : n > t.nc.page.maxh && (n = t.nc.page.maxh, r=!0);
            0 > e ? (e = 0, r=!0) : e > t.nc.page.maxw && (e = t.nc.page.maxw, r=!0);
            r && t.nc.doScrollPos(e, n, t.nc.opt.snapbackspeed)
        };
        this.doMomentum = function(e) {
            var n = t.time(), r = e ? n + e: t.lasttime;
            e = t.nc.getScrollLeft();
            var i = t.nc.getScrollTop(), s = t.nc.page.maxh, o = t.nc.page.maxw;
            t.speedx = 0 < o ? Math.min(60, t.speedx) : 0;
            t.speedy = 0 < s ? Math.min(60, t.speedy) : 0;
            r = r && 50 >= n - r;
            if (0 > i || i > s || 0 > e || e > o)
                r=!1;
            e = t.speedx && r ? t.speedx : !1;
            if (t.speedy && r && t.speedy || e) {
                var u = Math.max(16, t.steptime);
                50 < u && (e = u / 50, t.speedx*=e, t.speedy*=e, u = 50);
                t.demulxy = 0;
                t.lastscrollx = t.nc.getScrollLeft();
                t.chkx = t.lastscrollx;
                t.lastscrolly = t.nc.getScrollTop();
                t.chky = t.lastscrolly;
                var a = t.lastscrollx, f = t.lastscrolly, l = function() {
                    var e = 600 < t.time() - n ? .04: .02;
                    if (t.speedx && (a = Math.floor(t.lastscrollx - t.speedx * (1 - t.demulxy)), t.lastscrollx = a, 0 > a || a > o))
                        e = .1;
                    if (t.speedy && (f = Math.floor(t.lastscrolly - t.speedy * (1 - t.demulxy)), t.lastscrolly = f, 0 > f || f > s))
                        e = .1;
                    t.demulxy = Math.min(1, t.demulxy + e);
                    t.nc.synched("domomentum2d", function() {
                        t.speedx && (t.nc.getScrollLeft() != t.chkx && t.stop(), t.chkx = a, t.nc.setScrollLeft(a));
                        t.speedy && (t.nc.getScrollTop() != t.chky && t.stop(), t.chky = f, t.nc.setScrollTop(f));
                        t.timer || (t.nc.hideCursor(), t.doSnapy(a, f))
                    });
                    1 > t.demulxy ? t.timer = setTimeout(l, u) : (t.stop(), t.nc.hideCursor(), t.doSnapy(a, f))
                };
                l()
            } else
                t.doSnapy(t.nc.getScrollLeft(), t.nc.getScrollTop())
        }
    }, m = e.fn.scrollTop;
    e.cssHooks.pageYOffset = {
        get: function(t, n, r) {
            return (n = e.data(t, "__nicescroll") ||!1) && n.ishwscroll ? n.getScrollTop() : m.call(t)
        },
        set: function(t, n) {
            var r = e.data(t, "__nicescroll") ||!1;
            r && r.ishwscroll ? r.setScrollTop(parseInt(n)) : m.call(t, n);
            return this
        }
    };
    e.fn.scrollTop = function(t) {
        if ("undefined" == typeof t) {
            var n = this[0] ? e.data(this[0], "__nicescroll") ||!1: !1;
            return n && n.ishwscroll ? n.getScrollTop() : m.call(this)
        }
        return this.each(function() {
            var n = e.data(this, "__nicescroll") ||!1;
            n && n.ishwscroll ? n.setScrollTop(parseInt(t)) : m.call(e(this), t)
        })
    };
    var g = e.fn.scrollLeft;
    e.cssHooks.pageXOffset = {
        get: function(t, n, r) {
            return (n = e.data(t, "__nicescroll") ||!1) && n.ishwscroll ? n.getScrollLeft() : g.call(t)
        },
        set: function(t, n) {
            var r = e.data(t, "__nicescroll") ||!1;
            r && r.ishwscroll ? r.setScrollLeft(parseInt(n)) : g.call(t, n);
            return this
        }
    };
    e.fn.scrollLeft = function(t) {
        if ("undefined" == typeof t) {
            var n = this[0] ? e.data(this[0], "__nicescroll") ||!1: !1;
            return n && n.ishwscroll ? n.getScrollLeft() : g.call(this)
        }
        return this.each(function() {
            var n = e.data(this, "__nicescroll") ||!1;
            n && n.ishwscroll ? n.setScrollLeft(parseInt(t)) : g.call(e(this), t)
        })
    };
    var y = function(t) {
        var n = this;
        this.length = 0;
        this.name = "nicescrollarray";
        this.each = function(e) {
            for (var t = 0; t < n.length; t++)
                e.call(n[t]);
            return n
        };
        this.push = function(e) {
            n[n.length] = e;
            n.length++
        };
        this.eq = function(e) {
            return n[e]
        };
        if (t)
            for (a = 0; a < t.length; a++) {
                var r = e.data(t[a], "__nicescroll") ||!1;
                r && (this[this.length] = r, this.length++)
            }
        return this
    };
    (function(e, t, n) {
        for (var r = 0; r < t.length; r++)
            n(e, t[r])
    })(y.prototype, "show hide toggle onResize resize remove stop doScrollPos".split(" "), function(e, t) {
        e[t] = function() {
            var e = arguments;
            return this.each(function() {
                this[t].apply(this, e)
            })
        }
    });
    e.fn.getNiceScroll = function(t) {
        return "undefined" == typeof t ? new y(this) : e.data(this[t], "__nicescroll") ||!1
    };
    e.extend(e.expr[":"], {
        nicescroll: function(t) {
            return e.data(t, "__nicescroll")?!0 : !1
        }
    });
    e.fn.niceScroll = function(t, n) {
        "undefined" == typeof n && "object" == typeof t&&!("jquery"in t) && (n = t, t=!1);
        var r = new y;
        "undefined" == typeof n && (n = {});
        t && (n.doc = e(t), n.win = e(this));
        var i=!("doc"in n);
        !i&&!("win"in n) && (n.win = e(this));
        this.each(function() {
            var t = e(this).data("__nicescroll") ||!1;
            t || (n.doc = i ? e(this) : n.doc, t = new d(n, e(this)), e(this).data("__nicescroll", t));
            r.push(t)
        });
        return 1 == r.length ? r[0] : r
    };
    window.NiceScroll = {
        getjQuery: function() {
            return e
        }
    };
    e.nicescroll || (e.nicescroll = new y, e.nicescroll.options = c)
})(jQuery);
(function(e) {
    var t = e(window);
    var n = t.height();
    t.resize(function() {
        n = t.height()
    });
    e.fn.parallax = function(r, i, s, o) {
        function c() {
            var o = t.scrollTop();
            u.each(function() {
                var t = e(this);
                var l = t.offset().top;
                var c = a(t);
                if (l + c < o || l > o + n) {
                    return
                }
                if (typeof s != "undefined") {
                    calc = f - o + s
                } else {
                    calc = f - o
                }
                u.css("backgroundPosition", r + " " + Math.round(calc * i) + "px")
            })
        }
        var u = e(this);
        var a;
        var f;
        var l = 0;
        u.each(function() {
            f = u.offset().top
        });
        if (o) {
            a = function(e) {
                return e.outerHeight(true)
            }
        } else {
            a = function(e) {
                return e.height()
            }
        }
        if (arguments.length < 1 || r === null)
            r = "50%";
        if (arguments.length < 2 || i === null)
            i = .1;
        if (arguments.length < 3 || o === null)
            o = true;
        t.bind("scroll", c).resize(c);
        c()
    }
})(jQuery);
(function(e) {
    "use strict";
    e(["jquery"], function(e) {
        function n(t) {
            return e.isFunction(t) || e.isPlainObject(t) ? t : {
                top: t,
                left: t
            }
        }
        var t = e.scrollTo = function(t, n, r) {
            return e(window).scrollTo(t, n, r)
        };
        t.defaults = {
            axis: "xy",
            duration: 0,
            limit: !0
        };
        t.window = function(t) {
            return e(window)._scrollable()
        };
        e.fn._scrollable = function() {
            return this.map(function() {
                var t = this, n=!t.nodeName || e.inArray(t.nodeName.toLowerCase(), ["iframe", "#document", "html", "body"])!=-1;
                if (!n)
                    return t;
                var r = (t.contentWindow || t).document || t.ownerDocument || t;
                return /webkit/i.test(navigator.userAgent) || r.compatMode == "BackCompat" ? r.body : r.documentElement
            })
        };
        e.fn.scrollTo = function(r, i, s) {
            if (typeof i == "object") {
                s = i;
                i = 0
            }
            if (typeof s == "function")
                s = {
                    onAfter: s
                };
            if (r == "max")
                r = 9e9;
            s = e.extend({}, t.defaults, s);
            i = i || s.duration;
            s.queue = s.queue && s.axis.length > 1;
            if (s.queue)
                i/=2;
            s.offset = n(s.offset);
            s.over = n(s.over);
            return this._scrollable().each(function() {
                function v(e) {
                    u.animate(c, i, s.easing, e && function() {
                            e.call(this, a, s)
                        })
                }
                if (r == null)
                    return;
                var o = this, u = e(o), a = r, l, c = {}, p = u.is("html,body");
                switch (typeof a) {
                    case"number":
                    case"string":
                        if (/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(a)) {
                            a = n(a);
                            break
                        }
                        a = p ? e(a) : e(a, this);
                        if (!a.length)
                            return;
                    case"object":
                        if (a.is || a.style)
                            l = (a = e(a)).offset()
                }
                var d = e.isFunction(s.offset) && s.offset(o, a) || s.offset;
                e.each(s.axis.split(""), function(e, n) {
                    var r = n == "x" ? "Left": "Top", i = r.toLowerCase(), f = "scroll" + r, m = o[f], g = t.max(o, n);
                    if (l) {
                        c[f] = l[i] + (p ? 0 : m - u.offset()[i]);
                        if (s.margin) {
                            c[f] -= parseInt(a.css("margin" + r)) || 0;
                            c[f] -= parseInt(a.css("border" + r + "Width")) || 0
                        }
                        c[f] += d[i] || 0;
                        if (s.over[i])
                            c[f] += a[n == "x" ? "width": "height"]() * s.over[i]
                    } else {
                        var y = a[i];
                        c[f] = y.slice && y.slice( - 1) == "%" ? parseFloat(y) / 100 * g : y
                    }
                    if (s.limit && /^\d+$/.test(c[f]))
                        c[f] = c[f] <= 0 ? 0 : Math.min(c[f], g);
                    if (!e && s.queue) {
                        if (m != c[f])
                            v(s.onAfterFirst);
                        delete c[f]
                    }
                });
                v(s.onAfter)
            }).end()
        };
        t.max = function(t, n) {
            var r = n == "x" ? "Width": "Height", i = "scroll" + r;
            if (!e(t).is("html,body"))
                return t[i] - e(t)[r.toLowerCase()]();
            var s = "client" + r, o = t.ownerDocument.documentElement, u = t.ownerDocument.body;
            return Math.max(o[i], u[i]) - Math.min(o[s], u[s])
        };
        return t
    })
})(typeof define === "function" && define.amd ? define : function(e, t) {
    if (typeof module !== "undefined" && module.exports) {
        module.exports = t(require("jquery"))
    } else {
        t(jQuery)
    }
});
(function(e) {
    "use strict";
    function t(t) {
        return /In/.test(t) || e.inArray(t, e.fn.textillate.defaults.inEffects) >= 0
    }
    function n(t) {
        return /Out/.test(t) || e.inArray(t, e.fn.textillate.defaults.outEffects) >= 0
    }
    function r(e) {
        if (e !== "true" && e !== "false")
            return e;
        return e === "true"
    }
    function i(t) {
        var n = t.attributes || [], i = {};
        if (!n.length)
            return i;
        e.each(n, function(e, t) {
            var n = t.nodeName.replace(/delayscale/, "delayScale");
            if (/^data-in-*/.test(n)) {
                i.in = i.in || {};
                i.in[n.replace(/data-in-/, "")] = r(t.nodeValue)
            } else if (/^data-out-*/.test(n)) {
                i.out = i.out || {};
                i.out[n.replace(/data-out-/, "")] = r(t.nodeValue)
            } else if (/^data-*/.test(n)) {
                i[n.replace(/data-/, "")] = r(t.nodeValue)
            }
        });
        return i
    }
    function s(e) {
        for (var t, n, r = e.length; r; t = parseInt(Math.random() * r), n = e[--r], e[r] = e[t], e[t] = n);
        return e
    }
    function o(e, t, n) {
        e.addClass("animated " + t).css("visibility", "visible").show();
        e.one("animationend webkitAnimationEnd oAnimationEnd", function() {
            e.removeClass("animated " + t);
            n && n()
        })
    }
    function u(r, i, u) {
        var a = this, f = r.length;
        if (!f) {
            u && u();
            return
        }
        if (i.shuffle)
            r = s(r);
        if (i.reverse)
            r = r.toArray().reverse();
        e.each(r, function(r, s) {
            function l() {
                if (t(i.effect)) {
                    a.css("visibility", "visible")
                } else if (n(i.effect)) {
                    a.css("visibility", "hidden")
                }
                f -= 1;
                if (!f && u)
                    u()
            }
            var a = e(s);
            var c = i.sync ? i.delay: i.delay * r * i.delayScale;
            a.text() ? setTimeout(function() {
                o(a, i.effect, l)
            }, c) : l()
        })
    }
    var a = function(r, s) {
        var o = this, a = e(r);
        o.init = function() {
            o.$texts = a.find(s.selector);
            if (!o.$texts.length) {
                o.$texts = e('<ul class="texts"><li>' + a.html() + "</li></ul>");
                a.html(o.$texts)
            }
            o.$texts.hide();
            o.$current = e("<span>").text(o.$texts.find(":first-child").html()).prependTo(a);
            if (t(s.in.effect)) {
                o.$current.css("visibility", "hidden")
            } else if (n(s.out.effect)) {
                o.$current.css("visibility", "visible")
            }
            o.setOptions(s);
            o.timeoutRun = null;
            setTimeout(function() {
                o.options.autoStart && o.start()
            }, o.options.initialDelay)
        };
        o.setOptions = function(e) {
            o.options = e
        };
        o.triggerEvent = function(t) {
            var n = e.Event(t + ".tlt");
            a.trigger(n, o);
            return n
        };
        o.in = function(r, s) {
            r = r || 0;
            var a = o.$texts.find(":nth-child(" + ((r || 0) + 1) + ")"), f = e.extend(true, {}, o.options, a.length ? i(a[0]) : {}), l;
            a.addClass("current");
            o.triggerEvent("inAnimationBegin");
            o.$current.text(a.html()).lettering("words");
            o.$current.find('[class^="word"]').css({
                display: "inline-block",
                "-webkit-transform": "translate3d(0,0,0)",
                "-moz-transform": "translate3d(0,0,0)",
                "-o-transform": "translate3d(0,0,0)",
                transform: "translate3d(0,0,0)"
            }).each(function() {
                e(this).lettering()
            });
            l = o.$current.find('[class^="char"]').css("display", "inline-block");
            if (t(f.in.effect)) {
                l.css("visibility", "hidden")
            } else if (n(f.in.effect)) {
                l.css("visibility", "visible")
            }
            o.currentIndex = r;
            u(l, f.in, function() {
                o.triggerEvent("inAnimationEnd");
                if (f.in.callback)
                    f.in.callback();
                if (s)
                    s(o)
            })
        };
        o.out = function(t) {
            var n = o.$texts.find(":nth-child(" + ((o.currentIndex || 0) + 1) + ")"), r = o.$current.find('[class^="char"]'), s = e.extend(true, {}, o.options, n.length ? i(n[0]) : {});
            o.triggerEvent("outAnimationBegin");
            u(r, s.out, function() {
                n.removeClass("current");
                o.triggerEvent("outAnimationEnd");
                if (s.out.callback)
                    s.out.callback();
                if (t)
                    t(o)
            })
        };
        o.start = function(e) {
            setTimeout(function() {
                o.triggerEvent("start");
                (function t(e) {
                    o.in(e, function() {
                        var n = o.$texts.children().length;
                        e += 1;
                        if (!o.options.loop && e >= n) {
                            if (o.options.callback)
                                o.options.callback();
                            o.triggerEvent("end")
                        } else {
                            e = e%n;
                            o.timeoutRun = setTimeout(function() {
                                o.out(function() {
                                    t(e)
                                })
                            }, o.options.minDisplayTime)
                        }
                    })
                })(e || 0)
            }, o.options.initialDelay)
        };
        o.stop = function() {
            if (o.timeoutRun) {
                clearInterval(o.timeoutRun);
                o.timeoutRun = null
            }
        };
        o.init()
    };
    e.fn.textillate = function(t, n) {
        return this.each(function() {
            var r = e(this), s = r.data("textillate"), o = e.extend(true, {}, e.fn.textillate.defaults, i(this), typeof t == "object" && t);
            if (!s) {
                r.data("textillate", s = new a(this, o))
            } else if (typeof t == "string") {
                s[t].apply(s, [].concat(n))
            } else {
                s.setOptions.call(s, o)
            }
        })
    };
    e.fn.textillate.defaults = {
        selector: ".texts",
        loop: false,
        minDisplayTime: 2e3,
        initialDelay: 0,
        "in": {
            effect: "fadeInLeftBig",
            delayScale: 1.5,
            delay: 50,
            sync: false,
            reverse: false,
            shuffle: false,
            callback: function() {}
        },
        out: {
            effect: "hinge",
            delayScale: 1.5,
            delay: 50,
            sync: false,
            reverse: false,
            shuffle: false,
            callback: function() {}
        },
        autoStart: true,
        inEffects: [],
        outEffects: ["hinge"],
        callback: function() {}
    }
})(jQuery);
(function(e, t, n) {
    function r(t, n) {
        this.bodyOverflowX;
        this.callbacks = {
            hide: [],
            show: []
        };
        this.checkInterval = null;
        this.Content;
        this.$el = e(t);
        this.$elProxy;
        this.elProxyPosition;
        this.enabled = true;
        this.options = e.extend({}, a, n);
        this.mouseIsOverProxy = false;
        this.namespace = "tooltipster-" + Math.round(Math.random() * 1e5);
        this.Status = "hidden";
        this.timerHide = null;
        this.timerShow = null;
        this.$tooltip;
        this.options.iconTheme = this.options.iconTheme.replace(".", "");
        this.options.theme = this.options.theme.replace(".", "");
        this._init()
    }
    function i(t, n) {
        var r = true;
        e.each(t, function(e, i) {
            if (typeof n[e] === "undefined" || t[e] !== n[e]) {
                r = false;
                return false
            }
        });
        return r
    }
    function s() {
        return !l && f
    }
    function o() {
        var e = n.body || n.documentElement, t = e.style, r = "transition";
        if (typeof t[r] == "string") {
            return true
        }
        v = ["Moz", "Webkit", "Khtml", "O", "ms"], r = r.charAt(0).toUpperCase() + r.substr(1);
        for (var i = 0; i < v.length; i++) {
            if (typeof t[v[i] + r] == "string") {
                return true
            }
        }
        return false
    }
    var u = "tooltipster", a = {
        animation: "fade",
        arrow: true,
        arrowColor: "",
        autoClose: true,
        content: null,
        contentAsHTML: false,
        contentCloning: true,
        debug: true,
        delay: 200,
        minWidth: 0,
        maxWidth: null,
        functionInit: function(e, t) {},
        functionBefore: function(e, t) {
            t()
        },
        functionReady: function(e, t) {},
        functionAfter: function(e) {},
        hideOnClick: false,
        icon: "(?)",
        iconCloning: true,
        iconDesktop: false,
        iconTouch: false,
        iconTheme: "tooltipster-icon",
        interactive: false,
        interactiveTolerance: 350,
        multiple: false,
        offsetX: 0,
        offsetY: 0,
        onlyOne: false,
        position: "top",
        positionTracker: false,
        positionTrackerCallback: function(e) {
            if (this.option("trigger") == "hover" && this.option("autoClose")) {
                this.hide()
            }
        },
        restoration: "current",
        speed: 350,
        timer: 0,
        theme: "tooltipster-default",
        touchDevices: true,
        trigger: "hover",
        updateAnimation: true
    };
    r.prototype = {
        _init: function() {
            var t = this;
            if (n.querySelector) {
                var r = null;
                if (t.$el.data("tooltipster-initialTitle") === undefined) {
                    r = t.$el.attr("title");
                    if (r === undefined)
                        r = null;
                    t.$el.data("tooltipster-initialTitle", r)
                }
                if (t.options.content !== null) {
                    t._content_set(t.options.content)
                } else {
                    t._content_set(r)
                }
                var i = t.options.functionInit.call(t.$el, t.$el, t.Content);
                if (typeof i !== "undefined")
                    t._content_set(i);
                t.$el.removeAttr("title").addClass("tooltipstered");
                if (!f && t.options.iconDesktop || f && t.options.iconTouch) {
                    if (typeof t.options.icon === "string") {
                        t.$elProxy = e('<span class="' + t.options.iconTheme + '"></span>');
                        t.$elProxy.text(t.options.icon)
                    } else {
                        if (t.options.iconCloning)
                            t.$elProxy = t.options.icon.clone(true);
                        else
                            t.$elProxy = t.options.icon
                    }
                    t.$elProxy.insertAfter(t.$el)
                } else {
                    t.$elProxy = t.$el
                }
                if (t.options.trigger == "hover") {
                    t.$elProxy.on("mouseenter." + t.namespace, function() {
                        if (!s() || t.options.touchDevices) {
                            t.mouseIsOverProxy = true;
                            t._show()
                        }
                    }).on("mouseleave." + t.namespace, function() {
                        if (!s() || t.options.touchDevices) {
                            t.mouseIsOverProxy = false
                        }
                    });
                    if (f && t.options.touchDevices) {
                        t.$elProxy.on("touchstart." + t.namespace, function() {
                            t._showNow()
                        })
                    }
                } else if (t.options.trigger == "click") {
                    t.$elProxy.on("click." + t.namespace, function() {
                        if (!s() || t.options.touchDevices) {
                            t._show()
                        }
                    })
                }
            }
        },
        _show: function() {
            var e = this;
            if (e.Status != "shown" && e.Status != "appearing") {
                if (e.options.delay) {
                    e.timerShow = setTimeout(function() {
                        if (e.options.trigger == "click" || e.options.trigger == "hover" && e.mouseIsOverProxy) {
                            e._showNow()
                        }
                    }, e.options.delay)
                } else
                    e._showNow()
            }
        },
        _showNow: function(n) {
            var r = this;
            r.options.functionBefore.call(r.$el, r.$el, function() {
                if (r.enabled && r.Content !== null) {
                    if (n)
                        r.callbacks.show.push(n);
                    r.callbacks.hide = [];
                    clearTimeout(r.timerShow);
                    r.timerShow = null;
                    clearTimeout(r.timerHide);
                    r.timerHide = null;
                    if (r.options.onlyOne) {
                        e(".tooltipstered").not(r.$el).each(function(t, n) {
                            var r = e(n), i = r.data("tooltipster-ns");
                            e.each(i, function(e, t) {
                                var n = r.data(t), i = n.status(), s = n.option("autoClose");
                                if (i !== "hidden" && i !== "disappearing" && s) {
                                    n.hide()
                                }
                            })
                        })
                    }
                    var i = function() {
                        r.Status = "shown";
                        e.each(r.callbacks.show, function(e, t) {
                            t.call(r.$el)
                        });
                        r.callbacks.show = []
                    };
                    if (r.Status !== "hidden") {
                        var s = 0;
                        if (r.Status === "disappearing") {
                            r.Status = "appearing";
                            if (o()) {
                                r.$tooltip.clearQueue().removeClass("tooltipster-dying").addClass("tooltipster-" + r.options.animation + "-show");
                                if (r.options.speed > 0)
                                    r.$tooltip.delay(r.options.speed);
                                r.$tooltip.queue(i)
                            } else {
                                r.$tooltip.stop().fadeIn(i)
                            }
                        } else if (r.Status === "shown") {
                            i()
                        }
                    } else {
                        r.Status = "appearing";
                        var s = r.options.speed;
                        r.bodyOverflowX = e("body").css("overflow-x");
                        e("body").css("overflow-x", "hidden");
                        var u = "tooltipster-" + r.options.animation, a = "-webkit-transition-duration: " + r.options.speed + "ms; -webkit-animation-duration: " + r.options.speed + "ms; -moz-transition-duration: " + r.options.speed + "ms; -moz-animation-duration: " + r.options.speed + "ms; -o-transition-duration: " + r.options.speed + "ms; -o-animation-duration: " + r.options.speed + "ms; -ms-transition-duration: " + r.options.speed + "ms; -ms-animation-duration: " + r.options.speed + "ms; transition-duration: " + r.options.speed + "ms; animation-duration: " + r.options.speed + "ms;", l = r.options.minWidth ? "min-width:" + Math.round(r.options.minWidth) + "px;": "", c = r.options.maxWidth ? "max-width:" + Math.round(r.options.maxWidth) + "px;": "", h = r.options.interactive ? "pointer-events: auto;": "";
                        r.$tooltip = e('<div class="tooltipster-base ' + r.options.theme + '" style="' + l + " " + c + " " + h + " " + a + '"><div class="tooltipster-content"></div></div>');
                        if (o())
                            r.$tooltip.addClass(u);
                        r._content_insert();
                        r.$tooltip.appendTo("body");
                        r.reposition();
                        r.options.functionReady.call(r.$el, r.$el, r.$tooltip);
                        if (o()) {
                            r.$tooltip.addClass(u + "-show");
                            if (r.options.speed > 0)
                                r.$tooltip.delay(r.options.speed);
                            r.$tooltip.queue(i)
                        } else {
                            r.$tooltip.css("display", "none").fadeIn(r.options.speed, i)
                        }
                        r._interval_set();
                        e(t).on("scroll." + r.namespace + " resize." + r.namespace, function() {
                            r.reposition()
                        });
                        if (r.options.autoClose) {
                            e("body").off("." + r.namespace);
                            if (r.options.trigger == "hover") {
                                if (f) {
                                    setTimeout(function() {
                                        e("body").on("touchstart." + r.namespace, function() {
                                            r.hide()
                                        })
                                    }, 0)
                                }
                                if (r.options.interactive) {
                                    if (f) {
                                        r.$tooltip.on("touchstart." + r.namespace, function(e) {
                                            e.stopPropagation()
                                        })
                                    }
                                    var p = null;
                                    r.$elProxy.add(r.$tooltip).on("mouseleave." + r.namespace + "-autoClose", function() {
                                        clearTimeout(p);
                                        p = setTimeout(function() {
                                            r.hide()
                                        }, r.options.interactiveTolerance)
                                    }).on("mouseenter." + r.namespace + "-autoClose", function() {
                                        clearTimeout(p)
                                    })
                                } else {
                                    r.$elProxy.on("mouseleave." + r.namespace + "-autoClose", function() {
                                        r.hide()
                                    })
                                }
                                if (r.options.hideOnClick) {
                                    r.$elProxy.on("click." + r.namespace + "-autoClose", function() {
                                        r.hide()
                                    })
                                }
                            } else if (r.options.trigger == "click") {
                                setTimeout(function() {
                                    e("body").on("click." + r.namespace + " touchstart." + r.namespace, function() {
                                        r.hide()
                                    })
                                }, 0);
                                if (r.options.interactive) {
                                    r.$tooltip.on("click." + r.namespace + " touchstart." + r.namespace, function(e) {
                                        e.stopPropagation()
                                    })
                                }
                            }
                        }
                    }
                    if (r.options.timer > 0) {
                        r.timerHide = setTimeout(function() {
                            r.timerHide = null;
                            r.hide()
                        }, r.options.timer + s)
                    }
                }
            })
        },
        _interval_set: function() {
            var t = this;
            t.checkInterval = setInterval(function() {
                if (e("body").find(t.$el).length === 0 || e("body").find(t.$elProxy).length === 0 || t.Status == "hidden" || e("body").find(t.$tooltip).length === 0) {
                    if (t.Status == "shown" || t.Status == "appearing")
                        t.hide();
                    t._interval_cancel()
                } else {
                    if (t.options.positionTracker) {
                        var n = t._repositionInfo(t.$elProxy), r = false;
                        if (i(n.dimension, t.elProxyPosition.dimension)) {
                            if (t.$elProxy.css("position") === "fixed") {
                                if (i(n.position, t.elProxyPosition.position))
                                    r = true
                            } else {
                                if (i(n.offset, t.elProxyPosition.offset))
                                    r = true
                            }
                        }
                        if (!r) {
                            t.reposition();
                            t.options.positionTrackerCallback.call(t, t.$el)
                        }
                    }
                }
            }, 200)
        },
        _interval_cancel: function() {
            clearInterval(this.checkInterval);
            this.checkInterval = null
        },
        _content_set: function(e) {
            if (typeof e === "object" && e !== null && this.options.contentCloning) {
                e = e.clone(true)
            }
            this.Content = e
        },
        _content_insert: function() {
            var e = this, t = this.$tooltip.find(".tooltipster-content");
            if (typeof e.Content === "string"&&!e.options.contentAsHTML) {
                t.text(e.Content)
            } else {
                t.empty().append(e.Content)
            }
        },
        _update: function(e) {
            var t = this;
            t._content_set(e);
            if (t.Content !== null) {
                if (t.Status !== "hidden") {
                    t._content_insert();
                    t.reposition();
                    if (t.options.updateAnimation) {
                        if (o()) {
                            t.$tooltip.css({
                                width: "",
                                "-webkit-transition": "all " + t.options.speed + "ms, width 0ms, height 0ms, left 0ms, top 0ms",
                                "-moz-transition": "all " + t.options.speed + "ms, width 0ms, height 0ms, left 0ms, top 0ms",
                                "-o-transition": "all " + t.options.speed + "ms, width 0ms, height 0ms, left 0ms, top 0ms",
                                "-ms-transition": "all " + t.options.speed + "ms, width 0ms, height 0ms, left 0ms, top 0ms",
                                transition: "all " + t.options.speed + "ms, width 0ms, height 0ms, left 0ms, top 0ms"
                            }).addClass("tooltipster-content-changing");
                            setTimeout(function() {
                                if (t.Status != "hidden") {
                                    t.$tooltip.removeClass("tooltipster-content-changing");
                                    setTimeout(function() {
                                        if (t.Status !== "hidden") {
                                            t.$tooltip.css({
                                                "-webkit-transition": t.options.speed + "ms",
                                                "-moz-transition": t.options.speed + "ms",
                                                "-o-transition": t.options.speed + "ms",
                                                "-ms-transition": t.options.speed + "ms",
                                                transition: t.options.speed + "ms"
                                            })
                                        }
                                    }, t.options.speed)
                                }
                            }, t.options.speed)
                        } else {
                            t.$tooltip.fadeTo(t.options.speed, .5, function() {
                                if (t.Status != "hidden") {
                                    t.$tooltip.fadeTo(t.options.speed, 1)
                                }
                            })
                        }
                    }
                }
            } else {
                t.hide()
            }
        },
        _repositionInfo: function(e) {
            return {
                dimension: {
                    height: e.outerHeight(false),
                    width: e.outerWidth(false)
                },
                offset: e.offset(),
                position: {
                    left: parseInt(e.css("left")),
                    top: parseInt(e.css("top"))
                }
            }
        },
        hide: function(n) {
            var r = this;
            if (n)
                r.callbacks.hide.push(n);
            r.callbacks.show = [];
            clearTimeout(r.timerShow);
            r.timerShow = null;
            clearTimeout(r.timerHide);
            r.timerHide = null;
            var i = function() {
                e.each(r.callbacks.hide, function(e, t) {
                    t.call(r.$el)
                });
                r.callbacks.hide = []
            };
            if (r.Status == "shown" || r.Status == "appearing") {
                r.Status = "disappearing";
                var s = function() {
                    r.Status = "hidden";
                    if (typeof r.Content == "object" && r.Content !== null) {
                        r.Content.detach()
                    }
                    r.$tooltip.remove();
                    r.$tooltip = null;
                    e(t).off("." + r.namespace);
                    e("body").off("." + r.namespace).css("overflow-x", r.bodyOverflowX);
                    e("body").off("." + r.namespace);
                    r.$elProxy.off("." + r.namespace + "-autoClose");
                    r.options.functionAfter.call(r.$el, r.$el);
                    i()
                };
                if (o()) {
                    r.$tooltip.clearQueue().removeClass("tooltipster-" + r.options.animation + "-show").addClass("tooltipster-dying");
                    if (r.options.speed > 0)
                        r.$tooltip.delay(r.options.speed);
                    r.$tooltip.queue(s)
                } else {
                    r.$tooltip.stop().fadeOut(r.options.speed, s)
                }
            } else if (r.Status == "hidden") {
                i()
            }
            return r
        },
        show: function(e) {
            this._showNow(e);
            return this
        },
        update: function(e) {
            return this.content(e)
        },
        content: function(e) {
            if (typeof e === "undefined") {
                return this.Content
            } else {
                this._update(e);
                return this
            }
        },
        reposition: function() {
            var n = this;
            if (e("body").find(n.$tooltip).length !== 0) {
                n.$tooltip.css("width", "");
                n.elProxyPosition = n._repositionInfo(n.$elProxy);
                var r = null, i = e(t).width(), s = n.elProxyPosition, o = n.$tooltip.outerWidth(false), u = n.$tooltip.innerWidth() + 1, a = n.$tooltip.outerHeight(false);
                if (n.$elProxy.is("area")) {
                    var f = n.$elProxy.attr("shape"), l = n.$elProxy.parent().attr("name"), c = e('img[usemap="#' + l + '"]'), h = c.offset().left, p = c.offset().top, d = n.$elProxy.attr("coords") !== undefined ? n.$elProxy.attr("coords").split(","): undefined;
                    if (f == "circle") {
                        var v = parseInt(d[0]), m = parseInt(d[1]), g = parseInt(d[2]);
                        s.dimension.height = g * 2;
                        s.dimension.width = g * 2;
                        s.offset.top = p + m - g;
                        s.offset.left = h + v - g
                    } else if (f == "rect") {
                        var v = parseInt(d[0]), m = parseInt(d[1]), y = parseInt(d[2]), b = parseInt(d[3]);
                        s.dimension.height = b - m;
                        s.dimension.width = y - v;
                        s.offset.top = p + m;
                        s.offset.left = h + v
                    } else if (f == "poly") {
                        var w = [], E = [], S = 0, x = 0, T = 0, N = 0, C = "even";
                        for (var k = 0; k < d.length; k++) {
                            var L = parseInt(d[k]);
                            if (C == "even") {
                                if (L > T) {
                                    T = L;
                                    if (k === 0) {
                                        S = T
                                    }
                                }
                                if (L < S) {
                                    S = L
                                }
                                C = "odd"
                            } else {
                                if (L > N) {
                                    N = L;
                                    if (k == 1) {
                                        x = N
                                    }
                                }
                                if (L < x) {
                                    x = L
                                }
                                C = "even"
                            }
                        }
                        s.dimension.height = N - x;
                        s.dimension.width = T - S;
                        s.offset.top = p + x;
                        s.offset.left = h + S
                    } else {
                        s.dimension.height = c.outerHeight(false);
                        s.dimension.width = c.outerWidth(false);
                        s.offset.top = p;
                        s.offset.left = h
                    }
                }
                var A = 0, O = 0, M = 0, _ = parseInt(n.options.offsetY), D = parseInt(n.options.offsetX), P = n.options.position;
                function H() {
                    var n = e(t).scrollLeft();
                    if (A - n < 0) {
                        r = A - n;
                        A = n
                    }
                    if (A + o - n > i) {
                        r = A - (i + n - o);
                        A = i + n - o
                    }
                }
                function B(n, r) {
                    if (s.offset.top - e(t).scrollTop() - a - _ - 12 < 0 && r.indexOf("top")>-1) {
                        P = n
                    }
                    if (s.offset.top + s.dimension.height + a + 12 + _ > e(t).scrollTop() + e(t).height() && r.indexOf("bottom")>-1) {
                        P = n;
                        M = s.offset.top - a - _ - 12
                    }
                }
                if (P == "top") {
                    var j = s.offset.left + o - (s.offset.left + s.dimension.width);
                    A = s.offset.left + D - j / 2;
                    M = s.offset.top - a - _ - 12;
                    H();
                    B("bottom", "top")
                }
                if (P == "top-left") {
                    A = s.offset.left + D;
                    M = s.offset.top - a - _ - 12;
                    H();
                    B("bottom-left", "top-left")
                }
                if (P == "top-right") {
                    A = s.offset.left + s.dimension.width + D - o;
                    M = s.offset.top - a - _ - 12;
                    H();
                    B("bottom-right", "top-right")
                }
                if (P == "bottom") {
                    var j = s.offset.left + o - (s.offset.left + s.dimension.width);
                    A = s.offset.left - j / 2 + D;
                    M = s.offset.top + s.dimension.height + _ + 12;
                    H();
                    B("top", "bottom")
                }
                if (P == "bottom-left") {
                    A = s.offset.left + D;
                    M = s.offset.top + s.dimension.height + _ + 12;
                    H();
                    B("top-left", "bottom-left")
                }
                if (P == "bottom-right") {
                    A = s.offset.left + s.dimension.width + D - o;
                    M = s.offset.top + s.dimension.height + _ + 12;
                    H();
                    B("top-right", "bottom-right")
                }
                if (P == "left") {
                    A = s.offset.left - D - o - 12;
                    O = s.offset.left + D + s.dimension.width + 12;
                    var F = s.offset.top + a - (s.offset.top + s.dimension.height);
                    M = s.offset.top - F / 2 - _;
                    if (A < 0 && O + o > i) {
                        var I = parseFloat(n.$tooltip.css("border-width")) * 2, q = o + A - I;
                        n.$tooltip.css("width", q + "px");
                        a = n.$tooltip.outerHeight(false);
                        A = s.offset.left - D - q - 12 - I;
                        F = s.offset.top + a - (s.offset.top + s.dimension.height);
                        M = s.offset.top - F / 2 - _
                    } else if (A < 0) {
                        A = s.offset.left + D + s.dimension.width + 12;
                        r = "left"
                    }
                }
                if (P == "right") {
                    A = s.offset.left + D + s.dimension.width + 12;
                    O = s.offset.left - D - o - 12;
                    var F = s.offset.top + a - (s.offset.top + s.dimension.height);
                    M = s.offset.top - F / 2 - _;
                    if (A + o > i && O < 0) {
                        var I = parseFloat(n.$tooltip.css("border-width")) * 2, q = i - A - I;
                        n.$tooltip.css("width", q + "px");
                        a = n.$tooltip.outerHeight(false);
                        F = s.offset.top + a - (s.offset.top + s.dimension.height);
                        M = s.offset.top - F / 2 - _
                    } else if (A + o > i) {
                        A = s.offset.left - D - o - 12;
                        r = "right"
                    }
                }
                if (n.options.arrow) {
                    var R = "tooltipster-arrow-" + P;
                    if (n.options.arrowColor.length < 1) {
                        var U = n.$tooltip.css("background-color")
                    } else {
                        var U = n.options.arrowColor
                    }
                    if (!r) {
                        r = ""
                    } else if (r == "left") {
                        R = "tooltipster-arrow-right";
                        r = ""
                    } else if (r == "right") {
                        R = "tooltipster-arrow-left";
                        r = ""
                    } else {
                        r = "left:" + Math.round(r) + "px;"
                    }
                    if (P == "top" || P == "top-left" || P == "top-right") {
                        var z = parseFloat(n.$tooltip.css("border-bottom-width")), W = n.$tooltip.css("border-bottom-color")
                    } else if (P == "bottom" || P == "bottom-left" || P == "bottom-right") {
                        var z = parseFloat(n.$tooltip.css("border-top-width")), W = n.$tooltip.css("border-top-color")
                    } else if (P == "left") {
                        var z = parseFloat(n.$tooltip.css("border-right-width")), W = n.$tooltip.css("border-right-color")
                    } else if (P == "right") {
                        var z = parseFloat(n.$tooltip.css("border-left-width")), W = n.$tooltip.css("border-left-color")
                    } else {
                        var z = parseFloat(n.$tooltip.css("border-bottom-width")), W = n.$tooltip.css("border-bottom-color")
                    }
                    if (z > 1) {
                        z++
                    }
                    var X = "";
                    if (z !== 0) {
                        var V = "", $ = "border-color: " + W + ";";
                        if (R.indexOf("bottom")!==-1) {
                            V = "margin-top: -" + Math.round(z) + "px;"
                        } else if (R.indexOf("top")!==-1) {
                            V = "margin-bottom: -" + Math.round(z) + "px;"
                        } else if (R.indexOf("left")!==-1) {
                            V = "margin-right: -" + Math.round(z) + "px;"
                        } else if (R.indexOf("right")!==-1) {
                            V = "margin-left: -" + Math.round(z) + "px;"
                        }
                        X = '<span class="tooltipster-arrow-border" style="' + V + " " + $ + ';"></span>'
                    }
                    n.$tooltip.find(".tooltipster-arrow").remove();
                    var J = '<div class="' + R + ' tooltipster-arrow" style="' + r + '">' + X + '<span style="border-color:' + U + ';"></span></div>';
                    n.$tooltip.append(J)
                }
                n.$tooltip.css({
                    top: Math.round(M) + "px",
                    left: Math.round(A) + "px"
                })
            }
            return n
        },
        enable: function() {
            this.enabled = true;
            return this
        },
        disable: function() {
            this.hide();
            this.enabled = false;
            return this
        },
        destroy: function() {
            var t = this;
            t.hide();
            if (t.$el[0] !== t.$elProxy[0]) {
                t.$elProxy.remove()
            }
            t.$el.removeData(t.namespace).off("." + t.namespace);
            var n = t.$el.data("tooltipster-ns");
            if (n.length === 1) {
                var r = null;
                if (t.options.restoration === "previous") {
                    r = t.$el.data("tooltipster-initialTitle")
                } else if (t.options.restoration === "current") {
                    r = typeof t.Content === "string" ? t.Content : e("<div></div>").append(t.Content).html()
                }
                if (r) {
                    t.$el.attr("title", r)
                }
                t.$el.removeClass("tooltipstered").removeData("tooltipster-ns").removeData("tooltipster-initialTitle")
            } else {
                n = e.grep(n, function(e, n) {
                    return e !== t.namespace
                });
                t.$el.data("tooltipster-ns", n)
            }
            return t
        },
        elementIcon: function() {
            return this.$el[0] !== this.$elProxy[0] ? this.$elProxy[0] : undefined
        },
        elementTooltip: function() {
            return this.$tooltip ? this.$tooltip[0] : undefined
        },
        option: function(e, t) {
            if (typeof t == "undefined")
                return this.options[e];
            else {
                this.options[e] = t;
                return this
            }
        },
        status: function() {
            return this.Status
        }
    };
    e.fn[u] = function() {
        var t = arguments;
        if (this.length === 0) {
            if (typeof t[0] === "string") {
                var n = true;
                switch (t[0]) {
                    case"setDefaults":
                        e.extend(a, t[1]);
                        break;
                    default:
                        n = false;
                        break
                }
                if (n)
                    return true;
                else
                    return this
            } else {
                return this
            }
        } else {
            if (typeof t[0] === "string") {
                var i = "#*$~&";
                this.each(function() {
                    var n = e(this).data("tooltipster-ns"), r = n ? e(this).data(n[0]): null;
                    if (r) {
                        if (typeof r[t[0]] === "function") {
                            var s = r[t[0]](t[1], t[2])
                        } else {
                            throw new Error('Unknown method .tooltipster("' + t[0] + '")')
                        }
                        if (s !== r) {
                            i = s;
                            return false
                        }
                    } else {
                        throw new Error("You called Tooltipster's \"" + t[0] + '" method on an uninitialized element')
                    }
                });
                return i !== "#*$~&" ? i : this
            } else {
                var s = [], o = t[0] && typeof t[0].multiple !== "undefined", u = o && t[0].multiple ||!o && a.multiple, f = t[0] && typeof t[0].debug !== "undefined", l = f && t[0].debug ||!f && a.debug;
                this.each(function() {
                    var n = false, i = e(this).data("tooltipster-ns"), o = null;
                    if (!i) {
                        n = true
                    } else if (u) {
                        n = true
                    } else if (l) {
                        console.log('Tooltipster: one or more tooltips are already attached to this element: ignoring. Use the "multiple" option to attach more tooltips.')
                    }
                    if (n) {
                        o = new r(this, t[0]);
                        if (!i)
                            i = [];
                        i.push(o.namespace);
                        e(this).data("tooltipster-ns", i);
                        e(this).data(o.namespace, o)
                    }
                    s.push(o)
                });
                if (u)
                    return s;
                else
                    return this
            }
        }
    };
    var f=!!("ontouchstart"in t);
    var l = false;
    e("body").one("mousemove", function() {
        l = true
    })
})(jQuery, window, document);
!function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery)
}(function(e) {
    e.extend(e.fn, {
        validate: function(t) {
            if (!this.length)
                return void (t && t.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."));
            var n = e.data(this[0], "validator");
            return n ? n : (this.attr("novalidate", "novalidate"), n = new e.validator(t, this[0]), e.data(this[0], "validator", n), n.settings.onsubmit && (this.validateDelegate(":submit", "click", function(t) {
                n.settings.submitHandler && (n.submitButton = t.target), e(t.target).hasClass("cancel") && (n.cancelSubmit=!0), void 0 !== e(t.target).attr("formnovalidate") && (n.cancelSubmit=!0)
            }), this.submit(function(t) {
                function r() {
                    var r, i;
                    return n.settings.submitHandler ? (n.submitButton && (r = e("<input type='hidden'/>").attr("name", n.submitButton.name).val(e(n.submitButton).val()).appendTo(n.currentForm)), i = n.settings.submitHandler.call(n, n.currentForm, t), n.submitButton && r.remove(), void 0 !== i ? i : !1) : !0
                }
                return n.settings.debug && t.preventDefault(), n.cancelSubmit ? (n.cancelSubmit=!1, r()) : n.form() ? n.pendingRequest ? (n.formSubmitted=!0, !1) : r() : (n.focusInvalid(), !1)
            })), n)
        },
        valid: function() {
            var t, n;
            return e(this[0]).is("form") ? t = this.validate().form() : (t=!0, n = e(this[0].form).validate(), this.each(function() {
                t = n.element(this) && t
            })), t
        },
        removeAttrs: function(t) {
            var n = {}, r = this;
            return e.each(t.split(/\s/), function(e, t) {
                n[t] = r.attr(t), r.removeAttr(t)
            }), n
        },
        rules: function(t, n) {
            var r, i, s, o, u, f, l = this[0];
            if (t)
                switch (r = e.data(l.form, "validator").settings, i = r.rules, s = e.validator.staticRules(l), t) {
                    case"add":
                        e.extend(s, e.validator.normalizeRule(n)), delete s.messages, i[l.name] = s, n.messages && (r.messages[l.name] = e.extend(r.messages[l.name], n.messages));
                        break;
                    case"remove":
                        return n ? (f = {}, e.each(n.split(/\s/), function(t, n) {
                            f[n] = s[n], delete s[n], "required" === n && e(l).removeAttr("aria-required")
                        }), f) : (delete i[l.name], s)
                }
            return o = e.validator.normalizeRules(e.extend({}, e.validator.classRules(l), e.validator.attributeRules(l), e.validator.dataRules(l), e.validator.staticRules(l)), l), o.required && (u = o.required, delete o.required, o = e.extend({
                required: u
            }, o), e(l).attr("aria-required", "true")), o.remote && (u = o.remote, delete o.remote, o = e.extend(o, {
                remote: u
            })), o
        }
    }), e.extend(e.expr[":"], {
        blank: function(t) {
            return !e.trim("" + e(t).val())
        },
        filled: function(t) {
            return !!e.trim("" + e(t).val())
        },
        unchecked: function(t) {
            return !e(t).prop("checked")
        }
    }), e.validator = function(t, n) {
        this.settings = e.extend(!0, {}, e.validator.defaults, t), this.currentForm = n, this.init()
    }, e.validator.format = function(t, n) {
        return 1 === arguments.length ? function() {
            var n = e.makeArray(arguments);
            return n.unshift(t), e.validator.format.apply(this, n)
        } : (arguments.length > 2 && n.constructor !== Array && (n = e.makeArray(arguments).slice(1)), n.constructor !== Array && (n = [n]), e.each(n, function(e, n) {
            t = t.replace(new RegExp("\\{" + e + "\\}", "g"), function() {
                return n
            })
        }), t)
    }, e.extend(e.validator, {
        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            validClass: "valid",
            errorElement: "label",
            focusCleanup: !1,
            focusInvalid: !0,
            errorContainer: e([]),
            errorLabelContainer: e([]),
            onsubmit: !0,
            ignore: ":hidden",
            ignoreTitle: !1,
            onfocusin: function(e) {
                this.lastActive = e, this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, e, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(e)))
            },
            onfocusout: function(e) {
                this.checkable(e) ||!(e.name in this.submitted) && this.optional(e) || this.element(e)
            },
            onkeyup: function(e, t) {
                (9 !== t.which || "" !== this.elementValue(e)) && (e.name in this.submitted || e === this.lastElement) && this.element(e)
            },
            onclick: function(e) {
                e.name in this.submitted ? this.element(e) : e.parentNode.name in this.submitted && this.element(e.parentNode)
            },
            highlight: function(t, n, r) {
                "radio" === t.type ? this.findByName(t.name).addClass(n).removeClass(r) : e(t).addClass(n).removeClass(r)
            },
            unhighlight: function(t, n, r) {
                "radio" === t.type ? this.findByName(t.name).removeClass(n).addClass(r) : e(t).removeClass(n).addClass(r)
            }
        },
        setDefaults: function(t) {
            e.extend(e.validator.defaults, t)
        },
        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date ( ISO ).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            creditcard: "Please enter a valid credit card number.",
            equalTo: "Please enter the same value again.",
            maxlength: e.validator.format("Please enter no more than {0} characters."),
            minlength: e.validator.format("Please enter at least {0} characters."),
            rangelength: e.validator.format("Please enter a value between {0} and {1} characters long."),
            range: e.validator.format("Please enter a value between {0} and {1}."),
            max: e.validator.format("Please enter a value less than or equal to {0}."),
            min: e.validator.format("Please enter a value greater than or equal to {0}.")
        },
        autoCreateRanges: !1,
        prototype: {
            init: function() {
                function t(t) {
                    var n = e.data(this[0].form, "validator"), r = "on" + t.type.replace(/^validate/, ""), i = n.settings;
                    i[r]&&!this.is(i.ignore) && i[r].call(n, this[0], t)
                }
                this.labelContainer = e(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || e(this.currentForm), this.containers = e(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                var n, r = this.groups = {};
                e.each(this.settings.groups, function(t, n) {
                    "string" == typeof n && (n = n.split(/\s/)), e.each(n, function(e, n) {
                        r[n] = t
                    })
                }), n = this.settings.rules, e.each(n, function(t, r) {
                    n[t] = e.validator.normalizeRule(r)
                }), e(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox']", "focusin focusout keyup", t).validateDelegate("select, option, [type='radio'], [type='checkbox']", "click", t), this.settings.invalidHandler && e(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler), e(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true")
            },
            form: function() {
                return this.checkForm(), e.extend(this.submitted, this.errorMap), this.invalid = e.extend({}, this.errorMap), this.valid() || e(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
            },
            checkForm: function() {
                this.prepareForm();
                for (var e = 0, t = this.currentElements = this.elements(); t[e]; e++)
                    this.check(t[e]);
                return this.valid()
            },
            element: function(t) {
                var n = this.clean(t), r = this.validationTargetFor(n), i=!0;
                return this.lastElement = r, void 0 === r ? delete this.invalid[n.name] : (this.prepareElement(r), this.currentElements = e(r), i = this.check(r)!==!1, i ? delete this.invalid[r.name] : this.invalid[r.name]=!0), e(t).attr("aria-invalid", !i), this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), i
            },
            showErrors: function(t) {
                if (t) {
                    e.extend(this.errorMap, t), this.errorList = [];
                    for (var n in t)
                        this.errorList.push({
                            message: t[n],
                            element: this.findByName(n)[0]
                        });
                    this.successList = e.grep(this.successList, function(e) {
                        return !(e.name in t)
                    })
                }
                this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
            },
            resetForm: function() {
                e.fn.resetForm && e(this.currentForm).resetForm(), this.submitted = {}, this.lastElement = null, this.prepareForm(), this.hideErrors(), this.elements().removeClass(this.settings.errorClass).removeData("previousValue").removeAttr("aria-invalid")
            },
            numberOfInvalids: function() {
                return this.objectLength(this.invalid)
            },
            objectLength: function(e) {
                var t, n = 0;
                for (t in e)
                    n++;
                return n
            },
            hideErrors: function() {
                this.hideThese(this.toHide)
            },
            hideThese: function(e) {
                e.not(this.containers).text(""), this.addWrapper(e).hide()
            },
            valid: function() {
                return 0 === this.size()
            },
            size: function() {
                return this.errorList.length
            },
            focusInvalid: function() {
                if (this.settings.focusInvalid)
                    try {
                        e(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                    } catch (t) {}
            },
            findLastActive: function() {
                var t = this.lastActive;
                return t && 1 === e.grep(this.errorList, function(e) {
                        return e.element.name === t.name
                    }).length && t
            },
            elements: function() {
                var t = this, n = {};
                return e(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled], [readonly]").not(this.settings.ignore).filter(function() {
                    return !this.name && t.settings.debug && window.console && console.error("%o has no name assigned", this), this.name in n ||!t.objectLength(e(this).rules())?!1 : (n[this.name]=!0, !0)
                })
            },
            clean: function(t) {
                return e(t)[0]
            },
            errors: function() {
                var t = this.settings.errorClass.split(" ").join(".");
                return e(this.settings.errorElement + "." + t, this.errorContext)
            },
            reset: function() {
                this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = e([]), this.toHide = e([]), this.currentElements = e([])
            },
            prepareForm: function() {
                this.reset(), this.toHide = this.errors().add(this.containers)
            },
            prepareElement: function(e) {
                this.reset(), this.toHide = this.errorsFor(e)
            },
            elementValue: function(t) {
                var n, r = e(t), i = t.type;
                return "radio" === i || "checkbox" === i ? e("input[name='" + t.name + "']:checked").val() : "number" === i && "undefined" != typeof t.validity ? t.validity.badInput?!1 : r.val() : (n = r.val(), "string" == typeof n ? n.replace(/\r/g, "") : n)
            },
            check: function(t) {
                t = this.validationTargetFor(this.clean(t));
                var n, r, i, s = e(t).rules(), o = e.map(s, function(e, t) {
                    return t
                }).length, u=!1, f = this.elementValue(t);
                for (r in s) {
                    i = {
                        method: r,
                        parameters: s[r]
                    };
                    try {
                        if (n = e.validator.methods[r].call(this, f, t, i.parameters), "dependency-mismatch" === n && 1 === o) {
                            u=!0;
                            continue
                        }
                        if (u=!1, "pending" === n)
                            return void (this.toHide = this.toHide.not(this.errorsFor(t)));
                        if (!n)
                            return this.formatAndAdd(t, i), !1
                    } catch (l) {
                        throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + t.id + ", check the '" + i.method + "' method.", l), l
                    }
                }
                if (!u)
                    return this.objectLength(s) && this.successList.push(t), !0
            },
            customDataMessage: function(t, n) {
                return e(t).data("msg" + n.charAt(0).toUpperCase() + n.substring(1).toLowerCase()) || e(t).data("msg")
            },
            customMessage: function(e, t) {
                var n = this.settings.messages[e];
                return n && (n.constructor === String ? n : n[t])
            },
            findDefined: function() {
                for (var e = 0; e < arguments.length; e++)
                    if (void 0 !== arguments[e])
                        return arguments[e];
                return void 0
            },
            defaultMessage: function(t, n) {
                return this.findDefined(this.customMessage(t.name, n), this.customDataMessage(t, n), !this.settings.ignoreTitle && t.title || void 0, e.validator.messages[n], "<strong>Warning: No message defined for " + t.name + "</strong>")
            },
            formatAndAdd: function(t, n) {
                var r = this.defaultMessage(t, n.method), i = /\$?\{(\d+)\}/g;
                "function" == typeof r ? r = r.call(this, n.parameters, t) : i.test(r) && (r = e.validator.format(r.replace(i, "{$1}"), n.parameters)), this.errorList.push({
                    message: r,
                    element: t,
                    method: n.method
                }), this.errorMap[t.name] = r, this.submitted[t.name] = r
            },
            addWrapper: function(e) {
                return this.settings.wrapper && (e = e.add(e.parent(this.settings.wrapper))), e
            },
            defaultShowErrors: function() {
                var e, t, n;
                for (e = 0; this.errorList[e]; e++)
                    n = this.errorList[e], this.settings.highlight && this.settings.highlight.call(this, n.element, this.settings.errorClass, this.settings.validClass), this.showLabel(n.element, n.message);
                if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                    for (e = 0; this.successList[e]; e++)
                        this.showLabel(this.successList[e]);
                if (this.settings.unhighlight)
                    for (e = 0, t = this.validElements(); t[e]; e++)
                        this.settings.unhighlight.call(this, t[e], this.settings.errorClass, this.settings.validClass);
                this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
            },
            validElements: function() {
                return this.currentElements.not(this.invalidElements())
            },
            invalidElements: function() {
                return e(this.errorList).map(function() {
                    return this.element
                })
            },
            showLabel: function(t, n) {
                var r, i, s, o = this.errorsFor(t), u = this.idOrName(t), f = e(t).attr("aria-describedby");
                o.length ? (o.removeClass(this.settings.validClass).addClass(this.settings.errorClass), o.html(n)) : (o = e("<" + this.settings.errorElement + ">").attr("id", u + "-error").addClass(this.settings.errorClass).html(n || ""), r = o, this.settings.wrapper && (r = o.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.length ? this.labelContainer.append(r) : this.settings.errorPlacement ? this.settings.errorPlacement(r, e(t)) : r.insertAfter(t), o.is("label") ? o.attr("for", u) : 0 === o.parents("label[for='" + u + "']").length && (s = o.attr("id").replace(/(:|\.|\[|\])/g, "\\$1"), f ? f.match(new RegExp("\\b" + s + "\\b")) || (f += " " + s) : f = s, e(t).attr("aria-describedby", f), i = this.groups[t.name], i && e.each(this.groups, function(t, n) {
                    n === i && e("[name='" + t + "']", this.currentForm).attr("aria-describedby", o.attr("id"))
                }))), !n && this.settings.success && (o.text(""), "string" == typeof this.settings.success ? o.addClass(this.settings.success) : this.settings.success(o, t)), this.toShow = this.toShow.add(o)
            },
            errorsFor: function(t) {
                var n = this.idOrName(t), r = e(t).attr("aria-describedby"), i = "label[for='" + n + "'], label[for='" + n + "'] *";
                return r && (i = i + ", #" + r.replace(/\s+/g, ", #")), this.errors().filter(i)
            },
            idOrName: function(e) {
                return this.groups[e.name] || (this.checkable(e) ? e.name : e.id || e.name)
            },
            validationTargetFor: function(t) {
                return this.checkable(t) && (t = this.findByName(t.name)), e(t).not(this.settings.ignore)[0]
            },
            checkable: function(e) {
                return /radio|checkbox/i.test(e.type)
            },
            findByName: function(t) {
                return e(this.currentForm).find("[name='" + t + "']")
            },
            getLength: function(t, n) {
                switch (n.nodeName.toLowerCase()) {
                    case"select":
                        return e("option:selected", n).length;
                    case"input":
                        if (this.checkable(n))
                            return this.findByName(n.name).filter(":checked").length
                }
                return t.length
            },
            depend: function(e, t) {
                return this.dependTypes[typeof e] ? this.dependTypes[typeof e](e, t) : !0
            },
            dependTypes: {
                "boolean": function(e) {
                    return e
                },
                string: function(t, n) {
                    return !!e(t, n.form).length
                },
                "function": function(e, t) {
                    return e(t)
                }
            },
            optional: function(t) {
                var n = this.elementValue(t);
                return !e.validator.methods.required.call(this, n, t) && "dependency-mismatch"
            },
            startRequest: function(e) {
                this.pending[e.name] || (this.pendingRequest++, this.pending[e.name]=!0)
            },
            stopRequest: function(t, n) {
                this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[t.name], n && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (e(this.currentForm).submit(), this.formSubmitted=!1) : !n && 0 === this.pendingRequest && this.formSubmitted && (e(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted=!1)
            },
            previousValue: function(t) {
                return e.data(t, "previousValue") || e.data(t, "previousValue", {
                        old: null,
                        valid: !0,
                        message: this.defaultMessage(t, "remote")
                    })
            }
        },
        classRuleSettings: {
            required: {
                required: !0
            },
            email: {
                email: !0
            },
            url: {
                url: !0
            },
            date: {
                date: !0
            },
            dateISO: {
                dateISO: !0
            },
            number: {
                number: !0
            },
            digits: {
                digits: !0
            },
            creditcard: {
                creditcard: !0
            }
        },
        addClassRules: function(t, n) {
            t.constructor === String ? this.classRuleSettings[t] = n : e.extend(this.classRuleSettings, t)
        },
        classRules: function(t) {
            var n = {}, r = e(t).attr("class");
            return r && e.each(r.split(" "), function() {
                this in e.validator.classRuleSettings && e.extend(n, e.validator.classRuleSettings[this])
            }), n
        },
        attributeRules: function(t) {
            var n, r, i = {}, s = e(t), o = t.getAttribute("type");
            for (n in e.validator.methods)
                "required" === n ? (r = t.getAttribute(n), "" === r && (r=!0), r=!!r) : r = s.attr(n), /min|max/.test(n) && (null === o || /number|range|text/.test(o)) && (r = Number(r)), r || 0 === r ? i[n] = r : o === n && "range" !== o && (i[n]=!0);
            return i.maxlength && /-1|2147483647|524288/.test(i.maxlength) && delete i.maxlength, i
        },
        dataRules: function(t) {
            var n, r, i = {}, s = e(t);
            for (n in e.validator.methods)
                r = s.data("rule" + n.charAt(0).toUpperCase() + n.substring(1).toLowerCase()), void 0 !== r && (i[n] = r);
            return i
        },
        staticRules: function(t) {
            var n = {}, r = e.data(t.form, "validator");
            return r.settings.rules && (n = e.validator.normalizeRule(r.settings.rules[t.name]) || {}), n
        },
        normalizeRules: function(t, n) {
            return e.each(t, function(r, i) {
                if (i===!1)
                    return void delete t[r];
                if (i.param || i.depends) {
                    var s=!0;
                    switch (typeof i.depends) {
                        case"string":
                            s=!!e(i.depends, n.form).length;
                            break;
                        case"function":
                            s = i.depends.call(n, n)
                    }
                    s ? t[r] = void 0 !== i.param ? i.param : !0 : delete t[r]
                }
            }), e.each(t, function(r, i) {
                t[r] = e.isFunction(i) ? i(n) : i
            }), e.each(["minlength", "maxlength"], function() {
                t[this] && (t[this] = Number(t[this]))
            }), e.each(["rangelength", "range"], function() {
                var n;
                t[this] && (e.isArray(t[this]) ? t[this] = [Number(t[this][0]), Number(t[this][1])] : "string" == typeof t[this] && (n = t[this].replace(/[\[\]]/g, "").split(/[\s,]+/), t[this] = [Number(n[0]), Number(n[1])]))
            }), e.validator.autoCreateRanges && (null != t.min && null != t.max && (t.range = [t.min, t.max], delete t.min, delete t.max), null != t.minlength && null != t.maxlength && (t.rangelength = [t.minlength, t.maxlength], delete t.minlength, delete t.maxlength)), t
        },
        normalizeRule: function(t) {
            if ("string" == typeof t) {
                var n = {};
                e.each(t.split(/\s/), function() {
                    n[this]=!0
                }), t = n
            }
            return t
        },
        addMethod: function(t, n, r) {
            e.validator.methods[t] = n, e.validator.messages[t] = void 0 !== r ? r : e.validator.messages[t], n.length < 3 && e.validator.addClassRules(t, e.validator.normalizeRule(t))
        },
        methods: {
            required: function(t, n, r) {
                if (!this.depend(r, n))
                    return "dependency-mismatch";
                if ("select" === n.nodeName.toLowerCase()) {
                    var i = e(n).val();
                    return i && i.length > 0
                }
                return this.checkable(n) ? this.getLength(t, n) > 0 : e.trim(t).length > 0
            },
            email: function(e, t) {
                return this.optional(t) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(e)
            },
            url: function(e, t) {
                return this.optional(t) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(e)
            },
            date: function(e, t) {
                return this.optional(t) ||!/Invalid|NaN/.test((new Date(e)).toString())
            },
            dateISO: function(e, t) {
                return this.optional(t) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(e)
            },
            number: function(e, t) {
                return this.optional(t) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(e)
            },
            digits: function(e, t) {
                return this.optional(t) || /^\d+$/.test(e)
            },
            creditcard: function(e, t) {
                if (this.optional(t))
                    return "dependency-mismatch";
                if (/[^0-9 \-]+/.test(e))
                    return !1;
                var n, r, i = 0, s = 0, o=!1;
                if (e = e.replace(/\D/g, ""), e.length < 13 || e.length > 19)
                    return !1;
                for (n = e.length - 1; n >= 0; n--)
                    r = e.charAt(n), s = parseInt(r, 10), o && (s*=2) > 9 && (s -= 9), i += s, o=!o;
                return i%10 === 0
            },
            minlength: function(t, n, r) {
                var i = e.isArray(t) ? t.length: this.getLength(t, n);
                return this.optional(n) || i >= r
            },
            maxlength: function(t, n, r) {
                var i = e.isArray(t) ? t.length: this.getLength(t, n);
                return this.optional(n) || r >= i
            },
            rangelength: function(t, n, r) {
                var i = e.isArray(t) ? t.length: this.getLength(t, n);
                return this.optional(n) || i >= r[0] && i <= r[1]
            },
            min: function(e, t, n) {
                return this.optional(t) || e >= n
            },
            max: function(e, t, n) {
                return this.optional(t) || n >= e
            },
            range: function(e, t, n) {
                return this.optional(t) || e >= n[0] && e <= n[1]
            },
            equalTo: function(t, n, r) {
                var i = e(r);
                return this.settings.onfocusout && i.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
                    e(n).valid()
                }), t === i.val()
            },
            remote: function(t, n, r) {
                if (this.optional(n))
                    return "dependency-mismatch";
                var i, s, o = this.previousValue(n);
                return this.settings.messages[n.name] || (this.settings.messages[n.name] = {}), o.originalMessage = this.settings.messages[n.name].remote, this.settings.messages[n.name].remote = o.message, r = "string" == typeof r && {
                        url: r
                    }
                    || r, o.old === t ? o.valid : (o.old = t, i = this, this.startRequest(n), s = {}, s[n.name] = t, e.ajax(e.extend(!0, {
                    url: r,
                    mode: "abort",
                    port: "validate" + n.name,
                    dataType: "json",
                    data: s,
                    context: i.currentForm,
                    success: function(r) {
                        var s, u, f, l = r===!0 || "true" === r;
                        i.settings.messages[n.name].remote = o.originalMessage, l ? (f = i.formSubmitted, i.prepareElement(n), i.formSubmitted = f, i.successList.push(n), delete i.invalid[n.name], i.showErrors()) : (s = {}, u = r || i.defaultMessage(n, "remote"), s[n.name] = o.message = e.isFunction(u) ? u(t) : u, i.invalid[n.name]=!0, i.showErrors(s)), o.valid = l, i.stopRequest(n, l)
                    }
                }, r)), "pending")
            }
        }
    }), e.format = function() {
        throw "$.format has been deprecated. Please use $.validator.format instead."
    };
    var t, n = {};
    e.ajaxPrefilter ? e.ajaxPrefilter(function(e, t, r) {
        var i = e.port;
        "abort" === e.mode && (n[i] && n[i].abort(), n[i] = r)
    }) : (t = e.ajax, e.ajax = function(r) {
        var i = ("mode"in r ? r : e.ajaxSettings).mode, s = ("port"in r ? r : e.ajaxSettings).port;
        return "abort" === i ? (n[s] && n[s].abort(), n[s] = t.apply(this, arguments), n[s]) : t.apply(this, arguments)
    }), e.extend(e.fn, {
        validateDelegate: function(t, n, r) {
            return this.bind(n, function(n) {
                var i = e(n.target);
                return i.is(t) ? r.apply(i, arguments) : void 0
            })
        }
    })
});
!function(e) {
    function t() {}
    function n(e) {
        function n(t) {
            t.prototype.option || (t.prototype.option = function(t) {
                e.isPlainObject(t) && (this.options = e.extend(!0, this.options, t))
            })
        }
        function i(t, n) {
            e.fn[t] = function(i) {
                if ("string" == typeof i) {
                    for (var o = r.call(arguments, 1), u = 0, l = this.length; l > u; u++) {
                        var h = this[u], p = e.data(h, t);
                        if (p)
                            if (e.isFunction(p[i]) && "_" !== i.charAt(0)) {
                                var v = p[i].apply(p, o);
                                if (void 0 !== v)
                                    return v
                            } else
                                s("no such method '" + i + "' for " + t + " instance");
                        else
                            s("cannot call methods on " + t + " prior to initialization; attempted to call '" + i + "'")
                    }
                    return this
                }
                return this.each(function() {
                    var r = e.data(this, t);
                    r ? (r.option(i), r._init()) : (r = new n(this, i), e.data(this, t, r))
                })
            }
        }
        if (e) {
            var s = "undefined" == typeof console ? t: function(e) {
                console.error(e)
            };
            return e.bridget = function(e, t) {
                n(t), i(e, t)
            }, e.bridget
        }
    }
    var r = Array.prototype.slice;
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery.bridget", ["jquery"], n) : n("object" == typeof exports ? require("jquery") : e.jQuery)
}(window), function(e) {
    function t(t) {
        var n = e.event;
        return n.target = n.target || n.srcElement || t, n
    }
    var n = document.documentElement, r = function() {};
    n.addEventListener ? r = function(e, t, n) {
        e.addEventListener(t, n, !1)
    } : n.attachEvent && (r = function(e, n, r) {
        e[n + r] = r.handleEvent ? function() {
            var n = t(e);
            r.handleEvent.call(r, n)
        } : function() {
            var n = t(e);
            r.call(e, n)
        }, e.attachEvent("on" + n, e[n + r])
    });
    var i = function() {};
    n.removeEventListener ? i = function(e, t, n) {
        e.removeEventListener(t, n, !1)
    } : n.detachEvent && (i = function(e, t, n) {
        e.detachEvent("on" + t, e[t + n]);
        try {
            delete e[t + n]
        } catch (r) {
            e[t + n] = void 0
        }
    });
    var s = {
        bind: r,
        unbind: i
    };
    "function" == typeof define && define.amd ? define("eventie/eventie", s) : "object" == typeof exports ? module.exports = s : e.eventie = s
}(this), function(e) {
    function t(e) {
        "function" == typeof e && (t.isReady ? e() : o.push(e))
    }
    function n(e) {
        var n = "readystatechange" === e.type && "complete" !== s.readyState;
        t.isReady || n || r()
    }
    function r() {
        t.isReady=!0;
        for (var e = 0, n = o.length; n > e; e++) {
            var r = o[e];
            r()
        }
    }
    function i(i) {
        return "complete" === s.readyState ? r() : (i.bind(s, "DOMContentLoaded", n), i.bind(s, "readystatechange", n), i.bind(e, "load", n)), t
    }
    var s = e.document, o = [];
    t.isReady=!1, "function" == typeof define && define.amd ? define("doc-ready/doc-ready", ["../../node_modules/eventie/eventie"], i) : "object" == typeof exports ? module.exports = i(require("eventie")) : e.docReady = i(e.eventie)
}(window), function() {
    function e() {}
    function t(e, t) {
        for (var n = e.length; n--;)
            if (e[n].listener === t)
                return n;
        return - 1
    }
    function n(e) {
        return function() {
            return this[e].apply(this, arguments)
        }
    }
    var r = e.prototype, i = this, s = i.EventEmitter;
    r.getListeners = function(e) {
        var t, n, r = this._getEvents();
        if (e instanceof RegExp) {
            t = {};
            for (n in r)
                r.hasOwnProperty(n) && e.test(n) && (t[n] = r[n])
        } else
            t = r[e] || (r[e] = []);
        return t
    }, r.flattenListeners = function(e) {
        var t, n = [];
        for (t = 0; t < e.length; t += 1)
            n.push(e[t].listener);
        return n
    }, r.getListenersAsObject = function(e) {
        var t, n = this.getListeners(e);
        return n instanceof Array && (t = {}, t[e] = n), t || n
    }, r.addListener = function(e, n) {
        var r, i = this.getListenersAsObject(e), s = "object" == typeof n;
        for (r in i)
            i.hasOwnProperty(r)&&-1 === t(i[r], n) && i[r].push(s ? n : {
                listener: n,
                once: !1
            });
        return this
    }, r.on = n("addListener"), r.addOnceListener = function(e, t) {
        return this.addListener(e, {
            listener: t,
            once: !0
        })
    }, r.once = n("addOnceListener"), r.defineEvent = function(e) {
        return this.getListeners(e), this
    }, r.defineEvents = function(e) {
        for (var t = 0; t < e.length; t += 1)
            this.defineEvent(e[t]);
        return this
    }, r.removeListener = function(e, n) {
        var r, i, s = this.getListenersAsObject(e);
        for (i in s)
            s.hasOwnProperty(i) && (r = t(s[i], n), - 1 !== r && s[i].splice(r, 1));
        return this
    }, r.off = n("removeListener"), r.addListeners = function(e, t) {
        return this.manipulateListeners(!1, e, t)
    }, r.removeListeners = function(e, t) {
        return this.manipulateListeners(!0, e, t)
    }, r.manipulateListeners = function(e, t, n) {
        var r, i, s = e ? this.removeListener: this.addListener, o = e ? this.removeListeners: this.addListeners;
        if ("object" != typeof t || t instanceof RegExp)
            for (r = n.length; r--;)
                s.call(this, t, n[r]);
        else
            for (r in t)
                t.hasOwnProperty(r) && (i = t[r]) && ("function" == typeof i ? s.call(this, r, i) : o.call(this, r, i));
        return this
    }, r.removeEvent = function(e) {
        var t, n = typeof e, r = this._getEvents();
        if ("string" === n)
            delete r[e];
        else if (e instanceof RegExp)
            for (t in r)
                r.hasOwnProperty(t) && e.test(t) && delete r[t];
        else
            delete this._events;
        return this
    }, r.removeAllListeners = n("removeEvent"), r.emitEvent = function(e, t) {
        var n, r, i, s, o = this.getListenersAsObject(e);
        for (i in o)
            if (o.hasOwnProperty(i))
                for (r = o[i].length; r--;)
                    n = o[i][r], n.once===!0 && this.removeListener(e, n.listener), s = n.listener.apply(this, t || []), s === this._getOnceReturnValue() && this.removeListener(e, n.listener);
        return this
    }, r.trigger = n("emitEvent"), r.emit = function(e) {
        var t = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(e, t)
    }, r.setOnceReturnValue = function(e) {
        return this._onceReturnValue = e, this
    }, r._getOnceReturnValue = function() {
        return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0
    }, r._getEvents = function() {
        return this._events || (this._events = {})
    }, e.noConflict = function() {
        return i.EventEmitter = s, e
    }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function() {
        return e
    }) : "object" == typeof module && module.exports ? module.exports = e : i.EventEmitter = e
}.call(this), function(e) {
    function t(e) {
        if (e) {
            if ("string" == typeof r[e])
                return e;
            e = e.charAt(0).toUpperCase() + e.slice(1);
            for (var t, i = 0, s = n.length; s > i; i++)
                if (t = n[i] + e, "string" == typeof r[t])
                    return t
        }
    }
    var n = "Webkit Moz ms Ms O".split(" "), r = document.documentElement.style;
    "function" == typeof define && define.amd ? define("get-style-property/get-style-property", [], function() {
        return t
    }) : "object" == typeof exports ? module.exports = t : e.getStyleProperty = t
}(window), function(e) {
    function t(e) {
        var t = parseFloat(e), n =- 1 === e.indexOf("%")&&!isNaN(t);
        return n && t
    }
    function n() {}
    function r() {
        for (var e = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0
        }, t = 0, n = o.length; n > t; t++) {
            var r = o[t];
            e[r] = 0
        }
        return e
    }
    function i(n) {
        function i() {
            if (!v) {
                v=!0;
                var r = e.getComputedStyle;
                if (c = function() {
                        var e = r ? function(e) {
                            return r(e, null)
                        }
                            : function(e) {
                            return e.currentStyle
                        };
                        return function(t) {
                            var n = e(t);
                            return n || s("Style returned " + n + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), n
                        }
                    }(), h = n("boxSizing")) {
                    var i = document.createElement("div");
                    i.style.width = "200px", i.style.padding = "1px 2px 3px 4px", i.style.borderStyle = "solid", i.style.borderWidth = "1px 2px 3px 4px", i.style[h] = "border-box";
                    var o = document.body || document.documentElement;
                    o.appendChild(i);
                    var u = c(i);
                    p = 200 === t(u.width), o.removeChild(i)
                }
            }
        }
        function u(e) {
            if (i(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) {
                var n = c(e);
                if ("none" === n.display)
                    return r();
                var s = {};
                s.width = e.offsetWidth, s.height = e.offsetHeight;
                for (var u = s.isBorderBox=!(!h ||!n[h] || "border-box" !== n[h]), a = 0, f = o.length; f > a; a++) {
                    var v = o[a], m = n[v];
                    m = l(e, m);
                    var y = parseFloat(m);
                    s[v] = isNaN(y) ? 0 : y
                }
                var w = s.paddingLeft + s.paddingRight, E = s.paddingTop + s.paddingBottom, S = s.marginLeft + s.marginRight, x = s.marginTop + s.marginBottom, T = s.borderLeftWidth + s.borderRightWidth, N = s.borderTopWidth + s.borderBottomWidth, C = u && p, L = t(n.width);
                L!==!1 && (s.width = L + (C ? 0 : w + T));
                var A = t(n.height);
                return A!==!1 && (s.height = A + (C ? 0 : E + N)), s.innerWidth = s.width - (w + T), s.innerHeight = s.height - (E + N), s.outerWidth = s.width + S, s.outerHeight = s.height + x, s
            }
        }
        function l(t, n) {
            if (e.getComputedStyle||-1 === n.indexOf("%"))
                return n;
            var r = t.style, i = r.left, s = t.runtimeStyle, o = s && s.left;
            return o && (s.left = t.currentStyle.left), r.left = n, n = r.pixelLeft, r.left = i, o && (s.left = o), n
        }
        var c, h, p, v=!1;
        return u
    }
    var s = "undefined" == typeof console ? n: function(e) {
        console.error(e)
    }, o = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"];
    "function" == typeof define && define.amd ? define("get-size/get-size", ["get-style-property/get-style-property"], i) : "object" == typeof exports ? module.exports = i(require("desandro-get-style-property")) : e.getSize = i(e.getStyleProperty)
}(window), function(e) {
    function t(e, t) {
        return e[o](t)
    }
    function n(e) {
        if (!e.parentNode) {
            var t = document.createDocumentFragment();
            t.appendChild(e)
        }
    }
    function r(e, t) {
        n(e);
        for (var r = e.parentNode.querySelectorAll(t), i = 0, s = r.length; s > i; i++)
            if (r[i] === e)
                return !0;
        return !1
    }
    function i(e, r) {
        return n(e), t(e, r)
    }
    var s, o = function() {
        if (e.matchesSelector)
            return "matchesSelector";
        for (var t = ["webkit", "moz", "ms", "o"], n = 0, r = t.length; r > n; n++) {
            var i = t[n], s = i + "MatchesSelector";
            if (e[s])
                return s
        }
    }();
    if (o) {
        var u = document.createElement("div"), a = t(u, "div");
        s = a ? t : i
    } else
        s = r;
    "function" == typeof define && define.amd ? define("matches-selector/matches-selector", [], function() {
        return s
    }) : "object" == typeof exports ? module.exports = s : window.matchesSelector = s
}(Element.prototype), function(e) {
    function t(e, t) {
        for (var n in t)
            e[n] = t[n];
        return e
    }
    function n(e) {
        for (var t in e)
            return !1;
        return t = null, !0
    }
    function r(e) {
        return e.replace(/([A-Z])/g, function(e) {
            return "-" + e.toLowerCase()
        })
    }
    function i(e, i, s) {
        function u(e, t) {
            e && (this.element = e, this.layout = t, this.position = {
                x: 0,
                y: 0
            }, this._create())
        }
        var a = s("transition"), f = s("transform"), l = a && f, h=!!s("perspective"), p = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "otransitionend",
            transition: "transitionend"
        }
            [a], v = ["transform", "transition", "transitionDuration", "transitionProperty"], m = function() {
            for (var e = {}, t = 0, n = v.length; n > t; t++) {
                var r = v[t], i = s(r);
                i && i !== r && (e[r] = i)
            }
            return e
        }();
        t(u.prototype, e.prototype), u.prototype._create = function() {
            this._transn = {
                ingProperties: {},
                clean: {},
                onEnd: {}
            }, this.css({
                position: "absolute"
            })
        }, u.prototype.handleEvent = function(e) {
            var t = "on" + e.type;
            this[t] && this[t](e)
        }, u.prototype.getSize = function() {
            this.size = i(this.element)
        }, u.prototype.css = function(e) {
            var t = this.element.style;
            for (var n in e) {
                var r = m[n] || n;
                t[r] = e[n]
            }
        }, u.prototype.getPosition = function() {
            var e = o(this.element), t = this.layout.options, n = t.isOriginLeft, r = t.isOriginTop, i = parseInt(e[n ? "left": "right"], 10), s = parseInt(e[r ? "top": "bottom"], 10);
            i = isNaN(i) ? 0 : i, s = isNaN(s) ? 0 : s;
            var u = this.layout.size;
            i -= n ? u.paddingLeft : u.paddingRight, s -= r ? u.paddingTop : u.paddingBottom, this.position.x = i, this.position.y = s
        }, u.prototype.layoutPosition = function() {
            var e = this.layout.size, t = this.layout.options, n = {};
            t.isOriginLeft ? (n.left = this.position.x + e.paddingLeft + "px", n.right = "") : (n.right = this.position.x + e.paddingRight + "px", n.left = ""), t.isOriginTop ? (n.top = this.position.y + e.paddingTop + "px", n.bottom = "") : (n.bottom = this.position.y + e.paddingBottom + "px", n.top = ""), this.css(n), this.emitEvent("layout", [this])
        };
        var y = h ? function(e, t) {
            return "translate3d(" + e + "px, " + t + "px, 0)"
        }
            : function(e, t) {
            return "translate(" + e + "px, " + t + "px)"
        };
        u.prototype._transitionTo = function(e, t) {
            this.getPosition();
            var n = this.position.x, r = this.position.y, i = parseInt(e, 10), s = parseInt(t, 10), o = i === this.position.x && s === this.position.y;
            if (this.setPosition(e, t), o&&!this.isTransitioning)
                return void this.layoutPosition();
            var u = e - n, a = t - r, f = {}, l = this.layout.options;
            u = l.isOriginLeft ? u : - u, a = l.isOriginTop ? a : - a, f.transform = y(u, a), this.transition({
                to: f,
                onTransitionEnd: {
                    transform: this.layoutPosition
                },
                isCleaning: !0
            })
        }, u.prototype.goTo = function(e, t) {
            this.setPosition(e, t), this.layoutPosition()
        }, u.prototype.moveTo = l ? u.prototype._transitionTo : u.prototype.goTo, u.prototype.setPosition = function(e, t) {
            this.position.x = parseInt(e, 10), this.position.y = parseInt(t, 10)
        }, u.prototype._nonTransition = function(e) {
            this.css(e.to), e.isCleaning && this._removeStyles(e.to);
            for (var t in e.onTransitionEnd)
                e.onTransitionEnd[t].call(this)
        }, u.prototype._transition = function(e) {
            if (!parseFloat(this.layout.options.transitionDuration))
                return void this._nonTransition(e);
            var t = this._transn;
            for (var n in e.onTransitionEnd)
                t.onEnd[n] = e.onTransitionEnd[n];
            for (n in e.to)
                t.ingProperties[n]=!0, e.isCleaning && (t.clean[n]=!0);
            if (e.from) {
                this.css(e.from);
                var r = this.element.offsetHeight;
                r = null
            }
            this.enableTransition(e.to), this.css(e.to), this.isTransitioning=!0
        };
        var w = f && r(f) + ",opacity";
        u.prototype.enableTransition = function() {
            this.isTransitioning || (this.css({
                transitionProperty: w,
                transitionDuration: this.layout.options.transitionDuration
            }), this.element.addEventListener(p, this, !1))
        }, u.prototype.transition = u.prototype[a ? "_transition": "_nonTransition"], u.prototype.onwebkitTransitionEnd = function(e) {
            this.ontransitionend(e)
        }, u.prototype.onotransitionend = function(e) {
            this.ontransitionend(e)
        };
        var E = {
            "-webkit-transform": "transform",
            "-moz-transform": "transform",
            "-o-transform": "transform"
        };
        u.prototype.ontransitionend = function(e) {
            if (e.target === this.element) {
                var t = this._transn, r = E[e.propertyName] || e.propertyName;
                if (delete t.ingProperties[r], n(t.ingProperties) && this.disableTransition(), r in t.clean && (this.element.style[e.propertyName] = "", delete t.clean[r]), r in t.onEnd) {
                    var i = t.onEnd[r];
                    i.call(this), delete t.onEnd[r]
                }
                this.emitEvent("transitionEnd", [this])
            }
        }, u.prototype.disableTransition = function() {
            this.removeTransitionStyles(), this.element.removeEventListener(p, this, !1), this.isTransitioning=!1
        }, u.prototype._removeStyles = function(e) {
            var t = {};
            for (var n in e)
                t[n] = "";
            this.css(t)
        };
        var S = {
            transitionProperty: "",
            transitionDuration: ""
        };
        return u.prototype.removeTransitionStyles = function() {
            this.css(S)
        }, u.prototype.removeElem = function() {
            this.element.parentNode.removeChild(this.element), this.emitEvent("remove", [this])
        }, u.prototype.remove = function() {
            if (!a ||!parseFloat(this.layout.options.transitionDuration))
                return void this.removeElem();
            var e = this;
            this.on("transitionEnd", function() {
                return e.removeElem(), !0
            }), this.hide()
        }, u.prototype.reveal = function() {
            delete this.isHidden, this.css({
                display: ""
            });
            var e = this.layout.options;
            this.transition({
                from: e.hiddenStyle,
                to: e.visibleStyle,
                isCleaning: !0
            })
        }, u.prototype.hide = function() {
            this.isHidden=!0, this.css({
                display: ""
            });
            var e = this.layout.options;
            this.transition({
                from: e.visibleStyle,
                to: e.hiddenStyle,
                isCleaning: !0,
                onTransitionEnd: {
                    opacity: function() {
                        this.isHidden && this.css({
                            display: "none"
                        })
                    }
                }
            })
        }, u.prototype.destroy = function() {
            this.css({
                position: "",
                left: "",
                right: "",
                top: "",
                bottom: "",
                transition: "",
                transform: ""
            })
        }, u
    }
    var s = e.getComputedStyle, o = s ? function(e) {
        return s(e, null)
    }
        : function(e) {
        return e.currentStyle
    };
    "function" == typeof define && define.amd ? define("outlayer/item", ["eventEmitter/EventEmitter", "../../node_modules/get-size/get-size", "get-style-property/get-style-property"], i) : "object" == typeof exports ? module.exports = i(require("wolfy87-eventemitter"), require("get-size"), require("desandro-get-style-property")) : (e.Outlayer = {}, e.Outlayer.Item = i(e.EventEmitter, e.getSize, e.getStyleProperty))
}(window), function(e) {
    function t(e, t) {
        for (var n in t)
            e[n] = t[n];
        return e
    }
    function n(e) {
        return "[object Array]" === c.call(e)
    }
    function r(e) {
        var t = [];
        if (n(e))
            t = e;
        else if (e && "number" == typeof e.length)
            for (var r = 0, i = e.length; i > r; r++)
                t.push(e[r]);
        else
            t.push(e);
        return t
    }
    function i(e, t) {
        var n = p(t, e);
        - 1 !== n && t.splice(n, 1)
    }
    function s(e) {
        return e.replace(/(.)([A-Z])/g, function(e, t, n) {
            return t + "-" + n
        }).toLowerCase()
    }
    function o(n, o, c, p, v, g) {
        function y(e, n) {
            if ("string" == typeof e && (e = u.querySelector(e)), !e ||!h(e))
                return void (a && a.error("Bad " + this.constructor.namespace + " element: " + e));
            this.element = e, this.options = t({}, this.constructor.defaults), this.option(n);
            var r=++w;
            this.element.outlayerGUID = r, E[r] = this, this._create(), this.options.isInitLayout && this.layout()
        }
        var w = 0, E = {};
        return y.namespace = "outlayer", y.Item = g, y.defaults = {
            containerStyle: {
                position: "relative"
            },
            isInitLayout: !0,
            isOriginLeft: !0,
            isOriginTop: !0,
            isResizeBound: !0,
            isResizingContainer: !0,
            transitionDuration: "0.4s",
            hiddenStyle: {
                opacity: 0,
                transform: "scale(0.001)"
            },
            visibleStyle: {
                opacity: 1,
                transform: "scale(1)"
            }
        }, t(y.prototype, c.prototype), y.prototype.option = function(e) {
            t(this.options, e)
        }, y.prototype._create = function() {
            this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), t(this.element.style, this.options.containerStyle), this.options.isResizeBound && this.bindResize()
        }, y.prototype.reloadItems = function() {
            this.items = this._itemize(this.element.children)
        }, y.prototype._itemize = function(e) {
            for (var t = this._filterFindItemElements(e), n = this.constructor.Item, r = [], i = 0, s = t.length; s > i; i++) {
                var o = t[i], u = new n(o, this);
                r.push(u)
            }
            return r
        }, y.prototype._filterFindItemElements = function(e) {
            e = r(e);
            for (var t = this.options.itemSelector, n = [], i = 0, s = e.length; s > i; i++) {
                var o = e[i];
                if (h(o))
                    if (t) {
                        v(o, t) && n.push(o);
                        for (var u = o.querySelectorAll(t), a = 0, f = u.length; f > a; a++)
                            n.push(u[a])
                    } else
                        n.push(o)
            }
            return n
        }, y.prototype.getItemElements = function() {
            for (var e = [], t = 0, n = this.items.length; n > t; t++)
                e.push(this.items[t].element);
            return e
        }, y.prototype.layout = function() {
            this._resetLayout(), this._manageStamps();
            var e = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
            this.layoutItems(this.items, e), this._isLayoutInited=!0
        }, y.prototype._init = y.prototype.layout, y.prototype._resetLayout = function() {
            this.getSize()
        }, y.prototype.getSize = function() {
            this.size = p(this.element)
        }, y.prototype._getMeasurement = function(e, t) {
            var n, r = this.options[e];
            r ? ("string" == typeof r ? n = this.element.querySelector(r) : h(r) && (n = r), this[e] = n ? p(n)[t] : r) : this[e] = 0
        }, y.prototype.layoutItems = function(e, t) {
            e = this._getItemsForLayout(e), this._layoutItems(e, t), this._postLayout()
        }, y.prototype._getItemsForLayout = function(e) {
            for (var t = [], n = 0, r = e.length; r > n; n++) {
                var i = e[n];
                i.isIgnored || t.push(i)
            }
            return t
        }, y.prototype._layoutItems = function(e, t) {
            function n() {
                r.emitEvent("layoutComplete", [r, e])
            }
            var r = this;
            if (!e ||!e.length)
                return void n();
            this._itemsOn(e, "layout", n);
            for (var i = [], s = 0, o = e.length; o > s; s++) {
                var u = e[s], a = this._getItemLayoutPosition(u);
                a.item = u, a.isInstant = t || u.isLayoutInstant, i.push(a)
            }
            this._processLayoutQueue(i)
        }, y.prototype._getItemLayoutPosition = function() {
            return {
                x: 0,
                y: 0
            }
        }, y.prototype._processLayoutQueue = function(e) {
            for (var t = 0, n = e.length; n > t; t++) {
                var r = e[t];
                this._positionItem(r.item, r.x, r.y, r.isInstant)
            }
        }, y.prototype._positionItem = function(e, t, n, r) {
            r ? e.goTo(t, n) : e.moveTo(t, n)
        }, y.prototype._postLayout = function() {
            this.resizeContainer()
        }, y.prototype.resizeContainer = function() {
            if (this.options.isResizingContainer) {
                var e = this._getContainerSize();
                e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1))
            }
        }, y.prototype._getContainerSize = l, y.prototype._setContainerMeasure = function(e, t) {
            if (void 0 !== e) {
                var n = this.size;
                n.isBorderBox && (e += t ? n.paddingLeft + n.paddingRight + n.borderLeftWidth + n.borderRightWidth : n.paddingBottom + n.paddingTop + n.borderTopWidth + n.borderBottomWidth), e = Math.max(e, 0), this.element.style[t ? "width": "height"] = e + "px"
            }
        }, y.prototype._itemsOn = function(e, t, n) {
            function r() {
                return i++, i === s && n.call(o), !0
            }
            for (var i = 0, s = e.length, o = this, u = 0, a = e.length; a > u; u++) {
                var f = e[u];
                f.on(t, r)
            }
        }, y.prototype.ignore = function(e) {
            var t = this.getItem(e);
            t && (t.isIgnored=!0)
        }, y.prototype.unignore = function(e) {
            var t = this.getItem(e);
            t && delete t.isIgnored
        }, y.prototype.stamp = function(e) {
            if (e = this._find(e)) {
                this.stamps = this.stamps.concat(e);
                for (var t = 0, n = e.length; n > t; t++) {
                    var r = e[t];
                    this.ignore(r)
                }
            }
        }, y.prototype.unstamp = function(e) {
            if (e = this._find(e))
                for (var t = 0, n = e.length; n > t; t++) {
                    var r = e[t];
                    i(r, this.stamps), this.unignore(r)
                }
        }, y.prototype._find = function(e) {
            return e ? ("string" == typeof e && (e = this.element.querySelectorAll(e)), e = r(e)) : void 0
        }, y.prototype._manageStamps = function() {
            if (this.stamps && this.stamps.length) {
                this._getBoundingRect();
                for (var e = 0, t = this.stamps.length; t > e; e++) {
                    var n = this.stamps[e];
                    this._manageStamp(n)
                }
            }
        }, y.prototype._getBoundingRect = function() {
            var e = this.element.getBoundingClientRect(), t = this.size;
            this._boundingRect = {
                left: e.left + t.paddingLeft + t.borderLeftWidth,
                top: e.top + t.paddingTop + t.borderTopWidth,
                right: e.right - (t.paddingRight + t.borderRightWidth),
                bottom: e.bottom - (t.paddingBottom + t.borderBottomWidth)
            }
        }, y.prototype._manageStamp = l, y.prototype._getElementOffset = function(e) {
            var t = e.getBoundingClientRect(), n = this._boundingRect, r = p(e), i = {
                left: t.left - n.left - r.marginLeft,
                top: t.top - n.top - r.marginTop,
                right: n.right - t.right - r.marginRight,
                bottom: n.bottom - t.bottom - r.marginBottom
            };
            return i
        }, y.prototype.handleEvent = function(e) {
            var t = "on" + e.type;
            this[t] && this[t](e)
        }, y.prototype.bindResize = function() {
            this.isResizeBound || (n.bind(e, "resize", this), this.isResizeBound=!0)
        }, y.prototype.unbindResize = function() {
            this.isResizeBound && n.unbind(e, "resize", this), this.isResizeBound=!1
        }, y.prototype.onresize = function() {
            function e() {
                t.resize(), delete t.resizeTimeout
            }
            this.resizeTimeout && clearTimeout(this.resizeTimeout);
            var t = this;
            this.resizeTimeout = setTimeout(e, 100)
        }, y.prototype.resize = function() {
            this.isResizeBound && this.needsResizeLayout() && this.layout()
        }, y.prototype.needsResizeLayout = function() {
            var e = p(this.element), t = this.size && e;
            return t && e.innerWidth !== this.size.innerWidth
        }, y.prototype.addItems = function(e) {
            var t = this._itemize(e);
            return t.length && (this.items = this.items.concat(t)), t
        }, y.prototype.appended = function(e) {
            var t = this.addItems(e);
            t.length && (this.layoutItems(t, !0), this.reveal(t))
        }, y.prototype.prepended = function(e) {
            var t = this._itemize(e);
            if (t.length) {
                var n = this.items.slice(0);
                this.items = t.concat(n), this._resetLayout(), this._manageStamps(), this.layoutItems(t, !0), this.reveal(t), this.layoutItems(n)
            }
        }, y.prototype.reveal = function(e) {
            var t = e && e.length;
            if (t)
                for (var n = 0; t > n; n++) {
                    var r = e[n];
                    r.reveal()
                }
        }, y.prototype.hide = function(e) {
            var t = e && e.length;
            if (t)
                for (var n = 0; t > n; n++) {
                    var r = e[n];
                    r.hide()
                }
        }, y.prototype.getItem = function(e) {
            for (var t = 0, n = this.items.length; n > t; t++) {
                var r = this.items[t];
                if (r.element === e)
                    return r
            }
        }, y.prototype.getItems = function(e) {
            if (e && e.length) {
                for (var t = [], n = 0, r = e.length; r > n; n++) {
                    var i = e[n], s = this.getItem(i);
                    s && t.push(s)
                }
                return t
            }
        }, y.prototype.remove = function(e) {
            e = r(e);
            var t = this.getItems(e);
            if (t && t.length) {
                this._itemsOn(t, "remove", function() {
                    this.emitEvent("removeComplete", [this, t])
                });
                for (var n = 0, s = t.length; s > n; n++) {
                    var o = t[n];
                    o.remove(), i(o, this.items)
                }
            }
        }, y.prototype.destroy = function() {
            var e = this.element.style;
            e.height = "", e.position = "", e.width = "";
            for (var t = 0, n = this.items.length; n > t; t++) {
                var r = this.items[t];
                r.destroy()
            }
            this.unbindResize();
            var i = this.element.outlayerGUID;
            delete E[i], delete this.element.outlayerGUID, f && f.removeData(this.element, this.constructor.namespace)
        }, y.data = function(e) {
            var t = e && e.outlayerGUID;
            return t && E[t]
        }, y.create = function(e, n) {
            function r() {
                y.apply(this, arguments)
            }
            return Object.create ? r.prototype = Object.create(y.prototype) : t(r.prototype, y.prototype), r.prototype.constructor = r, r.defaults = t({}, y.defaults), t(r.defaults, n), r.prototype.settings = {}, r.namespace = e, r.data = y.data, r.Item = function() {
                g.apply(this, arguments)
            }, r.Item.prototype = new g, o(function() {
                for (var t = s(e), n = u.querySelectorAll(".js-" + t), i = "data-" + t + "-options", o = 0, l = n.length; l > o; o++) {
                    var c, h = n[o], p = h.getAttribute(i);
                    try {
                        c = p && JSON.parse(p)
                    } catch (v) {
                        a && a.error("Error parsing " + i + " on " + h.nodeName.toLowerCase() + (h.id ? "#" + h.id : "") + ": " + v);
                        continue
                    }
                    var m = new r(h, c);
                    f && f.data(h, e, m)
                }
            }), f && f.bridget && f.bridget(e, r), r
        }, y.Item = g, y
    }
    var u = e.document, a = e.console, f = e.jQuery, l = function() {}, c = Object.prototype.toString, h = "function" == typeof HTMLElement || "object" == typeof HTMLElement ? function(e) {
        return e instanceof HTMLElement
    }
        : function(e) {
        return e && "object" == typeof e && 1 === e.nodeType && "string" == typeof e.nodeName
    }, p = Array.prototype.indexOf ? function(e, t) {
        return e.indexOf(t)
    }
        : function(e, t) {
        for (var n = 0, r = e.length; r > n; n++)
            if (e[n] === t)
                return n;
        return - 1
    };
    "function" == typeof define && define.amd ? define("outlayer/outlayer", ["../../node_modules/eventie/eventie", "doc-ready/doc-ready", "eventEmitter/EventEmitter", "get-size/get-size", "matches-selector/matches-selector", "./item"], o) : "object" == typeof exports ? module.exports = o(require("eventie"), require("doc-ready"), require("wolfy87-eventemitter"), require("get-size"), require("desandro-matches-selector")) : e.Outlayer = o(e.eventie, e.docReady, e.EventEmitter, e.getSize, e.matchesSelector, e.Outlayer.Item)
}(window), function(e) {
    function t(e, t) {
        var r = e.create("masonry");
        return r.prototype._resetLayout = function() {
            this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns();
            var e = this.cols;
            for (this.colYs = []; e--;)
                this.colYs.push(0);
            this.maxY = 0
        }, r.prototype.measureColumns = function() {
            if (this.getContainerWidth(), !this.columnWidth) {
                var e = this.items[0], n = e && e.element;
                this.columnWidth = n && t(n).outerWidth || this.containerWidth
            }
            this.columnWidth += this.gutter, this.cols = Math.floor((this.containerWidth + this.gutter) / this.columnWidth), this.cols = Math.max(this.cols, 1)
        }, r.prototype.getContainerWidth = function() {
            var e = this.options.isFitWidth ? this.element.parentNode: this.element, n = t(e);
            this.containerWidth = n && n.innerWidth
        }, r.prototype._getItemLayoutPosition = function(e) {
            e.getSize();
            var t = e.size.outerWidth%this.columnWidth, r = t && 1 > t ? "round": "ceil", i = Math[r](e.size.outerWidth / this.columnWidth);
            i = Math.min(i, this.cols);
            for (var s = this._getColGroup(i), o = Math.min.apply(Math, s), u = n(s, o), a = {
                x: this.columnWidth * u,
                y: o
            }, f = o + e.size.outerHeight, l = this.cols + 1 - s.length, h = 0; l > h; h++)
                this.colYs[u + h] = f;
            return a
        }, r.prototype._getColGroup = function(e) {
            if (2 > e)
                return this.colYs;
            for (var t = [], n = this.cols + 1 - e, r = 0; n > r; r++) {
                var i = this.colYs.slice(r, r + e);
                t[r] = Math.max.apply(Math, i)
            }
            return t
        }, r.prototype._manageStamp = function(e) {
            var n = t(e), r = this._getElementOffset(e), i = this.options.isOriginLeft ? r.left: r.right, s = i + n.outerWidth, o = Math.floor(i / this.columnWidth);
            o = Math.max(0, o);
            var u = Math.floor(s / this.columnWidth);
            u -= s%this.columnWidth ? 0 : 1, u = Math.min(this.cols - 1, u);
            for (var a = (this.options.isOriginTop ? r.top : r.bottom) + n.outerHeight, f = o; u >= f; f++)
                this.colYs[f] = Math.max(a, this.colYs[f])
        }, r.prototype._getContainerSize = function() {
            this.maxY = Math.max.apply(Math, this.colYs);
            var e = {
                height: this.maxY
            };
            return this.options.isFitWidth && (e.width = this._getContainerFitWidth()), e
        }, r.prototype._getContainerFitWidth = function() {
            for (var e = 0, t = this.cols; --t && 0 === this.colYs[t];)
                e++;
            return (this.cols - e) * this.columnWidth - this.gutter
        }, r.prototype.needsResizeLayout = function() {
            var e = this.containerWidth;
            return this.getContainerWidth(), e !== this.containerWidth
        }, r
    }
    var n = Array.prototype.indexOf ? function(e, t) {
        return e.indexOf(t)
    }
        : function(e, t) {
        for (var n = 0, r = e.length; r > n; n++) {
            var i = e[n];
            if (i === t)
                return n
        }
        return - 1
    };
    "function" == typeof define && define.amd ? define(["../../node_modules/outlayer/outlayer", "get-size/get-size"], t) : "object" == typeof exports ? module.exports = t(require("outlayer"), require("get-size")) : e.Masonry = t(e.Outlayer, e.getSize)
}(window);

