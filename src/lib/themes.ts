export type VaultTheme = {
  id: number;
  name: string;
  mode: 'light' | 'dark';
};

export const VAULT_THEMES: Record<number, VaultTheme> = {
  1: { id: 1, name: 'burgundy-beige', mode: 'light' },
  2: { id: 2, name: 'solarized-orange', mode: 'dark' },
  3: { id: 3, name: 'gold-dark', mode: 'dark' },
  4: { id: 4, name: 'grayscale-light', mode: 'light' },
  5: { id: 5, name: 'rosy-red', mode: 'dark' },
  6: { id: 6, name: 'ocean-light', mode: 'light' },
  7: { id: 7, name: 'neon-dark', mode: 'dark' },
  8: { id: 8, name: 'sunset-purple', mode: 'dark' },
  9: { id: 9, name: 'royal-light', mode: 'light' },
};

export const getThemeClass = (id: number) => `vault-theme-${VAULT_THEMES[id]?.name || 'gold-dark'}`;
