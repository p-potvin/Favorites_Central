import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Dashboard } from './Dashboard';
import * as storageVault from '../lib/storage-vault';

// Mock the storage vault module
vi.mock('../lib/storage-vault', () => ({
  getSavedVideos: vi.fn(),
  saveVideo: vi.fn(),
  removeVideo: vi.fn(),
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
    tags: ['test', 'react']
  },
  {
    id: '2',
    url: 'https://www.example.com/page',
    title: 'Example Page 2',
    timestamp: 1620000010000,
    type: 'link',
    tags: []
  }
];

describe('Dashboard Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    (storageVault.getSavedVideos as any).mockResolvedValue(mockVideos);
  });

  it('renders the Dashboard header and initial state', async () => {
    render(<Dashboard />);
    await waitFor(() => {
      expect(screen.getByText(/Wares/i)).toBeInTheDocument();
      expect(screen.getAllByText(/Vault/i).length).toBeGreaterThan(0);
    });
  });

  it('loads and displays saved items', async () => {
    render(<Dashboard />);
    await waitFor(() => {
      expect(screen.getByText('Test Video 1')).toBeInTheDocument();
      expect(screen.getByText('Example Page 2')).toBeInTheDocument();
    });
  });

  it('filters items based on search input', async () => {
    render(<Dashboard />);
    await waitFor(() => {
      expect(screen.getByText('Test Video 1')).toBeInTheDocument();
    });
    
    const searchInput = screen.getByPlaceholderText(/Search items.../i);
    fireEvent.change(searchInput, { target: { value: 'Test Video' } });

    await waitFor(() => {
      expect(screen.getByText('Test Video 1')).toBeInTheDocument();
      expect(screen.queryByText('Example Page 2')).not.toBeInTheDocument();
    });
  });

  it('opens and closes the video player modal', async () => {
    render(<Dashboard />);
    await waitFor(() => {
      expect(screen.getByText('Test Video 1')).toBeInTheDocument();
    });

    const playButtons = screen.getAllByRole('button');
    // The video card itself or its play button will trigger the modal
    // Let's find the card or play icon - actually, clicking the title might not work. Dashboard renders a button around the thumbnail.
    // We can click the image thumbnail for the video.
    const thumbnails = screen.getAllByRole('img');
    fireEvent.click(thumbnails[0]);

    // Modal should open
    await waitFor(() => {
      // It has a video element
      const videoElement = document.querySelector('video');
      expect(videoElement).toBeInTheDocument();
    });

    // Close the modal
    const closeBtn = screen.getByTitle(/Close Player/i);
    fireEvent.click(closeBtn);

    await waitFor(() => {
      expect(document.querySelector('video')).not.toBeInTheDocument();
    });
  });

  it('toggles the sidebar layout', async () => {
    render(<Dashboard />);
    await waitFor(() => {
      expect(screen.getByText('Test Video 1')).toBeInTheDocument();
    });
    // By default, sidebar starts open. Let's find the menu button.
    const menuBtn = screen.getAllByRole('button').find(b => b.classList.contains('vault-btn') && b.querySelector('.lucide-menu'));
    expect(menuBtn).toBeDefined();
    
    // Sidebar wrapper should have w-64 or similar. Actually, we can check for text that only appears in sidebar.
    // We can check if "Grouping" is there.
    expect(screen.getByText('Group By')).toBeInTheDocument();

    fireEvent.click(menuBtn!);

    // Since it simply changes width class or opacity, we can assert on the aside element classes 
    // The queryByText 'Group By' still might be in DOM, just invisible due to opacity-0.
    const aside = screen.getByText('Group By').closest('aside');
    expect(aside).toHaveClass('w-0');
  });
});

