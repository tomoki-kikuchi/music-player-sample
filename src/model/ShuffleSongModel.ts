export type Song = {
  id: number;
  title: string;
  artistName: string;
  albumTitle: string;
  genre: string;
  songTime: number;
  cover: string;
};

export type ShuffleEngine = {
  setSong(songs: Song[]): void;
  getNextSong(): Song;
  peekQueue(): Song[];
};
