import { a as saveVideos, c as __require, i as savePinSettings, l as __toESM, n as getSavedVideos, o as require_browser_polyfill, r as isVaultLocked, s as __commonJSMin, t as getPinSettings } from "./storage-vault.js";
import { a as require_client, i as createLucideIcon, n as Shield, o as require_react, r as Lock, t as require_jsx_runtime } from "./globals.js";
//#region node_modules/dexie/dist/dexie.min.js
var require_dexie_min = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	((e, t) => {
		"object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).Dexie = t();
	})(exports, function() {
		var B = function(e, t) {
			return (B = Object.setPrototypeOf || ({ __proto__: [] } instanceof Array ? function(e, t) {
				e.__proto__ = t;
			} : function(e, t) {
				for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
			}))(e, t);
		};
		var _ = function() {
			return (_ = Object.assign || function(e) {
				for (var t, n = 1, r = arguments.length; n < r; n++) for (var o in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
				return e;
			}).apply(this, arguments);
		};
		function R(e, t, n) {
			if (n || 2 === arguments.length) for (var r, o = 0, i = t.length; o < i; o++) !r && o in t || ((r = r || Array.prototype.slice.call(t, 0, o))[o] = t[o]);
			return e.concat(r || Array.prototype.slice.call(t));
		}
		var f = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : global, O = Object.keys, x = Array.isArray;
		function a(t, n) {
			return "object" == typeof n && O(n).forEach(function(e) {
				t[e] = n[e];
			}), t;
		}
		"undefined" == typeof Promise || f.Promise || (f.Promise = Promise);
		var F = Object.getPrototypeOf, M = {}.hasOwnProperty;
		function m(e, t) {
			return M.call(e, t);
		}
		function N(t, n) {
			"function" == typeof n && (n = n(F(t))), ("undefined" == typeof Reflect ? O : Reflect.ownKeys)(n).forEach(function(e) {
				u(t, e, n[e]);
			});
		}
		var L = Object.defineProperty;
		function u(e, t, n, r) {
			L(e, t, a(n && m(n, "get") && "function" == typeof n.get ? {
				get: n.get,
				set: n.set,
				configurable: !0
			} : {
				value: n,
				configurable: !0,
				writable: !0
			}, r));
		}
		function U(t) {
			return { from: function(e) {
				return t.prototype = Object.create(e.prototype), u(t.prototype, "constructor", t), { extend: N.bind(null, t.prototype) };
			} };
		}
		var V = Object.getOwnPropertyDescriptor;
		var z = [].slice;
		function W(e, t, n) {
			return z.call(e, t, n);
		}
		function Y(e, t) {
			return t(e);
		}
		function $(e) {
			if (!e) throw new Error("Assertion Failed");
		}
		function Q(e) {
			f.setImmediate ? setImmediate(e) : setTimeout(e, 0);
		}
		function c(e, t) {
			if ("string" == typeof t && m(e, t)) return e[t];
			if (!t) return e;
			if ("string" != typeof t) {
				for (var n = [], r = 0, o = t.length; r < o; ++r) {
					var i = c(e, t[r]);
					n.push(i);
				}
				return n;
			}
			var a, u = t.indexOf(".");
			return -1 === u || null == (a = e[t.substr(0, u)]) ? void 0 : c(a, t.substr(u + 1));
		}
		function b(e, t, n) {
			if (e && void 0 !== t && !("isFrozen" in Object && Object.isFrozen(e))) if ("string" != typeof t && "length" in t) {
				$("string" != typeof n && "length" in n);
				for (var r = 0, o = t.length; r < o; ++r) b(e, t[r], n[r]);
			} else {
				var i, a, u = t.indexOf(".");
				-1 !== u ? (i = t.substr(0, u), "" === (u = t.substr(u + 1)) ? void 0 === n ? x(e) && !isNaN(parseInt(i)) ? e.splice(i, 1) : delete e[i] : e[i] = n : b(a = (a = e[i]) && m(e, i) ? a : e[i] = {}, u, n)) : void 0 === n ? x(e) && !isNaN(parseInt(t)) ? e.splice(t, 1) : delete e[t] : e[t] = n;
			}
		}
		function G(e) {
			var t, n = {};
			for (t in e) m(e, t) && (n[t] = e[t]);
			return n;
		}
		var X = [].concat;
		function H(e) {
			return X.apply([], e);
		}
		var e = "BigUint64Array,BigInt64Array,Array,Boolean,String,Date,RegExp,Blob,File,FileList,FileSystemFileHandle,FileSystemDirectoryHandle,ArrayBuffer,DataView,Uint8ClampedArray,ImageBitmap,ImageData,Map,Set,CryptoKey".split(",").concat(H([
			8,
			16,
			32,
			64
		].map(function(t) {
			return [
				"Int",
				"Uint",
				"Float"
			].map(function(e) {
				return e + t + "Array";
			});
		}))).filter(function(e) {
			return f[e];
		}), J = new Set(e.map(function(e) {
			return f[e];
		}));
		var Z = null;
		function ee(e) {
			Z = /* @__PURE__ */ new WeakMap();
			e = function e(t) {
				if (!t || "object" != typeof t) return t;
				var n = Z.get(t);
				if (n) return n;
				if (x(t)) {
					n = [], Z.set(t, n);
					for (var r = 0, o = t.length; r < o; ++r) n.push(e(t[r]));
				} else if (J.has(t.constructor)) n = t;
				else {
					var i, a = F(t);
					for (i in n = a === Object.prototype ? {} : Object.create(a), Z.set(t, n), t) m(t, i) && (n[i] = e(t[i]));
				}
				return n;
			}(e);
			return Z = null, e;
		}
		var te = {}.toString;
		function ne(e) {
			return te.call(e).slice(8, -1);
		}
		var re = "undefined" != typeof Symbol ? Symbol.iterator : "@@iterator", oe = "symbol" == typeof re ? function(e) {
			var t;
			return null != e && (t = e[re]) && t.apply(e);
		} : function() {
			return null;
		};
		function ie(e, t) {
			t = e.indexOf(t);
			0 <= t && e.splice(t, 1);
		}
		var ae = {};
		function n(e) {
			var t, n, r, o;
			if (1 === arguments.length) {
				if (x(e)) return e.slice();
				if (this === ae && "string" == typeof e) return [e];
				if (o = oe(e)) for (n = []; !(r = o.next()).done;) n.push(r.value);
				else {
					if (null == e) return [e];
					if ("number" != typeof (t = e.length)) return [e];
					for (n = new Array(t); t--;) n[t] = e[t];
				}
			} else for (t = arguments.length, n = new Array(t); t--;) n[t] = arguments[t];
			return n;
		}
		var ue = "undefined" != typeof Symbol ? function(e) {
			return "AsyncFunction" === e[Symbol.toStringTag];
		} : function() {
			return !1;
		}, e = [
			"Unknown",
			"Constraint",
			"Data",
			"TransactionInactive",
			"ReadOnly",
			"Version",
			"NotFound",
			"InvalidState",
			"InvalidAccess",
			"Abort",
			"Timeout",
			"QuotaExceeded",
			"Syntax",
			"DataClone"
		], t = [
			"Modify",
			"Bulk",
			"OpenFailed",
			"VersionChange",
			"Schema",
			"Upgrade",
			"InvalidTable",
			"MissingAPI",
			"NoSuchDatabase",
			"InvalidArgument",
			"SubTransaction",
			"Unsupported",
			"Internal",
			"DatabaseClosed",
			"PrematureCommit",
			"ForeignAwait"
		].concat(e), se = {
			VersionChanged: "Database version changed by other database connection",
			DatabaseClosed: "Database has been closed",
			Abort: "Transaction aborted",
			TransactionInactive: "Transaction has already completed or failed",
			MissingAPI: "IndexedDB API missing. Please visit https://tinyurl.com/y2uuvskb"
		};
		function ce(e, t) {
			this.name = e, this.message = t;
		}
		function le(e, t) {
			return e + ". Errors: " + Object.keys(t).map(function(e) {
				return t[e].toString();
			}).filter(function(e, t, n) {
				return n.indexOf(e) === t;
			}).join("\n");
		}
		function fe(e, t, n, r) {
			this.failures = t, this.failedKeys = r, this.successCount = n, this.message = le(e, t);
		}
		function he(e, t) {
			this.name = "BulkError", this.failures = Object.keys(t).map(function(e) {
				return t[e];
			}), this.failuresByPos = t, this.message = le(e, this.failures);
		}
		U(ce).from(Error).extend({ toString: function() {
			return this.name + ": " + this.message;
		} }), U(fe).from(ce), U(he).from(ce);
		var de = t.reduce(function(e, t) {
			return e[t] = t + "Error", e;
		}, {}), pe = ce, k = t.reduce(function(e, n) {
			var r = n + "Error";
			function t(e, t) {
				this.name = r, e ? "string" == typeof e ? (this.message = "".concat(e).concat(t ? "\n " + t : ""), this.inner = t || null) : "object" == typeof e && (this.message = "".concat(e.name, " ").concat(e.message), this.inner = e) : (this.message = se[n] || r, this.inner = null);
			}
			return U(t).from(pe), e[n] = t, e;
		}, {}), ye = (k.Syntax = SyntaxError, k.Type = TypeError, k.Range = RangeError, e.reduce(function(e, t) {
			return e[t + "Error"] = k[t], e;
		}, {}));
		e = t.reduce(function(e, t) {
			return -1 === [
				"Syntax",
				"Type",
				"Range"
			].indexOf(t) && (e[t + "Error"] = k[t]), e;
		}, {});
		function g() {}
		function ve(e) {
			return e;
		}
		function me(t, n) {
			return null == t || t === ve ? n : function(e) {
				return n(t(e));
			};
		}
		function be(e, t) {
			return function() {
				e.apply(this, arguments), t.apply(this, arguments);
			};
		}
		function ge(o, i) {
			return o === g ? i : function() {
				var e = o.apply(this, arguments), t = (void 0 !== e && (arguments[0] = e), this.onsuccess), n = this.onerror, r = (this.onsuccess = null, this.onerror = null, i.apply(this, arguments));
				return t && (this.onsuccess = this.onsuccess ? be(t, this.onsuccess) : t), n && (this.onerror = this.onerror ? be(n, this.onerror) : n), void 0 !== r ? r : e;
			};
		}
		function we(n, r) {
			return n === g ? r : function() {
				n.apply(this, arguments);
				var e = this.onsuccess, t = this.onerror;
				this.onsuccess = this.onerror = null, r.apply(this, arguments), e && (this.onsuccess = this.onsuccess ? be(e, this.onsuccess) : e), t && (this.onerror = this.onerror ? be(t, this.onerror) : t);
			};
		}
		function _e(o, i) {
			return o === g ? i : function(e) {
				var t = o.apply(this, arguments), e = (a(e, t), this.onsuccess), n = this.onerror, r = (this.onsuccess = null, this.onerror = null, i.apply(this, arguments));
				return e && (this.onsuccess = this.onsuccess ? be(e, this.onsuccess) : e), n && (this.onerror = this.onerror ? be(n, this.onerror) : n), void 0 === t ? void 0 === r ? void 0 : r : a(t, r);
			};
		}
		function xe(e, t) {
			return e === g ? t : function() {
				return !1 !== t.apply(this, arguments) && e.apply(this, arguments);
			};
		}
		function ke(o, i) {
			return o === g ? i : function() {
				var e = o.apply(this, arguments);
				if (e && "function" == typeof e.then) {
					for (var t = this, n = arguments.length, r = new Array(n); n--;) r[n] = arguments[n];
					return e.then(function() {
						return i.apply(t, r);
					});
				}
				return i.apply(this, arguments);
			};
		}
		e.ModifyError = fe, e.DexieError = ce, e.BulkError = he;
		var l = "undefined" != typeof location && /^(http|https):\/\/(localhost|127\.0\.0\.1)/.test(location.href);
		function Oe(e) {
			l = e;
		}
		var Pe = {}, Ke = 100, Ee = "undefined" == typeof Promise ? [] : (t = Promise.resolve(), "undefined" != typeof crypto && crypto.subtle ? [
			Ee = crypto.subtle.digest("SHA-512", new Uint8Array([0])),
			F(Ee),
			t
		] : [
			t,
			F(t),
			t
		]), t = Ee[0], Se = Ee[1], Se = Se && Se.then, je = t && t.constructor, Ae = !!Ee[2];
		var Ce = function(e, t) {
			Re.push([e, t]), Ie && (queueMicrotask(Ye), Ie = !1);
		}, Te = !0, Ie = !0, qe = [], De = [], Be = ve, s = {
			id: "global",
			global: !0,
			ref: 0,
			unhandleds: [],
			onunhandled: g,
			pgp: !1,
			env: {},
			finalize: g
		}, P = s, Re = [], Fe = 0, Me = [];
		function K(e) {
			if ("object" != typeof this) throw new TypeError("Promises must be constructed via new");
			this._listeners = [], this._lib = !1;
			var t = this._PSD = P;
			if ("function" != typeof e) {
				if (e !== Pe) throw new TypeError("Not a function");
				this._state = arguments[1], this._value = arguments[2], !1 === this._state && Ue(this, this._value);
			} else this._state = null, this._value = null, ++t.ref, function t(r, e) {
				try {
					e(function(n) {
						if (null === r._state) {
							if (n === r) throw new TypeError("A promise cannot be resolved with itself.");
							var e = r._lib && $e();
							n && "function" == typeof n.then ? t(r, function(e, t) {
								n instanceof K ? n._then(e, t) : n.then(e, t);
							}) : (r._state = !0, r._value = n, Ve(r)), e && Qe();
						}
					}, Ue.bind(null, r));
				} catch (e) {
					Ue(r, e);
				}
			}(this, e);
		}
		var Ne = {
			get: function() {
				var u = P, t = et;
				function e(n, r) {
					var o = this, i = !u.global && (u !== P || t !== et), a = i && !v(), e = new K(function(e, t) {
						ze(o, new Le(ut(n, u, i, a), ut(r, u, i, a), e, t, u));
					});
					return this._consoleTask && (e._consoleTask = this._consoleTask), e;
				}
				return e.prototype = Pe, e;
			},
			set: function(e) {
				u(this, "then", e && e.prototype === Pe ? Ne : {
					get: function() {
						return e;
					},
					set: Ne.set
				});
			}
		};
		function Le(e, t, n, r, o) {
			this.onFulfilled = "function" == typeof e ? e : null, this.onRejected = "function" == typeof t ? t : null, this.resolve = n, this.reject = r, this.psd = o;
		}
		function Ue(e, t) {
			var n, r;
			De.push(t), null === e._state && (n = e._lib && $e(), t = Be(t), e._state = !1, e._value = t, r = e, qe.some(function(e) {
				return e._value === r._value;
			}) || qe.push(r), Ve(e), n) && Qe();
		}
		function Ve(e) {
			var t = e._listeners;
			e._listeners = [];
			for (var n = 0, r = t.length; n < r; ++n) ze(e, t[n]);
			var o = e._PSD;
			--o.ref || o.finalize(), 0 === Fe && (++Fe, Ce(function() {
				0 == --Fe && Ge();
			}, []));
		}
		function ze(e, t) {
			if (null === e._state) e._listeners.push(t);
			else {
				var n = e._state ? t.onFulfilled : t.onRejected;
				if (null === n) return (e._state ? t.resolve : t.reject)(e._value);
				++t.psd.ref, ++Fe, Ce(We, [
					n,
					e,
					t
				]);
			}
		}
		function We(e, t, n) {
			try {
				var r, o = t._value;
				!t._state && De.length && (De = []), r = l && t._consoleTask ? t._consoleTask.run(function() {
					return e(o);
				}) : e(o), t._state || -1 !== De.indexOf(o) || ((e) => {
					for (var t = qe.length; t;) if (qe[--t]._value === e._value) return qe.splice(t, 1);
				})(t), n.resolve(r);
			} catch (e) {
				n.reject(e);
			} finally {
				0 == --Fe && Ge(), --n.psd.ref || n.psd.finalize();
			}
		}
		function Ye() {
			at(s, function() {
				$e() && Qe();
			});
		}
		function $e() {
			var e = Te;
			return Ie = Te = !1, e;
		}
		function Qe() {
			var e, t, n;
			do
				for (; 0 < Re.length;) for (e = Re, Re = [], n = e.length, t = 0; t < n; ++t) {
					var r = e[t];
					r[0].apply(null, r[1]);
				}
			while (0 < Re.length);
			Ie = Te = !0;
		}
		function Ge() {
			for (var e = qe, t = (qe = [], e.forEach(function(e) {
				e._PSD.onunhandled.call(null, e._value, e);
			}), Me.slice(0)), n = t.length; n;) t[--n]();
		}
		function Xe(e) {
			return new K(Pe, !1, e);
		}
		function E(n, r) {
			var o = P;
			return function() {
				var e = $e(), t = P;
				try {
					return h(o, !0), n.apply(this, arguments);
				} catch (e) {
					r && r(e);
				} finally {
					h(t, !1), e && Qe();
				}
			};
		}
		N(K.prototype, {
			then: Ne,
			_then: function(e, t) {
				ze(this, new Le(null, null, e, t, P));
			},
			catch: function(e) {
				var t, n;
				return 1 === arguments.length ? this.then(null, e) : (t = e, n = arguments[1], "function" == typeof t ? this.then(null, function(e) {
					return (e instanceof t ? n : Xe)(e);
				}) : this.then(null, function(e) {
					return (e && e.name === t ? n : Xe)(e);
				}));
			},
			finally: function(t) {
				return this.then(function(e) {
					return K.resolve(t()).then(function() {
						return e;
					});
				}, function(e) {
					return K.resolve(t()).then(function() {
						return Xe(e);
					});
				});
			},
			timeout: function(r, o) {
				var i = this;
				return r < Infinity ? new K(function(e, t) {
					var n = setTimeout(function() {
						return t(new k.Timeout(o));
					}, r);
					i.then(e, t).finally(clearTimeout.bind(null, n));
				}) : this;
			}
		}), "undefined" != typeof Symbol && Symbol.toStringTag && u(K.prototype, Symbol.toStringTag, "Dexie.Promise"), s.env = it(), N(K, {
			all: function() {
				var i = n.apply(null, arguments).map(rt);
				return new K(function(n, r) {
					0 === i.length && n([]);
					var o = i.length;
					i.forEach(function(e, t) {
						return K.resolve(e).then(function(e) {
							i[t] = e, --o || n(i);
						}, r);
					});
				});
			},
			resolve: function(n) {
				return n instanceof K ? n : n && "function" == typeof n.then ? new K(function(e, t) {
					n.then(e, t);
				}) : new K(Pe, !0, n);
			},
			reject: Xe,
			race: function() {
				var e = n.apply(null, arguments).map(rt);
				return new K(function(t, n) {
					e.map(function(e) {
						return K.resolve(e).then(t, n);
					});
				});
			},
			PSD: {
				get: function() {
					return P;
				},
				set: function(e) {
					return P = e;
				}
			},
			totalEchoes: { get: function() {
				return et;
			} },
			newPSD: y,
			usePSD: at,
			scheduler: {
				get: function() {
					return Ce;
				},
				set: function(e) {
					Ce = e;
				}
			},
			rejectionMapper: {
				get: function() {
					return Be;
				},
				set: function(e) {
					Be = e;
				}
			},
			follow: function(o, n) {
				return new K(function(e, t) {
					return y(function(n, r) {
						var e = P;
						e.unhandleds = [], e.onunhandled = r, e.finalize = be(function() {
							var t, e = this;
							t = function() {
								0 === e.unhandleds.length ? n() : r(e.unhandleds[0]);
							}, Me.push(function e() {
								t(), Me.splice(Me.indexOf(e), 1);
							}), ++Fe, Ce(function() {
								0 == --Fe && Ge();
							}, []);
						}, e.finalize), o();
					}, n, e, t);
				});
			}
		}), je && (je.allSettled && u(K, "allSettled", function() {
			var e = n.apply(null, arguments).map(rt);
			return new K(function(n) {
				0 === e.length && n([]);
				var r = e.length, o = new Array(r);
				e.forEach(function(e, t) {
					return K.resolve(e).then(function(e) {
						return o[t] = {
							status: "fulfilled",
							value: e
						};
					}, function(e) {
						return o[t] = {
							status: "rejected",
							reason: e
						};
					}).then(function() {
						return --r || n(o);
					});
				});
			});
		}), je.any && "undefined" != typeof AggregateError && u(K, "any", function() {
			var e = n.apply(null, arguments).map(rt);
			return new K(function(n, r) {
				0 === e.length && r(/* @__PURE__ */ new AggregateError([]));
				var o = e.length, i = new Array(o);
				e.forEach(function(e, t) {
					return K.resolve(e).then(function(e) {
						return n(e);
					}, function(e) {
						i[t] = e, --o || r(new AggregateError(i));
					});
				});
			});
		}), je.withResolvers) && (K.withResolvers = je.withResolvers);
		var i = {
			awaits: 0,
			echoes: 0,
			id: 0
		}, He = 0, Je = [], Ze = 0, et = 0, tt = 0;
		function y(e, t, n, r) {
			var o = P, i = Object.create(o), t = (i.parent = o, i.ref = 0, i.global = !1, i.id = ++tt, s.env, i.env = Ae ? {
				Promise: K,
				PromiseProp: {
					value: K,
					configurable: !0,
					writable: !0
				},
				all: K.all,
				race: K.race,
				allSettled: K.allSettled,
				any: K.any,
				resolve: K.resolve,
				reject: K.reject
			} : {}, t && a(i, t), ++o.ref, i.finalize = function() {
				--this.parent.ref || this.parent.finalize();
			}, at(i, e, n, r));
			return 0 === i.ref && i.finalize(), t;
		}
		function nt() {
			return i.id || (i.id = ++He), ++i.awaits, i.echoes += Ke, i.id;
		}
		function v() {
			return !!i.awaits && (0 == --i.awaits && (i.id = 0), i.echoes = i.awaits * Ke, !0);
		}
		function rt(e) {
			return i.echoes && e && e.constructor === je ? (nt(), e.then(function(e) {
				return v(), e;
			}, function(e) {
				return v(), w(e);
			})) : e;
		}
		function ot() {
			var e = Je[Je.length - 1];
			Je.pop(), h(e, !1);
		}
		function h(e, t) {
			var n, r, o = P;
			(t ? !i.echoes || Ze++ && e === P : !Ze || --Ze && e === P) || queueMicrotask(t ? function(e) {
				++et, i.echoes && 0 != --i.echoes || (i.echoes = i.awaits = i.id = 0), Je.push(P), h(e, !0);
			}.bind(null, e) : ot), e !== P && (P = e, o === s && (s.env = it()), Ae) && (n = s.env.Promise, r = e.env, o.global || e.global) && (Object.defineProperty(f, "Promise", r.PromiseProp), n.all = r.all, n.race = r.race, n.resolve = r.resolve, n.reject = r.reject, r.allSettled && (n.allSettled = r.allSettled), r.any) && (n.any = r.any);
		}
		function it() {
			var e = f.Promise;
			return Ae ? {
				Promise: e,
				PromiseProp: Object.getOwnPropertyDescriptor(f, "Promise"),
				all: e.all,
				race: e.race,
				allSettled: e.allSettled,
				any: e.any,
				resolve: e.resolve,
				reject: e.reject
			} : {};
		}
		function at(e, t, n, r, o) {
			var i = P;
			try {
				return h(e, !0), t(n, r, o);
			} finally {
				h(i, !1);
			}
		}
		function ut(t, n, r, o) {
			return "function" != typeof t ? t : function() {
				var e = P;
				r && nt(), h(n, !0);
				try {
					return t.apply(this, arguments);
				} finally {
					h(e, !1), o && queueMicrotask(v);
				}
			};
		}
		function st(e) {
			Promise === je && 0 === i.echoes ? 0 === Ze ? e() : enqueueNativeMicroTask(e) : setTimeout(e, 0);
		}
		-1 === ("" + Se).indexOf("[native code]") && (nt = v = g);
		var w = K.reject;
		var ct = String.fromCharCode(65535), S = "Invalid key provided. Keys must be of type string, number, Date or Array<string | number | Date>.", lt = "String expected.", ft = [], ht = "__dbnames", dt = "readonly", pt = "readwrite";
		function yt(e, t) {
			return e ? t ? function() {
				return e.apply(this, arguments) && t.apply(this, arguments);
			} : e : t;
		}
		var vt = {
			type: 3,
			lower: -Infinity,
			lowerOpen: !1,
			upper: [[]],
			upperOpen: !1
		};
		function mt(t) {
			return "string" != typeof t || /\./.test(t) ? function(e) {
				return e;
			} : function(e) {
				return void 0 === e[t] && t in e && delete (e = ee(e))[t], e;
			};
		}
		function bt() {
			throw k.Type("Entity instances must never be new:ed. Instances are generated by the framework bypassing the constructor.");
		}
		function j(e, t) {
			try {
				var n = gt(e), r = gt(t);
				if (n !== r) return "Array" === n ? 1 : "Array" === r ? -1 : "binary" === n ? 1 : "binary" === r ? -1 : "string" === n ? 1 : "string" === r ? -1 : "Date" === n ? 1 : "Date" !== r ? NaN : -1;
				switch (n) {
					case "number":
					case "Date":
					case "string": return t < e ? 1 : e < t ? -1 : 0;
					case "binary":
						for (var o = wt(e), i = wt(t), a = o.length, u = i.length, s = a < u ? a : u, c = 0; c < s; ++c) if (o[c] !== i[c]) return o[c] < i[c] ? -1 : 1;
						return a === u ? 0 : a < u ? -1 : 1;
					case "Array":
						for (var l = e, f = t, h = l.length, d = f.length, p = h < d ? h : d, y = 0; y < p; ++y) {
							var v = j(l[y], f[y]);
							if (0 !== v) return v;
						}
						return h === d ? 0 : h < d ? -1 : 1;
				}
			} catch (e) {}
			return NaN;
		}
		function gt(e) {
			var t = typeof e;
			return "object" == t && (ArrayBuffer.isView(e) || "ArrayBuffer" === (t = ne(e))) ? "binary" : t;
		}
		function wt(e) {
			return e instanceof Uint8Array ? e : ArrayBuffer.isView(e) ? new Uint8Array(e.buffer, e.byteOffset, e.byteLength) : new Uint8Array(e);
		}
		function _t(t, n, r) {
			var e = t.schema.yProps;
			return e ? (n && 0 < r.numFailures && (n = n.filter(function(e, t) {
				return !r.failures[t];
			})), Promise.all(e.map(function(e) {
				e = e.updatesTable;
				return n ? t.db.table(e).where("k").anyOf(n).delete() : t.db.table(e).clear();
			})).then(function() {
				return r;
			})) : r;
		}
		kt.prototype.execute = function(e) {
			var t = this["@@propmod"];
			if (void 0 !== t.add) {
				var n = t.add;
				if (x(n)) return R(R([], x(e) ? e : [], !0), n, !0).sort();
				if ("number" == typeof n) return (Number(e) || 0) + n;
				if ("bigint" == typeof n) try {
					return BigInt(e) + n;
				} catch (e) {
					return BigInt(0) + n;
				}
				throw new TypeError("Invalid term ".concat(n));
			}
			if (void 0 !== t.remove) {
				var r = t.remove;
				if (x(r)) return x(e) ? e.filter(function(e) {
					return !r.includes(e);
				}).sort() : [];
				if ("number" == typeof r) return Number(e) - r;
				if ("bigint" == typeof r) try {
					return BigInt(e) - r;
				} catch (e) {
					return BigInt(0) - r;
				}
				throw new TypeError("Invalid subtrahend ".concat(r));
			}
			n = null == (n = t.replacePrefix) ? void 0 : n[0];
			return n && "string" == typeof e && e.startsWith(n) ? t.replacePrefix[1] + e.substring(n.length) : e;
		};
		var xt = kt;
		function kt(e) {
			this["@@propmod"] = e;
		}
		function Ot(e, t) {
			for (var n = O(t), r = n.length, o = !1, i = 0; i < r; ++i) {
				var a = n[i], u = t[a], s = c(e, a);
				u instanceof xt ? (b(e, a, u.execute(s)), o = !0) : s !== u && (b(e, a, u), o = !0);
			}
			return o;
		}
		r.prototype._trans = function(e, r, t) {
			var n = this._tx || P.trans, o = this.name, i = l && "undefined" != typeof console && console.createTask && console.createTask("Dexie: ".concat("readonly" === e ? "read" : "write", " ").concat(this.name));
			function a(e, t, n) {
				if (n.schema[o]) return r(n.idbtrans, n);
				throw new k.NotFound("Table " + o + " not part of transaction");
			}
			var u = $e();
			try {
				var s = n && n.db._novip === this.db._novip ? n === P.trans ? n._promise(e, a, t) : y(function() {
					return n._promise(e, a, t);
				}, {
					trans: n,
					transless: P.transless || P
				}) : function t(n, r, o, i) {
					if (n.idbdb && (n._state.openComplete || P.letThrough || n._vip)) {
						var a = n._createTransaction(r, o, n._dbSchema);
						try {
							a.create(), n._state.PR1398_maxLoop = 3;
						} catch (e) {
							return e.name === de.InvalidState && n.isOpen() && 0 < --n._state.PR1398_maxLoop ? (console.warn("Dexie: Need to reopen db"), n.close({ disableAutoOpen: !1 }), n.open().then(function() {
								return t(n, r, o, i);
							})) : w(e);
						}
						return a._promise(r, function(e, t) {
							return y(function() {
								return P.trans = a, i(e, t, a);
							});
						}).then(function(e) {
							if ("readwrite" === r) try {
								a.idbtrans.commit();
							} catch (e) {}
							return "readonly" === r ? e : a._completion.then(function() {
								return e;
							});
						});
					}
					if (n._state.openComplete) return w(new k.DatabaseClosed(n._state.dbOpenError));
					if (!n._state.isBeingOpened) {
						if (!n._state.autoOpen) return w(new k.DatabaseClosed());
						n.open().catch(g);
					}
					return n._state.dbReadyPromise.then(function() {
						return t(n, r, o, i);
					});
				}(this.db, e, [this.name], a);
				return i && (s._consoleTask = i, s = s.catch(function(e) {
					return console.trace(e), w(e);
				})), s;
			} finally {
				u && Qe();
			}
		}, r.prototype.get = function(t, e) {
			var n = this;
			return t && t.constructor === Object ? this.where(t).first(e) : null == t ? w(new k.Type("Invalid argument to Table.get()")) : this._trans("readonly", function(e) {
				return n.core.get({
					trans: e,
					key: t
				}).then(function(e) {
					return n.hook.reading.fire(e);
				});
			}).then(e);
		}, r.prototype.where = function(i) {
			if ("string" == typeof i) return new this.db.WhereClause(this, i);
			if (x(i)) return new this.db.WhereClause(this, "[".concat(i.join("+"), "]"));
			var n = O(i);
			if (1 === n.length) return this.where(n[0]).equals(i[n[0]]);
			var e = this.schema.indexes.concat(this.schema.primKey).filter(function(t) {
				if (t.compound && n.every(function(e) {
					return 0 <= t.keyPath.indexOf(e);
				})) {
					for (var e = 0; e < n.length; ++e) if (-1 === n.indexOf(t.keyPath[e])) return !1;
					return !0;
				}
				return !1;
			}).sort(function(e, t) {
				return e.keyPath.length - t.keyPath.length;
			})[0];
			if (e && this.db._maxKey !== ct) return t = e.keyPath.slice(0, n.length), this.where(t).equals(t.map(function(e) {
				return i[e];
			}));
			!e && l && console.warn("The query ".concat(JSON.stringify(i), " on ").concat(this.name, " would benefit from a ") + "compound index [".concat(n.join("+"), "]"));
			var a = this.schema.idxByName;
			function u(e, t) {
				return 0 === j(e, t);
			}
			var t = n.reduce(function(e, t) {
				var n = e[0], e = e[1], r = a[t], o = i[t];
				return [n || r, n || !r ? yt(e, r && r.multi ? function(e) {
					e = c(e, t);
					return x(e) && e.some(function(e) {
						return u(o, e);
					});
				} : function(e) {
					return u(o, c(e, t));
				}) : e];
			}, [null, null]), r = t[0], t = t[1];
			return r ? this.where(r.name).equals(i[r.keyPath]).filter(t) : e ? this.filter(t) : this.where(n).equals("");
		}, r.prototype.filter = function(e) {
			return this.toCollection().and(e);
		}, r.prototype.count = function(e) {
			return this.toCollection().count(e);
		}, r.prototype.offset = function(e) {
			return this.toCollection().offset(e);
		}, r.prototype.limit = function(e) {
			return this.toCollection().limit(e);
		}, r.prototype.each = function(e) {
			return this.toCollection().each(e);
		}, r.prototype.toArray = function(e) {
			return this.toCollection().toArray(e);
		}, r.prototype.toCollection = function() {
			return new this.db.Collection(new this.db.WhereClause(this));
		}, r.prototype.orderBy = function(e) {
			return new this.db.Collection(new this.db.WhereClause(this, x(e) ? "[".concat(e.join("+"), "]") : e));
		}, r.prototype.reverse = function() {
			return this.toCollection().reverse();
		}, r.prototype.mapToClass = function(r) {
			for (var i = this.db, a = this.name, o = ((this.schema.mappedClass = r).prototype instanceof bt && (r = ((e) => {
				var t = o, n = e;
				if ("function" != typeof n && null !== n) throw new TypeError("Class extends value " + String(n) + " is not a constructor or null");
				function r() {
					this.constructor = t;
				}
				function o() {
					return null !== e && e.apply(this, arguments) || this;
				}
				return B(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r()), Object.defineProperty(o.prototype, "db", {
					get: function() {
						return i;
					},
					enumerable: !1,
					configurable: !0
				}), o.prototype.table = function() {
					return a;
				}, o;
			})(r)), /* @__PURE__ */ new Set()), e = r.prototype; e; e = F(e)) Object.getOwnPropertyNames(e).forEach(function(e) {
				return o.add(e);
			});
			function t(e) {
				if (!e) return e;
				var t, n = Object.create(r.prototype);
				for (t in e) if (!o.has(t)) try {
					n[t] = e[t];
				} catch (e) {}
				return n;
			}
			return this.schema.readHook && this.hook.reading.unsubscribe(this.schema.readHook), this.schema.readHook = t, this.hook("reading", t), r;
		}, r.prototype.defineClass = function() {
			return this.mapToClass(function(e) {
				a(this, e);
			});
		}, r.prototype.add = function(t, n) {
			var r = this, e = this.schema.primKey, o = e.auto, i = e.keyPath, a = t;
			return i && o && (a = mt(i)(t)), this._trans("readwrite", function(e) {
				return r.core.mutate({
					trans: e,
					type: "add",
					keys: null != n ? [n] : null,
					values: [a]
				});
			}).then(function(e) {
				return e.numFailures ? K.reject(e.failures[0]) : e.lastResult;
			}).then(function(e) {
				if (i) try {
					b(t, i, e);
				} catch (e) {}
				return e;
			});
		}, r.prototype.upsert = function(r, o) {
			var i = this, a = this.schema.primKey.keyPath;
			return this._trans("readwrite", function(n) {
				return i.core.get({
					trans: n,
					key: r
				}).then(function(t) {
					var e = null != t ? t : {};
					return Ot(e, o), a && b(e, a, r), i.core.mutate({
						trans: n,
						type: "put",
						values: [e],
						keys: [r],
						upsert: !0,
						updates: {
							keys: [r],
							changeSpecs: [o]
						}
					}).then(function(e) {
						return e.numFailures ? K.reject(e.failures[0]) : !!t;
					});
				});
			});
		}, r.prototype.update = function(e, t) {
			return "object" != typeof e || x(e) ? this.where(":id").equals(e).modify(t) : void 0 === (e = c(e, this.schema.primKey.keyPath)) ? w(new k.InvalidArgument("Given object does not contain its primary key")) : this.where(":id").equals(e).modify(t);
		}, r.prototype.put = function(t, n) {
			var r = this, e = this.schema.primKey, o = e.auto, i = e.keyPath, a = t;
			return i && o && (a = mt(i)(t)), this._trans("readwrite", function(e) {
				return r.core.mutate({
					trans: e,
					type: "put",
					values: [a],
					keys: null != n ? [n] : null
				});
			}).then(function(e) {
				return e.numFailures ? K.reject(e.failures[0]) : e.lastResult;
			}).then(function(e) {
				if (i) try {
					b(t, i, e);
				} catch (e) {}
				return e;
			});
		}, r.prototype.delete = function(t) {
			var n = this;
			return this._trans("readwrite", function(e) {
				return n.core.mutate({
					trans: e,
					type: "delete",
					keys: [t]
				}).then(function(e) {
					return _t(n, [t], e);
				}).then(function(e) {
					return e.numFailures ? K.reject(e.failures[0]) : void 0;
				});
			});
		}, r.prototype.clear = function() {
			var t = this;
			return this._trans("readwrite", function(e) {
				return t.core.mutate({
					trans: e,
					type: "deleteRange",
					range: vt
				}).then(function(e) {
					return _t(t, null, e);
				});
			}).then(function(e) {
				return e.numFailures ? K.reject(e.failures[0]) : void 0;
			});
		}, r.prototype.bulkGet = function(t) {
			var n = this;
			return this._trans("readonly", function(e) {
				return n.core.getMany({
					keys: t,
					trans: e
				}).then(function(e) {
					return e.map(function(e) {
						return n.hook.reading.fire(e);
					});
				});
			});
		}, r.prototype.bulkAdd = function(o, e, t) {
			var i = this, a = Array.isArray(e) ? e : void 0, u = (t = t || (a ? void 0 : e)) ? t.allKeys : void 0;
			return this._trans("readwrite", function(e) {
				var t = i.schema.primKey, n = t.auto, t = t.keyPath;
				if (t && a) throw new k.InvalidArgument("bulkAdd(): keys argument invalid on tables with inbound keys");
				if (a && a.length !== o.length) throw new k.InvalidArgument("Arguments objects and keys must have the same length");
				var r = o.length, n = t && n ? o.map(mt(t)) : o;
				return i.core.mutate({
					trans: e,
					type: "add",
					keys: a,
					values: n,
					wantResults: u
				}).then(function(e) {
					var t = e.numFailures, n = e.failures;
					if (0 === t) return u ? e.results : e.lastResult;
					throw new he("".concat(i.name, ".bulkAdd(): ").concat(t, " of ").concat(r, " operations failed"), n);
				});
			});
		}, r.prototype.bulkPut = function(o, e, t) {
			var i = this, a = Array.isArray(e) ? e : void 0, u = (t = t || (a ? void 0 : e)) ? t.allKeys : void 0;
			return this._trans("readwrite", function(e) {
				var t = i.schema.primKey, n = t.auto, t = t.keyPath;
				if (t && a) throw new k.InvalidArgument("bulkPut(): keys argument invalid on tables with inbound keys");
				if (a && a.length !== o.length) throw new k.InvalidArgument("Arguments objects and keys must have the same length");
				var r = o.length, n = t && n ? o.map(mt(t)) : o;
				return i.core.mutate({
					trans: e,
					type: "put",
					keys: a,
					values: n,
					wantResults: u
				}).then(function(e) {
					var t = e.numFailures, n = e.failures;
					if (0 === t) return u ? e.results : e.lastResult;
					throw new he("".concat(i.name, ".bulkPut(): ").concat(t, " of ").concat(r, " operations failed"), n);
				});
			});
		}, r.prototype.bulkUpdate = function(t) {
			var h = this, n = this.core, r = t.map(function(e) {
				return e.key;
			}), o = t.map(function(e) {
				return e.changes;
			}), d = [];
			return this._trans("readwrite", function(e) {
				return n.getMany({
					trans: e,
					keys: r,
					cache: "clone"
				}).then(function(c) {
					var l = [], f = [], s = (t.forEach(function(e, t) {
						var n = e.key, r = e.changes, o = c[t];
						if (o) {
							for (var i = 0, a = Object.keys(r); i < a.length; i++) {
								var u = a[i], s = r[u];
								if (u === h.schema.primKey.keyPath) {
									if (0 !== j(s, n)) throw new k.Constraint("Cannot update primary key in bulkUpdate()");
								} else b(o, u, s);
							}
							d.push(t), l.push(n), f.push(o);
						}
					}), l.length);
					return n.mutate({
						trans: e,
						type: "put",
						keys: l,
						values: f,
						updates: {
							keys: r,
							changeSpecs: o
						}
					}).then(function(e) {
						var t = e.numFailures, n = e.failures;
						if (0 === t) return s;
						for (var r = 0, o = Object.keys(n); r < o.length; r++) {
							var i, a = o[r], u = d[Number(a)];
							null != u && (i = n[a], delete n[a], n[u] = i);
						}
						throw new he("".concat(h.name, ".bulkUpdate(): ").concat(t, " of ").concat(s, " operations failed"), n);
					});
				});
			});
		}, r.prototype.bulkDelete = function(t) {
			var r = this, o = t.length;
			return this._trans("readwrite", function(e) {
				return r.core.mutate({
					trans: e,
					type: "delete",
					keys: t
				}).then(function(e) {
					return _t(r, t, e);
				});
			}).then(function(e) {
				var t = e.numFailures, n = e.failures;
				if (0 === t) return e.lastResult;
				throw new he("".concat(r.name, ".bulkDelete(): ").concat(t, " of ").concat(o, " operations failed"), n);
			});
		};
		var Pt = r;
		function r() {}
		function Kt(o) {
			function t(e, t) {
				if (t) {
					for (var n = arguments.length, r = new Array(n - 1); --n;) r[n - 1] = arguments[n];
					return a[e].subscribe.apply(null, r), o;
				}
				if ("string" == typeof e) return a[e];
			}
			var a = {};
			t.addEventType = u;
			for (var e = 1, n = arguments.length; e < n; ++e) u(arguments[e]);
			return t;
			function u(e, n, r) {
				var o, i;
				if ("object" != typeof e) return n = n || xe, i = {
					subscribers: [],
					fire: r = r || g,
					subscribe: function(e) {
						-1 === i.subscribers.indexOf(e) && (i.subscribers.push(e), i.fire = n(i.fire, e));
					},
					unsubscribe: function(t) {
						i.subscribers = i.subscribers.filter(function(e) {
							return e !== t;
						}), i.fire = i.subscribers.reduce(n, r);
					}
				}, a[e] = t[e] = i;
				O(o = e).forEach(function(e) {
					var t = o[e];
					if (x(t)) u(e, o[e][0], o[e][1]);
					else {
						if ("asap" !== t) throw new k.InvalidArgument("Invalid event config");
						var n = u(e, ve, function() {
							for (var e = arguments.length, t = new Array(e); e--;) t[e] = arguments[e];
							n.subscribers.forEach(function(e) {
								Q(function() {
									e.apply(null, t);
								});
							});
						});
					}
				});
			}
		}
		function Et(e, t) {
			return U(t).from({ prototype: e }), t;
		}
		function St(e, t) {
			return !(e.filter || e.algorithm || e.or) && (t ? e.justLimit : !e.replayFilter);
		}
		function jt(e, t) {
			e.filter = yt(e.filter, t);
		}
		function At(e, t, n) {
			var r = e.replayFilter;
			e.replayFilter = r ? function() {
				return yt(r(), t());
			} : t, e.justLimit = n && !r;
		}
		function Ct(e, t) {
			if (e.isPrimKey) return t.primaryKey;
			var n = t.getIndexByKeyPath(e.index);
			if (n) return n;
			throw new k.Schema("KeyPath " + e.index + " on object store " + t.name + " is not indexed");
		}
		function Tt(e, t, n) {
			var r = Ct(e, t.schema);
			return t.openCursor({
				trans: n,
				values: !e.keysOnly,
				reverse: "prev" === e.dir,
				unique: !!e.unique,
				query: {
					index: r,
					range: e.range
				}
			});
		}
		function It(e, i, t, n) {
			var a, r, u = e.replayFilter ? yt(e.filter, e.replayFilter()) : e.filter;
			return e.or ? (a = {}, r = function(e, t, n) {
				var r, o;
				u && !u(t, n, function(e) {
					return t.stop(e);
				}, function(e) {
					return t.fail(e);
				}) || ("[object ArrayBuffer]" === (o = "" + (r = t.primaryKey)) && (o = "" + new Uint8Array(r)), m(a, o)) || (a[o] = !0, i(e, t, n));
			}, Promise.all([e.or._iterate(r, t), qt(Tt(e, n, t), e.algorithm, r, !e.keysOnly && e.valueMapper)])) : qt(Tt(e, n, t), yt(e.algorithm, u), i, !e.keysOnly && e.valueMapper);
		}
		function qt(e, r, o, i) {
			var a = E(i ? function(e, t, n) {
				return o(i(e), t, n);
			} : o);
			return e.then(function(n) {
				if (n) return n.start(function() {
					var t = function() {
						return n.continue();
					};
					r && !r(n, function(e) {
						return t = e;
					}, function(e) {
						n.stop(e), t = g;
					}, function(e) {
						n.fail(e), t = g;
					}) || a(n.value, n, function(e) {
						return t = e;
					}), t();
				});
			});
		}
		o.prototype._read = function(e, t) {
			var n = this._ctx;
			return n.error ? n.table._trans(null, w.bind(null, n.error)) : n.table._trans("readonly", e).then(t);
		}, o.prototype._write = function(e) {
			var t = this._ctx;
			return t.error ? t.table._trans(null, w.bind(null, t.error)) : t.table._trans("readwrite", e, "locked");
		}, o.prototype._addAlgorithm = function(e) {
			var t = this._ctx;
			t.algorithm = yt(t.algorithm, e);
		}, o.prototype._iterate = function(e, t) {
			return It(this._ctx, e, t, this._ctx.table.core);
		}, o.prototype.clone = function(e) {
			var t = Object.create(this.constructor.prototype), n = Object.create(this._ctx);
			return e && a(n, e), t._ctx = n, t;
		}, o.prototype.raw = function() {
			return this._ctx.valueMapper = null, this;
		}, o.prototype.each = function(t) {
			var n = this._ctx;
			return this._read(function(e) {
				return It(n, t, e, n.table.core);
			});
		}, o.prototype.count = function(e) {
			var o = this;
			return this._read(function(e) {
				var t, n = o._ctx, r = n.table.core;
				return St(n, !0) ? r.count({
					trans: e,
					query: {
						index: Ct(n, r.schema),
						range: n.range
					}
				}).then(function(e) {
					return Math.min(e, n.limit);
				}) : (t = 0, It(n, function() {
					return ++t, !1;
				}, e, r).then(function() {
					return t;
				}));
			}).then(e);
		}, o.prototype.sortBy = function(e, t) {
			var n = e.split(".").reverse(), r = n[0], o = n.length - 1;
			function i(e, t) {
				return t ? i(e[n[t]], t - 1) : e[r];
			}
			var a = "next" === this._ctx.dir ? 1 : -1;
			function u(e, t) {
				return j(i(e, o), i(t, o)) * a;
			}
			return this.toArray(function(e) {
				return e.sort(u);
			}).then(t);
		}, o.prototype.toArray = function(e) {
			var i = this;
			return this._read(function(e) {
				var t, n, r, o = i._ctx;
				return "next" === o.dir && St(o, !0) && 0 < o.limit ? (t = o.valueMapper, n = Ct(o, o.table.core.schema), o.table.core.query({
					trans: e,
					limit: o.limit,
					values: !0,
					query: {
						index: n,
						range: o.range
					}
				}).then(function(e) {
					e = e.result;
					return t ? e.map(t) : e;
				})) : (r = [], It(o, function(e) {
					return r.push(e);
				}, e, o.table.core).then(function() {
					return r;
				}));
			}, e);
		}, o.prototype.offset = function(t) {
			var e = this._ctx;
			return t <= 0 || (e.offset += t, St(e) ? At(e, function() {
				var n = t;
				return function(e, t) {
					return 0 === n || (1 === n ? --n : t(function() {
						e.advance(n), n = 0;
					}), !1);
				};
			}) : At(e, function() {
				var e = t;
				return function() {
					return --e < 0;
				};
			})), this;
		}, o.prototype.limit = function(e) {
			return this._ctx.limit = Math.min(this._ctx.limit, e), At(this._ctx, function() {
				var r = e;
				return function(e, t, n) {
					return --r <= 0 && t(n), 0 <= r;
				};
			}, !0), this;
		}, o.prototype.until = function(r, o) {
			return jt(this._ctx, function(e, t, n) {
				return !r(e.value) || (t(n), o);
			}), this;
		}, o.prototype.first = function(e) {
			return this.limit(1).toArray(function(e) {
				return e[0];
			}).then(e);
		}, o.prototype.last = function(e) {
			return this.reverse().first(e);
		}, o.prototype.filter = function(t) {
			var e;
			return jt(this._ctx, function(e) {
				return t(e.value);
			}), (e = this._ctx).isMatch = yt(e.isMatch, t), this;
		}, o.prototype.and = function(e) {
			return this.filter(e);
		}, o.prototype.or = function(e) {
			return new this.db.WhereClause(this._ctx.table, e, this);
		}, o.prototype.reverse = function() {
			return this._ctx.dir = "prev" === this._ctx.dir ? "next" : "prev", this._ondirectionchange && this._ondirectionchange(this._ctx.dir), this;
		}, o.prototype.desc = function() {
			return this.reverse();
		}, o.prototype.eachKey = function(n) {
			var e = this._ctx;
			return e.keysOnly = !e.isMatch, this.each(function(e, t) {
				n(t.key, t);
			});
		}, o.prototype.eachUniqueKey = function(e) {
			return this._ctx.unique = "unique", this.eachKey(e);
		}, o.prototype.eachPrimaryKey = function(n) {
			var e = this._ctx;
			return e.keysOnly = !e.isMatch, this.each(function(e, t) {
				n(t.primaryKey, t);
			});
		}, o.prototype.keys = function(e) {
			var t = this._ctx, n = (t.keysOnly = !t.isMatch, []);
			return this.each(function(e, t) {
				n.push(t.key);
			}).then(function() {
				return n;
			}).then(e);
		}, o.prototype.primaryKeys = function(e) {
			var n = this._ctx;
			if ("next" === n.dir && St(n, !0) && 0 < n.limit) return this._read(function(e) {
				var t = Ct(n, n.table.core.schema);
				return n.table.core.query({
					trans: e,
					values: !1,
					limit: n.limit,
					query: {
						index: t,
						range: n.range
					}
				});
			}).then(function(e) {
				return e.result;
			}).then(e);
			n.keysOnly = !n.isMatch;
			var r = [];
			return this.each(function(e, t) {
				r.push(t.primaryKey);
			}).then(function() {
				return r;
			}).then(e);
		}, o.prototype.uniqueKeys = function(e) {
			return this._ctx.unique = "unique", this.keys(e);
		}, o.prototype.firstKey = function(e) {
			return this.limit(1).keys(function(e) {
				return e[0];
			}).then(e);
		}, o.prototype.lastKey = function(e) {
			return this.reverse().firstKey(e);
		}, o.prototype.distinct = function() {
			var n, e = this._ctx, e = e.index && e.table.schema.idxByName[e.index];
			return e && e.multi && (n = {}, jt(this._ctx, function(e) {
				var e = e.primaryKey.toString(), t = m(n, e);
				return n[e] = !0, !t;
			})), this;
		}, o.prototype.modify = function(x) {
			var n = this, k = this._ctx;
			return this._write(function(p) {
				function y(e, t) {
					var n = t.failures;
					u += e - t.numFailures;
					for (var r = 0, o = O(n); r < o.length; r++) {
						var i = o[r];
						a.push(n[i]);
					}
				}
				var v = "function" == typeof x ? x : function(e) {
					return Ot(e, x);
				}, m = k.table.core, e = m.schema.primaryKey, b = e.outbound, g = e.extractKey, w = 200, e = n.db._options.modifyChunkSize, a = (e && (w = "object" == typeof e ? e[m.name] || e["*"] || 200 : e), []), u = 0, t = [], _ = x === Bt;
				return n.clone().primaryKeys().then(function(f) {
					function h(s) {
						var c = Math.min(w, f.length - s), l = f.slice(s, s + c);
						return (_ ? Promise.resolve([]) : m.getMany({
							trans: p,
							keys: l,
							cache: "immutable"
						})).then(function(e) {
							var n = [], t = [], r = b ? [] : null, o = _ ? l : [];
							if (!_) for (var i = 0; i < c; ++i) {
								var a = e[i], u = {
									value: ee(a),
									primKey: f[s + i]
								};
								!1 !== v.call(u, u.value, u) && (null == u.value ? o.push(f[s + i]) : b || 0 === j(g(a), g(u.value)) ? (t.push(u.value), b && r.push(f[s + i])) : (o.push(f[s + i]), n.push(u.value)));
							}
							return Promise.resolve(0 < n.length && m.mutate({
								trans: p,
								type: "add",
								values: n
							}).then(function(e) {
								for (var t in e.failures) o.splice(parseInt(t), 1);
								y(n.length, e);
							})).then(function() {
								return (0 < t.length || d && "object" == typeof x) && m.mutate({
									trans: p,
									type: "put",
									keys: r,
									values: t,
									criteria: d,
									changeSpec: "function" != typeof x && x,
									isAdditionalChunk: 0 < s
								}).then(function(e) {
									return y(t.length, e);
								});
							}).then(function() {
								return (0 < o.length || d && _) && m.mutate({
									trans: p,
									type: "delete",
									keys: o,
									criteria: d,
									isAdditionalChunk: 0 < s
								}).then(function(e) {
									return _t(k.table, o, e);
								}).then(function(e) {
									return y(o.length, e);
								});
							}).then(function() {
								return f.length > s + c && h(s + w);
							});
						});
					}
					var d = St(k) && k.limit === Infinity && ("function" != typeof x || _) && {
						index: k.index,
						range: k.range
					};
					return h(0).then(function() {
						if (0 < a.length) throw new fe("Error modifying one or more objects", a, u, t);
						return f.length;
					});
				});
			});
		}, o.prototype.delete = function() {
			var o = this._ctx, n = o.range;
			return !St(o) || o.table.schema.yProps || !o.isPrimKey && 3 !== n.type ? this.modify(Bt) : this._write(function(e) {
				var t = o.table.core.schema.primaryKey, r = n;
				return o.table.core.count({
					trans: e,
					query: {
						index: t,
						range: r
					}
				}).then(function(n) {
					return o.table.core.mutate({
						trans: e,
						type: "deleteRange",
						range: r
					}).then(function(e) {
						var t = e.failures, e = e.numFailures;
						if (e) throw new fe("Could not delete some values", Object.keys(t).map(function(e) {
							return t[e];
						}), n - e);
						return n - e;
					});
				});
			});
		};
		var Dt = o;
		function o() {}
		var Bt = function(e, t) {
			return t.value = null;
		};
		function Rt(e, t) {
			return e < t ? -1 : e === t ? 0 : 1;
		}
		function Ft(e, t) {
			return t < e ? -1 : e === t ? 0 : 1;
		}
		function A(e, t, n) {
			e = e instanceof Ut ? new e.Collection(e) : e;
			return e._ctx.error = new (n || TypeError)(t), e;
		}
		function Mt(e) {
			return new e.Collection(e, function() {
				return Lt("");
			}).limit(0);
		}
		function Nt(e, s, n, r) {
			var o, c, l, f, h, d, p, y = n.length;
			if (!n.every(function(e) {
				return "string" == typeof e;
			})) return A(e, lt);
			function t(e) {
				o = "next" === e ? function(e) {
					return e.toUpperCase();
				} : function(e) {
					return e.toLowerCase();
				}, c = "next" === e ? function(e) {
					return e.toLowerCase();
				} : function(e) {
					return e.toUpperCase();
				}, l = "next" === e ? Rt : Ft;
				var t = n.map(function(e) {
					return {
						lower: c(e),
						upper: o(e)
					};
				}).sort(function(e, t) {
					return l(e.lower, t.lower);
				});
				f = t.map(function(e) {
					return e.upper;
				}), h = t.map(function(e) {
					return e.lower;
				}), p = "next" === (d = e) ? "" : r;
			}
			t("next");
			var e = new e.Collection(e, function() {
				return C(f[0], h[y - 1] + r);
			}), v = (e._ondirectionchange = function(e) {
				t(e);
			}, 0);
			return e._addAlgorithm(function(e, t, n) {
				var r = e.key;
				if ("string" == typeof r) {
					var o = c(r);
					if (s(o, h, v)) return !0;
					for (var i = null, a = v; a < y; ++a) {
						var u = ((e, t, n, r, o, i) => {
							for (var a = Math.min(e.length, r.length), u = -1, s = 0; s < a; ++s) {
								var c = t[s];
								if (c !== r[s]) return o(e[s], n[s]) < 0 ? e.substr(0, s) + n[s] + n.substr(s + 1) : o(e[s], r[s]) < 0 ? e.substr(0, s) + r[s] + n.substr(s + 1) : 0 <= u ? e.substr(0, u) + t[u] + n.substr(u + 1) : null;
								o(e[s], c) < 0 && (u = s);
							}
							return a < r.length && "next" === i ? e + n.substr(e.length) : a < e.length && "prev" === i ? e.substr(0, n.length) : u < 0 ? null : e.substr(0, u) + r[u] + n.substr(u + 1);
						})(r, o, f[a], h[a], l, d);
						null === u && null === i ? v = a + 1 : (null === i || 0 < l(i, u)) && (i = u);
					}
					t(null !== i ? function() {
						e.continue(i + p);
					} : n);
				}
				return !1;
			}), e;
		}
		function C(e, t, n, r) {
			return {
				type: 2,
				lower: e,
				upper: t,
				lowerOpen: n,
				upperOpen: r
			};
		}
		function Lt(e) {
			return {
				type: 1,
				lower: e,
				upper: e
			};
		}
		Object.defineProperty(d.prototype, "Collection", {
			get: function() {
				return this._ctx.table.db.Collection;
			},
			enumerable: !1,
			configurable: !0
		}), d.prototype.between = function(e, t, n, r) {
			n = !1 !== n, r = !0 === r;
			try {
				return 0 < this._cmp(e, t) || 0 === this._cmp(e, t) && (n || r) && (!n || !r) ? Mt(this) : new this.Collection(this, function() {
					return C(e, t, !n, !r);
				});
			} catch (e) {
				return A(this, S);
			}
		}, d.prototype.equals = function(e) {
			return null == e ? A(this, S) : new this.Collection(this, function() {
				return Lt(e);
			});
		}, d.prototype.above = function(e) {
			return null == e ? A(this, S) : new this.Collection(this, function() {
				return C(e, void 0, !0);
			});
		}, d.prototype.aboveOrEqual = function(e) {
			return null == e ? A(this, S) : new this.Collection(this, function() {
				return C(e, void 0, !1);
			});
		}, d.prototype.below = function(e) {
			return null == e ? A(this, S) : new this.Collection(this, function() {
				return C(void 0, e, !1, !0);
			});
		}, d.prototype.belowOrEqual = function(e) {
			return null == e ? A(this, S) : new this.Collection(this, function() {
				return C(void 0, e);
			});
		}, d.prototype.startsWith = function(e) {
			return "string" != typeof e ? A(this, lt) : this.between(e, e + ct, !0, !0);
		}, d.prototype.startsWithIgnoreCase = function(e) {
			return "" === e ? this.startsWith(e) : Nt(this, function(e, t) {
				return 0 === e.indexOf(t[0]);
			}, [e], ct);
		}, d.prototype.equalsIgnoreCase = function(e) {
			return Nt(this, function(e, t) {
				return e === t[0];
			}, [e], "");
		}, d.prototype.anyOfIgnoreCase = function() {
			var e = n.apply(ae, arguments);
			return 0 === e.length ? Mt(this) : Nt(this, function(e, t) {
				return -1 !== t.indexOf(e);
			}, e, "");
		}, d.prototype.startsWithAnyOfIgnoreCase = function() {
			var e = n.apply(ae, arguments);
			return 0 === e.length ? Mt(this) : Nt(this, function(t, e) {
				return e.some(function(e) {
					return 0 === t.indexOf(e);
				});
			}, e, ct);
		}, d.prototype.anyOf = function() {
			var e, o, t = this, i = n.apply(ae, arguments), a = this._cmp;
			try {
				i.sort(a);
			} catch (e) {
				return A(this, S);
			}
			return 0 === i.length ? Mt(this) : ((e = new this.Collection(this, function() {
				return C(i[0], i[i.length - 1]);
			}))._ondirectionchange = function(e) {
				a = "next" === e ? t._ascending : t._descending, i.sort(a);
			}, o = 0, e._addAlgorithm(function(e, t, n) {
				for (var r = e.key; 0 < a(r, i[o]);) if (++o === i.length) return t(n), !1;
				return 0 === a(r, i[o]) || (t(function() {
					e.continue(i[o]);
				}), !1);
			}), e);
		}, d.prototype.notEqual = function(e) {
			return this.inAnyRange([[-Infinity, e], [e, this.db._maxKey]], {
				includeLowers: !1,
				includeUppers: !1
			});
		}, d.prototype.noneOf = function() {
			var e = n.apply(ae, arguments);
			if (0 === e.length) return new this.Collection(this);
			try {
				e.sort(this._ascending);
			} catch (e) {
				return A(this, S);
			}
			var t = e.reduce(function(e, t) {
				return e ? e.concat([[e[e.length - 1][1], t]]) : [[-Infinity, t]];
			}, null);
			return t.push([e[e.length - 1], this.db._maxKey]), this.inAnyRange(t, {
				includeLowers: !1,
				includeUppers: !1
			});
		}, d.prototype.inAnyRange = function(e, t) {
			var i = this, a = this._cmp, u = this._ascending, n = this._descending, s = this._min, c = this._max;
			if (0 === e.length) return Mt(this);
			if (!e.every(function(e) {
				return void 0 !== e[0] && void 0 !== e[1] && u(e[0], e[1]) <= 0;
			})) return A(this, "First argument to inAnyRange() must be an Array of two-value Arrays [lower,upper] where upper must not be lower than lower", k.InvalidArgument);
			var r = !t || !1 !== t.includeLowers, o = t && !0 === t.includeUppers;
			var l, f = u;
			function h(e, t) {
				return f(e[0], t[0]);
			}
			try {
				(l = e.reduce(function(e, t) {
					for (var n = 0, r = e.length; n < r; ++n) {
						var o = e[n];
						if (a(t[0], o[1]) < 0 && 0 < a(t[1], o[0])) {
							o[0] = s(o[0], t[0]), o[1] = c(o[1], t[1]);
							break;
						}
					}
					return n === r && e.push(t), e;
				}, [])).sort(h);
			} catch (e) {
				return A(this, S);
			}
			var d = 0, p = o ? function(e) {
				return 0 < u(e, l[d][1]);
			} : function(e) {
				return 0 <= u(e, l[d][1]);
			}, y = r ? function(e) {
				return 0 < n(e, l[d][0]);
			} : function(e) {
				return 0 <= n(e, l[d][0]);
			};
			var v = p, t = new this.Collection(this, function() {
				return C(l[0][0], l[l.length - 1][1], !r, !o);
			});
			return t._ondirectionchange = function(e) {
				f = "next" === e ? (v = p, u) : (v = y, n), l.sort(h);
			}, t._addAlgorithm(function(e, t, n) {
				for (var r, o = e.key; v(o);) if (++d === l.length) return t(n), !1;
				return !p(r = o) && !y(r) || (0 === i._cmp(o, l[d][1]) || 0 === i._cmp(o, l[d][0]) || t(function() {
					f === u ? e.continue(l[d][0]) : e.continue(l[d][1]);
				}), !1);
			}), t;
		}, d.prototype.startsWithAnyOf = function() {
			var e = n.apply(ae, arguments);
			return e.every(function(e) {
				return "string" == typeof e;
			}) ? 0 === e.length ? Mt(this) : this.inAnyRange(e.map(function(e) {
				return [e, e + ct];
			})) : A(this, "startsWithAnyOf() only works with strings");
		};
		var Ut = d;
		function d() {}
		function T(t) {
			return E(function(e) {
				return Vt(e), t(e.target.error), !1;
			});
		}
		function Vt(e) {
			e.stopPropagation && e.stopPropagation(), e.preventDefault && e.preventDefault();
		}
		var zt = "storagemutated", Wt = "x-storagemutated-1", Yt = Kt(null, zt), $t = (p.prototype._lock = function() {
			return $(!P.global), ++this._reculock, 1 !== this._reculock || P.global || (P.lockOwnerFor = this), this;
		}, p.prototype._unlock = function() {
			if ($(!P.global), 0 == --this._reculock) for (P.global || (P.lockOwnerFor = null); 0 < this._blockedFuncs.length && !this._locked();) {
				var e = this._blockedFuncs.shift();
				try {
					at(e[1], e[0]);
				} catch (e) {}
			}
			return this;
		}, p.prototype._locked = function() {
			return this._reculock && P.lockOwnerFor !== this;
		}, p.prototype.create = function(t) {
			var n = this;
			if (this.mode) {
				var e = this.db.idbdb, r = this.db._state.dbOpenError;
				if ($(!this.idbtrans), !t && !e) switch (r && r.name) {
					case "DatabaseClosedError": throw new k.DatabaseClosed(r);
					case "MissingAPIError": throw new k.MissingAPI(r.message, r);
					default: throw new k.OpenFailed(r);
				}
				if (!this.active) throw new k.TransactionInactive();
				$(null === this._completion._state), (t = this.idbtrans = t || (this.db.core || e).transaction(this.storeNames, this.mode, { durability: this.chromeTransactionDurability })).onerror = E(function(e) {
					Vt(e), n._reject(t.error);
				}), t.onabort = E(function(e) {
					Vt(e), n.active && n._reject(new k.Abort(t.error)), n.active = !1, n.on("abort").fire(e);
				}), t.oncomplete = E(function() {
					n.active = !1, n._resolve(), "mutatedParts" in t && Yt.storagemutated.fire(t.mutatedParts);
				});
			}
			return this;
		}, p.prototype._promise = function(n, r, o) {
			var e, i = this;
			return "readwrite" === n && "readwrite" !== this.mode ? w(new k.ReadOnly("Transaction is readonly")) : this.active ? this._locked() ? new K(function(e, t) {
				i._blockedFuncs.push([function() {
					i._promise(n, r, o).then(e, t);
				}, P]);
			}) : o ? y(function() {
				var e = new K(function(e, t) {
					i._lock();
					var n = r(e, t, i);
					n && n.then && n.then(e, t);
				});
				return e.finally(function() {
					return i._unlock();
				}), e._lib = !0, e;
			}) : ((e = new K(function(e, t) {
				var n = r(e, t, i);
				n && n.then && n.then(e, t);
			}))._lib = !0, e) : w(new k.TransactionInactive());
		}, p.prototype._root = function() {
			return this.parent ? this.parent._root() : this;
		}, p.prototype.waitFor = function(e) {
			var t, r = this._root(), o = K.resolve(e), i = (r._waitingFor ? r._waitingFor = r._waitingFor.then(function() {
				return o;
			}) : (r._waitingFor = o, r._waitingQueue = [], t = r.idbtrans.objectStore(r.storeNames[0]), function e() {
				for (++r._spinCount; r._waitingQueue.length;) r._waitingQueue.shift()();
				r._waitingFor && (t.get(-Infinity).onsuccess = e);
			}()), r._waitingFor);
			return new K(function(t, n) {
				o.then(function(e) {
					return r._waitingQueue.push(E(t.bind(null, e)));
				}, function(e) {
					return r._waitingQueue.push(E(n.bind(null, e)));
				}).finally(function() {
					r._waitingFor === i && (r._waitingFor = null);
				});
			});
		}, p.prototype.abort = function() {
			this.active && (this.active = !1, this.idbtrans && this.idbtrans.abort(), this._reject(new k.Abort()));
		}, p.prototype.table = function(e) {
			var t = this._memoizedTables || (this._memoizedTables = {});
			if (m(t, e)) return t[e];
			var n = this.schema[e];
			if (n) return (n = new this.db.Table(e, n, this)).core = this.db.core.table(e), t[e] = n;
			throw new k.NotFound("Table " + e + " not part of transaction");
		}, p);
		function p() {}
		function Qt(e, t, n, r, o, i, a, u) {
			return {
				name: e,
				keyPath: t,
				unique: n,
				multi: r,
				auto: o,
				compound: i,
				src: (n && !a ? "&" : "") + (r ? "*" : "") + (o ? "++" : "") + Gt(t),
				type: u
			};
		}
		function Gt(e) {
			return "string" == typeof e ? e : e ? "[" + [].join.call(e, "+") + "]" : "";
		}
		function Xt(e, t, n) {
			return {
				name: e,
				primKey: t,
				indexes: n,
				mappedClass: null,
				idxByName: (r = function(e) {
					return [e.name, e];
				}, n.reduce(function(e, t, n) {
					t = r(t, n);
					return t && (e[t[0]] = t[1]), e;
				}, {}))
			};
			var r;
		}
		var Ht = function(e) {
			try {
				return e.only([[]]), Ht = function() {
					return [[]];
				}, [[]];
			} catch (e) {
				return Ht = function() {
					return ct;
				}, ct;
			}
		};
		function Jt(t) {
			return null == t ? function() {} : "string" == typeof t ? 1 === (n = t).split(".").length ? function(e) {
				return e[n];
			} : function(e) {
				return c(e, n);
			} : function(e) {
				return c(e, t);
			};
			var n;
		}
		function Zt(e) {
			return [].slice.call(e);
		}
		var en = 0;
		function tn(e) {
			return null == e ? ":id" : "string" == typeof e ? e : "[".concat(e.join("+"), "]");
		}
		function nn(e, o, t) {
			function _(e) {
				if (3 === e.type) return null;
				if (4 === e.type) throw new Error("Cannot convert never type to IDBKeyRange");
				var t = e.lower, n = e.upper, r = e.lowerOpen, e = e.upperOpen;
				return void 0 === t ? void 0 === n ? null : o.upperBound(n, !!e) : void 0 === n ? o.lowerBound(t, !!r) : o.bound(t, n, !!r, !!e);
			}
			function n(e) {
				var h, w = e.name;
				return {
					name: w,
					schema: e,
					mutate: function(e) {
						var y = e.trans, v = e.type, m = e.keys, b = e.values, g = e.range;
						return new Promise(function(t, e) {
							t = E(t);
							var n = y.objectStore(w), r = null == n.keyPath, o = "put" === v || "add" === v;
							if (!o && "delete" !== v && "deleteRange" !== v) throw new Error("Invalid operation type: " + v);
							var i, a = (m || b || { length: 1 }).length;
							if (m && b && m.length !== b.length) throw new Error("Given keys array must have same length as given values array.");
							if (0 === a) return t({
								numFailures: 0,
								failures: {},
								results: [],
								lastResult: void 0
							});
							function u(e) {
								++l, Vt(e);
							}
							var s = [], c = [], l = 0;
							if ("deleteRange" === v) {
								if (4 === g.type) return t({
									numFailures: l,
									failures: c,
									results: [],
									lastResult: void 0
								});
								3 === g.type ? s.push(i = n.clear()) : s.push(i = n.delete(_(g)));
							} else {
								var r = o ? r ? [b, m] : [b, null] : [m, null], f = r[0], h = r[1];
								if (o) for (var d = 0; d < a; ++d) s.push(i = h && void 0 !== h[d] ? n[v](f[d], h[d]) : n[v](f[d])), i.onerror = u;
								else for (d = 0; d < a; ++d) s.push(i = n[v](f[d])), i.onerror = u;
							}
							function p(e) {
								e = e.target.result, s.forEach(function(e, t) {
									return null != e.error && (c[t] = e.error);
								}), t({
									numFailures: l,
									failures: c,
									results: "delete" === v ? m : s.map(function(e) {
										return e.result;
									}),
									lastResult: e
								});
							}
							i.onerror = function(e) {
								u(e), p(e);
							}, i.onsuccess = p;
						});
					},
					getMany: function(e) {
						var f = e.trans, h = e.keys;
						return new Promise(function(t, e) {
							t = E(t);
							for (var n, r = f.objectStore(w), o = h.length, i = new Array(o), a = 0, u = 0, s = function(e) {
								e = e.target;
								i[e._pos] = e.result, ++u === a && t(i);
							}, c = T(e), l = 0; l < o; ++l) null != h[l] && ((n = r.get(h[l]))._pos = l, n.onsuccess = s, n.onerror = c, ++a);
							0 === a && t(i);
						});
					},
					get: function(e) {
						var r = e.trans, o = e.key;
						return new Promise(function(t, e) {
							t = E(t);
							var n = r.objectStore(w).get(o);
							n.onsuccess = function(e) {
								return t(e.target.result);
							}, n.onerror = T(e);
						});
					},
					query: (h = a, function(f) {
						return new Promise(function(n, e) {
							n = E(n);
							var r, o, i, t = f.trans, a = f.values, u = f.limit, s = f.query, c = u === Infinity ? void 0 : u, l = s.index, s = s.range, t = t.objectStore(w), t = l.isPrimaryKey ? t : t.index(l.name), l = _(s);
							if (0 === u) return n({ result: [] });
							h ? ((s = a ? t.getAll(l, c) : t.getAllKeys(l, c)).onsuccess = function(e) {
								return n({ result: e.target.result });
							}, s.onerror = T(e)) : (r = 0, o = !a && "openKeyCursor" in t ? t.openKeyCursor(l) : t.openCursor(l), i = [], o.onsuccess = function(e) {
								var t = o.result;
								return !t || (i.push(a ? t.value : t.primaryKey), ++r === u) ? n({ result: i }) : void t.continue();
							}, o.onerror = T(e));
						});
					}),
					openCursor: function(e) {
						var c = e.trans, i = e.values, a = e.query, u = e.reverse, l = e.unique;
						return new Promise(function(t, n) {
							t = E(t);
							var e = a.index, r = a.range, o = c.objectStore(w), o = e.isPrimaryKey ? o : o.index(e.name), e = u ? l ? "prevunique" : "prev" : l ? "nextunique" : "next", s = !i && "openKeyCursor" in o ? o.openKeyCursor(_(r), e) : o.openCursor(_(r), e);
							s.onerror = T(n), s.onsuccess = E(function(e) {
								var r, o, i, a, u = s.result;
								u ? (u.___id = ++en, u.done = !1, r = u.continue.bind(u), o = (o = u.continuePrimaryKey) && o.bind(u), i = u.advance.bind(u), a = function() {
									throw new Error("Cursor not stopped");
								}, u.trans = c, u.stop = u.continue = u.continuePrimaryKey = u.advance = function() {
									throw new Error("Cursor not started");
								}, u.fail = E(n), u.next = function() {
									var e = this, t = 1;
									return this.start(function() {
										return t-- ? e.continue() : e.stop();
									}).then(function() {
										return e;
									});
								}, u.start = function(e) {
									function t() {
										if (s.result) try {
											e();
										} catch (e) {
											u.fail(e);
										}
										else u.done = !0, u.start = function() {
											throw new Error("Cursor behind last entry");
										}, u.stop();
									}
									var n = new Promise(function(t, e) {
										t = E(t), s.onerror = T(e), u.fail = e, u.stop = function(e) {
											u.stop = u.continue = u.continuePrimaryKey = u.advance = a, t(e);
										};
									});
									return s.onsuccess = E(function(e) {
										s.onsuccess = t, t();
									}), u.continue = r, u.continuePrimaryKey = o, u.advance = i, t(), n;
								}, t(u)) : t(null);
							}, n);
						});
					},
					count: function(e) {
						var t = e.query, o = e.trans, i = t.index, a = t.range;
						return new Promise(function(t, e) {
							var n = o.objectStore(w), n = i.isPrimaryKey ? n : n.index(i.name), r = _(a), r = r ? n.count(r) : n.count();
							r.onsuccess = E(function(e) {
								return t(e.target.result);
							}), r.onerror = T(e);
						});
					}
				};
			}
			r = t, i = Zt((t = e).objectStoreNames);
			var r, t = {
				schema: {
					name: t.name,
					tables: i.map(function(e) {
						return r.objectStore(e);
					}).map(function(t) {
						var e = t.keyPath, n = t.autoIncrement, r = x(e), o = {}, r = {
							name: t.name,
							primaryKey: {
								name: null,
								isPrimaryKey: !0,
								outbound: null == e,
								compound: r,
								keyPath: e,
								autoIncrement: n,
								unique: !0,
								extractKey: Jt(e)
							},
							indexes: Zt(t.indexNames).map(function(e) {
								return t.index(e);
							}).map(function(e) {
								var t = e.name, n = e.unique, r = e.multiEntry, e = e.keyPath, t = {
									name: t,
									compound: x(e),
									keyPath: e,
									unique: n,
									multiEntry: r,
									extractKey: Jt(e)
								};
								return o[tn(e)] = t;
							}),
							getIndexByKeyPath: function(e) {
								return o[tn(e)];
							}
						};
						return o[":id"] = r.primaryKey, null != e && (o[tn(e)] = r.primaryKey), r;
					})
				},
				hasGetAll: 0 < i.length && "getAll" in r.objectStore(i[0]) && !("undefined" != typeof navigator && /Safari/.test(navigator.userAgent) && !/(Chrome\/|Edge\/)/.test(navigator.userAgent) && [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604)
			}, i = t.schema, a = t.hasGetAll, t = i.tables.map(n), u = {};
			return t.forEach(function(e) {
				return u[e.name] = e;
			}), {
				stack: "dbcore",
				transaction: e.transaction.bind(e),
				table: function(e) {
					if (u[e]) return u[e];
					throw new Error("Table '".concat(e, "' not found"));
				},
				MIN_KEY: -Infinity,
				MAX_KEY: Ht(o),
				schema: i
			};
		}
		function rn(e, t, n, r) {
			n = n.IDBKeyRange;
			return t = nn(t, n, r), { dbcore: e.dbcore.reduce(function(e, t) {
				t = t.create;
				return _(_({}, e), t(e));
			}, t) };
		}
		function on(n, e) {
			var t = e.db, t = rn(n._middlewares, t, n._deps, e);
			n.core = t.dbcore, n.tables.forEach(function(e) {
				var t = e.name;
				n.core.schema.tables.some(function(e) {
					return e.name === t;
				}) && (e.core = n.core.table(t), n[t] instanceof n.Table) && (n[t].core = e.core);
			});
		}
		function an(o, e, t, i) {
			t.forEach(function(n) {
				var r = i[n];
				e.forEach(function(e) {
					var t = function e(t, n) {
						return V(t, n) || (t = F(t)) && e(t, n);
					}(e, n);
					(!t || "value" in t && void 0 === t.value) && (e === o.Transaction.prototype || e instanceof o.Transaction ? u(e, n, {
						get: function() {
							return this.table(n);
						},
						set: function(e) {
							L(this, n, {
								value: e,
								writable: !0,
								configurable: !0,
								enumerable: !0
							});
						}
					}) : e[n] = new o.Table(n, r));
				});
			});
		}
		function un(n, e) {
			e.forEach(function(e) {
				for (var t in e) e[t] instanceof n.Table && delete e[t];
			});
		}
		function sn(e, t) {
			return e._cfg.version - t._cfg.version;
		}
		function cn(n, r, o, e) {
			var i = n._dbSchema, a = (o.objectStoreNames.contains("$meta") && !i.$meta && (i.$meta = Xt("$meta", mn("")[0], []), n._storeNames.push("$meta")), n._createTransaction("readwrite", n._storeNames, i)), u = (a.create(o), a._completion.catch(e), a._reject.bind(a)), s = P.transless || P;
			y(function() {
				if (P.trans = a, P.transless = s, 0 !== r) return on(n, o), t = r, ((e = a).storeNames.includes("$meta") ? e.table("$meta").get("version").then(function(e) {
					return null != e ? e : t;
				}) : K.resolve(t)).then(function(e) {
					var s = n, c = e, l = a, f = o, t = [], e = s._versions, h = s._dbSchema = yn(0, s.idbdb, f);
					return 0 === (e = e.filter(function(e) {
						return e._cfg.version >= c;
					})).length ? K.resolve() : (e.forEach(function(u) {
						t.push(function() {
							var t, n, r, o = h, e = u._cfg.dbschema, i = (vn(s, o, f), vn(s, e, f), h = s._dbSchema = e, fn(o, e)), a = (i.add.forEach(function(e) {
								hn(f, e[0], e[1].primKey, e[1].indexes);
							}), i.change.forEach(function(e) {
								if (e.recreate) throw new k.Upgrade("Not yet support for changing primary key");
								var t = f.objectStore(e.name);
								e.add.forEach(function(e) {
									return pn(t, e);
								}), e.change.forEach(function(e) {
									t.deleteIndex(e.name), pn(t, e);
								}), e.del.forEach(function(e) {
									return t.deleteIndex(e);
								});
							}), u._cfg.contentUpgrade);
							if (a && u._cfg.version > c) return on(s, f), l._memoizedTables = {}, t = G(e), i.del.forEach(function(e) {
								t[e] = o[e];
							}), un(s, [s.Transaction.prototype]), an(s, [s.Transaction.prototype], O(t), t), l.schema = t, (n = ue(a)) && nt(), e = K.follow(function() {
								var e;
								(r = a(l)) && n && (e = v.bind(null, null), r.then(e, e));
							}), r && "function" == typeof r.then ? K.resolve(r) : e.then(function() {
								return r;
							});
						}), t.push(function(e) {
							var t = u._cfg.dbschema, n = e;
							[].slice.call(n.db.objectStoreNames).forEach(function(e) {
								return null == t[e] && n.db.deleteObjectStore(e);
							}), un(s, [s.Transaction.prototype]), an(s, [s.Transaction.prototype], s._storeNames, s._dbSchema), l.schema = s._dbSchema;
						}), t.push(function(e) {
							s.idbdb.objectStoreNames.contains("$meta") && (Math.ceil(s.idbdb.version / 10) === u._cfg.version ? (s.idbdb.deleteObjectStore("$meta"), delete s._dbSchema.$meta, s._storeNames = s._storeNames.filter(function(e) {
								return "$meta" !== e;
							})) : e.objectStore("$meta").put(u._cfg.version, "version"));
						});
					}), function e() {
						return t.length ? K.resolve(t.shift()(l.idbtrans)).then(e) : K.resolve();
					}().then(function() {
						dn(h, f);
					}));
				}).catch(u);
				var e, t;
				O(i).forEach(function(e) {
					hn(o, e, i[e].primKey, i[e].indexes);
				}), on(n, o), K.follow(function() {
					return n.on.populate.fire(a);
				}).catch(u);
			});
		}
		function ln(e, r) {
			dn(e._dbSchema, r), r.db.version % 10 != 0 || r.objectStoreNames.contains("$meta") || r.db.createObjectStore("$meta").add(Math.ceil(r.db.version / 10 - 1), "version");
			var t = yn(0, e.idbdb, r);
			vn(e, e._dbSchema, r);
			for (var n = 0, o = fn(t, e._dbSchema).change; n < o.length; n++) {
				var i = ((t) => {
					if (t.change.length || t.recreate) return console.warn("Unable to patch indexes of table ".concat(t.name, " because it has changes on the type of index or primary key.")), { value: void 0 };
					var n = r.objectStore(t.name);
					t.add.forEach(function(e) {
						l && console.debug("Dexie upgrade patch: Creating missing index ".concat(t.name, ".").concat(e.src)), pn(n, e);
					});
				})(o[n]);
				if ("object" == typeof i) return i.value;
			}
		}
		function fn(e, t) {
			var n, r = {
				del: [],
				add: [],
				change: []
			};
			for (n in e) t[n] || r.del.push(n);
			for (n in t) {
				var o = e[n], i = t[n];
				if (o) {
					var a = {
						name: n,
						def: i,
						recreate: !1,
						del: [],
						add: [],
						change: []
					};
					if ("" + (o.primKey.keyPath || "") != "" + (i.primKey.keyPath || "") || o.primKey.auto !== i.primKey.auto) a.recreate = !0, r.change.push(a);
					else {
						var u = o.idxByName, s = i.idxByName, c = void 0;
						for (c in u) s[c] || a.del.push(c);
						for (c in s) {
							var l = u[c], f = s[c];
							l ? l.src !== f.src && a.change.push(f) : a.add.push(f);
						}
						(0 < a.del.length || 0 < a.add.length || 0 < a.change.length) && r.change.push(a);
					}
				} else r.add.push([n, i]);
			}
			return r;
		}
		function hn(e, t, n, r) {
			var o = e.db.createObjectStore(t, n.keyPath ? {
				keyPath: n.keyPath,
				autoIncrement: n.auto
			} : { autoIncrement: n.auto });
			r.forEach(function(e) {
				return pn(o, e);
			});
		}
		function dn(t, n) {
			O(t).forEach(function(e) {
				n.db.objectStoreNames.contains(e) || (l && console.debug("Dexie: Creating missing table", e), hn(n, e, t[e].primKey, t[e].indexes));
			});
		}
		function pn(e, t) {
			e.createIndex(t.name, t.keyPath, {
				unique: t.unique,
				multiEntry: t.multi
			});
		}
		function yn(e, t, u) {
			var s = {};
			return W(t.objectStoreNames, 0).forEach(function(e) {
				for (var t = u.objectStore(e), n = Qt(Gt(a = t.keyPath), a || "", !0, !1, !!t.autoIncrement, a && "string" != typeof a, !0), r = [], o = 0; o < t.indexNames.length; ++o) {
					var i = t.index(t.indexNames[o]), a = i.keyPath, i = Qt(i.name, a, !!i.unique, !!i.multiEntry, !1, a && "string" != typeof a, !1);
					r.push(i);
				}
				s[e] = Xt(e, n, r);
			}), s;
		}
		function vn(e, t, n) {
			for (var r = n.db.objectStoreNames, o = 0; o < r.length; ++o) {
				var i = r[o], a = n.objectStore(i);
				e._hasGetAll = "getAll" in a;
				for (var u = 0; u < a.indexNames.length; ++u) {
					var s, c = a.indexNames[u], l = a.index(c).keyPath, l = "string" == typeof l ? l : "[" + W(l).join("+") + "]";
					t[i] && (s = t[i].idxByName[l]) && (s.name = c, delete t[i].idxByName[l], t[i].idxByName[c] = s);
				}
			}
			"undefined" != typeof navigator && /Safari/.test(navigator.userAgent) && !/(Chrome\/|Edge\/)/.test(navigator.userAgent) && f.WorkerGlobalScope && f instanceof f.WorkerGlobalScope && [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604 && (e._hasGetAll = !1);
		}
		function mn(e) {
			return e.split(",").map(function(e, t) {
				var n = e.split(":"), r = null == (r = n[1]) ? void 0 : r.trim(), n = (e = n[0].trim()).replace(/([&*]|\+\+)/g, ""), o = /^\[/.test(n) ? n.match(/^\[(.*)\]$/)[1].split("+") : n;
				return Qt(n, o || null, /\&/.test(e), /\*/.test(e), /\+\+/.test(e), x(o), 0 === t, r);
			});
		}
		gn.prototype._createTableSchema = Xt, gn.prototype._parseIndexSyntax = mn, gn.prototype._parseStoresSpec = function(r, o) {
			var i = this;
			O(r).forEach(function(e) {
				if (null !== r[e]) {
					var t = i._parseIndexSyntax(r[e]), n = t.shift();
					if (!n) throw new k.Schema("Invalid schema for table " + e + ": " + r[e]);
					if (n.unique = !0, n.multi) throw new k.Schema("Primary key cannot be multiEntry*");
					t.forEach(function(e) {
						if (e.auto) throw new k.Schema("Only primary key can be marked as autoIncrement (++)");
						if (!e.keyPath) throw new k.Schema("Index must have a name and cannot be an empty string");
					});
					n = i._createTableSchema(e, n, t);
					o[e] = n;
				}
			});
		}, gn.prototype.stores = function(e) {
			var t = this.db, e = (this._cfg.storesSource = this._cfg.storesSource ? a(this._cfg.storesSource, e) : e, t._versions), n = {}, r = {};
			return e.forEach(function(e) {
				a(n, e._cfg.storesSource), r = e._cfg.dbschema = {}, e._parseStoresSpec(n, r);
			}), t._dbSchema = r, un(t, [
				t._allTables,
				t,
				t.Transaction.prototype
			]), an(t, [
				t._allTables,
				t,
				t.Transaction.prototype,
				this._cfg.tables
			], O(r), r), t._storeNames = O(r), this;
		}, gn.prototype.upgrade = function(e) {
			return this._cfg.contentUpgrade = ke(this._cfg.contentUpgrade || g, e), this;
		};
		var bn = gn;
		function gn() {}
		function wn(e, t) {
			var n = e._dbNamesDB;
			return n || (n = e._dbNamesDB = new q(ht, {
				addons: [],
				indexedDB: e,
				IDBKeyRange: t
			})).version(1).stores({ dbnames: "name" }), n.table("dbnames");
		}
		function _n(e) {
			return e && "function" == typeof e.databases;
		}
		function xn(e) {
			return y(function() {
				return P.letThrough = !0, e();
			});
		}
		function kn(e) {
			return !("from" in e);
		}
		var I = function(e, t) {
			var n;
			if (!this) return n = new I(), e && "d" in e && a(n, e), n;
			a(this, arguments.length ? {
				d: 1,
				from: e,
				to: 1 < arguments.length ? t : e
			} : { d: 0 });
		};
		function On(e, t, n) {
			var r = j(t, n);
			if (!isNaN(r)) {
				if (0 < r) throw RangeError();
				if (kn(e)) return a(e, {
					from: t,
					to: n,
					d: 1
				});
				var r = e.l, o = e.r;
				if (j(n, e.from) < 0) return r ? On(r, t, n) : e.l = {
					from: t,
					to: n,
					d: 1,
					l: null,
					r: null
				}, Sn(e);
				if (0 < j(t, e.to)) return o ? On(o, t, n) : e.r = {
					from: t,
					to: n,
					d: 1,
					l: null,
					r: null
				}, Sn(e);
				j(t, e.from) < 0 && (e.from = t, e.l = null, e.d = o ? o.d + 1 : 1), 0 < j(n, e.to) && (e.to = n, e.r = null, e.d = e.l ? e.l.d + 1 : 1);
				t = !e.r;
				r && !e.l && Pn(e, r), o && t && Pn(e, o);
			}
		}
		function Pn(e, t) {
			kn(t) || function e(t, n) {
				var r = n.from, o = n.l, i = n.r;
				On(t, r, n.to), o && e(t, o), i && e(t, i);
			}(e, t);
		}
		function Kn(e, t) {
			var n = En(t), r = n.next();
			if (!r.done) for (var o = r.value, i = En(e), a = i.next(o.from), u = a.value; !r.done && !a.done;) {
				if (j(u.from, o.to) <= 0 && 0 <= j(u.to, o.from)) return !0;
				j(o.from, u.from) < 0 ? o = (r = n.next(u.from)).value : u = (a = i.next(o.from)).value;
			}
			return !1;
		}
		function En(e) {
			var n = kn(e) ? null : {
				s: 0,
				n: e
			};
			return { next: function(e) {
				for (var t = 0 < arguments.length; n;) switch (n.s) {
					case 0: if (n.s = 1, t) for (; n.n.l && j(e, n.n.from) < 0;) n = {
						up: n,
						n: n.n.l,
						s: 1
					};
					else for (; n.n.l;) n = {
						up: n,
						n: n.n.l,
						s: 1
					};
					case 1: if (n.s = 2, !t || j(e, n.n.to) <= 0) return {
						value: n.n,
						done: !1
					};
					case 2: if (n.n.r) {
						n.s = 3, n = {
							up: n,
							n: n.n.r,
							s: 0
						};
						continue;
					}
					case 3: n = n.up;
				}
				return { done: !0 };
			} };
		}
		function Sn(e) {
			var t, n, r, o = ((null == (o = e.r) ? void 0 : o.d) || 0) - ((null == (o = e.l) ? void 0 : o.d) || 0), o = 1 < o ? "r" : o < -1 ? "l" : "";
			o && (t = "r" == o ? "l" : "r", n = _({}, e), r = e[o], e.from = r.from, e.to = r.to, e[o] = r[o], n[o] = r[t], (e[t] = n).d = jn(n)), e.d = jn(e);
		}
		function jn(e) {
			var t = e.r, e = e.l;
			return (t ? e ? Math.max(t.d, e.d) : t.d : e ? e.d : 0) + 1;
		}
		function An(t, n) {
			return O(n).forEach(function(e) {
				t[e] ? Pn(t[e], n[e]) : t[e] = function e(t) {
					var n, r, o = {};
					for (n in t) m(t, n) && (r = t[n], o[n] = !r || "object" != typeof r || J.has(r.constructor) ? r : e(r));
					return o;
				}(n[e]);
			}), t;
		}
		function Cn(t, n) {
			return t.all || n.all || Object.keys(t).some(function(e) {
				return n[e] && Kn(n[e], t[e]);
			});
		}
		N(I.prototype, ((t = {
			add: function(e) {
				return Pn(this, e), this;
			},
			addKey: function(e) {
				return On(this, e, e), this;
			},
			addKeys: function(e) {
				var t = this;
				return e.forEach(function(e) {
					return On(t, e, e);
				}), this;
			},
			hasKey: function(e) {
				var t = En(this).next(e).value;
				return t && j(t.from, e) <= 0 && 0 <= j(t.to, e);
			}
		})[re] = function() {
			return En(this);
		}, t));
		var Tn = {}, In = {}, qn = !1;
		function Dn(e) {
			An(In, e), qn || (qn = !0, setTimeout(function() {
				qn = !1, Bn(In, !(In = {}));
			}, 0));
		}
		function Bn(e, t) {
			void 0 === t && (t = !1);
			var n = /* @__PURE__ */ new Set();
			if (e.all) for (var r = 0, o = Object.values(Tn); r < o.length; r++) Rn(u = o[r], e, n, t);
			else for (var i in e) {
				var a, u, i = /^idb\:\/\/(.*)\/(.*)\//.exec(i);
				i && (a = i[1], i = i[2], u = Tn["idb://".concat(a, "/").concat(i)]) && Rn(u, e, n, t);
			}
			n.forEach(function(e) {
				return e();
			});
		}
		function Rn(e, t, n, r) {
			for (var o = [], i = 0, a = Object.entries(e.queries.query); i < a.length; i++) {
				for (var u = a[i], s = u[0], c = [], l = 0, f = u[1]; l < f.length; l++) {
					var h = f[l];
					Cn(t, h.obsSet) ? h.subscribers.forEach(function(e) {
						return n.add(e);
					}) : r && c.push(h);
				}
				r && o.push([s, c]);
			}
			if (r) for (var d = 0, p = o; d < p.length; d++) {
				var y = p[d], s = y[0], c = y[1];
				e.queries.query[s] = c;
			}
		}
		function Fn(h) {
			var d = h._state, r = h._deps.indexedDB;
			if (d.isBeingOpened || h.idbdb) return d.dbReadyPromise.then(function() {
				return d.dbOpenError ? w(d.dbOpenError) : h;
			});
			d.isBeingOpened = !0, d.dbOpenError = null, d.openComplete = !1;
			var t = d.openCanceller, p = Math.round(10 * h.verno), y = !1;
			function e() {
				if (d.openCanceller !== t) throw new k.DatabaseClosed("db.open() was cancelled");
			}
			function v() {
				return new K(function(c, n) {
					if (e(), !r) throw new k.MissingAPI();
					var l = h.name, f = d.autoSchema || !p ? r.open(l) : r.open(l, p);
					if (!f) throw new k.MissingAPI();
					f.onerror = T(n), f.onblocked = E(h._fireOnBlocked), f.onupgradeneeded = E(function(e) {
						var t;
						m = f.transaction, d.autoSchema && !h._options.allowEmptyDB ? (f.onerror = Vt, m.abort(), f.result.close(), (t = r.deleteDatabase(l)).onsuccess = t.onerror = E(function() {
							n(new k.NoSuchDatabase("Database ".concat(l, " doesnt exist")));
						})) : (m.onerror = T(n), t = e.oldVersion > Math.pow(2, 62) ? 0 : e.oldVersion, b = t < 1, h.idbdb = f.result, y && ln(h, m), cn(h, t / 10, m, n));
					}, n), f.onsuccess = E(function() {
						m = null;
						var e, t, n, r, o, i, a = h.idbdb = f.result, u = W(a.objectStoreNames);
						if (0 < u.length) try {
							var s = a.transaction(1 === (o = u).length ? o[0] : o, "readonly");
							if (d.autoSchema) i = a, r = s, (n = h).verno = i.version / 10, r = n._dbSchema = yn(0, i, r), n._storeNames = W(i.objectStoreNames, 0), an(n, [n._allTables], O(r), r);
							else if (vn(h, h._dbSchema, s), t = s, ((t = fn(yn(0, (e = h).idbdb, t), e._dbSchema)).add.length || t.change.some(function(e) {
								return e.add.length || e.change.length;
							})) && !y) return console.warn("Dexie SchemaDiff: Schema was extended without increasing the number passed to db.version(). Dexie will add missing parts and increment native version number to workaround this."), a.close(), p = a.version + 1, y = !0, c(v());
							on(h, s);
						} catch (e) {}
						ft.push(h), a.onversionchange = E(function(e) {
							d.vcFired = !0, h.on("versionchange").fire(e);
						}), a.onclose = E(function() {
							h.close({ disableAutoOpen: !1 });
						}), b && (u = h._deps, o = l, _n(i = u.indexedDB) || o === ht || wn(i, u.IDBKeyRange).put({ name: o }).catch(g)), c();
					}, n);
				}).catch(function(e) {
					switch (null == e ? void 0 : e.name) {
						case "UnknownError":
							if (0 < d.PR1398_maxLoop) return d.PR1398_maxLoop--, console.warn("Dexie: Workaround for Chrome UnknownError on open()"), v();
							break;
						case "VersionError": if (0 < p) return p = 0, v();
					}
					return K.reject(e);
				});
			}
			var n, o = d.dbReadyResolve, m = null, b = !1;
			return K.race([t, ("undefined" == typeof navigator ? K.resolve() : !navigator.userAgentData && /Safari\//.test(navigator.userAgent) && !/Chrom(e|ium)\//.test(navigator.userAgent) && indexedDB.databases ? new Promise(function(e) {
				function t() {
					return indexedDB.databases().finally(e);
				}
				n = setInterval(t, 100), t();
			}).finally(function() {
				return clearInterval(n);
			}) : Promise.resolve()).then(v)]).then(function() {
				return e(), d.onReadyBeingFired = [], K.resolve(xn(function() {
					return h.on.ready.fire(h.vip);
				})).then(function e() {
					var t;
					if (0 < d.onReadyBeingFired.length) return t = d.onReadyBeingFired.reduce(ke, g), d.onReadyBeingFired = [], K.resolve(xn(function() {
						return t(h.vip);
					})).then(e);
				});
			}).finally(function() {
				d.openCanceller === t && (d.onReadyBeingFired = null, d.isBeingOpened = !1);
			}).catch(function(e) {
				d.dbOpenError = e;
				try {
					m && m.abort();
				} catch (e) {}
				return t === d.openCanceller && h._close(), w(e);
			}).finally(function() {
				d.openComplete = !0, o();
			}).then(function() {
				var n;
				return b && (n = {}, h.tables.forEach(function(t) {
					t.schema.indexes.forEach(function(e) {
						e.name && (n["idb://".concat(h.name, "/").concat(t.name, "/").concat(e.name)] = new I(-Infinity, [[[]]]));
					}), n["idb://".concat(h.name, "/").concat(t.name, "/")] = n["idb://".concat(h.name, "/").concat(t.name, "/:dels")] = new I(-Infinity, [[[]]]);
				}), Yt(zt).fire(n), Bn(n, !0)), h;
			});
		}
		function Mn(t) {
			function e(e) {
				return t.next(e);
			}
			var r = n(e), o = n(function(e) {
				return t.throw(e);
			});
			function n(n) {
				return function(e) {
					var e = n(e), t = e.value;
					return e.done ? t : t && "function" == typeof t.then ? t.then(r, o) : x(t) ? Promise.all(t).then(r, o) : r(t);
				};
			}
			return n(e)();
		}
		function Nn(e, t, n) {
			for (var r = x(e) ? e.slice() : [e], o = 0; o < n; ++o) r.push(t);
			return r;
		}
		var Ln = {
			stack: "dbcore",
			name: "VirtualIndexMiddleware",
			level: 1,
			create: function(l) {
				return _(_({}, l), { table: function(e) {
					var i = l.table(e), e = i.schema, u = {}, s = [];
					function c(e, t, n) {
						var r = tn(e), o = u[r] = u[r] || [], i = null == e ? 0 : "string" == typeof e ? 1 : e.length, a = 0 < t, r = _(_({}, n), {
							name: a ? "".concat(r, "(virtual-from:").concat(n.name, ")") : n.name,
							lowLevelIndex: n,
							isVirtual: a,
							keyTail: t,
							keyLength: i,
							extractKey: Jt(e),
							unique: !a && n.unique
						});
						return o.push(r), r.isPrimaryKey || s.push(r), 1 < i && c(2 === i ? e[0] : e.slice(0, i - 1), t + 1, n), o.sort(function(e, t) {
							return e.keyTail - t.keyTail;
						}), r;
					}
					var t = c(e.primaryKey.keyPath, 0, e.primaryKey);
					u[":id"] = [t];
					for (var n = 0, r = e.indexes; n < r.length; n++) {
						var o = r[n];
						c(o.keyPath, 0, o);
					}
					function a(e) {
						var t, n = e.query.index;
						return n.isVirtual ? _(_({}, e), { query: {
							index: n.lowLevelIndex,
							range: (t = e.query.range, n = n.keyTail, {
								type: 1 === t.type ? 2 : t.type,
								lower: Nn(t.lower, t.lowerOpen ? l.MAX_KEY : l.MIN_KEY, n),
								lowerOpen: !0,
								upper: Nn(t.upper, t.upperOpen ? l.MIN_KEY : l.MAX_KEY, n),
								upperOpen: !0
							})
						} }) : e;
					}
					return _(_({}, i), {
						schema: _(_({}, e), {
							primaryKey: t,
							indexes: s,
							getIndexByKeyPath: function(e) {
								return (e = u[tn(e)]) && e[0];
							}
						}),
						count: function(e) {
							return i.count(a(e));
						},
						query: function(e) {
							return i.query(a(e));
						},
						openCursor: function(t) {
							var e = t.query.index, r = e.keyTail, o = e.keyLength;
							return e.isVirtual ? i.openCursor(a(t)).then(function(e) {
								return e && n(e);
							}) : i.openCursor(t);
							function n(n) {
								return Object.create(n, {
									continue: { value: function(e) {
										null != e ? n.continue(Nn(e, t.reverse ? l.MAX_KEY : l.MIN_KEY, r)) : t.unique ? n.continue(n.key.slice(0, o).concat(t.reverse ? l.MIN_KEY : l.MAX_KEY, r)) : n.continue();
									} },
									continuePrimaryKey: { value: function(e, t) {
										n.continuePrimaryKey(Nn(e, l.MAX_KEY, r), t);
									} },
									primaryKey: { get: function() {
										return n.primaryKey;
									} },
									key: { get: function() {
										var e = n.key;
										return 1 === o ? e[0] : e.slice(0, o);
									} },
									value: { get: function() {
										return n.value;
									} }
								});
							}
						}
					});
				} });
			}
		};
		function Un(o, i, a, u) {
			return a = a || {}, u = u || "", O(o).forEach(function(e) {
				var t, n, r;
				m(i, e) ? (t = o[e], n = i[e], "object" == typeof t && "object" == typeof n && t && n ? (r = ne(t)) !== ne(n) ? a[u + e] = i[e] : "Object" === r ? Un(t, n, a, u + e + ".") : t !== n && (a[u + e] = i[e]) : t !== n && (a[u + e] = i[e])) : a[u + e] = void 0;
			}), O(i).forEach(function(e) {
				m(o, e) || (a[u + e] = i[e]);
			}), a;
		}
		function Vn(e, t) {
			return "delete" === t.type ? t.keys : t.keys || t.values.map(e.extractKey);
		}
		var zn = {
			stack: "dbcore",
			name: "HooksMiddleware",
			level: 2,
			create: function(e) {
				return _(_({}, e), { table: function(r) {
					var y = e.table(r), v = y.schema.primaryKey;
					return _(_({}, y), { mutate: function(e) {
						var t = P.trans, n = t.table(r).hook, h = n.deleting, d = n.creating, p = n.updating;
						switch (e.type) {
							case "add":
								if (d.fire === g) break;
								return t._promise("readwrite", function() {
									return a(e);
								}, !0);
							case "put":
								if (d.fire === g && p.fire === g) break;
								return t._promise("readwrite", function() {
									return a(e);
								}, !0);
							case "delete":
								if (h.fire === g) break;
								return t._promise("readwrite", function() {
									return a(e);
								}, !0);
							case "deleteRange":
								if (h.fire === g) break;
								return t._promise("readwrite", function() {
									return function n(r, o, i) {
										return y.query({
											trans: r,
											values: !1,
											query: {
												index: v,
												range: o
											},
											limit: i
										}).then(function(e) {
											var t = e.result;
											return a({
												type: "delete",
												keys: t,
												trans: r
											}).then(function(e) {
												return 0 < e.numFailures ? Promise.reject(e.failures[0]) : t.length < i ? {
													failures: [],
													numFailures: 0,
													lastResult: void 0
												} : n(r, _(_({}, o), {
													lower: t[t.length - 1],
													lowerOpen: !0
												}), i);
											});
										});
									}(e.trans, e.range, 1e4);
								}, !0);
						}
						return y.mutate(e);
						function a(c) {
							var e, t, n, l = P.trans, f = c.keys || Vn(v, c);
							if (f) return "delete" !== (c = "add" === c.type || "put" === c.type ? _(_({}, c), { keys: f }) : _({}, c)).type && (c.values = R([], c.values, !0)), c.keys && (c.keys = R([], c.keys, !0)), e = y, n = f, ("add" === (t = c).type ? Promise.resolve([]) : e.getMany({
								trans: t.trans,
								keys: n,
								cache: "immutable"
							})).then(function(u) {
								var s = f.map(function(e, t) {
									var n, r, o, i = u[t], a = {
										onerror: null,
										onsuccess: null
									};
									return "delete" === c.type ? h.fire.call(a, e, i, l) : "add" === c.type || void 0 === i ? (n = d.fire.call(a, e, c.values[t], l), null == e && null != n && (c.keys[t] = e = n, v.outbound || b(c.values[t], v.keyPath, e))) : (n = Un(i, c.values[t]), (r = p.fire.call(a, n, e, i, l)) && (o = c.values[t], Object.keys(r).forEach(function(e) {
										m(o, e) ? o[e] = r[e] : b(o, e, r[e]);
									}))), a;
								});
								return y.mutate(c).then(function(e) {
									for (var t = e.failures, n = e.results, r = e.numFailures, e = e.lastResult, o = 0; o < f.length; ++o) {
										var i = (n || f)[o], a = s[o];
										null == i ? a.onerror && a.onerror(t[o]) : a.onsuccess && a.onsuccess("put" === c.type && u[o] ? c.values[o] : i);
									}
									return {
										failures: t,
										results: n,
										numFailures: r,
										lastResult: e
									};
								}).catch(function(t) {
									return s.forEach(function(e) {
										return e.onerror && e.onerror(t);
									}), Promise.reject(t);
								});
							});
							throw new Error("Keys missing");
						}
					} });
				} });
			}
		};
		function Wn(e, t, n) {
			try {
				if (!t) return null;
				if (t.keys.length < e.length) return null;
				for (var r = [], o = 0, i = 0; o < t.keys.length && i < e.length; ++o) 0 === j(t.keys[o], e[i]) && (r.push(n ? ee(t.values[o]) : t.values[o]), ++i);
				return r.length === e.length ? r : null;
			} catch (e) {
				return null;
			}
		}
		var Yn = {
			stack: "dbcore",
			level: -1,
			create: function(t) {
				return { table: function(e) {
					var n = t.table(e);
					return _(_({}, n), {
						getMany: function(t) {
							var e;
							return t.cache ? (e = Wn(t.keys, t.trans._cache, "clone" === t.cache)) ? K.resolve(e) : n.getMany(t).then(function(e) {
								return t.trans._cache = {
									keys: t.keys,
									values: "clone" === t.cache ? ee(e) : e
								}, e;
							}) : n.getMany(t);
						},
						mutate: function(e) {
							return "add" !== e.type && (e.trans._cache = null), n.mutate(e);
						}
					});
				} };
			}
		};
		function $n(e, t) {
			return "readonly" === e.trans.mode && !!e.subscr && !e.trans.explicit && "disabled" !== e.trans.db._options.cache && !t.schema.primaryKey.outbound;
		}
		function Qn(e, t) {
			switch (e) {
				case "query": return t.values && !t.unique;
				case "get":
				case "getMany":
				case "count":
				case "openCursor": return !1;
			}
		}
		var Gn = {
			stack: "dbcore",
			level: 0,
			name: "Observability",
			create: function(b) {
				var g = b.schema.name, w = new I(b.MIN_KEY, b.MAX_KEY);
				return _(_({}, b), {
					transaction: function(e, t, n) {
						if (P.subscr && "readonly" !== t) throw new k.ReadOnly("Readwrite transaction in liveQuery context. Querier source: ".concat(P.querier));
						return b.transaction(e, t, n);
					},
					table: function(d) {
						function e(e) {
							var t, e = e.query;
							return [t = e.index, new I(null != (t = (e = e.range).lower) ? t : b.MIN_KEY, null != (t = e.upper) ? t : b.MAX_KEY)];
						}
						var p = b.table(d), y = p.schema, v = y.primaryKey, t = y.indexes, c = v.extractKey, l = v.outbound, m = v.autoIncrement && t.filter(function(e) {
							return e.compound && e.keyPath.includes(v.keyPath);
						}), n = _(_({}, p), { mutate: function(a) {
							function u(e) {
								return e = "idb://".concat(g, "/").concat(d, "/").concat(e), n[e] || (n[e] = new I());
							}
							var e, i, s, t = a.trans, n = a.mutatedParts || (a.mutatedParts = {}), r = u(""), o = u(":dels"), c = a.type, l = "deleteRange" === a.type ? [a.range] : "delete" === a.type ? [a.keys] : a.values.length < 50 ? [Vn(v, a).filter(function(e) {
								return e;
							}), a.values] : [], f = l[0], l = l[1], h = a.trans._cache;
							return x(f) ? (r.addKeys(f), (c = "delete" === c || f.length === l.length ? Wn(f, h) : null) || o.addKeys(f), (c || l) && (e = u, i = c, s = l, y.indexes.forEach(function(t) {
								var n = e(t.name || "");
								function r(e) {
									return null != e ? t.extractKey(e) : null;
								}
								function o(e) {
									t.multiEntry && x(e) ? e.forEach(function(e) {
										return n.addKey(e);
									}) : n.addKey(e);
								}
								(i || s).forEach(function(e, t) {
									var n = i && r(i[t]), t = s && r(s[t]);
									0 !== j(n, t) && (null != n && o(n), null != t) && o(t);
								});
							}))) : f ? (l = {
								from: null != (h = f.lower) ? h : b.MIN_KEY,
								to: null != (c = f.upper) ? c : b.MAX_KEY
							}, o.add(l), r.add(l)) : (r.add(w), o.add(w), y.indexes.forEach(function(e) {
								return u(e.name).add(w);
							})), p.mutate(a).then(function(i) {
								return !f || "add" !== a.type && "put" !== a.type || (r.addKeys(i.results), m && m.forEach(function(t) {
									for (var e = a.values.map(function(e) {
										return t.extractKey(e);
									}), n = t.keyPath.findIndex(function(e) {
										return e === v.keyPath;
									}), r = 0, o = i.results.length; r < o; ++r) e[r][n] = i.results[r];
									u(t.name).addKeys(e);
								})), t.mutatedParts = An(t.mutatedParts || {}, n), i;
							});
						} }), f = {
							get: function(e) {
								return [v, new I(e.key)];
							},
							getMany: function(e) {
								return [v, new I().addKeys(e.keys)];
							},
							count: e,
							query: e,
							openCursor: e
						};
						return O(f).forEach(function(s) {
							n[s] = function(o) {
								var e = P.subscr, t = !!e, n = $n(P, p) && Qn(s, o) ? o.obsSet = {} : e;
								if (t) {
									var i, e = function(e) {
										e = "idb://".concat(g, "/").concat(d, "/").concat(e);
										return n[e] || (n[e] = new I());
									}, a = e(""), u = e(":dels"), t = f[s](o), r = t[0], t = t[1];
									if (("query" === s && r.isPrimaryKey && !o.values ? u : e(r.name || "")).add(t), !r.isPrimaryKey) {
										if ("count" !== s) return i = "query" === s && l && o.values && p.query(_(_({}, o), { values: !1 })), p[s].apply(this, arguments).then(function(t) {
											if ("query" === s) {
												if (l && o.values) return i.then(function(e) {
													e = e.result;
													return a.addKeys(e), t;
												});
												var e = o.values ? t.result.map(c) : t.result;
												(o.values ? a : u).addKeys(e);
											} else {
												var n, r;
												if ("openCursor" === s) return r = o.values, (n = t) && Object.create(n, {
													key: { get: function() {
														return u.addKey(n.primaryKey), n.key;
													} },
													primaryKey: { get: function() {
														var e = n.primaryKey;
														return u.addKey(e), e;
													} },
													value: { get: function() {
														return r && a.addKey(n.primaryKey), n.value;
													} }
												});
											}
											return t;
										});
										u.add(w);
									}
								}
								return p[s].apply(this, arguments);
							};
						}), n;
					}
				});
			}
		};
		function Xn(e, t, n) {
			var r;
			return 0 === n.numFailures ? t : "deleteRange" === t.type || (r = t.keys ? t.keys.length : "values" in t && t.values ? t.values.length : 1, n.numFailures === r) ? null : (r = _({}, t), x(r.keys) && (r.keys = r.keys.filter(function(e, t) {
				return !(t in n.failures);
			})), "values" in r && x(r.values) && (r.values = r.values.filter(function(e, t) {
				return !(t in n.failures);
			})), r);
		}
		function Hn(e, t) {
			return n = e, (void 0 === (r = t).lower || (r.lowerOpen ? 0 < j(n, r.lower) : 0 <= j(n, r.lower))) && (n = e, void 0 === (r = t).upper || (r.upperOpen ? j(n, r.upper) < 0 : j(n, r.upper) <= 0));
			var n, r;
		}
		function Jn(e, d, t, n, r, o) {
			var i, p, y, v, m, a;
			return !t || 0 === t.length || (i = d.query.index, p = i.multiEntry, y = d.query.range, v = n.schema.primaryKey.extractKey, m = i.extractKey, a = (i.lowLevelIndex || i).extractKey, (n = t.reduce(function(e, t) {
				var n = e, r = [];
				if ("add" === t.type || "put" === t.type) for (var o = new I(), i = t.values.length - 1; 0 <= i; --i) {
					var a, u = t.values[i], s = v(u);
					!o.hasKey(s) && (a = m(u), p && x(a) ? a.some(function(e) {
						return Hn(e, y);
					}) : Hn(a, y)) && (o.addKey(s), r.push(u));
				}
				switch (t.type) {
					case "add":
						var c = new I().addKeys(d.values ? e.map(function(e) {
							return v(e);
						}) : e), n = e.concat(d.values ? r.filter(function(e) {
							e = v(e);
							return !c.hasKey(e) && (c.addKey(e), !0);
						}) : r.map(function(e) {
							return v(e);
						}).filter(function(e) {
							return !c.hasKey(e) && (c.addKey(e), !0);
						}));
						break;
					case "put":
						var l = new I().addKeys(t.values.map(function(e) {
							return v(e);
						}));
						n = e.filter(function(e) {
							return !l.hasKey(d.values ? v(e) : e);
						}).concat(d.values ? r : r.map(function(e) {
							return v(e);
						}));
						break;
					case "delete":
						var f = new I().addKeys(t.keys);
						n = e.filter(function(e) {
							return !f.hasKey(d.values ? v(e) : e);
						});
						break;
					case "deleteRange":
						var h = t.range;
						n = e.filter(function(e) {
							return !Hn(v(e), h);
						});
				}
				return n;
			}, e)) === e) ? e : (n.sort(function(e, t) {
				return j(a(e), a(t)) || j(v(e), v(t));
			}), d.limit && d.limit < Infinity && (n.length > d.limit ? n.length = d.limit : e.length === d.limit && n.length < d.limit && (r.dirty = !0)), o ? Object.freeze(n) : n);
		}
		function Zn(e, t) {
			return 0 === j(e.lower, t.lower) && 0 === j(e.upper, t.upper) && !!e.lowerOpen == !!t.lowerOpen && !!e.upperOpen == !!t.upperOpen;
		}
		function er(e, t) {
			return ((e, t, n, r) => {
				if (void 0 === e) return void 0 !== t ? -1 : 0;
				if (void 0 === t) return 1;
				if (0 === (e = j(e, t))) {
					if (n && r) return 0;
					if (n) return 1;
					if (r) return -1;
				}
				return e;
			})(e.lower, t.lower, e.lowerOpen, t.lowerOpen) <= 0 && 0 <= ((e, t, n, r) => {
				if (void 0 === e) return void 0 !== t ? 1 : 0;
				if (void 0 === t) return -1;
				if (0 === (e = j(e, t))) {
					if (n && r) return 0;
					if (n) return -1;
					if (r) return 1;
				}
				return e;
			})(e.upper, t.upper, e.upperOpen, t.upperOpen);
		}
		function tr(n, r, o, e) {
			n.subscribers.add(o), e.addEventListener("abort", function() {
				var e, t;
				n.subscribers.delete(o), 0 === n.subscribers.size && (e = n, t = r, setTimeout(function() {
					0 === e.subscribers.size && ie(t, e);
				}, 3e3));
			});
		}
		var nr = {
			stack: "dbcore",
			level: 0,
			name: "Cache",
			create: function(k) {
				var O = k.schema.name;
				return _(_({}, k), {
					transaction: function(g, w, e) {
						var _, t, x = k.transaction(g, w, e);
						return "readwrite" === w && (e = (_ = new AbortController()).signal, x.addEventListener("abort", (t = function(b) {
							return function() {
								if (_.abort(), "readwrite" === w) {
									for (var t = /* @__PURE__ */ new Set(), e = 0, n = g; e < n.length; e++) {
										var r = n[e], o = Tn["idb://".concat(O, "/").concat(r)];
										if (o) {
											var i = k.table(r), a = o.optimisticOps.filter(function(e) {
												return e.trans === x;
											});
											if (x._explicit && b && x.mutatedParts) for (var u = 0, s = Object.values(o.queries.query); u < s.length; u++) for (var c = 0, l = (d = s[u]).slice(); c < l.length; c++) Cn((p = l[c]).obsSet, x.mutatedParts) && (ie(d, p), p.subscribers.forEach(function(e) {
												return t.add(e);
											}));
											else if (0 < a.length) {
												o.optimisticOps = o.optimisticOps.filter(function(e) {
													return e.trans !== x;
												});
												for (var f = 0, h = Object.values(o.queries.query); f < h.length; f++) for (var d, p, y, v = 0, m = (d = h[f]).slice(); v < m.length; v++) null != (p = m[v]).res && x.mutatedParts && (b && !p.dirty ? (y = Object.isFrozen(p.res), y = Jn(p.res, p.req, a, i, p, y), p.dirty ? (ie(d, p), p.subscribers.forEach(function(e) {
													return t.add(e);
												})) : y !== p.res && (p.res = y, p.promise = K.resolve({ result: y }))) : (p.dirty && ie(d, p), p.subscribers.forEach(function(e) {
													return t.add(e);
												})));
											}
										}
									}
									t.forEach(function(e) {
										return e();
									});
								}
							};
						})(!1), { signal: e }), x.addEventListener("error", t(!1), { signal: e }), x.addEventListener("complete", t(!0), { signal: e })), x;
					},
					table: function(s) {
						var c = k.table(s), o = c.schema.primaryKey;
						return _(_({}, c), {
							mutate: function(t) {
								var n, e = P.trans;
								return !o.outbound && "disabled" !== e.db._options.cache && !e.explicit && "readwrite" === e.idbtrans.mode && (n = Tn["idb://".concat(O, "/").concat(s)]) ? (e = c.mutate(t), "add" !== t.type && "put" !== t.type || !(50 <= t.values.length || Vn(o, t).some(function(e) {
									return null == e;
								})) ? (n.optimisticOps.push(t), t.mutatedParts && Dn(t.mutatedParts), e.then(function(e) {
									0 < e.numFailures && (ie(n.optimisticOps, t), (e = Xn(0, t, e)) && n.optimisticOps.push(e), t.mutatedParts) && Dn(t.mutatedParts);
								}), e.catch(function() {
									ie(n.optimisticOps, t), t.mutatedParts && Dn(t.mutatedParts);
								})) : e.then(function(r) {
									var e = Xn(0, _(_({}, t), { values: t.values.map(function(e, t) {
										var n;
										return r.failures[t] ? e : (b(n = null != (n = o.keyPath) && n.includes(".") ? ee(e) : _({}, e), o.keyPath, r.results[t]), n);
									}) }), r);
									n.optimisticOps.push(e), queueMicrotask(function() {
										return t.mutatedParts && Dn(t.mutatedParts);
									});
								}), e) : c.mutate(t);
							},
							query: function(t) {
								var o, e, n, r, i, a, u;
								return $n(P, c) && Qn("query", t) ? (o = "immutable" === (null == (n = P.trans) ? void 0 : n.db._options.cache), e = (n = P).requery, n = n.signal, a = ((e, t, n, r) => {
									var o = Tn["idb://".concat(e, "/").concat(t)];
									if (!o) return [];
									if (!(e = o.queries[n])) return [
										null,
										!1,
										o,
										null
									];
									var i = e[(r.query ? r.query.index.name : null) || ""];
									if (!i) return [
										null,
										!1,
										o,
										null
									];
									switch (n) {
										case "query":
											var a = i.find(function(e) {
												return e.req.limit === r.limit && e.req.values === r.values && Zn(e.req.query.range, r.query.range);
											});
											return a ? [
												a,
												!0,
												o,
												i
											] : [
												i.find(function(e) {
													return ("limit" in e.req ? e.req.limit : Infinity) >= r.limit && (!r.values || e.req.values) && er(e.req.query.range, r.query.range);
												}),
												!1,
												o,
												i
											];
										case "count":
											a = i.find(function(e) {
												return Zn(e.req.query.range, r.query.range);
											});
											return [
												a,
												!!a,
												o,
												i
											];
									}
								})(O, s, "query", t), u = a[0], r = a[2], i = a[3], u && a[1] ? u.obsSet = t.obsSet : (a = c.query(t).then(function(e) {
									var t = e.result;
									if (u && (u.res = t), o) {
										for (var n = 0, r = t.length; n < r; ++n) Object.freeze(t[n]);
										Object.freeze(t);
									} else e.result = ee(t);
									return e;
								}).catch(function(e) {
									return i && u && ie(i, u), Promise.reject(e);
								}), u = {
									obsSet: t.obsSet,
									promise: a,
									subscribers: /* @__PURE__ */ new Set(),
									type: "query",
									req: t,
									dirty: !1
								}, i ? i.push(u) : (i = [u], (r = r || (Tn["idb://".concat(O, "/").concat(s)] = {
									queries: {
										query: {},
										count: {}
									},
									objs: /* @__PURE__ */ new Map(),
									optimisticOps: [],
									unsignaledParts: {}
								})).queries.query[t.query.index.name || ""] = i)), tr(u, i, e, n), u.promise.then(function(e) {
									return { result: Jn(e.result, t, null == r ? void 0 : r.optimisticOps, c, u, o) };
								})) : c.query(t);
							}
						});
					}
				});
			}
		};
		function rr(e, r) {
			return new Proxy(e, { get: function(e, t, n) {
				return "db" === t ? r : Reflect.get(e, t, n);
			} });
		}
		D.prototype.version = function(t) {
			if (isNaN(t) || t < .1) throw new k.Type("Given version is not a positive number");
			if (t = Math.round(10 * t) / 10, this.idbdb || this._state.isBeingOpened) throw new k.Schema("Cannot add version when database is open");
			this.verno = Math.max(this.verno, t);
			var e = this._versions, n = e.filter(function(e) {
				return e._cfg.version === t;
			})[0];
			return n || (n = new this.Version(t), e.push(n), e.sort(sn), n.stores({}), this._state.autoSchema = !1), n;
		}, D.prototype._whenReady = function(e) {
			var n = this;
			return this.idbdb && (this._state.openComplete || P.letThrough || this._vip) ? e() : new K(function(e, t) {
				if (n._state.openComplete) return t(new k.DatabaseClosed(n._state.dbOpenError));
				if (!n._state.isBeingOpened) {
					if (!n._state.autoOpen) return void t(new k.DatabaseClosed());
					n.open().catch(g);
				}
				n._state.dbReadyPromise.then(e, t);
			}).then(e);
		}, D.prototype.use = function(e) {
			var t = e.stack, n = e.create, r = e.level, e = e.name, o = (e && this.unuse({
				stack: t,
				name: e
			}), this._middlewares[t] || (this._middlewares[t] = []));
			return o.push({
				stack: t,
				create: n,
				level: null == r ? 10 : r,
				name: e
			}), o.sort(function(e, t) {
				return e.level - t.level;
			}), this;
		}, D.prototype.unuse = function(e) {
			var t = e.stack, n = e.name, r = e.create;
			return t && this._middlewares[t] && (this._middlewares[t] = this._middlewares[t].filter(function(e) {
				return r ? e.create !== r : !!n && e.name !== n;
			})), this;
		}, D.prototype.open = function() {
			var e = this;
			return at(s, function() {
				return Fn(e);
			});
		}, D.prototype._close = function() {
			this.on.close.fire(new CustomEvent("close"));
			var n = this._state, e = ft.indexOf(this);
			if (0 <= e && ft.splice(e, 1), this.idbdb) {
				try {
					this.idbdb.close();
				} catch (e) {}
				this.idbdb = null;
			}
			n.isBeingOpened || (n.dbReadyPromise = new K(function(e) {
				n.dbReadyResolve = e;
			}), n.openCanceller = new K(function(e, t) {
				n.cancelOpen = t;
			}));
		}, D.prototype.close = function(e) {
			var e = (void 0 === e ? { disableAutoOpen: !0 } : e).disableAutoOpen, t = this._state;
			e ? (t.isBeingOpened && t.cancelOpen(new k.DatabaseClosed()), this._close(), t.autoOpen = !1, t.dbOpenError = new k.DatabaseClosed()) : (this._close(), t.autoOpen = this._options.autoOpen || t.isBeingOpened, t.openComplete = !1, t.dbOpenError = null);
		}, D.prototype.delete = function(n) {
			var o = this, i = (void 0 === n && (n = { disableAutoOpen: !0 }), 0 < arguments.length && "object" != typeof arguments[0]), a = this._state;
			return new K(function(r, t) {
				function e() {
					o.close(n);
					var e = o._deps.indexedDB.deleteDatabase(o.name);
					e.onsuccess = E(function() {
						var e = o._deps, t = o.name, n;
						_n(n = e.indexedDB) || t === ht || wn(n, e.IDBKeyRange).delete(t).catch(g), r();
					}), e.onerror = T(t), e.onblocked = o._fireOnBlocked;
				}
				if (i) throw new k.InvalidArgument("Invalid closeOptions argument to db.delete()");
				a.isBeingOpened ? a.dbReadyPromise.then(e) : e();
			});
		}, D.prototype.backendDB = function() {
			return this.idbdb;
		}, D.prototype.isOpen = function() {
			return null !== this.idbdb;
		}, D.prototype.hasBeenClosed = function() {
			var e = this._state.dbOpenError;
			return e && "DatabaseClosed" === e.name;
		}, D.prototype.hasFailed = function() {
			return null !== this._state.dbOpenError;
		}, D.prototype.dynamicallyOpened = function() {
			return this._state.autoSchema;
		}, Object.defineProperty(D.prototype, "tables", {
			get: function() {
				var t = this;
				return O(this._allTables).map(function(e) {
					return t._allTables[e];
				});
			},
			enumerable: !1,
			configurable: !0
		}), D.prototype.transaction = function() {
			var e = function(e, t, n) {
				var r = arguments.length;
				if (r < 2) throw new k.InvalidArgument("Too few arguments");
				for (var o = new Array(r - 1); --r;) o[r - 1] = arguments[r];
				return n = o.pop(), [
					e,
					H(o),
					n
				];
			}.apply(this, arguments);
			return this._transaction.apply(this, e);
		}, D.prototype._transaction = function(e, t, n) {
			var r, o, i = this, a = P.trans, u = (a && a.db === this && -1 === e.indexOf("!") || (a = null), -1 !== e.indexOf("?"));
			e = e.replace("!", "").replace("?", "");
			try {
				if (o = t.map(function(e) {
					e = e instanceof i.Table ? e.name : e;
					if ("string" != typeof e) throw new TypeError("Invalid table argument to Dexie.transaction(). Only Table or String are allowed");
					return e;
				}), "r" == e || e === dt) r = dt;
				else {
					if ("rw" != e && e != pt) throw new k.InvalidArgument("Invalid transaction mode: " + e);
					r = pt;
				}
				if (a) {
					if (a.mode === dt && r === pt) {
						if (!u) throw new k.SubTransaction("Cannot enter a sub-transaction with READWRITE mode when parent transaction is READONLY");
						a = null;
					}
					a && o.forEach(function(e) {
						if (a && -1 === a.storeNames.indexOf(e)) {
							if (!u) throw new k.SubTransaction("Table " + e + " not included in parent transaction.");
							a = null;
						}
					}), u && a && !a.active && (a = null);
				}
			} catch (n) {
				return a ? a._promise(null, function(e, t) {
					t(n);
				}) : w(n);
			}
			var s = function o(i, a, u, s, c) {
				return K.resolve().then(function() {
					var e = P.transless || P, t = i._createTransaction(a, u, i._dbSchema, s), e = (t.explicit = !0, {
						trans: t,
						transless: e
					});
					if (s) t.idbtrans = s.idbtrans;
					else try {
						t.create(), t.idbtrans._explicit = !0, i._state.PR1398_maxLoop = 3;
					} catch (e) {
						return e.name === de.InvalidState && i.isOpen() && 0 < --i._state.PR1398_maxLoop ? (console.warn("Dexie: Need to reopen db"), i.close({ disableAutoOpen: !1 }), i.open().then(function() {
							return o(i, a, u, null, c);
						})) : w(e);
					}
					var n, r = ue(c), e = (r && nt(), K.follow(function() {
						var e;
						(n = c.call(t, t)) && (r ? (e = v.bind(null, null), n.then(e, e)) : "function" == typeof n.next && "function" == typeof n.throw && (n = Mn(n)));
					}, e));
					return (n && "function" == typeof n.then ? K.resolve(n).then(function(e) {
						return t.active ? e : w(new k.PrematureCommit("Transaction committed too early. See http://bit.ly/2kdckMn"));
					}) : e.then(function() {
						return n;
					})).then(function(e) {
						return s && t._resolve(), t._completion.then(function() {
							return e;
						});
					}).catch(function(e) {
						return t._reject(e), w(e);
					});
				});
			}.bind(null, this, r, o, a, n);
			return a ? a._promise(r, s, "lock") : P.trans ? at(P.transless, function() {
				return i._whenReady(s);
			}) : this._whenReady(s);
		}, D.prototype.table = function(e) {
			if (m(this._allTables, e)) return this._allTables[e];
			throw new k.InvalidTable("Table ".concat(e, " does not exist"));
		};
		var q = D;
		function D(e, t) {
			var i, r, a, n, o, u = this, s = (this._middlewares = {}, this.verno = 0, D.dependencies), s = (this._options = t = _({
				addons: D.addons,
				autoOpen: !0,
				indexedDB: s.indexedDB,
				IDBKeyRange: s.IDBKeyRange,
				cache: "cloned"
			}, t), this._deps = {
				indexedDB: t.indexedDB,
				IDBKeyRange: t.IDBKeyRange
			}, t.addons), c = (this._dbSchema = {}, this._versions = [], this._storeNames = [], this._allTables = {}, this.idbdb = null, this._novip = this, {
				dbOpenError: null,
				isBeingOpened: !1,
				onReadyBeingFired: null,
				openComplete: !1,
				dbReadyResolve: g,
				dbReadyPromise: null,
				cancelOpen: g,
				openCanceller: null,
				autoSchema: !0,
				PR1398_maxLoop: 3,
				autoOpen: t.autoOpen
			}), l = (c.dbReadyPromise = new K(function(e) {
				c.dbReadyResolve = e;
			}), c.openCanceller = new K(function(e, t) {
				c.cancelOpen = t;
			}), this._state = c, this.name = e, this.on = Kt(this, "populate", "blocked", "versionchange", "close", { ready: [ke, g] }), this.once = function(n, r) {
				var o = function() {
					for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
					u.on(n).unsubscribe(o), r.apply(u, e);
				};
				return u.on(n, o);
			}, this.on.ready.subscribe = Y(this.on.ready.subscribe, function(o) {
				return function(n, r) {
					D.vip(function() {
						var t, e = u._state;
						e.openComplete ? (e.dbOpenError || K.resolve().then(n), r && o(n)) : e.onReadyBeingFired ? (e.onReadyBeingFired.push(n), r && o(n)) : (o(n), t = u, r || o(function e() {
							t.on.ready.unsubscribe(n), t.on.ready.unsubscribe(e);
						}));
					});
				};
			}), this.Collection = (i = this, Et(Dt.prototype, function(e, t) {
				this.db = i;
				var n = vt, r = null;
				if (t) try {
					n = t();
				} catch (e) {
					r = e;
				}
				var t = e._ctx, e = t.table, o = e.hook.reading.fire;
				this._ctx = {
					table: e,
					index: t.index,
					isPrimKey: !t.index || e.schema.primKey.keyPath && t.index === e.schema.primKey.name,
					range: n,
					keysOnly: !1,
					dir: "next",
					unique: "",
					algorithm: null,
					filter: null,
					replayFilter: null,
					justLimit: !0,
					isMatch: null,
					offset: 0,
					limit: Infinity,
					error: r,
					or: t.or,
					valueMapper: o !== ve ? o : null
				};
			})), this.Table = (r = this, Et(Pt.prototype, function(e, t, n) {
				this.db = r, this._tx = n, this.name = e, this.schema = t, this.hook = r._allTables[e] ? r._allTables[e].hook : Kt(null, {
					creating: [ge, g],
					reading: [me, ve],
					updating: [_e, g],
					deleting: [we, g]
				});
			})), this.Transaction = (a = this, Et($t.prototype, function(e, t, n, r, o) {
				var i = this;
				"readonly" !== e && t.forEach(function(e) {
					e = null == (e = n[e]) ? void 0 : e.yProps;
					e && (t = t.concat(e.map(function(e) {
						return e.updatesTable;
					})));
				}), this.db = a, this.mode = e, this.storeNames = t, this.schema = n, this.chromeTransactionDurability = r, this.idbtrans = null, this.on = Kt(this, "complete", "error", "abort"), this.parent = o || null, this.active = !0, this._reculock = 0, this._blockedFuncs = [], this._resolve = null, this._reject = null, this._waitingFor = null, this._waitingQueue = null, this._spinCount = 0, this._completion = new K(function(e, t) {
					i._resolve = e, i._reject = t;
				}), this._completion.then(function() {
					i.active = !1, i.on.complete.fire();
				}, function(e) {
					var t = i.active;
					return i.active = !1, i.on.error.fire(e), i.parent ? i.parent._reject(e) : t && i.idbtrans && i.idbtrans.abort(), w(e);
				});
			})), this.Version = (n = this, Et(bn.prototype, function(e) {
				this.db = n, this._cfg = {
					version: e,
					storesSource: null,
					dbschema: {},
					tables: {},
					contentUpgrade: null
				};
			})), this.WhereClause = (o = this, Et(Ut.prototype, function(e, t, n) {
				if (this.db = o, this._ctx = {
					table: e,
					index: ":id" === t ? null : t,
					or: n
				}, this._cmp = this._ascending = j, this._descending = function(e, t) {
					return j(t, e);
				}, this._max = function(e, t) {
					return 0 < j(e, t) ? e : t;
				}, this._min = function(e, t) {
					return j(e, t) < 0 ? e : t;
				}, this._IDBKeyRange = o._deps.IDBKeyRange, !this._IDBKeyRange) throw new k.MissingAPI();
			})), this.on("versionchange", function(e) {
				0 < e.newVersion ? console.warn("Another connection wants to upgrade database '".concat(u.name, "'. Closing db now to resume the upgrade.")) : console.warn("Another connection wants to delete database '".concat(u.name, "'. Closing db now to resume the delete request.")), u.close({ disableAutoOpen: !1 });
			}), this.on("blocked", function(e) {
				!e.newVersion || e.newVersion < e.oldVersion ? console.warn("Dexie.delete('".concat(u.name, "') was blocked")) : console.warn("Upgrade '".concat(u.name, "' blocked by other connection holding version ").concat(e.oldVersion / 10));
			}), this._maxKey = Ht(t.IDBKeyRange), this._createTransaction = function(e, t, n, r) {
				return new u.Transaction(e, t, n, u._options.chromeTransactionDurability, r);
			}, this._fireOnBlocked = function(t) {
				u.on("blocked").fire(t), ft.filter(function(e) {
					return e.name === u.name && e !== u && !e._state.vcFired;
				}).map(function(e) {
					return e.on("versionchange").fire(t);
				});
			}, this.use(Yn), this.use(nr), this.use(Gn), this.use(Ln), this.use(zn), new Proxy(this, { get: function(e, t, n) {
				var r;
				return "_vip" === t || ("table" === t ? function(e) {
					return rr(u.table(e), l);
				} : (r = Reflect.get(e, t, n)) instanceof Pt ? rr(r, l) : "tables" === t ? r.map(function(e) {
					return rr(e, l);
				}) : "_createTransaction" === t ? function() {
					return rr(r.apply(this, arguments), l);
				} : r);
			} }));
			this.vip = l, s.forEach(function(e) {
				return e(u);
			});
		}
		var or, Se = "undefined" != typeof Symbol && "observable" in Symbol ? Symbol.observable : "@@observable", ir = (ar.prototype.subscribe = function(e, t, n) {
			return this._subscribe(e && "function" != typeof e ? e : {
				next: e,
				error: t,
				complete: n
			});
		}, ar.prototype[Se] = function() {
			return this;
		}, ar);
		function ar(e) {
			this._subscribe = e;
		}
		try {
			or = {
				indexedDB: f.indexedDB || f.mozIndexedDB || f.webkitIndexedDB || f.msIndexedDB,
				IDBKeyRange: f.IDBKeyRange || f.webkitIDBKeyRange
			};
		} catch (e) {
			or = {
				indexedDB: null,
				IDBKeyRange: null
			};
		}
		function ur(h) {
			var d, p = !1, e = new ir(function(r) {
				var o = ue(h);
				var i, a = !1, u = {}, s = {}, e = {
					get closed() {
						return a;
					},
					unsubscribe: function() {
						a || (a = !0, i && i.abort(), c && Yt.storagemutated.unsubscribe(f));
					}
				}, c = (r.start && r.start(e), !1), l = function() {
					return st(t);
				};
				var f = function(e) {
					An(u, e), Cn(s, u) && l();
				}, t = function() {
					var t, n, e;
					!a && or.indexedDB && (u = {}, t = {}, i && i.abort(), i = new AbortController(), e = ((e) => {
						var t = $e();
						try {
							o && nt();
							var n = y(h, e);
							return n = o ? n.finally(v) : n;
						} finally {
							t && Qe();
						}
					})(n = {
						subscr: t,
						signal: i.signal,
						requery: l,
						querier: h,
						trans: null
					}), Promise.resolve(e).then(function(e) {
						p = !0, d = e, a || n.signal.aborted || (u = {}, ((e) => {
							for (var t in e) if (m(e, t)) return;
							return 1;
						})(s = t) || c || (Yt(zt, f), c = !0), st(function() {
							return !a && r.next && r.next(e);
						}));
					}, function(e) {
						p = !1, ["DatabaseClosedError", "AbortError"].includes(null == e ? void 0 : e.name) || a || st(function() {
							a || r.error && r.error(e);
						});
					}));
				};
				return setTimeout(l, 0), e;
			});
			return e.hasValue = function() {
				return p;
			}, e.getValue = function() {
				return d;
			}, e;
		}
		var sr = q;
		function cr(e) {
			var t = fr;
			try {
				fr = !0, Yt.storagemutated.fire(e), Bn(e, !0);
			} finally {
				fr = t;
			}
		}
		N(sr, _(_({}, e), {
			delete: function(e) {
				return new sr(e, { addons: [] }).delete();
			},
			exists: function(e) {
				return new sr(e, { addons: [] }).open().then(function(e) {
					return e.close(), !0;
				}).catch("NoSuchDatabaseError", function() {
					return !1;
				});
			},
			getDatabaseNames: function(e) {
				try {
					return t = sr.dependencies, n = t.indexedDB, t = t.IDBKeyRange, (_n(n) ? Promise.resolve(n.databases()).then(function(e) {
						return e.map(function(e) {
							return e.name;
						}).filter(function(e) {
							return e !== ht;
						});
					}) : wn(n, t).toCollection().primaryKeys()).then(e);
				} catch (e) {
					return w(new k.MissingAPI());
				}
				var t, n;
			},
			defineClass: function() {
				return function(e) {
					a(this, e);
				};
			},
			ignoreTransaction: function(e) {
				return P.trans ? at(P.transless, e) : e();
			},
			vip: xn,
			async: function(t) {
				return function() {
					try {
						var e = Mn(t.apply(this, arguments));
						return e && "function" == typeof e.then ? e : K.resolve(e);
					} catch (e) {
						return w(e);
					}
				};
			},
			spawn: function(e, t, n) {
				try {
					var r = Mn(e.apply(n, t || []));
					return r && "function" == typeof r.then ? r : K.resolve(r);
				} catch (e) {
					return w(e);
				}
			},
			currentTransaction: { get: function() {
				return P.trans || null;
			} },
			waitFor: function(e, t) {
				e = K.resolve("function" == typeof e ? sr.ignoreTransaction(e) : e).timeout(t || 6e4);
				return P.trans ? P.trans.waitFor(e) : e;
			},
			Promise: K,
			debug: {
				get: function() {
					return l;
				},
				set: function(e) {
					Oe(e);
				}
			},
			derive: U,
			extend: a,
			props: N,
			override: Y,
			Events: Kt,
			on: Yt,
			liveQuery: ur,
			extendObservabilitySet: An,
			getByKeyPath: c,
			setByKeyPath: b,
			delByKeyPath: function(t, e) {
				"string" == typeof e ? b(t, e, void 0) : "length" in e && [].map.call(e, function(e) {
					b(t, e, void 0);
				});
			},
			shallowClone: G,
			deepClone: ee,
			getObjectDiff: Un,
			cmp: j,
			asap: Q,
			minKey: -Infinity,
			addons: [],
			connections: ft,
			errnames: de,
			dependencies: or,
			cache: Tn,
			semVer: "4.3.0",
			version: "4.3.0".split(".").map(function(e) {
				return parseInt(e);
			}).reduce(function(e, t, n) {
				return e + t / Math.pow(10, 2 * n);
			})
		})), sr.maxKey = Ht(sr.dependencies.IDBKeyRange), "undefined" != typeof dispatchEvent && "undefined" != typeof addEventListener && (Yt(zt, function(e) {
			fr || (e = new CustomEvent(Wt, { detail: e }), fr = !0, dispatchEvent(e), fr = !1);
		}), addEventListener(Wt, function(e) {
			e = e.detail;
			fr || cr(e);
		}));
		var lr, fr = !1, hr = function() {};
		return "undefined" != typeof BroadcastChannel && ((hr = function() {
			(lr = new BroadcastChannel(Wt)).onmessage = function(e) {
				return e.data && cr(e.data);
			};
		})(), "function" == typeof lr.unref && lr.unref(), Yt(zt, function(e) {
			fr || lr.postMessage(e);
		})), "undefined" != typeof addEventListener && (addEventListener("pagehide", function(e) {
			if (!q.disableBfCache && e.persisted) {
				l && console.debug("Dexie: handling persisted pagehide"), lr?.close();
				for (var t = 0, n = ft; t < n.length; t++) n[t].close({ disableAutoOpen: !1 });
			}
		}), addEventListener("pageshow", function(e) {
			!q.disableBfCache && e.persisted && (l && console.debug("Dexie: handling persisted pageshow"), hr(), cr({ all: new I(-Infinity, [[]]) }));
		})), K.rejectionMapper = function(e, t) {
			return !e || e instanceof ce || e instanceof TypeError || e instanceof SyntaxError || !e.name || !ye[e.name] ? e : (t = new ye[e.name](t || e.message, e), "stack" in e && u(t, "stack", { get: function() {
				return this.inner.stack;
			} }), t);
		}, Oe(l), _(q, Object.freeze({
			__proto__: null,
			Dexie: q,
			Entity: bt,
			PropModification: xt,
			RangeSet: I,
			add: function(e) {
				return new xt({ add: e });
			},
			cmp: j,
			default: q,
			liveQuery: ur,
			mergeRanges: Pn,
			rangesOverlap: Kn,
			remove: function(e) {
				return new xt({ remove: e });
			},
			replacePrefix: function(e, t) {
				return new xt({ replacePrefix: [e, t] });
			}
		}), { default: q }), q;
	});
}));
//#endregion
//#region node_modules/dexie/import-wrapper-prod.mjs
var import_client = /* @__PURE__ */ __toESM(require_client(), 1);
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_browser_polyfill = /* @__PURE__ */ __toESM(require_browser_polyfill(), 1);
var import_dexie_min = /* @__PURE__ */ __toESM(require_dexie_min(), 1);
var DexieSymbol = Symbol.for("Dexie");
var Dexie = globalThis[DexieSymbol] || (globalThis[DexieSymbol] = import_dexie_min.default);
if (import_dexie_min.default.semVer !== Dexie.semVer) throw new Error(`Two different versions of Dexie loaded in the same app: ${import_dexie_min.default.semVer} and ${Dexie.semVer}`);
var { liveQuery, mergeRanges, rangesOverlap, RangeSet, cmp, Entity, PropModification, replacePrefix, add, remove, DexieYProvider } = Dexie;
//#endregion
//#region __vite-browser-external
var require___vite_browser_external = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {};
}));
//#endregion
//#region node_modules/crypto-js/core.js
var require_core = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(root, factory) {
		if (typeof exports === "object") module.exports = exports = factory();
		else if (typeof define === "function" && define.amd) define([], factory);
		else root.CryptoJS = factory();
	})(exports, function() {
		/**
		* CryptoJS core components.
		*/
		var CryptoJS = CryptoJS || function(Math, undefined) {
			var crypto;
			if (typeof window !== "undefined" && window.crypto) crypto = window.crypto;
			if (typeof self !== "undefined" && self.crypto) crypto = self.crypto;
			if (typeof globalThis !== "undefined" && globalThis.crypto) crypto = globalThis.crypto;
			if (!crypto && typeof window !== "undefined" && window.msCrypto) crypto = window.msCrypto;
			if (!crypto && typeof global !== "undefined" && global.crypto) crypto = global.crypto;
			if (!crypto && typeof __require === "function") try {
				crypto = require___vite_browser_external();
			} catch (err) {}
			var cryptoSecureRandomInt = function() {
				if (crypto) {
					if (typeof crypto.getRandomValues === "function") try {
						return crypto.getRandomValues(new Uint32Array(1))[0];
					} catch (err) {}
					if (typeof crypto.randomBytes === "function") try {
						return crypto.randomBytes(4).readInt32LE();
					} catch (err) {}
				}
				throw new Error("Native crypto module could not be used to get secure random number.");
			};
			var create = Object.create || function() {
				function F() {}
				return function(obj) {
					var subtype;
					F.prototype = obj;
					subtype = new F();
					F.prototype = null;
					return subtype;
				};
			}();
			/**
			* CryptoJS namespace.
			*/
			var C = {};
			/**
			* Library namespace.
			*/
			var C_lib = C.lib = {};
			/**
			* Base object for prototypal inheritance.
			*/
			var Base = C_lib.Base = function() {
				return {
					extend: function(overrides) {
						var subtype = create(this);
						if (overrides) subtype.mixIn(overrides);
						if (!subtype.hasOwnProperty("init") || this.init === subtype.init) subtype.init = function() {
							subtype.$super.init.apply(this, arguments);
						};
						subtype.init.prototype = subtype;
						subtype.$super = this;
						return subtype;
					},
					create: function() {
						var instance = this.extend();
						instance.init.apply(instance, arguments);
						return instance;
					},
					init: function() {},
					mixIn: function(properties) {
						for (var propertyName in properties) if (properties.hasOwnProperty(propertyName)) this[propertyName] = properties[propertyName];
						if (properties.hasOwnProperty("toString")) this.toString = properties.toString;
					},
					clone: function() {
						return this.init.prototype.extend(this);
					}
				};
			}();
			/**
			* An array of 32-bit words.
			*
			* @property {Array} words The array of 32-bit words.
			* @property {number} sigBytes The number of significant bytes in this word array.
			*/
			var WordArray = C_lib.WordArray = Base.extend({
				init: function(words, sigBytes) {
					words = this.words = words || [];
					if (sigBytes != undefined) this.sigBytes = sigBytes;
					else this.sigBytes = words.length * 4;
				},
				toString: function(encoder) {
					return (encoder || Hex).stringify(this);
				},
				concat: function(wordArray) {
					var thisWords = this.words;
					var thatWords = wordArray.words;
					var thisSigBytes = this.sigBytes;
					var thatSigBytes = wordArray.sigBytes;
					this.clamp();
					if (thisSigBytes % 4) for (var i = 0; i < thatSigBytes; i++) {
						var thatByte = thatWords[i >>> 2] >>> 24 - i % 4 * 8 & 255;
						thisWords[thisSigBytes + i >>> 2] |= thatByte << 24 - (thisSigBytes + i) % 4 * 8;
					}
					else for (var j = 0; j < thatSigBytes; j += 4) thisWords[thisSigBytes + j >>> 2] = thatWords[j >>> 2];
					this.sigBytes += thatSigBytes;
					return this;
				},
				clamp: function() {
					var words = this.words;
					var sigBytes = this.sigBytes;
					words[sigBytes >>> 2] &= 4294967295 << 32 - sigBytes % 4 * 8;
					words.length = Math.ceil(sigBytes / 4);
				},
				clone: function() {
					var clone = Base.clone.call(this);
					clone.words = this.words.slice(0);
					return clone;
				},
				random: function(nBytes) {
					var words = [];
					for (var i = 0; i < nBytes; i += 4) words.push(cryptoSecureRandomInt());
					return new WordArray.init(words, nBytes);
				}
			});
			/**
			* Encoder namespace.
			*/
			var C_enc = C.enc = {};
			/**
			* Hex encoding strategy.
			*/
			var Hex = C_enc.Hex = {
				stringify: function(wordArray) {
					var words = wordArray.words;
					var sigBytes = wordArray.sigBytes;
					var hexChars = [];
					for (var i = 0; i < sigBytes; i++) {
						var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
						hexChars.push((bite >>> 4).toString(16));
						hexChars.push((bite & 15).toString(16));
					}
					return hexChars.join("");
				},
				parse: function(hexStr) {
					var hexStrLength = hexStr.length;
					var words = [];
					for (var i = 0; i < hexStrLength; i += 2) words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << 24 - i % 8 * 4;
					return new WordArray.init(words, hexStrLength / 2);
				}
			};
			/**
			* Latin1 encoding strategy.
			*/
			var Latin1 = C_enc.Latin1 = {
				stringify: function(wordArray) {
					var words = wordArray.words;
					var sigBytes = wordArray.sigBytes;
					var latin1Chars = [];
					for (var i = 0; i < sigBytes; i++) {
						var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
						latin1Chars.push(String.fromCharCode(bite));
					}
					return latin1Chars.join("");
				},
				parse: function(latin1Str) {
					var latin1StrLength = latin1Str.length;
					var words = [];
					for (var i = 0; i < latin1StrLength; i++) words[i >>> 2] |= (latin1Str.charCodeAt(i) & 255) << 24 - i % 4 * 8;
					return new WordArray.init(words, latin1StrLength);
				}
			};
			/**
			* UTF-8 encoding strategy.
			*/
			var Utf8 = C_enc.Utf8 = {
				stringify: function(wordArray) {
					try {
						return decodeURIComponent(escape(Latin1.stringify(wordArray)));
					} catch (e) {
						throw new Error("Malformed UTF-8 data");
					}
				},
				parse: function(utf8Str) {
					return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
				}
			};
			/**
			* Abstract buffered block algorithm template.
			*
			* The property blockSize must be implemented in a concrete subtype.
			*
			* @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
			*/
			var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
				reset: function() {
					this._data = new WordArray.init();
					this._nDataBytes = 0;
				},
				_append: function(data) {
					if (typeof data == "string") data = Utf8.parse(data);
					this._data.concat(data);
					this._nDataBytes += data.sigBytes;
				},
				_process: function(doFlush) {
					var processedWords;
					var data = this._data;
					var dataWords = data.words;
					var dataSigBytes = data.sigBytes;
					var blockSize = this.blockSize;
					var nBlocksReady = dataSigBytes / (blockSize * 4);
					if (doFlush) nBlocksReady = Math.ceil(nBlocksReady);
					else nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
					var nWordsReady = nBlocksReady * blockSize;
					var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);
					if (nWordsReady) {
						for (var offset = 0; offset < nWordsReady; offset += blockSize) this._doProcessBlock(dataWords, offset);
						processedWords = dataWords.splice(0, nWordsReady);
						data.sigBytes -= nBytesReady;
					}
					return new WordArray.init(processedWords, nBytesReady);
				},
				clone: function() {
					var clone = Base.clone.call(this);
					clone._data = this._data.clone();
					return clone;
				},
				_minBufferSize: 0
			});
			C_lib.Hasher = BufferedBlockAlgorithm.extend({
				cfg: Base.extend(),
				init: function(cfg) {
					this.cfg = this.cfg.extend(cfg);
					this.reset();
				},
				reset: function() {
					BufferedBlockAlgorithm.reset.call(this);
					this._doReset();
				},
				update: function(messageUpdate) {
					this._append(messageUpdate);
					this._process();
					return this;
				},
				finalize: function(messageUpdate) {
					if (messageUpdate) this._append(messageUpdate);
					return this._doFinalize();
				},
				blockSize: 512 / 32,
				_createHelper: function(hasher) {
					return function(message, cfg) {
						return new hasher.init(cfg).finalize(message);
					};
				},
				_createHmacHelper: function(hasher) {
					return function(message, key) {
						return new C_algo.HMAC.init(hasher, key).finalize(message);
					};
				}
			});
			/**
			* Algorithm namespace.
			*/
			var C_algo = C.algo = {};
			return C;
		}(Math);
		return CryptoJS;
	});
}));
//#endregion
//#region node_modules/crypto-js/x64-core.js
var require_x64_core = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(root, factory) {
		if (typeof exports === "object") module.exports = exports = factory(require_core());
		else if (typeof define === "function" && define.amd) define(["./core"], factory);
		else factory(root.CryptoJS);
	})(exports, function(CryptoJS) {
		(function(undefined) {
			var C = CryptoJS;
			var C_lib = C.lib;
			var Base = C_lib.Base;
			var X32WordArray = C_lib.WordArray;
			/**
			* x64 namespace.
			*/
			var C_x64 = C.x64 = {};
			C_x64.Word = Base.extend({ init: function(high, low) {
				this.high = high;
				this.low = low;
			} });
			C_x64.WordArray = Base.extend({
				init: function(words, sigBytes) {
					words = this.words = words || [];
					if (sigBytes != undefined) this.sigBytes = sigBytes;
					else this.sigBytes = words.length * 8;
				},
				toX32: function() {
					var x64Words = this.words;
					var x64WordsLength = x64Words.length;
					var x32Words = [];
					for (var i = 0; i < x64WordsLength; i++) {
						var x64Word = x64Words[i];
						x32Words.push(x64Word.high);
						x32Words.push(x64Word.low);
					}
					return X32WordArray.create(x32Words, this.sigBytes);
				},
				clone: function() {
					var clone = Base.clone.call(this);
					var words = clone.words = this.words.slice(0);
					var wordsLength = words.length;
					for (var i = 0; i < wordsLength; i++) words[i] = words[i].clone();
					return clone;
				}
			});
		})();
		return CryptoJS;
	});
}));
//#endregion
//#region node_modules/crypto-js/lib-typedarrays.js
var require_lib_typedarrays = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(root, factory) {
		if (typeof exports === "object") module.exports = exports = factory(require_core());
		else if (typeof define === "function" && define.amd) define(["./core"], factory);
		else factory(root.CryptoJS);
	})(exports, function(CryptoJS) {
		(function() {
			if (typeof ArrayBuffer != "function") return;
			var WordArray = CryptoJS.lib.WordArray;
			var superInit = WordArray.init;
			var subInit = WordArray.init = function(typedArray) {
				if (typedArray instanceof ArrayBuffer) typedArray = new Uint8Array(typedArray);
				if (typedArray instanceof Int8Array || typeof Uint8ClampedArray !== "undefined" && typedArray instanceof Uint8ClampedArray || typedArray instanceof Int16Array || typedArray instanceof Uint16Array || typedArray instanceof Int32Array || typedArray instanceof Uint32Array || typedArray instanceof Float32Array || typedArray instanceof Float64Array) typedArray = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
				if (typedArray instanceof Uint8Array) {
					var typedArrayByteLength = typedArray.byteLength;
					var words = [];
					for (var i = 0; i < typedArrayByteLength; i++) words[i >>> 2] |= typedArray[i] << 24 - i % 4 * 8;
					superInit.call(this, words, typedArrayByteLength);
				} else superInit.apply(this, arguments);
			};
			subInit.prototype = WordArray;
		})();
		return CryptoJS.lib.WordArray;
	});
}));
//#endregion
//#region node_modules/crypto-js/enc-utf16.js
var require_enc_utf16 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(root, factory) {
		if (typeof exports === "object") module.exports = exports = factory(require_core());
		else if (typeof define === "function" && define.amd) define(["./core"], factory);
		else factory(root.CryptoJS);
	})(exports, function(CryptoJS) {
		(function() {
			var C = CryptoJS;
			var WordArray = C.lib.WordArray;
			var C_enc = C.enc;
			C_enc.Utf16 = C_enc.Utf16BE = {
				stringify: function(wordArray) {
					var words = wordArray.words;
					var sigBytes = wordArray.sigBytes;
					var utf16Chars = [];
					for (var i = 0; i < sigBytes; i += 2) {
						var codePoint = words[i >>> 2] >>> 16 - i % 4 * 8 & 65535;
						utf16Chars.push(String.fromCharCode(codePoint));
					}
					return utf16Chars.join("");
				},
				parse: function(utf16Str) {
					var utf16StrLength = utf16Str.length;
					var words = [];
					for (var i = 0; i < utf16StrLength; i++) words[i >>> 1] |= utf16Str.charCodeAt(i) << 16 - i % 2 * 16;
					return WordArray.create(words, utf16StrLength * 2);
				}
			};
			/**
			* UTF-16 LE encoding strategy.
			*/
			C_enc.Utf16LE = {
				stringify: function(wordArray) {
					var words = wordArray.words;
					var sigBytes = wordArray.sigBytes;
					var utf16Chars = [];
					for (var i = 0; i < sigBytes; i += 2) {
						var codePoint = swapEndian(words[i >>> 2] >>> 16 - i % 4 * 8 & 65535);
						utf16Chars.push(String.fromCharCode(codePoint));
					}
					return utf16Chars.join("");
				},
				parse: function(utf16Str) {
					var utf16StrLength = utf16Str.length;
					var words = [];
					for (var i = 0; i < utf16StrLength; i++) words[i >>> 1] |= swapEndian(utf16Str.charCodeAt(i) << 16 - i % 2 * 16);
					return WordArray.create(words, utf16StrLength * 2);
				}
			};
			function swapEndian(word) {
				return word << 8 & 4278255360 | word >>> 8 & 16711935;
			}
		})();
		return CryptoJS.enc.Utf16;
	});
}));
//#endregion
//#region node_modules/crypto-js/enc-base64.js
var require_enc_base64 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(root, factory) {
		if (typeof exports === "object") module.exports = exports = factory(require_core());
		else if (typeof define === "function" && define.amd) define(["./core"], factory);
		else factory(root.CryptoJS);
	})(exports, function(CryptoJS) {
		(function() {
			var C = CryptoJS;
			var WordArray = C.lib.WordArray;
			var C_enc = C.enc;
			C_enc.Base64 = {
				stringify: function(wordArray) {
					var words = wordArray.words;
					var sigBytes = wordArray.sigBytes;
					var map = this._map;
					wordArray.clamp();
					var base64Chars = [];
					for (var i = 0; i < sigBytes; i += 3) {
						var byte1 = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
						var byte2 = words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
						var byte3 = words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
						var triplet = byte1 << 16 | byte2 << 8 | byte3;
						for (var j = 0; j < 4 && i + j * .75 < sigBytes; j++) base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 63));
					}
					var paddingChar = map.charAt(64);
					if (paddingChar) while (base64Chars.length % 4) base64Chars.push(paddingChar);
					return base64Chars.join("");
				},
				parse: function(base64Str) {
					var base64StrLength = base64Str.length;
					var map = this._map;
					var reverseMap = this._reverseMap;
					if (!reverseMap) {
						reverseMap = this._reverseMap = [];
						for (var j = 0; j < map.length; j++) reverseMap[map.charCodeAt(j)] = j;
					}
					var paddingChar = map.charAt(64);
					if (paddingChar) {
						var paddingIndex = base64Str.indexOf(paddingChar);
						if (paddingIndex !== -1) base64StrLength = paddingIndex;
					}
					return parseLoop(base64Str, base64StrLength, reverseMap);
				},
				_map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
			};
			function parseLoop(base64Str, base64StrLength, reverseMap) {
				var words = [];
				var nBytes = 0;
				for (var i = 0; i < base64StrLength; i++) if (i % 4) {
					var bitsCombined = reverseMap[base64Str.charCodeAt(i - 1)] << i % 4 * 2 | reverseMap[base64Str.charCodeAt(i)] >>> 6 - i % 4 * 2;
					words[nBytes >>> 2] |= bitsCombined << 24 - nBytes % 4 * 8;
					nBytes++;
				}
				return WordArray.create(words, nBytes);
			}
		})();
		return CryptoJS.enc.Base64;
	});
}));
//#endregion
//#region node_modules/crypto-js/enc-base64url.js
var require_enc_base64url = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(root, factory) {
		if (typeof exports === "object") module.exports = exports = factory(require_core());
		else if (typeof define === "function" && define.amd) define(["./core"], factory);
		else factory(root.CryptoJS);
	})(exports, function(CryptoJS) {
		(function() {
			var C = CryptoJS;
			var WordArray = C.lib.WordArray;
			var C_enc = C.enc;
			C_enc.Base64url = {
				stringify: function(wordArray, urlSafe) {
					if (urlSafe === void 0) urlSafe = true;
					var words = wordArray.words;
					var sigBytes = wordArray.sigBytes;
					var map = urlSafe ? this._safe_map : this._map;
					wordArray.clamp();
					var base64Chars = [];
					for (var i = 0; i < sigBytes; i += 3) {
						var byte1 = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
						var byte2 = words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
						var byte3 = words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
						var triplet = byte1 << 16 | byte2 << 8 | byte3;
						for (var j = 0; j < 4 && i + j * .75 < sigBytes; j++) base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 63));
					}
					var paddingChar = map.charAt(64);
					if (paddingChar) while (base64Chars.length % 4) base64Chars.push(paddingChar);
					return base64Chars.join("");
				},
				parse: function(base64Str, urlSafe) {
					if (urlSafe === void 0) urlSafe = true;
					var base64StrLength = base64Str.length;
					var map = urlSafe ? this._safe_map : this._map;
					var reverseMap = this._reverseMap;
					if (!reverseMap) {
						reverseMap = this._reverseMap = [];
						for (var j = 0; j < map.length; j++) reverseMap[map.charCodeAt(j)] = j;
					}
					var paddingChar = map.charAt(64);
					if (paddingChar) {
						var paddingIndex = base64Str.indexOf(paddingChar);
						if (paddingIndex !== -1) base64StrLength = paddingIndex;
					}
					return parseLoop(base64Str, base64StrLength, reverseMap);
				},
				_map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
				_safe_map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"
			};
			function parseLoop(base64Str, base64StrLength, reverseMap) {
				var words = [];
				var nBytes = 0;
				for (var i = 0; i < base64StrLength; i++) if (i % 4) {
					var bitsCombined = reverseMap[base64Str.charCodeAt(i - 1)] << i % 4 * 2 | reverseMap[base64Str.charCodeAt(i)] >>> 6 - i % 4 * 2;
					words[nBytes >>> 2] |= bitsCombined << 24 - nBytes % 4 * 8;
					nBytes++;
				}
				return WordArray.create(words, nBytes);
			}
		})();
		return CryptoJS.enc.Base64url;
	});
}));
//#endregion
//#region node_modules/crypto-js/md5.js
var require_md5 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(root, factory) {
		if (typeof exports === "object") module.exports = exports = factory(require_core());
		else if (typeof define === "function" && define.amd) define(["./core"], factory);
		else factory(root.CryptoJS);
	})(exports, function(CryptoJS) {
		(function(Math) {
			var C = CryptoJS;
			var C_lib = C.lib;
			var WordArray = C_lib.WordArray;
			var Hasher = C_lib.Hasher;
			var C_algo = C.algo;
			var T = [];
			(function() {
				for (var i = 0; i < 64; i++) T[i] = Math.abs(Math.sin(i + 1)) * 4294967296 | 0;
			})();
			/**
			* MD5 hash algorithm.
			*/
			var MD5 = C_algo.MD5 = Hasher.extend({
				_doReset: function() {
					this._hash = new WordArray.init([
						1732584193,
						4023233417,
						2562383102,
						271733878
					]);
				},
				_doProcessBlock: function(M, offset) {
					for (var i = 0; i < 16; i++) {
						var offset_i = offset + i;
						var M_offset_i = M[offset_i];
						M[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 16711935 | (M_offset_i << 24 | M_offset_i >>> 8) & 4278255360;
					}
					var H = this._hash.words;
					var M_offset_0 = M[offset + 0];
					var M_offset_1 = M[offset + 1];
					var M_offset_2 = M[offset + 2];
					var M_offset_3 = M[offset + 3];
					var M_offset_4 = M[offset + 4];
					var M_offset_5 = M[offset + 5];
					var M_offset_6 = M[offset + 6];
					var M_offset_7 = M[offset + 7];
					var M_offset_8 = M[offset + 8];
					var M_offset_9 = M[offset + 9];
					var M_offset_10 = M[offset + 10];
					var M_offset_11 = M[offset + 11];
					var M_offset_12 = M[offset + 12];
					var M_offset_13 = M[offset + 13];
					var M_offset_14 = M[offset + 14];
					var M_offset_15 = M[offset + 15];
					var a = H[0];
					var b = H[1];
					var c = H[2];
					var d = H[3];
					a = FF(a, b, c, d, M_offset_0, 7, T[0]);
					d = FF(d, a, b, c, M_offset_1, 12, T[1]);
					c = FF(c, d, a, b, M_offset_2, 17, T[2]);
					b = FF(b, c, d, a, M_offset_3, 22, T[3]);
					a = FF(a, b, c, d, M_offset_4, 7, T[4]);
					d = FF(d, a, b, c, M_offset_5, 12, T[5]);
					c = FF(c, d, a, b, M_offset_6, 17, T[6]);
					b = FF(b, c, d, a, M_offset_7, 22, T[7]);
					a = FF(a, b, c, d, M_offset_8, 7, T[8]);
					d = FF(d, a, b, c, M_offset_9, 12, T[9]);
					c = FF(c, d, a, b, M_offset_10, 17, T[10]);
					b = FF(b, c, d, a, M_offset_11, 22, T[11]);
					a = FF(a, b, c, d, M_offset_12, 7, T[12]);
					d = FF(d, a, b, c, M_offset_13, 12, T[13]);
					c = FF(c, d, a, b, M_offset_14, 17, T[14]);
					b = FF(b, c, d, a, M_offset_15, 22, T[15]);
					a = GG(a, b, c, d, M_offset_1, 5, T[16]);
					d = GG(d, a, b, c, M_offset_6, 9, T[17]);
					c = GG(c, d, a, b, M_offset_11, 14, T[18]);
					b = GG(b, c, d, a, M_offset_0, 20, T[19]);
					a = GG(a, b, c, d, M_offset_5, 5, T[20]);
					d = GG(d, a, b, c, M_offset_10, 9, T[21]);
					c = GG(c, d, a, b, M_offset_15, 14, T[22]);
					b = GG(b, c, d, a, M_offset_4, 20, T[23]);
					a = GG(a, b, c, d, M_offset_9, 5, T[24]);
					d = GG(d, a, b, c, M_offset_14, 9, T[25]);
					c = GG(c, d, a, b, M_offset_3, 14, T[26]);
					b = GG(b, c, d, a, M_offset_8, 20, T[27]);
					a = GG(a, b, c, d, M_offset_13, 5, T[28]);
					d = GG(d, a, b, c, M_offset_2, 9, T[29]);
					c = GG(c, d, a, b, M_offset_7, 14, T[30]);
					b = GG(b, c, d, a, M_offset_12, 20, T[31]);
					a = HH(a, b, c, d, M_offset_5, 4, T[32]);
					d = HH(d, a, b, c, M_offset_8, 11, T[33]);
					c = HH(c, d, a, b, M_offset_11, 16, T[34]);
					b = HH(b, c, d, a, M_offset_14, 23, T[35]);
					a = HH(a, b, c, d, M_offset_1, 4, T[36]);
					d = HH(d, a, b, c, M_offset_4, 11, T[37]);
					c = HH(c, d, a, b, M_offset_7, 16, T[38]);
					b = HH(b, c, d, a, M_offset_10, 23, T[39]);
					a = HH(a, b, c, d, M_offset_13, 4, T[40]);
					d = HH(d, a, b, c, M_offset_0, 11, T[41]);
					c = HH(c, d, a, b, M_offset_3, 16, T[42]);
					b = HH(b, c, d, a, M_offset_6, 23, T[43]);
					a = HH(a, b, c, d, M_offset_9, 4, T[44]);
					d = HH(d, a, b, c, M_offset_12, 11, T[45]);
					c = HH(c, d, a, b, M_offset_15, 16, T[46]);
					b = HH(b, c, d, a, M_offset_2, 23, T[47]);
					a = II(a, b, c, d, M_offset_0, 6, T[48]);
					d = II(d, a, b, c, M_offset_7, 10, T[49]);
					c = II(c, d, a, b, M_offset_14, 15, T[50]);
					b = II(b, c, d, a, M_offset_5, 21, T[51]);
					a = II(a, b, c, d, M_offset_12, 6, T[52]);
					d = II(d, a, b, c, M_offset_3, 10, T[53]);
					c = II(c, d, a, b, M_offset_10, 15, T[54]);
					b = II(b, c, d, a, M_offset_1, 21, T[55]);
					a = II(a, b, c, d, M_offset_8, 6, T[56]);
					d = II(d, a, b, c, M_offset_15, 10, T[57]);
					c = II(c, d, a, b, M_offset_6, 15, T[58]);
					b = II(b, c, d, a, M_offset_13, 21, T[59]);
					a = II(a, b, c, d, M_offset_4, 6, T[60]);
					d = II(d, a, b, c, M_offset_11, 10, T[61]);
					c = II(c, d, a, b, M_offset_2, 15, T[62]);
					b = II(b, c, d, a, M_offset_9, 21, T[63]);
					H[0] = H[0] + a | 0;
					H[1] = H[1] + b | 0;
					H[2] = H[2] + c | 0;
					H[3] = H[3] + d | 0;
				},
				_doFinalize: function() {
					var data = this._data;
					var dataWords = data.words;
					var nBitsTotal = this._nDataBytes * 8;
					var nBitsLeft = data.sigBytes * 8;
					dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
					var nBitsTotalH = Math.floor(nBitsTotal / 4294967296);
					var nBitsTotalL = nBitsTotal;
					dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = (nBitsTotalH << 8 | nBitsTotalH >>> 24) & 16711935 | (nBitsTotalH << 24 | nBitsTotalH >>> 8) & 4278255360;
					dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = (nBitsTotalL << 8 | nBitsTotalL >>> 24) & 16711935 | (nBitsTotalL << 24 | nBitsTotalL >>> 8) & 4278255360;
					data.sigBytes = (dataWords.length + 1) * 4;
					this._process();
					var hash = this._hash;
					var H = hash.words;
					for (var i = 0; i < 4; i++) {
						var H_i = H[i];
						H[i] = (H_i << 8 | H_i >>> 24) & 16711935 | (H_i << 24 | H_i >>> 8) & 4278255360;
					}
					return hash;
				},
				clone: function() {
					var clone = Hasher.clone.call(this);
					clone._hash = this._hash.clone();
					return clone;
				}
			});
			function FF(a, b, c, d, x, s, t) {
				var n = a + (b & c | ~b & d) + x + t;
				return (n << s | n >>> 32 - s) + b;
			}
			function GG(a, b, c, d, x, s, t) {
				var n = a + (b & d | c & ~d) + x + t;
				return (n << s | n >>> 32 - s) + b;
			}
			function HH(a, b, c, d, x, s, t) {
				var n = a + (b ^ c ^ d) + x + t;
				return (n << s | n >>> 32 - s) + b;
			}
			function II(a, b, c, d, x, s, t) {
				var n = a + (c ^ (b | ~d)) + x + t;
				return (n << s | n >>> 32 - s) + b;
			}
			/**
			* Shortcut function to the hasher's object interface.
			*
			* @param {WordArray|string} message The message to hash.
			*
			* @return {WordArray} The hash.
			*
			* @static
			*
			* @example
			*
			*     var hash = CryptoJS.MD5('message');
			*     var hash = CryptoJS.MD5(wordArray);
			*/
			C.MD5 = Hasher._createHelper(MD5);
			/**
			* Shortcut function to the HMAC's object interface.
			*
			* @param {WordArray|string} message The message to hash.
			* @param {WordArray|string} key The secret key.
			*
			* @return {WordArray} The HMAC.
			*
			* @static
			*
			* @example
			*
			*     var hmac = CryptoJS.HmacMD5(message, key);
			*/
			C.HmacMD5 = Hasher._createHmacHelper(MD5);
		})(Math);
		return CryptoJS.MD5;
	});
}));
//#endregion
//#region node_modules/crypto-js/sha1.js
var require_sha1 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(root, factory) {
		if (typeof exports === "object") module.exports = exports = factory(require_core());
		else if (typeof define === "function" && define.amd) define(["./core"], factory);
		else factory(root.CryptoJS);
	})(exports, function(CryptoJS) {
		(function() {
			var C = CryptoJS;
			var C_lib = C.lib;
			var WordArray = C_lib.WordArray;
			var Hasher = C_lib.Hasher;
			var C_algo = C.algo;
			var W = [];
			/**
			* SHA-1 hash algorithm.
			*/
			var SHA1 = C_algo.SHA1 = Hasher.extend({
				_doReset: function() {
					this._hash = new WordArray.init([
						1732584193,
						4023233417,
						2562383102,
						271733878,
						3285377520
					]);
				},
				_doProcessBlock: function(M, offset) {
					var H = this._hash.words;
					var a = H[0];
					var b = H[1];
					var c = H[2];
					var d = H[3];
					var e = H[4];
					for (var i = 0; i < 80; i++) {
						if (i < 16) W[i] = M[offset + i] | 0;
						else {
							var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
							W[i] = n << 1 | n >>> 31;
						}
						var t = (a << 5 | a >>> 27) + e + W[i];
						if (i < 20) t += (b & c | ~b & d) + 1518500249;
						else if (i < 40) t += (b ^ c ^ d) + 1859775393;
						else if (i < 60) t += (b & c | b & d | c & d) - 1894007588;
						else t += (b ^ c ^ d) - 899497514;
						e = d;
						d = c;
						c = b << 30 | b >>> 2;
						b = a;
						a = t;
					}
					H[0] = H[0] + a | 0;
					H[1] = H[1] + b | 0;
					H[2] = H[2] + c | 0;
					H[3] = H[3] + d | 0;
					H[4] = H[4] + e | 0;
				},
				_doFinalize: function() {
					var data = this._data;
					var dataWords = data.words;
					var nBitsTotal = this._nDataBytes * 8;
					var nBitsLeft = data.sigBytes * 8;
					dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
					dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(nBitsTotal / 4294967296);
					dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
					data.sigBytes = dataWords.length * 4;
					this._process();
					return this._hash;
				},
				clone: function() {
					var clone = Hasher.clone.call(this);
					clone._hash = this._hash.clone();
					return clone;
				}
			});
			/**
			* Shortcut function to the hasher's object interface.
			*
			* @param {WordArray|string} message The message to hash.
			*
			* @return {WordArray} The hash.
			*
			* @static
			*
			* @example
			*
			*     var hash = CryptoJS.SHA1('message');
			*     var hash = CryptoJS.SHA1(wordArray);
			*/
			C.SHA1 = Hasher._createHelper(SHA1);
			/**
			* Shortcut function to the HMAC's object interface.
			*
			* @param {WordArray|string} message The message to hash.
			* @param {WordArray|string} key The secret key.
			*
			* @return {WordArray} The HMAC.
			*
			* @static
			*
			* @example
			*
			*     var hmac = CryptoJS.HmacSHA1(message, key);
			*/
			C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
		})();
		return CryptoJS.SHA1;
	});
}));
//#endregion
//#region node_modules/crypto-js/sha256.js
var require_sha256 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(root, factory) {
		if (typeof exports === "object") module.exports = exports = factory(require_core());
		else if (typeof define === "function" && define.amd) define(["./core"], factory);
		else factory(root.CryptoJS);
	})(exports, function(CryptoJS) {
		(function(Math) {
			var C = CryptoJS;
			var C_lib = C.lib;
			var WordArray = C_lib.WordArray;
			var Hasher = C_lib.Hasher;
			var C_algo = C.algo;
			var H = [];
			var K = [];
			(function() {
				function isPrime(n) {
					var sqrtN = Math.sqrt(n);
					for (var factor = 2; factor <= sqrtN; factor++) if (!(n % factor)) return false;
					return true;
				}
				function getFractionalBits(n) {
					return (n - (n | 0)) * 4294967296 | 0;
				}
				var n = 2;
				var nPrime = 0;
				while (nPrime < 64) {
					if (isPrime(n)) {
						if (nPrime < 8) H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
						K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));
						nPrime++;
					}
					n++;
				}
			})();
			var W = [];
			/**
			* SHA-256 hash algorithm.
			*/
			var SHA256 = C_algo.SHA256 = Hasher.extend({
				_doReset: function() {
					this._hash = new WordArray.init(H.slice(0));
				},
				_doProcessBlock: function(M, offset) {
					var H = this._hash.words;
					var a = H[0];
					var b = H[1];
					var c = H[2];
					var d = H[3];
					var e = H[4];
					var f = H[5];
					var g = H[6];
					var h = H[7];
					for (var i = 0; i < 64; i++) {
						if (i < 16) W[i] = M[offset + i] | 0;
						else {
							var gamma0x = W[i - 15];
							var gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
							var gamma1x = W[i - 2];
							var gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
							W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
						}
						var ch = e & f ^ ~e & g;
						var maj = a & b ^ a & c ^ b & c;
						var sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
						var sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
						var t1 = h + sigma1 + ch + K[i] + W[i];
						var t2 = sigma0 + maj;
						h = g;
						g = f;
						f = e;
						e = d + t1 | 0;
						d = c;
						c = b;
						b = a;
						a = t1 + t2 | 0;
					}
					H[0] = H[0] + a | 0;
					H[1] = H[1] + b | 0;
					H[2] = H[2] + c | 0;
					H[3] = H[3] + d | 0;
					H[4] = H[4] + e | 0;
					H[5] = H[5] + f | 0;
					H[6] = H[6] + g | 0;
					H[7] = H[7] + h | 0;
				},
				_doFinalize: function() {
					var data = this._data;
					var dataWords = data.words;
					var nBitsTotal = this._nDataBytes * 8;
					var nBitsLeft = data.sigBytes * 8;
					dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
					dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(nBitsTotal / 4294967296);
					dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
					data.sigBytes = dataWords.length * 4;
					this._process();
					return this._hash;
				},
				clone: function() {
					var clone = Hasher.clone.call(this);
					clone._hash = this._hash.clone();
					return clone;
				}
			});
			/**
			* Shortcut function to the hasher's object interface.
			*
			* @param {WordArray|string} message The message to hash.
			*
			* @return {WordArray} The hash.
			*
			* @static
			*
			* @example
			*
			*     var hash = CryptoJS.SHA256('message');
			*     var hash = CryptoJS.SHA256(wordArray);
			*/
			C.SHA256 = Hasher._createHelper(SHA256);
			/**
			* Shortcut function to the HMAC's object interface.
			*
			* @param {WordArray|string} message The message to hash.
			* @param {WordArray|string} key The secret key.
			*
			* @return {WordArray} The HMAC.
			*
			* @static
			*
			* @example
			*
			*     var hmac = CryptoJS.HmacSHA256(message, key);
			*/
			C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
		})(Math);
		return CryptoJS.SHA256;
	});
}));
//#endregion
//#region node_modules/crypto-js/sha224.js
var require_sha224 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(root, factory, undef) {
		if (typeof exports === "object") module.exports = exports = factory(require_core(), require_sha256());
		else if (typeof define === "function" && define.amd) define(["./core", "./sha256"], factory);
		else factory(root.CryptoJS);
	})(exports, function(CryptoJS) {
		(function() {
			var C = CryptoJS;
			var WordArray = C.lib.WordArray;
			var C_algo = C.algo;
			var SHA256 = C_algo.SHA256;
			/**
			* SHA-224 hash algorithm.
			*/
			var SHA224 = C_algo.SHA224 = SHA256.extend({
				_doReset: function() {
					this._hash = new WordArray.init([
						3238371032,
						914150663,
						812702999,
						4144912697,
						4290775857,
						1750603025,
						1694076839,
						3204075428
					]);
				},
				_doFinalize: function() {
					var hash = SHA256._doFinalize.call(this);
					hash.sigBytes -= 4;
					return hash;
				}
			});
			/**
			* Shortcut function to the hasher's object interface.
			*
			* @param {WordArray|string} message The message to hash.
			*
			* @return {WordArray} The hash.
			*
			* @static
			*
			* @example
			*
			*     var hash = CryptoJS.SHA224('message');
			*     var hash = CryptoJS.SHA224(wordArray);
			*/
			C.SHA224 = SHA256._createHelper(SHA224);
			/**
			* Shortcut function to the HMAC's object interface.
			*
			* @param {WordArray|string} message The message to hash.
			* @param {WordArray|string} key The secret key.
			*
			* @return {WordArray} The HMAC.
			*
			* @static
			*
			* @example
			*
			*     var hmac = CryptoJS.HmacSHA224(message, key);
			*/
			C.HmacSHA224 = SHA256._createHmacHelper(SHA224);
		})();
		return CryptoJS.SHA224;
	});
}));
//#endregion
//#region node_modules/crypto-js/sha512.js
var require_sha512 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(root, factory, undef) {
		if (typeof exports === "object") module.exports = exports = factory(require_core(), require_x64_core());
		else if (typeof define === "function" && define.amd) define(["./core", "./x64-core"], factory);
		else factory(root.CryptoJS);
	})(exports, function(CryptoJS) {
		(function() {
			var C = CryptoJS;
			var Hasher = C.lib.Hasher;
			var C_x64 = C.x64;
			var X64Word = C_x64.Word;
			var X64WordArray = C_x64.WordArray;
			var C_algo = C.algo;
			function X64Word_create() {
				return X64Word.create.apply(X64Word, arguments);
			}
			var K = [
				X64Word_create(1116352408, 3609767458),
				X64Word_create(1899447441, 602891725),
				X64Word_create(3049323471, 3964484399),
				X64Word_create(3921009573, 2173295548),
				X64Word_create(961987163, 4081628472),
				X64Word_create(1508970993, 3053834265),
				X64Word_create(2453635748, 2937671579),
				X64Word_create(2870763221, 3664609560),
				X64Word_create(3624381080, 2734883394),
				X64Word_create(310598401, 1164996542),
				X64Word_create(607225278, 1323610764),
				X64Word_create(1426881987, 3590304994),
				X64Word_create(1925078388, 4068182383),
				X64Word_create(2162078206, 991336113),
				X64Word_create(2614888103, 633803317),
				X64Word_create(3248222580, 3479774868),
				X64Word_create(3835390401, 2666613458),
				X64Word_create(4022224774, 944711139),
				X64Word_create(264347078, 2341262773),
				X64Word_create(604807628, 2007800933),
				X64Word_create(770255983, 1495990901),
				X64Word_create(1249150122, 1856431235),
				X64Word_create(1555081692, 3175218132),
				X64Word_create(1996064986, 2198950837),
				X64Word_create(2554220882, 3999719339),
				X64Word_create(2821834349, 766784016),
				X64Word_create(2952996808, 2566594879),
				X64Word_create(3210313671, 3203337956),
				X64Word_create(3336571891, 1034457026),
				X64Word_create(3584528711, 2466948901),
				X64Word_create(113926993, 3758326383),
				X64Word_create(338241895, 168717936),
				X64Word_create(666307205, 1188179964),
				X64Word_create(773529912, 1546045734),
				X64Word_create(1294757372, 1522805485),
				X64Word_create(1396182291, 2643833823),
				X64Word_create(1695183700, 2343527390),
				X64Word_create(1986661051, 1014477480),
				X64Word_create(2177026350, 1206759142),
				X64Word_create(2456956037, 344077627),
				X64Word_create(2730485921, 1290863460),
				X64Word_create(2820302411, 3158454273),
				X64Word_create(3259730800, 3505952657),
				X64Word_create(3345764771, 106217008),
				X64Word_create(3516065817, 3606008344),
				X64Word_create(3600352804, 1432725776),
				X64Word_create(4094571909, 1467031594),
				X64Word_create(275423344, 851169720),
				X64Word_create(430227734, 3100823752),
				X64Word_create(506948616, 1363258195),
				X64Word_create(659060556, 3750685593),
				X64Word_create(883997877, 3785050280),
				X64Word_create(958139571, 3318307427),
				X64Word_create(1322822218, 3812723403),
				X64Word_create(1537002063, 2003034995),
				X64Word_create(1747873779, 3602036899),
				X64Word_create(1955562222, 1575990012),
				X64Word_create(2024104815, 1125592928),
				X64Word_create(2227730452, 2716904306),
				X64Word_create(2361852424, 442776044),
				X64Word_create(2428436474, 593698344),
				X64Word_create(2756734187, 3733110249),
				X64Word_create(3204031479, 2999351573),
				X64Word_create(3329325298, 3815920427),
				X64Word_create(3391569614, 3928383900),
				X64Word_create(3515267271, 566280711),
				X64Word_create(3940187606, 3454069534),
				X64Word_create(4118630271, 4000239992),
				X64Word_create(116418474, 1914138554),
				X64Word_create(174292421, 2731055270),
				X64Word_create(289380356, 3203993006),
				X64Word_create(460393269, 320620315),
				X64Word_create(685471733, 587496836),
				X64Word_create(852142971, 1086792851),
				X64Word_create(1017036298, 365543100),
				X64Word_create(1126000580, 2618297676),
				X64Word_create(1288033470, 3409855158),
				X64Word_create(1501505948, 4234509866),
				X64Word_create(1607167915, 987167468),
				X64Word_create(1816402316, 1246189591)
			];
			var W = [];
			(function() {
				for (var i = 0; i < 80; i++) W[i] = X64Word_create();
			})();
			/**
			* SHA-512 hash algorithm.
			*/
			var SHA512 = C_algo.SHA512 = Hasher.extend({
				_doReset: function() {
					this._hash = new X64WordArray.init([
						new X64Word.init(1779033703, 4089235720),
						new X64Word.init(3144134277, 2227873595),
						new X64Word.init(1013904242, 4271175723),
						new X64Word.init(2773480762, 1595750129),
						new X64Word.init(1359893119, 2917565137),
						new X64Word.init(2600822924, 725511199),
						new X64Word.init(528734635, 4215389547),
						new X64Word.init(1541459225, 327033209)
					]);
				},
				_doProcessBlock: function(M, offset) {
					var H = this._hash.words;
					var H0 = H[0];
					var H1 = H[1];
					var H2 = H[2];
					var H3 = H[3];
					var H4 = H[4];
					var H5 = H[5];
					var H6 = H[6];
					var H7 = H[7];
					var H0h = H0.high;
					var H0l = H0.low;
					var H1h = H1.high;
					var H1l = H1.low;
					var H2h = H2.high;
					var H2l = H2.low;
					var H3h = H3.high;
					var H3l = H3.low;
					var H4h = H4.high;
					var H4l = H4.low;
					var H5h = H5.high;
					var H5l = H5.low;
					var H6h = H6.high;
					var H6l = H6.low;
					var H7h = H7.high;
					var H7l = H7.low;
					var ah = H0h;
					var al = H0l;
					var bh = H1h;
					var bl = H1l;
					var ch = H2h;
					var cl = H2l;
					var dh = H3h;
					var dl = H3l;
					var eh = H4h;
					var el = H4l;
					var fh = H5h;
					var fl = H5l;
					var gh = H6h;
					var gl = H6l;
					var hh = H7h;
					var hl = H7l;
					for (var i = 0; i < 80; i++) {
						var Wil;
						var Wih;
						var Wi = W[i];
						if (i < 16) {
							Wih = Wi.high = M[offset + i * 2] | 0;
							Wil = Wi.low = M[offset + i * 2 + 1] | 0;
						} else {
							var gamma0x = W[i - 15];
							var gamma0xh = gamma0x.high;
							var gamma0xl = gamma0x.low;
							var gamma0h = (gamma0xh >>> 1 | gamma0xl << 31) ^ (gamma0xh >>> 8 | gamma0xl << 24) ^ gamma0xh >>> 7;
							var gamma0l = (gamma0xl >>> 1 | gamma0xh << 31) ^ (gamma0xl >>> 8 | gamma0xh << 24) ^ (gamma0xl >>> 7 | gamma0xh << 25);
							var gamma1x = W[i - 2];
							var gamma1xh = gamma1x.high;
							var gamma1xl = gamma1x.low;
							var gamma1h = (gamma1xh >>> 19 | gamma1xl << 13) ^ (gamma1xh << 3 | gamma1xl >>> 29) ^ gamma1xh >>> 6;
							var gamma1l = (gamma1xl >>> 19 | gamma1xh << 13) ^ (gamma1xl << 3 | gamma1xh >>> 29) ^ (gamma1xl >>> 6 | gamma1xh << 26);
							var Wi7 = W[i - 7];
							var Wi7h = Wi7.high;
							var Wi7l = Wi7.low;
							var Wi16 = W[i - 16];
							var Wi16h = Wi16.high;
							var Wi16l = Wi16.low;
							Wil = gamma0l + Wi7l;
							Wih = gamma0h + Wi7h + (Wil >>> 0 < gamma0l >>> 0 ? 1 : 0);
							Wil = Wil + gamma1l;
							Wih = Wih + gamma1h + (Wil >>> 0 < gamma1l >>> 0 ? 1 : 0);
							Wil = Wil + Wi16l;
							Wih = Wih + Wi16h + (Wil >>> 0 < Wi16l >>> 0 ? 1 : 0);
							Wi.high = Wih;
							Wi.low = Wil;
						}
						var chh = eh & fh ^ ~eh & gh;
						var chl = el & fl ^ ~el & gl;
						var majh = ah & bh ^ ah & ch ^ bh & ch;
						var majl = al & bl ^ al & cl ^ bl & cl;
						var sigma0h = (ah >>> 28 | al << 4) ^ (ah << 30 | al >>> 2) ^ (ah << 25 | al >>> 7);
						var sigma0l = (al >>> 28 | ah << 4) ^ (al << 30 | ah >>> 2) ^ (al << 25 | ah >>> 7);
						var sigma1h = (eh >>> 14 | el << 18) ^ (eh >>> 18 | el << 14) ^ (eh << 23 | el >>> 9);
						var sigma1l = (el >>> 14 | eh << 18) ^ (el >>> 18 | eh << 14) ^ (el << 23 | eh >>> 9);
						var Ki = K[i];
						var Kih = Ki.high;
						var Kil = Ki.low;
						var t1l = hl + sigma1l;
						var t1h = hh + sigma1h + (t1l >>> 0 < hl >>> 0 ? 1 : 0);
						var t1l = t1l + chl;
						var t1h = t1h + chh + (t1l >>> 0 < chl >>> 0 ? 1 : 0);
						var t1l = t1l + Kil;
						var t1h = t1h + Kih + (t1l >>> 0 < Kil >>> 0 ? 1 : 0);
						var t1l = t1l + Wil;
						var t1h = t1h + Wih + (t1l >>> 0 < Wil >>> 0 ? 1 : 0);
						var t2l = sigma0l + majl;
						var t2h = sigma0h + majh + (t2l >>> 0 < sigma0l >>> 0 ? 1 : 0);
						hh = gh;
						hl = gl;
						gh = fh;
						gl = fl;
						fh = eh;
						fl = el;
						el = dl + t1l | 0;
						eh = dh + t1h + (el >>> 0 < dl >>> 0 ? 1 : 0) | 0;
						dh = ch;
						dl = cl;
						ch = bh;
						cl = bl;
						bh = ah;
						bl = al;
						al = t1l + t2l | 0;
						ah = t1h + t2h + (al >>> 0 < t1l >>> 0 ? 1 : 0) | 0;
					}
					H0l = H0.low = H0l + al;
					H0.high = H0h + ah + (H0l >>> 0 < al >>> 0 ? 1 : 0);
					H1l = H1.low = H1l + bl;
					H1.high = H1h + bh + (H1l >>> 0 < bl >>> 0 ? 1 : 0);
					H2l = H2.low = H2l + cl;
					H2.high = H2h + ch + (H2l >>> 0 < cl >>> 0 ? 1 : 0);
					H3l = H3.low = H3l + dl;
					H3.high = H3h + dh + (H3l >>> 0 < dl >>> 0 ? 1 : 0);
					H4l = H4.low = H4l + el;
					H4.high = H4h + eh + (H4l >>> 0 < el >>> 0 ? 1 : 0);
					H5l = H5.low = H5l + fl;
					H5.high = H5h + fh + (H5l >>> 0 < fl >>> 0 ? 1 : 0);
					H6l = H6.low = H6l + gl;
					H6.high = H6h + gh + (H6l >>> 0 < gl >>> 0 ? 1 : 0);
					H7l = H7.low = H7l + hl;
					H7.high = H7h + hh + (H7l >>> 0 < hl >>> 0 ? 1 : 0);
				},
				_doFinalize: function() {
					var data = this._data;
					var dataWords = data.words;
					var nBitsTotal = this._nDataBytes * 8;
					var nBitsLeft = data.sigBytes * 8;
					dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
					dataWords[(nBitsLeft + 128 >>> 10 << 5) + 30] = Math.floor(nBitsTotal / 4294967296);
					dataWords[(nBitsLeft + 128 >>> 10 << 5) + 31] = nBitsTotal;
					data.sigBytes = dataWords.length * 4;
					this._process();
					return this._hash.toX32();
				},
				clone: function() {
					var clone = Hasher.clone.call(this);
					clone._hash = this._hash.clone();
					return clone;
				},
				blockSize: 1024 / 32
			});
			/**
			* Shortcut function to the hasher's object interface.
			*
			* @param {WordArray|string} message The message to hash.
			*
			* @return {WordArray} The hash.
			*
			* @static
			*
			* @example
			*
			*     var hash = CryptoJS.SHA512('message');
			*     var hash = CryptoJS.SHA512(wordArray);
			*/
			C.SHA512 = Hasher._createHelper(SHA512);
			/**
			* Shortcut function to the HMAC's object interface.
			*
			* @param {WordArray|string} message The message to hash.
			* @param {WordArray|string} key The secret key.
			*
			* @return {WordArray} The HMAC.
			*
			* @static
			*
			* @example
			*
			*     var hmac = CryptoJS.HmacSHA512(message, key);
			*/
			C.HmacSHA512 = Hasher._createHmacHelper(SHA512);
		})();
		return CryptoJS.SHA512;
	});
}));
//#endregion
//#region node_modules/crypto-js/sha384.js
var require_sha384 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(root, factory, undef) {
		if (typeof exports === "object") module.exports = exports = factory(require_core(), require_x64_core(), require_sha512());
		else if (typeof define === "function" && define.amd) define([
			"./core",
			"./x64-core",
			"./sha512"
		], factory);
		else factory(root.CryptoJS);
	})(exports, function(CryptoJS) {
		(function() {
			var C = CryptoJS;
			var C_x64 = C.x64;
			var X64Word = C_x64.Word;
			var X64WordArray = C_x64.WordArray;
			var C_algo = C.algo;
			var SHA512 = C_algo.SHA512;
			/**
			* SHA-384 hash algorithm.
			*/
			var SHA384 = C_algo.SHA384 = SHA512.extend({
				_doReset: function() {
					this._hash = new X64WordArray.init([
						new X64Word.init(3418070365, 3238371032),
						new X64Word.init(1654270250, 914150663),
						new X64Word.init(2438529370, 812702999),
						new X64Word.init(355462360, 4144912697),
						new X64Word.init(1731405415, 4290775857),
						new X64Word.init(2394180231, 1750603025),
						new X64Word.init(3675008525, 1694076839),
						new X64Word.init(1203062813, 3204075428)
					]);
				},
				_doFinalize: function() {
					var hash = SHA512._doFinalize.call(this);
					hash.sigBytes -= 16;
					return hash;
				}
			});
			/**
			* Shortcut function to the hasher's object interface.
			*
			* @param {WordArray|string} message The message to hash.
			*
			* @return {WordArray} The hash.
			*
			* @static
			*
			* @example
			*
			*     var hash = CryptoJS.SHA384('message');
			*     var hash = CryptoJS.SHA384(wordArray);
			*/
			C.SHA384 = SHA512._createHelper(SHA384);
			/**
			* Shortcut function to the HMAC's object interface.
			*
			* @param {WordArray|string} message The message to hash.
			* @param {WordArray|string} key The secret key.
			*
			* @return {WordArray} The HMAC.
			*
			* @static
			*
			* @example
			*
			*     var hmac = CryptoJS.HmacSHA384(message, key);
			*/
			C.HmacSHA384 = SHA512._createHmacHelper(SHA384);
		})();
		return CryptoJS.SHA384;
	});
}));
//#endregion
//#region node_modules/crypto-js/sha3.js
var require_sha3 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(root, factory, undef) {
		if (typeof exports === "object") module.exports = exports = factory(require_core(), require_x64_core());
		else if (typeof define === "function" && define.amd) define(["./core", "./x64-core"], factory);
		else factory(root.CryptoJS);
	})(exports, function(CryptoJS) {
		(function(Math) {
			var C = CryptoJS;
			var C_lib = C.lib;
			var WordArray = C_lib.WordArray;
			var Hasher = C_lib.Hasher;
			var X64Word = C.x64.Word;
			var C_algo = C.algo;
			var RHO_OFFSETS = [];
			var PI_INDEXES = [];
			var ROUND_CONSTANTS = [];
			(function() {
				var x = 1, y = 0;
				for (var t = 0; t < 24; t++) {
					RHO_OFFSETS[x + 5 * y] = (t + 1) * (t + 2) / 2 % 64;
					var newX = y % 5;
					var newY = (2 * x + 3 * y) % 5;
					x = newX;
					y = newY;
				}
				for (var x = 0; x < 5; x++) for (var y = 0; y < 5; y++) PI_INDEXES[x + 5 * y] = y + (2 * x + 3 * y) % 5 * 5;
				var LFSR = 1;
				for (var i = 0; i < 24; i++) {
					var roundConstantMsw = 0;
					var roundConstantLsw = 0;
					for (var j = 0; j < 7; j++) {
						if (LFSR & 1) {
							var bitPosition = (1 << j) - 1;
							if (bitPosition < 32) roundConstantLsw ^= 1 << bitPosition;
							else roundConstantMsw ^= 1 << bitPosition - 32;
						}
						if (LFSR & 128) LFSR = LFSR << 1 ^ 113;
						else LFSR <<= 1;
					}
					ROUND_CONSTANTS[i] = X64Word.create(roundConstantMsw, roundConstantLsw);
				}
			})();
			var T = [];
			(function() {
				for (var i = 0; i < 25; i++) T[i] = X64Word.create();
			})();
			/**
			* SHA-3 hash algorithm.
			*/
			var SHA3 = C_algo.SHA3 = Hasher.extend({
				cfg: Hasher.cfg.extend({ outputLength: 512 }),
				_doReset: function() {
					var state = this._state = [];
					for (var i = 0; i < 25; i++) state[i] = new X64Word.init();
					this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
				},
				_doProcessBlock: function(M, offset) {
					var state = this._state;
					var nBlockSizeLanes = this.blockSize / 2;
					for (var i = 0; i < nBlockSizeLanes; i++) {
						var M2i = M[offset + 2 * i];
						var M2i1 = M[offset + 2 * i + 1];
						M2i = (M2i << 8 | M2i >>> 24) & 16711935 | (M2i << 24 | M2i >>> 8) & 4278255360;
						M2i1 = (M2i1 << 8 | M2i1 >>> 24) & 16711935 | (M2i1 << 24 | M2i1 >>> 8) & 4278255360;
						var lane = state[i];
						lane.high ^= M2i1;
						lane.low ^= M2i;
					}
					for (var round = 0; round < 24; round++) {
						for (var x = 0; x < 5; x++) {
							var tMsw = 0, tLsw = 0;
							for (var y = 0; y < 5; y++) {
								var lane = state[x + 5 * y];
								tMsw ^= lane.high;
								tLsw ^= lane.low;
							}
							var Tx = T[x];
							Tx.high = tMsw;
							Tx.low = tLsw;
						}
						for (var x = 0; x < 5; x++) {
							var Tx4 = T[(x + 4) % 5];
							var Tx1 = T[(x + 1) % 5];
							var Tx1Msw = Tx1.high;
							var Tx1Lsw = Tx1.low;
							var tMsw = Tx4.high ^ (Tx1Msw << 1 | Tx1Lsw >>> 31);
							var tLsw = Tx4.low ^ (Tx1Lsw << 1 | Tx1Msw >>> 31);
							for (var y = 0; y < 5; y++) {
								var lane = state[x + 5 * y];
								lane.high ^= tMsw;
								lane.low ^= tLsw;
							}
						}
						for (var laneIndex = 1; laneIndex < 25; laneIndex++) {
							var tMsw;
							var tLsw;
							var lane = state[laneIndex];
							var laneMsw = lane.high;
							var laneLsw = lane.low;
							var rhoOffset = RHO_OFFSETS[laneIndex];
							if (rhoOffset < 32) {
								tMsw = laneMsw << rhoOffset | laneLsw >>> 32 - rhoOffset;
								tLsw = laneLsw << rhoOffset | laneMsw >>> 32 - rhoOffset;
							} else {
								tMsw = laneLsw << rhoOffset - 32 | laneMsw >>> 64 - rhoOffset;
								tLsw = laneMsw << rhoOffset - 32 | laneLsw >>> 64 - rhoOffset;
							}
							var TPiLane = T[PI_INDEXES[laneIndex]];
							TPiLane.high = tMsw;
							TPiLane.low = tLsw;
						}
						var T0 = T[0];
						var state0 = state[0];
						T0.high = state0.high;
						T0.low = state0.low;
						for (var x = 0; x < 5; x++) for (var y = 0; y < 5; y++) {
							var laneIndex = x + 5 * y;
							var lane = state[laneIndex];
							var TLane = T[laneIndex];
							var Tx1Lane = T[(x + 1) % 5 + 5 * y];
							var Tx2Lane = T[(x + 2) % 5 + 5 * y];
							lane.high = TLane.high ^ ~Tx1Lane.high & Tx2Lane.high;
							lane.low = TLane.low ^ ~Tx1Lane.low & Tx2Lane.low;
						}
						var lane = state[0];
						var roundConstant = ROUND_CONSTANTS[round];
						lane.high ^= roundConstant.high;
						lane.low ^= roundConstant.low;
					}
				},
				_doFinalize: function() {
					var data = this._data;
					var dataWords = data.words;
					this._nDataBytes * 8;
					var nBitsLeft = data.sigBytes * 8;
					var blockSizeBits = this.blockSize * 32;
					dataWords[nBitsLeft >>> 5] |= 1 << 24 - nBitsLeft % 32;
					dataWords[(Math.ceil((nBitsLeft + 1) / blockSizeBits) * blockSizeBits >>> 5) - 1] |= 128;
					data.sigBytes = dataWords.length * 4;
					this._process();
					var state = this._state;
					var outputLengthBytes = this.cfg.outputLength / 8;
					var outputLengthLanes = outputLengthBytes / 8;
					var hashWords = [];
					for (var i = 0; i < outputLengthLanes; i++) {
						var lane = state[i];
						var laneMsw = lane.high;
						var laneLsw = lane.low;
						laneMsw = (laneMsw << 8 | laneMsw >>> 24) & 16711935 | (laneMsw << 24 | laneMsw >>> 8) & 4278255360;
						laneLsw = (laneLsw << 8 | laneLsw >>> 24) & 16711935 | (laneLsw << 24 | laneLsw >>> 8) & 4278255360;
						hashWords.push(laneLsw);
						hashWords.push(laneMsw);
					}
					return new WordArray.init(hashWords, outputLengthBytes);
				},
				clone: function() {
					var clone = Hasher.clone.call(this);
					var state = clone._state = this._state.slice(0);
					for (var i = 0; i < 25; i++) state[i] = state[i].clone();
					return clone;
				}
			});
			/**
			* Shortcut function to the hasher's object interface.
			*
			* @param {WordArray|string} message The message to hash.
			*
			* @return {WordArray} The hash.
			*
			* @static
			*
			* @example
			*
			*     var hash = CryptoJS.SHA3('message');
			*     var hash = CryptoJS.SHA3(wordArray);
			*/
			C.SHA3 = Hasher._createHelper(SHA3);
			/**
			* Shortcut function to the HMAC's object interface.
			*
			* @param {WordArray|string} message The message to hash.
			* @param {WordArray|string} key The secret key.
			*
			* @return {WordArray} The HMAC.
			*
			* @static
			*
			* @example
			*
			*     var hmac = CryptoJS.HmacSHA3(message, key);
			*/
			C.HmacSHA3 = Hasher._createHmacHelper(SHA3);
		})(Math);
		return CryptoJS.SHA3;
	});
}));
//#endregion
//#region node_modules/crypto-js/ripemd160.js
var require_ripemd160 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(root, factory) {
		if (typeof exports === "object") module.exports = exports = factory(require_core());
		else if (typeof define === "function" && define.amd) define(["./core"], factory);
		else factory(root.CryptoJS);
	})(exports, function(CryptoJS) {
		/** @preserve
		(c) 2012 by Cédric Mesnil. All rights reserved.
		
		Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
		
		- Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
		- Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
		
		THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
		*/
		(function(Math) {
			var C = CryptoJS;
			var C_lib = C.lib;
			var WordArray = C_lib.WordArray;
			var Hasher = C_lib.Hasher;
			var C_algo = C.algo;
			var _zl = WordArray.create([
				0,
				1,
				2,
				3,
				4,
				5,
				6,
				7,
				8,
				9,
				10,
				11,
				12,
				13,
				14,
				15,
				7,
				4,
				13,
				1,
				10,
				6,
				15,
				3,
				12,
				0,
				9,
				5,
				2,
				14,
				11,
				8,
				3,
				10,
				14,
				4,
				9,
				15,
				8,
				1,
				2,
				7,
				0,
				6,
				13,
				11,
				5,
				12,
				1,
				9,
				11,
				10,
				0,
				8,
				12,
				4,
				13,
				3,
				7,
				15,
				14,
				5,
				6,
				2,
				4,
				0,
				5,
				9,
				7,
				12,
				2,
				10,
				14,
				1,
				3,
				8,
				11,
				6,
				15,
				13
			]);
			var _zr = WordArray.create([
				5,
				14,
				7,
				0,
				9,
				2,
				11,
				4,
				13,
				6,
				15,
				8,
				1,
				10,
				3,
				12,
				6,
				11,
				3,
				7,
				0,
				13,
				5,
				10,
				14,
				15,
				8,
				12,
				4,
				9,
				1,
				2,
				15,
				5,
				1,
				3,
				7,
				14,
				6,
				9,
				11,
				8,
				12,
				2,
				10,
				0,
				4,
				13,
				8,
				6,
				4,
				1,
				3,
				11,
				15,
				0,
				5,
				12,
				2,
				13,
				9,
				7,
				10,
				14,
				12,
				15,
				10,
				4,
				1,
				5,
				8,
				7,
				6,
				2,
				13,
				14,
				0,
				3,
				9,
				11
			]);
			var _sl = WordArray.create([
				11,
				14,
				15,
				12,
				5,
				8,
				7,
				9,
				11,
				13,
				14,
				15,
				6,
				7,
				9,
				8,
				7,
				6,
				8,
				13,
				11,
				9,
				7,
				15,
				7,
				12,
				15,
				9,
				11,
				7,
				13,
				12,
				11,
				13,
				6,
				7,
				14,
				9,
				13,
				15,
				14,
				8,
				13,
				6,
				5,
				12,
				7,
				5,
				11,
				12,
				14,
				15,
				14,
				15,
				9,
				8,
				9,
				14,
				5,
				6,
				8,
				6,
				5,
				12,
				9,
				15,
				5,
				11,
				6,
				8,
				13,
				12,
				5,
				12,
				13,
				14,
				11,
				8,
				5,
				6
			]);
			var _sr = WordArray.create([
				8,
				9,
				9,
				11,
				13,
				15,
				15,
				5,
				7,
				7,
				8,
				11,
				14,
				14,
				12,
				6,
				9,
				13,
				15,
				7,
				12,
				8,
				9,
				11,
				7,
				7,
				12,
				7,
				6,
				15,
				13,
				11,
				9,
				7,
				15,
				11,
				8,
				6,
				6,
				14,
				12,
				13,
				5,
				14,
				13,
				13,
				7,
				5,
				15,
				5,
				8,
				11,
				14,
				14,
				6,
				14,
				6,
				9,
				12,
				9,
				12,
				5,
				15,
				8,
				8,
				5,
				12,
				9,
				12,
				5,
				14,
				6,
				8,
				13,
				6,
				5,
				15,
				13,
				11,
				11
			]);
			var _hl = WordArray.create([
				0,
				1518500249,
				1859775393,
				2400959708,
				2840853838
			]);
			var _hr = WordArray.create([
				1352829926,
				1548603684,
				1836072691,
				2053994217,
				0
			]);
			/**
			* RIPEMD160 hash algorithm.
			*/
			var RIPEMD160 = C_algo.RIPEMD160 = Hasher.extend({
				_doReset: function() {
					this._hash = WordArray.create([
						1732584193,
						4023233417,
						2562383102,
						271733878,
						3285377520
					]);
				},
				_doProcessBlock: function(M, offset) {
					for (var i = 0; i < 16; i++) {
						var offset_i = offset + i;
						var M_offset_i = M[offset_i];
						M[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 16711935 | (M_offset_i << 24 | M_offset_i >>> 8) & 4278255360;
					}
					var H = this._hash.words;
					var hl = _hl.words;
					var hr = _hr.words;
					var zl = _zl.words;
					var zr = _zr.words;
					var sl = _sl.words;
					var sr = _sr.words;
					var al, bl, cl, dl, el;
					var ar = al = H[0], br = bl = H[1], cr = cl = H[2], dr = dl = H[3], er = el = H[4];
					var t;
					for (var i = 0; i < 80; i += 1) {
						t = al + M[offset + zl[i]] | 0;
						if (i < 16) t += f1(bl, cl, dl) + hl[0];
						else if (i < 32) t += f2(bl, cl, dl) + hl[1];
						else if (i < 48) t += f3(bl, cl, dl) + hl[2];
						else if (i < 64) t += f4(bl, cl, dl) + hl[3];
						else t += f5(bl, cl, dl) + hl[4];
						t = t | 0;
						t = rotl(t, sl[i]);
						t = t + el | 0;
						al = el;
						el = dl;
						dl = rotl(cl, 10);
						cl = bl;
						bl = t;
						t = ar + M[offset + zr[i]] | 0;
						if (i < 16) t += f5(br, cr, dr) + hr[0];
						else if (i < 32) t += f4(br, cr, dr) + hr[1];
						else if (i < 48) t += f3(br, cr, dr) + hr[2];
						else if (i < 64) t += f2(br, cr, dr) + hr[3];
						else t += f1(br, cr, dr) + hr[4];
						t = t | 0;
						t = rotl(t, sr[i]);
						t = t + er | 0;
						ar = er;
						er = dr;
						dr = rotl(cr, 10);
						cr = br;
						br = t;
					}
					t = H[1] + cl + dr | 0;
					H[1] = H[2] + dl + er | 0;
					H[2] = H[3] + el + ar | 0;
					H[3] = H[4] + al + br | 0;
					H[4] = H[0] + bl + cr | 0;
					H[0] = t;
				},
				_doFinalize: function() {
					var data = this._data;
					var dataWords = data.words;
					var nBitsTotal = this._nDataBytes * 8;
					var nBitsLeft = data.sigBytes * 8;
					dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
					dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = (nBitsTotal << 8 | nBitsTotal >>> 24) & 16711935 | (nBitsTotal << 24 | nBitsTotal >>> 8) & 4278255360;
					data.sigBytes = (dataWords.length + 1) * 4;
					this._process();
					var hash = this._hash;
					var H = hash.words;
					for (var i = 0; i < 5; i++) {
						var H_i = H[i];
						H[i] = (H_i << 8 | H_i >>> 24) & 16711935 | (H_i << 24 | H_i >>> 8) & 4278255360;
					}
					return hash;
				},
				clone: function() {
					var clone = Hasher.clone.call(this);
					clone._hash = this._hash.clone();
					return clone;
				}
			});
			function f1(x, y, z) {
				return x ^ y ^ z;
			}
			function f2(x, y, z) {
				return x & y | ~x & z;
			}
			function f3(x, y, z) {
				return (x | ~y) ^ z;
			}
			function f4(x, y, z) {
				return x & z | y & ~z;
			}
			function f5(x, y, z) {
				return x ^ (y | ~z);
			}
			function rotl(x, n) {
				return x << n | x >>> 32 - n;
			}
			/**
			* Shortcut function to the hasher's object interface.
			*
			* @param {WordArray|string} message The message to hash.
			*
			* @return {WordArray} The hash.
			*
			* @static
			*
			* @example
			*
			*     var hash = CryptoJS.RIPEMD160('message');
			*     var hash = CryptoJS.RIPEMD160(wordArray);
			*/
			C.RIPEMD160 = Hasher._createHelper(RIPEMD160);
			/**
			* Shortcut function to the HMAC's object interface.
			*
			* @param {WordArray|string} message The message to hash.
			* @param {WordArray|string} key The secret key.
			*
			* @return {WordArray} The HMAC.
			*
			* @static
			*
			* @example
			*
			*     var hmac = CryptoJS.HmacRIPEMD160(message, key);
			*/
			C.HmacRIPEMD160 = Hasher._createHmacHelper(RIPEMD160);
		})(Math);
		return CryptoJS.RIPEMD160;
	});
}));
//#endregion
//#region node_modules/crypto-js/hmac.js
var require_hmac = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(root, factory) {
		if (typeof exports === "object") module.exports = exports = factory(require_core());
		else if (typeof define === "function" && define.amd) define(["./core"], factory);
		else factory(root.CryptoJS);
	})(exports, function(CryptoJS) {
		(function() {
			var C = CryptoJS;
			var Base = C.lib.Base;
			var Utf8 = C.enc.Utf8;
			var C_algo = C.algo;
			C_algo.HMAC = Base.extend({
				init: function(hasher, key) {
					hasher = this._hasher = new hasher.init();
					if (typeof key == "string") key = Utf8.parse(key);
					var hasherBlockSize = hasher.blockSize;
					var hasherBlockSizeBytes = hasherBlockSize * 4;
					if (key.sigBytes > hasherBlockSizeBytes) key = hasher.finalize(key);
					key.clamp();
					var oKey = this._oKey = key.clone();
					var iKey = this._iKey = key.clone();
					var oKeyWords = oKey.words;
					var iKeyWords = iKey.words;
					for (var i = 0; i < hasherBlockSize; i++) {
						oKeyWords[i] ^= 1549556828;
						iKeyWords[i] ^= 909522486;
					}
					oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;
					this.reset();
				},
				reset: function() {
					var hasher = this._hasher;
					hasher.reset();
					hasher.update(this._iKey);
				},
				update: function(messageUpdate) {
					this._hasher.update(messageUpdate);
					return this;
				},
				finalize: function(messageUpdate) {
					var hasher = this._hasher;
					var innerHash = hasher.finalize(messageUpdate);
					hasher.reset();
					return hasher.finalize(this._oKey.clone().concat(innerHash));
				}
			});
		})();
	});
}));
//#endregion
//#region node_modules/crypto-js/pbkdf2.js
var require_pbkdf2 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(root, factory, undef) {
		if (typeof exports === "object") module.exports = exports = factory(require_core(), require_sha256(), require_hmac());
		else if (typeof define === "function" && define.amd) define([
			"./core",
			"./sha256",
			"./hmac"
		], factory);
		else factory(root.CryptoJS);
	})(exports, function(CryptoJS) {
		(function() {
			var C = CryptoJS;
			var C_lib = C.lib;
			var Base = C_lib.Base;
			var WordArray = C_lib.WordArray;
			var C_algo = C.algo;
			var SHA256 = C_algo.SHA256;
			var HMAC = C_algo.HMAC;
			/**
			* Password-Based Key Derivation Function 2 algorithm.
			*/
			var PBKDF2 = C_algo.PBKDF2 = Base.extend({
				cfg: Base.extend({
					keySize: 128 / 32,
					hasher: SHA256,
					iterations: 25e4
				}),
				init: function(cfg) {
					this.cfg = this.cfg.extend(cfg);
				},
				compute: function(password, salt) {
					var cfg = this.cfg;
					var hmac = HMAC.create(cfg.hasher, password);
					var derivedKey = WordArray.create();
					var blockIndex = WordArray.create([1]);
					var derivedKeyWords = derivedKey.words;
					var blockIndexWords = blockIndex.words;
					var keySize = cfg.keySize;
					var iterations = cfg.iterations;
					while (derivedKeyWords.length < keySize) {
						var block = hmac.update(salt).finalize(blockIndex);
						hmac.reset();
						var blockWords = block.words;
						var blockWordsLength = blockWords.length;
						var intermediate = block;
						for (var i = 1; i < iterations; i++) {
							intermediate = hmac.finalize(intermediate);
							hmac.reset();
							var intermediateWords = intermediate.words;
							for (var j = 0; j < blockWordsLength; j++) blockWords[j] ^= intermediateWords[j];
						}
						derivedKey.concat(block);
						blockIndexWords[0]++;
					}
					derivedKey.sigBytes = keySize * 4;
					return derivedKey;
				}
			});
			/**
			* Computes the Password-Based Key Derivation Function 2.
			*
			* @param {WordArray|string} password The password.
			* @param {WordArray|string} salt A salt.
			* @param {Object} cfg (Optional) The configuration options to use for this computation.
			*
			* @return {WordArray} The derived key.
			*
			* @static
			*
			* @example
			*
			*     var key = CryptoJS.PBKDF2(password, salt);
			*     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8 });
			*     var key = CryptoJS.PBKDF2(password, salt, { keySize: 8, iterations: 1000 });
			*/
			C.PBKDF2 = function(password, salt, cfg) {
				return PBKDF2.create(cfg).compute(password, salt);
			};
		})();
		return CryptoJS.PBKDF2;
	});
}));
//#endregion
//#region node_modules/crypto-js/evpkdf.js
var require_evpkdf = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(root, factory, undef) {
		if (typeof exports === "object") module.exports = exports = factory(require_core(), require_sha1(), require_hmac());
		else if (typeof define === "function" && define.amd) define([
			"./core",
			"./sha1",
			"./hmac"
		], factory);
		else factory(root.CryptoJS);
	})(exports, function(CryptoJS) {
		(function() {
			var C = CryptoJS;
			var C_lib = C.lib;
			var Base = C_lib.Base;
			var WordArray = C_lib.WordArray;
			var C_algo = C.algo;
			var MD5 = C_algo.MD5;
			/**
			* This key derivation function is meant to conform with EVP_BytesToKey.
			* www.openssl.org/docs/crypto/EVP_BytesToKey.html
			*/
			var EvpKDF = C_algo.EvpKDF = Base.extend({
				cfg: Base.extend({
					keySize: 128 / 32,
					hasher: MD5,
					iterations: 1
				}),
				init: function(cfg) {
					this.cfg = this.cfg.extend(cfg);
				},
				compute: function(password, salt) {
					var block;
					var cfg = this.cfg;
					var hasher = cfg.hasher.create();
					var derivedKey = WordArray.create();
					var derivedKeyWords = derivedKey.words;
					var keySize = cfg.keySize;
					var iterations = cfg.iterations;
					while (derivedKeyWords.length < keySize) {
						if (block) hasher.update(block);
						block = hasher.update(password).finalize(salt);
						hasher.reset();
						for (var i = 1; i < iterations; i++) {
							block = hasher.finalize(block);
							hasher.reset();
						}
						derivedKey.concat(block);
					}
					derivedKey.sigBytes = keySize * 4;
					return derivedKey;
				}
			});
			/**
			* Derives a key from a password.
			*
			* @param {WordArray|string} password The password.
			* @param {WordArray|string} salt A salt.
			* @param {Object} cfg (Optional) The configuration options to use for this computation.
			*
			* @return {WordArray} The derived key.
			*
			* @static
			*
			* @example
			*
			*     var key = CryptoJS.EvpKDF(password, salt);
			*     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8 });
			*     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8, iterations: 1000 });
			*/
			C.EvpKDF = function(password, salt, cfg) {
				return EvpKDF.create(cfg).compute(password, salt);
			};
		})();
		return CryptoJS.EvpKDF;
	});
}));
//#endregion
//#region node_modules/crypto-js/cipher-core.js
var require_cipher_core = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(root, factory, undef) {
		if (typeof exports === "object") module.exports = exports = factory(require_core(), require_evpkdf());
		else if (typeof define === "function" && define.amd) define(["./core", "./evpkdf"], factory);
		else factory(root.CryptoJS);
	})(exports, function(CryptoJS) {
		/**
		* Cipher core components.
		*/
		CryptoJS.lib.Cipher || function(undefined) {
			var C = CryptoJS;
			var C_lib = C.lib;
			var Base = C_lib.Base;
			var WordArray = C_lib.WordArray;
			var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
			var C_enc = C.enc;
			C_enc.Utf8;
			var Base64 = C_enc.Base64;
			var EvpKDF = C.algo.EvpKDF;
			/**
			* Abstract base cipher template.
			*
			* @property {number} keySize This cipher's key size. Default: 4 (128 bits)
			* @property {number} ivSize This cipher's IV size. Default: 4 (128 bits)
			* @property {number} _ENC_XFORM_MODE A constant representing encryption mode.
			* @property {number} _DEC_XFORM_MODE A constant representing decryption mode.
			*/
			var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
				cfg: Base.extend(),
				createEncryptor: function(key, cfg) {
					return this.create(this._ENC_XFORM_MODE, key, cfg);
				},
				createDecryptor: function(key, cfg) {
					return this.create(this._DEC_XFORM_MODE, key, cfg);
				},
				init: function(xformMode, key, cfg) {
					this.cfg = this.cfg.extend(cfg);
					this._xformMode = xformMode;
					this._key = key;
					this.reset();
				},
				reset: function() {
					BufferedBlockAlgorithm.reset.call(this);
					this._doReset();
				},
				process: function(dataUpdate) {
					this._append(dataUpdate);
					return this._process();
				},
				finalize: function(dataUpdate) {
					if (dataUpdate) this._append(dataUpdate);
					return this._doFinalize();
				},
				keySize: 128 / 32,
				ivSize: 128 / 32,
				_ENC_XFORM_MODE: 1,
				_DEC_XFORM_MODE: 2,
				_createHelper: function() {
					function selectCipherStrategy(key) {
						if (typeof key == "string") return PasswordBasedCipher;
						else return SerializableCipher;
					}
					return function(cipher) {
						return {
							encrypt: function(message, key, cfg) {
								return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
							},
							decrypt: function(ciphertext, key, cfg) {
								return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
							}
						};
					};
				}()
			});
			C_lib.StreamCipher = Cipher.extend({
				_doFinalize: function() {
					return this._process(true);
				},
				blockSize: 1
			});
			/**
			* Mode namespace.
			*/
			var C_mode = C.mode = {};
			/**
			* Abstract base block cipher mode template.
			*/
			var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({
				createEncryptor: function(cipher, iv) {
					return this.Encryptor.create(cipher, iv);
				},
				createDecryptor: function(cipher, iv) {
					return this.Decryptor.create(cipher, iv);
				},
				init: function(cipher, iv) {
					this._cipher = cipher;
					this._iv = iv;
				}
			});
			/**
			* Cipher Block Chaining mode.
			*/
			var CBC = C_mode.CBC = function() {
				/**
				* Abstract base CBC mode.
				*/
				var CBC = BlockCipherMode.extend();
				/**
				* CBC encryptor.
				*/
				CBC.Encryptor = CBC.extend({ processBlock: function(words, offset) {
					var cipher = this._cipher;
					var blockSize = cipher.blockSize;
					xorBlock.call(this, words, offset, blockSize);
					cipher.encryptBlock(words, offset);
					this._prevBlock = words.slice(offset, offset + blockSize);
				} });
				/**
				* CBC decryptor.
				*/
				CBC.Decryptor = CBC.extend({ processBlock: function(words, offset) {
					var cipher = this._cipher;
					var blockSize = cipher.blockSize;
					var thisBlock = words.slice(offset, offset + blockSize);
					cipher.decryptBlock(words, offset);
					xorBlock.call(this, words, offset, blockSize);
					this._prevBlock = thisBlock;
				} });
				function xorBlock(words, offset, blockSize) {
					var block;
					var iv = this._iv;
					if (iv) {
						block = iv;
						this._iv = undefined;
					} else block = this._prevBlock;
					for (var i = 0; i < blockSize; i++) words[offset + i] ^= block[i];
				}
				return CBC;
			}();
			/**
			* Padding namespace.
			*/
			var C_pad = C.pad = {};
			/**
			* PKCS #5/7 padding strategy.
			*/
			var Pkcs7 = C_pad.Pkcs7 = {
				pad: function(data, blockSize) {
					var blockSizeBytes = blockSize * 4;
					var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;
					var paddingWord = nPaddingBytes << 24 | nPaddingBytes << 16 | nPaddingBytes << 8 | nPaddingBytes;
					var paddingWords = [];
					for (var i = 0; i < nPaddingBytes; i += 4) paddingWords.push(paddingWord);
					var padding = WordArray.create(paddingWords, nPaddingBytes);
					data.concat(padding);
				},
				unpad: function(data) {
					var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 255;
					data.sigBytes -= nPaddingBytes;
				}
			};
			C_lib.BlockCipher = Cipher.extend({
				cfg: Cipher.cfg.extend({
					mode: CBC,
					padding: Pkcs7
				}),
				reset: function() {
					var modeCreator;
					Cipher.reset.call(this);
					var cfg = this.cfg;
					var iv = cfg.iv;
					var mode = cfg.mode;
					if (this._xformMode == this._ENC_XFORM_MODE) modeCreator = mode.createEncryptor;
					else {
						modeCreator = mode.createDecryptor;
						this._minBufferSize = 1;
					}
					if (this._mode && this._mode.__creator == modeCreator) this._mode.init(this, iv && iv.words);
					else {
						this._mode = modeCreator.call(mode, this, iv && iv.words);
						this._mode.__creator = modeCreator;
					}
				},
				_doProcessBlock: function(words, offset) {
					this._mode.processBlock(words, offset);
				},
				_doFinalize: function() {
					var finalProcessedBlocks;
					var padding = this.cfg.padding;
					if (this._xformMode == this._ENC_XFORM_MODE) {
						padding.pad(this._data, this.blockSize);
						finalProcessedBlocks = this._process(true);
					} else {
						finalProcessedBlocks = this._process(true);
						padding.unpad(finalProcessedBlocks);
					}
					return finalProcessedBlocks;
				},
				blockSize: 128 / 32
			});
			/**
			* A collection of cipher parameters.
			*
			* @property {WordArray} ciphertext The raw ciphertext.
			* @property {WordArray} key The key to this ciphertext.
			* @property {WordArray} iv The IV used in the ciphering operation.
			* @property {WordArray} salt The salt used with a key derivation function.
			* @property {Cipher} algorithm The cipher algorithm.
			* @property {Mode} mode The block mode used in the ciphering operation.
			* @property {Padding} padding The padding scheme used in the ciphering operation.
			* @property {number} blockSize The block size of the cipher.
			* @property {Format} formatter The default formatting strategy to convert this cipher params object to a string.
			*/
			var CipherParams = C_lib.CipherParams = Base.extend({
				init: function(cipherParams) {
					this.mixIn(cipherParams);
				},
				toString: function(formatter) {
					return (formatter || this.formatter).stringify(this);
				}
			});
			/**
			* Format namespace.
			*/
			var C_format = C.format = {};
			/**
			* OpenSSL formatting strategy.
			*/
			var OpenSSLFormatter = C_format.OpenSSL = {
				stringify: function(cipherParams) {
					var wordArray;
					var ciphertext = cipherParams.ciphertext;
					var salt = cipherParams.salt;
					if (salt) wordArray = WordArray.create([1398893684, 1701076831]).concat(salt).concat(ciphertext);
					else wordArray = ciphertext;
					return wordArray.toString(Base64);
				},
				parse: function(openSSLStr) {
					var salt;
					var ciphertext = Base64.parse(openSSLStr);
					var ciphertextWords = ciphertext.words;
					if (ciphertextWords[0] == 1398893684 && ciphertextWords[1] == 1701076831) {
						salt = WordArray.create(ciphertextWords.slice(2, 4));
						ciphertextWords.splice(0, 4);
						ciphertext.sigBytes -= 16;
					}
					return CipherParams.create({
						ciphertext,
						salt
					});
				}
			};
			/**
			* A cipher wrapper that returns ciphertext as a serializable cipher params object.
			*/
			var SerializableCipher = C_lib.SerializableCipher = Base.extend({
				cfg: Base.extend({ format: OpenSSLFormatter }),
				encrypt: function(cipher, message, key, cfg) {
					cfg = this.cfg.extend(cfg);
					var encryptor = cipher.createEncryptor(key, cfg);
					var ciphertext = encryptor.finalize(message);
					var cipherCfg = encryptor.cfg;
					return CipherParams.create({
						ciphertext,
						key,
						iv: cipherCfg.iv,
						algorithm: cipher,
						mode: cipherCfg.mode,
						padding: cipherCfg.padding,
						blockSize: cipher.blockSize,
						formatter: cfg.format
					});
				},
				decrypt: function(cipher, ciphertext, key, cfg) {
					cfg = this.cfg.extend(cfg);
					ciphertext = this._parse(ciphertext, cfg.format);
					return cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);
				},
				_parse: function(ciphertext, format) {
					if (typeof ciphertext == "string") return format.parse(ciphertext, this);
					else return ciphertext;
				}
			});
			/**
			* Key derivation function namespace.
			*/
			var C_kdf = C.kdf = {};
			/**
			* OpenSSL key derivation function.
			*/
			var OpenSSLKdf = C_kdf.OpenSSL = { execute: function(password, keySize, ivSize, salt, hasher) {
				if (!salt) salt = WordArray.random(64 / 8);
				if (!hasher) var key = EvpKDF.create({ keySize: keySize + ivSize }).compute(password, salt);
				else var key = EvpKDF.create({
					keySize: keySize + ivSize,
					hasher
				}).compute(password, salt);
				var iv = WordArray.create(key.words.slice(keySize), ivSize * 4);
				key.sigBytes = keySize * 4;
				return CipherParams.create({
					key,
					iv,
					salt
				});
			} };
			/**
			* A serializable cipher wrapper that derives the key from a password,
			* and returns ciphertext as a serializable cipher params object.
			*/
			var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
				cfg: SerializableCipher.cfg.extend({ kdf: OpenSSLKdf }),
				encrypt: function(cipher, message, password, cfg) {
					cfg = this.cfg.extend(cfg);
					var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, cfg.salt, cfg.hasher);
					cfg.iv = derivedParams.iv;
					var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);
					ciphertext.mixIn(derivedParams);
					return ciphertext;
				},
				decrypt: function(cipher, ciphertext, password, cfg) {
					cfg = this.cfg.extend(cfg);
					ciphertext = this._parse(ciphertext, cfg.format);
					var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt, cfg.hasher);
					cfg.iv = derivedParams.iv;
					return SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);
				}
			});
		}();
	});
}));
//#endregion
//#region node_modules/crypto-js/mode-cfb.js
var require_mode_cfb = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(root, factory, undef) {
		if (typeof exports === "object") module.exports = exports = factory(require_core(), require_cipher_core());
		else if (typeof define === "function" && define.amd) define(["./core", "./cipher-core"], factory);
		else factory(root.CryptoJS);
	})(exports, function(CryptoJS) {
		/**
		* Cipher Feedback block mode.
		*/
		CryptoJS.mode.CFB = function() {
			var CFB = CryptoJS.lib.BlockCipherMode.extend();
			CFB.Encryptor = CFB.extend({ processBlock: function(words, offset) {
				var cipher = this._cipher;
				var blockSize = cipher.blockSize;
				generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);
				this._prevBlock = words.slice(offset, offset + blockSize);
			} });
			CFB.Decryptor = CFB.extend({ processBlock: function(words, offset) {
				var cipher = this._cipher;
				var blockSize = cipher.blockSize;
				var thisBlock = words.slice(offset, offset + blockSize);
				generateKeystreamAndEncrypt.call(this, words, offset, blockSize, cipher);
				this._prevBlock = thisBlock;
			} });
			function generateKeystreamAndEncrypt(words, offset, blockSize, cipher) {
				var keystream;
				var iv = this._iv;
				if (iv) {
					keystream = iv.slice(0);
					this._iv = void 0;
				} else keystream = this._prevBlock;
				cipher.encryptBlock(keystream, 0);
				for (var i = 0; i < blockSize; i++) words[offset + i] ^= keystream[i];
			}
			return CFB;
		}();
		return CryptoJS.mode.CFB;
	});
}));
//#endregion
//#region node_modules/crypto-js/mode-ctr.js
var require_mode_ctr = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(root, factory, undef) {
		if (typeof exports === "object") module.exports = exports = factory(require_core(), require_cipher_core());
		else if (typeof define === "function" && define.amd) define(["./core", "./cipher-core"], factory);
		else factory(root.CryptoJS);
	})(exports, function(CryptoJS) {
		/**
		* Counter block mode.
		*/
		CryptoJS.mode.CTR = function() {
			var CTR = CryptoJS.lib.BlockCipherMode.extend();
			CTR.Decryptor = CTR.Encryptor = CTR.extend({ processBlock: function(words, offset) {
				var cipher = this._cipher;
				var blockSize = cipher.blockSize;
				var iv = this._iv;
				var counter = this._counter;
				if (iv) {
					counter = this._counter = iv.slice(0);
					this._iv = void 0;
				}
				var keystream = counter.slice(0);
				cipher.encryptBlock(keystream, 0);
				counter[blockSize - 1] = counter[blockSize - 1] + 1 | 0;
				for (var i = 0; i < blockSize; i++) words[offset + i] ^= keystream[i];
			} });
			return CTR;
		}();
		return CryptoJS.mode.CTR;
	});
}));
//#endregion
//#region node_modules/crypto-js/mode-ctr-gladman.js
var require_mode_ctr_gladman = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(root, factory, undef) {
		if (typeof exports === "object") module.exports = exports = factory(require_core(), require_cipher_core());
		else if (typeof define === "function" && define.amd) define(["./core", "./cipher-core"], factory);
		else factory(root.CryptoJS);
	})(exports, function(CryptoJS) {
		/** @preserve
		* Counter block mode compatible with  Dr Brian Gladman fileenc.c
		* derived from CryptoJS.mode.CTR
		* Jan Hruby jhruby.web@gmail.com
		*/
		CryptoJS.mode.CTRGladman = function() {
			var CTRGladman = CryptoJS.lib.BlockCipherMode.extend();
			function incWord(word) {
				if ((word >> 24 & 255) === 255) {
					var b1 = word >> 16 & 255;
					var b2 = word >> 8 & 255;
					var b3 = word & 255;
					if (b1 === 255) {
						b1 = 0;
						if (b2 === 255) {
							b2 = 0;
							if (b3 === 255) b3 = 0;
							else ++b3;
						} else ++b2;
					} else ++b1;
					word = 0;
					word += b1 << 16;
					word += b2 << 8;
					word += b3;
				} else word += 1 << 24;
				return word;
			}
			function incCounter(counter) {
				if ((counter[0] = incWord(counter[0])) === 0) counter[1] = incWord(counter[1]);
				return counter;
			}
			CTRGladman.Decryptor = CTRGladman.Encryptor = CTRGladman.extend({ processBlock: function(words, offset) {
				var cipher = this._cipher;
				var blockSize = cipher.blockSize;
				var iv = this._iv;
				var counter = this._counter;
				if (iv) {
					counter = this._counter = iv.slice(0);
					this._iv = void 0;
				}
				incCounter(counter);
				var keystream = counter.slice(0);
				cipher.encryptBlock(keystream, 0);
				for (var i = 0; i < blockSize; i++) words[offset + i] ^= keystream[i];
			} });
			return CTRGladman;
		}();
		return CryptoJS.mode.CTRGladman;
	});
}));
//#endregion
//#region node_modules/crypto-js/mode-ofb.js
var require_mode_ofb = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(root, factory, undef) {
		if (typeof exports === "object") module.exports = exports = factory(require_core(), require_cipher_core());
		else if (typeof define === "function" && define.amd) define(["./core", "./cipher-core"], factory);
		else factory(root.CryptoJS);
	})(exports, function(CryptoJS) {
		/**
		* Output Feedback block mode.
		*/
		CryptoJS.mode.OFB = function() {
			var OFB = CryptoJS.lib.BlockCipherMode.extend();
			OFB.Decryptor = OFB.Encryptor = OFB.extend({ processBlock: function(words, offset) {
				var cipher = this._cipher;
				var blockSize = cipher.blockSize;
				var iv = this._iv;
				var keystream = this._keystream;
				if (iv) {
					keystream = this._keystream = iv.slice(0);
					this._iv = void 0;
				}
				cipher.encryptBlock(keystream, 0);
				for (var i = 0; i < blockSize; i++) words[offset + i] ^= keystream[i];
			} });
			return OFB;
		}();
		return CryptoJS.mode.OFB;
	});
}));
//#endregion
//#region node_modules/crypto-js/mode-ecb.js
var require_mode_ecb = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(root, factory, undef) {
		if (typeof exports === "object") module.exports = exports = factory(require_core(), require_cipher_core());
		else if (typeof define === "function" && define.amd) define(["./core", "./cipher-core"], factory);
		else factory(root.CryptoJS);
	})(exports, function(CryptoJS) {
		/**
		* Electronic Codebook block mode.
		*/
		CryptoJS.mode.ECB = function() {
			var ECB = CryptoJS.lib.BlockCipherMode.extend();
			ECB.Encryptor = ECB.extend({ processBlock: function(words, offset) {
				this._cipher.encryptBlock(words, offset);
			} });
			ECB.Decryptor = ECB.extend({ processBlock: function(words, offset) {
				this._cipher.decryptBlock(words, offset);
			} });
			return ECB;
		}();
		return CryptoJS.mode.ECB;
	});
}));
//#endregion
//#region node_modules/crypto-js/pad-ansix923.js
var require_pad_ansix923 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(root, factory, undef) {
		if (typeof exports === "object") module.exports = exports = factory(require_core(), require_cipher_core());
		else if (typeof define === "function" && define.amd) define(["./core", "./cipher-core"], factory);
		else factory(root.CryptoJS);
	})(exports, function(CryptoJS) {
		/**
		* ANSI X.923 padding strategy.
		*/
		CryptoJS.pad.AnsiX923 = {
			pad: function(data, blockSize) {
				var dataSigBytes = data.sigBytes;
				var blockSizeBytes = blockSize * 4;
				var nPaddingBytes = blockSizeBytes - dataSigBytes % blockSizeBytes;
				var lastBytePos = dataSigBytes + nPaddingBytes - 1;
				data.clamp();
				data.words[lastBytePos >>> 2] |= nPaddingBytes << 24 - lastBytePos % 4 * 8;
				data.sigBytes += nPaddingBytes;
			},
			unpad: function(data) {
				var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 255;
				data.sigBytes -= nPaddingBytes;
			}
		};
		return CryptoJS.pad.Ansix923;
	});
}));
//#endregion
//#region node_modules/crypto-js/pad-iso10126.js
var require_pad_iso10126 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(root, factory, undef) {
		if (typeof exports === "object") module.exports = exports = factory(require_core(), require_cipher_core());
		else if (typeof define === "function" && define.amd) define(["./core", "./cipher-core"], factory);
		else factory(root.CryptoJS);
	})(exports, function(CryptoJS) {
		/**
		* ISO 10126 padding strategy.
		*/
		CryptoJS.pad.Iso10126 = {
			pad: function(data, blockSize) {
				var blockSizeBytes = blockSize * 4;
				var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;
				data.concat(CryptoJS.lib.WordArray.random(nPaddingBytes - 1)).concat(CryptoJS.lib.WordArray.create([nPaddingBytes << 24], 1));
			},
			unpad: function(data) {
				var nPaddingBytes = data.words[data.sigBytes - 1 >>> 2] & 255;
				data.sigBytes -= nPaddingBytes;
			}
		};
		return CryptoJS.pad.Iso10126;
	});
}));
//#endregion
//#region node_modules/crypto-js/pad-iso97971.js
var require_pad_iso97971 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(root, factory, undef) {
		if (typeof exports === "object") module.exports = exports = factory(require_core(), require_cipher_core());
		else if (typeof define === "function" && define.amd) define(["./core", "./cipher-core"], factory);
		else factory(root.CryptoJS);
	})(exports, function(CryptoJS) {
		/**
		* ISO/IEC 9797-1 Padding Method 2.
		*/
		CryptoJS.pad.Iso97971 = {
			pad: function(data, blockSize) {
				data.concat(CryptoJS.lib.WordArray.create([2147483648], 1));
				CryptoJS.pad.ZeroPadding.pad(data, blockSize);
			},
			unpad: function(data) {
				CryptoJS.pad.ZeroPadding.unpad(data);
				data.sigBytes--;
			}
		};
		return CryptoJS.pad.Iso97971;
	});
}));
//#endregion
//#region node_modules/crypto-js/pad-zeropadding.js
var require_pad_zeropadding = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(root, factory, undef) {
		if (typeof exports === "object") module.exports = exports = factory(require_core(), require_cipher_core());
		else if (typeof define === "function" && define.amd) define(["./core", "./cipher-core"], factory);
		else factory(root.CryptoJS);
	})(exports, function(CryptoJS) {
		/**
		* Zero padding strategy.
		*/
		CryptoJS.pad.ZeroPadding = {
			pad: function(data, blockSize) {
				var blockSizeBytes = blockSize * 4;
				data.clamp();
				data.sigBytes += blockSizeBytes - (data.sigBytes % blockSizeBytes || blockSizeBytes);
			},
			unpad: function(data) {
				var dataWords = data.words;
				var i = data.sigBytes - 1;
				for (var i = data.sigBytes - 1; i >= 0; i--) if (dataWords[i >>> 2] >>> 24 - i % 4 * 8 & 255) {
					data.sigBytes = i + 1;
					break;
				}
			}
		};
		return CryptoJS.pad.ZeroPadding;
	});
}));
//#endregion
//#region node_modules/crypto-js/pad-nopadding.js
var require_pad_nopadding = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(root, factory, undef) {
		if (typeof exports === "object") module.exports = exports = factory(require_core(), require_cipher_core());
		else if (typeof define === "function" && define.amd) define(["./core", "./cipher-core"], factory);
		else factory(root.CryptoJS);
	})(exports, function(CryptoJS) {
		/**
		* A noop padding strategy.
		*/
		CryptoJS.pad.NoPadding = {
			pad: function() {},
			unpad: function() {}
		};
		return CryptoJS.pad.NoPadding;
	});
}));
//#endregion
//#region node_modules/crypto-js/format-hex.js
var require_format_hex = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(root, factory, undef) {
		if (typeof exports === "object") module.exports = exports = factory(require_core(), require_cipher_core());
		else if (typeof define === "function" && define.amd) define(["./core", "./cipher-core"], factory);
		else factory(root.CryptoJS);
	})(exports, function(CryptoJS) {
		(function(undefined) {
			var C = CryptoJS;
			var CipherParams = C.lib.CipherParams;
			var Hex = C.enc.Hex;
			var C_format = C.format;
			C_format.Hex = {
				stringify: function(cipherParams) {
					return cipherParams.ciphertext.toString(Hex);
				},
				parse: function(input) {
					var ciphertext = Hex.parse(input);
					return CipherParams.create({ ciphertext });
				}
			};
		})();
		return CryptoJS.format.Hex;
	});
}));
//#endregion
//#region node_modules/crypto-js/aes.js
var require_aes = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(root, factory, undef) {
		if (typeof exports === "object") module.exports = exports = factory(require_core(), require_enc_base64(), require_md5(), require_evpkdf(), require_cipher_core());
		else if (typeof define === "function" && define.amd) define([
			"./core",
			"./enc-base64",
			"./md5",
			"./evpkdf",
			"./cipher-core"
		], factory);
		else factory(root.CryptoJS);
	})(exports, function(CryptoJS) {
		(function() {
			var C = CryptoJS;
			var BlockCipher = C.lib.BlockCipher;
			var C_algo = C.algo;
			var SBOX = [];
			var INV_SBOX = [];
			var SUB_MIX_0 = [];
			var SUB_MIX_1 = [];
			var SUB_MIX_2 = [];
			var SUB_MIX_3 = [];
			var INV_SUB_MIX_0 = [];
			var INV_SUB_MIX_1 = [];
			var INV_SUB_MIX_2 = [];
			var INV_SUB_MIX_3 = [];
			(function() {
				var d = [];
				for (var i = 0; i < 256; i++) if (i < 128) d[i] = i << 1;
				else d[i] = i << 1 ^ 283;
				var x = 0;
				var xi = 0;
				for (var i = 0; i < 256; i++) {
					var sx = xi ^ xi << 1 ^ xi << 2 ^ xi << 3 ^ xi << 4;
					sx = sx >>> 8 ^ sx & 255 ^ 99;
					SBOX[x] = sx;
					INV_SBOX[sx] = x;
					var x2 = d[x];
					var x4 = d[x2];
					var x8 = d[x4];
					var t = d[sx] * 257 ^ sx * 16843008;
					SUB_MIX_0[x] = t << 24 | t >>> 8;
					SUB_MIX_1[x] = t << 16 | t >>> 16;
					SUB_MIX_2[x] = t << 8 | t >>> 24;
					SUB_MIX_3[x] = t;
					var t = x8 * 16843009 ^ x4 * 65537 ^ x2 * 257 ^ x * 16843008;
					INV_SUB_MIX_0[sx] = t << 24 | t >>> 8;
					INV_SUB_MIX_1[sx] = t << 16 | t >>> 16;
					INV_SUB_MIX_2[sx] = t << 8 | t >>> 24;
					INV_SUB_MIX_3[sx] = t;
					if (!x) x = xi = 1;
					else {
						x = x2 ^ d[d[d[x8 ^ x2]]];
						xi ^= d[d[xi]];
					}
				}
			})();
			var RCON = [
				0,
				1,
				2,
				4,
				8,
				16,
				32,
				64,
				128,
				27,
				54
			];
			/**
			* AES block cipher algorithm.
			*/
			var AES = C_algo.AES = BlockCipher.extend({
				_doReset: function() {
					var t;
					if (this._nRounds && this._keyPriorReset === this._key) return;
					var key = this._keyPriorReset = this._key;
					var keyWords = key.words;
					var keySize = key.sigBytes / 4;
					var ksRows = ((this._nRounds = keySize + 6) + 1) * 4;
					var keySchedule = this._keySchedule = [];
					for (var ksRow = 0; ksRow < ksRows; ksRow++) if (ksRow < keySize) keySchedule[ksRow] = keyWords[ksRow];
					else {
						t = keySchedule[ksRow - 1];
						if (!(ksRow % keySize)) {
							t = t << 8 | t >>> 24;
							t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 255] << 16 | SBOX[t >>> 8 & 255] << 8 | SBOX[t & 255];
							t ^= RCON[ksRow / keySize | 0] << 24;
						} else if (keySize > 6 && ksRow % keySize == 4) t = SBOX[t >>> 24] << 24 | SBOX[t >>> 16 & 255] << 16 | SBOX[t >>> 8 & 255] << 8 | SBOX[t & 255];
						keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
					}
					var invKeySchedule = this._invKeySchedule = [];
					for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
						var ksRow = ksRows - invKsRow;
						if (invKsRow % 4) var t = keySchedule[ksRow];
						else var t = keySchedule[ksRow - 4];
						if (invKsRow < 4 || ksRow <= 4) invKeySchedule[invKsRow] = t;
						else invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[t >>> 16 & 255]] ^ INV_SUB_MIX_2[SBOX[t >>> 8 & 255]] ^ INV_SUB_MIX_3[SBOX[t & 255]];
					}
				},
				encryptBlock: function(M, offset) {
					this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
				},
				decryptBlock: function(M, offset) {
					var t = M[offset + 1];
					M[offset + 1] = M[offset + 3];
					M[offset + 3] = t;
					this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);
					var t = M[offset + 1];
					M[offset + 1] = M[offset + 3];
					M[offset + 3] = t;
				},
				_doCryptBlock: function(M, offset, keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX) {
					var nRounds = this._nRounds;
					var s0 = M[offset] ^ keySchedule[0];
					var s1 = M[offset + 1] ^ keySchedule[1];
					var s2 = M[offset + 2] ^ keySchedule[2];
					var s3 = M[offset + 3] ^ keySchedule[3];
					var ksRow = 4;
					for (var round = 1; round < nRounds; round++) {
						var t0 = SUB_MIX_0[s0 >>> 24] ^ SUB_MIX_1[s1 >>> 16 & 255] ^ SUB_MIX_2[s2 >>> 8 & 255] ^ SUB_MIX_3[s3 & 255] ^ keySchedule[ksRow++];
						var t1 = SUB_MIX_0[s1 >>> 24] ^ SUB_MIX_1[s2 >>> 16 & 255] ^ SUB_MIX_2[s3 >>> 8 & 255] ^ SUB_MIX_3[s0 & 255] ^ keySchedule[ksRow++];
						var t2 = SUB_MIX_0[s2 >>> 24] ^ SUB_MIX_1[s3 >>> 16 & 255] ^ SUB_MIX_2[s0 >>> 8 & 255] ^ SUB_MIX_3[s1 & 255] ^ keySchedule[ksRow++];
						var t3 = SUB_MIX_0[s3 >>> 24] ^ SUB_MIX_1[s0 >>> 16 & 255] ^ SUB_MIX_2[s1 >>> 8 & 255] ^ SUB_MIX_3[s2 & 255] ^ keySchedule[ksRow++];
						s0 = t0;
						s1 = t1;
						s2 = t2;
						s3 = t3;
					}
					var t0 = (SBOX[s0 >>> 24] << 24 | SBOX[s1 >>> 16 & 255] << 16 | SBOX[s2 >>> 8 & 255] << 8 | SBOX[s3 & 255]) ^ keySchedule[ksRow++];
					var t1 = (SBOX[s1 >>> 24] << 24 | SBOX[s2 >>> 16 & 255] << 16 | SBOX[s3 >>> 8 & 255] << 8 | SBOX[s0 & 255]) ^ keySchedule[ksRow++];
					var t2 = (SBOX[s2 >>> 24] << 24 | SBOX[s3 >>> 16 & 255] << 16 | SBOX[s0 >>> 8 & 255] << 8 | SBOX[s1 & 255]) ^ keySchedule[ksRow++];
					var t3 = (SBOX[s3 >>> 24] << 24 | SBOX[s0 >>> 16 & 255] << 16 | SBOX[s1 >>> 8 & 255] << 8 | SBOX[s2 & 255]) ^ keySchedule[ksRow++];
					M[offset] = t0;
					M[offset + 1] = t1;
					M[offset + 2] = t2;
					M[offset + 3] = t3;
				},
				keySize: 256 / 32
			});
			/**
			* Shortcut functions to the cipher's object interface.
			*
			* @example
			*
			*     var ciphertext = CryptoJS.AES.encrypt(message, key, cfg);
			*     var plaintext  = CryptoJS.AES.decrypt(ciphertext, key, cfg);
			*/
			C.AES = BlockCipher._createHelper(AES);
		})();
		return CryptoJS.AES;
	});
}));
//#endregion
//#region node_modules/crypto-js/tripledes.js
var require_tripledes = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(root, factory, undef) {
		if (typeof exports === "object") module.exports = exports = factory(require_core(), require_enc_base64(), require_md5(), require_evpkdf(), require_cipher_core());
		else if (typeof define === "function" && define.amd) define([
			"./core",
			"./enc-base64",
			"./md5",
			"./evpkdf",
			"./cipher-core"
		], factory);
		else factory(root.CryptoJS);
	})(exports, function(CryptoJS) {
		(function() {
			var C = CryptoJS;
			var C_lib = C.lib;
			var WordArray = C_lib.WordArray;
			var BlockCipher = C_lib.BlockCipher;
			var C_algo = C.algo;
			var PC1 = [
				57,
				49,
				41,
				33,
				25,
				17,
				9,
				1,
				58,
				50,
				42,
				34,
				26,
				18,
				10,
				2,
				59,
				51,
				43,
				35,
				27,
				19,
				11,
				3,
				60,
				52,
				44,
				36,
				63,
				55,
				47,
				39,
				31,
				23,
				15,
				7,
				62,
				54,
				46,
				38,
				30,
				22,
				14,
				6,
				61,
				53,
				45,
				37,
				29,
				21,
				13,
				5,
				28,
				20,
				12,
				4
			];
			var PC2 = [
				14,
				17,
				11,
				24,
				1,
				5,
				3,
				28,
				15,
				6,
				21,
				10,
				23,
				19,
				12,
				4,
				26,
				8,
				16,
				7,
				27,
				20,
				13,
				2,
				41,
				52,
				31,
				37,
				47,
				55,
				30,
				40,
				51,
				45,
				33,
				48,
				44,
				49,
				39,
				56,
				34,
				53,
				46,
				42,
				50,
				36,
				29,
				32
			];
			var BIT_SHIFTS = [
				1,
				2,
				4,
				6,
				8,
				10,
				12,
				14,
				15,
				17,
				19,
				21,
				23,
				25,
				27,
				28
			];
			var SBOX_P = [
				{
					0: 8421888,
					268435456: 32768,
					536870912: 8421378,
					805306368: 2,
					1073741824: 512,
					1342177280: 8421890,
					1610612736: 8389122,
					1879048192: 8388608,
					2147483648: 514,
					2415919104: 8389120,
					2684354560: 33280,
					2952790016: 8421376,
					3221225472: 32770,
					3489660928: 8388610,
					3758096384: 0,
					4026531840: 33282,
					134217728: 0,
					402653184: 8421890,
					671088640: 33282,
					939524096: 32768,
					1207959552: 8421888,
					1476395008: 512,
					1744830464: 8421378,
					2013265920: 2,
					2281701376: 8389120,
					2550136832: 33280,
					2818572288: 8421376,
					3087007744: 8389122,
					3355443200: 8388610,
					3623878656: 32770,
					3892314112: 514,
					4160749568: 8388608,
					1: 32768,
					268435457: 2,
					536870913: 8421888,
					805306369: 8388608,
					1073741825: 8421378,
					1342177281: 33280,
					1610612737: 512,
					1879048193: 8389122,
					2147483649: 8421890,
					2415919105: 8421376,
					2684354561: 8388610,
					2952790017: 33282,
					3221225473: 514,
					3489660929: 8389120,
					3758096385: 32770,
					4026531841: 0,
					134217729: 8421890,
					402653185: 8421376,
					671088641: 8388608,
					939524097: 512,
					1207959553: 32768,
					1476395009: 8388610,
					1744830465: 2,
					2013265921: 33282,
					2281701377: 32770,
					2550136833: 8389122,
					2818572289: 514,
					3087007745: 8421888,
					3355443201: 8389120,
					3623878657: 0,
					3892314113: 33280,
					4160749569: 8421378
				},
				{
					0: 1074282512,
					16777216: 16384,
					33554432: 524288,
					50331648: 1074266128,
					67108864: 1073741840,
					83886080: 1074282496,
					100663296: 1073758208,
					117440512: 16,
					134217728: 540672,
					150994944: 1073758224,
					167772160: 1073741824,
					184549376: 540688,
					201326592: 524304,
					218103808: 0,
					234881024: 16400,
					251658240: 1074266112,
					8388608: 1073758208,
					25165824: 540688,
					41943040: 16,
					58720256: 1073758224,
					75497472: 1074282512,
					92274688: 1073741824,
					109051904: 524288,
					125829120: 1074266128,
					142606336: 524304,
					159383552: 0,
					176160768: 16384,
					192937984: 1074266112,
					209715200: 1073741840,
					226492416: 540672,
					243269632: 1074282496,
					260046848: 16400,
					268435456: 0,
					285212672: 1074266128,
					301989888: 1073758224,
					318767104: 1074282496,
					335544320: 1074266112,
					352321536: 16,
					369098752: 540688,
					385875968: 16384,
					402653184: 16400,
					419430400: 524288,
					436207616: 524304,
					452984832: 1073741840,
					469762048: 540672,
					486539264: 1073758208,
					503316480: 1073741824,
					520093696: 1074282512,
					276824064: 540688,
					293601280: 524288,
					310378496: 1074266112,
					327155712: 16384,
					343932928: 1073758208,
					360710144: 1074282512,
					377487360: 16,
					394264576: 1073741824,
					411041792: 1074282496,
					427819008: 1073741840,
					444596224: 1073758224,
					461373440: 524304,
					478150656: 0,
					494927872: 16400,
					511705088: 1074266128,
					528482304: 540672
				},
				{
					0: 260,
					1048576: 0,
					2097152: 67109120,
					3145728: 65796,
					4194304: 65540,
					5242880: 67108868,
					6291456: 67174660,
					7340032: 67174400,
					8388608: 67108864,
					9437184: 67174656,
					10485760: 65792,
					11534336: 67174404,
					12582912: 67109124,
					13631488: 65536,
					14680064: 4,
					15728640: 256,
					524288: 67174656,
					1572864: 67174404,
					2621440: 0,
					3670016: 67109120,
					4718592: 67108868,
					5767168: 65536,
					6815744: 65540,
					7864320: 260,
					8912896: 4,
					9961472: 256,
					11010048: 67174400,
					12058624: 65796,
					13107200: 65792,
					14155776: 67109124,
					15204352: 67174660,
					16252928: 67108864,
					16777216: 67174656,
					17825792: 65540,
					18874368: 65536,
					19922944: 67109120,
					20971520: 256,
					22020096: 67174660,
					23068672: 67108868,
					24117248: 0,
					25165824: 67109124,
					26214400: 67108864,
					27262976: 4,
					28311552: 65792,
					29360128: 67174400,
					30408704: 260,
					31457280: 65796,
					32505856: 67174404,
					17301504: 67108864,
					18350080: 260,
					19398656: 67174656,
					20447232: 0,
					21495808: 65540,
					22544384: 67109120,
					23592960: 256,
					24641536: 67174404,
					25690112: 65536,
					26738688: 67174660,
					27787264: 65796,
					28835840: 67108868,
					29884416: 67109124,
					30932992: 67174400,
					31981568: 4,
					33030144: 65792
				},
				{
					0: 2151682048,
					65536: 2147487808,
					131072: 4198464,
					196608: 2151677952,
					262144: 0,
					327680: 4198400,
					393216: 2147483712,
					458752: 4194368,
					524288: 2147483648,
					589824: 4194304,
					655360: 64,
					720896: 2147487744,
					786432: 2151678016,
					851968: 4160,
					917504: 4096,
					983040: 2151682112,
					32768: 2147487808,
					98304: 64,
					163840: 2151678016,
					229376: 2147487744,
					294912: 4198400,
					360448: 2151682112,
					425984: 0,
					491520: 2151677952,
					557056: 4096,
					622592: 2151682048,
					688128: 4194304,
					753664: 4160,
					819200: 2147483648,
					884736: 4194368,
					950272: 4198464,
					1015808: 2147483712,
					1048576: 4194368,
					1114112: 4198400,
					1179648: 2147483712,
					1245184: 0,
					1310720: 4160,
					1376256: 2151678016,
					1441792: 2151682048,
					1507328: 2147487808,
					1572864: 2151682112,
					1638400: 2147483648,
					1703936: 2151677952,
					1769472: 4198464,
					1835008: 2147487744,
					1900544: 4194304,
					1966080: 64,
					2031616: 4096,
					1081344: 2151677952,
					1146880: 2151682112,
					1212416: 0,
					1277952: 4198400,
					1343488: 4194368,
					1409024: 2147483648,
					1474560: 2147487808,
					1540096: 64,
					1605632: 2147483712,
					1671168: 4096,
					1736704: 2147487744,
					1802240: 2151678016,
					1867776: 4160,
					1933312: 2151682048,
					1998848: 4194304,
					2064384: 4198464
				},
				{
					0: 128,
					4096: 17039360,
					8192: 262144,
					12288: 536870912,
					16384: 537133184,
					20480: 16777344,
					24576: 553648256,
					28672: 262272,
					32768: 16777216,
					36864: 537133056,
					40960: 536871040,
					45056: 553910400,
					49152: 553910272,
					53248: 0,
					57344: 17039488,
					61440: 553648128,
					2048: 17039488,
					6144: 553648256,
					10240: 128,
					14336: 17039360,
					18432: 262144,
					22528: 537133184,
					26624: 553910272,
					30720: 536870912,
					34816: 537133056,
					38912: 0,
					43008: 553910400,
					47104: 16777344,
					51200: 536871040,
					55296: 553648128,
					59392: 16777216,
					63488: 262272,
					65536: 262144,
					69632: 128,
					73728: 536870912,
					77824: 553648256,
					81920: 16777344,
					86016: 553910272,
					90112: 537133184,
					94208: 16777216,
					98304: 553910400,
					102400: 553648128,
					106496: 17039360,
					110592: 537133056,
					114688: 262272,
					118784: 536871040,
					122880: 0,
					126976: 17039488,
					67584: 553648256,
					71680: 16777216,
					75776: 17039360,
					79872: 537133184,
					83968: 536870912,
					88064: 17039488,
					92160: 128,
					96256: 553910272,
					100352: 262272,
					104448: 553910400,
					108544: 0,
					112640: 553648128,
					116736: 16777344,
					120832: 262144,
					124928: 537133056,
					129024: 536871040
				},
				{
					0: 268435464,
					256: 8192,
					512: 270532608,
					768: 270540808,
					1024: 268443648,
					1280: 2097152,
					1536: 2097160,
					1792: 268435456,
					2048: 0,
					2304: 268443656,
					2560: 2105344,
					2816: 8,
					3072: 270532616,
					3328: 2105352,
					3584: 8200,
					3840: 270540800,
					128: 270532608,
					384: 270540808,
					640: 8,
					896: 2097152,
					1152: 2105352,
					1408: 268435464,
					1664: 268443648,
					1920: 8200,
					2176: 2097160,
					2432: 8192,
					2688: 268443656,
					2944: 270532616,
					3200: 0,
					3456: 270540800,
					3712: 2105344,
					3968: 268435456,
					4096: 268443648,
					4352: 270532616,
					4608: 270540808,
					4864: 8200,
					5120: 2097152,
					5376: 268435456,
					5632: 268435464,
					5888: 2105344,
					6144: 2105352,
					6400: 0,
					6656: 8,
					6912: 270532608,
					7168: 8192,
					7424: 268443656,
					7680: 270540800,
					7936: 2097160,
					4224: 8,
					4480: 2105344,
					4736: 2097152,
					4992: 268435464,
					5248: 268443648,
					5504: 8200,
					5760: 270540808,
					6016: 270532608,
					6272: 270540800,
					6528: 270532616,
					6784: 8192,
					7040: 2105352,
					7296: 2097160,
					7552: 0,
					7808: 268435456,
					8064: 268443656
				},
				{
					0: 1048576,
					16: 33555457,
					32: 1024,
					48: 1049601,
					64: 34604033,
					80: 0,
					96: 1,
					112: 34603009,
					128: 33555456,
					144: 1048577,
					160: 33554433,
					176: 34604032,
					192: 34603008,
					208: 1025,
					224: 1049600,
					240: 33554432,
					8: 34603009,
					24: 0,
					40: 33555457,
					56: 34604032,
					72: 1048576,
					88: 33554433,
					104: 33554432,
					120: 1025,
					136: 1049601,
					152: 33555456,
					168: 34603008,
					184: 1048577,
					200: 1024,
					216: 34604033,
					232: 1,
					248: 1049600,
					256: 33554432,
					272: 1048576,
					288: 33555457,
					304: 34603009,
					320: 1048577,
					336: 33555456,
					352: 34604032,
					368: 1049601,
					384: 1025,
					400: 34604033,
					416: 1049600,
					432: 1,
					448: 0,
					464: 34603008,
					480: 33554433,
					496: 1024,
					264: 1049600,
					280: 33555457,
					296: 34603009,
					312: 1,
					328: 33554432,
					344: 1048576,
					360: 1025,
					376: 34604032,
					392: 33554433,
					408: 34603008,
					424: 0,
					440: 34604033,
					456: 1049601,
					472: 1024,
					488: 33555456,
					504: 1048577
				},
				{
					0: 134219808,
					1: 131072,
					2: 134217728,
					3: 32,
					4: 131104,
					5: 134350880,
					6: 134350848,
					7: 2048,
					8: 134348800,
					9: 134219776,
					10: 133120,
					11: 134348832,
					12: 2080,
					13: 0,
					14: 134217760,
					15: 133152,
					2147483648: 2048,
					2147483649: 134350880,
					2147483650: 134219808,
					2147483651: 134217728,
					2147483652: 134348800,
					2147483653: 133120,
					2147483654: 133152,
					2147483655: 32,
					2147483656: 134217760,
					2147483657: 2080,
					2147483658: 131104,
					2147483659: 134350848,
					2147483660: 0,
					2147483661: 134348832,
					2147483662: 134219776,
					2147483663: 131072,
					16: 133152,
					17: 134350848,
					18: 32,
					19: 2048,
					20: 134219776,
					21: 134217760,
					22: 134348832,
					23: 131072,
					24: 0,
					25: 131104,
					26: 134348800,
					27: 134219808,
					28: 134350880,
					29: 133120,
					30: 2080,
					31: 134217728,
					2147483664: 131072,
					2147483665: 2048,
					2147483666: 134348832,
					2147483667: 133152,
					2147483668: 32,
					2147483669: 134348800,
					2147483670: 134217728,
					2147483671: 134219808,
					2147483672: 134350880,
					2147483673: 134217760,
					2147483674: 134219776,
					2147483675: 0,
					2147483676: 133120,
					2147483677: 2080,
					2147483678: 131104,
					2147483679: 134350848
				}
			];
			var SBOX_MASK = [
				4160749569,
				528482304,
				33030144,
				2064384,
				129024,
				8064,
				504,
				2147483679
			];
			/**
			* DES block cipher algorithm.
			*/
			var DES = C_algo.DES = BlockCipher.extend({
				_doReset: function() {
					var keyWords = this._key.words;
					var keyBits = [];
					for (var i = 0; i < 56; i++) {
						var keyBitPos = PC1[i] - 1;
						keyBits[i] = keyWords[keyBitPos >>> 5] >>> 31 - keyBitPos % 32 & 1;
					}
					var subKeys = this._subKeys = [];
					for (var nSubKey = 0; nSubKey < 16; nSubKey++) {
						var subKey = subKeys[nSubKey] = [];
						var bitShift = BIT_SHIFTS[nSubKey];
						for (var i = 0; i < 24; i++) {
							subKey[i / 6 | 0] |= keyBits[(PC2[i] - 1 + bitShift) % 28] << 31 - i % 6;
							subKey[4 + (i / 6 | 0)] |= keyBits[28 + (PC2[i + 24] - 1 + bitShift) % 28] << 31 - i % 6;
						}
						subKey[0] = subKey[0] << 1 | subKey[0] >>> 31;
						for (var i = 1; i < 7; i++) subKey[i] = subKey[i] >>> (i - 1) * 4 + 3;
						subKey[7] = subKey[7] << 5 | subKey[7] >>> 27;
					}
					var invSubKeys = this._invSubKeys = [];
					for (var i = 0; i < 16; i++) invSubKeys[i] = subKeys[15 - i];
				},
				encryptBlock: function(M, offset) {
					this._doCryptBlock(M, offset, this._subKeys);
				},
				decryptBlock: function(M, offset) {
					this._doCryptBlock(M, offset, this._invSubKeys);
				},
				_doCryptBlock: function(M, offset, subKeys) {
					this._lBlock = M[offset];
					this._rBlock = M[offset + 1];
					exchangeLR.call(this, 4, 252645135);
					exchangeLR.call(this, 16, 65535);
					exchangeRL.call(this, 2, 858993459);
					exchangeRL.call(this, 8, 16711935);
					exchangeLR.call(this, 1, 1431655765);
					for (var round = 0; round < 16; round++) {
						var subKey = subKeys[round];
						var lBlock = this._lBlock;
						var rBlock = this._rBlock;
						var f = 0;
						for (var i = 0; i < 8; i++) f |= SBOX_P[i][((rBlock ^ subKey[i]) & SBOX_MASK[i]) >>> 0];
						this._lBlock = rBlock;
						this._rBlock = lBlock ^ f;
					}
					var t = this._lBlock;
					this._lBlock = this._rBlock;
					this._rBlock = t;
					exchangeLR.call(this, 1, 1431655765);
					exchangeRL.call(this, 8, 16711935);
					exchangeRL.call(this, 2, 858993459);
					exchangeLR.call(this, 16, 65535);
					exchangeLR.call(this, 4, 252645135);
					M[offset] = this._lBlock;
					M[offset + 1] = this._rBlock;
				},
				keySize: 64 / 32,
				ivSize: 64 / 32,
				blockSize: 64 / 32
			});
			function exchangeLR(offset, mask) {
				var t = (this._lBlock >>> offset ^ this._rBlock) & mask;
				this._rBlock ^= t;
				this._lBlock ^= t << offset;
			}
			function exchangeRL(offset, mask) {
				var t = (this._rBlock >>> offset ^ this._lBlock) & mask;
				this._lBlock ^= t;
				this._rBlock ^= t << offset;
			}
			/**
			* Shortcut functions to the cipher's object interface.
			*
			* @example
			*
			*     var ciphertext = CryptoJS.DES.encrypt(message, key, cfg);
			*     var plaintext  = CryptoJS.DES.decrypt(ciphertext, key, cfg);
			*/
			C.DES = BlockCipher._createHelper(DES);
			/**
			* Triple-DES block cipher algorithm.
			*/
			var TripleDES = C_algo.TripleDES = BlockCipher.extend({
				_doReset: function() {
					var keyWords = this._key.words;
					if (keyWords.length !== 2 && keyWords.length !== 4 && keyWords.length < 6) throw new Error("Invalid key length - 3DES requires the key length to be 64, 128, 192 or >192.");
					var key1 = keyWords.slice(0, 2);
					var key2 = keyWords.length < 4 ? keyWords.slice(0, 2) : keyWords.slice(2, 4);
					var key3 = keyWords.length < 6 ? keyWords.slice(0, 2) : keyWords.slice(4, 6);
					this._des1 = DES.createEncryptor(WordArray.create(key1));
					this._des2 = DES.createEncryptor(WordArray.create(key2));
					this._des3 = DES.createEncryptor(WordArray.create(key3));
				},
				encryptBlock: function(M, offset) {
					this._des1.encryptBlock(M, offset);
					this._des2.decryptBlock(M, offset);
					this._des3.encryptBlock(M, offset);
				},
				decryptBlock: function(M, offset) {
					this._des3.decryptBlock(M, offset);
					this._des2.encryptBlock(M, offset);
					this._des1.decryptBlock(M, offset);
				},
				keySize: 192 / 32,
				ivSize: 64 / 32,
				blockSize: 64 / 32
			});
			/**
			* Shortcut functions to the cipher's object interface.
			*
			* @example
			*
			*     var ciphertext = CryptoJS.TripleDES.encrypt(message, key, cfg);
			*     var plaintext  = CryptoJS.TripleDES.decrypt(ciphertext, key, cfg);
			*/
			C.TripleDES = BlockCipher._createHelper(TripleDES);
		})();
		return CryptoJS.TripleDES;
	});
}));
//#endregion
//#region node_modules/crypto-js/rc4.js
var require_rc4 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(root, factory, undef) {
		if (typeof exports === "object") module.exports = exports = factory(require_core(), require_enc_base64(), require_md5(), require_evpkdf(), require_cipher_core());
		else if (typeof define === "function" && define.amd) define([
			"./core",
			"./enc-base64",
			"./md5",
			"./evpkdf",
			"./cipher-core"
		], factory);
		else factory(root.CryptoJS);
	})(exports, function(CryptoJS) {
		(function() {
			var C = CryptoJS;
			var StreamCipher = C.lib.StreamCipher;
			var C_algo = C.algo;
			/**
			* RC4 stream cipher algorithm.
			*/
			var RC4 = C_algo.RC4 = StreamCipher.extend({
				_doReset: function() {
					var key = this._key;
					var keyWords = key.words;
					var keySigBytes = key.sigBytes;
					var S = this._S = [];
					for (var i = 0; i < 256; i++) S[i] = i;
					for (var i = 0, j = 0; i < 256; i++) {
						var keyByteIndex = i % keySigBytes;
						var keyByte = keyWords[keyByteIndex >>> 2] >>> 24 - keyByteIndex % 4 * 8 & 255;
						j = (j + S[i] + keyByte) % 256;
						var t = S[i];
						S[i] = S[j];
						S[j] = t;
					}
					this._i = this._j = 0;
				},
				_doProcessBlock: function(M, offset) {
					M[offset] ^= generateKeystreamWord.call(this);
				},
				keySize: 256 / 32,
				ivSize: 0
			});
			function generateKeystreamWord() {
				var S = this._S;
				var i = this._i;
				var j = this._j;
				var keystreamWord = 0;
				for (var n = 0; n < 4; n++) {
					i = (i + 1) % 256;
					j = (j + S[i]) % 256;
					var t = S[i];
					S[i] = S[j];
					S[j] = t;
					keystreamWord |= S[(S[i] + S[j]) % 256] << 24 - n * 8;
				}
				this._i = i;
				this._j = j;
				return keystreamWord;
			}
			/**
			* Shortcut functions to the cipher's object interface.
			*
			* @example
			*
			*     var ciphertext = CryptoJS.RC4.encrypt(message, key, cfg);
			*     var plaintext  = CryptoJS.RC4.decrypt(ciphertext, key, cfg);
			*/
			C.RC4 = StreamCipher._createHelper(RC4);
			/**
			* Modified RC4 stream cipher algorithm.
			*/
			var RC4Drop = C_algo.RC4Drop = RC4.extend({
				cfg: RC4.cfg.extend({ drop: 192 }),
				_doReset: function() {
					RC4._doReset.call(this);
					for (var i = this.cfg.drop; i > 0; i--) generateKeystreamWord.call(this);
				}
			});
			/**
			* Shortcut functions to the cipher's object interface.
			*
			* @example
			*
			*     var ciphertext = CryptoJS.RC4Drop.encrypt(message, key, cfg);
			*     var plaintext  = CryptoJS.RC4Drop.decrypt(ciphertext, key, cfg);
			*/
			C.RC4Drop = StreamCipher._createHelper(RC4Drop);
		})();
		return CryptoJS.RC4;
	});
}));
//#endregion
//#region node_modules/crypto-js/rabbit.js
var require_rabbit = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(root, factory, undef) {
		if (typeof exports === "object") module.exports = exports = factory(require_core(), require_enc_base64(), require_md5(), require_evpkdf(), require_cipher_core());
		else if (typeof define === "function" && define.amd) define([
			"./core",
			"./enc-base64",
			"./md5",
			"./evpkdf",
			"./cipher-core"
		], factory);
		else factory(root.CryptoJS);
	})(exports, function(CryptoJS) {
		(function() {
			var C = CryptoJS;
			var StreamCipher = C.lib.StreamCipher;
			var C_algo = C.algo;
			var S = [];
			var C_ = [];
			var G = [];
			/**
			* Rabbit stream cipher algorithm
			*/
			var Rabbit = C_algo.Rabbit = StreamCipher.extend({
				_doReset: function() {
					var K = this._key.words;
					var iv = this.cfg.iv;
					for (var i = 0; i < 4; i++) K[i] = (K[i] << 8 | K[i] >>> 24) & 16711935 | (K[i] << 24 | K[i] >>> 8) & 4278255360;
					var X = this._X = [
						K[0],
						K[3] << 16 | K[2] >>> 16,
						K[1],
						K[0] << 16 | K[3] >>> 16,
						K[2],
						K[1] << 16 | K[0] >>> 16,
						K[3],
						K[2] << 16 | K[1] >>> 16
					];
					var C = this._C = [
						K[2] << 16 | K[2] >>> 16,
						K[0] & 4294901760 | K[1] & 65535,
						K[3] << 16 | K[3] >>> 16,
						K[1] & 4294901760 | K[2] & 65535,
						K[0] << 16 | K[0] >>> 16,
						K[2] & 4294901760 | K[3] & 65535,
						K[1] << 16 | K[1] >>> 16,
						K[3] & 4294901760 | K[0] & 65535
					];
					this._b = 0;
					for (var i = 0; i < 4; i++) nextState.call(this);
					for (var i = 0; i < 8; i++) C[i] ^= X[i + 4 & 7];
					if (iv) {
						var IV = iv.words;
						var IV_0 = IV[0];
						var IV_1 = IV[1];
						var i0 = (IV_0 << 8 | IV_0 >>> 24) & 16711935 | (IV_0 << 24 | IV_0 >>> 8) & 4278255360;
						var i2 = (IV_1 << 8 | IV_1 >>> 24) & 16711935 | (IV_1 << 24 | IV_1 >>> 8) & 4278255360;
						var i1 = i0 >>> 16 | i2 & 4294901760;
						var i3 = i2 << 16 | i0 & 65535;
						C[0] ^= i0;
						C[1] ^= i1;
						C[2] ^= i2;
						C[3] ^= i3;
						C[4] ^= i0;
						C[5] ^= i1;
						C[6] ^= i2;
						C[7] ^= i3;
						for (var i = 0; i < 4; i++) nextState.call(this);
					}
				},
				_doProcessBlock: function(M, offset) {
					var X = this._X;
					nextState.call(this);
					S[0] = X[0] ^ X[5] >>> 16 ^ X[3] << 16;
					S[1] = X[2] ^ X[7] >>> 16 ^ X[5] << 16;
					S[2] = X[4] ^ X[1] >>> 16 ^ X[7] << 16;
					S[3] = X[6] ^ X[3] >>> 16 ^ X[1] << 16;
					for (var i = 0; i < 4; i++) {
						S[i] = (S[i] << 8 | S[i] >>> 24) & 16711935 | (S[i] << 24 | S[i] >>> 8) & 4278255360;
						M[offset + i] ^= S[i];
					}
				},
				blockSize: 128 / 32,
				ivSize: 64 / 32
			});
			function nextState() {
				var X = this._X;
				var C = this._C;
				for (var i = 0; i < 8; i++) C_[i] = C[i];
				C[0] = C[0] + 1295307597 + this._b | 0;
				C[1] = C[1] + 3545052371 + (C[0] >>> 0 < C_[0] >>> 0 ? 1 : 0) | 0;
				C[2] = C[2] + 886263092 + (C[1] >>> 0 < C_[1] >>> 0 ? 1 : 0) | 0;
				C[3] = C[3] + 1295307597 + (C[2] >>> 0 < C_[2] >>> 0 ? 1 : 0) | 0;
				C[4] = C[4] + 3545052371 + (C[3] >>> 0 < C_[3] >>> 0 ? 1 : 0) | 0;
				C[5] = C[5] + 886263092 + (C[4] >>> 0 < C_[4] >>> 0 ? 1 : 0) | 0;
				C[6] = C[6] + 1295307597 + (C[5] >>> 0 < C_[5] >>> 0 ? 1 : 0) | 0;
				C[7] = C[7] + 3545052371 + (C[6] >>> 0 < C_[6] >>> 0 ? 1 : 0) | 0;
				this._b = C[7] >>> 0 < C_[7] >>> 0 ? 1 : 0;
				for (var i = 0; i < 8; i++) {
					var gx = X[i] + C[i];
					var ga = gx & 65535;
					var gb = gx >>> 16;
					G[i] = ((ga * ga >>> 17) + ga * gb >>> 15) + gb * gb ^ ((gx & 4294901760) * gx | 0) + ((gx & 65535) * gx | 0);
				}
				X[0] = G[0] + (G[7] << 16 | G[7] >>> 16) + (G[6] << 16 | G[6] >>> 16) | 0;
				X[1] = G[1] + (G[0] << 8 | G[0] >>> 24) + G[7] | 0;
				X[2] = G[2] + (G[1] << 16 | G[1] >>> 16) + (G[0] << 16 | G[0] >>> 16) | 0;
				X[3] = G[3] + (G[2] << 8 | G[2] >>> 24) + G[1] | 0;
				X[4] = G[4] + (G[3] << 16 | G[3] >>> 16) + (G[2] << 16 | G[2] >>> 16) | 0;
				X[5] = G[5] + (G[4] << 8 | G[4] >>> 24) + G[3] | 0;
				X[6] = G[6] + (G[5] << 16 | G[5] >>> 16) + (G[4] << 16 | G[4] >>> 16) | 0;
				X[7] = G[7] + (G[6] << 8 | G[6] >>> 24) + G[5] | 0;
			}
			/**
			* Shortcut functions to the cipher's object interface.
			*
			* @example
			*
			*     var ciphertext = CryptoJS.Rabbit.encrypt(message, key, cfg);
			*     var plaintext  = CryptoJS.Rabbit.decrypt(ciphertext, key, cfg);
			*/
			C.Rabbit = StreamCipher._createHelper(Rabbit);
		})();
		return CryptoJS.Rabbit;
	});
}));
//#endregion
//#region node_modules/crypto-js/rabbit-legacy.js
var require_rabbit_legacy = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(root, factory, undef) {
		if (typeof exports === "object") module.exports = exports = factory(require_core(), require_enc_base64(), require_md5(), require_evpkdf(), require_cipher_core());
		else if (typeof define === "function" && define.amd) define([
			"./core",
			"./enc-base64",
			"./md5",
			"./evpkdf",
			"./cipher-core"
		], factory);
		else factory(root.CryptoJS);
	})(exports, function(CryptoJS) {
		(function() {
			var C = CryptoJS;
			var StreamCipher = C.lib.StreamCipher;
			var C_algo = C.algo;
			var S = [];
			var C_ = [];
			var G = [];
			/**
			* Rabbit stream cipher algorithm.
			*
			* This is a legacy version that neglected to convert the key to little-endian.
			* This error doesn't affect the cipher's security,
			* but it does affect its compatibility with other implementations.
			*/
			var RabbitLegacy = C_algo.RabbitLegacy = StreamCipher.extend({
				_doReset: function() {
					var K = this._key.words;
					var iv = this.cfg.iv;
					var X = this._X = [
						K[0],
						K[3] << 16 | K[2] >>> 16,
						K[1],
						K[0] << 16 | K[3] >>> 16,
						K[2],
						K[1] << 16 | K[0] >>> 16,
						K[3],
						K[2] << 16 | K[1] >>> 16
					];
					var C = this._C = [
						K[2] << 16 | K[2] >>> 16,
						K[0] & 4294901760 | K[1] & 65535,
						K[3] << 16 | K[3] >>> 16,
						K[1] & 4294901760 | K[2] & 65535,
						K[0] << 16 | K[0] >>> 16,
						K[2] & 4294901760 | K[3] & 65535,
						K[1] << 16 | K[1] >>> 16,
						K[3] & 4294901760 | K[0] & 65535
					];
					this._b = 0;
					for (var i = 0; i < 4; i++) nextState.call(this);
					for (var i = 0; i < 8; i++) C[i] ^= X[i + 4 & 7];
					if (iv) {
						var IV = iv.words;
						var IV_0 = IV[0];
						var IV_1 = IV[1];
						var i0 = (IV_0 << 8 | IV_0 >>> 24) & 16711935 | (IV_0 << 24 | IV_0 >>> 8) & 4278255360;
						var i2 = (IV_1 << 8 | IV_1 >>> 24) & 16711935 | (IV_1 << 24 | IV_1 >>> 8) & 4278255360;
						var i1 = i0 >>> 16 | i2 & 4294901760;
						var i3 = i2 << 16 | i0 & 65535;
						C[0] ^= i0;
						C[1] ^= i1;
						C[2] ^= i2;
						C[3] ^= i3;
						C[4] ^= i0;
						C[5] ^= i1;
						C[6] ^= i2;
						C[7] ^= i3;
						for (var i = 0; i < 4; i++) nextState.call(this);
					}
				},
				_doProcessBlock: function(M, offset) {
					var X = this._X;
					nextState.call(this);
					S[0] = X[0] ^ X[5] >>> 16 ^ X[3] << 16;
					S[1] = X[2] ^ X[7] >>> 16 ^ X[5] << 16;
					S[2] = X[4] ^ X[1] >>> 16 ^ X[7] << 16;
					S[3] = X[6] ^ X[3] >>> 16 ^ X[1] << 16;
					for (var i = 0; i < 4; i++) {
						S[i] = (S[i] << 8 | S[i] >>> 24) & 16711935 | (S[i] << 24 | S[i] >>> 8) & 4278255360;
						M[offset + i] ^= S[i];
					}
				},
				blockSize: 128 / 32,
				ivSize: 64 / 32
			});
			function nextState() {
				var X = this._X;
				var C = this._C;
				for (var i = 0; i < 8; i++) C_[i] = C[i];
				C[0] = C[0] + 1295307597 + this._b | 0;
				C[1] = C[1] + 3545052371 + (C[0] >>> 0 < C_[0] >>> 0 ? 1 : 0) | 0;
				C[2] = C[2] + 886263092 + (C[1] >>> 0 < C_[1] >>> 0 ? 1 : 0) | 0;
				C[3] = C[3] + 1295307597 + (C[2] >>> 0 < C_[2] >>> 0 ? 1 : 0) | 0;
				C[4] = C[4] + 3545052371 + (C[3] >>> 0 < C_[3] >>> 0 ? 1 : 0) | 0;
				C[5] = C[5] + 886263092 + (C[4] >>> 0 < C_[4] >>> 0 ? 1 : 0) | 0;
				C[6] = C[6] + 1295307597 + (C[5] >>> 0 < C_[5] >>> 0 ? 1 : 0) | 0;
				C[7] = C[7] + 3545052371 + (C[6] >>> 0 < C_[6] >>> 0 ? 1 : 0) | 0;
				this._b = C[7] >>> 0 < C_[7] >>> 0 ? 1 : 0;
				for (var i = 0; i < 8; i++) {
					var gx = X[i] + C[i];
					var ga = gx & 65535;
					var gb = gx >>> 16;
					G[i] = ((ga * ga >>> 17) + ga * gb >>> 15) + gb * gb ^ ((gx & 4294901760) * gx | 0) + ((gx & 65535) * gx | 0);
				}
				X[0] = G[0] + (G[7] << 16 | G[7] >>> 16) + (G[6] << 16 | G[6] >>> 16) | 0;
				X[1] = G[1] + (G[0] << 8 | G[0] >>> 24) + G[7] | 0;
				X[2] = G[2] + (G[1] << 16 | G[1] >>> 16) + (G[0] << 16 | G[0] >>> 16) | 0;
				X[3] = G[3] + (G[2] << 8 | G[2] >>> 24) + G[1] | 0;
				X[4] = G[4] + (G[3] << 16 | G[3] >>> 16) + (G[2] << 16 | G[2] >>> 16) | 0;
				X[5] = G[5] + (G[4] << 8 | G[4] >>> 24) + G[3] | 0;
				X[6] = G[6] + (G[5] << 16 | G[5] >>> 16) + (G[4] << 16 | G[4] >>> 16) | 0;
				X[7] = G[7] + (G[6] << 8 | G[6] >>> 24) + G[5] | 0;
			}
			/**
			* Shortcut functions to the cipher's object interface.
			*
			* @example
			*
			*     var ciphertext = CryptoJS.RabbitLegacy.encrypt(message, key, cfg);
			*     var plaintext  = CryptoJS.RabbitLegacy.decrypt(ciphertext, key, cfg);
			*/
			C.RabbitLegacy = StreamCipher._createHelper(RabbitLegacy);
		})();
		return CryptoJS.RabbitLegacy;
	});
}));
//#endregion
//#region node_modules/crypto-js/blowfish.js
var require_blowfish = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(root, factory, undef) {
		if (typeof exports === "object") module.exports = exports = factory(require_core(), require_enc_base64(), require_md5(), require_evpkdf(), require_cipher_core());
		else if (typeof define === "function" && define.amd) define([
			"./core",
			"./enc-base64",
			"./md5",
			"./evpkdf",
			"./cipher-core"
		], factory);
		else factory(root.CryptoJS);
	})(exports, function(CryptoJS) {
		(function() {
			var C = CryptoJS;
			var BlockCipher = C.lib.BlockCipher;
			var C_algo = C.algo;
			const N = 16;
			const ORIG_P = [
				608135816,
				2242054355,
				320440878,
				57701188,
				2752067618,
				698298832,
				137296536,
				3964562569,
				1160258022,
				953160567,
				3193202383,
				887688300,
				3232508343,
				3380367581,
				1065670069,
				3041331479,
				2450970073,
				2306472731
			];
			const ORIG_S = [
				[
					3509652390,
					2564797868,
					805139163,
					3491422135,
					3101798381,
					1780907670,
					3128725573,
					4046225305,
					614570311,
					3012652279,
					134345442,
					2240740374,
					1667834072,
					1901547113,
					2757295779,
					4103290238,
					227898511,
					1921955416,
					1904987480,
					2182433518,
					2069144605,
					3260701109,
					2620446009,
					720527379,
					3318853667,
					677414384,
					3393288472,
					3101374703,
					2390351024,
					1614419982,
					1822297739,
					2954791486,
					3608508353,
					3174124327,
					2024746970,
					1432378464,
					3864339955,
					2857741204,
					1464375394,
					1676153920,
					1439316330,
					715854006,
					3033291828,
					289532110,
					2706671279,
					2087905683,
					3018724369,
					1668267050,
					732546397,
					1947742710,
					3462151702,
					2609353502,
					2950085171,
					1814351708,
					2050118529,
					680887927,
					999245976,
					1800124847,
					3300911131,
					1713906067,
					1641548236,
					4213287313,
					1216130144,
					1575780402,
					4018429277,
					3917837745,
					3693486850,
					3949271944,
					596196993,
					3549867205,
					258830323,
					2213823033,
					772490370,
					2760122372,
					1774776394,
					2652871518,
					566650946,
					4142492826,
					1728879713,
					2882767088,
					1783734482,
					3629395816,
					2517608232,
					2874225571,
					1861159788,
					326777828,
					3124490320,
					2130389656,
					2716951837,
					967770486,
					1724537150,
					2185432712,
					2364442137,
					1164943284,
					2105845187,
					998989502,
					3765401048,
					2244026483,
					1075463327,
					1455516326,
					1322494562,
					910128902,
					469688178,
					1117454909,
					936433444,
					3490320968,
					3675253459,
					1240580251,
					122909385,
					2157517691,
					634681816,
					4142456567,
					3825094682,
					3061402683,
					2540495037,
					79693498,
					3249098678,
					1084186820,
					1583128258,
					426386531,
					1761308591,
					1047286709,
					322548459,
					995290223,
					1845252383,
					2603652396,
					3431023940,
					2942221577,
					3202600964,
					3727903485,
					1712269319,
					422464435,
					3234572375,
					1170764815,
					3523960633,
					3117677531,
					1434042557,
					442511882,
					3600875718,
					1076654713,
					1738483198,
					4213154764,
					2393238008,
					3677496056,
					1014306527,
					4251020053,
					793779912,
					2902807211,
					842905082,
					4246964064,
					1395751752,
					1040244610,
					2656851899,
					3396308128,
					445077038,
					3742853595,
					3577915638,
					679411651,
					2892444358,
					2354009459,
					1767581616,
					3150600392,
					3791627101,
					3102740896,
					284835224,
					4246832056,
					1258075500,
					768725851,
					2589189241,
					3069724005,
					3532540348,
					1274779536,
					3789419226,
					2764799539,
					1660621633,
					3471099624,
					4011903706,
					913787905,
					3497959166,
					737222580,
					2514213453,
					2928710040,
					3937242737,
					1804850592,
					3499020752,
					2949064160,
					2386320175,
					2390070455,
					2415321851,
					4061277028,
					2290661394,
					2416832540,
					1336762016,
					1754252060,
					3520065937,
					3014181293,
					791618072,
					3188594551,
					3933548030,
					2332172193,
					3852520463,
					3043980520,
					413987798,
					3465142937,
					3030929376,
					4245938359,
					2093235073,
					3534596313,
					375366246,
					2157278981,
					2479649556,
					555357303,
					3870105701,
					2008414854,
					3344188149,
					4221384143,
					3956125452,
					2067696032,
					3594591187,
					2921233993,
					2428461,
					544322398,
					577241275,
					1471733935,
					610547355,
					4027169054,
					1432588573,
					1507829418,
					2025931657,
					3646575487,
					545086370,
					48609733,
					2200306550,
					1653985193,
					298326376,
					1316178497,
					3007786442,
					2064951626,
					458293330,
					2589141269,
					3591329599,
					3164325604,
					727753846,
					2179363840,
					146436021,
					1461446943,
					4069977195,
					705550613,
					3059967265,
					3887724982,
					4281599278,
					3313849956,
					1404054877,
					2845806497,
					146425753,
					1854211946
				],
				[
					1266315497,
					3048417604,
					3681880366,
					3289982499,
					290971e4,
					1235738493,
					2632868024,
					2414719590,
					3970600049,
					1771706367,
					1449415276,
					3266420449,
					422970021,
					1963543593,
					2690192192,
					3826793022,
					1062508698,
					1531092325,
					1804592342,
					2583117782,
					2714934279,
					4024971509,
					1294809318,
					4028980673,
					1289560198,
					2221992742,
					1669523910,
					35572830,
					157838143,
					1052438473,
					1016535060,
					1802137761,
					1753167236,
					1386275462,
					3080475397,
					2857371447,
					1040679964,
					2145300060,
					2390574316,
					1461121720,
					2956646967,
					4031777805,
					4028374788,
					33600511,
					2920084762,
					1018524850,
					629373528,
					3691585981,
					3515945977,
					2091462646,
					2486323059,
					586499841,
					988145025,
					935516892,
					3367335476,
					2599673255,
					2839830854,
					265290510,
					3972581182,
					2759138881,
					3795373465,
					1005194799,
					847297441,
					406762289,
					1314163512,
					1332590856,
					1866599683,
					4127851711,
					750260880,
					613907577,
					1450815602,
					3165620655,
					3734664991,
					3650291728,
					3012275730,
					3704569646,
					1427272223,
					778793252,
					1343938022,
					2676280711,
					2052605720,
					1946737175,
					3164576444,
					3914038668,
					3967478842,
					3682934266,
					1661551462,
					3294938066,
					4011595847,
					840292616,
					3712170807,
					616741398,
					312560963,
					711312465,
					1351876610,
					322626781,
					1910503582,
					271666773,
					2175563734,
					1594956187,
					70604529,
					3617834859,
					1007753275,
					1495573769,
					4069517037,
					2549218298,
					2663038764,
					504708206,
					2263041392,
					3941167025,
					2249088522,
					1514023603,
					1998579484,
					1312622330,
					694541497,
					2582060303,
					2151582166,
					1382467621,
					776784248,
					2618340202,
					3323268794,
					2497899128,
					2784771155,
					503983604,
					4076293799,
					907881277,
					423175695,
					432175456,
					1378068232,
					4145222326,
					3954048622,
					3938656102,
					3820766613,
					2793130115,
					2977904593,
					26017576,
					3274890735,
					3194772133,
					1700274565,
					1756076034,
					4006520079,
					3677328699,
					720338349,
					1533947780,
					354530856,
					688349552,
					3973924725,
					1637815568,
					332179504,
					3949051286,
					53804574,
					2852348879,
					3044236432,
					1282449977,
					3583942155,
					3416972820,
					4006381244,
					1617046695,
					2628476075,
					3002303598,
					1686838959,
					431878346,
					2686675385,
					1700445008,
					1080580658,
					1009431731,
					832498133,
					3223435511,
					2605976345,
					2271191193,
					2516031870,
					1648197032,
					4164389018,
					2548247927,
					300782431,
					375919233,
					238389289,
					3353747414,
					2531188641,
					2019080857,
					1475708069,
					455242339,
					2609103871,
					448939670,
					3451063019,
					1395535956,
					2413381860,
					1841049896,
					1491858159,
					885456874,
					4264095073,
					4001119347,
					1565136089,
					3898914787,
					1108368660,
					540939232,
					1173283510,
					2745871338,
					3681308437,
					4207628240,
					3343053890,
					4016749493,
					1699691293,
					1103962373,
					3625875870,
					2256883143,
					3830138730,
					1031889488,
					3479347698,
					1535977030,
					4236805024,
					3251091107,
					2132092099,
					1774941330,
					1199868427,
					1452454533,
					157007616,
					2904115357,
					342012276,
					595725824,
					1480756522,
					206960106,
					497939518,
					591360097,
					863170706,
					2375253569,
					3596610801,
					1814182875,
					2094937945,
					3421402208,
					1082520231,
					3463918190,
					2785509508,
					435703966,
					3908032597,
					1641649973,
					2842273706,
					3305899714,
					1510255612,
					2148256476,
					2655287854,
					3276092548,
					4258621189,
					236887753,
					3681803219,
					274041037,
					1734335097,
					3815195456,
					3317970021,
					1899903192,
					1026095262,
					4050517792,
					356393447,
					2410691914,
					3873677099,
					3682840055
				],
				[
					3913112168,
					2491498743,
					4132185628,
					2489919796,
					1091903735,
					1979897079,
					3170134830,
					3567386728,
					3557303409,
					857797738,
					1136121015,
					1342202287,
					507115054,
					2535736646,
					337727348,
					3213592640,
					1301675037,
					2528481711,
					1895095763,
					1721773893,
					3216771564,
					62756741,
					2142006736,
					835421444,
					2531993523,
					1442658625,
					3659876326,
					2882144922,
					676362277,
					1392781812,
					170690266,
					3921047035,
					1759253602,
					3611846912,
					1745797284,
					664899054,
					1329594018,
					3901205900,
					3045908486,
					2062866102,
					2865634940,
					3543621612,
					3464012697,
					1080764994,
					553557557,
					3656615353,
					3996768171,
					991055499,
					499776247,
					1265440854,
					648242737,
					3940784050,
					980351604,
					3713745714,
					1749149687,
					3396870395,
					4211799374,
					3640570775,
					1161844396,
					3125318951,
					1431517754,
					545492359,
					4268468663,
					3499529547,
					1437099964,
					2702547544,
					3433638243,
					2581715763,
					2787789398,
					1060185593,
					1593081372,
					2418618748,
					4260947970,
					69676912,
					2159744348,
					86519011,
					2512459080,
					3838209314,
					1220612927,
					3339683548,
					133810670,
					1090789135,
					1078426020,
					1569222167,
					845107691,
					3583754449,
					4072456591,
					1091646820,
					628848692,
					1613405280,
					3757631651,
					526609435,
					236106946,
					48312990,
					2942717905,
					3402727701,
					1797494240,
					859738849,
					992217954,
					4005476642,
					2243076622,
					3870952857,
					3732016268,
					765654824,
					3490871365,
					2511836413,
					1685915746,
					3888969200,
					1414112111,
					2273134842,
					3281911079,
					4080962846,
					172450625,
					2569994100,
					980381355,
					4109958455,
					2819808352,
					2716589560,
					2568741196,
					3681446669,
					3329971472,
					1835478071,
					660984891,
					3704678404,
					4045999559,
					3422617507,
					3040415634,
					1762651403,
					1719377915,
					3470491036,
					2693910283,
					3642056355,
					3138596744,
					1364962596,
					2073328063,
					1983633131,
					926494387,
					3423689081,
					2150032023,
					4096667949,
					1749200295,
					3328846651,
					309677260,
					2016342300,
					1779581495,
					3079819751,
					111262694,
					1274766160,
					443224088,
					298511866,
					1025883608,
					3806446537,
					1145181785,
					168956806,
					3641502830,
					3584813610,
					1689216846,
					3666258015,
					3200248200,
					1692713982,
					2646376535,
					4042768518,
					1618508792,
					1610833997,
					3523052358,
					4130873264,
					2001055236,
					3610705100,
					2202168115,
					4028541809,
					2961195399,
					1006657119,
					2006996926,
					3186142756,
					1430667929,
					3210227297,
					1314452623,
					4074634658,
					4101304120,
					2273951170,
					1399257539,
					3367210612,
					3027628629,
					1190975929,
					2062231137,
					2333990788,
					2221543033,
					2438960610,
					1181637006,
					548689776,
					2362791313,
					3372408396,
					3104550113,
					3145860560,
					296247880,
					1970579870,
					3078560182,
					3769228297,
					1714227617,
					3291629107,
					3898220290,
					166772364,
					1251581989,
					493813264,
					448347421,
					195405023,
					2709975567,
					677966185,
					3703036547,
					1463355134,
					2715995803,
					1338867538,
					1343315457,
					2802222074,
					2684532164,
					233230375,
					2599980071,
					2000651841,
					3277868038,
					1638401717,
					4028070440,
					3237316320,
					6314154,
					819756386,
					300326615,
					590932579,
					1405279636,
					3267499572,
					3150704214,
					2428286686,
					3959192993,
					3461946742,
					1862657033,
					1266418056,
					963775037,
					2089974820,
					2263052895,
					1917689273,
					448879540,
					3550394620,
					3981727096,
					150775221,
					3627908307,
					1303187396,
					508620638,
					2975983352,
					2726630617,
					1817252668,
					1876281319,
					1457606340,
					908771278,
					3720792119,
					3617206836,
					2455994898,
					1729034894,
					1080033504
				],
				[
					976866871,
					3556439503,
					2881648439,
					1522871579,
					1555064734,
					1336096578,
					3548522304,
					2579274686,
					3574697629,
					3205460757,
					3593280638,
					3338716283,
					3079412587,
					564236357,
					2993598910,
					1781952180,
					1464380207,
					3163844217,
					3332601554,
					1699332808,
					1393555694,
					1183702653,
					3581086237,
					1288719814,
					691649499,
					2847557200,
					2895455976,
					3193889540,
					2717570544,
					1781354906,
					1676643554,
					2592534050,
					3230253752,
					1126444790,
					2770207658,
					2633158820,
					2210423226,
					2615765581,
					2414155088,
					3127139286,
					673620729,
					2805611233,
					1269405062,
					4015350505,
					3341807571,
					4149409754,
					1057255273,
					2012875353,
					2162469141,
					2276492801,
					2601117357,
					993977747,
					3918593370,
					2654263191,
					753973209,
					36408145,
					2530585658,
					25011837,
					3520020182,
					2088578344,
					530523599,
					2918365339,
					1524020338,
					1518925132,
					3760827505,
					3759777254,
					1202760957,
					3985898139,
					3906192525,
					674977740,
					4174734889,
					2031300136,
					2019492241,
					3983892565,
					4153806404,
					3822280332,
					352677332,
					2297720250,
					60907813,
					90501309,
					3286998549,
					1016092578,
					2535922412,
					2839152426,
					457141659,
					509813237,
					4120667899,
					652014361,
					1966332200,
					2975202805,
					55981186,
					2327461051,
					676427537,
					3255491064,
					2882294119,
					3433927263,
					1307055953,
					942726286,
					933058658,
					2468411793,
					3933900994,
					4215176142,
					1361170020,
					2001714738,
					2830558078,
					3274259782,
					1222529897,
					1679025792,
					2729314320,
					3714953764,
					1770335741,
					151462246,
					3013232138,
					1682292957,
					1483529935,
					471910574,
					1539241949,
					458788160,
					3436315007,
					1807016891,
					3718408830,
					978976581,
					1043663428,
					3165965781,
					1927990952,
					4200891579,
					2372276910,
					3208408903,
					3533431907,
					1412390302,
					2931980059,
					4132332400,
					1947078029,
					3881505623,
					4168226417,
					2941484381,
					1077988104,
					1320477388,
					886195818,
					18198404,
					3786409e3,
					2509781533,
					112762804,
					3463356488,
					1866414978,
					891333506,
					18488651,
					661792760,
					1628790961,
					3885187036,
					3141171499,
					876946877,
					2693282273,
					1372485963,
					791857591,
					2686433993,
					3759982718,
					3167212022,
					3472953795,
					2716379847,
					445679433,
					3561995674,
					3504004811,
					3574258232,
					54117162,
					3331405415,
					2381918588,
					3769707343,
					4154350007,
					1140177722,
					4074052095,
					668550556,
					3214352940,
					367459370,
					261225585,
					2610173221,
					4209349473,
					3468074219,
					3265815641,
					314222801,
					3066103646,
					3808782860,
					282218597,
					3406013506,
					3773591054,
					379116347,
					1285071038,
					846784868,
					2669647154,
					3771962079,
					3550491691,
					2305946142,
					453669953,
					1268987020,
					3317592352,
					3279303384,
					3744833421,
					2610507566,
					3859509063,
					266596637,
					3847019092,
					517658769,
					3462560207,
					3443424879,
					370717030,
					4247526661,
					2224018117,
					4143653529,
					4112773975,
					2788324899,
					2477274417,
					1456262402,
					2901442914,
					1517677493,
					1846949527,
					2295493580,
					3734397586,
					2176403920,
					1280348187,
					1908823572,
					3871786941,
					846861322,
					1172426758,
					3287448474,
					3383383037,
					1655181056,
					3139813346,
					901632758,
					1897031941,
					2986607138,
					3066810236,
					3447102507,
					1393639104,
					373351379,
					950779232,
					625454576,
					3124240540,
					4148612726,
					2007998917,
					544563296,
					2244738638,
					2330496472,
					2058025392,
					1291430526,
					424198748,
					50039436,
					29584100,
					3605783033,
					2429876329,
					2791104160,
					1057563949,
					3255363231,
					3075367218,
					3463963227,
					1469046755,
					985887462
				]
			];
			var BLOWFISH_CTX = {
				pbox: [],
				sbox: []
			};
			function F(ctx, x) {
				let a = x >> 24 & 255;
				let b = x >> 16 & 255;
				let c = x >> 8 & 255;
				let d = x & 255;
				let y = ctx.sbox[0][a] + ctx.sbox[1][b];
				y = y ^ ctx.sbox[2][c];
				y = y + ctx.sbox[3][d];
				return y;
			}
			function BlowFish_Encrypt(ctx, left, right) {
				let Xl = left;
				let Xr = right;
				let temp;
				for (let i = 0; i < N; ++i) {
					Xl = Xl ^ ctx.pbox[i];
					Xr = F(ctx, Xl) ^ Xr;
					temp = Xl;
					Xl = Xr;
					Xr = temp;
				}
				temp = Xl;
				Xl = Xr;
				Xr = temp;
				Xr = Xr ^ ctx.pbox[N];
				Xl = Xl ^ ctx.pbox[N + 1];
				return {
					left: Xl,
					right: Xr
				};
			}
			function BlowFish_Decrypt(ctx, left, right) {
				let Xl = left;
				let Xr = right;
				let temp;
				for (let i = N + 1; i > 1; --i) {
					Xl = Xl ^ ctx.pbox[i];
					Xr = F(ctx, Xl) ^ Xr;
					temp = Xl;
					Xl = Xr;
					Xr = temp;
				}
				temp = Xl;
				Xl = Xr;
				Xr = temp;
				Xr = Xr ^ ctx.pbox[1];
				Xl = Xl ^ ctx.pbox[0];
				return {
					left: Xl,
					right: Xr
				};
			}
			/**
			* Initialization ctx's pbox and sbox.
			*
			* @param {Object} ctx The object has pbox and sbox.
			* @param {Array} key An array of 32-bit words.
			* @param {int} keysize The length of the key.
			*
			* @example
			*
			*     BlowFishInit(BLOWFISH_CTX, key, 128/32);
			*/
			function BlowFishInit(ctx, key, keysize) {
				for (let Row = 0; Row < 4; Row++) {
					ctx.sbox[Row] = [];
					for (let Col = 0; Col < 256; Col++) ctx.sbox[Row][Col] = ORIG_S[Row][Col];
				}
				let keyIndex = 0;
				for (let index = 0; index < N + 2; index++) {
					ctx.pbox[index] = ORIG_P[index] ^ key[keyIndex];
					keyIndex++;
					if (keyIndex >= keysize) keyIndex = 0;
				}
				let Data1 = 0;
				let Data2 = 0;
				let res = 0;
				for (let i = 0; i < N + 2; i += 2) {
					res = BlowFish_Encrypt(ctx, Data1, Data2);
					Data1 = res.left;
					Data2 = res.right;
					ctx.pbox[i] = Data1;
					ctx.pbox[i + 1] = Data2;
				}
				for (let i = 0; i < 4; i++) for (let j = 0; j < 256; j += 2) {
					res = BlowFish_Encrypt(ctx, Data1, Data2);
					Data1 = res.left;
					Data2 = res.right;
					ctx.sbox[i][j] = Data1;
					ctx.sbox[i][j + 1] = Data2;
				}
				return true;
			}
			/**
			* Blowfish block cipher algorithm.
			*/
			var Blowfish = C_algo.Blowfish = BlockCipher.extend({
				_doReset: function() {
					if (this._keyPriorReset === this._key) return;
					var key = this._keyPriorReset = this._key;
					var keyWords = key.words;
					BlowFishInit(BLOWFISH_CTX, keyWords, key.sigBytes / 4);
				},
				encryptBlock: function(M, offset) {
					var res = BlowFish_Encrypt(BLOWFISH_CTX, M[offset], M[offset + 1]);
					M[offset] = res.left;
					M[offset + 1] = res.right;
				},
				decryptBlock: function(M, offset) {
					var res = BlowFish_Decrypt(BLOWFISH_CTX, M[offset], M[offset + 1]);
					M[offset] = res.left;
					M[offset + 1] = res.right;
				},
				blockSize: 64 / 32,
				keySize: 128 / 32,
				ivSize: 64 / 32
			});
			/**
			* Shortcut functions to the cipher's object interface.
			*
			* @example
			*
			*     var ciphertext = CryptoJS.Blowfish.encrypt(message, key, cfg);
			*     var plaintext  = CryptoJS.Blowfish.decrypt(ciphertext, key, cfg);
			*/
			C.Blowfish = BlockCipher._createHelper(Blowfish);
		})();
		return CryptoJS.Blowfish;
	});
}));
//#endregion
//#region src/lib/dexie-store.js
var import_crypto_js = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(root, factory, undef) {
		if (typeof exports === "object") module.exports = exports = factory(require_core(), require_x64_core(), require_lib_typedarrays(), require_enc_utf16(), require_enc_base64(), require_enc_base64url(), require_md5(), require_sha1(), require_sha256(), require_sha224(), require_sha512(), require_sha384(), require_sha3(), require_ripemd160(), require_hmac(), require_pbkdf2(), require_evpkdf(), require_cipher_core(), require_mode_cfb(), require_mode_ctr(), require_mode_ctr_gladman(), require_mode_ofb(), require_mode_ecb(), require_pad_ansix923(), require_pad_iso10126(), require_pad_iso97971(), require_pad_zeropadding(), require_pad_nopadding(), require_format_hex(), require_aes(), require_tripledes(), require_rc4(), require_rabbit(), require_rabbit_legacy(), require_blowfish());
		else if (typeof define === "function" && define.amd) define([
			"./core",
			"./x64-core",
			"./lib-typedarrays",
			"./enc-utf16",
			"./enc-base64",
			"./enc-base64url",
			"./md5",
			"./sha1",
			"./sha256",
			"./sha224",
			"./sha512",
			"./sha384",
			"./sha3",
			"./ripemd160",
			"./hmac",
			"./pbkdf2",
			"./evpkdf",
			"./cipher-core",
			"./mode-cfb",
			"./mode-ctr",
			"./mode-ctr-gladman",
			"./mode-ofb",
			"./mode-ecb",
			"./pad-ansix923",
			"./pad-iso10126",
			"./pad-iso97971",
			"./pad-zeropadding",
			"./pad-nopadding",
			"./format-hex",
			"./aes",
			"./tripledes",
			"./rc4",
			"./rabbit",
			"./rabbit-legacy",
			"./blowfish"
		], factory);
		else root.CryptoJS = factory(root.CryptoJS);
	})(exports, function(CryptoJS) {
		return CryptoJS;
	});
})))(), 1);
var VaultDexie = class extends Dexie {
	previews;
	constructor() {
		super("VaultPreviews");
		this.version(1).stores({ previews: "++id, videoUrl, timestamp" });
	}
};
var db = new VaultDexie();
/**
* [VaultAuth] Secure Blob Retrieval
* Decrypts previews on the fly. Returns null if vault is locked.
*/
async function getPreview(videoUrl) {
	if (await isVaultLocked()) return null;
	const record = await db.previews.where("videoUrl").equals(videoUrl).first();
	if (!record) return null;
	if (record.encrypted) {
		const settings = await getPinSettings();
		if (!settings.pin) return null;
		try {
			const encryptedStr = new TextDecoder().decode(record.blob);
			const decrypted = import_crypto_js.default.AES.decrypt(encryptedStr, settings.pin);
			const typedArray = new Uint8Array(decrypted.sigBytes);
			const words = decrypted.words;
			const sigBytes = decrypted.sigBytes;
			for (let i = 0; i < sigBytes; i++) typedArray[i] = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
			return new Blob([typedArray], { type: record.mimeType });
		} catch (e) {
			console.error("[VaultAuth] Decryption failed:", e);
			return null;
		}
	}
	return record.blob;
}
var Activity = createLucideIcon("activity", [["path", {
	d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
	key: "169zse"
}]]);
var ArrowLeft = createLucideIcon("arrow-left", [["path", {
	d: "m12 19-7-7 7-7",
	key: "1l729n"
}], ["path", {
	d: "M19 12H5",
	key: "x3x0zl"
}]]);
var ChevronLeft = createLucideIcon("chevron-left", [["path", {
	d: "m15 18-6-6 6-6",
	key: "1wnfg3"
}]]);
var ChevronRight = createLucideIcon("chevron-right", [["path", {
	d: "m9 18 6-6-6-6",
	key: "mthhwq"
}]]);
var CloudUpload = createLucideIcon("cloud-upload", [
	["path", {
		d: "M12 13v8",
		key: "1l5pq0"
	}],
	["path", {
		d: "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242",
		key: "1pljnt"
	}],
	["path", {
		d: "m8 17 4-4 4 4",
		key: "1quai1"
	}]
]);
var Download = createLucideIcon("download", [
	["path", {
		d: "M12 15V3",
		key: "m9g1x1"
	}],
	["path", {
		d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
		key: "ih7n3h"
	}],
	["path", {
		d: "m7 10 5 5 5-5",
		key: "brsn70"
	}]
]);
var FolderTree = createLucideIcon("folder-tree", [
	["path", {
		d: "M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z",
		key: "hod4my"
	}],
	["path", {
		d: "M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.55l-.42-.85a1 1 0 0 0-.92-.6H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z",
		key: "w4yl2u"
	}],
	["path", {
		d: "M3 5a2 2 0 0 0 2 2h3",
		key: "f2jnh7"
	}],
	["path", {
		d: "M3 3v13a2 2 0 0 0 2 2h3",
		key: "k8epm1"
	}]
]);
var LoaderCircle = createLucideIcon("loader-circle", [["path", {
	d: "M21 12a9 9 0 1 1-6.219-8.56",
	key: "13zald"
}]]);
var Palette = createLucideIcon("palette", [
	["path", {
		d: "M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",
		key: "e79jfc"
	}],
	["circle", {
		cx: "13.5",
		cy: "6.5",
		r: ".5",
		fill: "currentColor",
		key: "1okk4w"
	}],
	["circle", {
		cx: "17.5",
		cy: "10.5",
		r: ".5",
		fill: "currentColor",
		key: "f64h9f"
	}],
	["circle", {
		cx: "6.5",
		cy: "12.5",
		r: ".5",
		fill: "currentColor",
		key: "qy21gx"
	}],
	["circle", {
		cx: "8.5",
		cy: "7.5",
		r: ".5",
		fill: "currentColor",
		key: "fotxhn"
	}]
]);
var Pen = createLucideIcon("pen", [["path", {
	d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
	key: "1a8usu"
}]]);
var Play = createLucideIcon("play", [["path", {
	d: "M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",
	key: "10ikf1"
}]]);
var RefreshCw = createLucideIcon("refresh-cw", [
	["path", {
		d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
		key: "v9h5vc"
	}],
	["path", {
		d: "M21 3v5h-5",
		key: "1q7to0"
	}],
	["path", {
		d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
		key: "3uifl3"
	}],
	["path", {
		d: "M8 16H3v5",
		key: "1cv678"
	}]
]);
var Search = createLucideIcon("search", [["path", {
	d: "m21 21-4.34-4.34",
	key: "14j7rj"
}], ["circle", {
	cx: "11",
	cy: "11",
	r: "8",
	key: "4ej97u"
}]]);
var Trash2 = createLucideIcon("trash-2", [
	["path", {
		d: "M10 11v6",
		key: "nco0om"
	}],
	["path", {
		d: "M14 11v6",
		key: "outv1u"
	}],
	["path", {
		d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
		key: "miytrc"
	}],
	["path", {
		d: "M3 6h18",
		key: "d0wm0j"
	}],
	["path", {
		d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
		key: "e791ji"
	}]
]);
var TriangleAlert = createLucideIcon("triangle-alert", [
	["path", {
		d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
		key: "wmoenq"
	}],
	["path", {
		d: "M12 9v4",
		key: "juzpu7"
	}],
	["path", {
		d: "M12 17h.01",
		key: "p32p05"
	}]
]);
var X = createLucideIcon("x", [["path", {
	d: "M18 6 6 18",
	key: "1bl5f8"
}], ["path", {
	d: "m6 6 12 12",
	key: "d8bk6v"
}]]);
//#endregion
//#region node_modules/clsx/dist/clsx.mjs
function r(e) {
	var t, f, n = "";
	if ("string" == typeof e || "number" == typeof e) n += e;
	else if ("object" == typeof e) if (Array.isArray(e)) {
		var o = e.length;
		for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
	} else for (f in e) e[f] && (n && (n += " "), n += f);
	return n;
}
function clsx() {
	for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
	return n;
}
//#endregion
//#region node_modules/tailwind-merge/dist/bundle-mjs.mjs
/**
* Concatenates two arrays faster than the array spread operator.
*/
var concatArrays = (array1, array2) => {
	const combinedArray = new Array(array1.length + array2.length);
	for (let i = 0; i < array1.length; i++) combinedArray[i] = array1[i];
	for (let i = 0; i < array2.length; i++) combinedArray[array1.length + i] = array2[i];
	return combinedArray;
};
var createClassValidatorObject = (classGroupId, validator) => ({
	classGroupId,
	validator
});
var createClassPartObject = (nextPart = /* @__PURE__ */ new Map(), validators = null, classGroupId) => ({
	nextPart,
	validators,
	classGroupId
});
var CLASS_PART_SEPARATOR = "-";
var EMPTY_CONFLICTS = [];
var ARBITRARY_PROPERTY_PREFIX = "arbitrary..";
var createClassGroupUtils = (config) => {
	const classMap = createClassMap(config);
	const { conflictingClassGroups, conflictingClassGroupModifiers } = config;
	const getClassGroupId = (className) => {
		if (className.startsWith("[") && className.endsWith("]")) return getGroupIdForArbitraryProperty(className);
		const classParts = className.split(CLASS_PART_SEPARATOR);
		return getGroupRecursive(classParts, classParts[0] === "" && classParts.length > 1 ? 1 : 0, classMap);
	};
	const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier) => {
		if (hasPostfixModifier) {
			const modifierConflicts = conflictingClassGroupModifiers[classGroupId];
			const baseConflicts = conflictingClassGroups[classGroupId];
			if (modifierConflicts) {
				if (baseConflicts) return concatArrays(baseConflicts, modifierConflicts);
				return modifierConflicts;
			}
			return baseConflicts || EMPTY_CONFLICTS;
		}
		return conflictingClassGroups[classGroupId] || EMPTY_CONFLICTS;
	};
	return {
		getClassGroupId,
		getConflictingClassGroupIds
	};
};
var getGroupRecursive = (classParts, startIndex, classPartObject) => {
	if (classParts.length - startIndex === 0) return classPartObject.classGroupId;
	const currentClassPart = classParts[startIndex];
	const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
	if (nextClassPartObject) {
		const result = getGroupRecursive(classParts, startIndex + 1, nextClassPartObject);
		if (result) return result;
	}
	const validators = classPartObject.validators;
	if (validators === null) return;
	const classRest = startIndex === 0 ? classParts.join(CLASS_PART_SEPARATOR) : classParts.slice(startIndex).join(CLASS_PART_SEPARATOR);
	const validatorsLength = validators.length;
	for (let i = 0; i < validatorsLength; i++) {
		const validatorObj = validators[i];
		if (validatorObj.validator(classRest)) return validatorObj.classGroupId;
	}
};
/**
* Get the class group ID for an arbitrary property.
*
* @param className - The class name to get the group ID for. Is expected to be string starting with `[` and ending with `]`.
*/
var getGroupIdForArbitraryProperty = (className) => className.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
	const content = className.slice(1, -1);
	const colonIndex = content.indexOf(":");
	const property = content.slice(0, colonIndex);
	return property ? ARBITRARY_PROPERTY_PREFIX + property : void 0;
})();
/**
* Exported for testing only
*/
var createClassMap = (config) => {
	const { theme, classGroups } = config;
	return processClassGroups(classGroups, theme);
};
var processClassGroups = (classGroups, theme) => {
	const classMap = createClassPartObject();
	for (const classGroupId in classGroups) {
		const group = classGroups[classGroupId];
		processClassesRecursively(group, classMap, classGroupId, theme);
	}
	return classMap;
};
var processClassesRecursively = (classGroup, classPartObject, classGroupId, theme) => {
	const len = classGroup.length;
	for (let i = 0; i < len; i++) {
		const classDefinition = classGroup[i];
		processClassDefinition(classDefinition, classPartObject, classGroupId, theme);
	}
};
var processClassDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
	if (typeof classDefinition === "string") {
		processStringDefinition(classDefinition, classPartObject, classGroupId);
		return;
	}
	if (typeof classDefinition === "function") {
		processFunctionDefinition(classDefinition, classPartObject, classGroupId, theme);
		return;
	}
	processObjectDefinition(classDefinition, classPartObject, classGroupId, theme);
};
var processStringDefinition = (classDefinition, classPartObject, classGroupId) => {
	const classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
	classPartObjectToEdit.classGroupId = classGroupId;
};
var processFunctionDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
	if (isThemeGetter(classDefinition)) {
		processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
		return;
	}
	if (classPartObject.validators === null) classPartObject.validators = [];
	classPartObject.validators.push(createClassValidatorObject(classGroupId, classDefinition));
};
var processObjectDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
	const entries = Object.entries(classDefinition);
	const len = entries.length;
	for (let i = 0; i < len; i++) {
		const [key, value] = entries[i];
		processClassesRecursively(value, getPart(classPartObject, key), classGroupId, theme);
	}
};
var getPart = (classPartObject, path) => {
	let current = classPartObject;
	const parts = path.split(CLASS_PART_SEPARATOR);
	const len = parts.length;
	for (let i = 0; i < len; i++) {
		const part = parts[i];
		let next = current.nextPart.get(part);
		if (!next) {
			next = createClassPartObject();
			current.nextPart.set(part, next);
		}
		current = next;
	}
	return current;
};
var isThemeGetter = (func) => "isThemeGetter" in func && func.isThemeGetter === true;
var createLruCache = (maxCacheSize) => {
	if (maxCacheSize < 1) return {
		get: () => void 0,
		set: () => {}
	};
	let cacheSize = 0;
	let cache = Object.create(null);
	let previousCache = Object.create(null);
	const update = (key, value) => {
		cache[key] = value;
		cacheSize++;
		if (cacheSize > maxCacheSize) {
			cacheSize = 0;
			previousCache = cache;
			cache = Object.create(null);
		}
	};
	return {
		get(key) {
			let value = cache[key];
			if (value !== void 0) return value;
			if ((value = previousCache[key]) !== void 0) {
				update(key, value);
				return value;
			}
		},
		set(key, value) {
			if (key in cache) cache[key] = value;
			else update(key, value);
		}
	};
};
var IMPORTANT_MODIFIER = "!";
var MODIFIER_SEPARATOR = ":";
var EMPTY_MODIFIERS = [];
var createResultObject = (modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition, isExternal) => ({
	modifiers,
	hasImportantModifier,
	baseClassName,
	maybePostfixModifierPosition,
	isExternal
});
var createParseClassName = (config) => {
	const { prefix, experimentalParseClassName } = config;
	/**
	* Parse class name into parts.
	*
	* Inspired by `splitAtTopLevelOnly` used in Tailwind CSS
	* @see https://github.com/tailwindlabs/tailwindcss/blob/v3.2.2/src/util/splitAtTopLevelOnly.js
	*/
	let parseClassName = (className) => {
		const modifiers = [];
		let bracketDepth = 0;
		let parenDepth = 0;
		let modifierStart = 0;
		let postfixModifierPosition;
		const len = className.length;
		for (let index = 0; index < len; index++) {
			const currentCharacter = className[index];
			if (bracketDepth === 0 && parenDepth === 0) {
				if (currentCharacter === MODIFIER_SEPARATOR) {
					modifiers.push(className.slice(modifierStart, index));
					modifierStart = index + 1;
					continue;
				}
				if (currentCharacter === "/") {
					postfixModifierPosition = index;
					continue;
				}
			}
			if (currentCharacter === "[") bracketDepth++;
			else if (currentCharacter === "]") bracketDepth--;
			else if (currentCharacter === "(") parenDepth++;
			else if (currentCharacter === ")") parenDepth--;
		}
		const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.slice(modifierStart);
		let baseClassName = baseClassNameWithImportantModifier;
		let hasImportantModifier = false;
		if (baseClassNameWithImportantModifier.endsWith(IMPORTANT_MODIFIER)) {
			baseClassName = baseClassNameWithImportantModifier.slice(0, -1);
			hasImportantModifier = true;
		} else if (baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER)) {
			baseClassName = baseClassNameWithImportantModifier.slice(1);
			hasImportantModifier = true;
		}
		const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0;
		return createResultObject(modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition);
	};
	if (prefix) {
		const fullPrefix = prefix + MODIFIER_SEPARATOR;
		const parseClassNameOriginal = parseClassName;
		parseClassName = (className) => className.startsWith(fullPrefix) ? parseClassNameOriginal(className.slice(fullPrefix.length)) : createResultObject(EMPTY_MODIFIERS, false, className, void 0, true);
	}
	if (experimentalParseClassName) {
		const parseClassNameOriginal = parseClassName;
		parseClassName = (className) => experimentalParseClassName({
			className,
			parseClassName: parseClassNameOriginal
		});
	}
	return parseClassName;
};
/**
* Sorts modifiers according to following schema:
* - Predefined modifiers are sorted alphabetically
* - When an arbitrary variant appears, it must be preserved which modifiers are before and after it
*/
var createSortModifiers = (config) => {
	const modifierWeights = /* @__PURE__ */ new Map();
	config.orderSensitiveModifiers.forEach((mod, index) => {
		modifierWeights.set(mod, 1e6 + index);
	});
	return (modifiers) => {
		const result = [];
		let currentSegment = [];
		for (let i = 0; i < modifiers.length; i++) {
			const modifier = modifiers[i];
			const isArbitrary = modifier[0] === "[";
			const isOrderSensitive = modifierWeights.has(modifier);
			if (isArbitrary || isOrderSensitive) {
				if (currentSegment.length > 0) {
					currentSegment.sort();
					result.push(...currentSegment);
					currentSegment = [];
				}
				result.push(modifier);
			} else currentSegment.push(modifier);
		}
		if (currentSegment.length > 0) {
			currentSegment.sort();
			result.push(...currentSegment);
		}
		return result;
	};
};
var createConfigUtils = (config) => ({
	cache: createLruCache(config.cacheSize),
	parseClassName: createParseClassName(config),
	sortModifiers: createSortModifiers(config),
	...createClassGroupUtils(config)
});
var SPLIT_CLASSES_REGEX = /\s+/;
var mergeClassList = (classList, configUtils) => {
	const { parseClassName, getClassGroupId, getConflictingClassGroupIds, sortModifiers } = configUtils;
	/**
	* Set of classGroupIds in following format:
	* `{importantModifier}{variantModifiers}{classGroupId}`
	* @example 'float'
	* @example 'hover:focus:bg-color'
	* @example 'md:!pr'
	*/
	const classGroupsInConflict = [];
	const classNames = classList.trim().split(SPLIT_CLASSES_REGEX);
	let result = "";
	for (let index = classNames.length - 1; index >= 0; index -= 1) {
		const originalClassName = classNames[index];
		const { isExternal, modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition } = parseClassName(originalClassName);
		if (isExternal) {
			result = originalClassName + (result.length > 0 ? " " + result : result);
			continue;
		}
		let hasPostfixModifier = !!maybePostfixModifierPosition;
		let classGroupId = getClassGroupId(hasPostfixModifier ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
		if (!classGroupId) {
			if (!hasPostfixModifier) {
				result = originalClassName + (result.length > 0 ? " " + result : result);
				continue;
			}
			classGroupId = getClassGroupId(baseClassName);
			if (!classGroupId) {
				result = originalClassName + (result.length > 0 ? " " + result : result);
				continue;
			}
			hasPostfixModifier = false;
		}
		const variantModifier = modifiers.length === 0 ? "" : modifiers.length === 1 ? modifiers[0] : sortModifiers(modifiers).join(":");
		const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
		const classId = modifierId + classGroupId;
		if (classGroupsInConflict.indexOf(classId) > -1) continue;
		classGroupsInConflict.push(classId);
		const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
		for (let i = 0; i < conflictGroups.length; ++i) {
			const group = conflictGroups[i];
			classGroupsInConflict.push(modifierId + group);
		}
		result = originalClassName + (result.length > 0 ? " " + result : result);
	}
	return result;
};
/**
* The code in this file is copied from https://github.com/lukeed/clsx and modified to suit the needs of tailwind-merge better.
*
* Specifically:
* - Runtime code from https://github.com/lukeed/clsx/blob/v1.2.1/src/index.js
* - TypeScript types from https://github.com/lukeed/clsx/blob/v1.2.1/clsx.d.ts
*
* Original code has MIT license: Copyright (c) Luke Edwards <luke.edwards05@gmail.com> (lukeed.com)
*/
var twJoin = (...classLists) => {
	let index = 0;
	let argument;
	let resolvedValue;
	let string = "";
	while (index < classLists.length) if (argument = classLists[index++]) {
		if (resolvedValue = toValue(argument)) {
			string && (string += " ");
			string += resolvedValue;
		}
	}
	return string;
};
var toValue = (mix) => {
	if (typeof mix === "string") return mix;
	let resolvedValue;
	let string = "";
	for (let k = 0; k < mix.length; k++) if (mix[k]) {
		if (resolvedValue = toValue(mix[k])) {
			string && (string += " ");
			string += resolvedValue;
		}
	}
	return string;
};
var createTailwindMerge = (createConfigFirst, ...createConfigRest) => {
	let configUtils;
	let cacheGet;
	let cacheSet;
	let functionToCall;
	const initTailwindMerge = (classList) => {
		configUtils = createConfigUtils(createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst()));
		cacheGet = configUtils.cache.get;
		cacheSet = configUtils.cache.set;
		functionToCall = tailwindMerge;
		return tailwindMerge(classList);
	};
	const tailwindMerge = (classList) => {
		const cachedResult = cacheGet(classList);
		if (cachedResult) return cachedResult;
		const result = mergeClassList(classList, configUtils);
		cacheSet(classList, result);
		return result;
	};
	functionToCall = initTailwindMerge;
	return (...args) => functionToCall(twJoin(...args));
};
var fallbackThemeArr = [];
var fromTheme = (key) => {
	const themeGetter = (theme) => theme[key] || fallbackThemeArr;
	themeGetter.isThemeGetter = true;
	return themeGetter;
};
var arbitraryValueRegex = /^\[(?:(\w[\w-]*):)?(.+)\]$/i;
var arbitraryVariableRegex = /^\((?:(\w[\w-]*):)?(.+)\)$/i;
var fractionRegex = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/;
var tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
var lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
var colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/;
var shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
var imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
var isFraction = (value) => fractionRegex.test(value);
var isNumber = (value) => !!value && !Number.isNaN(Number(value));
var isInteger = (value) => !!value && Number.isInteger(Number(value));
var isPercent = (value) => value.endsWith("%") && isNumber(value.slice(0, -1));
var isTshirtSize = (value) => tshirtUnitRegex.test(value);
var isAny = () => true;
var isLengthOnly = (value) => lengthUnitRegex.test(value) && !colorFunctionRegex.test(value);
var isNever = () => false;
var isShadow = (value) => shadowRegex.test(value);
var isImage = (value) => imageRegex.test(value);
var isAnyNonArbitrary = (value) => !isArbitraryValue(value) && !isArbitraryVariable(value);
var isArbitrarySize = (value) => getIsArbitraryValue(value, isLabelSize, isNever);
var isArbitraryValue = (value) => arbitraryValueRegex.test(value);
var isArbitraryLength = (value) => getIsArbitraryValue(value, isLabelLength, isLengthOnly);
var isArbitraryNumber = (value) => getIsArbitraryValue(value, isLabelNumber, isNumber);
var isArbitraryWeight = (value) => getIsArbitraryValue(value, isLabelWeight, isAny);
var isArbitraryFamilyName = (value) => getIsArbitraryValue(value, isLabelFamilyName, isNever);
var isArbitraryPosition = (value) => getIsArbitraryValue(value, isLabelPosition, isNever);
var isArbitraryImage = (value) => getIsArbitraryValue(value, isLabelImage, isImage);
var isArbitraryShadow = (value) => getIsArbitraryValue(value, isLabelShadow, isShadow);
var isArbitraryVariable = (value) => arbitraryVariableRegex.test(value);
var isArbitraryVariableLength = (value) => getIsArbitraryVariable(value, isLabelLength);
var isArbitraryVariableFamilyName = (value) => getIsArbitraryVariable(value, isLabelFamilyName);
var isArbitraryVariablePosition = (value) => getIsArbitraryVariable(value, isLabelPosition);
var isArbitraryVariableSize = (value) => getIsArbitraryVariable(value, isLabelSize);
var isArbitraryVariableImage = (value) => getIsArbitraryVariable(value, isLabelImage);
var isArbitraryVariableShadow = (value) => getIsArbitraryVariable(value, isLabelShadow, true);
var isArbitraryVariableWeight = (value) => getIsArbitraryVariable(value, isLabelWeight, true);
var getIsArbitraryValue = (value, testLabel, testValue) => {
	const result = arbitraryValueRegex.exec(value);
	if (result) {
		if (result[1]) return testLabel(result[1]);
		return testValue(result[2]);
	}
	return false;
};
var getIsArbitraryVariable = (value, testLabel, shouldMatchNoLabel = false) => {
	const result = arbitraryVariableRegex.exec(value);
	if (result) {
		if (result[1]) return testLabel(result[1]);
		return shouldMatchNoLabel;
	}
	return false;
};
var isLabelPosition = (label) => label === "position" || label === "percentage";
var isLabelImage = (label) => label === "image" || label === "url";
var isLabelSize = (label) => label === "length" || label === "size" || label === "bg-size";
var isLabelLength = (label) => label === "length";
var isLabelNumber = (label) => label === "number";
var isLabelFamilyName = (label) => label === "family-name";
var isLabelWeight = (label) => label === "number" || label === "weight";
var isLabelShadow = (label) => label === "shadow";
var getDefaultConfig = () => {
	/**
	* Theme getters for theme variable namespaces
	* @see https://tailwindcss.com/docs/theme#theme-variable-namespaces
	*/
	const themeColor = fromTheme("color");
	const themeFont = fromTheme("font");
	const themeText = fromTheme("text");
	const themeFontWeight = fromTheme("font-weight");
	const themeTracking = fromTheme("tracking");
	const themeLeading = fromTheme("leading");
	const themeBreakpoint = fromTheme("breakpoint");
	const themeContainer = fromTheme("container");
	const themeSpacing = fromTheme("spacing");
	const themeRadius = fromTheme("radius");
	const themeShadow = fromTheme("shadow");
	const themeInsetShadow = fromTheme("inset-shadow");
	const themeTextShadow = fromTheme("text-shadow");
	const themeDropShadow = fromTheme("drop-shadow");
	const themeBlur = fromTheme("blur");
	const themePerspective = fromTheme("perspective");
	const themeAspect = fromTheme("aspect");
	const themeEase = fromTheme("ease");
	const themeAnimate = fromTheme("animate");
	/**
	* Helpers to avoid repeating the same scales
	*
	* We use functions that create a new array every time they're called instead of static arrays.
	* This ensures that users who modify any scale by mutating the array (e.g. with `array.push(element)`) don't accidentally mutate arrays in other parts of the config.
	*/
	const scaleBreak = () => [
		"auto",
		"avoid",
		"all",
		"avoid-page",
		"page",
		"left",
		"right",
		"column"
	];
	const scalePosition = () => [
		"center",
		"top",
		"bottom",
		"left",
		"right",
		"top-left",
		"left-top",
		"top-right",
		"right-top",
		"bottom-right",
		"right-bottom",
		"bottom-left",
		"left-bottom"
	];
	const scalePositionWithArbitrary = () => [
		...scalePosition(),
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleOverflow = () => [
		"auto",
		"hidden",
		"clip",
		"visible",
		"scroll"
	];
	const scaleOverscroll = () => [
		"auto",
		"contain",
		"none"
	];
	const scaleUnambiguousSpacing = () => [
		isArbitraryVariable,
		isArbitraryValue,
		themeSpacing
	];
	const scaleInset = () => [
		isFraction,
		"full",
		"auto",
		...scaleUnambiguousSpacing()
	];
	const scaleGridTemplateColsRows = () => [
		isInteger,
		"none",
		"subgrid",
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleGridColRowStartAndEnd = () => [
		"auto",
		{ span: [
			"full",
			isInteger,
			isArbitraryVariable,
			isArbitraryValue
		] },
		isInteger,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleGridColRowStartOrEnd = () => [
		isInteger,
		"auto",
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleGridAutoColsRows = () => [
		"auto",
		"min",
		"max",
		"fr",
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleAlignPrimaryAxis = () => [
		"start",
		"end",
		"center",
		"between",
		"around",
		"evenly",
		"stretch",
		"baseline",
		"center-safe",
		"end-safe"
	];
	const scaleAlignSecondaryAxis = () => [
		"start",
		"end",
		"center",
		"stretch",
		"center-safe",
		"end-safe"
	];
	const scaleMargin = () => ["auto", ...scaleUnambiguousSpacing()];
	const scaleSizing = () => [
		isFraction,
		"auto",
		"full",
		"dvw",
		"dvh",
		"lvw",
		"lvh",
		"svw",
		"svh",
		"min",
		"max",
		"fit",
		...scaleUnambiguousSpacing()
	];
	const scaleSizingInline = () => [
		isFraction,
		"screen",
		"full",
		"dvw",
		"lvw",
		"svw",
		"min",
		"max",
		"fit",
		...scaleUnambiguousSpacing()
	];
	const scaleSizingBlock = () => [
		isFraction,
		"screen",
		"full",
		"lh",
		"dvh",
		"lvh",
		"svh",
		"min",
		"max",
		"fit",
		...scaleUnambiguousSpacing()
	];
	const scaleColor = () => [
		themeColor,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleBgPosition = () => [
		...scalePosition(),
		isArbitraryVariablePosition,
		isArbitraryPosition,
		{ position: [isArbitraryVariable, isArbitraryValue] }
	];
	const scaleBgRepeat = () => ["no-repeat", { repeat: [
		"",
		"x",
		"y",
		"space",
		"round"
	] }];
	const scaleBgSize = () => [
		"auto",
		"cover",
		"contain",
		isArbitraryVariableSize,
		isArbitrarySize,
		{ size: [isArbitraryVariable, isArbitraryValue] }
	];
	const scaleGradientStopPosition = () => [
		isPercent,
		isArbitraryVariableLength,
		isArbitraryLength
	];
	const scaleRadius = () => [
		"",
		"none",
		"full",
		themeRadius,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleBorderWidth = () => [
		"",
		isNumber,
		isArbitraryVariableLength,
		isArbitraryLength
	];
	const scaleLineStyle = () => [
		"solid",
		"dashed",
		"dotted",
		"double"
	];
	const scaleBlendMode = () => [
		"normal",
		"multiply",
		"screen",
		"overlay",
		"darken",
		"lighten",
		"color-dodge",
		"color-burn",
		"hard-light",
		"soft-light",
		"difference",
		"exclusion",
		"hue",
		"saturation",
		"color",
		"luminosity"
	];
	const scaleMaskImagePosition = () => [
		isNumber,
		isPercent,
		isArbitraryVariablePosition,
		isArbitraryPosition
	];
	const scaleBlur = () => [
		"",
		"none",
		themeBlur,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleRotate = () => [
		"none",
		isNumber,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleScale = () => [
		"none",
		isNumber,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleSkew = () => [
		isNumber,
		isArbitraryVariable,
		isArbitraryValue
	];
	const scaleTranslate = () => [
		isFraction,
		"full",
		...scaleUnambiguousSpacing()
	];
	return {
		cacheSize: 500,
		theme: {
			animate: [
				"spin",
				"ping",
				"pulse",
				"bounce"
			],
			aspect: ["video"],
			blur: [isTshirtSize],
			breakpoint: [isTshirtSize],
			color: [isAny],
			container: [isTshirtSize],
			"drop-shadow": [isTshirtSize],
			ease: [
				"in",
				"out",
				"in-out"
			],
			font: [isAnyNonArbitrary],
			"font-weight": [
				"thin",
				"extralight",
				"light",
				"normal",
				"medium",
				"semibold",
				"bold",
				"extrabold",
				"black"
			],
			"inset-shadow": [isTshirtSize],
			leading: [
				"none",
				"tight",
				"snug",
				"normal",
				"relaxed",
				"loose"
			],
			perspective: [
				"dramatic",
				"near",
				"normal",
				"midrange",
				"distant",
				"none"
			],
			radius: [isTshirtSize],
			shadow: [isTshirtSize],
			spacing: ["px", isNumber],
			text: [isTshirtSize],
			"text-shadow": [isTshirtSize],
			tracking: [
				"tighter",
				"tight",
				"normal",
				"wide",
				"wider",
				"widest"
			]
		},
		classGroups: {
			aspect: [{ aspect: [
				"auto",
				"square",
				isFraction,
				isArbitraryValue,
				isArbitraryVariable,
				themeAspect
			] }],
			container: ["container"],
			columns: [{ columns: [
				isNumber,
				isArbitraryValue,
				isArbitraryVariable,
				themeContainer
			] }],
			"break-after": [{ "break-after": scaleBreak() }],
			"break-before": [{ "break-before": scaleBreak() }],
			"break-inside": [{ "break-inside": [
				"auto",
				"avoid",
				"avoid-page",
				"avoid-column"
			] }],
			"box-decoration": [{ "box-decoration": ["slice", "clone"] }],
			box: [{ box: ["border", "content"] }],
			display: [
				"block",
				"inline-block",
				"inline",
				"flex",
				"inline-flex",
				"table",
				"inline-table",
				"table-caption",
				"table-cell",
				"table-column",
				"table-column-group",
				"table-footer-group",
				"table-header-group",
				"table-row-group",
				"table-row",
				"flow-root",
				"grid",
				"inline-grid",
				"contents",
				"list-item",
				"hidden"
			],
			sr: ["sr-only", "not-sr-only"],
			float: [{ float: [
				"right",
				"left",
				"none",
				"start",
				"end"
			] }],
			clear: [{ clear: [
				"left",
				"right",
				"both",
				"none",
				"start",
				"end"
			] }],
			isolation: ["isolate", "isolation-auto"],
			"object-fit": [{ object: [
				"contain",
				"cover",
				"fill",
				"none",
				"scale-down"
			] }],
			"object-position": [{ object: scalePositionWithArbitrary() }],
			overflow: [{ overflow: scaleOverflow() }],
			"overflow-x": [{ "overflow-x": scaleOverflow() }],
			"overflow-y": [{ "overflow-y": scaleOverflow() }],
			overscroll: [{ overscroll: scaleOverscroll() }],
			"overscroll-x": [{ "overscroll-x": scaleOverscroll() }],
			"overscroll-y": [{ "overscroll-y": scaleOverscroll() }],
			position: [
				"static",
				"fixed",
				"absolute",
				"relative",
				"sticky"
			],
			inset: [{ inset: scaleInset() }],
			"inset-x": [{ "inset-x": scaleInset() }],
			"inset-y": [{ "inset-y": scaleInset() }],
			start: [{
				"inset-s": scaleInset(),
				start: scaleInset()
			}],
			end: [{
				"inset-e": scaleInset(),
				end: scaleInset()
			}],
			"inset-bs": [{ "inset-bs": scaleInset() }],
			"inset-be": [{ "inset-be": scaleInset() }],
			top: [{ top: scaleInset() }],
			right: [{ right: scaleInset() }],
			bottom: [{ bottom: scaleInset() }],
			left: [{ left: scaleInset() }],
			visibility: [
				"visible",
				"invisible",
				"collapse"
			],
			z: [{ z: [
				isInteger,
				"auto",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			basis: [{ basis: [
				isFraction,
				"full",
				"auto",
				themeContainer,
				...scaleUnambiguousSpacing()
			] }],
			"flex-direction": [{ flex: [
				"row",
				"row-reverse",
				"col",
				"col-reverse"
			] }],
			"flex-wrap": [{ flex: [
				"nowrap",
				"wrap",
				"wrap-reverse"
			] }],
			flex: [{ flex: [
				isNumber,
				isFraction,
				"auto",
				"initial",
				"none",
				isArbitraryValue
			] }],
			grow: [{ grow: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			shrink: [{ shrink: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			order: [{ order: [
				isInteger,
				"first",
				"last",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"grid-cols": [{ "grid-cols": scaleGridTemplateColsRows() }],
			"col-start-end": [{ col: scaleGridColRowStartAndEnd() }],
			"col-start": [{ "col-start": scaleGridColRowStartOrEnd() }],
			"col-end": [{ "col-end": scaleGridColRowStartOrEnd() }],
			"grid-rows": [{ "grid-rows": scaleGridTemplateColsRows() }],
			"row-start-end": [{ row: scaleGridColRowStartAndEnd() }],
			"row-start": [{ "row-start": scaleGridColRowStartOrEnd() }],
			"row-end": [{ "row-end": scaleGridColRowStartOrEnd() }],
			"grid-flow": [{ "grid-flow": [
				"row",
				"col",
				"dense",
				"row-dense",
				"col-dense"
			] }],
			"auto-cols": [{ "auto-cols": scaleGridAutoColsRows() }],
			"auto-rows": [{ "auto-rows": scaleGridAutoColsRows() }],
			gap: [{ gap: scaleUnambiguousSpacing() }],
			"gap-x": [{ "gap-x": scaleUnambiguousSpacing() }],
			"gap-y": [{ "gap-y": scaleUnambiguousSpacing() }],
			"justify-content": [{ justify: [...scaleAlignPrimaryAxis(), "normal"] }],
			"justify-items": [{ "justify-items": [...scaleAlignSecondaryAxis(), "normal"] }],
			"justify-self": [{ "justify-self": ["auto", ...scaleAlignSecondaryAxis()] }],
			"align-content": [{ content: ["normal", ...scaleAlignPrimaryAxis()] }],
			"align-items": [{ items: [...scaleAlignSecondaryAxis(), { baseline: ["", "last"] }] }],
			"align-self": [{ self: [
				"auto",
				...scaleAlignSecondaryAxis(),
				{ baseline: ["", "last"] }
			] }],
			"place-content": [{ "place-content": scaleAlignPrimaryAxis() }],
			"place-items": [{ "place-items": [...scaleAlignSecondaryAxis(), "baseline"] }],
			"place-self": [{ "place-self": ["auto", ...scaleAlignSecondaryAxis()] }],
			p: [{ p: scaleUnambiguousSpacing() }],
			px: [{ px: scaleUnambiguousSpacing() }],
			py: [{ py: scaleUnambiguousSpacing() }],
			ps: [{ ps: scaleUnambiguousSpacing() }],
			pe: [{ pe: scaleUnambiguousSpacing() }],
			pbs: [{ pbs: scaleUnambiguousSpacing() }],
			pbe: [{ pbe: scaleUnambiguousSpacing() }],
			pt: [{ pt: scaleUnambiguousSpacing() }],
			pr: [{ pr: scaleUnambiguousSpacing() }],
			pb: [{ pb: scaleUnambiguousSpacing() }],
			pl: [{ pl: scaleUnambiguousSpacing() }],
			m: [{ m: scaleMargin() }],
			mx: [{ mx: scaleMargin() }],
			my: [{ my: scaleMargin() }],
			ms: [{ ms: scaleMargin() }],
			me: [{ me: scaleMargin() }],
			mbs: [{ mbs: scaleMargin() }],
			mbe: [{ mbe: scaleMargin() }],
			mt: [{ mt: scaleMargin() }],
			mr: [{ mr: scaleMargin() }],
			mb: [{ mb: scaleMargin() }],
			ml: [{ ml: scaleMargin() }],
			"space-x": [{ "space-x": scaleUnambiguousSpacing() }],
			"space-x-reverse": ["space-x-reverse"],
			"space-y": [{ "space-y": scaleUnambiguousSpacing() }],
			"space-y-reverse": ["space-y-reverse"],
			size: [{ size: scaleSizing() }],
			"inline-size": [{ inline: ["auto", ...scaleSizingInline()] }],
			"min-inline-size": [{ "min-inline": ["auto", ...scaleSizingInline()] }],
			"max-inline-size": [{ "max-inline": ["none", ...scaleSizingInline()] }],
			"block-size": [{ block: ["auto", ...scaleSizingBlock()] }],
			"min-block-size": [{ "min-block": ["auto", ...scaleSizingBlock()] }],
			"max-block-size": [{ "max-block": ["none", ...scaleSizingBlock()] }],
			w: [{ w: [
				themeContainer,
				"screen",
				...scaleSizing()
			] }],
			"min-w": [{ "min-w": [
				themeContainer,
				"screen",
				"none",
				...scaleSizing()
			] }],
			"max-w": [{ "max-w": [
				themeContainer,
				"screen",
				"none",
				"prose",
				{ screen: [themeBreakpoint] },
				...scaleSizing()
			] }],
			h: [{ h: [
				"screen",
				"lh",
				...scaleSizing()
			] }],
			"min-h": [{ "min-h": [
				"screen",
				"lh",
				"none",
				...scaleSizing()
			] }],
			"max-h": [{ "max-h": [
				"screen",
				"lh",
				...scaleSizing()
			] }],
			"font-size": [{ text: [
				"base",
				themeText,
				isArbitraryVariableLength,
				isArbitraryLength
			] }],
			"font-smoothing": ["antialiased", "subpixel-antialiased"],
			"font-style": ["italic", "not-italic"],
			"font-weight": [{ font: [
				themeFontWeight,
				isArbitraryVariableWeight,
				isArbitraryWeight
			] }],
			"font-stretch": [{ "font-stretch": [
				"ultra-condensed",
				"extra-condensed",
				"condensed",
				"semi-condensed",
				"normal",
				"semi-expanded",
				"expanded",
				"extra-expanded",
				"ultra-expanded",
				isPercent,
				isArbitraryValue
			] }],
			"font-family": [{ font: [
				isArbitraryVariableFamilyName,
				isArbitraryFamilyName,
				themeFont
			] }],
			"font-features": [{ "font-features": [isArbitraryValue] }],
			"fvn-normal": ["normal-nums"],
			"fvn-ordinal": ["ordinal"],
			"fvn-slashed-zero": ["slashed-zero"],
			"fvn-figure": ["lining-nums", "oldstyle-nums"],
			"fvn-spacing": ["proportional-nums", "tabular-nums"],
			"fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
			tracking: [{ tracking: [
				themeTracking,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"line-clamp": [{ "line-clamp": [
				isNumber,
				"none",
				isArbitraryVariable,
				isArbitraryNumber
			] }],
			leading: [{ leading: [themeLeading, ...scaleUnambiguousSpacing()] }],
			"list-image": [{ "list-image": [
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"list-style-position": [{ list: ["inside", "outside"] }],
			"list-style-type": [{ list: [
				"disc",
				"decimal",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"text-alignment": [{ text: [
				"left",
				"center",
				"right",
				"justify",
				"start",
				"end"
			] }],
			"placeholder-color": [{ placeholder: scaleColor() }],
			"text-color": [{ text: scaleColor() }],
			"text-decoration": [
				"underline",
				"overline",
				"line-through",
				"no-underline"
			],
			"text-decoration-style": [{ decoration: [...scaleLineStyle(), "wavy"] }],
			"text-decoration-thickness": [{ decoration: [
				isNumber,
				"from-font",
				"auto",
				isArbitraryVariable,
				isArbitraryLength
			] }],
			"text-decoration-color": [{ decoration: scaleColor() }],
			"underline-offset": [{ "underline-offset": [
				isNumber,
				"auto",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"text-transform": [
				"uppercase",
				"lowercase",
				"capitalize",
				"normal-case"
			],
			"text-overflow": [
				"truncate",
				"text-ellipsis",
				"text-clip"
			],
			"text-wrap": [{ text: [
				"wrap",
				"nowrap",
				"balance",
				"pretty"
			] }],
			indent: [{ indent: scaleUnambiguousSpacing() }],
			"vertical-align": [{ align: [
				"baseline",
				"top",
				"middle",
				"bottom",
				"text-top",
				"text-bottom",
				"sub",
				"super",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			whitespace: [{ whitespace: [
				"normal",
				"nowrap",
				"pre",
				"pre-line",
				"pre-wrap",
				"break-spaces"
			] }],
			break: [{ break: [
				"normal",
				"words",
				"all",
				"keep"
			] }],
			wrap: [{ wrap: [
				"break-word",
				"anywhere",
				"normal"
			] }],
			hyphens: [{ hyphens: [
				"none",
				"manual",
				"auto"
			] }],
			content: [{ content: [
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"bg-attachment": [{ bg: [
				"fixed",
				"local",
				"scroll"
			] }],
			"bg-clip": [{ "bg-clip": [
				"border",
				"padding",
				"content",
				"text"
			] }],
			"bg-origin": [{ "bg-origin": [
				"border",
				"padding",
				"content"
			] }],
			"bg-position": [{ bg: scaleBgPosition() }],
			"bg-repeat": [{ bg: scaleBgRepeat() }],
			"bg-size": [{ bg: scaleBgSize() }],
			"bg-image": [{ bg: [
				"none",
				{
					linear: [
						{ to: [
							"t",
							"tr",
							"r",
							"br",
							"b",
							"bl",
							"l",
							"tl"
						] },
						isInteger,
						isArbitraryVariable,
						isArbitraryValue
					],
					radial: [
						"",
						isArbitraryVariable,
						isArbitraryValue
					],
					conic: [
						isInteger,
						isArbitraryVariable,
						isArbitraryValue
					]
				},
				isArbitraryVariableImage,
				isArbitraryImage
			] }],
			"bg-color": [{ bg: scaleColor() }],
			"gradient-from-pos": [{ from: scaleGradientStopPosition() }],
			"gradient-via-pos": [{ via: scaleGradientStopPosition() }],
			"gradient-to-pos": [{ to: scaleGradientStopPosition() }],
			"gradient-from": [{ from: scaleColor() }],
			"gradient-via": [{ via: scaleColor() }],
			"gradient-to": [{ to: scaleColor() }],
			rounded: [{ rounded: scaleRadius() }],
			"rounded-s": [{ "rounded-s": scaleRadius() }],
			"rounded-e": [{ "rounded-e": scaleRadius() }],
			"rounded-t": [{ "rounded-t": scaleRadius() }],
			"rounded-r": [{ "rounded-r": scaleRadius() }],
			"rounded-b": [{ "rounded-b": scaleRadius() }],
			"rounded-l": [{ "rounded-l": scaleRadius() }],
			"rounded-ss": [{ "rounded-ss": scaleRadius() }],
			"rounded-se": [{ "rounded-se": scaleRadius() }],
			"rounded-ee": [{ "rounded-ee": scaleRadius() }],
			"rounded-es": [{ "rounded-es": scaleRadius() }],
			"rounded-tl": [{ "rounded-tl": scaleRadius() }],
			"rounded-tr": [{ "rounded-tr": scaleRadius() }],
			"rounded-br": [{ "rounded-br": scaleRadius() }],
			"rounded-bl": [{ "rounded-bl": scaleRadius() }],
			"border-w": [{ border: scaleBorderWidth() }],
			"border-w-x": [{ "border-x": scaleBorderWidth() }],
			"border-w-y": [{ "border-y": scaleBorderWidth() }],
			"border-w-s": [{ "border-s": scaleBorderWidth() }],
			"border-w-e": [{ "border-e": scaleBorderWidth() }],
			"border-w-bs": [{ "border-bs": scaleBorderWidth() }],
			"border-w-be": [{ "border-be": scaleBorderWidth() }],
			"border-w-t": [{ "border-t": scaleBorderWidth() }],
			"border-w-r": [{ "border-r": scaleBorderWidth() }],
			"border-w-b": [{ "border-b": scaleBorderWidth() }],
			"border-w-l": [{ "border-l": scaleBorderWidth() }],
			"divide-x": [{ "divide-x": scaleBorderWidth() }],
			"divide-x-reverse": ["divide-x-reverse"],
			"divide-y": [{ "divide-y": scaleBorderWidth() }],
			"divide-y-reverse": ["divide-y-reverse"],
			"border-style": [{ border: [
				...scaleLineStyle(),
				"hidden",
				"none"
			] }],
			"divide-style": [{ divide: [
				...scaleLineStyle(),
				"hidden",
				"none"
			] }],
			"border-color": [{ border: scaleColor() }],
			"border-color-x": [{ "border-x": scaleColor() }],
			"border-color-y": [{ "border-y": scaleColor() }],
			"border-color-s": [{ "border-s": scaleColor() }],
			"border-color-e": [{ "border-e": scaleColor() }],
			"border-color-bs": [{ "border-bs": scaleColor() }],
			"border-color-be": [{ "border-be": scaleColor() }],
			"border-color-t": [{ "border-t": scaleColor() }],
			"border-color-r": [{ "border-r": scaleColor() }],
			"border-color-b": [{ "border-b": scaleColor() }],
			"border-color-l": [{ "border-l": scaleColor() }],
			"divide-color": [{ divide: scaleColor() }],
			"outline-style": [{ outline: [
				...scaleLineStyle(),
				"none",
				"hidden"
			] }],
			"outline-offset": [{ "outline-offset": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"outline-w": [{ outline: [
				"",
				isNumber,
				isArbitraryVariableLength,
				isArbitraryLength
			] }],
			"outline-color": [{ outline: scaleColor() }],
			shadow: [{ shadow: [
				"",
				"none",
				themeShadow,
				isArbitraryVariableShadow,
				isArbitraryShadow
			] }],
			"shadow-color": [{ shadow: scaleColor() }],
			"inset-shadow": [{ "inset-shadow": [
				"none",
				themeInsetShadow,
				isArbitraryVariableShadow,
				isArbitraryShadow
			] }],
			"inset-shadow-color": [{ "inset-shadow": scaleColor() }],
			"ring-w": [{ ring: scaleBorderWidth() }],
			"ring-w-inset": ["ring-inset"],
			"ring-color": [{ ring: scaleColor() }],
			"ring-offset-w": [{ "ring-offset": [isNumber, isArbitraryLength] }],
			"ring-offset-color": [{ "ring-offset": scaleColor() }],
			"inset-ring-w": [{ "inset-ring": scaleBorderWidth() }],
			"inset-ring-color": [{ "inset-ring": scaleColor() }],
			"text-shadow": [{ "text-shadow": [
				"none",
				themeTextShadow,
				isArbitraryVariableShadow,
				isArbitraryShadow
			] }],
			"text-shadow-color": [{ "text-shadow": scaleColor() }],
			opacity: [{ opacity: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"mix-blend": [{ "mix-blend": [
				...scaleBlendMode(),
				"plus-darker",
				"plus-lighter"
			] }],
			"bg-blend": [{ "bg-blend": scaleBlendMode() }],
			"mask-clip": [{ "mask-clip": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }, "mask-no-clip"],
			"mask-composite": [{ mask: [
				"add",
				"subtract",
				"intersect",
				"exclude"
			] }],
			"mask-image-linear-pos": [{ "mask-linear": [isNumber] }],
			"mask-image-linear-from-pos": [{ "mask-linear-from": scaleMaskImagePosition() }],
			"mask-image-linear-to-pos": [{ "mask-linear-to": scaleMaskImagePosition() }],
			"mask-image-linear-from-color": [{ "mask-linear-from": scaleColor() }],
			"mask-image-linear-to-color": [{ "mask-linear-to": scaleColor() }],
			"mask-image-t-from-pos": [{ "mask-t-from": scaleMaskImagePosition() }],
			"mask-image-t-to-pos": [{ "mask-t-to": scaleMaskImagePosition() }],
			"mask-image-t-from-color": [{ "mask-t-from": scaleColor() }],
			"mask-image-t-to-color": [{ "mask-t-to": scaleColor() }],
			"mask-image-r-from-pos": [{ "mask-r-from": scaleMaskImagePosition() }],
			"mask-image-r-to-pos": [{ "mask-r-to": scaleMaskImagePosition() }],
			"mask-image-r-from-color": [{ "mask-r-from": scaleColor() }],
			"mask-image-r-to-color": [{ "mask-r-to": scaleColor() }],
			"mask-image-b-from-pos": [{ "mask-b-from": scaleMaskImagePosition() }],
			"mask-image-b-to-pos": [{ "mask-b-to": scaleMaskImagePosition() }],
			"mask-image-b-from-color": [{ "mask-b-from": scaleColor() }],
			"mask-image-b-to-color": [{ "mask-b-to": scaleColor() }],
			"mask-image-l-from-pos": [{ "mask-l-from": scaleMaskImagePosition() }],
			"mask-image-l-to-pos": [{ "mask-l-to": scaleMaskImagePosition() }],
			"mask-image-l-from-color": [{ "mask-l-from": scaleColor() }],
			"mask-image-l-to-color": [{ "mask-l-to": scaleColor() }],
			"mask-image-x-from-pos": [{ "mask-x-from": scaleMaskImagePosition() }],
			"mask-image-x-to-pos": [{ "mask-x-to": scaleMaskImagePosition() }],
			"mask-image-x-from-color": [{ "mask-x-from": scaleColor() }],
			"mask-image-x-to-color": [{ "mask-x-to": scaleColor() }],
			"mask-image-y-from-pos": [{ "mask-y-from": scaleMaskImagePosition() }],
			"mask-image-y-to-pos": [{ "mask-y-to": scaleMaskImagePosition() }],
			"mask-image-y-from-color": [{ "mask-y-from": scaleColor() }],
			"mask-image-y-to-color": [{ "mask-y-to": scaleColor() }],
			"mask-image-radial": [{ "mask-radial": [isArbitraryVariable, isArbitraryValue] }],
			"mask-image-radial-from-pos": [{ "mask-radial-from": scaleMaskImagePosition() }],
			"mask-image-radial-to-pos": [{ "mask-radial-to": scaleMaskImagePosition() }],
			"mask-image-radial-from-color": [{ "mask-radial-from": scaleColor() }],
			"mask-image-radial-to-color": [{ "mask-radial-to": scaleColor() }],
			"mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
			"mask-image-radial-size": [{ "mask-radial": [{
				closest: ["side", "corner"],
				farthest: ["side", "corner"]
			}] }],
			"mask-image-radial-pos": [{ "mask-radial-at": scalePosition() }],
			"mask-image-conic-pos": [{ "mask-conic": [isNumber] }],
			"mask-image-conic-from-pos": [{ "mask-conic-from": scaleMaskImagePosition() }],
			"mask-image-conic-to-pos": [{ "mask-conic-to": scaleMaskImagePosition() }],
			"mask-image-conic-from-color": [{ "mask-conic-from": scaleColor() }],
			"mask-image-conic-to-color": [{ "mask-conic-to": scaleColor() }],
			"mask-mode": [{ mask: [
				"alpha",
				"luminance",
				"match"
			] }],
			"mask-origin": [{ "mask-origin": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }],
			"mask-position": [{ mask: scaleBgPosition() }],
			"mask-repeat": [{ mask: scaleBgRepeat() }],
			"mask-size": [{ mask: scaleBgSize() }],
			"mask-type": [{ "mask-type": ["alpha", "luminance"] }],
			"mask-image": [{ mask: [
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			filter: [{ filter: [
				"",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			blur: [{ blur: scaleBlur() }],
			brightness: [{ brightness: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			contrast: [{ contrast: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"drop-shadow": [{ "drop-shadow": [
				"",
				"none",
				themeDropShadow,
				isArbitraryVariableShadow,
				isArbitraryShadow
			] }],
			"drop-shadow-color": [{ "drop-shadow": scaleColor() }],
			grayscale: [{ grayscale: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"hue-rotate": [{ "hue-rotate": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			invert: [{ invert: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			saturate: [{ saturate: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			sepia: [{ sepia: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"backdrop-filter": [{ "backdrop-filter": [
				"",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"backdrop-blur": [{ "backdrop-blur": scaleBlur() }],
			"backdrop-brightness": [{ "backdrop-brightness": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"backdrop-contrast": [{ "backdrop-contrast": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"backdrop-grayscale": [{ "backdrop-grayscale": [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"backdrop-hue-rotate": [{ "backdrop-hue-rotate": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"backdrop-invert": [{ "backdrop-invert": [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"backdrop-opacity": [{ "backdrop-opacity": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"backdrop-saturate": [{ "backdrop-saturate": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"backdrop-sepia": [{ "backdrop-sepia": [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"border-collapse": [{ border: ["collapse", "separate"] }],
			"border-spacing": [{ "border-spacing": scaleUnambiguousSpacing() }],
			"border-spacing-x": [{ "border-spacing-x": scaleUnambiguousSpacing() }],
			"border-spacing-y": [{ "border-spacing-y": scaleUnambiguousSpacing() }],
			"table-layout": [{ table: ["auto", "fixed"] }],
			caption: [{ caption: ["top", "bottom"] }],
			transition: [{ transition: [
				"",
				"all",
				"colors",
				"opacity",
				"shadow",
				"transform",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"transition-behavior": [{ transition: ["normal", "discrete"] }],
			duration: [{ duration: [
				isNumber,
				"initial",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			ease: [{ ease: [
				"linear",
				"initial",
				themeEase,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			delay: [{ delay: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			animate: [{ animate: [
				"none",
				themeAnimate,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			backface: [{ backface: ["hidden", "visible"] }],
			perspective: [{ perspective: [
				themePerspective,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"perspective-origin": [{ "perspective-origin": scalePositionWithArbitrary() }],
			rotate: [{ rotate: scaleRotate() }],
			"rotate-x": [{ "rotate-x": scaleRotate() }],
			"rotate-y": [{ "rotate-y": scaleRotate() }],
			"rotate-z": [{ "rotate-z": scaleRotate() }],
			scale: [{ scale: scaleScale() }],
			"scale-x": [{ "scale-x": scaleScale() }],
			"scale-y": [{ "scale-y": scaleScale() }],
			"scale-z": [{ "scale-z": scaleScale() }],
			"scale-3d": ["scale-3d"],
			skew: [{ skew: scaleSkew() }],
			"skew-x": [{ "skew-x": scaleSkew() }],
			"skew-y": [{ "skew-y": scaleSkew() }],
			transform: [{ transform: [
				isArbitraryVariable,
				isArbitraryValue,
				"",
				"none",
				"gpu",
				"cpu"
			] }],
			"transform-origin": [{ origin: scalePositionWithArbitrary() }],
			"transform-style": [{ transform: ["3d", "flat"] }],
			translate: [{ translate: scaleTranslate() }],
			"translate-x": [{ "translate-x": scaleTranslate() }],
			"translate-y": [{ "translate-y": scaleTranslate() }],
			"translate-z": [{ "translate-z": scaleTranslate() }],
			"translate-none": ["translate-none"],
			accent: [{ accent: scaleColor() }],
			appearance: [{ appearance: ["none", "auto"] }],
			"caret-color": [{ caret: scaleColor() }],
			"color-scheme": [{ scheme: [
				"normal",
				"dark",
				"light",
				"light-dark",
				"only-dark",
				"only-light"
			] }],
			cursor: [{ cursor: [
				"auto",
				"default",
				"pointer",
				"wait",
				"text",
				"move",
				"help",
				"not-allowed",
				"none",
				"context-menu",
				"progress",
				"cell",
				"crosshair",
				"vertical-text",
				"alias",
				"copy",
				"no-drop",
				"grab",
				"grabbing",
				"all-scroll",
				"col-resize",
				"row-resize",
				"n-resize",
				"e-resize",
				"s-resize",
				"w-resize",
				"ne-resize",
				"nw-resize",
				"se-resize",
				"sw-resize",
				"ew-resize",
				"ns-resize",
				"nesw-resize",
				"nwse-resize",
				"zoom-in",
				"zoom-out",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"field-sizing": [{ "field-sizing": ["fixed", "content"] }],
			"pointer-events": [{ "pointer-events": ["auto", "none"] }],
			resize: [{ resize: [
				"none",
				"",
				"y",
				"x"
			] }],
			"scroll-behavior": [{ scroll: ["auto", "smooth"] }],
			"scroll-m": [{ "scroll-m": scaleUnambiguousSpacing() }],
			"scroll-mx": [{ "scroll-mx": scaleUnambiguousSpacing() }],
			"scroll-my": [{ "scroll-my": scaleUnambiguousSpacing() }],
			"scroll-ms": [{ "scroll-ms": scaleUnambiguousSpacing() }],
			"scroll-me": [{ "scroll-me": scaleUnambiguousSpacing() }],
			"scroll-mbs": [{ "scroll-mbs": scaleUnambiguousSpacing() }],
			"scroll-mbe": [{ "scroll-mbe": scaleUnambiguousSpacing() }],
			"scroll-mt": [{ "scroll-mt": scaleUnambiguousSpacing() }],
			"scroll-mr": [{ "scroll-mr": scaleUnambiguousSpacing() }],
			"scroll-mb": [{ "scroll-mb": scaleUnambiguousSpacing() }],
			"scroll-ml": [{ "scroll-ml": scaleUnambiguousSpacing() }],
			"scroll-p": [{ "scroll-p": scaleUnambiguousSpacing() }],
			"scroll-px": [{ "scroll-px": scaleUnambiguousSpacing() }],
			"scroll-py": [{ "scroll-py": scaleUnambiguousSpacing() }],
			"scroll-ps": [{ "scroll-ps": scaleUnambiguousSpacing() }],
			"scroll-pe": [{ "scroll-pe": scaleUnambiguousSpacing() }],
			"scroll-pbs": [{ "scroll-pbs": scaleUnambiguousSpacing() }],
			"scroll-pbe": [{ "scroll-pbe": scaleUnambiguousSpacing() }],
			"scroll-pt": [{ "scroll-pt": scaleUnambiguousSpacing() }],
			"scroll-pr": [{ "scroll-pr": scaleUnambiguousSpacing() }],
			"scroll-pb": [{ "scroll-pb": scaleUnambiguousSpacing() }],
			"scroll-pl": [{ "scroll-pl": scaleUnambiguousSpacing() }],
			"snap-align": [{ snap: [
				"start",
				"end",
				"center",
				"align-none"
			] }],
			"snap-stop": [{ snap: ["normal", "always"] }],
			"snap-type": [{ snap: [
				"none",
				"x",
				"y",
				"both"
			] }],
			"snap-strictness": [{ snap: ["mandatory", "proximity"] }],
			touch: [{ touch: [
				"auto",
				"none",
				"manipulation"
			] }],
			"touch-x": [{ "touch-pan": [
				"x",
				"left",
				"right"
			] }],
			"touch-y": [{ "touch-pan": [
				"y",
				"up",
				"down"
			] }],
			"touch-pz": ["touch-pinch-zoom"],
			select: [{ select: [
				"none",
				"text",
				"all",
				"auto"
			] }],
			"will-change": [{ "will-change": [
				"auto",
				"scroll",
				"contents",
				"transform",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			fill: [{ fill: ["none", ...scaleColor()] }],
			"stroke-w": [{ stroke: [
				isNumber,
				isArbitraryVariableLength,
				isArbitraryLength,
				isArbitraryNumber
			] }],
			stroke: [{ stroke: ["none", ...scaleColor()] }],
			"forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }]
		},
		conflictingClassGroups: {
			overflow: ["overflow-x", "overflow-y"],
			overscroll: ["overscroll-x", "overscroll-y"],
			inset: [
				"inset-x",
				"inset-y",
				"inset-bs",
				"inset-be",
				"start",
				"end",
				"top",
				"right",
				"bottom",
				"left"
			],
			"inset-x": ["right", "left"],
			"inset-y": ["top", "bottom"],
			flex: [
				"basis",
				"grow",
				"shrink"
			],
			gap: ["gap-x", "gap-y"],
			p: [
				"px",
				"py",
				"ps",
				"pe",
				"pbs",
				"pbe",
				"pt",
				"pr",
				"pb",
				"pl"
			],
			px: ["pr", "pl"],
			py: ["pt", "pb"],
			m: [
				"mx",
				"my",
				"ms",
				"me",
				"mbs",
				"mbe",
				"mt",
				"mr",
				"mb",
				"ml"
			],
			mx: ["mr", "ml"],
			my: ["mt", "mb"],
			size: ["w", "h"],
			"font-size": ["leading"],
			"fvn-normal": [
				"fvn-ordinal",
				"fvn-slashed-zero",
				"fvn-figure",
				"fvn-spacing",
				"fvn-fraction"
			],
			"fvn-ordinal": ["fvn-normal"],
			"fvn-slashed-zero": ["fvn-normal"],
			"fvn-figure": ["fvn-normal"],
			"fvn-spacing": ["fvn-normal"],
			"fvn-fraction": ["fvn-normal"],
			"line-clamp": ["display", "overflow"],
			rounded: [
				"rounded-s",
				"rounded-e",
				"rounded-t",
				"rounded-r",
				"rounded-b",
				"rounded-l",
				"rounded-ss",
				"rounded-se",
				"rounded-ee",
				"rounded-es",
				"rounded-tl",
				"rounded-tr",
				"rounded-br",
				"rounded-bl"
			],
			"rounded-s": ["rounded-ss", "rounded-es"],
			"rounded-e": ["rounded-se", "rounded-ee"],
			"rounded-t": ["rounded-tl", "rounded-tr"],
			"rounded-r": ["rounded-tr", "rounded-br"],
			"rounded-b": ["rounded-br", "rounded-bl"],
			"rounded-l": ["rounded-tl", "rounded-bl"],
			"border-spacing": ["border-spacing-x", "border-spacing-y"],
			"border-w": [
				"border-w-x",
				"border-w-y",
				"border-w-s",
				"border-w-e",
				"border-w-bs",
				"border-w-be",
				"border-w-t",
				"border-w-r",
				"border-w-b",
				"border-w-l"
			],
			"border-w-x": ["border-w-r", "border-w-l"],
			"border-w-y": ["border-w-t", "border-w-b"],
			"border-color": [
				"border-color-x",
				"border-color-y",
				"border-color-s",
				"border-color-e",
				"border-color-bs",
				"border-color-be",
				"border-color-t",
				"border-color-r",
				"border-color-b",
				"border-color-l"
			],
			"border-color-x": ["border-color-r", "border-color-l"],
			"border-color-y": ["border-color-t", "border-color-b"],
			translate: [
				"translate-x",
				"translate-y",
				"translate-none"
			],
			"translate-none": [
				"translate",
				"translate-x",
				"translate-y",
				"translate-z"
			],
			"scroll-m": [
				"scroll-mx",
				"scroll-my",
				"scroll-ms",
				"scroll-me",
				"scroll-mbs",
				"scroll-mbe",
				"scroll-mt",
				"scroll-mr",
				"scroll-mb",
				"scroll-ml"
			],
			"scroll-mx": ["scroll-mr", "scroll-ml"],
			"scroll-my": ["scroll-mt", "scroll-mb"],
			"scroll-p": [
				"scroll-px",
				"scroll-py",
				"scroll-ps",
				"scroll-pe",
				"scroll-pbs",
				"scroll-pbe",
				"scroll-pt",
				"scroll-pr",
				"scroll-pb",
				"scroll-pl"
			],
			"scroll-px": ["scroll-pr", "scroll-pl"],
			"scroll-py": ["scroll-pt", "scroll-pb"],
			touch: [
				"touch-x",
				"touch-y",
				"touch-pz"
			],
			"touch-x": ["touch"],
			"touch-y": ["touch"],
			"touch-pz": ["touch"]
		},
		conflictingClassGroupModifiers: { "font-size": ["leading"] },
		orderSensitiveModifiers: [
			"*",
			"**",
			"after",
			"backdrop",
			"before",
			"details-content",
			"file",
			"first-letter",
			"first-line",
			"marker",
			"placeholder",
			"selection"
		]
	};
};
var twMerge = /* @__PURE__ */ createTailwindMerge(getDefaultConfig);
//#endregion
//#region src/lib/utils.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
//#region src/lib/google-drive.js
var authenticateGoogleDrive = async () => {
	return new Promise((resolve, reject) => {
		chrome.identity.getAuthToken({ interactive: true }, (token) => {
			if (chrome.runtime.lastError) {
				reject(new Error(chrome.runtime.lastError.message));
				return;
			}
			const tokenString = typeof token === "object" && token?.token ? token.token : token;
			if (!tokenString) {
				reject(/* @__PURE__ */ new Error("Failed to retrieve Google Auth token."));
				return;
			}
			resolve(tokenString);
		});
	});
};
var uploadVideoToDrive = async (token, videoBlob, filename, onProgress) => {
	const metadata = {
		name: filename,
		mimeType: videoBlob.type || "video/mp4"
	};
	const initResponse = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
			"X-Upload-Content-Type": metadata.mimeType,
			"X-Upload-Content-Length": videoBlob.size.toString()
		},
		body: JSON.stringify(metadata)
	});
	if (!initResponse.ok) {
		const errorText = await initResponse.text();
		throw new Error(`Drive Resumable Session init failed: ${initResponse.status} ${errorText}`);
	}
	const uploadUrl = initResponse.headers.get("Location");
	if (!uploadUrl) throw new Error("Drive API did not return a Location header for resumable upload.");
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open("PUT", uploadUrl, true);
		if (onProgress) xhr.upload.onprogress = (event) => {
			if (event.lengthComputable) {
				const percentComplete = event.loaded / event.total * 100;
				onProgress(Math.round(percentComplete));
			}
		};
		xhr.onload = () => {
			if (xhr.status >= 200 && xhr.status < 300) try {
				resolve(JSON.parse(xhr.responseText));
			} catch (e) {
				resolve(xhr.responseText);
			}
			else reject(/* @__PURE__ */ new Error(`Drive Upload failed: ${xhr.status} ${xhr.responseText}`));
		};
		xhr.onerror = () => {
			reject(/* @__PURE__ */ new Error("Drive Upload encountered a network error."));
		};
		xhr.setRequestHeader("Content-Type", metadata.mimeType);
		xhr.send(videoBlob);
	});
};
//#endregion
//#region src/components/VaultDashboard.tsx
var import_jsx_runtime = require_jsx_runtime();
/**
* Preview Player Component
* Handles the "YouTube-style" 10x2s hover preview
*/
var PreviewThumb = ({ video }) => {
	const [previewBlob, setPreviewBlob] = (0, import_react.useState)(null);
	const [isHovering, setIsHovering] = (0, import_react.useState)(false);
	const [isProcessing, setIsProcessing] = (0, import_react.useState)(false);
	const videoRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		let active = true;
		const checkPreview = async () => {
			const blob = await getPreview(video.url);
			if (blob && active) setPreviewBlob(URL.createObjectURL(blob));
		};
		checkPreview();
		return () => {
			active = false;
		};
	}, [video.url]);
	const handleMouseEnter = async () => {
		setIsHovering(true);
		if (previewBlob) return;
		const blob = await getPreview(video.url);
		if (blob) {
			setPreviewBlob(URL.createObjectURL(blob));
			return;
		}
		const elapsed = Date.now() - video.timestamp;
		if (elapsed > 3e4 && !isProcessing) {
			console.log(`[VaultAuth] Preview missing after ${elapsed}ms. Retriggering for:`, video.title);
			setIsProcessing(true);
			try {
				await import_browser_polyfill.default.runtime.sendMessage({
					action: "generate_preview",
					data: {
						url: video.rawVideoSrc || video.url,
						duration: typeof video.duration === "number" ? video.duration : 60
					}
				});
				const retryBlob = await getPreview(video.url);
				if (retryBlob) setPreviewBlob(URL.createObjectURL(retryBlob));
			} catch (e) {
				console.error("[VaultAuth] Manual retrigger failed:", e);
			} finally {
				setIsProcessing(false);
			}
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 z-20 overflow-hidden bg-black",
		onMouseEnter: handleMouseEnter,
		onMouseLeave: () => setIsHovering(false),
		children: [isHovering && previewBlob ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
			ref: videoRef,
			src: previewBlob,
			className: "w-full h-full object-cover",
			autoPlay: true,
			muted: true,
			loop: true,
			playsInline: true
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: video.thumbnail,
			alt: video.title,
			className: cn("w-full h-full object-cover transition-opacity duration-300", isHovering ? "opacity-0" : "opacity-100")
		}), isProcessing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {
				className: "text-vault-accent animate-spin",
				size: 20
			})
		}) : !previewBlob && isHovering && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute bottom-2 left-2 bg-black/60 text-[8px] text-white px-1 rounded uppercase tracking-tighter",
			children: "Processing..."
		})]
	});
};
var VaultDashboard = () => {
	const [items, setItems] = (0, import_react.useState)([]);
	const [search, setSearch] = (0, import_react.useState)("");
	const [searchField, setSearchField] = (0, import_react.useState)("title");
	const [currentSkin, setCurrentSkin] = (0, import_react.useState)(3);
	const [isSidebarOpen, setSidebarOpen] = (0, import_react.useState)(true);
	const [groupBy, setGroupBy] = (0, import_react.useState)("Hostname");
	const [sortBy, setSortBy] = (0, import_react.useState)("DateDesc");
	const [sortOrder, setSortOrder] = (0, import_react.useState)("desc");
	const [viewSize, setViewSize] = (0, import_react.useState)(3);
	const [isDimmed, setIsDimmed] = (0, import_react.useState)(false);
	const [isolatedGroup, setIsolatedGroup] = (0, import_react.useState)(null);
	const [pages, setPages] = (0, import_react.useState)({});
	const [sectionLimit, setSectionLimit] = (0, import_react.useState)(50);
	const mainRef = (0, import_react.useRef)(null);
	const [playingVideo, setPlayingVideo] = (0, import_react.useState)(null);
	const [videoError, setVideoError] = (0, import_react.useState)(false);
	const [isRefreshing, setIsRefreshing] = (0, import_react.useState)(false);
	const [editingItem, setEditingItem] = (0, import_react.useState)(null);
	const [selectedItems, setSelectedItems] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [lastSelectedUrl, setLastSelectedUrl] = (0, import_react.useState)(null);
	const [bulkProgress, setBulkProgress] = (0, import_react.useState)({
		current: 0,
		total: 0,
		active: false
	});
	const [scannerState, setScannerState] = (0, import_react.useState)(null);
	const [pinSettings, setPinSettings] = (0, import_react.useState)(null);
	const [activeCollection, setActiveCollection] = (0, import_react.useState)(null);
	const [isSyncing, setIsSyncing] = (0, import_react.useState)(false);
	const [isFirefox] = (0, import_react.useState)(() => navigator.userAgent.toLowerCase().includes("firefox"));
	(0, import_react.useEffect)(() => {
		const savedSkin = localStorage.getItem("vault-skin");
		if (savedSkin) {
			const skinNum = parseInt(savedSkin, 10);
			setCurrentSkin(skinNum);
			const mode = skinNum === 1 || skinNum === 4 || skinNum === 6 || skinNum === 9 ? "light" : "dark";
			document.documentElement.setAttribute("data-theme", `skin-${skinNum}`);
			document.documentElement.classList.toggle("dark", mode === "dark");
		} else {
			document.documentElement.setAttribute("data-theme", "skin-3");
			document.documentElement.classList.add("dark");
		}
		const load = async () => {
			setPinSettings(await getPinSettings());
			setItems(await getSavedVideos() || []);
		};
		load();
	}, []);
	const togglePin = async (e) => {
		if (e.target.checked) {
			const newPin = window.prompt("Enter a new 4 or 6 digit PIN:");
			if (newPin && (newPin.length === 4 || newPin.length === 6) && /^\d+$/.test(newPin)) {
				const updated = {
					...pinSettings,
					enabled: true,
					pin: newPin,
					lastUnlocked: Date.now()
				};
				await savePinSettings(updated);
				setPinSettings(updated);
			} else {
				alert("Invalid PIN. It must be 4 or 6 digits.");
				e.target.checked = false;
			}
		} else {
			const updated = {
				...pinSettings,
				enabled: false
			};
			await savePinSettings(updated);
			setPinSettings(updated);
		}
	};
	const updatePinLength = async (len) => {
		const updated = {
			...pinSettings,
			length: len
		};
		await savePinSettings(updated);
		setPinSettings(updated);
	};
	const updateLockTimeout = async (timeout) => {
		const updated = {
			...pinSettings,
			lockTimeout: timeout
		};
		await savePinSettings(updated);
		setPinSettings(updated);
	};
	const [uploadingItem, setUploadingItem] = (0, import_react.useState)(null);
	const handleBulkDownload = async () => {
		const targets = items.filter((i) => selectedItems.has(i.url) && i.rawVideoSrc);
		if (!targets.length) {
			alert("No selected items have a valid media source for download.");
			return;
		}
		if (!window.confirm(`Download ${targets.length} items locally?`)) return;
		for (let i = 0; i < targets.length; i++) {
			const fav = targets[i];
			let ext = ".mp4";
			if (fav.type === "audio") ext = ".mp3";
			else if (fav.type === "image") ext = ".jpg";
			else if (fav.type === "torrent") ext = ".torrent";
			const filename = fav.title ? fav.title.replace(/[^a-z0-9]/gi, "_").toLowerCase() + ext : `vault_media_${i}${ext}`;
			try {
				await import_browser_polyfill.default.downloads.download({
					url: fav.rawVideoSrc,
					filename,
					saveAs: false
				});
			} catch (e) {
				console.error("Failed to download", fav.title, e);
			}
		}
		setSelectedItems(/* @__PURE__ */ new Set());
	};
	const handleBulkDriveUpload = async () => {
		const targets = items.filter((i) => selectedItems.has(i.url) && i.rawVideoSrc);
		if (!targets.length) {
			alert("No selected items have a valid media source for upload.");
			return;
		}
		if (!window.confirm(`Upload ${targets.length} items to Google Drive?`)) return;
		setBulkProgress({
			current: 0,
			total: targets.length,
			active: true
		});
		try {
			const token = await authenticateGoogleDrive();
			let count = 0;
			for (const fav of targets) try {
				if (!fav.rawVideoSrc) continue;
				const blob = await (await fetch(fav.rawVideoSrc)).blob();
				let ext = ".mp4";
				if (fav.type === "audio") ext = ".mp3";
				else if (fav.type === "image") ext = ".jpg";
				else if (fav.type === "torrent") ext = ".torrent";
				await uploadVideoToDrive(token, blob, fav.title ? fav.title + ext : "Untitled-Media" + ext);
				count++;
				setBulkProgress((p) => ({
					...p,
					current: count
				}));
			} catch (e) {
				console.error("Failed on", fav.title, e);
			}
			alert(`Successfully backed up ${count}/${targets.length} items to Drive!`);
			setSelectedItems(/* @__PURE__ */ new Set());
		} catch (err) {
			alert("Google Drive sync failed to start: " + err.message);
		} finally {
			setBulkProgress({
				current: 0,
				total: 0,
				active: false
			});
		}
	};
	const handleBulkDelete = async () => {
		if (!window.confirm(`Are you sure you want to delete ${selectedItems.size} items forever?`)) return;
		const remaining = items.filter((i) => !selectedItems.has(i.url));
		await saveVideos(remaining);
		setItems(remaining);
		setSelectedItems(/* @__PURE__ */ new Set());
	};
	const cycleTheme = () => {
		const nextSkin = currentSkin === 9 ? 1 : currentSkin + 1;
		setCurrentSkin(nextSkin);
		const mode = nextSkin === 1 || nextSkin === 4 || nextSkin === 6 || nextSkin === 9 ? "light" : "dark";
		document.documentElement.setAttribute("data-theme", `skin-${nextSkin}`);
		document.documentElement.classList.toggle("dark", mode === "dark");
		localStorage.setItem("vault-skin", nextSkin.toString());
	};
	const handleScroll = () => {
		if (!mainRef.current || isolatedGroup) return;
		const { scrollTop, scrollHeight, clientHeight } = mainRef.current;
		if (scrollHeight - scrollTop <= clientHeight * 1.5) setSectionLimit((prev) => prev + 20);
	};
	const collectionsList = (0, import_react.useMemo)(() => {
		return Array.from(new Set(items.map((i) => i.collection).filter(Boolean))).sort();
	}, [items]);
	const filtered = (0, import_react.useMemo)(() => {
		return items.filter((f) => {
			if (activeCollection && f.collection !== activeCollection) return false;
			if (!search) return true;
			const targetValue = f[searchField];
			if (targetValue === null || targetValue === void 0) return false;
			const searchStr = search.toLowerCase();
			if (Array.isArray(targetValue)) return targetValue.some((v) => v.toString().toLowerCase().includes(searchStr));
			return targetValue.toString().toLowerCase().includes(searchStr);
		});
	}, [
		items,
		search,
		searchField
	]);
	const sorted = (0, import_react.useMemo)(() => {
		return [...filtered].sort((a, b) => {
			if (sortBy === "DateDesc") return b.timestamp - a.timestamp;
			if (sortBy === "DateAsc") return a.timestamp - b.timestamp;
			const valA = a[sortBy];
			const valB = b[sortBy];
			if (valA === void 0 || valA === null) return 1;
			if (valB === void 0 || valB === null) return -1;
			let comparison = 0;
			if (typeof valA === "number" && typeof valB === "number") comparison = valA - valB;
			else comparison = valA.toString().localeCompare(valB.toString());
			return sortOrder === "asc" ? comparison : -comparison;
		});
	}, [
		filtered,
		sortBy,
		sortOrder
	]);
	const grouped = (0, import_react.useMemo)(() => {
		if (groupBy === "None") return { "All Items": sorted };
		return sorted.reduce((acc, item) => {
			let key = "Unknown";
			try {
				key = new URL(item.url).hostname.replace(/^www\./, "");
			} catch (e) {}
			if (!acc[key]) acc[key] = [];
			acc[key].push(item);
			return acc;
		}, {});
	}, [sorted, groupBy]);
	const viewClasses = {
		1: "grid-cols-1 md:grid-cols-2 lg:grid-cols-2",
		2: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
		3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
		4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3",
		5: "grid-cols-1 xl:grid-cols-2"
	};
	({
		1: 6,
		2: 10,
		3: 8,
		4: 6,
		5: 4
	})[viewSize];
	const groupsToRender = isolatedGroup ? [[isolatedGroup, grouped[isolatedGroup] || []]] : Object.entries(grouped).slice(0, sectionLimit);
	const setGroupPage = (groupName, delta) => {
		setPages((prev) => ({
			...prev,
			[groupName]: Math.max(0, (prev[groupName] || 0) + delta)
		}));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col h-screen overflow-hidden bg-vault-bg text-vault-text font-sans antialiased transition-colors duration-500",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex-none h-16 flex items-center justify-between px-4 md:px-6 z-20 vault-card rounded-none border-t-0 border-x-0 border-b shadow-sm relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setSidebarOpen(!isSidebarOpen),
						className: "vault-btn p-1.5 h-8 w-8 flex items-center justify-center border-none hover:bg-vault-cardBg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, {
							size: 20,
							className: "text-vault-accent"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-vault-accent",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, {
								size: 24,
								strokeWidth: 2.5
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "leading-tight",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "text-xl font-bold tracking-tight flex items-center gap-1",
								children: ["Vault", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-vault-accent font-light",
									children: "Central"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[9px] text-vault-muted font-medium tracking-wider uppercase",
								children: ["Secure Media Vault // ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "https://vaultwares.com",
									target: "_blank",
									rel: "noreferrer",
									className: "hover:text-vault-accent underline transition-colors",
									children: "VaultWares.com"
								})]
							})]
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative group flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: searchField,
								onChange: (e) => setSearchField(e.target.value),
								className: "bg-vault-cardBg border border-vault-border rounded-l-full px-3 py-1.5 text-xs text-vault-text focus:border-vault-accent outline-none appearance-none",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "title",
										children: "Title"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "author",
										children: "Author"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "domain",
										children: "Domain"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "url",
										children: "URL"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "quality",
										children: "Quality"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "resolution",
										children: "Res"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "description",
										children: "Desc"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "tags",
										children: "Tags"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
									className: "absolute left-3 top-1/2 -translate-y-1/2 text-vault-muted group-focus-within:text-vault-accent transition-colors",
									size: 14
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									placeholder: `Search in ${searchField}...`,
									value: search,
									onChange: (e) => setSearch(e.target.value),
									className: "pl-9 pr-4 py-1.5 w-full bg-vault-cardBg border border-vault-border rounded-r-full outline-none focus:border-vault-accent text-sm transition-all"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: cycleTheme,
							className: "vault-btn flex items-center justify-center p-1.5 rounded-full h-8 w-8 relative group",
							title: `Skin ${currentSkin}/9`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Palette, {
								size: 16,
								className: "group-hover:rotate-12 transition-transform"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "vault-btn flex items-center justify-center p-1.5 rounded-full h-8 w-8 group",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, {
								size: 16,
								className: "text-vault-accent group-hover:scale-110 transition-transform duration-300"
							})
						})
					]
				})]
			}),
			selectedItems.size > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute bottom-4 left-1/2 -translate-x-1/2 z-50 bg-vault-cardBg border border-vault-accent shadow-2xl rounded-full px-6 py-3 flex items-center gap-4 animate-in slide-in-from-bottom-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-vault-text font-bold text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-vault-accent",
							children: selectedItems.size
						}), " Items Selected"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-px bg-vault-border mx-2" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setSelectedItems(/* @__PURE__ */ new Set()),
						className: "text-xs font-bold text-vault-muted hover:text-vault-text transition-colors",
						children: "Clear"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleBulkDelete,
						className: "vault-btn bg-red-900/40 text-red-400 border-red-900/50 hover:bg-red-900/60 px-3 py-1.5 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
							size: 12,
							className: "inline mr-1"
						}), " Delete All"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleBulkDriveUpload,
						disabled: bulkProgress.active,
						className: "vault-btn px-3 py-1.5 text-xs bg-blue-900/40 text-blue-400 border-blue-900/50 hover:bg-blue-900/60 disabled:opacity-50",
						children: [bulkProgress.active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, {
							size: 12,
							className: "inline mr-1 animate-spin"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, {
							size: 12,
							className: "inline mr-1"
						}), bulkProgress.active ? `Uploading (${bulkProgress.current}/${bulkProgress.total})...` : "To GDrive"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleBulkDownload,
						disabled: bulkProgress.active,
						className: "vault-btn px-3 py-1.5 text-xs bg-green-900/40 text-green-400 border-green-900/50 hover:bg-green-900/60 disabled:opacity-50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {
							size: 12,
							className: "inline mr-1"
						}), " Local Backup"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 overflow-hidden relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: cn("flex-none bg-vault-cardBg/30 border-r border-vault-border transition-all duration-300 overflow-y-auto z-10 flex flex-col gap-6", isSidebarOpen ? "w-64 p-4 opacity-100" : "w-0 p-0 opacity-0 border-r-0"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 whitespace-nowrap overflow-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "text-xs font-bold text-vault-muted uppercase tracking-widest flex items-center gap-2 mb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, {
										size: 14,
										className: "text-vault-accent"
									}), " View Mode"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "range",
									min: "1",
									max: "5",
									value: viewSize,
									onChange: (e) => setViewSize(parseInt(e.target.value)),
									className: "w-full accent-vault-accent"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-[10px] text-vault-muted mt-1 font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Details" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Biggest" })]
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "text-xs font-bold text-vault-muted uppercase tracking-widest flex items-center gap-2 mb-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, {
									size: 14,
									className: "text-vault-accent"
								}), " Group By"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: groupBy,
								onChange: (e) => setGroupBy(e.target.value),
								className: "w-full bg-vault-bg border border-vault-border text-xs p-1.5 rounded outline-none focus:border-vault-accent text-vault-text",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "None",
									children: "None (Flat List)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "Hostname",
									children: "Source Hostname"
								})]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-bold text-vault-muted uppercase tracking-widest flex items-center justify-between mb-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderTree, {
										size: 14,
										className: "text-vault-accent"
									}), " Collections"]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setActiveCollection(null),
									className: `w-full text-left p-1.5 text-xs rounded transition-all ${!activeCollection ? "bg-vault-accent/20 text-vault-accent font-bold" : "text-vault-text hover:bg-vault-cardBg"}`,
									children: "All Items"
								}), collectionsList.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setActiveCollection(col),
									className: `w-full text-left p-1.5 text-xs rounded transition-all truncate ${activeCollection === col ? "bg-vault-accent/20 text-vault-accent font-bold" : "text-vault-text hover:bg-vault-cardBg"}`,
									children: col
								}, col))]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "border-vault-border opacity-50 my-2" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "text-xs font-bold text-vault-muted uppercase tracking-widest flex items-center gap-2 mb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, {
										size: 14,
										className: "text-vault-accent"
									}), " Sort Params"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: sortBy,
										onChange: (e) => setSortBy(e.target.value),
										className: "flex-1 bg-vault-bg border border-vault-border text-[10px] p-1.5 rounded outline-none focus:border-vault-accent text-vault-text",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "DateDesc",
												children: "Newest (System)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "DateAsc",
												children: "Oldest (System)"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("optgroup", {
												label: "Metadata Fields",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "title",
														children: "Title"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "author",
														children: "Author"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "domain",
														children: "Domain"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "views",
														children: "Views"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "likes",
														children: "Likes"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "dislikes",
														children: "Dislikes"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "quality",
														children: "Quality"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "resolution",
														children: "Resolution"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "size",
														children: "Size"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "timestamp",
														children: "Date Saved"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "datePublished",
														children: "Date Published"
													})
												]
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setSortOrder((prev) => prev === "asc" ? "desc" : "asc"),
										className: "vault-btn p-1 px-2 text-[10px] font-bold",
										title: "Toggle Asc/Desc",
										children: sortOrder === "asc" ? "ASC" : "DESC"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "border-vault-border opacity-50 my-2" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "text-xs font-bold text-vault-muted uppercase tracking-widest flex items-center gap-2 mb-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
										size: 14,
										className: "text-vault-accent"
									}), " PIN Protection"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-vault-muted font-bold uppercase tracking-widest",
											children: "Master PIN"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "relative inline-flex items-center cursor-pointer",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												className: "sr-only peer",
												checked: pinSettings?.enabled || false,
												onChange: togglePin
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-9 h-5 bg-vault-cardBg peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-vault-muted after:border-vault-border after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-vault-accent peer-checked:after:bg-vault-bg" })]
										})]
									}), pinSettings?.enabled && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-3 animate-in slide-in-from-top-2 duration-300",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[9px] text-vault-muted font-bold block mb-1.5 uppercase opacity-60",
												children: "Sequence Length"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex gap-2",
												children: [4, 6].map((len) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													onClick: () => updatePinLength(len),
													className: cn("flex-1 py-1 text-[10px] font-black rounded-sm border transition-all", pinSettings.length === len ? "bg-vault-accent border-vault-accent text-vault-bg shadow-[0_0_10px_-2px_var(--color-vault-accent)]" : "bg-vault-bg border-vault-border text-vault-muted hover:border-vault-muted"),
													children: [len, " DIGITS"]
												}, len))
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[9px] text-vault-muted font-bold block mb-1.5 uppercase opacity-60",
												children: "Auto-Locker Delay"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												value: pinSettings.lockTimeout,
												onChange: (e) => updateLockTimeout(parseInt(e.target.value)),
												className: "w-full bg-vault-bg border border-vault-border text-[10px] p-1.5 rounded outline-none focus:border-vault-accent text-vault-text font-bold",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: 6e5,
														children: "10 Minutes"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: 18e5,
														children: "30 Minutes"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: 36e5,
														children: "1 Hour"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: 72e5,
														children: "2 Hours"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: -1,
														children: "Never (Manual only)"
													})
												]
											})] }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => {
													const next = {
														...pinSettings,
														lastUnlocked: 1
													};
													savePinSettings(next);
													setPinSettings(next);
													setItems([]);
												},
												className: "w-full py-1.5 text-[10px] font-black uppercase tracking-widest bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all rounded-sm",
												children: "Lock Vault Now"
											})
										]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "border-vault-border opacity-50 my-2" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pt-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "text-xs font-bold text-vault-muted uppercase tracking-widest flex items-center gap-2 mb-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, {
											size: 14,
											className: "text-vault-accent"
										}), " Persistence"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setIsSyncing(!isSyncing),
										className: cn("w-full vault-btn p-2 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 border-dashed", isSyncing ? "border-vault-accent text-vault-accent bg-vault-accent/5" : "border-vault-border text-vault-muted opacity-60 hover:opacity-100"),
										title: isFirefox ? "Use Firefox Sync Storage" : "Use Chrome Sync Storage",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("w-1.5 h-1.5 rounded-full", isSyncing ? "bg-vault-accent animate-pulse" : "bg-vault-muted") }), isSyncing ? "Sync Enabled" : "Enable Browser Sync"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[9px] text-vault-muted mt-2 leading-relaxed opacity-60 italic",
										children: isFirefox ? "Uses Firefox Sync to backup metadata across devices (excludes large binary previews)." : "Uses Chrome Sync (subject to 100KB limit per item, recommended for metadata only)."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "border-vault-border opacity-50 my-2" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-vault-muted space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Total Items: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-vault-accent",
									children: items.length
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Visible: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-vault-text",
									children: filtered.length
								})] })]
							})
						]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					ref: mainRef,
					onScroll: handleScroll,
					className: "flex-1 overflow-y-auto p-4 md:p-6 bg-vault-bg/50 scroll-smooth",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-[1920px] mx-auto space-y-10",
						children: [
							isolatedGroup && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setIsolatedGroup(null),
									className: "vault-btn flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 16 }), " Back to Dashboard"]
								})
							}),
							groupsToRender.map(([groupName, groupItems]) => {
								const currentPage = pages[groupName] || 0;
								const maxRows = 2;
								const perRow = viewClasses[viewSize].includes("grid-cols-4") ? 4 : viewClasses[viewSize].includes("grid-cols-3") ? 3 : viewClasses[viewSize].includes("grid-cols-2") ? 2 : 1;
								const itemsPerPage = isolatedGroup ? groupItems.length : perRow * maxRows;
								const displayItems = isolatedGroup ? groupItems : groupItems.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
								const totalPages = Math.ceil(groupItems.length / itemsPerPage);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
									className: "space-y-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: cn("flex items-center gap-3", !isolatedGroup && "cursor-pointer group"),
											onClick: () => !isolatedGroup && setIsolatedGroup(groupName),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
												className: "text-lg font-bold text-vault-text border-b-2 border-vault-accent pb-1 pr-4 inline-block transition-colors group-hover:text-vault-accent",
												children: groupName
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs bg-vault-cardBg border border-vault-border px-2 py-0.5 rounded-full text-vault-muted font-bold",
												children: groupItems.length
											})]
										}), !isolatedGroup && totalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => setGroupPage(groupName, -1),
													disabled: currentPage === 0,
													className: "vault-btn p-1 h-7 w-7 flex items-center justify-center disabled:opacity-30",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 14 })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-[10px] font-mono font-bold text-vault-muted w-10 text-center",
													children: [
														currentPage + 1,
														" / ",
														totalPages
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => setGroupPage(groupName, 1),
													disabled: currentPage >= totalPages - 1,
													className: "vault-btn p-1 h-7 w-7 flex items-center justify-center disabled:opacity-30",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 14 })
												})
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: cn("grid gap-2 md:gap-4 lg:gap-6", viewClasses[viewSize]),
										children: displayItems.map((fav, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: cn("vault-card group relative flex transform transition-all hover:shadow-lg overflow-hidden", viewSize === 1 ? "flex-row items-center gap-4 h-24 p-4 hover:-translate-y-1" : "flex-col h-[380px]"),
											children: [viewSize !== 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												onClick: (e) => {
													if (e.target.closest(".thumb-action")) return;
													if (fav.type === "video" && fav.rawVideoSrc) {
														setPlayingVideo(fav);
														setVideoError(false);
														setIsRefreshing(false);
													} else window.open(fav.url, "_blank");
												},
												className: cn("relative flex-none bg-vault-cardBg/50 overflow-hidden cursor-pointer group/thumb", viewSize === 1 ? "w-40 h-full border-r border-vault-border" : "w-full aspect-video border-b border-vault-border rounded-t-lg"),
												children: [
													fav.type === "video" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewThumb, { video: fav }) : fav.thumbnail ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
														src: fav.thumbnail,
														alt: fav.title,
														className: "w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-105"
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-vault-cardBg to-vault-bg text-vault-muted",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, {
															size: 32,
															className: "opacity-20 mb-2"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[10px] font-mono opacity-50",
															children: "NO PREVIEW"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-vault-accent/40 z-20 transition-all group-hover/thumb:w-4 group-hover/thumb:h-4 group-hover/thumb:border-vault-accent" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-vault-accent/40 z-20 transition-all group-hover/thumb:w-4 group-hover/thumb:h-4 group-hover/thumb:border-vault-accent" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-vault-accent/40 z-20 transition-all group-hover/thumb:w-4 group-hover/thumb:h-4 group-hover/thumb:border-vault-accent" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-vault-accent/40 z-20 transition-all group-hover/thumb:w-4 group-hover/thumb:h-4 group-hover/thumb:border-vault-accent" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "absolute top-2 left-2 z-30 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex flex-col gap-2",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															className: "thumb-action p-1.5 bg-black/60 hover:bg-vault-accent text-white rounded shadow-lg backdrop-blur-md transition-all hover:scale-110",
															title: "Edit Metadata",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { size: 12 })
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "absolute top-2 right-2 z-30 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex flex-col gap-2",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															className: "thumb-action p-1.5 bg-black/60 hover:bg-red-500 text-white rounded shadow-lg backdrop-blur-md transition-all hover:scale-110",
															title: "Delete Item",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 12 })
														})
													}),
													fav.duration && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-mono font-bold px-1.5 py-0.5 rounded shadow z-20",
														children: typeof fav.duration === "number" ? `${Math.floor(fav.duration / 60)}:${(fav.duration % 60).toString().padStart(2, "0")}` : fav.duration
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "absolute inset-0 bg-vault-cardBg/10 group-hover/thumb:bg-vault-cardBg/30 transition-colors flex items-center justify-center z-10",
														children: fav.type === "video" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "w-12 h-12 rounded-full bg-vault-accent/90 opacity-0 group-hover/thumb:opacity-100 transition-all flex items-center justify-center shadow-2xl transform scale-75 group-hover/thumb:scale-100 duration-300",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
																fill: "currentColor",
																className: "text-vault-bg ml-1",
																size: 20
															})
														}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "w-12 h-12 rounded-full bg-vault-cardBg opacity-0 group-hover/thumb:opacity-100 transition-all flex items-center justify-center shadow-xl transform scale-75 group-hover/thumb:scale-100 duration-300 border border-vault-border",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
																className: "text-vault-text",
																size: 20
															})
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "absolute bottom-2 left-2 z-20 opacity-0 group-hover/thumb:opacity-100 transition-opacity pointer-events-none",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "flex items-center gap-1.5 bg-black/80 px-2 py-1 rounded text-[10px] font-mono font-bold text-vault-accent border border-vault-accent/30 backdrop-blur-sm",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-1.5 h-1.5 rounded-full bg-vault-accent animate-pulse" }), fav.type === "video" ? "SCANNING" : fav.type.toUpperCase()]
														})
													})
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: cn("z-10 relative flex flex-col flex-1", viewSize === 0 ? "flex-row items-center justify-between w-full" : viewSize === 1 ? "flex-row items-center justify-between w-full p-4" : "p-4 flex flex-col flex-1"),
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: cn("flex justify-between items-start mb-2", (viewSize === 0 || viewSize === 1) && "hidden"),
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "flex gap-2 items-center",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-[10px] uppercase font-bold tracking-widest text-vault-bg bg-vault-muted px-2 py-0.5 rounded-sm",
																children: viewSize > 1 ? `#${idx + 1 + currentPage * itemsPerPage}` : "V-ID"
															})
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: cn("flex-1", viewSize === 0 || viewSize === 1 ? "flex items-center justify-between w-full ml-4" : "flex flex-col"),
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: viewSize === 0 || viewSize === 1 ? "flex-1 mr-4 min-w-0" : "flex-1",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
																className: cn("font-bold mb-1 leading-snug cursor-pointer hover:text-vault-accent transition-colors", viewSize === 1 ? "text-base line-clamp-1" : "text-[15px] line-clamp-2"),
																children: fav.title || "Untitled Reference"
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "text-xs text-vault-muted truncate max-w-[250px] font-mono opacity-80",
																title: fav.url,
																children: fav.domain || new URL(fav.url).hostname.replace("www.", "")
															})]
														}), viewSize > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															className: "mt-3 space-y-1 mb-2 flex-1",
															children: [
																fav.author && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
																	className: "text-[11px] text-vault-text line-clamp-1",
																	children: [
																		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																			className: "text-vault-muted",
																			children: "By:"
																		}),
																		" ",
																		fav.author
																	]
																}),
																(fav.views || fav.likes) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
																	className: "text-[11px] text-vault-muted flex gap-3 mt-1",
																	children: [fav.views && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: fav.views }), " views"] }), fav.likes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: fav.likes }), " likes"] })]
																}),
																fav.tags && fav.tags.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "flex flex-wrap gap-1 mt-2",
																	children: [fav.tags.slice(0, 3).map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: "text-[9px] bg-vault-cardBg border border-vault-border px-1.5 py-0.5 rounded text-vault-muted inline-block",
																		children: tag
																	}, tag)), fav.tags.length > 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																		className: "text-[9px] bg-vault-cardBg/50 border border-vault-border border-dashed px-1.5 py-0.5 rounded text-vault-muted inline-block",
																		children: ["+", fav.tags.length - 3]
																	})]
																})
															]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: cn("flex items-center justify-between border-vault-border pt-3 mt-auto", viewSize === 0 || viewSize === 1 ? "border-none ml-4 gap-4 mt-0 pt-0" : "border-t mt-auto"),
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-[11px] font-semibold text-vault-muted tracking-wider",
															children: new Date(fav.timestamp).toLocaleDateString(void 0, {
																month: "short",
																day: "numeric",
																year: "numeric"
															})
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
															href: fav.url,
															target: "_blank",
															rel: "noreferrer",
															className: "text-[10px] font-bold text-vault-bg bg-vault-accent hover:bg-vault-accentHover transition-colors flex items-center gap-1 px-3 py-1.5 rounded-sm",
															children: ["OPEN ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
																size: 12,
																strokeWidth: 3,
																className: "group-hover:translate-x-0.5 transition-transform"
															})]
														})]
													})
												]
											})]
										}, `${fav.url}-${idx}`))
									})]
								}, groupName);
							}),
							filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "py-24 text-center border border-dashed border-vault-border rounded-xl bg-vault-cardBg/30 flex flex-col items-center justify-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, {
										size: 48,
										className: "text-vault-border mb-4"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-vault-muted text-sm font-semibold tracking-widest uppercase mb-2",
										children: "No encrypted items found"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-vault-muted opacity-60",
										children: "Try scanning a new target domain or clearing your filters"
									})
								]
							})
						]
					})
				})]
			}),
			editingItem && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-vault-bg border border-vault-border rounded-lg shadow-2xl w-full max-w-md p-6 relative flex flex-col gap-4 animate-in zoom-in-95 duration-200",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setEditingItem(null),
							className: "absolute top-4 right-4 vault-btn p-1 border-none hover:bg-vault-cardBg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
								size: 16,
								className: "text-vault-muted"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "text-lg font-bold text-vault-text flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, {
								size: 18,
								className: "text-vault-accent"
							}), " Edit Vault Item"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-3 mt-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-bold text-vault-muted uppercase tracking-widest block mb-1",
									children: "Title"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: editingItem.title,
									onChange: (e) => setEditingItem({
										...editingItem,
										title: e.target.value
									}),
									className: "w-full bg-vault-cardBg border border-vault-border rounded p-2 text-sm text-vault-text outline-none focus:border-vault-accent"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-bold text-vault-muted uppercase tracking-widest block mb-1",
									children: "Collection"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									placeholder: "e.g. Action Movies",
									value: editingItem.collection || "",
									onChange: (e) => setEditingItem({
										...editingItem,
										collection: e.target.value
									}),
									className: "w-full bg-vault-cardBg border border-vault-border rounded p-2 text-sm text-vault-text outline-none focus:border-vault-accent"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-bold text-vault-muted uppercase tracking-widest block mb-1",
									children: "Tags (Comma Separated)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: (editingItem.tags || []).join(", "),
									onChange: (e) => setEditingItem({
										...editingItem,
										tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean)
									}),
									className: "w-full bg-vault-cardBg border border-vault-border rounded p-2 text-sm text-vault-text outline-none focus:border-vault-accent"
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-end gap-2 mt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setEditingItem(null),
								className: "px-4 py-2 rounded text-xs font-bold text-vault-muted hover:text-vault-text transition-colors",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: async () => {
									const updatedVideos = items.map((v) => v.url === editingItem.url ? editingItem : v);
									await saveVideos(updatedVideos);
									setItems(updatedVideos);
									setEditingItem(null);
								},
								className: "vault-btn font-bold px-4 py-2",
								children: "Save Hooks"
							})]
						})
					]
				})
			}),
			scannerState && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-vault-bg border border-vault-border rounded-lg shadow-2xl w-full max-w-lg p-6 relative flex flex-col gap-4 animate-in zoom-in-95 duration-200",
					children: [
						!scannerState.active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setScannerState(null),
							className: "absolute top-4 right-4 vault-btn p-1 border-none hover:bg-vault-cardBg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
								size: 16,
								className: "text-vault-muted"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "text-lg font-bold text-vault-text flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {
								size: 18,
								className: scannerState.active ? "text-vault-accent animate-pulse" : "text-vault-accent"
							}), "Vault Health Scanner"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-vault-cardBg border border-vault-border rounded p-4 flex flex-col gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center text-xs font-bold text-vault-muted uppercase",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Progress" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									scannerState.current,
									" / ",
									scannerState.total
								] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-full h-2 bg-vault-bg rounded-full overflow-hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full bg-vault-accent transition-all duration-300",
									style: { width: `${scannerState.current / Math.max(scannerState.total, 1) * 100}%` }
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-vault-cardBg border border-vault-border rounded p-3 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-2xl font-black text-red-500",
									children: scannerState.deadItems.length
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] text-vault-muted font-bold uppercase tracking-wider",
									children: "Dead Links (404)"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-vault-cardBg border border-vault-border rounded p-3 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-2xl font-black text-yellow-500",
									children: scannerState.duplicates.length
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] text-vault-muted font-bold uppercase tracking-wider",
									children: "Duplicates"
								})]
							})]
						}),
						scannerState.finished && (scannerState.deadItems.length > 0 || scannerState.duplicates.length > 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-col gap-2 mt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: async () => {
									const toDelete = new Set([...scannerState.deadItems.map((i) => i.url), ...scannerState.duplicates.map((i) => i.url)]);
									if (window.confirm(`Purge ${toDelete.size} dead/duplicate items safely?`)) {
										const remaining = items.filter((i) => !toDelete.has(i.url));
										await saveVideos(remaining);
										setItems(remaining);
										setScannerState(null);
									}
								},
								className: "vault-btn font-bold px-4 py-2 bg-red-900/40 border-red-900/50 hover:bg-red-900/60 text-red-400",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
										size: 16,
										className: "inline mr-2"
									}),
									"Purge Anomalies (",
									new Set([...scannerState.deadItems.map((i) => i.url), ...scannerState.duplicates.map((i) => i.url)]).size,
									")"
								]
							})
						}),
						scannerState.finished && scannerState.deadItems.length === 0 && scannerState.duplicates.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-center text-green-500 font-bold text-sm py-2",
							children: "Everything looks healthy!"
						})
					]
				})
			}),
			scannerState && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-vault-bg border border-vault-border rounded-lg shadow-2xl w-full max-w-lg p-6 relative flex flex-col gap-4 animate-in zoom-in-95 duration-200",
					children: [
						!scannerState.active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setScannerState(null),
							className: "absolute top-4 right-4 vault-btn p-1 border-none hover:bg-vault-cardBg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {
								size: 16,
								className: "text-vault-muted"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "text-lg font-bold text-vault-text flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {
								size: 18,
								className: scannerState.active ? "text-vault-accent animate-pulse" : "text-vault-accent"
							}), "Vault Health Scanner"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-vault-cardBg border border-vault-border rounded p-4 flex flex-col gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center text-xs font-bold text-vault-muted uppercase",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Progress" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									scannerState.current,
									" / ",
									scannerState.total
								] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-full h-2 bg-vault-bg rounded-full overflow-hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full bg-vault-accent transition-all duration-300",
									style: { width: `${scannerState.current / Math.max(scannerState.total, 1) * 100}%` }
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-vault-cardBg border border-vault-border rounded p-3 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-2xl font-black text-red-500",
									children: scannerState.deadItems.length
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] text-vault-muted font-bold uppercase tracking-wider",
									children: "Dead Links (404)"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-vault-cardBg border border-vault-border rounded p-3 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-2xl font-black text-yellow-500",
									children: scannerState.duplicates.length
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] text-vault-muted font-bold uppercase tracking-wider",
									children: "Duplicates"
								})]
							})]
						}),
						scannerState.finished && (scannerState.deadItems.length > 0 || scannerState.duplicates.length > 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-col gap-2 mt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: async () => {
									const toDelete = new Set([...scannerState.deadItems.map((i) => i.url), ...scannerState.duplicates.map((i) => i.url)]);
									if (window.confirm(`Purge ${toDelete.size} dead/duplicate items safely?`)) {
										const remaining = items.filter((i) => !toDelete.has(i.url));
										await saveVideos(remaining);
										setItems(remaining);
										setScannerState(null);
									}
								},
								className: "vault-btn font-bold px-4 py-2 bg-red-900/40 border-red-900/50 hover:bg-red-900/60 text-red-400",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
										size: 16,
										className: "inline mr-2"
									}),
									"Purge Anomalies (",
									new Set([...scannerState.deadItems.map((i) => i.url), ...scannerState.duplicates.map((i) => i.url)]).size,
									")"
								]
							})
						}),
						scannerState.finished && scannerState.deadItems.length === 0 && scannerState.duplicates.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-center text-green-500 font-bold text-sm py-2",
							children: "Everything looks healthy!"
						})
					]
				})
			}),
			playingVideo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("fixed inset-0 z-50 flex items-center justify-center transition-all duration-700", isDimmed ? "bg-black/98" : "bg-black/80 backdrop-blur-sm"),
				onClick: () => {
					setPlayingVideo(null);
					setIsDimmed(false);
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("w-[90vw] max-w-5xl bg-vault-cardBg border border-vault-border rounded-lg shadow-2xl flex flex-col overflow-hidden transition-transform duration-500", playingVideo ? "scale-100 opacity-100" : "scale-95 opacity-0"),
					onClick: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between p-4 border-b border-vault-border bg-vault-bg/50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setIsDimmed(!isDimmed),
									className: cn("vault-btn p-1.5 h-8 w-8 flex items-center justify-center rounded-full transition-all border border-vault-border/50", isDimmed ? "bg-vault-accent text-vault-bg" : "bg-vault-cardBg text-vault-muted hover:text-vault-accent"),
									title: isDimmed ? "Turn Lights ON" : "Turn Lights OFF",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Palette, {
										size: 16,
										fill: isDimmed ? "currentColor" : "none"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-bold text-lg text-vault-text line-clamp-1 pr-4",
									children: playingVideo.title || "Untitled Video"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								title: "Close Player",
								onClick: () => {
									setPlayingVideo(null);
									setIsDimmed(false);
								},
								className: "vault-btn p-1.5 h-8 w-8 flex items-center justify-center rounded-full hover:bg-red-500/10 hover:text-red-500 transition-colors border-none",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative w-full aspect-video bg-black flex items-center justify-center group/player",
							children: playingVideo.type === "video" && playingVideo.rawVideoSrc && !videoError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "w-full h-full relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
									src: playingVideo.rawVideoSrc,
									autoPlay: true,
									controls: true,
									preload: "auto",
									className: "w-full h-full object-contain",
									playsInline: true,
									onError: () => setVideoError(true)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute top-4 left-4 z-20 pointer-events-none transition-opacity group-hover/player:opacity-100 opacity-20 group-hover/player:delay-100",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-sm border border-vault-accent/30 backdrop-blur-md",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-2 h-2 rounded-full bg-vault-accent animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[10px] font-mono font-bold text-vault-accent uppercase tracking-widest",
											children: ["Vault Stream: ", playingVideo.quality || playingVideo.resolution || "AUTO"]
										})]
									})
								})]
							}) : videoError ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center space-y-4 p-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
										className: "mx-auto text-yellow-500",
										size: 48
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-vault-text font-bold text-lg mb-1",
										children: "Playback Failed"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-vault-muted text-sm",
										children: "The media link may have expired or is blocked by CORS."
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-center gap-3 mt-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											className: "vault-btn text-sm px-4 py-2 flex items-center gap-2",
											onClick: async () => {
												if (!playingVideo) return;
												setIsRefreshing(true);
												setVideoError(false);
												try {
													const response = await import_browser_polyfill.default.runtime.sendMessage({
														action: "extract_fresh_m3u8",
														url: playingVideo.url
													});
													if (response && response.src) {
														setPlayingVideo({
															...playingVideo,
															rawVideoSrc: response.src
														});
														const all = await getSavedVideos();
														const idx = all.findIndex((v) => v.url === playingVideo.url);
														if (idx !== -1) {
															all[idx].rawVideoSrc = response.src;
															await saveVideos(all);
															setItems(all);
														}
													} else setVideoError(true);
												} catch (err) {
													console.error("Refresh failed:", err);
													setVideoError(true);
												} finally {
													setIsRefreshing(false);
												}
											},
											disabled: isRefreshing,
											children: isRefreshing ? "Refreshing Link..." : "Try Refreshing Link"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: playingVideo.url,
											target: "_blank",
											rel: "noreferrer",
											className: "vault-btn text-sm px-4 py-2 bg-vault-accent text-vault-bg flex items-center gap-2 hover:bg-vault-accentHover",
											children: "Open Original Page"
										})]
									})
								]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
								src: playingVideo.rawVideoSrc || void 0,
								controls: true,
								autoPlay: true,
								className: "w-full h-full outline-none",
								onError: () => setVideoError(true),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", { src: playingVideo.rawVideoSrc || void 0 })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 bg-vault-cardBg flex items-center justify-between text-sm text-vault-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-vault-text",
								children: playingVideo.domain || new URL(playingVideo.url).hostname
							}), playingVideo.author && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "ml-2 px-2 border-l border-vault-border",
								children: ["By: ", playingVideo.author]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono text-xs",
								children: new Date(playingVideo.timestamp).toLocaleString()
							})]
						})
					]
				})
			})
		]
	});
};
//#endregion
//#region src/dashboard-entry.tsx
import_client.createRoot(document.getElementById("root")).render(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.StrictMode, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VaultDashboard, {}) }));
//#endregion

//# sourceMappingURL=dashboard.js.map