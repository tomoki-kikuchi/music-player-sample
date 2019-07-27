import { ShuffleEngine, Song } from '../model/ShuffleSongModel';

const PEEKMAX: number = 5;

export class ShuffleSongController implements ShuffleEngine {
  songs: Song[] = [];
  nextSong?: Song = undefined;

  /**
   * シャッフル対象曲を設定する
   * @param songs
   */
  setSong(songs: Song[]): void {
    // console.log(songs);
    this.shuffle(songs);
    this.songs = songs;
    console.log(this.songs);
  }

  getSongs(): Song[] {
    return this.songs;
  }

  /**
   * 次に再生する曲を返し、その次に再生する曲を決定する
   */
  getNextSong(): Song {
    this.nextSong = this.songs[0];

    console.log('this.nextSong::', this.nextSong);
    return this.nextSong;
  }

  /**
   * 次に再生する予定の曲を返却する
   * @return 次に再生する曲
   */
  peekQueue(): Song[] {
    console.log(this.songs);
    const queue: Song[] = ((): Song[] => {
      return this.songs.slice(0, PEEKMAX);
    })();

    return queue;
  }

  /**
   * 配列をシャッフルして返却する
   * @param arr
   */
  shuffle(arr: Song[]): void {
    for (let i = arr.length - 1; i > 0; i = 0 | (i - 1)) {
      let j = 0 | (Math.random() * (i + 1));
      let swap: Song = arr[i];
      arr[i] = arr[j];
      arr[j] = swap;
    }
  }
}
