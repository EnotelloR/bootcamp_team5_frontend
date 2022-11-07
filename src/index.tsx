import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './vendor/fonts.css';
import './vendor/normalize.css';
import 'antd/dist/antd.css';
import { App } from './screens/App';
import { initializeApp } from 'firebase/app';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

// Initialize Firebase. Needed for hosting and storage (images)
(function () {
  const firebaseConfig = {
    apiKey: 'AIzaSyA_XWeL5X1cc48Ao_09hMQTdc_SneUvb8s',
    authDomain: 'elk-kotopes.firebaseapp.com',
    projectId: 'elk-kotopes',
    storageBucket: 'elk-kotopes.appspot.com',
    messagingSenderId: '927043060414',
    appId: '1:927043060414:web:241ac5cc2afdc0542914ef',
  };
  initializeApp(firebaseConfig);
})();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
