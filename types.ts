
export interface VideoFormat {
  id: string;
  ext: string;
  resolution: string;
  note: string;
  filesize_approx_mb: number;
}

export interface VideoMetadata {
  id: string;
  title: string;
  thumbnail: string;
  channel: string;
  duration: string;
  views: number;
  uploadDate: string;
  license: 'Creative Commons Attribution' | 'Standard YouTube License';
  isCopyrightFree: boolean;
  formats: VideoFormat[];
  serverOffline?: boolean; // Indicates if data is mock data due to connection failure
  isCC?: boolean;
}

export enum AppView {
  HOME = 'HOME',
  FAQ = 'FAQ',
  CONTACT = 'CONTACT'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
