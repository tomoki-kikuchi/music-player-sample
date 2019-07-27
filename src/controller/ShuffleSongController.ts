import { ShuffleEngine, Song } from '../model/ShuffleSongModel';

const PEEKMAX: number = 5;

export class ShuffleSongController implements ShuffleEngine {
  songs: Song[] = [];
  // nextSong?: Song = undefined;
  playingIndex: number = 0;

  /**
   * シャッフル対象曲を設定する
   * @param songs
   */
  setSongs(songs: Song[]): void {
    this.songs = this.getShuffleData(songs);
  }

  setPlayIndex(index: number) {
    this.playingIndex = index;
  }

  getPlayIndex(): number {
    return this.playingIndex;
  }

  getSongs(): Song[] {
    return this.songs;
  }

  /**
   * 次に再生する曲を返し、その次に再生する曲を決定する
   */
  getNextSong(): Song {
    this.playingIndex++;
    if (this.playingIndex === this.songs.length) {
      this.setSongs(this.songs);
      this.setPlayIndex(0);
      return this.songs[0];
    } else {
      const nextSong = this.songs[this.playingIndex];

      console.log('this.nextSong::', nextSong);
      return nextSong;
    }
  }

  /**
   * 次に再生する予定の曲を返却する
   * @return 次に再生する曲
   */
  peekQueue(): Song[] {
    const queue: Song[] = ((): Song[] => {
      return this.songs.slice(0, PEEKMAX);
    })();
    return queue;
  }

  /**
   * 配列をシャッフルして返却する
   * @param arr
   */
  private getShuffleData(arr: Song[]): Song[] {
    const index = this.shuffledIndex(arr.length);
    return arr.map((_, i) => arr[index[i]]);
  }

  /**
   * シャッフルされた配列のインデックスを返す
   * @param arrayLength
   */
  private shuffledIndex(arrayLength: number) {
    let index: number;
    const arr = Array(arrayLength);
    const rest = [...Array(arrayLength - 1)].map((_, i) => i + 1); // 0は抜いておく

    // 0番目に値を入れる
    let _n = 0 | (Math.random() * rest.length);
    arr[0] = rest[_n];
    index = rest[_n]; // 今回の値が次のnの値
    rest.splice(_n, 1);

    while (rest.length > 0) {
      // 以下同様に繰り返す
      _n = 0 | (Math.random() * rest.length);
      arr[index] = rest[_n];

      index = rest[_n];
      rest.splice(_n, 1);
    }
    arr[index] = 0; // 最後の位置に0を入れて完了
    return arr;
  }
}
