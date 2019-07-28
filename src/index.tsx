import * as React from 'react';
import { render } from 'react-dom';
import * as serviceWorker from './serviceWorker';

// @ts-ignore
import styles from './index.modules.scss';
import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import { MusicPlayer } from './pages/MusicPlayer';

function App() {
  return (
    <div className={styles.App}>
      <MusicPlayer />
    </div>
  );
}

const rootElement = document.getElementById('root');
render(<App />, rootElement);

serviceWorker.register();
