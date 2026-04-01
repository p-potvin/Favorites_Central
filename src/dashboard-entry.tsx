import React from 'react';
import ReactDOM from 'react-dom/client';
import { VaultDashboard } from './components/VaultDashboard';
import './styles/globals.css';
import './styles/vault-themes.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <VaultDashboard />
  </React.StrictMode>
);
