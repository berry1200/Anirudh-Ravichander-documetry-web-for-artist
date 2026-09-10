export interface Track {
  title: string;
  duration: string;
  side: 'A' | 'B';
  movie?: string;
  genre?: string;
}

export interface LatestSong {
  rank: number;
  title: string;
  movie: string;
  year: string;
  duration: string;
  type: string;
}

export interface Release {
  id: string;
  code: string;
  title: string;
  artist: string;
  year: string;
  rpm: '33⅓ RPM' | '45 RPM';
  format: string;
  edition: string;
  runoutEtch: string;
  coverImage: string;
  dominantTone: string;
  accentColor: 'amber' | 'teal';
  tracks: Track[];
  description: string;
}

export interface Artist {
  id: string;
  code: string;
  name: string;
  origin: string;
  releasesCount: number;
  discipline: string;
}

export interface TourDate {
  id: string;
  date: string;
  artist: string;
  venue: string;
  city: string;
  program: string;
  status: 'TICKETS' | 'LIMITED' | 'SOLD OUT' | 'RSVP';
}

export interface SungSong {
  id: string;
  title: string;
  movie: string;
  year: string;
  duration: string;
  singers: string;
  genre: string;
  category: 'Latest' | 'Mass' | 'Romance' | 'Dance' | 'Classics';
  youtubeVideoId: string;
  youtubeMusicUrl: string;
  youtubeMusicSearchUrl: string;
  streams: string;
  lyricsHighlight: string;
  thumbnail: string;
}
