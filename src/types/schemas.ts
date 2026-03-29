import { z } from 'zod';

export const VideoDataSchema = z.object({
  url: z.string().url(),
  rawVideoSrc: z.string().nullable().optional(),
  title: z.string().min(1).default('Untitled'),
  thumbnail: z.string().optional(),
  timestamp: z.number().default(() => Date.now()),
  type: z.enum(['video', 'image', 'link', 'audio', 'torrent']).default('link'),
  domain: z.string().default('Unknown'),
  duration: z.union([z.string(), z.number()]).nullable().optional(),
  views: z.string().nullable().optional(),
  uploaded: z.string().nullable().optional(),
  originalIndex: z.number().optional(),
  author: z.string().nullable().optional(),
  likes: z.string().nullable().optional(),
  dislikes: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  tags: z.array(z.string()).optional(),
  date: z.string().nullable().optional(),
  datePublished: z.string().nullable().optional(),
  dateSaved: z.number().optional(),
  resolution: z.string().nullable().optional(),
  bitrate: z.string().nullable().optional(),
  quality: z.string().nullable().optional(),
  size: z.string().nullable().optional(),
  length: z.union([z.string(), z.number()]).nullable().optional(),
});

export type VideoData = z.infer<typeof VideoDataSchema>;

export const StorageSchema = z.object({
  savedVideos: z.array(VideoDataSchema).default([])
});

export type StorageData = z.infer<typeof StorageSchema>;

export const PinSettingsSchema = z.object({
  enabled: z.boolean().default(false),
  pin: z.string().optional(), // Hashed or plain (browser.storage.local/sync is usually safe enough for local vault)
  length: z.union([z.literal(4), z.literal(6)]).default(4),
  lockTimeout: z.union([
    z.literal(600000),    // 10 min
    z.literal(1800000),   // 30 min
    z.literal(3600000),   // 1 hour
    z.literal(7200000),   // 2 hours
    z.literal(-1)         // Never
  ]).default(3600000),
  lastUnlocked: z.number().optional(),
});

export type PinSettings = z.infer<typeof PinSettingsSchema>;
