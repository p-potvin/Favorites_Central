import Dexie, { Table } from 'dexie';
import CryptoJS from 'crypto-js';
import { getPinSettings, isVaultLocked } from './storage-vault';

export interface PreviewBlob {
  id?: number;
  videoUrl: string;
  blob: Blob | Uint8Array; // Can be raw or encrypted bytes
  mimeType: string;
  timestamp: number;
  encrypted?: boolean;
}

export class VaultDexie extends Dexie {
  previews!: Table<PreviewBlob>;

  constructor() {
    super('VaultPreviews');
    this.version(1).stores({
      previews: '++id, videoUrl, timestamp'
    });
  }
}

export const db = new VaultDexie();

/**
 * [VaultAuth] Secure Blob Store
 * Encrypts previews with the user's PIN if PIN is enabled.
 */
export async function savePreview(videoUrl: string, blob: Blob): Promise<void> {
  const settings = await getPinSettings();
  let finalData: Blob | Uint8Array = blob;
  let isEncrypted = false;

  if (settings.enabled && settings.pin) {
    const arrayBuffer = await blob.arrayBuffer();
    const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer as any);
    const encrypted = CryptoJS.AES.encrypt(wordArray, settings.pin).toString();
    finalData = new TextEncoder().encode(encrypted);
    isEncrypted = true;
  }

  await db.previews.where('videoUrl').equals(videoUrl).delete();
  await db.previews.add({
    videoUrl,
    blob: finalData,
    mimeType: blob.type,
    timestamp: Date.now(),
    encrypted: isEncrypted
  });
}

/**
 * [VaultAuth] Secure Blob Retrieval
 * Decrypts previews on the fly. Returns null if vault is locked.
 */
export async function getPreview(videoUrl: string): Promise<Blob | null> {
  if (await isVaultLocked()) return null;

  const record = await db.previews.where('videoUrl').equals(videoUrl).first();
  if (!record) return null;

  if (record.encrypted) {
    const settings = await getPinSettings();
    if (!settings.pin) return null;

    try {
      const encryptedStr = new TextDecoder().decode(record.blob as Uint8Array);
      const decrypted = CryptoJS.AES.decrypt(encryptedStr, settings.pin);
      const typedArray = new Uint8Array(decrypted.sigBytes);
      
      const words = decrypted.words;
      const sigBytes = decrypted.sigBytes;
      for (let i = 0; i < sigBytes; i++) {
        typedArray[i] = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
      }

      return new Blob([typedArray], { type: record.mimeType });
    } catch (e) {
      console.error("[VaultAuth] Decryption failed:", e);
      return null;
    }
  }

  return record.blob as Blob;
}
