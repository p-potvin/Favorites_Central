import{A as e,D as t,N as n,O as r,S as i,T as a,b as o,k as s,m as c,u as l,w as u}from"./globals.js";var d=n(e(),1),f=n(s(),1),p=n(t(),1),m=r(),h=()=>{let[e,t]=(0,d.useState)(null),[n,r]=(0,d.useState)([]),[s,f]=(0,d.useState)(!1),[h,g]=(0,d.useState)(!0),_=(0,d.useRef)([]);(0,d.useEffect)(()=>{(async()=>{let e=await i();t(e),r(Array(e.length).fill(``)),g(await u())})()},[]);let v=(t,i)=>{if(!/^\d*$/.test(i))return;let a=[...n];a[t]=i.slice(-1),r(a),f(!1),i&&t<n.length-1&&_.current[t+1]?.focus();let o=a.join(``);o.length===e.length&&b(o)},y=(e,t)=>{t.key===`Backspace`&&!n[e]&&e>0&&_.current[e-1]?.focus()},b=async t=>{t===e.pin?(await a({...e,lastUnlocked:Date.now()}),g(!1),p.default.runtime.sendMessage({action:`open_dashboard`}),setTimeout(()=>window.close(),200)):(f(!0),r(Array(e.length).fill(``)),_.current[0]?.focus())};return e?e.enabled?h?(0,m.jsxs)(`div`,{className:`w-[320px] p-6 bg-vault-bg text-vault-text flex flex-col items-center gap-6 select-none`,children:[(0,m.jsxs)(`div`,{className:`relative`,children:[(0,m.jsx)(c,{size:32,className:s?`text-red-500 animate-bounce`:`text-vault-accent`}),(0,m.jsx)(`div`,{className:`absolute -inset-1 blur-lg bg-vault-accent/20 rounded-full`})]}),(0,m.jsxs)(`div`,{className:`text-center space-y-1`,children:[(0,m.jsx)(`h2`,{className:`text-xs font-mono font-black uppercase tracking-[0.2em]`,children:`Authenticating`}),(0,m.jsxs)(`p`,{className:`text-[10px] text-vault-muted font-bold tracking-tighter opacity-60`,children:[`Enter `,e.length,`-digit sequence`]})]}),(0,m.jsx)(`div`,{className:`flex gap-3 justify-center`,children:n.map((e,t)=>(0,m.jsx)(`input`,{ref:e=>{_.current[t]=e},type:`password`,inputMode:`numeric`,pattern:`[0-9]*`,maxLength:1,value:e,onChange:e=>v(t,e.target.value),onKeyDown:e=>y(t,e),className:`
              w-10 h-14 bg-vault-cardBg/50 border-2 rounded-xl text-center text-xl font-bold 
              focus:border-vault-accent focus:bg-vault-accent/5 outline-none transition-all
              ${s?`border-red-500/50 animate-shake`:`border-vault-border/50`}
              ${e?`border-vault-accent/50 scale-105 shadow-[0_0_15px_-5px_var(--color-vault-accent)]`:``}
            `,autoFocus:t===0},t))}),s&&(0,m.jsx)(`p`,{className:`text-[10px] font-black text-red-500 uppercase tracking-tighter animate-in slide-in-from-top-1`,children:`Invalid Access Code`}),(0,m.jsx)(`div`,{className:`text-[9px] text-vault-muted font-bold uppercase tracking-widest opacity-40`,children:`Vault-Central Security Protocol 4.0`})]}):(0,m.jsxs)(`div`,{className:`w-[320px] p-6 bg-[#0b0f19] text-white flex flex-col items-center gap-4 animate-in fade-in duration-500 border border-[#1e293b]`,children:[(0,m.jsx)(`style`,{children:`
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
        `}),(0,m.jsx)(o,{size:32,className:`text-[#10b981] animate-pulse`}),(0,m.jsx)(`p`,{className:`text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-[#10b981]`,children:`Vault Unlocked`}),(0,m.jsx)(`div`,{className:`w-full h-px bg-[#1e293b]`}),(0,m.jsx)(`button`,{onClick:()=>{p.default.runtime.sendMessage({action:`open_dashboard`}),window.close()},className:`vault-btn w-full p-3 text-[11px] font-black uppercase tracking-widest rounded-md`,children:`Access Mainframe`})]}):(0,m.jsxs)(`div`,{className:`w-[320px] p-6 bg-[#0b0f19] text-white flex flex-col items-center gap-4 border border-[#1e293b]`,children:[(0,m.jsx)(`style`,{children:`
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
        `}),(0,m.jsx)(l,{size:32,className:`text-[#3b82f6]`}),(0,m.jsx)(`p`,{className:`text-[10px] font-mono uppercase tracking-[0.2em] font-bold`,children:`Vault Unsecured`}),(0,m.jsx)(`button`,{onClick:()=>{p.default.runtime.sendMessage({action:`open_dashboard`}),window.close()},className:`vault-btn w-full p-3 text-[11px] font-black uppercase tracking-widest rounded-md`,children:`Open Dashboard`})]}):null},g=document.getElementById(`root`);g&&f.createRoot(g).render((0,m.jsx)(h,{}));
//# sourceMappingURL=pin.js.map