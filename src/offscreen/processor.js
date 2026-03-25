import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import browser from 'webextension-polyfill';
import { savePreview } from '../lib/dexie-store';
let ffmpeg = null;
async function loadFFmpeg() {
    if (ffmpeg)
        return ffmpeg;
    ffmpeg = new FFmpeg();
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm';
    await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    });
    return ffmpeg;
}
browser.runtime.onMessage.addListener(async (message) => {
    if (message.action === 'generate_preview') {
        const { url, duration } = message.data;
        try {
            const result = await processVideoPreview(url, duration);
            if (result) {
                await savePreview(url, result);
                return { success: true };
            }
        }
        catch (err) {
            console.error('[VaultProcessor] Preview generation failed:', err);
            return { success: false, error: String(err) };
        }
    }
});
async function processVideoPreview(url, duration) {
    const fm = await loadFFmpeg();
    const inputName = 'input.mp4';
    const outputName = 'preview.webm';
    // Load the file into ffmpeg memory
    await fm.writeFile(inputName, await fetchFile(url));
    /**
     * Logic: 10 chunks of 2 seconds.
     * If duration <= 20, just take the whole thing.
     * Otherwise, we'll create a filter complex to select fragments.
     */
    if (duration <= 20) {
        await fm.exec([
            '-i', inputName,
            '-t', '20',
            '-vf', 'scale=426:240',
            '-an',
            '-c:v', 'libvpx-vp9',
            '-crf', '40',
            '-b:v', '0',
            outputName
        ]);
    }
    else {
        // Generate 10 segments of 2s spaced out
        const segmentDuration = 2;
        // Calculate interval between starts of 2s segments
        // 10 * 2 = 20s total, we need (duration - 20) / 9 intervals
        const interval = (duration - 20) / 9;
        let filter = '';
        for (let i = 0; i < 10; i++) {
            const start = i * (interval + segmentDuration);
            filter += `between(t,${start},${start + segmentDuration})+`;
        }
        filter = filter.slice(0, -1);
        await fm.exec([
            '-i', inputName,
            '-vf', `select='${filter}',setpts=N/FRAME_RATE/TB,scale=426:240`,
            '-an',
            '-c:v', 'libvpx-vp9',
            '-crf', '40',
            '-b:v', '0',
            outputName
        ]);
    }
    const data = await fm.readFile(outputName);
    const dataArray = (data instanceof Uint8Array) ? data : new Uint8Array(data);
    return new Blob([dataArray], { type: 'video/webm' });
}
