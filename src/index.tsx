import * as React from 'react';
import { render } from 'react-dom';

import './styles.css';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import { MusicPlayer } from './view/component/MusicPlayer';

function App() {
  return (
    <div className="App">
      <MusicPlayer />
    </div>
  );
}

const rootElement = document.getElementById('root');
render(<App />, rootElement);
