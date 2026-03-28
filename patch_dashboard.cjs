const fs = require('fs');
let code = fs.readFileSync('src/components/VaultDashboard.tsx', 'utf-8');

code = code.replace(
  /grid gap-4 md:gap-6/g,
  'grid gap-2 md:gap-4 lg:gap-6'
);

code = code.replace(
  /viewSize === 1 \? "flex-row items-center gap-4 h-24 p-4 hover:-translate-y-1" : "flex-col h-\\[380px\\]"/g,
  'viewSize === 0 ? "flex-row items-center gap-4 py-2 px-4 hover:bg-vault-cardBg/80" : viewSize === 1 ? "flex-row items-center gap-0 h-28 hover:-translate-y-1" : "flex-col rounded-xl overflow-hidden"'
);

code = code.replace(
  /\{\/\* THUMBNAIL AREA \*\/\\}\r?\n\s*\{viewSize !== 1 && \(/g,
  '{/* THUMBNAIL AREA */}\n                        {viewSize !== 0 && ('
);

code = code.replace(
  /className="relative w-full h-40 flex-none bg-vault-cardBg\/50 overflow-hidden cursor-pointer group\/thumb border-b border-vault-border rounded-t-lg"/g,
  'className={cn("relative flex-none bg-vault-cardBg/50 overflow-hidden cursor-pointer group/thumb", viewSize === 1 ? "w-40 h-full border-r border-vault-border" : "w-full aspect-video border-b border-vault-border rounded-t-lg")}'
);

code = code.replace(
  /<button className="thumb-action p.1\\.5 bg-black\/60 hover:bg-vault-accent text-white rounded shadow-lg backdrop-blur-md transition-all hover:scale-110" title="Edit Metadata">\r?\n\s*<Edit2 size=\{12\} \/>\r?\n\s*<\/button>/g,
  '<button onClick={(e) => { e.stopPropagation(); handleEdit(fav); }} className="thumb-action p-1.5 bg-black/60 hover:bg-vault-accent text-white rounded shadow-lg backdrop-blur-md transition-all hover:scale-110" title="Edit Metadata"><Edit2 size={12} /></button>'
);

code = code.replace(
  /<button className="thumb-action p.1\\.5 bg-black\/60 hover:bg-red-500 text-white rounded shadow-lg backdrop-blur-md transition-all hover:scale-110" title="Delete Item">\r?\n\s*<Trash2 size=\{12\} \/>\r?\n\s*<\/button>/g,
  '<button onClick={(e) => { e.stopPropagation(); handleDelete(fav.url); }} className="thumb-action p-1.5 bg-black/60 hover:bg-red-500 text-white rounded shadow-lg backdrop-blur-md transition-all hover:scale-110" title="Delete Item"><Trash2 size={12} /></button>'
);

code = code.replace(
  /viewSize === 1 \? "flex-row items-center justify-between w-full" : "p-4"/g,
  'viewSize === 0 ? "flex-row items-center justify-between w-full" : viewSize === 1 ? "flex-row items-center justify-between w-full p-4" : "p-4 flex flex-col flex-1"'
);

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
console.log('Done in node snippet!');
