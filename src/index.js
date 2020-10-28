import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App/App';
import * as serviceWorker from './serviceWorker';

import { fb } from './db/firebase';
import { FirebaseAppProvider } from 'reactfire';
import '@elastic/eui/dist/eui_theme_light.css';
import { EuiLoadingSpinner } from '@elastic/eui';

ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={fb}>
    <React.StrictMode>
      <Suspense fallback={<EuiLoadingSpinner size="xl" />}>
        <App />
      </Suspense>
    </React.StrictMode>
  </FirebaseAppProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
