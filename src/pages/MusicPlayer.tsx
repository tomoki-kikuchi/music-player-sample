import React from 'react';
import {
  IonApp,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonList,
  IonItem,
  IonListHeader,
  IonThumbnail,
  IonLabel,
  IonModal,
} from '@ionic/react';

import { ShuffleSongController } from '../controller/ShuffleSongController';
import { songData } from '../data/songData';
import { Song } from '../model/ShuffleSongModel';
import PlayListComponent from '../component/PlayListComponent';
import ControlViewComponent from '../component/ControlViewComponent';

interface Props {}
interface State {
  songs: Song[];
  nextSong?: Song;
  next5Song: Song[];
  playingIndex?: number;
  nowPlaying?: Song;
  showModal: boolean;
}

export class MusicPlayer extends React.Component<Props, State> {
  musicController: ShuffleSongController;

  constructor(props: Props) {
    super(props);
    this.musicController = new ShuffleSongController();
    this.setPlayList = this.setPlayList.bind(this);
    this.onPlayNext = this.onPlayNext.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.showNext5Song = this.showNext5Song.bind(this);

    this.state = {
      songs: [],
      next5Song: [],
      showModal: false,
    };
  }

  /**
   * プレイリストを設定する
   */
  setPlayList(): void {
    console.log('setPlayList');
    this.musicController.setSongs(songData);
    this.setState({
      songs: this.musicController.getSongs(),
    });
  }

  /**
   * 再生処理を実行する
   * @param index
   */
  onPlay(index: number) {
    console.log('onPlay', index);
    this.musicController.setPlayingIndex(index);
    this.setState({ playingIndex: index, nowPlaying: this.state.songs[index] });
  }

  /**
   * 次の曲を再生する
   */
  onPlayNext() {
    console.log('onPlayNext');
    this.setState({
      playingIndex: this.musicController.getPlayingIndex(),
      nowPlaying: this.musicController.getNextSong(),
      songs: this.musicController.getSongs(),
    });
  }

  /**
   * 次の再生予定の5曲を表示する
   */
  showNext5Song() {
    this.setState({
      showModal: true,
      next5Song: this.musicController.peekQueue(),
    });
  }

  /**
   * モーダルを閉じる
   */
  onCloseModal() {
    this.setState({
      showModal: false,
    });
  }

  render() {
    return (
      <div className="App">
        <IonApp>
          <IonContent>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Music Player</IonTitle>
              </IonToolbar>
            </IonHeader>

            <IonButton onClick={this.setPlayList}>プレイリストを設定する</IonButton>
            <IonButton
              disabled={(() => {
                return this.state.songs.length === 0;
              })()}
              onClick={this.showNext5Song}
            >
              次の5曲を表示
            </IonButton>

            <PlayListComponent onPlay={this.onPlay} songs={this.state.songs} playingSong={this.state.nowPlaying} />

            <IonModal isOpen={this.state.showModal}>
              <IonList>
                <IonListHeader>次の5曲</IonListHeader>
                {this.state.next5Song.map((data: Song, index: number) => {
                  return (
                    <IonItem key={`${index}_${data.id}`}>
                      <IonThumbnail slot="start">
                        <img src={data.cover} alt={data.albumTitle} />
                      </IonThumbnail>
                      <IonLabel>{data.title}</IonLabel>
                    </IonItem>
                  );
                })}
              </IonList>
              <IonButton onClick={() => this.onCloseModal()}>閉じる</IonButton>
            </IonModal>
          </IonContent>

          {this.state.nowPlaying && <ControlViewComponent nowPlaying={this.state.nowPlaying} onNext={this.onPlayNext} />}
        </IonApp>
      </div>
    );
  }
}