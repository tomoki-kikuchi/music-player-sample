import React from 'react';
import { IonFooter, IonIcon, IonItem, IonLabel, IonThumbnail } from '@ionic/react';
import { fastforward, pause, play } from 'ionicons/icons';
import { Song } from '../../models/ShuffleSongModel';

type Props = {
  playingSong: Song;
  onNext(): void;
  onTogglePlay(): void;
  isPlaying: boolean;
};

const ControlView: React.SFC<Props> = ({ playingSong, onNext, onTogglePlay, isPlaying }) => (
  <>
    <IonFooter>
      <IonItem color={'dark'}>
        <IonThumbnail slot="start">
          <img src={playingSong.coverImageUrl} alt={playingSong.albumTitle} />
        </IonThumbnail>
        <IonLabel>{playingSong.title}</IonLabel>
        <IonIcon
          icon={(() => {
            return isPlaying ? pause : play;
          })()}
          onClick={() => {
            onTogglePlay();
          }}
        />
        <IonIcon
          icon={fastforward}
          onClick={() => {
            onNext();
          }}
        />
      </IonItem>
    </IonFooter>
  </>
);

export default ControlView;
