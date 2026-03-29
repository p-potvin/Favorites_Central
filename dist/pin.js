import{d as e,f as t,h as n,i as r,l as i,n as a,o,r as s,s as c,t as l,u}from"./globals.js";var d=s(`lock-open`,[[`rect`,{width:`18`,height:`11`,x:`3`,y:`11`,rx:`2`,ry:`2`,key:`1w4ew1`}],[`path`,{d:`M7 11V7a5 5 0 0 1 9.9-1`,key:`1mm8w8`}]]),f=n(t(),1),p=n(e(),1),m=n(i(),1),h=u(),g=()=>{let[e,t]=(0,f.useState)(null),[n,i]=(0,f.useState)([]),[s,u]=(0,f.useState)(!1),[p,g]=(0,f.useState)(!0),_=(0,f.useRef)([]);(0,f.useEffect)(()=>{(async()=>{let e=await r();t(e),i(Array(e.length).fill(``)),g(await o())})()},[]);let v=(t,r)=>{if(!/^\d*$/.test(r))return;let a=[...n];a[t]=r.slice(-1),i(a),u(!1),r&&t<n.length-1&&_.current[t+1]?.focus();let o=a.join(``);o.length===e.length&&b(o)},y=(e,t)=>{t.key===`Backspace`&&!n[e]&&e>0&&_.current[e-1]?.focus()},b=async t=>{t===e.pin?(await c({...e,lastUnlocked:Date.now()}),g(!1),setTimeout(()=>window.close(),500)):(u(!0),i(Array(e.length).fill(``)),_.current[0]?.focus())};return e?e.enabled?p?(0,h.jsxs)(`div`,{className:`w-[320px] p-6 bg-vault-bg text-vault-text flex flex-col items-center gap-6 select-none`,children:[(0,h.jsxs)(`div`,{className:`relative`,children:[(0,h.jsx)(a,{size:32,className:s?`text-red-500 animate-bounce`:`text-vault-accent`}),(0,h.jsx)(`div`,{className:`absolute -inset-1 blur-lg bg-vault-accent/20 rounded-full`})]}),(0,h.jsxs)(`div`,{className:`text-center space-y-1`,children:[(0,h.jsx)(`h2`,{className:`text-xs font-mono font-black uppercase tracking-[0.2em]`,children:`Authenticating`}),(0,h.jsxs)(`p`,{className:`text-[10px] text-vault-muted font-bold tracking-tighter opacity-60`,children:[`Enter `,e.length,`-digit sequence`]})]}),(0,h.jsx)(`div`,{className:`flex gap-3 justify-center`,children:n.map((e,t)=>(0,h.jsx)(`input`,{ref:e=>{_.current[t]=e},type:`password`,inputMode:`numeric`,pattern:`[0-9]*`,maxLength:1,value:e,onChange:e=>v(t,e.target.value),onKeyDown:e=>y(t,e),className:`
              w-10 h-14 bg-vault-cardBg/50 border-2 rounded-xl text-center text-xl font-bold 
              focus:border-vault-accent focus:bg-vault-accent/5 outline-none transition-all
              ${s?`border-red-500/50 animate-shake`:`border-vault-border/50`}
              ${e?`border-vault-accent/50 scale-105 shadow-[0_0_15px_-5px_var(--color-vault-accent)]`:``}
            `,autoFocus:t===0},t))}),s&&(0,h.jsx)(`p`,{className:`text-[10px] font-black text-red-500 uppercase tracking-tighter animate-in slide-in-from-top-1`,children:`Invalid Access Code`}),(0,h.jsx)(`div`,{className:`text-[9px] text-vault-muted font-bold uppercase tracking-widest opacity-40`,children:`Vault-Central Security Protocol 4.0`})]}):(0,h.jsxs)(`div`,{className:`w-[320px] p-6 bg-[#0b0f19] text-white flex flex-col items-center gap-4 animate-in fade-in duration-500 border border-[#1e293b]`,children:[(0,h.jsx)(`style`,{children:`
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
        `}),(0,h.jsx)(d,{size:32,className:`text-[#10b981] animate-pulse`}),(0,h.jsx)(`p`,{className:`text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-[#10b981]`,children:`Vault Unlocked`}),(0,h.jsx)(`div`,{className:`w-full h-px bg-[#1e293b]`}),(0,h.jsx)(`button`,{onClick:()=>{m.default.runtime.sendMessage({action:`open_dashboard`}),window.close()},className:`vault-btn w-full p-3 text-[11px] font-black uppercase tracking-widest rounded-md`,children:`Access Mainframe`})]}):(0,h.jsxs)(`div`,{className:`w-[320px] p-6 bg-[#0b0f19] text-white flex flex-col items-center gap-4 border border-[#1e293b]`,children:[(0,h.jsx)(`style`,{children:`
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
        `}),(0,h.jsx)(l,{size:32,className:`text-[#3b82f6]`}),(0,h.jsx)(`p`,{className:`text-[10px] font-mono uppercase tracking-[0.2em] font-bold`,children:`Vault Unsecured`}),(0,h.jsx)(`button`,{onClick:()=>{m.default.runtime.sendMessage({action:`open_dashboard`}),window.close()},className:`vault-btn w-full p-3 text-[11px] font-black uppercase tracking-widest rounded-md`,children:`Open Dashboard`})]}):null},_=document.getElementById(`root`);_&&p.createRoot(_).render((0,h.jsx)(g,{}));
//# sourceMappingURL=pin.js.map