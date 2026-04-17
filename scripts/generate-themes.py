import sys
import os

sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'vault-themes'))
from theme_manager import VaultThemeManager

def adjust_color(hex_color, amount):
    hex_color = hex_color.lstrip('#')
    r, g, b = tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))
    r = max(0, min(255, r + amount))
    g = max(0, min(255, g + amount))
    b = max(0, min(255, b + amount))
    return f"#{r:02x}{g:02x}{b:02x}"

def blend_hex(base_hex, mix_hex, ratio):
    base = base_hex.lstrip('#')
    mix = mix_hex.lstrip('#')
    br, bg, bb = (int(base[i:i+2], 16) for i in (0, 2, 4))
    mr, mg, mb = (int(mix[i:i+2], 16) for i in (0, 2, 4))
    r = round(br + (mr - br) * ratio)
    g = round(bg + (mg - bg) * ratio)
    b = round(bb + (mb - bb) * ratio)
    return f"#{r:02x}{g:02x}{b:02x}"

tm = VaultThemeManager()
themes = tm.get_themes()

css_lines = []
ts_lines = [
    "// AUTO-GENERATED FROM vault-themes — DO NOT EDIT MANUALLY",
    "export type VaultTheme = { id: number; name: string; mode: 'light' | 'dark'; };",
    "export const VAULT_THEMES: Record<number, VaultTheme> = {"
]

for idx, t in enumerate(themes):
    theme_id = idx + 1
    safe_name = t.name.lower().replace(' ', '-')
    ts_lines.append(f"  {theme_id}: {{ id: {theme_id}, name: '{safe_name}', mode: '{t.mode}' }},")

    tokens = tm.export_theme_tokens(t)

    css_lines.append(f'[data-theme="vault-theme-{safe_name}"] {{')
    css_lines.append(f'  --vault-bg: {tokens["background"]};')
    css_lines.append(f'  --vault-surface: {tokens["surface"]};')
    css_lines.append(f'  --vault-surface-elevated: {tokens["surface_elevated"]};')
    css_lines.append(f'  --vault-text: {tokens["text_primary"]};')
    css_lines.append(f'  --vault-text-secondary: {tokens["text_secondary"]};')
    css_lines.append(f'  --vault-accent: {tokens["accent"]};')
    css_lines.append(f'  --vault-accent-hover: {tokens["accent_hover"]};')
    css_lines.append(f'  --vault-border: {tokens["border_subtle"]};')
    css_lines.append(f'  --vault-focus-ring: {tokens["focus_ring"]};')
    css_lines.append(f'  --vault-muted: {tokens["text_secondary"]};')
    css_lines.append(f'  --vault-success: {tokens["success"]};')
    css_lines.append(f'  --vault-warning: {tokens["warning"]};')
    css_lines.append(f'  --vault-danger: {tokens["danger"]};')

    if t.mode == 'dark':
        css_lines.append(f'  --vault-card-bg: rgba(0,0,0,0.35);')
    else:
        css_lines.append(f'  --vault-card-bg: rgba(255,255,255,0.65);')

    css_lines.append('}')
    css_lines.append('')

# Add the Solarized Light theme (not in theme_manager yet, defined in STYLE.md)
css_lines.append('[data-theme="vault-theme-solarized-light"] {')
css_lines.append('  --vault-bg: #FDF6E3;')
css_lines.append('  --vault-surface: #EEE8D5;')
css_lines.append('  --vault-surface-elevated: #DDD6C1;')
css_lines.append('  --vault-text: #657B83;')
css_lines.append('  --vault-text-secondary: #93A1A1;')
css_lines.append('  --vault-accent: #268BD2;')
css_lines.append('  --vault-accent-hover: #1A6FAF;')
css_lines.append('  --vault-border: #EEE8D5;')
css_lines.append('  --vault-focus-ring: #268BD2;')
css_lines.append('  --vault-muted: #93A1A1;')
css_lines.append('  --vault-success: #859900;')
css_lines.append('  --vault-warning: #B58900;')
css_lines.append('  --vault-danger: #DC322F;')
css_lines.append('  --vault-card-bg: rgba(255,255,255,0.65);')
css_lines.append('}')
css_lines.append('')

# Add Solarized Dark theme
css_lines.append('[data-theme="vault-theme-solarized-dark"] {')
css_lines.append('  --vault-bg: #002B36;')
css_lines.append('  --vault-surface: #073642;')
css_lines.append('  --vault-surface-elevated: #0A4050;')
css_lines.append('  --vault-text: #839496;')
css_lines.append('  --vault-text-secondary: #586E75;')
css_lines.append('  --vault-accent: #268BD2;')
css_lines.append('  --vault-accent-hover: #3A9FE6;')
css_lines.append('  --vault-border: #073642;')
css_lines.append('  --vault-focus-ring: #268BD2;')
css_lines.append('  --vault-muted: #586E75;')
css_lines.append('  --vault-success: #859900;')
css_lines.append('  --vault-warning: #B58900;')
css_lines.append('  --vault-danger: #DC322F;')
css_lines.append('  --vault-card-bg: rgba(0,0,0,0.35);')
css_lines.append('}')
css_lines.append('')

# Add solarized themes to TypeScript
ts_lines.append("  10: { id: 10, name: 'solarized-light', mode: 'light' },")
ts_lines.append("  11: { id: 11, name: 'solarized-dark', mode: 'dark' },")

ts_lines.append("};")
ts_lines.append("export const getThemeClass = (id: number) => `vault-theme-${VAULT_THEMES[id]?.name || 'solarized-light'}`;")

with open(os.path.join(os.path.dirname(__file__), '..', 'src', 'lib', 'themes.ts'), 'w') as f:
    f.write('\n'.join(ts_lines))

with open(os.path.join(os.path.dirname(__file__), '..', 'src', 'styles', 'vault-themes.css'), 'w') as f:
    f.write('\n'.join(css_lines))
