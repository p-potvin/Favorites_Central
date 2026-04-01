with open('scripts/generate-themes.py', 'r') as f:
    text = f.read()

text = text.replace('ts_lines.append("export const getThemeClass = (id: number) =>\nault-theme-;\"', 'ts_lines.append("export const getThemeClass = (id: number) => `vault-theme-${VAULT_THEMES[id]?.name || \'cyberpunk-cinder\'}`;")')
# let's just write the end directly

text = text.split('ts_lines.append("};")[0]')[0] + 'ts_lines.append("};")\nts_lines.append("export const getThemeClass = (id: number) => `vault-theme-${VAULT_THEMES[id]?.name || \'cyberpunk-cinder\'}`;")\n'

with open('scripts/generate-themes.py', 'w') as f:
    f.write(text + "\nwith open(os.path.join(os.path.dirname(__file__), '..', 'src', 'lib', 'themes.ts'), 'w') as f:\n    f.write('\\n'.join(ts_lines))\n\nwith open(os.path.join(os.path.dirname(__file__), '..', 'src', 'styles', 'vault-themes.css'), 'w') as f:\n    f.write('\\n'.join(css_lines))\n")
