import React from 'react';
import { IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonReorder, IonThumbnail } from '@ionic/react';
import { volumeHigh } from 'ionicons/icons';
import { Song } from '../model/ShuffleSongModel';

type Props = {
  songs: Song[];
  onPlay(id: number): void;
  playingSong?: Song;
};

const PlayListComponent: React.SFC<Props> = ({ songs, onPlay, playingSong }) => (
  <>
    <IonList lines={'inset'}>
      {songs.length !== 0 && <IonListHeader>プレイリスト</IonListHeader>}
      {songs.map((data: Song, index: number) => {
        return (
          <IonItem
            button
            detail={false}
            onClick={() => {
              onPlay(index);
            }}
            key={`${index}_${data.id}`}
          >
            <IonThumbnail slot="start">
              <img src={data.cover} alt={data.albumTitle} />
            </IonThumbnail>
            <IonLabel>{data.title}</IonLabel>
            {playingSong && playingSong.id === data.id && <IonIcon icon={volumeHigh} />}
          </IonItem>
        );
      })}
    </IonList>
  </>
);

export default PlayListComponent;
