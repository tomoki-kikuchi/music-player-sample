import React from 'react';
import { IonIcon, IonItem, IonLabel, IonThumbnail } from '@ionic/react';
import { volumeHigh } from 'ionicons/icons';
import { Song } from '../../models/ShuffleSongModel';

type Props = {
  onPlay(id: number): void;
  songData: Song;
  playingSong?: Song;
  index: number;
};

const PlayListItem: React.SFC<Props> = ({ songData, onPlay, playingSong, index }) => (
  <>
    <IonItem
      button
      detail={false}
      onClick={() => {
        onPlay(index);
      }}
    >
      <IonThumbnail slot="start">
        <img src={songData.coverImageUrl} alt={songData.albumTitle} />
      </IonThumbnail>
      <IonLabel>{songData.title}</IonLabel>
      {playingSong && playingSong.id === songData.id && <IonIcon icon={volumeHigh} />}
    </IonItem>
  </>
);

export default PlayListItem;
