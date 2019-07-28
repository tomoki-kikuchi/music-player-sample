import { ShuffleEngine, Song } from '../models/ShuffleSongModel';
import { getShuffleData } from '../utils/shuffledArray';

const PEEKMAX: number = 5;

export class ShuffleSongController implements ShuffleEngine {
  songs: Song[] = [];
  playingIndex: number = 0;

  /**
   * シャッフル対象曲を設定する
   * @param songs
   */
  setSongs(songs: Song[]): void {
    this.songs = getShuffleData(songs);
  }

  /**
   * 対象曲を返却する
   */
  getSongs(): Song[] {
    return this.songs;
  }

  /**
   * 再生中の曲のインデックスを設定する
   * @param index
   */
  setPlayingIndex(index: number) {
    this.playingIndex = index;
  }

  /**
   * 再生中の曲のインデックスを返却する
   */
  getPlayingIndex(): number {
    return this.playingIndex;
  }

  /**
   * 次に再生する曲を返し、その次に再生する曲を決定する
   */
  getNextSong(): Song {
    this.playingIndex++;
    if (this.playingIndex === this.songs.length) {
      // リストの最後に到達したときは再度シャッフルして一曲目に戻す
      this.setSongs(this.songs);
      this.setPlayingIndex(0);
      return this.songs[0];
    } else {
      const nextSong = this.songs[this.playingIndex];
      return nextSong;
    }
  }

  /**
   * 次に再生する予定の5曲を返却する
   * @return 次に再生する5曲
   */
  peekQueue(): Song[] {
    const startIndex = this.playingIndex + 1;
    const endIndex = startIndex + PEEKMAX;
    return this.songs.slice(startIndex, endIndex);
  }
}
