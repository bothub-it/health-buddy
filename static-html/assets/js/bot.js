! function(t) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
    else if ("function" == typeof define && define.amd) define([], t);
    else {
        var e;
        e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, e.socketCluster = t()
    }
}(function() {
    var t;
    return function t(e, r, n) {
        function o(s, a) {
            if (!r[s]) {
                if (!e[s]) {
                    var c = "function" == typeof require && require;
                    if (!a && c) return c(s, !0);
                    if (i) return i(s, !0);
                    var u = new Error("Cannot find module '" + s + "'");
                    throw u.code = "MODULE_NOT_FOUND", u
                }
                var h = r[s] = {
                    exports: {}
                };
                e[s][0].call(h.exports, function(t) {
                    var r = e[s][1][t];
                    return o(r || t)
                }, h, h.exports, t, e, r, n)
            }
            return r[s].exports
        }
        for (var i = "function" == typeof require && require, s = 0; s < n.length; s++) o(n[s]);
        return o
    }({
        1: [function(t, e) {
            var r = t("component-emitter"),
                n = function(t, e, n) {
                    r.call(this), this.PENDING = "pending", this.SUBSCRIBED = "subscribed", this.UNSUBSCRIBED = "unsubscribed", this.name = t, this.state = this.UNSUBSCRIBED, this.client = e, this.options = n || {}, this.setOptions(this.options)
                };
            n.prototype = Object.create(r.prototype), n.prototype.setOptions = function(t) {
                t || (t = {}), this.waitForAuth = t.waitForAuth || !1, this.batch = t.batch || !1, void 0 !== t.data && (this.data = t.data)
            }, n.prototype.getState = function() {
                return this.state
            }, n.prototype.subscribe = function(t) {
                this.client.subscribe(this.name, t)
            }, n.prototype.unsubscribe = function() {
                this.client.unsubscribe(this.name)
            }, n.prototype.isSubscribed = function(t) {
                return this.client.isSubscribed(this.name, t)
            }, n.prototype.publish = function(t, e) {
                this.client.publish(this.name, t, e)
            }, n.prototype.watch = function(t) {
                this.client.watch(this.name, t)
            }, n.prototype.unwatch = function(t) {
                this.client.unwatch(this.name, t)
            }, n.prototype.watchers = function() {
                return this.client.watchers(this.name)
            }, n.prototype.destroy = function() {
                this.client.destroyChannel(this.name)
            }, e.exports.SCChannel = n
        }, {
            "component-emitter": 2
        }],
        2: [function(t, e) {
            function r(t) {
                if (t) return n(t)
            }

            function n(t) {
                for (var e in r.prototype) t[e] = r.prototype[e];
                return t
            }
            void 0 !== e && (e.exports = r), r.prototype.on = r.prototype.addEventListener = function(t, e) {
                return this._callbacks = this._callbacks || {}, (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e), this
            }, r.prototype.once = function(t, e) {
                function r() {
                    this.off(t, r), e.apply(this, arguments)
                }
                return r.fn = e, this.on(t, r), this
            }, r.prototype.off = r.prototype.removeListener = r.prototype.removeAllListeners = r.prototype.removeEventListener = function(t, e) {
                if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
                var r = this._callbacks["$" + t];
                if (!r) return this;
                if (1 == arguments.length) return delete this._callbacks["$" + t], this;
                for (var n, o = 0; o < r.length; o++)
                    if ((n = r[o]) === e || n.fn === e) {
                        r.splice(o, 1);
                        break
                    }
                return this
            }, r.prototype.emit = function(t) {
                this._callbacks = this._callbacks || {};
                var e = [].slice.call(arguments, 1),
                    r = this._callbacks["$" + t];
                if (r) {
                    r = r.slice(0);
                    for (var n = 0, o = r.length; n < o; ++n) r[n].apply(this, e)
                }
                return this
            }, r.prototype.listeners = function(t) {
                return this._callbacks = this._callbacks || {}, this._callbacks["$" + t] || []
            }, r.prototype.hasListeners = function(t) {
                return !!this.listeners(t).length
            }
        }, {}],
        3: [function(t, e) {
            var r = t("./lib/scsocket"),
                n = t("./lib/scsocketcreator");
            e.exports.SCSocketCreator = n, e.exports.SCSocket = r, e.exports.Emitter = t("component-emitter"), e.exports.connect = function(t) {
                return n.connect(t)
            }, e.exports.destroy = function(t) {
                return n.destroy(t)
            }, e.exports.connections = n.connections, e.exports.version = "9.0.0"
        }, {
            "./lib/scsocket": 6,
            "./lib/scsocketcreator": 7,
            "component-emitter": 14
        }],
        4: [function(t, e) {
            (function(t) {
                var r = function() {
                    this._internalStorage = {}, this.isLocalStorageEnabled = this._checkLocalStorageEnabled()
                };
                r.prototype._checkLocalStorageEnabled = function() {
                    var e;
                    try {
                        t.localStorage, t.localStorage.setItem("__scLocalStorageTest", 1), t.localStorage.removeItem("__scLocalStorageTest")
                    } catch (t) {
                        e = t
                    }
                    return !e
                }, r.prototype.saveToken = function(e, r, n, o) {
                    this.isLocalStorageEnabled && t.localStorage ? t.localStorage.setItem(e, r) : this._internalStorage[e] = r, o && o(null, r)
                }, r.prototype.removeToken = function(e, r) {
                    var n;
                    this.loadToken(e, function(t, e) {
                        n = e
                    }), this.isLocalStorageEnabled && t.localStorage ? t.localStorage.removeItem(e) : delete this._internalStorage[e], r && r(null, n)
                }, r.prototype.loadToken = function(e, r) {
                    var n;
                    n = this.isLocalStorageEnabled && t.localStorage ? t.localStorage.getItem(e) : this._internalStorage[e] || null, r(null, n)
                }, e.exports.AuthEngine = r
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}],
        5: [function(t, e) {
            var r = t("sc-errors"),
                n = r.InvalidActionError,
                o = function(t, e) {
                    this.socket = t, this.id = e, this.sent = !1
                };
            o.prototype._respond = function(t) {
                if (this.sent) throw new n("Response " + this.id + " has already been sent");
                this.sent = !0, this.socket.send(this.socket.encode(t))
            }, o.prototype.end = function(t) {
                if (this.id) {
                    var e = {
                        rid: this.id
                    };
                    void 0 !== t && (e.data = t), this._respond(e)
                }
            }, o.prototype.error = function(t, e) {
                if (this.id) {
                    var n = r.dehydrateError(t),
                        o = {
                            rid: this.id,
                            error: n
                        };
                    void 0 !== e && (o.data = e), this._respond(o)
                }
            }, o.prototype.callback = function(t, e) {
                t ? this.error(t, e) : this.end(e)
            }, e.exports.Response = o
        }, {
            "sc-errors": 22
        }],
        6: [function(t, e) {
            (function(r, n) {
                var o = t("component-emitter"),
                    i = t("sc-channel").SCChannel;
                t("./response").Response;
                var s = t("./auth").AuthEngine,
                    a = t("sc-formatter"),
                    c = t("./sctransport").SCTransport,
                    u = t("querystring"),
                    h = t("linked-list"),
                    p = t("base-64"),
                    l = t("clone"),
                    f = t("sc-errors"),
                    d = f.InvalidArgumentsError,
                    y = f.InvalidMessageError,
                    g = f.SocketProtocolError,
                    m = f.TimeoutError,
                    b = f.BadConnectionError,
                    v = "undefined" != typeof window,
                    E = function(t) {
                        var e = this;
                        o.call(this), this.id = null, this.state = this.CLOSED, this.authState = this.UNAUTHENTICATED, this.signedAuthToken = null, this.authToken = null, this.pendingReconnect = !1, this.pendingReconnectTimeout = null, this.preparingPendingSubscriptions = !1, this.connectTimeout = t.connectTimeout, this.ackTimeout = t.ackTimeout, this.channelPrefix = t.channelPrefix || null, this.disconnectOnUnload = null == t.disconnectOnUnload || t.disconnectOnUnload, this.authTokenName = t.authTokenName, this.pingTimeout = this.ackTimeout;
                        var n = Math.pow(2, 31) - 1,
                            i = function(t) {
                                if (e[t] > n) throw new d("The " + t + " value provided exceeded the maximum amount allowed")
                            };
                        if (i("connectTimeout"), i("ackTimeout"), i("pingTimeout"), this._localEvents = {
                                connect: 1,
                                connectAbort: 1,
                                close: 1,
                                disconnect: 1,
                                message: 1,
                                error: 1,
                                raw: 1,
                                fail: 1,
                                kickOut: 1,
                                subscribe: 1,
                                unsubscribe: 1,
                                subscribeStateChange: 1,
                                authStateChange: 1,
                                authenticate: 1,
                                deauthenticate: 1,
                                removeAuthToken: 1,
                                subscribeRequest: 1
                            }, this.connectAttempts = 0, this._emitBuffer = new h, this.channels = {}, this.options = t, this._cid = 1, this.options.callIdGenerator = function() {
                                return e._cid++
                            }, this.options.autoReconnect) {
                            null == this.options.autoReconnectOptions && (this.options.autoReconnectOptions = {});
                            var c = this.options.autoReconnectOptions;
                            null == c.initialDelay && (c.initialDelay = 1e4), null == c.randomness && (c.randomness = 1e4), null == c.multiplier && (c.multiplier = 1.5), null == c.maxDelay && (c.maxDelay = 6e4)
                        }
                        null == this.options.subscriptionRetryOptions && (this.options.subscriptionRetryOptions = {}), this.options.authEngine ? this.auth = this.options.authEngine : this.auth = new s, this.options.codecEngine ? this.codec = this.options.codecEngine : this.codec = a, this.options.path = this.options.path.replace(/\/$/, "") + "/", this.options.query = t.query || {}, "string" == typeof this.options.query && (this.options.query = u.parse(this.options.query)), this.options.autoConnect && this.connect(), this._channelEmitter = new o, v && this.disconnectOnUnload && r.addEventListener && (this._unloadHandler = function() {
                            e.disconnect()
                        }, r.addEventListener("beforeunload", this._unloadHandler, !1))
                    };
                E.prototype = Object.create(o.prototype), E.CONNECTING = E.prototype.CONNECTING = c.prototype.CONNECTING, E.OPEN = E.prototype.OPEN = c.prototype.OPEN, E.CLOSED = E.prototype.CLOSED = c.prototype.CLOSED, E.AUTHENTICATED = E.prototype.AUTHENTICATED = "authenticated", E.UNAUTHENTICATED = E.prototype.UNAUTHENTICATED = "unauthenticated", E.PENDING = E.prototype.PENDING = "pending", E.ignoreStatuses = f.socketProtocolIgnoreStatuses, E.errorStatuses = f.socketProtocolErrorStatuses, E.prototype._privateEventHandlerMap = {
                    "#publish": function(t) {
                        var e = this._undecorateChannelName(t.channel);
                        this.isSubscribed(e, !0) && this._channelEmitter.emit(e, t.data)
                    },
                    "#kickOut": function(t) {
                        var e = this._undecorateChannelName(t.channel),
                            r = this.channels[e];
                        r && (o.prototype.emit.call(this, "kickOut", t.message, e), r.emit("kickOut", t.message, e), this._triggerChannelUnsubscribe(r))
                    },
                    "#setAuthToken": function(t, e) {
                        var r = this;
                        if (t) {
                            var n = function(n) {
                                n ? (e.error(n), r._onSCError(n)) : (r._changeToAuthenticatedState(t.token), e.end())
                            };
                            this.auth.saveToken(this.authTokenName, t.token, {}, n)
                        } else e.error(new y("No token data provided by #setAuthToken event"))
                    },
                    "#removeAuthToken": function(t, e) {
                        var r = this;
                        this.auth.removeToken(this.authTokenName, function(t, n) {
                            t ? (e.error(t), r._onSCError(t)) : (o.prototype.emit.call(r, "removeAuthToken", n), r._changeToUnauthenticatedStateAndClearTokens(), e.end())
                        })
                    },
                    "#disconnect": function(t) {
                        this.transport.close(t.code, t.data)
                    }
                }, E.prototype.getState = function() {
                    return this.state
                }, E.prototype.getBytesReceived = function() {
                    return this.transport.getBytesReceived()
                }, E.prototype.deauthenticate = function(t) {
                    var e = this;
                    this.auth.removeToken(this.authTokenName, function(r, n) {
                        r ? e._onSCError(r) : (o.prototype.emit.call(e, "removeAuthToken", n), e.state != e.CLOSED && e.emit("#removeAuthToken"), e._changeToUnauthenticatedStateAndClearTokens()), t && t(r)
                    })
                }, E.prototype.connect = E.prototype.open = function() {
                    var t = this;
                    this.state == this.CLOSED && (this.pendingReconnect = !1, this.pendingReconnectTimeout = null, clearTimeout(this._reconnectTimeoutRef), this.state = this.CONNECTING, o.prototype.emit.call(this, "connecting"), this.transport && this.transport.off(), this.transport = new c(this.auth, this.codec, this.options), this.transport.on("open", function(e) {
                        t.state = t.OPEN, t._onSCOpen(e)
                    }), this.transport.on("error", function(e) {
                        t._onSCError(e)
                    }), this.transport.on("close", function(e, r) {
                        t.state = t.CLOSED, t._onSCClose(e, r)
                    }), this.transport.on("openAbort", function(e, r) {
                        t.state = t.CLOSED, t._onSCClose(e, r, !0)
                    }), this.transport.on("event", function(e, r, n) {
                        t._onSCEvent(e, r, n)
                    }))
                }, E.prototype.reconnect = function() {
                    this.disconnect(), this.connect()
                }, E.prototype.disconnect = function(t, e) {
                    if ("number" != typeof(t = t || 1e3)) throw new d("If specified, the code argument must be a number");
                    this.state == this.OPEN || this.state == this.CONNECTING ? this.transport.close(t, e) : (this.pendingReconnect = !1, this.pendingReconnectTimeout = null, clearTimeout(this._reconnectTimeoutRef))
                }, E.prototype.destroy = function() {
                    this._unloadHandler && r.removeEventListener("beforeunload", this._unloadHandler, !1), this.disconnect()
                }, E.prototype._changeToUnauthenticatedStateAndClearTokens = function() {
                    if (this.authState != this.UNAUTHENTICATED) {
                        var t = this.authState;
                        this.authState = this.UNAUTHENTICATED, this.signedAuthToken = null, this.authToken = null;
                        var e = {
                            oldState: t,
                            newState: this.authState
                        };
                        o.prototype.emit.call(this, "authStateChange", e), t == this.AUTHENTICATED && o.prototype.emit.call(this, "deauthenticate"), o.prototype.emit.call(this, "authTokenChange", this.signedAuthToken)
                    }
                }, E.prototype._changeToAuthenticatedState = function(t) {
                    if (this.signedAuthToken = t, this.authToken = this._extractAuthTokenData(t), this.authState != this.AUTHENTICATED) {
                        var e = this.authState;
                        this.authState = this.AUTHENTICATED;
                        var r = {
                            oldState: e,
                            newState: this.authState,
                            signedAuthToken: t,
                            authToken: this.authToken
                        };
                        this.preparingPendingSubscriptions || this.processPendingSubscriptions(), o.prototype.emit.call(this, "authStateChange", r), o.prototype.emit.call(this, "authenticate", t)
                    }
                    o.prototype.emit.call(this, "authTokenChange", t)
                }, E.prototype.decodeBase64 = function(t) {
                    var e;
                    if (void 0 === n) e = r.atob ? r.atob(t) : p.decode(t);
                    else {
                        e = new n(t, "base64").toString("utf8")
                    }
                    return e
                }, E.prototype.encodeBase64 = function(t) {
                    var e;
                    if (void 0 === n) e = r.btoa ? r.btoa(t) : p.encode(t);
                    else {
                        e = new n(t, "utf8").toString("base64")
                    }
                    return e
                }, E.prototype._extractAuthTokenData = function(t) {
                    var e = (t || "").split("."),
                        r = e[1];
                    if (null != r) {
                        var n = r;
                        try {
                            return n = this.decodeBase64(n), JSON.parse(n)
                        } catch (t) {
                            return n
                        }
                    }
                    return null
                }, E.prototype.getAuthToken = function() {
                    return this.authToken
                }, E.prototype.getSignedAuthToken = function() {
                    return this.signedAuthToken
                }, E.prototype.authenticate = function(t, e) {
                    var r = this;
                    this.emit("#authenticate", t, function(n, o) {
                        o && null != o.isAuthenticated ? o.authError && (o.authError = f.hydrateError(o.authError)) : o = {
                            isAuthenticated: r.authState,
                            authError: null
                        }, n ? ("BadConnectionError" != n.name && "TimeoutError" != n.name && r._changeToUnauthenticatedStateAndClearTokens(), e && e(n, o)) : r.auth.saveToken(r.authTokenName, t, {}, function(n) {
                            n && r._onSCError(n), o.isAuthenticated ? r._changeToAuthenticatedState(t) : r._changeToUnauthenticatedStateAndClearTokens(), e && e(n, o)
                        })
                    })
                }, E.prototype._tryReconnect = function(t) {
                    var e, r = this,
                        n = this.connectAttempts++,
                        o = this.options.autoReconnectOptions;
                    if (null == t || n > 0) {
                        var i = Math.round(o.initialDelay + (o.randomness || 0) * Math.random());
                        e = Math.round(i * Math.pow(o.multiplier, n))
                    } else e = t;
                    e > o.maxDelay && (e = o.maxDelay), clearTimeout(this._reconnectTimeoutRef), this.pendingReconnect = !0, this.pendingReconnectTimeout = e, this._reconnectTimeoutRef = setTimeout(function() {
                        r.connect()
                    }, e)
                }, E.prototype._onSCOpen = function(t) {
                    var e = this;
                    this.preparingPendingSubscriptions = !0, t ? (this.id = t.id, this.pingTimeout = t.pingTimeout, this.transport.pingTimeout = this.pingTimeout, t.isAuthenticated ? this._changeToAuthenticatedState(t.authToken) : this._changeToUnauthenticatedStateAndClearTokens()) : this._changeToUnauthenticatedStateAndClearTokens(), this.connectAttempts = 0, this.options.autoSubscribeOnConnect && this.processPendingSubscriptions(), o.prototype.emit.call(this, "connect", t, function() {
                        e.processPendingSubscriptions()
                    }), this._flushEmitBuffer()
                }, E.prototype._onSCError = function(t) {
                    var e = this;
                    setTimeout(function() {
                        if (e.listeners("error").length < 1) throw t;
                        o.prototype.emit.call(e, "error", t)
                    }, 0)
                }, E.prototype._suspendSubscriptions = function() {
                    var t, e;
                    for (var r in this.channels) this.channels.hasOwnProperty(r) && (t = this.channels[r], e = t.state == t.SUBSCRIBED || t.state == t.PENDING ? t.PENDING : t.UNSUBSCRIBED, this._triggerChannelUnsubscribe(t, e))
                }, E.prototype._abortAllPendingEventsDueToBadConnection = function(t) {
                    for (var e, r = this._emitBuffer.head; r;) {
                        e = r.next;
                        var n = r.data;
                        clearTimeout(n.timeout), delete n.timeout, r.detach(), r = e;
                        var o = n.callback;
                        if (o) {
                            delete n.callback;
                            var i = "Event '" + n.event + "' was aborted due to a bad connection",
                                s = new b(i, t);
                            o.call(n, s, n)
                        }
                    }
                }, E.prototype._onSCClose = function(t, e, r) {
                    var n = this;
                    if (this.id = null, this.transport && this.transport.off(), this.pendingReconnect = !1, this.pendingReconnectTimeout = null, clearTimeout(this._reconnectTimeoutRef), this._suspendSubscriptions(), this._abortAllPendingEventsDueToBadConnection(r ? "connectAbort" : "disconnect"), this.options.autoReconnect && (4e3 == t || 4001 == t || 1005 == t ? this._tryReconnect(0) : 1e3 != t && t < 4500 && this._tryReconnect()), r ? o.prototype.emit.call(n, "connectAbort", t, e) : o.prototype.emit.call(n, "disconnect", t, e), o.prototype.emit.call(n, "close", t, e), !E.ignoreStatuses[t]) {
                        var i;
                        i = e ? "Socket connection failed: " + e : "Socket connection failed for unknown reasons";
                        var s = new g(E.errorStatuses[t] || i, t);
                        this._onSCError(s)
                    }
                }, E.prototype._onSCEvent = function(t, e, r) {
                    var n = this._privateEventHandlerMap[t];
                    n ? n.call(this, e, r) : o.prototype.emit.call(this, t, e, function() {
                        r && r.callback.apply(r, arguments)
                    })
                }, E.prototype.decode = function(t) {
                    return this.transport.decode(t)
                }, E.prototype.encode = function(t) {
                    return this.transport.encode(t)
                }, E.prototype._flushEmitBuffer = function() {
                    for (var t, e = this._emitBuffer.head; e;) {
                        t = e.next;
                        var r = e.data;
                        e.detach(), this.transport.emitObject(r), e = t
                    }
                }, E.prototype._handleEventAckTimeout = function(t, e) {
                    e && e.detach(), delete t.timeout;
                    var r = t.callback;
                    if (r) {
                        delete t.callback;
                        var n = new m("Event response for '" + t.event + "' timed out");
                        r.call(t, n, t)
                    }
                }, E.prototype._emit = function(t, e, r) {
                    var n = this;
                    this.state == this.CLOSED && this.connect();
                    var o = {
                            event: t,
                            callback: r
                        },
                        i = new h.Item;
                    this.options.cloneData ? o.data = l(e) : o.data = e, i.data = o, o.timeout = setTimeout(function() {
                        n._handleEventAckTimeout(o, i)
                    }, this.ackTimeout), this._emitBuffer.append(i), this.state == this.OPEN && this._flushEmitBuffer()
                }, E.prototype.send = function(t) {
                    this.transport.send(t)
                }, E.prototype.emit = function(t, e, r) {
                    null == this._localEvents[t] ? this._emit(t, e, r) : o.prototype.emit.call(this, t, e)
                }, E.prototype.publish = function(t, e, r) {
                    var n = {
                        channel: this._decorateChannelName(t),
                        data: e
                    };
                    this.emit("#publish", n, r)
                }, E.prototype._triggerChannelSubscribe = function(t, e) {
                    var r = t.name;
                    if (t.state != t.SUBSCRIBED) {
                        var n = t.state;
                        t.state = t.SUBSCRIBED;
                        var i = {
                            channel: r,
                            oldState: n,
                            newState: t.state,
                            subscriptionOptions: e
                        };
                        t.emit("subscribeStateChange", i), t.emit("subscribe", r, e), o.prototype.emit.call(this, "subscribeStateChange", i), o.prototype.emit.call(this, "subscribe", r, e)
                    }
                }, E.prototype._triggerChannelSubscribeFail = function(t, e, r) {
                    var n = e.name,
                        i = !e.waitForAuth || this.authState == this.AUTHENTICATED;
                    e.state != e.UNSUBSCRIBED && i && (e.state = e.UNSUBSCRIBED, e.emit("subscribeFail", t, n, r), o.prototype.emit.call(this, "subscribeFail", t, n, r))
                }, E.prototype._cancelPendingSubscribeCallback = function(t) {
                    null != t._pendingSubscriptionCid && (this.transport.cancelPendingResponse(t._pendingSubscriptionCid), delete t._pendingSubscriptionCid)
                }, E.prototype._decorateChannelName = function(t) {
                    return this.channelPrefix && (t = this.channelPrefix + t), t
                }, E.prototype._undecorateChannelName = function(t) {
                    return this.channelPrefix && 0 == t.indexOf(this.channelPrefix) ? t.replace(this.channelPrefix, "") : t
                }, E.prototype._trySubscribe = function(t) {
                    var e = this,
                        r = !t.waitForAuth || this.authState == this.AUTHENTICATED;
                    if (this.state == this.OPEN && !this.preparingPendingSubscriptions && null == t._pendingSubscriptionCid && r) {
                        var n = {
                                noTimeout: !0
                            },
                            i = {
                                channel: this._decorateChannelName(t.name)
                            };
                        t.waitForAuth && (n.waitForAuth = !0, i.waitForAuth = n.waitForAuth), t.data && (i.data = t.data), t.batch && (n.batch = !0, i.batch = !0), t._pendingSubscriptionCid = this.transport.emit("#subscribe", i, n, function(r) {
                            delete t._pendingSubscriptionCid, r ? e._triggerChannelSubscribeFail(r, t, i) : e._triggerChannelSubscribe(t, i)
                        }), o.prototype.emit.call(this, "subscribeRequest", t.name, i)
                    }
                }, E.prototype.subscribe = function(t, e) {
                    var r = this.channels[t];
                    return r ? e && r.setOptions(e) : (r = new i(t, this, e), this.channels[t] = r), r.state == r.UNSUBSCRIBED && (r.state = r.PENDING, this._trySubscribe(r)), r
                }, E.prototype._triggerChannelUnsubscribe = function(t, e) {
                    var r = t.name,
                        n = t.state;
                    if (t.state = e || t.UNSUBSCRIBED, this._cancelPendingSubscribeCallback(t), n == t.SUBSCRIBED) {
                        var i = {
                            channel: r,
                            oldState: n,
                            newState: t.state
                        };
                        t.emit("subscribeStateChange", i), t.emit("unsubscribe", r), o.prototype.emit.call(this, "subscribeStateChange", i), o.prototype.emit.call(this, "unsubscribe", r)
                    }
                }, E.prototype._tryUnsubscribe = function(t) {
                    if (this.state == this.OPEN) {
                        var e = {
                            noTimeout: !0
                        };
                        t.batch && (e.batch = !0), this._cancelPendingSubscribeCallback(t);
                        var r = this._decorateChannelName(t.name);
                        this.transport.emit("#unsubscribe", r, e)
                    }
                }, E.prototype.unsubscribe = function(t) {
                    var e = this.channels[t];
                    e && e.state != e.UNSUBSCRIBED && (this._triggerChannelUnsubscribe(e), this._tryUnsubscribe(e))
                }, E.prototype.channel = function(t, e) {
                    var r = this.channels[t];
                    return r || (r = new i(t, this, e), this.channels[t] = r), r
                }, E.prototype.destroyChannel = function(t) {
                    var e = this.channels[t];
                    e.unwatch(), e.unsubscribe(), delete this.channels[t]
                }, E.prototype.subscriptions = function(t) {
                    var e, r = [];
                    for (var n in this.channels) this.channels.hasOwnProperty(n) && (e = this.channels[n], (t ? e && (e.state == e.SUBSCRIBED || e.state == e.PENDING) : e && e.state == e.SUBSCRIBED) && r.push(n));
                    return r
                }, E.prototype.isSubscribed = function(t, e) {
                    var r = this.channels[t];
                    return e ? !!r && (r.state == r.SUBSCRIBED || r.state == r.PENDING) : !!r && r.state == r.SUBSCRIBED
                }, E.prototype.processPendingSubscriptions = function() {
                    var t = this;
                    this.preparingPendingSubscriptions = !1;
                    var e = [];
                    for (var r in this.channels)
                        if (this.channels.hasOwnProperty(r)) {
                            var n = this.channels[r];
                            n.state == n.PENDING && e.push(n)
                        }
                    e.sort(function(t, e) {
                        var r = t.priority || 0,
                            n = e.priority || 0;
                        return r > n ? -1 : r < n ? 1 : 0
                    }), e.forEach(function(e) {
                        t._trySubscribe(e)
                    })
                }, E.prototype.watch = function(t, e) {
                    if ("function" != typeof e) throw new d("No handler function was provided");
                    this._channelEmitter.on(t, e)
                }, E.prototype.unwatch = function(t, e) {
                    e ? this._channelEmitter.removeListener(t, e) : this._channelEmitter.removeAllListeners(t)
                }, E.prototype.watchers = function(t) {
                    return this._channelEmitter.listeners(t)
                }, e.exports = E
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, t("buffer").Buffer)
        }, {
            "./auth": 4,
            "./response": 5,
            "./sctransport": 8,
            "base-64": 10,
            buffer: 12,
            clone: 13,
            "component-emitter": 14,
            "linked-list": 17,
            querystring: 20,
            "sc-channel": 1,
            "sc-errors": 22,
            "sc-formatter": 23
        }],
        7: [function(t, e) {
            (function(r) {
                function n(t) {
                    var e = t.secure ? "https://" : "http://",
                        r = "";
                    if (t.query)
                        if ("string" == typeof t.query) r = t.query;
                        else {
                            var n = [],
                                o = t.query;
                            for (var i in o) o.hasOwnProperty(i) && n.push(i + "=" + o[i]);
                            n.length && (r = "?" + n.join("&"))
                        }
                    var s;
                    return s = t.host ? t.host : t.hostname + ":" + t.port, e + s + t.path + r
                }

                function o() {
                    return r.location && "https:" == location.protocol
                }

                function i(t, e) {
                    var n = null == t.secure ? e : t.secure;
                    return t.port || (r.location && location.port ? location.port : n ? 443 : 80)
                }
                var s = t("./scsocket"),
                    a = t("sc-errors"),
                    c = a.InvalidArgumentsError,
                    u = {};
                e.exports = {
                    connect: function(t) {
                        if (t = t || {}, t.host && t.port) throw new c("The host option should already include the port number in the format hostname:port - Because of this, the host and port options cannot be specified together; use the hostname option instead");
                        var e = o(),
                            a = {
                                port: i(t, e),
                                hostname: r.location && location.hostname,
                                path: "/socketcluster/",
                                secure: e,
                                autoConnect: !0,
                                autoReconnect: !0,
                                autoSubscribeOnConnect: !0,
                                connectTimeout: 2e4,
                                ackTimeout: 1e4,
                                timestampRequests: !1,
                                timestampParam: "t",
                                authEngine: null,
                                authTokenName: "socketCluster.authToken",
                                binaryType: "arraybuffer",
                                multiplex: !0,
                                pubSubBatchDuration: null,
                                cloneData: !1
                            };
                        for (var h in t) t.hasOwnProperty(h) && (a[h] = t[h]);
                        var p = n(a);
                        return !1 === a.multiplex ? new s(a) : (u[p] ? u[p].connect() : u[p] = new s(a), u[p])
                    },
                    destroy: function(t) {
                        t = t || {};
                        var e = o(),
                            s = {
                                port: i(t, e),
                                hostname: r.location && location.hostname,
                                path: "/socketcluster/",
                                secure: e
                            };
                        for (var a in t) t.hasOwnProperty(a) && (s[a] = t[a]);
                        var c = n(s),
                            h = u[c];
                        h && h.destroy(), delete u[c]
                    },
                    connections: u
                }
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            "./scsocket": 6,
            "sc-errors": 22
        }],
        8: [function(t, e) {
            (function(r) {
                var n, o, i = t("component-emitter"),
                    s = t("./response").Response,
                    a = t("querystring");
                r.WebSocket ? (n = r.WebSocket, o = function(t) {
                    return new n(t)
                }) : (n = t("ws"), o = function(t, e) {
                    return new n(t, null, e)
                });
                var c = t("sc-errors"),
                    u = c.TimeoutError,
                    h = c.BadConnectionError,
                    p = function(t, e, r) {
                        this.state = this.CLOSED, this.auth = t, this.codec = e, this.options = r, this.connectTimeout = r.connectTimeout, this.pingTimeout = r.ackTimeout, this.callIdGenerator = r.callIdGenerator, this.authTokenName = r.authTokenName, this._pingTimeoutTicker = null, this._callbackMap = {}, this._batchSendList = [], this.open()
                    };
                p.prototype = Object.create(i.prototype), p.CONNECTING = p.prototype.CONNECTING = "connecting", p.OPEN = p.prototype.OPEN = "open", p.CLOSED = p.prototype.CLOSED = "closed", p.prototype.uri = function() {
                    var t = this.options.query || {},
                        e = this.options.secure ? "wss" : "ws";
                    this.options.timestampRequests && (t[this.options.timestampParam] = (new Date).getTime()), t = a.encode(t), t.length && (t = "?" + t);
                    var r;
                    if (this.options.host) r = this.options.host;
                    else {
                        var n = "";
                        this.options.port && ("wss" == e && 443 != this.options.port || "ws" == e && 80 != this.options.port) && (n = ":" + this.options.port), r = this.options.hostname + n
                    }
                    return e + "://" + r + this.options.path + t
                }, p.prototype.open = function() {
                    var t = this;
                    this.state = this.CONNECTING;
                    var e = this.uri(),
                        r = o(e, this.options);
                    r.binaryType = this.options.binaryType, this.socket = r, r.onopen = function() {
                        t._onOpen()
                    }, r.onclose = function(e) {
                        var r;
                        r = null == e.code ? 1005 : e.code, t._onClose(r, e.reason)
                    }, r.onmessage = function(e) {
                        t._onMessage(e.data)
                    }, r.onerror = function() {
                        t.state === t.CONNECTING && t._onClose(1006)
                    }, this._connectTimeoutRef = setTimeout(function() {
                        t._onClose(4007), t.socket.close(4007)
                    }, this.connectTimeout)
                }, p.prototype._onOpen = function() {
                    var t = this;
                    clearTimeout(this._connectTimeoutRef), this._resetPingTimeout(), this._handshake(function(e, r) {
                        e ? (t._onError(e), t._onClose(4003), t.socket.close(4003)) : (t.state = t.OPEN, i.prototype.emit.call(t, "open", r), t._resetPingTimeout())
                    })
                }, p.prototype._handshake = function(t) {
                    var e = this;
                    this.auth.loadToken(this.authTokenName, function(r, n) {
                        r ? t(r) : e.emit("#handshake", {
                            authToken: n
                        }, {
                            force: !0
                        }, function(e, r) {
                            r && (r.authToken = n, r.authError && (r.authError = c.hydrateError(r.authError))), t(e, r)
                        })
                    })
                }, p.prototype._abortAllPendingEventsDueToBadConnection = function(t) {
                    for (var e in this._callbackMap)
                        if (this._callbackMap.hasOwnProperty(e)) {
                            var r = this._callbackMap[e];
                            delete this._callbackMap[e], clearTimeout(r.timeout), delete r.timeout;
                            var n = "Event '" + r.event + "' was aborted due to a bad connection",
                                o = new h(n, t),
                                i = r.callback;
                            delete r.callback, i.call(r, o, r)
                        }
                }, p.prototype._onClose = function(t, e) {
                    delete this.socket.onopen, delete this.socket.onclose, delete this.socket.onmessage, delete this.socket.onerror, clearTimeout(this._connectTimeoutRef), this.state == this.OPEN ? (this.state = this.CLOSED, i.prototype.emit.call(this, "close", t, e), this._abortAllPendingEventsDueToBadConnection("disconnect")) : this.state == this.CONNECTING && (this.state = this.CLOSED, i.prototype.emit.call(this, "openAbort", t, e), this._abortAllPendingEventsDueToBadConnection("connectAbort"))
                }, p.prototype._handleEventObject = function(t, e) {
                    if (t && null != t.event) {
                        var r = new s(this, t.cid);
                        i.prototype.emit.call(this, "event", t.event, t.data, r)
                    } else if (t && null != t.rid) {
                        var n = this._callbackMap[t.rid];
                        if (n && (clearTimeout(n.timeout), delete n.timeout, delete this._callbackMap[t.rid], n.callback)) {
                            var o = c.hydrateError(t.error);
                            n.callback(o, t.data)
                        }
                    } else i.prototype.emit.call(this, "event", "raw", e)
                }, p.prototype._onMessage = function(t) {
                    i.prototype.emit.call(this, "event", "message", t);
                    var e = this.decode(t);
                    if ("#1" == e) this._resetPingTimeout(), this.socket.readyState == this.socket.OPEN && this.sendObject("#2");
                    else if (Array.isArray(e))
                        for (var r = e.length, n = 0; n < r; n++) this._handleEventObject(e[n], t);
                    else this._handleEventObject(e, t)
                }, p.prototype._onError = function(t) {
                    i.prototype.emit.call(this, "error", t)
                }, p.prototype._resetPingTimeout = function() {
                    var t = this;
                    (new Date).getTime(), clearTimeout(this._pingTimeoutTicker), this._pingTimeoutTicker = setTimeout(function() {
                        t._onClose(4e3), t.socket.close(4e3)
                    }, this.pingTimeout)
                }, p.prototype.getBytesReceived = function() {
                    return this.socket.bytesReceived
                }, p.prototype.close = function(t, e) {
                    if (t = t || 1e3, this.state == this.OPEN) {
                        var r = {
                            code: t,
                            data: e
                        };
                        this.emit("#disconnect", r), this._onClose(t, e), this.socket.close(t)
                    } else this.state == this.CONNECTING && (this._onClose(t, e), this.socket.close(t))
                }, p.prototype.emitObject = function(t, e) {
                    var r = {
                        event: t.event,
                        data: t.data
                    };
                    return t.callback && (r.cid = t.cid = this.callIdGenerator(), this._callbackMap[t.cid] = t), this.sendObject(r, e), t.cid || null
                }, p.prototype._handleEventAckTimeout = function(t) {
                    t.cid && delete this._callbackMap[t.cid], delete t.timeout;
                    var e = t.callback;
                    if (e) {
                        delete t.callback;
                        var r = new u("Event response for '" + t.event + "' timed out");
                        e.call(t, r, t)
                    }
                }, p.prototype.emit = function(t, e, r, n) {
                    var o, i, s = this;
                    n ? (i = r, o = n) : r instanceof Function ? (i = {}, o = r) : i = r;
                    var a = {
                        event: t,
                        data: e,
                        callback: o
                    };
                    o && !i.noTimeout && (a.timeout = setTimeout(function() {
                        s._handleEventAckTimeout(a)
                    }, this.options.ackTimeout));
                    var c = null;
                    return (this.state == this.OPEN || i.force) && (c = this.emitObject(a, i)), c
                }, p.prototype.cancelPendingResponse = function(t) {
                    delete this._callbackMap[t]
                }, p.prototype.decode = function(t) {
                    return this.codec.decode(t)
                }, p.prototype.encode = function(t) {
                    return this.codec.encode(t)
                }, p.prototype.send = function(t) {
                    this.socket.readyState != this.socket.OPEN ? this._onClose(1005) : this.socket.send(t)
                }, p.prototype.serializeObject = function(t) {
                    var e, r;
                    try {
                        e = this.encode(t)
                    } catch (t) {
                        r = t, this._onError(r)
                    }
                    return r ? null : e
                }, p.prototype.sendObjectBatch = function(t) {
                    var e = this;
                    this._batchSendList.push(t), this._batchTimeout || (this._batchTimeout = setTimeout(function() {
                        if (delete e._batchTimeout, e._batchSendList.length) {
                            var t = e.serializeObject(e._batchSendList);
                            null != t && e.send(t), e._batchSendList = []
                        }
                    }, this.options.pubSubBatchDuration || 0))
                }, p.prototype.sendObjectSingle = function(t) {
                    var e = this.serializeObject(t);
                    null != e && this.send(e)
                }, p.prototype.sendObject = function(t, e) {
                    e && e.batch ? this.sendObjectBatch(t) : this.sendObjectSingle(t)
                }, e.exports.SCTransport = p
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            "./response": 5,
            "component-emitter": 14,
            querystring: 20,
            "sc-errors": 22,
            ws: 9
        }],
        9: [function(t, e) {
            function r(t, e) {
                return e ? new o(t, e) : new o(t)
            }
            var n;
            n = "undefined" != typeof WorkerGlobalScope ? self : "undefined" != typeof window && window || function() {
                return this
            }();
            var o = n.WebSocket || n.MozWebSocket;
            o && (r.prototype = o.prototype), e.exports = o ? r : null
        }, {}],
        10: [function(e, r, n) {
            (function(e) {
                ! function(o) {
                    var i = "object" == typeof n && n,
                        s = "object" == typeof r && r && r.exports == i && r,
                        a = "object" == typeof e && e;
                    a.global !== a && a.window !== a || (o = a);
                    var c = function(t) {
                        this.message = t
                    };
                    c.prototype = new Error, c.prototype.name = "InvalidCharacterError";
                    var u = function(t) {
                            throw new c(t)
                        },
                        h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                        p = /[\t\n\f\r ]/g,
                        l = {
                            encode: function(t) {
                                t = String(t), /[^\0-\xFF]/.test(t) && u("The string to be encoded contains characters outside of the Latin1 range.");
                                for (var e, r, n, o, i = t.length % 3, s = "", a = -1, c = t.length - i; ++a < c;) e = t.charCodeAt(a) << 16, r = t.charCodeAt(++a) << 8, n = t.charCodeAt(++a), o = e + r + n, s += h.charAt(o >> 18 & 63) + h.charAt(o >> 12 & 63) + h.charAt(o >> 6 & 63) + h.charAt(63 & o);
                                return 2 == i ? (e = t.charCodeAt(a) << 8, r = t.charCodeAt(++a), o = e + r, s += h.charAt(o >> 10) + h.charAt(o >> 4 & 63) + h.charAt(o << 2 & 63) + "=") : 1 == i && (o = t.charCodeAt(a), s += h.charAt(o >> 2) + h.charAt(o << 4 & 63) + "=="), s
                            },
                            decode: function(t) {
                                t = String(t).replace(p, "");
                                var e = t.length;
                                e % 4 == 0 && (t = t.replace(/==?$/, ""), e = t.length), (e % 4 == 1 || /[^+a-zA-Z0-9\/]/.test(t)) && u("Invalid character: the string to be decoded is not correctly encoded.");
                                for (var r, n, o = 0, i = "", s = -1; ++s < e;) n = h.indexOf(t.charAt(s)), r = o % 4 ? 64 * r + n : n, o++ % 4 && (i += String.fromCharCode(255 & r >> (-2 * o & 6)));
                                return i
                            },
                            version: "0.1.0"
                        };
                    if ("function" == typeof t && "object" == typeof t.amd && t.amd) t(function() {
                        return l
                    });
                    else if (i && !i.nodeType)
                        if (s) s.exports = l;
                        else
                            for (var f in l) l.hasOwnProperty(f) && (i[f] = l[f]);
                    else o.base64 = l
                }(this)
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}],
        11: [function(t, e, r) {
            "use strict";

            function n(t) {
                var e = t.length;
                if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
                return "=" === t[e - 2] ? 2 : "=" === t[e - 1] ? 1 : 0
            }

            function o(t) {
                return s[t >> 18 & 63] + s[t >> 12 & 63] + s[t >> 6 & 63] + s[63 & t]
            }

            function i(t, e, r) {
                for (var n, i = [], s = e; s < r; s += 3) n = (t[s] << 16) + (t[s + 1] << 8) + t[s + 2], i.push(o(n));
                return i.join("")
            }
            r.byteLength = function(t) {
                return 3 * t.length / 4 - n(t)
            }, r.toByteArray = function(t) {
                var e, r, o, i, s, u = t.length;
                i = n(t), s = new c(3 * u / 4 - i), r = i > 0 ? u - 4 : u;
                var h = 0;
                for (e = 0; e < r; e += 4) o = a[t.charCodeAt(e)] << 18 | a[t.charCodeAt(e + 1)] << 12 | a[t.charCodeAt(e + 2)] << 6 | a[t.charCodeAt(e + 3)], s[h++] = o >> 16 & 255, s[h++] = o >> 8 & 255, s[h++] = 255 & o;
                return 2 === i ? (o = a[t.charCodeAt(e)] << 2 | a[t.charCodeAt(e + 1)] >> 4, s[h++] = 255 & o) : 1 === i && (o = a[t.charCodeAt(e)] << 10 | a[t.charCodeAt(e + 1)] << 4 | a[t.charCodeAt(e + 2)] >> 2, s[h++] = o >> 8 & 255, s[h++] = 255 & o), s
            }, r.fromByteArray = function(t) {
                for (var e, r = t.length, n = r % 3, o = "", a = [], c = 0, u = r - n; c < u; c += 16383) a.push(i(t, c, c + 16383 > u ? u : c + 16383));
                return 1 === n ? (e = t[r - 1], o += s[e >> 2], o += s[e << 4 & 63], o += "==") : 2 === n && (e = (t[r - 2] << 8) + t[r - 1], o += s[e >> 10], o += s[e >> 4 & 63], o += s[e << 2 & 63], o += "="), a.push(o), a.join("")
            };
            for (var s = [], a = [], c = "undefined" != typeof Uint8Array ? Uint8Array : Array, u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", h = 0, p = u.length; h < p; ++h) s[h] = u[h], a[u.charCodeAt(h)] = h;
            a["-".charCodeAt(0)] = 62, a["_".charCodeAt(0)] = 63
        }, {}],
        12: [function(t, e, r) {
            "use strict";

            function n(t) {
                if (t > K) throw new RangeError("Invalid typed array length");
                var e = new Uint8Array(t);
                return e.__proto__ = o.prototype, e
            }

            function o(t, e, r) {
                if ("number" == typeof t) {
                    if ("string" == typeof e) throw new Error("If encoding is specified then the first argument must be a string");
                    return c(t)
                }
                return i(t, e, r)
            }

            function i(t, e, r) {
                if ("number" == typeof t) throw new TypeError('"value" argument must not be a number');
                return z(t) ? p(t, e, r) : "string" == typeof t ? u(t, e) : l(t)
            }

            function s(t) {
                if ("number" != typeof t) throw new TypeError('"size" argument must be a number');
                if (t < 0) throw new RangeError('"size" argument must not be negative')
            }

            function a(t, e, r) {
                return s(t), t <= 0 ? n(t) : void 0 !== e ? "string" == typeof r ? n(t).fill(e, r) : n(t).fill(e) : n(t)
            }

            function c(t) {
                return s(t), n(t < 0 ? 0 : 0 | f(t))
            }

            function u(t, e) {
                if ("string" == typeof e && "" !== e || (e = "utf8"), !o.isEncoding(e)) throw new TypeError('"encoding" must be a valid string encoding');
                var r = 0 | d(t, e),
                    i = n(r),
                    s = i.write(t, e);
                return s !== r && (i = i.slice(0, s)), i
            }

            function h(t) {
                for (var e = t.length < 0 ? 0 : 0 | f(t.length), r = n(e), o = 0; o < e; o += 1) r[o] = 255 & t[o];
                return r
            }

            function p(t, e, r) {
                if (e < 0 || t.byteLength < e) throw new RangeError("'offset' is out of bounds");
                if (t.byteLength < e + (r || 0)) throw new RangeError("'length' is out of bounds");
                var n;
                return n = void 0 === e && void 0 === r ? new Uint8Array(t) : void 0 === r ? new Uint8Array(t, e) : new Uint8Array(t, e, r), n.__proto__ = o.prototype, n
            }

            function l(t) {
                if (o.isBuffer(t)) {
                    var e = 0 | f(t.length),
                        r = n(e);
                    return 0 === r.length ? r : (t.copy(r, 0, 0, e), r)
                }
                if (t) {
                    if ($(t) || "length" in t) return "number" != typeof t.length || W(t.length) ? n(0) : h(t);
                    if ("Buffer" === t.type && Array.isArray(t.data)) return h(t.data)
                }
                throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")
            }

            function f(t) {
                if (t >= K) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K.toString(16) + " bytes");
                return 0 | t
            }

            function d(t, e) {
                if (o.isBuffer(t)) return t.length;
                if ($(t) || z(t)) return t.byteLength;
                "string" != typeof t && (t = "" + t);
                var r = t.length;
                if (0 === r) return 0;
                for (var n = !1;;) switch (e) {
                    case "ascii":
                    case "latin1":
                    case "binary":
                        return r;
                    case "utf8":
                    case "utf-8":
                    case void 0:
                        return M(t).length;
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return 2 * r;
                    case "hex":
                        return r >>> 1;
                    case "base64":
                        return G(t).length;
                    default:
                        if (n) return M(t).length;
                        e = ("" + e).toLowerCase(), n = !0
                }
            }

            function y(t, e, r) {
                var n = !1;
                if ((void 0 === e || e < 0) && (e = 0), e > this.length) return "";
                if ((void 0 === r || r > this.length) && (r = this.length), r <= 0) return "";
                if (r >>>= 0, e >>>= 0, r <= e) return "";
                for (t || (t = "utf8");;) switch (t) {
                    case "hex":
                        return N(this, e, r);
                    case "utf8":
                    case "utf-8":
                        return C(this, e, r);
                    case "ascii":
                        return O(this, e, r);
                    case "latin1":
                    case "binary":
                        return B(this, e, r);
                    case "base64":
                        return _(this, e, r);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return I(this, e, r);
                    default:
                        if (n) throw new TypeError("Unknown encoding: " + t);
                        t = (t + "").toLowerCase(), n = !0
                }
            }

            function g(t, e, r) {
                var n = t[e];
                t[e] = t[r], t[r] = n
            }

            function m(t, e, r, n, i) {
                if (0 === t.length) return -1;
                if ("string" == typeof r ? (n = r, r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648), r = +r, W(r) && (r = i ? 0 : t.length - 1), r < 0 && (r = t.length + r), r >= t.length) {
                    if (i) return -1;
                    r = t.length - 1
                } else if (r < 0) {
                    if (!i) return -1;
                    r = 0
                }
                if ("string" == typeof e && (e = o.from(e, n)), o.isBuffer(e)) return 0 === e.length ? -1 : b(t, e, r, n, i);
                if ("number" == typeof e) return e &= 255, "function" == typeof Uint8Array.prototype.indexOf ? i ? Uint8Array.prototype.indexOf.call(t, e, r) : Uint8Array.prototype.lastIndexOf.call(t, e, r) : b(t, [e], r, n, i);
                throw new TypeError("val must be string, number or Buffer")
            }

            function b(t, e, r, n, o) {
                function i(t, e) {
                    return 1 === s ? t[e] : t.readUInt16BE(e * s)
                }
                var s = 1,
                    a = t.length,
                    c = e.length;
                if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
                    if (t.length < 2 || e.length < 2) return -1;
                    s = 2, a /= 2, c /= 2, r /= 2
                }
                var u;
                if (o) {
                    var h = -1;
                    for (u = r; u < a; u++)
                        if (i(t, u) === i(e, -1 === h ? 0 : u - h)) {
                            if (-1 === h && (h = u), u - h + 1 === c) return h * s
                        } else -1 !== h && (u -= u - h), h = -1
                } else
                    for (r + c > a && (r = a - c), u = r; u >= 0; u--) {
                        for (var p = !0, l = 0; l < c; l++)
                            if (i(t, u + l) !== i(e, l)) {
                                p = !1;
                                break
                            }
                        if (p) return u
                    }
                return -1
            }

            function v(t, e, r, n) {
                r = Number(r) || 0;
                var o = t.length - r;
                n ? (n = Number(n)) > o && (n = o) : n = o;
                var i = e.length;
                if (i % 2 != 0) throw new TypeError("Invalid hex string");
                n > i / 2 && (n = i / 2);
                for (var s = 0; s < n; ++s) {
                    var a = parseInt(e.substr(2 * s, 2), 16);
                    if (W(a)) return s;
                    t[r + s] = a
                }
                return s
            }

            function E(t, e, r, n) {
                return H(M(e, t.length - r), t, r, n)
            }

            function w(t, e, r, n) {
                return H(F(e), t, r, n)
            }

            function k(t, e, r, n) {
                return w(t, e, r, n)
            }

            function S(t, e, r, n) {
                return H(G(e), t, r, n)
            }

            function T(t, e, r, n) {
                return H(q(e, t.length - r), t, r, n)
            }

            function _(t, e, r) {
                return 0 === e && r === t.length ? Y.fromByteArray(t) : Y.fromByteArray(t.slice(e, r))
            }

            function C(t, e, r) {
                r = Math.min(t.length, r);
                for (var n = [], o = e; o < r;) {
                    var i = t[o],
                        s = null,
                        a = i > 239 ? 4 : i > 223 ? 3 : i > 191 ? 2 : 1;
                    if (o + a <= r) {
                        var c, u, h, p;
                        switch (a) {
                            case 1:
                                i < 128 && (s = i);
                                break;
                            case 2:
                                c = t[o + 1], 128 == (192 & c) && (p = (31 & i) << 6 | 63 & c) > 127 && (s = p);
                                break;
                            case 3:
                                c = t[o + 1], u = t[o + 2], 128 == (192 & c) && 128 == (192 & u) && (p = (15 & i) << 12 | (63 & c) << 6 | 63 & u) > 2047 && (p < 55296 || p > 57343) && (s = p);
                                break;
                            case 4:
                                c = t[o + 1], u = t[o + 2], h = t[o + 3], 128 == (192 & c) && 128 == (192 & u) && 128 == (192 & h) && (p = (15 & i) << 18 | (63 & c) << 12 | (63 & u) << 6 | 63 & h) > 65535 && p < 1114112 && (s = p)
                        }
                    }
                    null === s ? (s = 65533, a = 1) : s > 65535 && (s -= 65536, n.push(s >>> 10 & 1023 | 55296), s = 56320 | 1023 & s), n.push(s), o += a
                }
                return A(n)
            }

            function A(t) {
                var e = t.length;
                if (e <= V) return String.fromCharCode.apply(String, t);
                for (var r = "", n = 0; n < e;) r += String.fromCharCode.apply(String, t.slice(n, n += V));
                return r
            }

            function O(t, e, r) {
                var n = "";
                r = Math.min(t.length, r);
                for (var o = e; o < r; ++o) n += String.fromCharCode(127 & t[o]);
                return n
            }

            function B(t, e, r) {
                var n = "";
                r = Math.min(t.length, r);
                for (var o = e; o < r; ++o) n += String.fromCharCode(t[o]);
                return n
            }

            function N(t, e, r) {
                var n = t.length;
                (!e || e < 0) && (e = 0), (!r || r < 0 || r > n) && (r = n);
                for (var o = "", i = e; i < r; ++i) o += L(t[i]);
                return o
            }

            function I(t, e, r) {
                for (var n = t.slice(e, r), o = "", i = 0; i < n.length; i += 2) o += String.fromCharCode(n[i] + 256 * n[i + 1]);
                return o
            }

            function x(t, e, r) {
                if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
                if (t + e > r) throw new RangeError("Trying to access beyond buffer length")
            }

            function U(t, e, r, n, i, s) {
                if (!o.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
                if (e > i || e < s) throw new RangeError('"value" argument is out of bounds');
                if (r + n > t.length) throw new RangeError("Index out of range")
            }

            function P(t, e, r, n) {
                if (r + n > t.length) throw new RangeError("Index out of range");
                if (r < 0) throw new RangeError("Index out of range")
            }

            function R(t, e, r, n, o) {
                return e = +e, r >>>= 0, o || P(t, e, r, 4, 3.4028234663852886e38, -3.4028234663852886e38), J.write(t, e, r, n, 23, 4), r + 4
            }

            function j(t, e, r, n, o) {
                return e = +e, r >>>= 0, o || P(t, e, r, 8, 1.7976931348623157e308, -1.7976931348623157e308), J.write(t, e, r, n, 52, 8), r + 8
            }

            function D(t) {
                if (t = t.trim().replace(X, ""), t.length < 2) return "";
                for (; t.length % 4 != 0;) t += "=";
                return t
            }

            function L(t) {
                return t < 16 ? "0" + t.toString(16) : t.toString(16)
            }

            function M(t, e) {
                e = e || 1 / 0;
                for (var r, n = t.length, o = null, i = [], s = 0; s < n; ++s) {
                    if ((r = t.charCodeAt(s)) > 55295 && r < 57344) {
                        if (!o) {
                            if (r > 56319) {
                                (e -= 3) > -1 && i.push(239, 191, 189);
                                continue
                            }
                            if (s + 1 === n) {
                                (e -= 3) > -1 && i.push(239, 191, 189);
                                continue
                            }
                            o = r;
                            continue
                        }
                        if (r < 56320) {
                            (e -= 3) > -1 && i.push(239, 191, 189), o = r;
                            continue
                        }
                        r = 65536 + (o - 55296 << 10 | r - 56320)
                    } else o && (e -= 3) > -1 && i.push(239, 191, 189);
                    if (o = null, r < 128) {
                        if ((e -= 1) < 0) break;
                        i.push(r)
                    } else if (r < 2048) {
                        if ((e -= 2) < 0) break;
                        i.push(r >> 6 | 192, 63 & r | 128)
                    } else if (r < 65536) {
                        if ((e -= 3) < 0) break;
                        i.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128)
                    } else {
                        if (!(r < 1114112)) throw new Error("Invalid code point");
                        if ((e -= 4) < 0) break;
                        i.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128)
                    }
                }
                return i
            }

            function F(t) {
                for (var e = [], r = 0; r < t.length; ++r) e.push(255 & t.charCodeAt(r));
                return e
            }

            function q(t, e) {
                for (var r, n, o, i = [], s = 0; s < t.length && !((e -= 2) < 0); ++s) r = t.charCodeAt(s), n = r >> 8, o = r % 256, i.push(o), i.push(n);
                return i
            }

            function G(t) {
                return Y.toByteArray(D(t))
            }

            function H(t, e, r, n) {
                for (var o = 0; o < n && !(o + r >= e.length || o >= t.length); ++o) e[o + r] = t[o];
                return o
            }

            function z(t) {
                return t instanceof ArrayBuffer || null != t && null != t.constructor && "ArrayBuffer" === t.constructor.name && "number" == typeof t.byteLength
            }

            function $(t) {
                return "function" == typeof ArrayBuffer.isView && ArrayBuffer.isView(t)
            }

            function W(t) {
                return t !== t
            }
            var Y = t("base64-js"),
                J = t("ieee754");
            r.Buffer = o, r.SlowBuffer = function(t) {
                return +t != t && (t = 0), o.alloc(+t)
            }, r.INSPECT_MAX_BYTES = 50;
            var K = 2147483647;
            r.kMaxLength = K, o.TYPED_ARRAY_SUPPORT = function() {
                try {
                    var t = new Uint8Array(1);
                    return t.__proto__ = {
                        __proto__: Uint8Array.prototype,
                        foo: function() {
                            return 42
                        }
                    }, 42 === t.foo()
                } catch (t) {
                    return !1
                }
            }(), o.TYPED_ARRAY_SUPPORT || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."), "undefined" != typeof Symbol && Symbol.species && o[Symbol.species] === o && Object.defineProperty(o, Symbol.species, {
                value: null,
                configurable: !0,
                enumerable: !1,
                writable: !1
            }), o.poolSize = 8192, o.from = function(t, e, r) {
                return i(t, e, r)
            }, o.prototype.__proto__ = Uint8Array.prototype, o.__proto__ = Uint8Array, o.alloc = function(t, e, r) {
                return a(t, e, r)
            }, o.allocUnsafe = function(t) {
                return c(t)
            }, o.allocUnsafeSlow = function(t) {
                return c(t)
            }, o.isBuffer = function(t) {
                return null != t && !0 === t._isBuffer
            }, o.compare = function(t, e) {
                if (!o.isBuffer(t) || !o.isBuffer(e)) throw new TypeError("Arguments must be Buffers");
                if (t === e) return 0;
                for (var r = t.length, n = e.length, i = 0, s = Math.min(r, n); i < s; ++i)
                    if (t[i] !== e[i]) {
                        r = t[i], n = e[i];
                        break
                    }
                return r < n ? -1 : n < r ? 1 : 0
            }, o.isEncoding = function(t) {
                switch (String(t).toLowerCase()) {
                    case "hex":
                    case "utf8":
                    case "utf-8":
                    case "ascii":
                    case "latin1":
                    case "binary":
                    case "base64":
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return !0;
                    default:
                        return !1
                }
            }, o.concat = function(t, e) {
                if (!Array.isArray(t)) throw new TypeError('"list" argument must be an Array of Buffers');
                if (0 === t.length) return o.alloc(0);
                var r;
                if (void 0 === e)
                    for (e = 0, r = 0; r < t.length; ++r) e += t[r].length;
                var n = o.allocUnsafe(e),
                    i = 0;
                for (r = 0; r < t.length; ++r) {
                    var s = t[r];
                    if (!o.isBuffer(s)) throw new TypeError('"list" argument must be an Array of Buffers');
                    s.copy(n, i), i += s.length
                }
                return n
            }, o.byteLength = d, o.prototype._isBuffer = !0, o.prototype.swap16 = function() {
                var t = this.length;
                if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                for (var e = 0; e < t; e += 2) g(this, e, e + 1);
                return this
            }, o.prototype.swap32 = function() {
                var t = this.length;
                if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                for (var e = 0; e < t; e += 4) g(this, e, e + 3), g(this, e + 1, e + 2);
                return this
            }, o.prototype.swap64 = function() {
                var t = this.length;
                if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                for (var e = 0; e < t; e += 8) g(this, e, e + 7), g(this, e + 1, e + 6), g(this, e + 2, e + 5), g(this, e + 3, e + 4);
                return this
            }, o.prototype.toString = function() {
                var t = this.length;
                return 0 === t ? "" : 0 === arguments.length ? C(this, 0, t) : y.apply(this, arguments)
            }, o.prototype.equals = function(t) {
                if (!o.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                return this === t || 0 === o.compare(this, t)
            }, o.prototype.inspect = function() {
                var t = "",
                    e = r.INSPECT_MAX_BYTES;
                return this.length > 0 && (t = this.toString("hex", 0, e).match(/.{2}/g).join(" "), this.length > e && (t += " ... ")), "<Buffer " + t + ">"
            }, o.prototype.compare = function(t, e, r, n, i) {
                if (!o.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                if (void 0 === e && (e = 0), void 0 === r && (r = t ? t.length : 0), void 0 === n && (n = 0), void 0 === i && (i = this.length), e < 0 || r > t.length || n < 0 || i > this.length) throw new RangeError("out of range index");
                if (n >= i && e >= r) return 0;
                if (n >= i) return -1;
                if (e >= r) return 1;
                if (e >>>= 0, r >>>= 0, n >>>= 0, i >>>= 0, this === t) return 0;
                for (var s = i - n, a = r - e, c = Math.min(s, a), u = this.slice(n, i), h = t.slice(e, r), p = 0; p < c; ++p)
                    if (u[p] !== h[p]) {
                        s = u[p], a = h[p];
                        break
                    }
                return s < a ? -1 : a < s ? 1 : 0
            }, o.prototype.includes = function(t, e, r) {
                return -1 !== this.indexOf(t, e, r)
            }, o.prototype.indexOf = function(t, e, r) {
                return m(this, t, e, r, !0)
            }, o.prototype.lastIndexOf = function(t, e, r) {
                return m(this, t, e, r, !1)
            }, o.prototype.write = function(t, e, r, n) {
                if (void 0 === e) n = "utf8", r = this.length, e = 0;
                else if (void 0 === r && "string" == typeof e) n = e, r = this.length, e = 0;
                else {
                    if (!isFinite(e)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                    e >>>= 0, isFinite(r) ? (r >>>= 0, void 0 === n && (n = "utf8")) : (n = r, r = void 0)
                }
                var o = this.length - e;
                if ((void 0 === r || r > o) && (r = o), t.length > 0 && (r < 0 || e < 0) || e > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                n || (n = "utf8");
                for (var i = !1;;) switch (n) {
                    case "hex":
                        return v(this, t, e, r);
                    case "utf8":
                    case "utf-8":
                        return E(this, t, e, r);
                    case "ascii":
                        return w(this, t, e, r);
                    case "latin1":
                    case "binary":
                        return k(this, t, e, r);
                    case "base64":
                        return S(this, t, e, r);
                    case "ucs2":
                    case "ucs-2":
                    case "utf16le":
                    case "utf-16le":
                        return T(this, t, e, r);
                    default:
                        if (i) throw new TypeError("Unknown encoding: " + n);
                        n = ("" + n).toLowerCase(), i = !0
                }
            }, o.prototype.toJSON = function() {
                return {
                    type: "Buffer",
                    data: Array.prototype.slice.call(this._arr || this, 0)
                }
            };
            var V = 4096;
            o.prototype.slice = function(t, e) {
                var r = this.length;
                t = ~~t, e = void 0 === e ? r : ~~e, t < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), e < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), e < t && (e = t);
                var n = this.subarray(t, e);
                return n.__proto__ = o.prototype, n
            }, o.prototype.readUIntLE = function(t, e, r) {
                t >>>= 0, e >>>= 0, r || x(t, e, this.length);
                for (var n = this[t], o = 1, i = 0; ++i < e && (o *= 256);) n += this[t + i] * o;
                return n
            }, o.prototype.readUIntBE = function(t, e, r) {
                t >>>= 0, e >>>= 0, r || x(t, e, this.length);
                for (var n = this[t + --e], o = 1; e > 0 && (o *= 256);) n += this[t + --e] * o;
                return n
            }, o.prototype.readUInt8 = function(t, e) {
                return t >>>= 0, e || x(t, 1, this.length), this[t]
            }, o.prototype.readUInt16LE = function(t, e) {
                return t >>>= 0, e || x(t, 2, this.length), this[t] | this[t + 1] << 8
            }, o.prototype.readUInt16BE = function(t, e) {
                return t >>>= 0, e || x(t, 2, this.length), this[t] << 8 | this[t + 1]
            }, o.prototype.readUInt32LE = function(t, e) {
                return t >>>= 0, e || x(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3]
            }, o.prototype.readUInt32BE = function(t, e) {
                return t >>>= 0, e || x(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3])
            }, o.prototype.readIntLE = function(t, e, r) {
                t >>>= 0, e >>>= 0, r || x(t, e, this.length);
                for (var n = this[t], o = 1, i = 0; ++i < e && (o *= 256);) n += this[t + i] * o;
                return o *= 128, n >= o && (n -= Math.pow(2, 8 * e)), n
            }, o.prototype.readIntBE = function(t, e, r) {
                t >>>= 0, e >>>= 0, r || x(t, e, this.length);
                for (var n = e, o = 1, i = this[t + --n]; n > 0 && (o *= 256);) i += this[t + --n] * o;
                return o *= 128, i >= o && (i -= Math.pow(2, 8 * e)), i
            }, o.prototype.readInt8 = function(t, e) {
                return t >>>= 0, e || x(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
            }, o.prototype.readInt16LE = function(t, e) {
                t >>>= 0, e || x(t, 2, this.length);
                var r = this[t] | this[t + 1] << 8;
                return 32768 & r ? 4294901760 | r : r
            }, o.prototype.readInt16BE = function(t, e) {
                t >>>= 0, e || x(t, 2, this.length);
                var r = this[t + 1] | this[t] << 8;
                return 32768 & r ? 4294901760 | r : r
            }, o.prototype.readInt32LE = function(t, e) {
                return t >>>= 0, e || x(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24
            }, o.prototype.readInt32BE = function(t, e) {
                return t >>>= 0, e || x(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]
            }, o.prototype.readFloatLE = function(t, e) {
                return t >>>= 0, e || x(t, 4, this.length), J.read(this, t, !0, 23, 4)
            }, o.prototype.readFloatBE = function(t, e) {
                return t >>>= 0, e || x(t, 4, this.length), J.read(this, t, !1, 23, 4)
            }, o.prototype.readDoubleLE = function(t, e) {
                return t >>>= 0, e || x(t, 8, this.length), J.read(this, t, !0, 52, 8)
            }, o.prototype.readDoubleBE = function(t, e) {
                return t >>>= 0, e || x(t, 8, this.length), J.read(this, t, !1, 52, 8)
            }, o.prototype.writeUIntLE = function(t, e, r, n) {
                if (t = +t, e >>>= 0, r >>>= 0, !n) {
                    U(this, t, e, r, Math.pow(2, 8 * r) - 1, 0)
                }
                var o = 1,
                    i = 0;
                for (this[e] = 255 & t; ++i < r && (o *= 256);) this[e + i] = t / o & 255;
                return e + r
            }, o.prototype.writeUIntBE = function(t, e, r, n) {
                if (t = +t, e >>>= 0, r >>>= 0, !n) {
                    U(this, t, e, r, Math.pow(2, 8 * r) - 1, 0)
                }
                var o = r - 1,
                    i = 1;
                for (this[e + o] = 255 & t; --o >= 0 && (i *= 256);) this[e + o] = t / i & 255;
                return e + r
            }, o.prototype.writeUInt8 = function(t, e, r) {
                return t = +t, e >>>= 0, r || U(this, t, e, 1, 255, 0), this[e] = 255 & t, e + 1
            }, o.prototype.writeUInt16LE = function(t, e, r) {
                return t = +t, e >>>= 0, r || U(this, t, e, 2, 65535, 0), this[e] = 255 & t, this[e + 1] = t >>> 8, e + 2
            }, o.prototype.writeUInt16BE = function(t, e, r) {
                return t = +t, e >>>= 0, r || U(this, t, e, 2, 65535, 0), this[e] = t >>> 8, this[e + 1] = 255 & t, e + 2
            }, o.prototype.writeUInt32LE = function(t, e, r) {
                return t = +t, e >>>= 0, r || U(this, t, e, 4, 4294967295, 0), this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = 255 & t, e + 4
            }, o.prototype.writeUInt32BE = function(t, e, r) {
                return t = +t, e >>>= 0, r || U(this, t, e, 4, 4294967295, 0), this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t, e + 4
            }, o.prototype.writeIntLE = function(t, e, r, n) {
                if (t = +t, e >>>= 0, !n) {
                    var o = Math.pow(2, 8 * r - 1);
                    U(this, t, e, r, o - 1, -o)
                }
                var i = 0,
                    s = 1,
                    a = 0;
                for (this[e] = 255 & t; ++i < r && (s *= 256);) t < 0 && 0 === a && 0 !== this[e + i - 1] && (a = 1), this[e + i] = (t / s >> 0) - a & 255;
                return e + r
            }, o.prototype.writeIntBE = function(t, e, r, n) {
                if (t = +t, e >>>= 0, !n) {
                    var o = Math.pow(2, 8 * r - 1);
                    U(this, t, e, r, o - 1, -o)
                }
                var i = r - 1,
                    s = 1,
                    a = 0;
                for (this[e + i] = 255 & t; --i >= 0 && (s *= 256);) t < 0 && 0 === a && 0 !== this[e + i + 1] && (a = 1), this[e + i] = (t / s >> 0) - a & 255;
                return e + r
            }, o.prototype.writeInt8 = function(t, e, r) {
                return t = +t, e >>>= 0, r || U(this, t, e, 1, 127, -128), t < 0 && (t = 255 + t + 1), this[e] = 255 & t, e + 1
            }, o.prototype.writeInt16LE = function(t, e, r) {
                return t = +t, e >>>= 0, r || U(this, t, e, 2, 32767, -32768), this[e] = 255 & t, this[e + 1] = t >>> 8, e + 2
            }, o.prototype.writeInt16BE = function(t, e, r) {
                return t = +t, e >>>= 0, r || U(this, t, e, 2, 32767, -32768), this[e] = t >>> 8, this[e + 1] = 255 & t, e + 2
            }, o.prototype.writeInt32LE = function(t, e, r) {
                return t = +t, e >>>= 0, r || U(this, t, e, 4, 2147483647, -2147483648), this[e] = 255 & t, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24, e + 4
            }, o.prototype.writeInt32BE = function(t, e, r) {
                return t = +t, e >>>= 0, r || U(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t, e + 4
            }, o.prototype.writeFloatLE = function(t, e, r) {
                return R(this, t, e, !0, r)
            }, o.prototype.writeFloatBE = function(t, e, r) {
                return R(this, t, e, !1, r)
            }, o.prototype.writeDoubleLE = function(t, e, r) {
                return j(this, t, e, !0, r)
            }, o.prototype.writeDoubleBE = function(t, e, r) {
                return j(this, t, e, !1, r)
            }, o.prototype.copy = function(t, e, r, n) {
                if (r || (r = 0), n || 0 === n || (n = this.length), e >= t.length && (e = t.length), e || (e = 0), n > 0 && n < r && (n = r), n === r) return 0;
                if (0 === t.length || 0 === this.length) return 0;
                if (e < 0) throw new RangeError("targetStart out of bounds");
                if (r < 0 || r >= this.length) throw new RangeError("sourceStart out of bounds");
                if (n < 0) throw new RangeError("sourceEnd out of bounds");
                n > this.length && (n = this.length), t.length - e < n - r && (n = t.length - e + r);
                var o, i = n - r;
                if (this === t && r < e && e < n)
                    for (o = i - 1; o >= 0; --o) t[o + e] = this[o + r];
                else if (i < 1e3)
                    for (o = 0; o < i; ++o) t[o + e] = this[o + r];
                else Uint8Array.prototype.set.call(t, this.subarray(r, r + i), e);
                return i
            }, o.prototype.fill = function(t, e, r, n) {
                if ("string" == typeof t) {
                    if ("string" == typeof e ? (n = e, e = 0, r = this.length) : "string" == typeof r && (n = r, r = this.length), 1 === t.length) {
                        var i = t.charCodeAt(0);
                        i < 256 && (t = i)
                    }
                    if (void 0 !== n && "string" != typeof n) throw new TypeError("encoding must be a string");
                    if ("string" == typeof n && !o.isEncoding(n)) throw new TypeError("Unknown encoding: " + n)
                } else "number" == typeof t && (t &= 255);
                if (e < 0 || this.length < e || this.length < r) throw new RangeError("Out of range index");
                if (r <= e) return this;
                e >>>= 0, r = void 0 === r ? this.length : r >>> 0, t || (t = 0);
                var s;
                if ("number" == typeof t)
                    for (s = e; s < r; ++s) this[s] = t;
                else {
                    var a = o.isBuffer(t) ? t : new o(t, n),
                        c = a.length;
                    for (s = 0; s < r - e; ++s) this[s + e] = a[s % c]
                }
                return this
            };
            var X = /[^+\/0-9A-Za-z-_]/g
        }, {
            "base64-js": 11,
            ieee754: 15
        }],
        13: [function(t, e) {
            (function(t) {
                var r = function() {
                    "use strict";

                    function e(t, e) {
                        return null != e && t instanceof e
                    }

                    function r(n, c, u, h, p) {
                        function l(n, u) {
                            if (null === n) return null;
                            if (0 === u) return n;
                            var y, g;
                            if ("object" != typeof n) return n;
                            if (e(n, i)) y = new i;
                            else if (e(n, s)) y = new s;
                            else if (e(n, a)) y = new a(function(t, e) {
                                n.then(function(e) {
                                    t(l(e, u - 1))
                                }, function(t) {
                                    e(l(t, u - 1))
                                })
                            });
                            else if (r.__isArray(n)) y = [];
                            else if (r.__isRegExp(n)) y = new RegExp(n.source, o(n)), n.lastIndex && (y.lastIndex = n.lastIndex);
                            else if (r.__isDate(n)) y = new Date(n.getTime());
                            else {
                                if (void 0 !== t && t.isBuffer(n)) return y = new t(n.length), n.copy(y), y;
                                e(n, Error) ? y = Object.create(n) : void 0 === h ? (g = Object.getPrototypeOf(n), y = Object.create(g)) : (y = Object.create(h), g = h)
                            }
                            if (c) {
                                var m = f.indexOf(n);
                                if (-1 != m) return d[m];
                                f.push(n), d.push(y)
                            }
                            e(n, i) && n.forEach(function(t, e) {
                                var r = l(e, u - 1),
                                    n = l(t, u - 1);
                                y.set(r, n)
                            }), e(n, s) && n.forEach(function(t) {
                                var e = l(t, u - 1);
                                y.add(e)
                            });
                            for (var b in n) {
                                var v;
                                g && (v = Object.getOwnPropertyDescriptor(g, b)), v && null == v.set || (y[b] = l(n[b], u - 1))
                            }
                            if (Object.getOwnPropertySymbols)
                                for (var E = Object.getOwnPropertySymbols(n), b = 0; b < E.length; b++) {
                                    var w = E[b],
                                        k = Object.getOwnPropertyDescriptor(n, w);
                                    (!k || k.enumerable || p) && (y[w] = l(n[w], u - 1), k.enumerable || Object.defineProperty(y, w, {
                                        enumerable: !1
                                    }))
                                }
                            if (p)
                                for (var S = Object.getOwnPropertyNames(n), b = 0; b < S.length; b++) {
                                    var T = S[b],
                                        k = Object.getOwnPropertyDescriptor(n, T);
                                    k && k.enumerable || (y[T] = l(n[T], u - 1), Object.defineProperty(y, T, {
                                        enumerable: !1
                                    }))
                                }
                            return y
                        }
                        "object" == typeof c && (u = c.depth, h = c.prototype, p = c.includeNonEnumerable, c = c.circular);
                        var f = [],
                            d = [];
                        return void 0 === c && (c = !0), void 0 === u && (u = 1 / 0), l(n, u)
                    }

                    function n(t) {
                        return Object.prototype.toString.call(t)
                    }

                    function o(t) {
                        var e = "";
                        return t.global && (e += "g"), t.ignoreCase && (e += "i"), t.multiline && (e += "m"), e
                    }
                    var i;
                    try {
                        i = Map
                    } catch (t) {
                        i = function() {}
                    }
                    var s;
                    try {
                        s = Set
                    } catch (t) {
                        s = function() {}
                    }
                    var a;
                    try {
                        a = Promise
                    } catch (t) {
                        a = function() {}
                    }
                    return r.clonePrototype = function(t) {
                        if (null === t) return null;
                        var e = function() {};
                        return e.prototype = t, new e
                    }, r.__objToStr = n, r.__isDate = function(t) {
                        return "object" == typeof t && "[object Date]" === n(t)
                    }, r.__isArray = function(t) {
                        return "object" == typeof t && "[object Array]" === n(t)
                    }, r.__isRegExp = function(t) {
                        return "object" == typeof t && "[object RegExp]" === n(t)
                    }, r.__getRegExpFlags = o, r
                }();
                "object" == typeof e && e.exports && (e.exports = r)
            }).call(this, t("buffer").Buffer)
        }, {
            buffer: 12
        }],
        14: [function(t, e, r) {
            arguments[4][2][0].apply(r, arguments)
        }, {
            dup: 2
        }],
        15: [function(t, e, r) {
            r.read = function(t, e, r, n, o) {
                var i, s, a = 8 * o - n - 1,
                    c = (1 << a) - 1,
                    u = c >> 1,
                    h = -7,
                    p = r ? o - 1 : 0,
                    l = r ? -1 : 1,
                    f = t[e + p];
                for (p += l, i = f & (1 << -h) - 1, f >>= -h, h += a; h > 0; i = 256 * i + t[e + p], p += l, h -= 8);
                for (s = i & (1 << -h) - 1, i >>= -h, h += n; h > 0; s = 256 * s + t[e + p], p += l, h -= 8);
                if (0 === i) i = 1 - u;
                else {
                    if (i === c) return s ? NaN : 1 / 0 * (f ? -1 : 1);
                    s += Math.pow(2, n), i -= u
                }
                return (f ? -1 : 1) * s * Math.pow(2, i - n)
            }, r.write = function(t, e, r, n, o, i) {
                var s, a, c, u = 8 * i - o - 1,
                    h = (1 << u) - 1,
                    p = h >> 1,
                    l = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                    f = n ? 0 : i - 1,
                    d = n ? 1 : -1,
                    y = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
                for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (a = isNaN(e) ? 1 : 0, s = h) : (s = Math.floor(Math.log(e) / Math.LN2), e * (c = Math.pow(2, -s)) < 1 && (s--, c *= 2), e += s + p >= 1 ? l / c : l * Math.pow(2, 1 - p), e * c >= 2 && (s++, c /= 2), s + p >= h ? (a = 0, s = h) : s + p >= 1 ? (a = (e * c - 1) * Math.pow(2, o), s += p) : (a = e * Math.pow(2, p - 1) * Math.pow(2, o), s = 0)); o >= 8; t[r + f] = 255 & a, f += d, a /= 256, o -= 8);
                for (s = s << o | a, u += o; u > 0; t[r + f] = 255 & s, f += d, s /= 256, u -= 8);
                t[r + f - d] |= 128 * y
            }
        }, {}],
        16: [function(t, e) {
            "use strict";

            function r() {
                if (arguments.length) return r.from(arguments)
            }

            function n() {}
            var o = "An argument without append, prepend, or detach methods was given to `List",
                i = r.prototype;
            r.of = function() {
                return r.from.call(this, arguments)
            }, r.from = function(t) {
                var e, r, n, o = new this;
                if (t && (e = t.length))
                    for (r = -1; ++r < e;) null !== (n = t[r]) && void 0 !== n && o.append(n);
                return o
            }, i.head = null, i.tail = null, i.toArray = function() {
                for (var t = this.head, e = []; t;) e.push(t), t = t.next;
                return e
            }, i.prepend = function(t) {
                if (!t) return !1;
                if (!t.append || !t.prepend || !t.detach) throw new Error(o + "#prepend`.");
                var e, r;
                return e = this, (r = e.head) ? r.prepend(t) : (t.detach(), t.list = e, e.head = t, t)
            }, i.append = function(t) {
                if (!t) return !1;
                if (!t.append || !t.prepend || !t.detach) throw new Error(o + "#append`.");
                var e, r, n;
                return e = this, (n = e.tail) ? n.append(t) : (r = e.head) ? r.append(t) : (t.detach(), t.list = e, e.head = t, t)
            }, r.Item = n;
            var s = n.prototype;
            s.next = null, s.prev = null, s.list = null, s.detach = function() {
                var t = this,
                    e = t.list,
                    r = t.prev,
                    n = t.next;
                return e ? (e.tail === t && (e.tail = r), e.head === t && (e.head = n), e.tail === e.head && (e.tail = null), r && (r.next = n), n && (n.prev = r), t.prev = t.next = t.list = null, t) : t
            }, s.prepend = function(t) {
                if (!(t && t.append && t.prepend && t.detach)) throw new Error(o + "Item#prepend`.");
                var e = this,
                    r = e.list,
                    n = e.prev;
                return !!r && (t.detach(), n && (t.prev = n, n.next = t), t.next = e, t.list = r, e.prev = t, e === r.head && (r.head = t), r.tail || (r.tail = e), t)
            }, s.append = function(t) {
                if (!(t && t.append && t.prepend && t.detach)) throw new Error(o + "Item#append`.");
                var e = this,
                    r = e.list,
                    n = e.next;
                return !!r && (t.detach(), n && (t.next = n, n.prev = t), t.prev = e, t.list = r, e.next = t, e !== r.tail && r.tail || (r.tail = t), t)
            }, e.exports = r
        }, {}],
        17: [function(t, e) {
            "use strict";
            e.exports = t("./_source/linked-list.js")
        }, {
            "./_source/linked-list.js": 16
        }],
        18: [function(t, e) {
            "use strict";

            function r(t, e) {
                return Object.prototype.hasOwnProperty.call(t, e)
            }
            e.exports = function(t, e, o, i) {
                e = e || "&", o = o || "=";
                var s = {};
                if ("string" != typeof t || 0 === t.length) return s;
                var a = /\+/g;
                t = t.split(e);
                var c = 1e3;
                i && "number" == typeof i.maxKeys && (c = i.maxKeys);
                var u = t.length;
                c > 0 && u > c && (u = c);
                for (var h = 0; h < u; ++h) {
                    var p, l, f, d, y = t[h].replace(a, "%20"),
                        g = y.indexOf(o);
                    g >= 0 ? (p = y.substr(0, g), l = y.substr(g + 1)) : (p = y, l = ""), f = decodeURIComponent(p), d = decodeURIComponent(l), r(s, f) ? n(s[f]) ? s[f].push(d) : s[f] = [s[f], d] : s[f] = d
                }
                return s
            };
            var n = Array.isArray || function(t) {
                return "[object Array]" === Object.prototype.toString.call(t)
            }
        }, {}],
        19: [function(t, e) {
            "use strict";

            function r(t, e) {
                if (t.map) return t.map(e);
                for (var r = [], n = 0; n < t.length; n++) r.push(e(t[n], n));
                return r
            }
            var n = function(t) {
                switch (typeof t) {
                    case "string":
                        return t;
                    case "boolean":
                        return t ? "true" : "false";
                    case "number":
                        return isFinite(t) ? t : "";
                    default:
                        return ""
                }
            };
            e.exports = function(t, e, s, a) {
                return e = e || "&", s = s || "=", null === t && (t = void 0), "object" == typeof t ? r(i(t), function(i) {
                    var a = encodeURIComponent(n(i)) + s;
                    return o(t[i]) ? r(t[i], function(t) {
                        return a + encodeURIComponent(n(t))
                    }).join(e) : a + encodeURIComponent(n(t[i]))
                }).join(e) : a ? encodeURIComponent(n(a)) + s + encodeURIComponent(n(t)) : ""
            };
            var o = Array.isArray || function(t) {
                    return "[object Array]" === Object.prototype.toString.call(t)
                },
                i = Object.keys || function(t) {
                    var e = [];
                    for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && e.push(r);
                    return e
                }
        }, {}],
        20: [function(t, e, r) {
            "use strict";
            r.decode = r.parse = t("./decode"), r.encode = r.stringify = t("./encode")
        }, {
            "./decode": 18,
            "./encode": 19
        }],
        21: [function(t, e) {
            e.exports = function(t) {
                var e = [],
                    r = [];
                return function t(n, o) {
                    var i, s, a;
                    if (!("object" != typeof n || null === n || n instanceof Boolean || n instanceof Date || n instanceof Number || n instanceof RegExp || n instanceof String)) {
                        for (i = 0; i < e.length; i += 1)
                            if (e[i] === n) return {
                                $ref: r[i]
                            };
                        if (e.push(n), r.push(o), "[object Array]" === Object.prototype.toString.apply(n))
                            for (a = [], i = 0; i < n.length; i += 1) a[i] = t(n[i], o + "[" + i + "]");
                        else {
                            a = {};
                            for (s in n) Object.prototype.hasOwnProperty.call(n, s) && (a[s] = t(n[s], o + "[" + JSON.stringify(s) + "]"))
                        }
                        return a
                    }
                    return n
                }(t, "$")
            }
        }, {}],
        22: [function(t, e) {
            function r(t, e) {
                this.name = "AuthTokenExpiredError", this.message = t, this.expiry = e, Error.captureStackTrace && !w ? Error.captureStackTrace(this, arguments.callee) : this.stack = (new Error).stack
            }

            function n(t) {
                this.name = "AuthTokenInvalidError", this.message = t, Error.captureStackTrace && !w ? Error.captureStackTrace(this, arguments.callee) : this.stack = (new Error).stack
            }

            function o(t, e) {
                this.name = "AuthTokenNotBeforeError", this.message = t, this.date = e, Error.captureStackTrace && !w ? Error.captureStackTrace(this, arguments.callee) : this.stack = (new Error).stack
            }

            function i(t) {
                this.name = "AuthTokenError", this.message = t, Error.captureStackTrace && !w ? Error.captureStackTrace(this, arguments.callee) : this.stack = (new Error).stack
            }

            function s(t, e) {
                this.name = "SilentMiddlewareBlockedError", this.message = t, this.type = e, Error.captureStackTrace && !w ? Error.captureStackTrace(this, arguments.callee) : this.stack = (new Error).stack
            }

            function a(t) {
                this.name = "InvalidActionError", this.message = t, Error.captureStackTrace && !w ? Error.captureStackTrace(this, arguments.callee) : this.stack = (new Error).stack
            }

            function c(t) {
                this.name = "InvalidArgumentsError", this.message = t, Error.captureStackTrace && !w ? Error.captureStackTrace(this, arguments.callee) : this.stack = (new Error).stack
            }

            function u(t) {
                this.name = "InvalidOptionsError", this.message = t, Error.captureStackTrace && !w ? Error.captureStackTrace(this, arguments.callee) : this.stack = (new Error).stack
            }

            function h(t) {
                this.name = "InvalidMessageError", this.message = t, Error.captureStackTrace && !w ? Error.captureStackTrace(this, arguments.callee) : this.stack = (new Error).stack
            }

            function p(t, e) {
                this.name = "SocketProtocolError", this.message = t, this.code = e, Error.captureStackTrace && !w ? Error.captureStackTrace(this, arguments.callee) : this.stack = (new Error).stack
            }

            function l(t) {
                this.name = "ServerProtocolError", this.message = t, Error.captureStackTrace && !w ? Error.captureStackTrace(this, arguments.callee) : this.stack = (new Error).stack
            }

            function f(t) {
                this.name = "HTTPServerError", this.message = t, Error.captureStackTrace && !w ? Error.captureStackTrace(this, arguments.callee) : this.stack = (new Error).stack
            }

            function d(t) {
                this.name = "ResourceLimitError", this.message = t, Error.captureStackTrace && !w ? Error.captureStackTrace(this, arguments.callee) : this.stack = (new Error).stack
            }

            function y(t) {
                this.name = "TimeoutError", this.message = t, Error.captureStackTrace && !w ? Error.captureStackTrace(this, arguments.callee) : this.stack = (new Error).stack
            }

            function g(t, e) {
                this.name = "BadConnectionError", this.message = t, this.type = e, Error.captureStackTrace && !w ? Error.captureStackTrace(this, arguments.callee) : this.stack = (new Error).stack
            }

            function m(t) {
                this.name = "BrokerError", this.message = t, Error.captureStackTrace && !w ? Error.captureStackTrace(this, arguments.callee) : this.stack = (new Error).stack
            }

            function b(t, e) {
                this.name = "ProcessExitError", this.message = t, this.code = e, Error.captureStackTrace && !w ? Error.captureStackTrace(this, arguments.callee) : this.stack = (new Error).stack
            }

            function v(t) {
                this.name = "UnknownError", this.message = t, Error.captureStackTrace && !w ? Error.captureStackTrace(this, arguments.callee) : this.stack = (new Error).stack
            }
            var E = t("./decycle"),
                w = function() {
                    return !this
                }();
            r.prototype = Object.create(Error.prototype), n.prototype = Object.create(Error.prototype), o.prototype = Object.create(Error.prototype), i.prototype = Object.create(Error.prototype), s.prototype = Object.create(Error.prototype), a.prototype = Object.create(Error.prototype), c.prototype = Object.create(Error.prototype), u.prototype = Object.create(Error.prototype), h.prototype = Object.create(Error.prototype), p.prototype = Object.create(Error.prototype), l.prototype = Object.create(Error.prototype), f.prototype = Object.create(Error.prototype), d.prototype = Object.create(Error.prototype), y.prototype = Object.create(Error.prototype), g.prototype = Object.create(Error.prototype), m.prototype = Object.create(Error.prototype), b.prototype = Object.create(Error.prototype), v.prototype = Object.create(Error.prototype), e.exports = {
                AuthTokenExpiredError: r,
                AuthTokenInvalidError: n,
                AuthTokenNotBeforeError: o,
                AuthTokenError: i,
                SilentMiddlewareBlockedError: s,
                InvalidActionError: a,
                InvalidArgumentsError: c,
                InvalidOptionsError: u,
                InvalidMessageError: h,
                SocketProtocolError: p,
                ServerProtocolError: l,
                HTTPServerError: f,
                ResourceLimitError: d,
                TimeoutError: y,
                BadConnectionError: g,
                BrokerError: m,
                ProcessExitError: b,
                UnknownError: v
            }, e.exports.socketProtocolErrorStatuses = {
                1001: "Socket was disconnected",
                1002: "A WebSocket protocol error was encountered",
                1003: "Server terminated socket because it received invalid data",
                1005: "Socket closed without status code",
                1006: "Socket hung up",
                1007: "Message format was incorrect",
                1008: "Encountered a policy violation",
                1009: "Message was too big to process",
                1010: "Client ended the connection because the server did not comply with extension requirements",
                1011: "Server encountered an unexpected fatal condition",
                4e3: "Server ping timed out",
                4001: "Client pong timed out",
                4002: "Server failed to sign auth token",
                4003: "Failed to complete handshake",
                4004: "Client failed to save auth token",
                4005: "Did not receive #handshake from client before timeout",
                4006: "Failed to bind socket to message broker",
                4007: "Client connection establishment timed out"
            }, e.exports.socketProtocolIgnoreStatuses = {
                1e3: "Socket closed normally",
                1001: "Socket hung up"
            };
            var k = {
                domain: 1,
                domainEmitter: 1,
                domainThrown: 1
            };
            e.exports.dehydrateError = function(t, e) {
                var r;
                if (t && "object" == typeof t) {
                    r = {
                        message: t.message
                    }, e && (r.stack = t.stack);
                    for (var n in t) k[n] || (r[n] = t[n])
                } else r = "function" == typeof t ? "[function " + (t.name || "anonymous") + "]" : t;
                return E(r)
            }, e.exports.hydrateError = function(t) {
                var e = null;
                if (null != t)
                    if ("object" == typeof t) {
                        e = new Error(t.message);
                        for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r])
                    } else e = t;
                return e
            }, e.exports.decycle = E
        }, {
            "./decycle": 21
        }],
        23: [function(t, e) {
            (function(t) {
                var r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                    n = function(t) {
                        for (var e = new Uint8Array(t), n = e.length, o = "", i = 0; i < n; i += 3) o += r[e[i] >> 2], o += r[(3 & e[i]) << 4 | e[i + 1] >> 4], o += r[(15 & e[i + 1]) << 2 | e[i + 2] >> 6], o += r[63 & e[i + 2]];
                        return n % 3 == 2 ? o = o.substring(0, o.length - 1) + "=" : n % 3 == 1 && (o = o.substring(0, o.length - 2) + "=="), o
                    },
                    o = function(e, r) {
                        if (t.ArrayBuffer && r instanceof t.ArrayBuffer) return {
                            base64: !0,
                            data: n(r)
                        };
                        if (t.Buffer) {
                            if (r instanceof t.Buffer) return {
                                base64: !0,
                                data: r.toString("base64")
                            };
                            if (r && "Buffer" === r.type && Array.isArray(r.data)) {
                                var o;
                                return o = t.Buffer.from ? t.Buffer.from(r.data) : new t.Buffer(r.data), {
                                    base64: !0,
                                    data: o.toString("base64")
                                }
                            }
                        }
                        return r
                    };
                e.exports.decode = function(t) {
                    if (null == t) return null;
                    if ("#1" === t || "#2" === t) return t;
                    var e = t.toString();
                    try {
                        return JSON.parse(e)
                    } catch (t) {}
                    return e
                }, e.exports.encode = function(t) {
                    return "#1" === t || "#2" === t ? t : JSON.stringify(t, o)
                }
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}]
    }, {}, [3])(3)
});
class WebPush {
    constructor(config) {
        config.options = {
            hostname: config.socketUrl ? config.socketUrl.replace(/^(https?:|)\/\//, "") : "push-websocket.ilhasoft.mobi",
            secure: true,
            port: 443,
            query: {
                channelUUID: config.channelUUID,
                hostApi: config.hostApi ? config.hostApi : "https://push.ilhasoft.mobi"
            }
        };
        document.addEventListener("DOMContentLoaded", () => {
            const build = CreatePush(config).initialize();
            const events = Events(config, build);
            events.startEvents();
            config.events = events
        })
    }
}

function CreatePush(config) {
    const build = new BuildHTML(config);
    const utils = new Utils(config);
    const buttonSizeBase = 60;
    return {
        initialize: () => {
            const elementWidget = build.createElement("div", config.divName ? "embedWidget" : "", "pushChatWidget");
            const elementConversation = build.createElement("div", (config.divName ? "embedWidgetConversation " : "") + (!config.divName ? " hidden-load " : "") + "conversation", "pushChatWidgetConversation");
            elementWidget.appendChild(elementConversation);
            const elementMessages = build.createElement("div", config.divName ? "embedWidgetMessages" : "", "pushChatMessages");
            if (config.welcomeMessage) {
                elementMessages.appendChild(build.createBubblePush(config.welcomeMessage));
                utils.scrollTo(elementConversation);
                if (config.welcomeButton) {
                    let metadata = {
                      quick_replies: []
                    };
                    let quick_replies;
                    quick_replies = config.welcomeButton.split(',');
                    quick_replies.forEach(function(e) {
                      metadata.quick_replies.push({
                        title: e
                      })
                    })
                    elementMessages.appendChild(build.createBubblePushActions(metadata, elementMessages, elementConversation))
                }
            }
            elementConversation.appendChild(elementMessages);
            elementConversation.appendChild(build.createElement("div", "after", ""));
            if (!config.divName) {
                const elementClose = build.createElement("a", "hidden-load close", "pushChatWidgetClose");
                const elementCloseButton = build.createElement("div", "close-button", "pushChatWidgetCloseButton");
                const elementPoweredBy = build.createElement("a", "powered-by", "pushChatWidgetPoweredBy");
                const elementPoweredByText = document.createTextNode("intelligence by bothub.it");
                elementPoweredBy.appendChild(elementPoweredByText);
                elementPoweredBy.href = "https://bothub.it";
                elementPoweredBy.target = "_blank";
                elementClose.appendChild(elementCloseButton);
                elementWidget.appendChild(elementClose);
                elementWidget.appendChild(elementPoweredBy);
                const elementMain = build.createElement("div", "main", "pushChatWidgetStart");
                if (config.customizeWidget) {
                    let customize = "";
                    if (config.customizeWidget.mainIcon) {
                        customize += "background-image: url(" + config.customizeWidget.mainIcon + ") !important;"
                    }
                    if (config.customizeWidget.mainIconColor) {
                        customize += "background-color: " + config.customizeWidget.mainIconColor + " !important;"
                    }
                    if (config.customizeWidget.chatButtonScale) {
                        let size = buttonSizeBase * config.customizeWidget.chatButtonScale;
                        customize += "width: " + size + "px !important;";
                        customize += "height: " + size + "px !important;"
                    }
                    elementMain.setAttribute("style", customize)
                }
                document.body.appendChild(elementMain)
            }
            elementWidget.appendChild(build.createFormInput(answer => {
                const evt = new CustomEvent("sendMessageToPush", {
                    detail: answer
                });
                document.dispatchEvent(evt);
                utils.saveMessages(1, answer)
            }));
            if (config.divName) {
                document.getElementById(config.divName).appendChild(elementWidget)
            } else {
                document.body.appendChild(elementWidget)
            }
            if (config.saveMessages) {
                const messages = utils.getItem("pushMessages");
                if (messages) {
                    const messagesList = JSON.parse("[" + messages + "]");
                    for (let i = 0; i < messagesList.length; i += 1) {
                        const item = messagesList[i];
                        if (item) {
                            if (item.from === "0") {
                                elementMessages.appendChild(build.createBubblePush(item.message))
                            } else {
                                elementMessages.appendChild(build.createBubbleResponse(item.message))
                            }
                            utils.scrollTo(elementConversation)
                        }
                    }
                }
            }
            return build
        }
    }
}

function BuildHTML(config) {
    const utils = new Utils(config);
    const methods = {
        createElement: (element, css, id) => {
            const newElement = document.createElement(element);
            if (css) newElement.setAttribute("class", css);
            if (id) newElement.setAttribute("id", id);
            return newElement
        },
        createFormInput: callbackAction => {
            const elementDivForm = methods.createElement("div", "form-send bubble " + (!config.divName ? " hidden-load " : ""), "pushChatWidgetForm");
            const elementBody = methods.createElement("div", "user-response");
            const elementForm = methods.createElement("form");
            elementForm.setAttribute("onsubmit", "return false;");
            elementForm.setAttribute("autocomplete", "off");
            const elementFormInputContent = methods.createElement("div", "input-content");
            const elementInput = methods.createElement("input", "data-wrapper", "pushChatWidgetInputType");
            elementInput.setAttribute("type", "text");
            elementInput.setAttribute("autocomplete", "off");
            elementFormInputContent.appendChild(elementInput);
            elementForm.appendChild(elementFormInputContent);
            const elementButton = methods.createElement("button", "button-send");
            elementButton.addEventListener("click", () => {
                callbackAction(elementInput.value)
            });
            elementForm.appendChild(elementButton);
            elementBody.appendChild(elementForm);
            elementDivForm.appendChild(elementBody);
            return elementDivForm
        },
        createBubblePush: (msg, actions, callbackAction) => {
            const elementBubble = methods.createElement("div", "bubble animated fadeIn");
            const elementAvatar = methods.createElement("div", "avatar");
            if (config.customizeWidget) {
                let customize = "";
                if (config.customizeWidget.chatIcon) {
                    customize += "background-image: url(" + config.customizeWidget.chatIcon + ") !important;"
                }
                if (config.customizeWidget.chatIconColor) {
                    customize += "background-color: " + config.customizeWidget.chatIconColor + " !important;"
                }
                elementAvatar.setAttribute("style", customize)
            }
            elementBubble.appendChild(elementAvatar);
            const elementBody = methods.createElement("div", "body");
            if (config.customizeWidget && config.customizeWidget.chatPushMessageColor) {
                elementBody.setAttribute("style", "background-color: " + config.customizeWidget.chatPushMessageColor + " !important;")
            }
            let elementText = null;
            if (msg) {
                elementText = methods.createElement("p", "text");
                if (utils.checkIfValidJson(msg)) {
                    elementText.innerHTML = JSON.parse(msg)
                } else {
                    elementText.innerHTML = utils.contentRender(msg)
                }
                if (config.customizeWidget && config.customizeWidget.chatPushTextColor) {
                    elementText.setAttribute("style", "color: " + config.customizeWidget.chatPushTextColor + " !important;")
                }
                elementBody.appendChild(elementText);
                const imageSrc = utils.findImageURL(msg);
                if (imageSrc) {
                    const image = methods.createElement("img", "img-responsive");
                    image.setAttribute("src", imageSrc);
                    elementBody.appendChild(image)
                }
            }
            elementBubble.appendChild(elementBody);
            return elementBubble
        },
        createBubblePushActions: (metadata, elementMessages, pushConversation) => {
            const elementBubble = methods.createElement("div", "bubble animated fadeIn");
            const elementBody = methods.createElement("div", "actions", "actions");
            const elementSlider = methods.createElement("div", "slider");
            const actions = metadata.quick_replies || metadata.url_buttons;
            const elementText = methods.createElement("ul");
            for (let i = 0; i < actions.length; i += 1) {
                const action = actions[i];
                const elementLi = methods.createElement("li");
                const elementHref = methods.createElement("a", "text");
                if (config.customizeWidget) {
                    let customize = "";
                    if (config.customizeWidget.chatPushTextColor) {
                        customize += "color: " + config.customizeWidget.chatPushTextColor
                    }
                    if (config.customizeWidget.chatPushMessageColor) {
                        customize += "background-color: " + config.customizeWidget.chatPushMessageColor
                    }
                    elementHref.setAttribute("style", customize)
                }
                elementHref.setAttribute("href", "javascript:;");
                elementHref.addEventListener("click", () => {
                    if (metadata["quick_replies"] !== undefined) {
                        config.events.sendMessageToChannel(action.title);
                        elementMessages.appendChild(methods.createBubbleResponse(action.title));
                        elementMessages.removeChild(elementBubble);
                        utils.saveMessages(1, action.title)
                    }
                    utils.scrollTo(pushConversation)
                });
                if (action.url) {
                    elementHref.setAttribute("href", action.url);
                    elementHref.setAttribute("target", "_blank")
                }
                elementHref.innerHTML = action.title;
                elementLi.appendChild(elementHref);
                elementText.appendChild(elementLi)
            }
            elementSlider.appendChild(elementText);
            elementBody.appendChild(elementSlider);
            elementBubble.appendChild(elementBody);
            const elementSpanBack = methods.createElement("span", "prev");
            elementSpanBack.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 501.5 501.5"><g><path fill="#C4C4C4" d="M302.67 90.877l55.77 55.508L254.575 250.75 358.44 355.116l-55.77 55.506L143.56 250.75z"/></g></svg>';
            elementSpanBack.addEventListener("click", () => {
                utils.scrollBack(elementBody)
            });
            elementBubble.appendChild(elementSpanBack);
            const elementSpanNext = methods.createElement("span", "next");
            elementSpanNext.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 501.5 501.5"><g><path fill="#C4C4C4" d="M199.33 410.622l-55.77-55.508L247.425 250.75 143.56 146.384l55.77-55.507L358.44 250.75z"/></g></svg>';
            elementSpanNext.addEventListener("click", () => {
                utils.scrollNext(elementBody)
            });
            elementBubble.appendChild(elementSpanNext);
            return elementBubble
        },
        createBubblePushCards: (cards, callbackAction) => {
            const elementBubble = methods.createElement("div", "bubble animated fadeIn bubble-cards");
            const elementBody = methods.createElement("div", "cards", "cards");
            const elementSlider = methods.createElement("div", "slider");
            let elements = cards.attachment.payload.elements;
            const elementList = methods.createElement("ul");
            for (let i = 0; i < elements.length; i += 1) {
                const card = elements[i];
                const elementLi = methods.createElement("li");
                const elementDefault = methods.createElement("a", "text");
                elementDefault.setAttribute("href", card.default_action.url);
                elementDefault.setAttribute("target", "_blank");
                const elementCardImage = methods.createElement("div", "card-img");
                elementCardImage.setAttribute("style", "background-image: url(" + card.image_url + ");");
                const elementCardTitle = methods.createElement("div", "card-title");
                elementCardTitle.innerHTML = card.title;
                const elementCardSubtitle = methods.createElement("span", "content-summary");
                elementCardSubtitle.innerHTML = card.subtitle;
                const elementCardDefaultUrl = methods.createElement("span");
                elementCardDefaultUrl.innerHTML = card.default_action.url;
                elementCardTitle.appendChild(elementCardSubtitle);
                elementCardTitle.appendChild(elementCardDefaultUrl);
                elementDefault.appendChild(elementCardImage);
                elementDefault.appendChild(elementCardTitle);
                elementLi.appendChild(elementDefault);
                const cardButtons = card.buttons;
                for (let cardButton in cardButtons) {
                    const cardButtonElement = methods.createElement("div", "card-button-action");
                    const actionCardButtonElement = methods.createElement("a");
                    actionCardButtonElement.innerHTML = cardButtons[cardButton].title;
                    const buttonType = cardButtons[cardButton].type;
                    if (buttonType == "web_url") {
                        actionCardButtonElement.setAttribute("href", cardButtons[cardButton].url);
                        actionCardButtonElement.setAttribute("target", "_blank")
                    } else {
                        actionCardButtonElement.setAttribute("href", "javascript:;");
                        actionCardButtonElement.addEventListener("click", () => {
                            callbackAction(cardButtons[cardButton].title, elementBubble)
                        })
                    }
                    if (config.customizeWidget) {
                        let customize = "";
                        if (config.customizeWidget.chatPushButtonColor) {
                            customize += "background-color: " + config.customizeWidget.chatPushButtonColor + " !important;"
                        }
                        actionCardButtonElement.setAttribute("style", customize)
                    }
                    cardButtonElement.appendChild(actionCardButtonElement);
                    elementLi.appendChild(cardButtonElement)
                }
                elementList.appendChild(elementLi)
            }
            elementSlider.appendChild(elementList);
            elementBody.appendChild(elementSlider);
            elementBubble.appendChild(elementBody);
            const elementSpanBack = methods.createElement("span", "prev");
            elementSpanBack.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 501.5 501.5"><g><path fill="#C4C4C4" d="M302.67 90.877l55.77 55.508L254.575 250.75 358.44 355.116l-55.77 55.506L143.56 250.75z"/></g></svg>';
            elementSpanBack.addEventListener("click", () => {
                utils.scrollBack(elementBody)
            });
            elementBubble.appendChild(elementSpanBack);
            const elementSpanNext = methods.createElement("span", "next");
            elementSpanNext.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 501.5 501.5"><g><path fill="#C4C4C4" d="M199.33 410.622l-55.77-55.508L247.425 250.75 143.56 146.384l55.77-55.507L358.44 250.75z"/></g></svg>';
            elementSpanNext.addEventListener("click", () => {
                utils.scrollNext(elementBody)
            });
            elementBubble.appendChild(elementSpanNext);
            return elementBubble
        },
        createBubbleResponse: msg => {
            const elementBubble = methods.createElement("div", "bubble");
            const elementBody = methods.createElement("div", "body animated fadeIn response");
            const elementText = methods.createElement("p");
            elementText.innerHTML = msg;
            if (config.customizeWidget && config.customizeWidget.chatUserTextColor) {
                elementText.setAttribute("style", "color: " + config.customizeWidget.chatUserTextColor + " !important;")
            }
            if (config.customizeWidget && config.customizeWidget.chatUserColor) {
                elementBody.setAttribute("style", "background-color: " + config.customizeWidget.chatUserColor + " !important;")
            }
            elementBody.appendChild(elementText);
            elementBubble.appendChild(elementBody);
            return elementBubble
        },
        createBubbleEmpty: msg => {
            const elementBubble = methods.createElement("div", "none");
            const elementBody = methods.createElement("div", "body empty");
            const elementText = methods.createElement("p");
            elementBody.appendChild(elementText);
            elementBubble.appendChild(elementBody);
            return elementBubble
        }
    };
    return methods
}

function Events(config, build) {
    const utils = new Utils(config);
    const objConfig = config;
    const objBuild = build;
    let objSocket = null;
    let pushIsOpen = false;
    let messagesCount = 1;
    const pushWidget = document.getElementById("pushChatWidget");
    const pushMain = document.getElementById("pushChatWidgetStart");
    const pushCloseButton = document.getElementById("pushChatWidgetClose");
    const pushConversation = document.getElementById("pushChatWidgetConversation");
    const pushChatWidgetForm = document.getElementById("pushChatWidgetForm");
    const elementMessages = document.getElementById("pushChatMessages");
    const elementInputType = document.getElementById("pushChatWidgetInputType");
    const methods = {
        startEvents: () => {
            if (config.autoOpen) {
                methods.autoOpen()
            }
            if (!objConfig.divName) {
                pushMain.addEventListener("click", e => {
                    e.preventDefault();
                    methods.openPush()
                });
                pushCloseButton.addEventListener("click", e => {
                    e.preventDefault();
                    methods.closePush()
                });
                document.addEventListener("openPushWidget", e => {
                    e.preventDefault();
                    methods.openPush()
                })
            }
            document.addEventListener("sendMessageToPush", function(e) {
                e.preventDefault();
                if (e.detail) {
                    const answer = e.detail;
                    elementInputType.value = "";
                    methods.sendMessageToChannel(answer);
                    elementMessages.appendChild(build.createBubbleResponse(answer));
                    utils.scrollTo(pushConversation)
                }
            });
            document.addEventListener("clearPushWidget", e => {
                e.preventDefault();
                elementMessages.innerHTML = "";
                if (config.welcomeMessage) {
                    elementMessages.appendChild(build.createBubblePush(config.welcomeMessage))
                }
            });
            elementInputType.addEventListener("focus", () => {
                pushConversation.scrollTop = pushConversation.scrollHeight
            });
            elementMessages.addEventListener("DOMNodeInserted", e => {
                let target = e.target;
                let actions = target.children.actions;
                let nextButton = target.children[1];
                let prevButton = target.children[2];
                if (actions) {
                    if (target.offsetWidth < actions.offsetWidth) {
                        actions.classList.add("activeScroll");
                        nextButton.style.display = "inline";
                        prevButton.style.display = "inline"
                    }
                }
            })
        },
        autoOpen: () => {
            methods.openPush()
        },
        openPush: () => {
            methods.serverConnection();
            pushIsOpen = true;
            pushWidget.classList.add("active");
            if (objConfig.divName) {
                pushWidget.classList.add("embedWidget")
            }
            pushConversation.classList.remove("hidden-load");
            pushConversation.classList.remove("slideOutRight");
            pushConversation.classList.add("animated");
            if (!objConfig.divName) {
                pushConversation.classList.add("bounceInRight");
                pushMain.classList.add("animated");
                pushMain.classList.add("fadeOut");
                pushCloseButton.classList.remove("hidden-load")
            }
            pushChatWidgetForm.classList.remove("hidden-load");
            pushChatWidgetForm.classList.remove("slideOutRight");
            if (!objConfig.divName) {
                pushChatWidgetForm.classList.add("animated");
                pushChatWidgetForm.classList.add("bounceInRight");
                setTimeout(() => {
                    pushMain.classList.add("hidden-load")
                }, 800)
            }
        },
        closePush: () => {
            pushIsOpen = false;
            pushWidget.classList.remove("active");
            pushConversation.classList.remove("bounceInRight");
            pushConversation.classList.add("slideOutRight");
            pushMain.classList.remove("hidden-load");
            pushMain.classList.remove("fadeOut");
            pushMain.classList.add("fadeIn");
            pushCloseButton.classList.add("hidden-load");
            pushChatWidgetForm.classList.remove("bounceInRight");
            pushChatWidgetForm.classList.add("animated");
            pushChatWidgetForm.classList.add("slideOutRight");
            setTimeout(() => {
                pushChatWidgetForm.classList.add("hidden-load")
            }, 100)
        },
        connectToServer: () => {
            if (!objSocket) {
                objSocket = socketCluster.connect(config.options)
            }
        },
        registerUser: () => {
            objSocket.emit("registerUser", {}, _response => {
                const data = JSON.parse(_response);
                if (data.urn) {
                    utils.setItem("userUrn", data.urn);
                    methods.receiveMessageFromChannel()
                } else {
                    console.error(data)
                }
            })
        },
        serverConnection: () => {
            methods.connectToServer();
            if (!utils.getItem("userUrn")) {
                methods.registerUser()
            } else {
                methods.receiveMessageFromChannel()
            }
        },
        sendMessageToChannel: message => {
            if (utils.getItem("userUrn") && message) {
                zeroDelay();
                objSocket.emit("sendMessageToChannel", {
                    text: message,
                    userUrn: utils.getItem("userUrn")
                });
                return true
            }
        },
        receiveMessageFromChannel: () => {
            if (!objSocket.isSubscribed(utils.getItem("userUrn"))) {
                objSocket.subscribe(utils.getItem("userUrn")).watch(data => {
                    if (data.to === utils.getItem("userUrn")) {
                        if (messagesCount <= 1 || config.messagesTimeout <= 0) {
                            addMessage(data)
                        } else {
                            setTimeout(addMessageDelayed, messagesCount * config.messagesTimeout, data)
                        }
                        messagesCount += 1
                    }
                })
            }
        }
    };
    return methods;

    function zeroDelay() {
        messagesCount = 1
    }

    function addMessageDelayed(data) {
        messagesCount -= 1;
        addMessage(data)
    }

    function addMessage(data) {
        const evt = new CustomEvent("onMessageReceived", {
            detail: data
        });
        document.dispatchEvent(evt);
        if (data.text) {
            if (!utils.checkIfValidJson(data.text)) {
                elementMessages.appendChild(build.createBubblePush(data.text));
                const imageSrc = utils.findImageURL(data.text);
                if (imageSrc) {
                    setTimeout(() => {
                        elementMessages.appendChild(build.createBubbleEmpty());
                        pushConversation.scrollTop = pushConversation.scrollHeight
                    }, 2e3)
                }
                utils.scrollTo(pushConversation)
            }
            utils.saveMessages(0, data.text)
        }
        if (pushIsOpen === false) {
            methods.openPush()
        }
        if (data.metadata) {
            elementMessages.appendChild(build.createBubblePushActions(data.metadata, elementMessages, pushConversation))
        } else if (utils.checkIfValidJson(data.text)) {
            const textDeserialized = JSON.parse(data.text);
            elementMessages.appendChild(build.createBubblePushCards(textDeserialized, (answer, div) => {
                methods.sendMessageToChannel(answer);
                elementMessages.appendChild(build.createBubbleResponse(answer));
                utils.saveMessages(1, answer);
                utils.scrollTo(pushConversation)
            }))
        }
    }
}

function Utils(config) {
    const methods = {
        getItem: name => {
            return localStorage.getItem(name)
        },
        setItem: (name, value) => {
            return localStorage.setItem(name, value)
        },
        saveMessages: (from, message) => {
            if (message && config.saveMessages) {
                const messages = methods.getItem("pushMessages");
                let messagesToSave = messages !== null ? `${messages},` : "";
                message = message.replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
                message = message.replace(/\n/g, "<br/>");
                methods.setItem("pushMessages", `${messagesToSave}{"from": "${from}", "message": "${message}"}`)
            }
        },
        scrollTo: el => {
            const scrollToBottom = el => {
                el.scrollTop = el.scrollHeight
            };
            let timeout;
            let scrolled = false;
            el.addEventListener("scroll", () => {
                if (timeout) window.clearTimeout(timeout);
                window.setTimeout(() => {
                    scrolled = el.scrollTop + el.clientHeight + 1 < el.scrollHeight;
                    if (scrolled === false) {
                        scrollToBottom(el)
                    }
                }, 200)
            });
            const observer = new MutationObserver(() => {
                scrollToBottom(el)
            });
            observer.observe(el, {
                childList: true,
                subtree: true
            })
        },
        contentRender: content => {
            content = content.replace(/(https?:\/\/\S+(?:png|jpe?g|gif)\S*)/, "");
            content = content.replace(/\n/g, "<br/>");
            content = content.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" class="link" target="_blank">$1</a>');
            return content
        },
        findImageURL: content => {
            const regex = /(https?:\/\/\S+(?:png|jpe?g|gif)\S*)/;
            const source = content.toString();
            let url;
            if (source) {
                const match = regex.exec(source);
                if (match !== null) {
                    url = match[0]
                }
            }
            return url
        },
        checkIfValidJson: content => {
            try {
                JSON.parse(content)
            } catch (e) {
                return false
            }
            return true
        },
        scrollBack: container => {
            let scrollAmount = 0;
            const slideTimer = setInterval(() => {
                container.scrollLeft -= 10;
                scrollAmount += 10;
                if (scrollAmount >= 100) {
                    window.clearInterval(slideTimer)
                }
            }, 25)
        },
        scrollNext: container => {
            let scrollAmount = 0;
            const slideTimer = setInterval(() => {
                container.scrollLeft += 10;
                scrollAmount += 10;
                if (scrollAmount >= 100) {
                    window.clearInterval(slideTimer)
                }
            }, 25)
        }
    };
    return methods
}
