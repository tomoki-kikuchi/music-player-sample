import React from 'react';
import { IonList, IonListHeader } from '@ionic/react';
import { Song } from '../../models/ShuffleSongModel';
import PlayListItem from '../molecules/PlayListItem';

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
          <PlayListItem
            key={`${index}_${data.id}`}
            index={index}
            songData={data}
            playingSong={playingSong}
            onPlay={() => {
              onPlay(index);
            }}
          />
        );
      })}
    </IonList>
  </>
);

export default PlayListComponent;
