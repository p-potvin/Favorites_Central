import Dexie from 'dexie';
import CryptoJS from 'crypto-js';
import { getPinSettings, isVaultLocked } from './storage-vault';
export class VaultDexie extends Dexie {
    previews;
    constructor() {
        super('VaultPreviews');
        this.version(1).stores({
            previews: '++id, videoUrl, timestamp'
        });
    }
}
const enableLogging = true;
function dbLog(...args) {
    if (enableLogging)
        console.log('[VaultDexie]', ...args);
}
export const db = new VaultDexie();
// Attach db to window for debugging
if (typeof window !== 'undefined') {
    window.__VAULT_DEXIE_DB__ = db;
    window.__VAULT_TEST_PREVIEW__ = async (url) => {
        const preview = await getPreview(url);
        console.log("TEST PREVIEW RESULT:", preview);
        if (preview) {
            const url = URL.createObjectURL(preview);
            console.log("TEST PREVIEW URL:", url);
            window.open(url, "_blank");
        }
    };
    dbLog("Debug tools attached to window.__VAULT_DEXIE_DB__ and window.__VAULT_TEST_PREVIEW__");
}
/**
 * [VaultAuth] Secure Blob Store
 * Encrypts previews with the user's PIN if PIN is enabled.
 */
export async function savePreview(videoUrl, blob) {
    dbLog(`savePreview called for ${videoUrl}. Blob size: ${blob.size}, type: ${blob.type}`);
    const settings = await getPinSettings();
    let finalData = blob;
    let isEncrypted = false;
    if (settings.enabled && settings.pin) {
        dbLog(`PIN is enabled. Encrypting blob...`);
        const arrayBuffer = await blob.arrayBuffer();
        const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer);
        const encrypted = CryptoJS.AES.encrypt(wordArray, settings.pin).toString();
        finalData = new TextEncoder().encode(encrypted);
        isEncrypted = true;
        dbLog(`Encryption complete. Encrypted size: ${finalData.byteLength}`);
    }
    else {
        dbLog(`PIN disabled. Storing plaintext blob.`);
    }
    try {
        await db.previews.where('videoUrl').equals(videoUrl).delete();
        dbLog(`Deleted old preview (if any) for ${videoUrl}`);
        await db.previews.add({
            videoUrl,
            blob: finalData,
            mimeType: blob.type,
            timestamp: Date.now(),
            encrypted: isEncrypted
        });
        dbLog(`Successfully saved new preview for ${videoUrl}`);
    }
    catch (err) {
        dbLog(`Failed to save preview:`, err);
    }
}
/**
 * [VaultAuth] Secure Blob Retrieval
 * Decrypts previews on the fly. Returns null if vault is locked.
 */
export async function getPreview(videoUrl) {
    dbLog(`getPreview called: ${videoUrl}`);
    if (await isVaultLocked()) {
        dbLog(`Vault looks locked! Cannot getPreview for ${videoUrl}`);
        return null;
    }
    const record = await db.previews.where('videoUrl').equals(videoUrl).first();
    if (!record) {
        dbLog(`No preview found in DB for ${videoUrl}`);
        return null;
    }
    if (record.encrypted) {
        dbLog(`Preview record found and is encrypted. Proceeding to decrypt...`);
        const settings = await getPinSettings();
        if (!settings.pin) {
            dbLog(`Preview is encrypted but no PIN provided. Returning null.`);
            return null;
        }
        try {
            const encryptedStr = new TextDecoder().decode(record.blob);
            const decrypted = CryptoJS.AES.decrypt(encryptedStr, settings.pin);
            const typedArray = new Uint8Array(decrypted.sigBytes);
            const words = decrypted.words;
            const sigBytes = decrypted.sigBytes;
            for (let i = 0; i < sigBytes; i++) {
                typedArray[i] = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
            }
            dbLog(`Successfully decrypted WebM! Returning ${record.mimeType}`);
            return new Blob([typedArray], { type: record.mimeType });
        }
        catch (e) {
            console.error("[VaultAuth] Decryption failed:", e);
            dbLog(`Decryption failure:`, e);
            return null;
        }
    }
    dbLog(`Preview record found (plaintext). Yielding Blob:`, record.blob);
    return record.blob;
}
