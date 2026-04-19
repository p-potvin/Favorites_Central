import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import browser from 'webextension-polyfill';
import { savePreview } from '../lib/dexie-store';

let ffmpeg: FFmpeg | null = null;

async function loadFFmpeg() {
  if (ffmpeg) return ffmpeg;
  ffmpeg = new FFmpeg();
  
  const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm';
  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
  });
  return ffmpeg;
}

browser.runtime.onMessage.addListener(async (message: any) => {
  if (message.action === 'generate_preview') {
    const { url, duration } = message.data;
    try {
      const result = await processVideoPreview(url, duration);
      if (result) {
        await savePreview(url, result);
        return { success: true };
      }
    } catch (err) {
      console.error('[VaultProcessor] Preview generation failed:', err);
      return { success: false, error: String(err) };
    }
  }
});

async function processVideoPreview(url: string, duration: number): Promise<Blob | null> {
  const fm = await loadFFmpeg();
  const inputName = `input_${Date.now()}.mp4`; 
  const outputName = `preview_${Date.now()}.webm`;

  let resultBlob: Blob | null = null;
  try {
    // WARNING: This will crash the WASM instance if the file is too large (e.g., > 500MB).
    // Rely on the content script's Canvas MediaRecorder whenever possible.
    const fileData = await fetchFile(url);
    await fm.writeFile(inputName, fileData);

    const baseEncodingArgs = [
      '-an', // No audio
      '-c:v', 'libvpx', // VP8 is significantly faster in WASM than VP9
      '-crf', '40',
      '-b:v', '0',
      '-cpu-used', '5', // Speed optimization for VPx encoders
      '-deadline', 'realtime',
      '-threads', '4'
    ];

    if (duration <= 20) {
      await fm.exec([
        '-i', inputName,
        '-t', '20',
        '-vf', 'scale=426:240',
        ...baseEncodingArgs,
        outputName
      ]);
    } else {
      const segmentDuration = 2;
      const numSegments = 10;
      const interval = (duration - 20) / (numSegments - 1);
      
      const inputArgs: string[] = [];
      const filterParts: string[] = [];

      // Use Input Seeking (-ss before -i) to jump directly to timestamps without decoding
      for (let i = 0; i < numSegments; i++) {
          const startTimestamp = (i * interval).toFixed(2);
          inputArgs.push('-ss', startTimestamp, '-t', segmentDuration.toString(), '-i', inputName);
          
          // Add scale filter to each segment before concatenation to ensure uniform size
          filterParts.push(`[${i}:v]scale=426:240,setpts=PTS-STARTPTS[v${i}]; `);
      }

      // Concat the scaled segments
      for (let i = 0; i < numSegments; i++) {
          filterParts.push(`[v${i}]`);
      }
      filterParts.push(`concat=n=${numSegments}:v=1:a=0[outv]`);

      await fm.exec([
        ...inputArgs,
        '-filter_complex', filterParts.join(''),
        '-map', '[outv]',
        ...baseEncodingArgs,
        outputName
      ]);
    }

    const data = await fm.readFile(outputName);
    const dataArray = (data instanceof Uint8Array) ? data : new Uint8Array(data as any);
    resultBlob = new Blob([dataArray], { type: 'video/webm' });
  } finally {
    try {
      await fm.deleteFile(inputName);
      await fm.deleteFile(outputName);
    } catch (e) {}
  }
  return resultBlob;
}