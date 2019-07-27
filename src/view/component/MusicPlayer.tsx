import React from 'react';
import { ShuffleSongController } from '../../controller/ShuffleSongController';
import { initialSongState, songData } from '../../data/songData';
import { Song } from '../../model/ShuffleSongModel';

interface Props {}
interface State {
  songs: Song[];
  nextSong: Song;
  next5Song: Song[];
}

export class MusicPlayer extends React.Component<Props, State> {
  controller: ShuffleSongController;

  constructor(props: Props) {
    super(props);
    this.controller = new ShuffleSongController();
    this.setSongs = this.setSongs.bind(this);
    this.getNextSong = this.getNextSong.bind(this);
    this.peekQueue = this.peekQueue.bind(this);

    this.state = {
      songs: [],
      nextSong: initialSongState,
      next5Song: [],
    };
  }

  setSongs(): void {
    console.log('setSongs');
    this.controller.setSong(songData);
    this.setState({
      songs: this.controller.getSongs(),
    });
  }

  getNextSong() {
    console.log('nextSong');

    this.setState({
      nextSong: this.controller.getNextSong(),
    });
  }

  peekQueue() {
    console.log('nextSong');

    this.setState({
      next5Song: this.controller.peekQueue(),
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Playerコンポーネント</h1>

        {this.state.songs.length !== 0 && <div>合計{this.state.songs.length}曲</div>}
        <button onClick={this.setSongs}>プレイリストを設定する</button>
        <button onClick={this.getNextSong}>次の曲を再生</button>
        <button onClick={this.peekQueue}>次の5曲を表示</button>

        <p>プレイリスト</p>
        <ul>
          {this.state.songs.map((data: Song, index: number) => {
            return (
              <li key={`${index}_${data.id}`}>
                {index + 1}. {data.title}
              </li>
            );
          })}
        </ul>

        <p>次の5曲</p>
        <ul>
          {this.state.next5Song.map((data: Song, index: number) => {
            return (
              <li key={`${index}_${data.id}`}>
                {index + 1}. {data.title}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
