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
  IonFooter,
  IonIcon,
  IonModal,
} from '@ionic/react';
import { fastforward } from 'ionicons/icons';

import { ShuffleSongController } from '../../controller/ShuffleSongController';
import { initialSongState, songData } from '../../data/songData';
import { Song } from '../../model/ShuffleSongModel';
import PlayListComponent from '../../component/PlayListComponent';

interface Props {}
interface State {
  songs: Song[];
  nextSong: Song;
  next5Song: Song[];
  playNumber?: number;
  nowPlaying?: Song;
  showModal: boolean;
}

export class MusicPlayer extends React.Component<Props, State> {
  controller: ShuffleSongController;

  constructor(props: Props) {
    super(props);
    this.controller = new ShuffleSongController();
    this.setPlayList = this.setPlayList.bind(this);
    this.onNext = this.onNext.bind(this);
    this.getNext5Song = this.getNext5Song.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.showNext5Song = this.showNext5Song.bind(this);

    this.state = {
      songs: [],
      nextSong: initialSongState,
      next5Song: [],
      showModal: false,
    };
  }

  setPlayList(): void {
    console.log('setPlayList');
    this.controller.setSong(songData);
    this.setState({
      songs: this.controller.getSongs(),
    });
  }

  onPlay(id: number) {
    console.log('onPlay', id);
    this.setState({ nowPlaying: initialSongState });
  }

  onNext() {
    console.log('onNext');

    this.setState({
      nowPlaying: this.controller.getNextSong(),
    });
  }

  showNext5Song() {
    this.setState({
      showModal: true,
      next5Song: this.controller.peekQueue(),
    });
  }

  getNext5Song() {
    console.log('nextSong');

    this.setState({
      next5Song: this.controller.peekQueue(),
    });
  }

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
            {/*<IonButton onClick={this.onNext}>次の曲を再生</IonButton>*/}
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
          {this.state.nowPlaying && (
            <IonFooter>
              <IonItem color={'dark'}>
                <IonThumbnail slot="start">
                  <img src={this.state.nowPlaying.cover} alt={this.state.nowPlaying.albumTitle} />
                </IonThumbnail>
                <IonLabel>{this.state.nowPlaying.title}</IonLabel>
                <IonIcon
                  icon={fastforward}
                  onClick={() => {
                    this.onNext();
                    // onPlay(data.id);
                  }}
                />
              </IonItem>
            </IonFooter>
          )}
        </IonApp>
      </div>
    );
  }
}
