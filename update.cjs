const fs = require('fs');
let code = fs.readFileSync('src/components/VaultDashboard.tsx', 'utf-8');

// Sidebar overflow fix
code = code.replace(
  /"space-y-4 whitespace-nowrap overflow-hidden"/g,
  '"space-y-4 overflow-x-hidden"'
);

// Handlers injections
const handlers = `  const handleDelete = async (url: string) => {
    if (window.confirm('Are you sure you want to delete this vault item?')) {
      const remaining = items.filter(i => i.url !== url);
      await saveVideos(remaining);
      setItems(remaining);
    }
  };

  const handleEdit = async (fav: VideoData) => {
    const newTitle = window.prompt('Edit item title:', fav.title || '');
    if (newTitle !== null && newTitle.trim() !== '') {
      const updated = items.map(i => i.url === fav.url ? { ...i, title: newTitle.trim() } : i);
      await saveVideos(updated);
      setItems(updated);
    }
  };

  const cycleTheme = () => {`;
code = code.replace(/  const cycleTheme = \(\) => {/g, handlers);


// View Mode min & text (add 0 to 5)
code = code.replace(
  /<input \n                type="range" \n                min="1" \n                max="5" /g,
  '<input \n                type="range" \n                min="0" \n                max="5" '
);
code = code.replace(
  /<span>Details<\/span>\n                <span>Biggest<\/span>/g,
  '<span>Details</span>\n                <span>List</span>\n                <span>Largest</span>'
);

// Adding Skin Module widget before PIN System
const skinWidget = `            {/* Skin Module */}
            <div className="pt-2">
              <label className="text-xs font-bold text-vault-muted uppercase tracking-widest flex items-center gap-2 mb-3">
                <LayoutTemplate size={14} className="text-vault-accent" /> Skin Module
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[1,2,3,4,5,6,7,8,9].map(skin => (
                  <button 
                    key={skin}
                    onClick={() => {
                      setCurrentSkin(skin);
                      const mode = (skin === 1 || skin === 4 || skin === 6 || skin === 9) ? 'light' : 'dark';
                      document.documentElement.setAttribute('data-theme', \`skin-\$\{skin\}\`);
                      document.documentElement.classList.toggle('dark', mode === 'dark');
                      localStorage.setItem('vault-skin', skin.toString());
                    }}
                    className={cn(
                      "h-6 rounded-sm border transition-all flex items-center justify-center bg-vault-cardBg hover:bg-vault-accent/20",
                      currentSkin === skin ? "border-vault-accent text-vault-accent shadow-[0_0_8px_-2px_var(--vault-accent)]" : "border-vault-border text-vault-muted"
                    )}
                    title={\`Apply Skin \$\{skin\}\`}
                  >
                    <span className="text-[10px] font-bold">{skin}</span>
                  </button>
                ))}
              </div>
            </div>

            <hr className="border-vault-border opacity-50 my-2" />
            
            {/* PIN System */}`;
code = code.replace(/            \{\/\* PIN System \*\/\}/g, skinWidget);

// Update viewClasses and itemsPerPageParams
const viewClasses = `  const viewClasses = {
    0: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3', // True Details (Compact Windows Explorer style) 
    1: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3', // Visual List (Show thumbnail + info)
    2: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5', // Small
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4', // Medium
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3', // Large
    5: 'grid-cols-1 xl:grid-cols-2', // Biggest
  };

  const itemsPerPageParams: Record<number, number> = {
    0: 12, // More items per page since it's compact
    1: 8,
    2: 10,
    3: 8,
    4: 6,
    5: 4
  };`;
code = code.replace(
  /  const viewClasses = \{\n    1: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2', \/\/ Details \(List\) - adjusted to fit more if needed\n    2: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5', \/\/ Small\n    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4', \/\/ Medium\n    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3', \/\/ Large\n    5: 'grid-cols-1 xl:grid-cols-2', \/\/ Biggest\n  \};\n\n  const itemsPerPageParams: Record<number, number> = \{\n    1: 6, \/\/ 1 col initially, 2 in md\. Let's say 6\.\n    2: 10,\n    3: 8,\n    4: 6,\n    5: 4\n  \};/g,
  viewClasses
);

// Gap layout
code = code.replace(
  /"grid gap-4 md:gap-6"/g,
  '"grid gap-2 md:gap-4 lg:gap-6"'
);

// Card logic
code = code.replace(
  /viewSize === 1 \? "flex-row items-center gap-4 h-24 p-4 hover:-translate-y-1" : "flex-col h-\\[380px\\]"/g,
  'viewSize === 0 ? "flex-row items-center gap-4 py-2 px-4 hover:bg-vault-cardBg/80" : viewSize === 1 ? "flex-row items-center gap-0 h-28 hover:-translate-y-1" : "flex-col rounded-xl overflow-hidden min-h-[300px]"'
);

code = code.replace(
  /\{viewSize !== 1 && \(/g,
  '{viewSize !== 0 && ('
);

code = code.replace(
  /className="relative w-full h-40 flex-none bg-vault-cardBg\/50 overflow-hidden cursor-pointer group\/thumb border-b border-vault-border rounded-t-lg"/g,
  'className={cn("relative flex-none bg-vault-cardBg/50 overflow-hidden cursor-pointer group/thumb flex items-center justify-center", viewSize === 1 ? "w-40 h-full border-r border-vault-border" : "w-full aspect-video border-b border-vault-border rounded-t-lg")}'
);

// Map onclick for buttons inside thumbs
code = code.replace(
  /<button className="thumb-action p-1\.5 bg-black\/60 hover:bg-vault-accent text-white rounded shadow-lg backdrop-blur-md transition-all hover:scale-110" title="Edit Metadata">\n\s+<Edit2 size=\{12\} \/>\n\s+<\/button>/g,
  '<button onClick={(e) => { e.stopPropagation(); handleEdit(fav); }} className="thumb-action p-1.5 bg-black/60 hover:bg-vault-accent text-white rounded shadow-lg backdrop-blur-md transition-all hover:scale-110" title="Edit Metadata"><Edit2 size={12} /></button>'
);

code = code.replace(
  /<button className="thumb-action p-1\.5 bg-black\/60 hover:bg-red-500 text-white rounded shadow-lg backdrop-blur-md transition-all hover:scale-110" title="Delete Item">\n\s+<Trash2 size=\{12\} \/>\n\s+<\/button>/g,
  '<button onClick={(e) => { e.stopPropagation(); handleDelete(fav.url); }} className="thumb-action p-1.5 bg-black/60 hover:bg-red-500 text-white rounded shadow-lg backdrop-blur-md transition-all hover:scale-110" title="Delete Item"><Trash2 size={12} /></button>'
);

// Main Content logic
code = code.replace(
  /viewSize === 1 \? "flex-row items-center justify-between w-full" : "p-4"/g,
  'viewSize === 0 ? "flex-row items-center justify-between w-full" : viewSize === 1 ? "flex-row items-center justify-between w-full p-4" : "p-4 flex flex-col flex-1"'
);

// Missing ID pill logic
code = code.replace(
  /viewSize === 1 && "mb-0"/g,
  '(viewSize === 0 || viewSize === 1) && "hidden"'
);

code = code.replace(
  /viewSize === 1 \? "flex items-center justify-between w-full ml-4" : "flex flex-col"/g,
  '(viewSize === 0 || viewSize === 1) ? "flex items-center justify-between w-full ml-4" : "flex flex-col"'
);

code = code.replace(
  /viewSize === 1 \? "flex-1 mr-4" : ""/g,
  '(viewSize === 0 || viewSize === 1) ? "flex-1 mr-4 min-w-0" : "flex-1"'
);

code = code.replace(
  /viewSize === 1 \? "text-base line-clamp-1" : "text-\\[15px\\] line-clamp-2"/g,
  'viewSize === 0 ? "text-sm line-clamp-1 font-semibold" : viewSize === 1 ? "text-base line-clamp-1" : "text-[15px] line-clamp-2"'
);

code = code.replace(
  /viewSize > 1 && \(/g,
  'viewSize > 0 && ('
);

code = code.replace(
  /viewSize === 1 \? "border-none ml-4 gap-4 mt-0 pt-0" : "border-t"/g,
  '(viewSize === 0 || viewSize === 1) ? "border-none ml-4 gap-4 mt-0 pt-0" : "border-t mt-auto"'
);


fs.writeFileSync('src/components/VaultDashboard.tsx', code);
console.log('Update script executed successfully');