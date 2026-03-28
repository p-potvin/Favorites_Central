import { i as savePinSettings, l as __toESM, o as require_browser_polyfill, r as isVaultLocked, t as getPinSettings } from "./storage-vault.js";
import { a as require_client, i as createLucideIcon, n as Shield, o as require_react, r as Lock, t as require_jsx_runtime } from "./globals.js";
var LockOpen = createLucideIcon("lock-open", [["rect", {
	width: "18",
	height: "11",
	x: "3",
	y: "11",
	rx: "2",
	ry: "2",
	key: "1w4ew1"
}], ["path", {
	d: "M7 11V7a5 5 0 0 1 9.9-1",
	key: "1mm8w8"
}]]);
//#endregion
//#region src/pin-entry.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_client = /* @__PURE__ */ __toESM(require_client(), 1);
var import_browser_polyfill = /* @__PURE__ */ __toESM(require_browser_polyfill(), 1);
var import_jsx_runtime = require_jsx_runtime();
var PinPopup = () => {
	const [pinSettings, setPinSettings] = (0, import_react.useState)(null);
	const [pin, setPin] = (0, import_react.useState)([]);
	const [error, setError] = (0, import_react.useState)(false);
	const [isLocked, setIsLocked] = (0, import_react.useState)(true);
	const inputsRef = (0, import_react.useRef)([]);
	(0, import_react.useEffect)(() => {
		const load = async () => {
			const settings = await getPinSettings();
			setPinSettings(settings);
			setPin(new Array(settings.length).fill(""));
			const locked = await isVaultLocked();
			setIsLocked(locked);
			if (!locked) {}
		};
		load();
	}, []);
	const handleChange = (index, value) => {
		if (!/^\d*$/.test(value)) return;
		const newPin = [...pin];
		newPin[index] = value.slice(-1);
		setPin(newPin);
		setError(false);
		if (value && index < pin.length - 1) inputsRef.current[index + 1]?.focus();
		const fullPin = newPin.join("");
		if (fullPin.length === pinSettings.length) handleVerify(fullPin);
	};
	const handleKeyDown = (index, e) => {
		if (e.key === "Backspace" && !pin[index] && index > 0) inputsRef.current[index - 1]?.focus();
	};
	const handleVerify = async (enteredPin) => {
		if (enteredPin === pinSettings.pin) {
			await savePinSettings({
				...pinSettings,
				lastUnlocked: Date.now()
			});
			setIsLocked(false);
			setTimeout(() => window.close(), 500);
		} else {
			setError(true);
			setPin(new Array(pinSettings.length).fill(""));
			inputsRef.current[0]?.focus();
		}
	};
	if (!pinSettings) return null;
	if (!pinSettings.enabled) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-[320px] p-6 bg-[#0b0f19] text-white flex flex-col items-center gap-4 border border-[#1e293b]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
          .vault-btn {
            background: #1e293b;
            border: 1px solid #334155;
            color: #94a3b8;
            transition: all 0.2s;
          }
          .vault-btn:hover {
            background: #2563eb;
            border-color: #3b82f6;
            color: white;
            box-shadow: 0 0 20px -5px rgba(59, 130, 246, 0.5);
          }
        ` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, {
				size: 32,
				className: "text-[#3b82f6]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[10px] font-mono uppercase tracking-[0.2em] font-bold",
				children: "Vault Unsecured"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => import_browser_polyfill.default.tabs.create({ url: import_browser_polyfill.default.runtime.getURL("dashboard-v2.html") }),
				className: "vault-btn w-full p-3 text-[11px] font-black uppercase tracking-widest rounded-md",
				children: "Open Dashboard"
			})
		]
	});
	if (!isLocked) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-[320px] p-6 bg-[#0b0f19] text-white flex flex-col items-center gap-4 animate-in fade-in duration-500 border border-[#1e293b]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
          .vault-btn {
            background: #1e293b;
            border: 1px solid #334155;
            color: #94a3b8;
            transition: all 0.2s;
          }
          .vault-btn:hover {
            background: #2563eb;
            border-color: #3b82f6;
            color: white;
            box-shadow: 0 0 20px -5px rgba(59, 130, 246, 0.5);
          }
        ` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockOpen, {
				size: 32,
				className: "text-[#10b981] animate-pulse"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-[#10b981]",
				children: "Vault Unlocked"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-full h-px bg-[#1e293b]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => import_browser_polyfill.default.tabs.create({ url: import_browser_polyfill.default.runtime.getURL("dashboard-v2.html") }),
				className: "vault-btn w-full p-3 text-[11px] font-black uppercase tracking-widest rounded-md",
				children: "Access Mainframe"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-[320px] p-6 bg-vault-bg text-vault-text flex flex-col items-center gap-6 select-none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
					size: 32,
					className: error ? "text-red-500 animate-bounce" : "text-vault-accent"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-1 blur-lg bg-vault-accent/20 rounded-full" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center space-y-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xs font-mono font-black uppercase tracking-[0.2em]",
					children: "Authenticating"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[10px] text-vault-muted font-bold tracking-tighter opacity-60",
					children: [
						"Enter ",
						pinSettings.length,
						"-digit sequence"
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-3 justify-center",
				children: pin.map((digit, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: (el) => inputsRef.current[idx] = el,
					type: "password",
					inputMode: "numeric",
					pattern: "[0-9]*",
					maxLength: 1,
					value: digit,
					onChange: (e) => handleChange(idx, e.target.value),
					onKeyDown: (e) => handleKeyDown(idx, e),
					className: `
              w-10 h-14 bg-vault-cardBg/50 border-2 rounded-xl text-center text-xl font-bold 
              focus:border-vault-accent focus:bg-vault-accent/5 outline-none transition-all
              ${error ? "border-red-500/50 animate-shake" : "border-vault-border/50"}
              ${digit ? "border-vault-accent/50 scale-105 shadow-[0_0_15px_-5px_var(--color-vault-accent)]" : ""}
            `,
					autoFocus: idx === 0
				}, idx))
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[10px] font-black text-red-500 uppercase tracking-tighter animate-in slide-in-from-top-1",
				children: "Invalid Access Code"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[9px] text-vault-muted font-bold uppercase tracking-widest opacity-40",
				children: "Vault-Central Security Protocol 4.0"
			})
		]
	});
};
var root = document.getElementById("root");
if (root) import_client.createRoot(root).render(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PinPopup, {}));
//#endregion

//# sourceMappingURL=pin.js.map