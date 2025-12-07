
import { VideoMetadata } from '../types';

const API_BASE_URL = 'http://localhost:3001';

/**
 * Extract YouTube Video ID from various URL formats
 */
const getVideoId = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

/**
 * Generates mock data when backend is offline so the UI doesn't break
 */
const generateFallbackData = (url: string): VideoMetadata => {
  const id = getVideoId(url) || 'dQw4w9WgXcQ';
  return {
    id: id,
    title: "Demo Video (Backend Offline)",
    thumbnail: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
    channel: "Demo Channel",
    duration: "3:45",
    views: 1000000,
    uploadDate: new Date().toLocaleDateString(),
    license: 'Standard YouTube License',
    isCopyrightFree: true,
    isCC: false,
    serverOffline: true,
    formats: [
      { id: 'mp4-1080p', ext: 'mp4', resolution: '1080p', note: 'Demo Mode', filesize_approx_mb: 150 },
      { id: 'mp4-720p', ext: 'mp4', resolution: '720p', note: 'Demo Mode', filesize_approx_mb: 80 },
      { id: 'mp3-high', ext: 'mp3', resolution: 'Audio', note: 'High Quality', filesize_approx_mb: 5 },
    ]
  };
};

/**
 * Fetches video metadata from the local Node.js backend.
 * Falls back to mock data if connection fails.
 */
export const fetchVideoInfo = async (url: string): Promise<VideoMetadata> => {
  try {
    // Attempt to fetch from real backend
    const response = await fetch(`${API_BASE_URL}/fetch-info`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `Server Error: ${response.statusText}`);
    }

    return data;
  } catch (error: any) {
    console.warn("Fetch Error (Falling back to mock data):", error);
    
    // If it's a network error (server not running), return fallback data instead of throwing
    if (error.message && (error.message.includes('Failed to fetch') || error.message.includes('NetworkError'))) {
      return generateFallbackData(url);
    }
    
    throw error;
  }
};

/**
 * Generates the download link for the specific video and format.
 */
export const getDownloadUrl = (videoUrl: string, formatId: string): string => {
  const encodedUrl = encodeURIComponent(videoUrl);
  const encodedFormat = encodeURIComponent(formatId);
  return `${API_BASE_URL}/download?url=${encodedUrl}&format_id=${encodedFormat}`;
};
