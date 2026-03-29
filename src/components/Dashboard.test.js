import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { VaultDashboard } from './VaultDashboard';
import * as storageVault from '../lib/storage-vault';
// Mock the storage vault module
vi.mock('../lib/storage-vault', () => ({
    getSavedVideos: vi.fn(),
    saveVideos: vi.fn(),
    getPinSettings: vi.fn(),
    savePinSettings: vi.fn(),
    isVaultLocked: vi.fn(),
}));
// Mock browser
vi.mock('webextension-polyfill', () => ({
    default: {
        runtime: {
            sendMessage: vi.fn(),
        },
    },
}));
// Mock dexie-store
vi.mock('../lib/dexie-store', () => ({
    getPreview: vi.fn().mockResolvedValue(null),
}));
const mockVideos = [
    {
        id: '1',
        url: 'https://www.youtube.com/watch?v=123',
        title: 'Test Video 1',
        timestamp: 1620000000000,
        rawVideoSrc: 'https://test-video1.com/video.mp4',
        thumbnail: 'https://test-video1.com/thumb.jpg',
        author: 'Test Author',
        type: 'video',
        tags: ['test', 'react'],
        domain: 'youtube.com'
    },
    {
        id: '2',
        url: 'https://www.example.com/page',
        title: 'Example Page 2',
        timestamp: 1620000010000,
        type: 'link',
        tags: [],
        domain: 'example.com'
    }
];
describe('Dashboard Component', () => {
    beforeEach(() => {
        vi.resetAllMocks();
        storageVault.getSavedVideos.mockResolvedValue(mockVideos);
        storageVault.isVaultLocked.mockResolvedValue(false);
        storageVault.getPinSettings.mockResolvedValue({
            enabled: false,
            length: 4,
            lockTimeout: 3600000,
        });
    });
    it('renders the Dashboard header and initial state', async () => {
        render(_jsx(VaultDashboard, {}));
        await waitFor(() => {
            expect(screen.getByText(/Wares/i)).toBeInTheDocument();
            expect(screen.getAllByText(/Vault/i).length).toBeGreaterThan(0);
        });
    });
    it('loads and displays saved items', async () => {
        storageVault.getSavedVideos.mockResolvedValue(mockVideos);
        render(_jsx(VaultDashboard, {}));
        // Check if the "Total Items" count is 2 - this proves re-render happened
        await waitFor(() => {
            expect(screen.queryByText(/Total Items:/i)).toBeInTheDocument();
            const countEl = screen.getByText('2', { selector: 'strong' });
            expect(countEl).toBeInTheDocument();
        }, { timeout: 3000 });
        const title1 = screen.queryByText((content, element) => element?.textContent === 'Test Video 1');
        expect(title1).toBeInTheDocument();
    });
    it('filters items based on search input', async () => {
        storageVault.getSavedVideos.mockResolvedValue(mockVideos);
        render(_jsx(VaultDashboard, {}));
        await waitFor(() => {
            expect(screen.getByText('2', { selector: 'strong' })).toBeInTheDocument();
        }, { timeout: 3000 });
        const searchInput = screen.getByPlaceholderText(/Search in title.../i);
        fireEvent.change(searchInput, { target: { value: 'Test Video' } });
        await waitFor(() => {
            expect(screen.getByText('1', { selector: 'strong.text-vault-text' })).toBeInTheDocument();
            const title1 = screen.queryByText((content, element) => element?.textContent === 'Test Video 1');
            const title2 = screen.queryByText((content, element) => element?.textContent === 'Example Page 2');
            expect(title1).toBeInTheDocument();
            expect(title2).not.toBeInTheDocument();
        }, { timeout: 3000 });
    });
    it('toggles the sidebar layout', async () => {
        const { container } = render(_jsx(VaultDashboard, {}));
        // Check initial state - sidebar might be open or closed depending on default state.
        const sidebar = container.querySelector('aside');
        expect(sidebar).toHaveClass('w-64');
        // The first button in the header is the toggle button
        const toggleButton = screen.getAllByRole('button')[0];
        fireEvent.click(toggleButton);
        await waitFor(() => {
            expect(sidebar).toHaveClass('w-0');
        });
    });
});
