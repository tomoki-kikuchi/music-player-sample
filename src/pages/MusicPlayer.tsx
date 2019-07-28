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
  IonRow,
  IonCol,
} from '@ionic/react';

import { ShuffleSongController } from '../controller/ShuffleSongController';
import { songData } from '../data/songData';
import { Song } from '../models/ShuffleSongModel';
import PlayListComponent from '../component/organisms/PlayListComponent';
import ControlView from '../component/molecules/ControlView';

interface Props {}
interface State {
  songs: Song[];
  nextSong?: Song;
  next5Song: Song[];
  playingIndex?: number;
  playingSong?: Song;
  showModal: boolean;
  isPlaying: boolean;
}

export class MusicPlayer extends React.Component<Props, State> {
  musicController: ShuffleSongController;

  constructor(props: Props) {
    super(props);
    this.musicController = new ShuffleSongController();
    this.setPlayList = this.setPlayList.bind(this);
    this.onPlayNext = this.onPlayNext.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.onTogglePlay = this.onTogglePlay.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.showNext5Song = this.showNext5Song.bind(this);

    this.state = {
      songs: [],
      next5Song: [],
      showModal: false,
      isPlaying: false,
    };
  }

  /**
   * プレイリストを設定する
   */
  setPlayList(): void {
    this.musicController.setSongs(songData);
    this.setState({
      songs: this.musicController.getSongs(),
      playingSong: undefined,
    });
  }

  /**
   * 再生処理を実行する
   * @param index
   */
  onPlay(index: number) {
    this.musicController.setPlayingIndex(index);
    this.setState({ playingIndex: index, playingSong: this.state.songs[index], isPlaying: true });
  }

  /**
   * 次の曲を再生する
   */
  onPlayNext() {
    this.setState({
      playingIndex: this.musicController.getPlayingIndex(),
      playingSong: this.musicController.getNextSong(),
      songs: this.musicController.getSongs(),
    });
  }

  /**
   * 再生/一時停止を切り変える
   */
  onTogglePlay() {
    this.setState({ isPlaying: !this.state.isPlaying });
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

            {/* ボタンブロック */}
            <IonRow>
              <IonCol>
                <IonButton onClick={this.setPlayList}>プレイリストを設定する</IonButton>
              </IonCol>
              <IonCol>
                <IonButton
                  disabled={(() => {
                    return this.state.songs.length === 0;
                  })()}
                  onClick={this.showNext5Song}
                >
                  次の5曲を表示
                </IonButton>
              </IonCol>
            </IonRow>

            <PlayListComponent onPlay={this.onPlay} songs={this.state.songs} playingSong={this.state.playingSong} isPlaying={this.state.isPlaying} />

            {/* 次の5件のモーダル */}
            <IonModal isOpen={this.state.showModal}>
              <IonList>
                <IonHeader>
                  <IonToolbar>
                    <IonTitle>次の5曲</IonTitle>
                  </IonToolbar>
                </IonHeader>
                {this.state.next5Song.map((data: Song, index: number) => {
                  return (
                    <IonItem key={`${index}_${data.id}`}>
                      <IonThumbnail slot="start">
                        <img src={data.coverImageUrl} alt={data.albumTitle} />
                      </IonThumbnail>
                      <IonLabel>{data.title}</IonLabel>
                    </IonItem>
                  );
                })}
              </IonList>
              <IonButton onClick={() => this.onCloseModal()}>閉じる</IonButton>
            </IonModal>
          </IonContent>

          {/* プレイ状況の表示 */}
          {this.state.playingSong && (
            <ControlView
              playingSong={this.state.playingSong}
              onNext={this.onPlayNext}
              onTogglePlay={this.onTogglePlay}
              isPlaying={this.state.isPlaying}
            />
          )}
        </IonApp>
      </div>
    );
  }
}
