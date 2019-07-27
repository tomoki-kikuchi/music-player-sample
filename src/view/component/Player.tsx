import React, { useCallback, useEffect, useState } from "react";
import { ShuffleSongController } from "../../controller/ShuffleSongController";
import { initialSongState, songData } from "../../data/songData";
import { Song } from "../../model/ShuffleSongModel";

export function Player() {
  const controller = new ShuffleSongController();

  const [songs, setStateSongs] = useState<Song[]>([]);
  const [nextSong, setStateNexSongs] = useState(initialSongState);

  const [count, setCount] = useState(0);

  const setSongs = () => {
    console.log("setSongs");
    controller.setSong(songData);

    setStateSongs(controller.getSongs());
  };
  const getNextSong = () => {
    console.log('nextSong', nextSong);
    setStateNexSongs(controller.getNextSong());
  };
  const peekQueue = () => {
    console.log("peekQueue", controller.peekQueue());
    controller.peekQueue();
  };

  return (
    <div className="App">
      <h1>Playerコンポーネント</h1>

      <button onClick={setSongs}>シャッフル再生</button>
      <button onClick={getNextSong}>次の曲を再生</button>
      <button onClick={peekQueue}>次の5曲を表示</button>

      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +
      </button>
      <p>{count}</p>

      <ul>
        {songs.map((data: Song, index: number) => {
          return <li key={`${index}_${data.id}`}>{data.title}</li>;
        })}
      </ul>

      <p>
        現在再生中の曲:
        {nextSong.title}
      </p>
    </div>
  );
}
