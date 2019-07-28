import React from 'react';
import { IonFooter, IonIcon, IonItem, IonLabel, IonThumbnail } from '@ionic/react';
import { fastforward } from 'ionicons/icons';
import { Song } from '../../models/ShuffleSongModel';

type Props = {
  nowPlaying: Song;
  onNext(): void;
};

const ControlViewComponent: React.SFC<Props> = ({ nowPlaying, onNext }) => (
  <>
    <IonFooter>
      <IonItem color={'dark'}>
        <IonThumbnail slot="start">
          <img src={nowPlaying.coverImageUrl} alt={nowPlaying.albumTitle} />
        </IonThumbnail>
        <IonLabel>{nowPlaying.title}</IonLabel>
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

export default ControlViewComponent;
