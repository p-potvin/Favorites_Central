import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import browser from 'webextension-polyfill';
import { getPinSettings, savePinSettings, isVaultLocked } from './lib/storage-vault';
import { Shield, Lock, Unlock, Key, RefreshCw } from 'lucide-react';
import './styles/globals.css';

const PinPopup: React.FC = () => {
  const [pinSettings, setPinSettings] = useState<any>(null);
  const [pin, setPin] = useState<string[]>([]);
  const [error, setError] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const load = async () => {
      const settings = await getPinSettings();
      setPinSettings(settings);
      setPin(new Array(settings.length).fill(''));
      
      const locked = await isVaultLocked();
      setIsLocked(locked);
      
      if (!locked) {
        // If not locked, we could redirect or show "Unlocked" status
        // For now, let's focus first box if it is locked
      }
    };
    load();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only numbers
    
    const newPin = [...pin];
    newPin[index] = value.slice(-1); // Only take last char
    setPin(newPin);
    setError(false);

    // Focus next box
    if (value && index < pin.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    // Auto-submit if full
    const fullPin = newPin.join('');
    if (fullPin.length === pinSettings.length) {
      handleVerify(fullPin);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (enteredPin: string) => {
    if (enteredPin === pinSettings.pin) {
      const updated = { ...pinSettings, lastUnlocked: Date.now() };
      await savePinSettings(updated);
      setIsLocked(false);
      
      // Success animation then close/redirect?
      // Proton logic: "Successfully entered PIN logs you in but does not open dashboard"
      // Usually popup closes or shows "Vault Unlocked"
      setTimeout(() => window.close(), 500);
    } else {
      setError(true);
      setPin(new Array(pinSettings.length).fill(''));
      inputsRef.current[0]?.focus();
      // Vibrate/Shake effect here if possible
    }
  };

  if (!pinSettings) return null;

  // If PIN is disabled, just show a message or redirect to dashboard?
  // Usually the action should be blocked before showing popup if possible, 
  // but if popup opens, we handle it.
  if (!pinSettings.enabled) {
    return (
      <div className="w-[320px] p-6 bg-[#0b0f19] text-white flex flex-col items-center gap-4 border border-[#1e293b]">
        <style>{`
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
        `}</style>
        <Shield size={32} className="text-[#3b82f6]" />
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold">Vault Unsecured</p>
        <button 
          onClick={() => browser.tabs.create({ url: browser.runtime.getURL('dashboard-v2.html') })}
          className="vault-btn w-full p-3 text-[11px] font-black uppercase tracking-widest rounded-md"
        >
          Open Dashboard
        </button>
      </div>
    );
  }

  if (!isLocked) {
    return (
      <div className="w-[320px] p-6 bg-[#0b0f19] text-white flex flex-col items-center gap-4 animate-in fade-in duration-500 border border-[#1e293b]">
        <style>{`
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
        `}</style>
        <Unlock size={32} className="text-[#10b981] animate-pulse" />
        <p className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-[#10b981]">Vault Unlocked</p>
        <div className="w-full h-px bg-[#1e293b]" />
        <button 
          onClick={() => browser.tabs.create({ url: browser.runtime.getURL('dashboard-v2.html') })}
          className="vault-btn w-full p-3 text-[11px] font-black uppercase tracking-widest rounded-md"
        >
          Access Mainframe
        </button>
      </div>
    );
  }

  return (
    <div className="w-[320px] p-6 bg-vault-bg text-vault-text flex flex-col items-center gap-6 select-none">
      <div className="relative">
        <Lock size={32} className={error ? "text-red-500 animate-bounce" : "text-vault-accent"} />
        <div className="absolute -inset-1 blur-lg bg-vault-accent/20 rounded-full" />
      </div>
      
      <div className="text-center space-y-1">
        <h2 className="text-xs font-mono font-black uppercase tracking-[0.2em]">Authenticating</h2>
        <p className="text-[10px] text-vault-muted font-bold tracking-tighter opacity-60">Enter {pinSettings.length}-digit sequence</p>
      </div>

      <div className="flex gap-3 justify-center">
        {pin.map((digit, idx) => (
          <input
            key={idx}
            ref={el => { inputsRef.current[idx] = el; }}
            type="password"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            onChange={e => handleChange(idx, e.target.value)}
            onKeyDown={e => handleKeyDown(idx, e)}
            className={`
              w-10 h-14 bg-vault-cardBg/50 border-2 rounded-xl text-center text-xl font-bold 
              focus:border-vault-accent focus:bg-vault-accent/5 outline-none transition-all
              ${error ? 'border-red-500/50 animate-shake' : 'border-vault-border/50'}
              ${digit ? 'border-vault-accent/50 scale-105 shadow-[0_0_15px_-5px_var(--color-vault-accent)]' : ''}
            `}
            autoFocus={idx === 0}
          />
        ))}
      </div>

      {error && (
        <p className="text-[10px] font-black text-red-500 uppercase tracking-tighter animate-in slide-in-from-top-1">
          Invalid Access Code
        </p>
      )}

      <div className="text-[9px] text-vault-muted font-bold uppercase tracking-widest opacity-40">
        Vault-Central Security Protocol 4.0
      </div>
    </div>
  );
};

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(<PinPopup />);
}
