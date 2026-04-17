export const VAULT_THEMES = {
    1: { id: 1, name: 'vintage-velvet', mode: 'light' },
    2: { id: 2, name: 'cyberpunk-cinder', mode: 'dark' },
    3: { id: 3, name: 'golden-slate', mode: 'dark' },
    4: { id: 4, name: 'modern-monolith', mode: 'light' },
    5: { id: 5, name: 'crimson-bloom', mode: 'dark' },
    6: { id: 6, name: 'ocean-mist', mode: 'light' },
    7: { id: 7, name: 'neon-void', mode: 'dark' },
    8: { id: 8, name: 'royal-tangerine', mode: 'dark' },
    9: { id: 9, name: 'amethyst-frost', mode: 'light' },
    10: { id: 10, name: 'solarized-light', mode: 'light' },
    11: { id: 11, name: 'solarized-dark', mode: 'dark' },
};
export const getThemeClass = (id) => `vault-theme-${VAULT_THEMES[id]?.name || 'solarized-light'}`;
