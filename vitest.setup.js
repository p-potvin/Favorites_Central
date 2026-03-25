import '@testing-library/jest-dom';
import { vi } from 'vitest';
// Map out Chrome API mocks
global.chrome = {
    storage: {
        local: {
            get: vi.fn(),
            set: vi.fn(),
            remove: vi.fn(),
            clear: vi.fn(),
        }
    },
    runtime: {
        id: 'test-env-id',
        sendMessage: vi.fn(),
        onMessage: {
            addListener: vi.fn(),
            removeListener: vi.fn(),
        }
    },
    tabs: {
        create: vi.fn(),
        query: vi.fn(),
    }
};
// Fake browser polyfill object
global.browser = global.chrome;
// Mock the webextension-polyfill
vi.mock('webextension-polyfill', () => {
    return {
        default: global.chrome,
        ...global.chrome
    };
});
