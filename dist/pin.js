import{A as e,C as t,E as n,F as r,M as i,T as a,b as o,j as s,k as c,m as l,u}from"./globals.js";var d=r(i(),1),f=r(s(),1),p=r(c(),1),m=e(),h=()=>{let[e,r]=(0,d.useState)(null),[i,s]=(0,d.useState)([]),[c,f]=(0,d.useState)(!1),[h,g]=(0,d.useState)(!0),_=(0,d.useRef)([]);(0,d.useEffect)(()=>{(async()=>{let e=await t();r(e),s(Array(e.length).fill(``)),g(await a())})()},[]);let v=(t,n)=>{if(!/^\d*$/.test(n))return;let r=[...i];r[t]=n.slice(-1),s(r),f(!1),n&&t<i.length-1&&_.current[t+1]?.focus();let a=r.join(``);a.length===e.length&&b(a)},y=(e,t)=>{t.key===`Backspace`&&!i[e]&&e>0&&_.current[e-1]?.focus()},b=async t=>{t===e.pin?(await n({...e,lastUnlocked:Date.now()}),g(!1),p.default.runtime.sendMessage({action:`open_dashboard`}),setTimeout(()=>window.close(),200)):(f(!0),s(Array(e.length).fill(``)),_.current[0]?.focus())};return e?e.enabled?h?(0,m.jsxs)(`div`,{className:`w-[320px] p-6 bg-vault-bg text-vault-text flex flex-col items-center gap-6 select-none`,children:[(0,m.jsxs)(`div`,{className:`relative`,children:[(0,m.jsx)(l,{size:32,className:c?`text-red-500 animate-bounce`:`text-vault-accent`}),(0,m.jsx)(`div`,{className:`absolute -inset-1 blur-lg bg-vault-accent/20 rounded-full`})]}),(0,m.jsxs)(`div`,{className:`text-center space-y-1`,children:[(0,m.jsx)(`h2`,{className:`text-xs font-mono font-black uppercase tracking-[0.2em]`,children:`Authenticating`}),(0,m.jsxs)(`p`,{className:`text-[10px] text-vault-muted font-bold tracking-tighter opacity-60`,children:[`Enter `,e.length,`-digit sequence`]})]}),(0,m.jsx)(`div`,{className:`flex gap-3 justify-center`,children:i.map((e,t)=>(0,m.jsx)(`input`,{ref:e=>{_.current[t]=e},type:`password`,inputMode:`numeric`,pattern:`[0-9]*`,maxLength:1,value:e,onChange:e=>v(t,e.target.value),onKeyDown:e=>y(t,e),className:`
              w-10 h-14 bg-vault-cardBg/50 border-2 rounded-xl text-center text-xl font-bold 
              focus:border-vault-accent focus:bg-vault-accent/5 outline-none transition-all
              ${c?`border-red-500/50 animate-shake`:`border-vault-border/50`}
              ${e?`border-vault-accent/50 scale-105 shadow-[0_0_15px_-5px_var(--color-vault-accent)]`:``}
            `,autoFocus:t===0},t))}),c&&(0,m.jsx)(`p`,{className:`text-[10px] font-black text-red-500 uppercase tracking-tighter animate-in slide-in-from-top-1`,children:`Invalid Access Code`}),(0,m.jsx)(`div`,{className:`text-[9px] text-vault-muted font-bold uppercase tracking-widest opacity-40`,children:`Vault-Central Security Protocol 4.0`})]}):(0,m.jsxs)(`div`,{className:`w-[320px] p-6 bg-[#0b0f19] text-white flex flex-col items-center gap-4 animate-in fade-in duration-500 border border-[#1e293b]`,children:[(0,m.jsx)(`style`,{children:`
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
        `}),(0,m.jsx)(u,{size:32,className:`text-[#3b82f6]`}),(0,m.jsx)(`p`,{className:`text-[10px] font-mono uppercase tracking-[0.2em] font-bold`,children:`Vault Unsecured`}),(0,m.jsx)(`button`,{onClick:()=>{p.default.runtime.sendMessage({action:`open_dashboard`}),window.close()},className:`vault-btn w-full p-3 text-[11px] font-black uppercase tracking-widest rounded-md`,children:`Open Dashboard`})]}):null},g=document.getElementById(`root`);g&&f.createRoot(g).render((0,m.jsx)(h,{}));
//# sourceMappingURL=pin.js.map