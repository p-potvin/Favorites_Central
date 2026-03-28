const fs = require('fs');

let code = fs.readFileSync('src/components/VaultDashboard.tsx', 'utf-8');

// 1. Add Cloud icon import
code = code.replace(
  /Trash2, Edit2, Play, X, AlertTriangle, RefreshCw, Lock/g,
  'Trash2, Edit2, Play, X, AlertTriangle, RefreshCw, Lock, UploadCloud, Loader2'
);

// 2. Import Google Drive helper
if(!code.includes('authenticateGoogleDrive')) {
  code = code.replace(
    /import \{ cn \} from '\.\.\/lib\/utils';/g,
    "import { cn } from '../lib/utils';\nimport { authenticateGoogleDrive, uploadVideoToDrive } from '../lib/google-drive';"
  );
}

// 3. Add handleDriveUpload function
const handleDrive = 
`  const [uploadingItem, setUploadingItem] = useState<string | null>(null);

  const handleDriveUpload = async (fav: VideoData) => {
    if (!fav.rawVideoSrc) {
      alert('No video source available for this item.');
      return;
    }

    setUploadingItem(fav.url);
    try {
      // 1. Authenticate
      const token = await authenticateGoogleDrive();
      
      // 2. Fetch the video blob
      const res = await fetch(fav.rawVideoSrc);
      const blob = await res.blob();
      
      // 3. Upload to Google Drive
      const filename = fav.title ? fav.title + '.mp4' : 'Untitled-Video.mp4';
      await uploadVideoToDrive(token, blob, filename);
      
      alert('Successfully saved to Google Drive!');
    } catch (err: any) {
      console.error(err);
      alert('Failed to upload to Google Drive: ' + err.message);
    } finally {
      setUploadingItem(null);
    }
  };

  const cycleTheme = () => {`;

code = code.replace(/  const cycleTheme = \(\) => \{/g, handleDrive);

// 4. Add the button to the UI
const uploadButton = 
`                            <div className="absolute top-2 right-2 z-30 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex flex-col gap-2">
                              <button disabled={uploadingItem === fav.url} onClick={(e) => { e.stopPropagation(); handleDriveUpload(fav); }} className="thumb-action p-1.5 bg-black/60 hover:bg-vault-accent text-white rounded shadow-lg backdrop-blur-md transition-all hover:scale-110 disabled:opacity-50 disabled:hover:scale-100" title="Save to Google Drive">
                                {uploadingItem === fav.url ? <Loader2 size={12} className="animate-spin" /> : <UploadCloud size={12} />}
                              </button>
                              <button onClick={(e) => { e.stopPropagation(); handleDelete(fav.url); }}`;

code = code.replace(
  /<div className="absolute top-2 right-2 z-30 opacity-0 group-hover\/thumb:opacity-100 transition-opacity flex flex-col gap-2">\s+<button onClick=\{\(e\) => \{ e\.stopPropagation\(\); handleDelete\(fav\.url\); \}\}/g,
  uploadButton
);

fs.writeFileSync('src/components/VaultDashboard.tsx', code);
console.log('Modified VaultDashboard.tsx');
