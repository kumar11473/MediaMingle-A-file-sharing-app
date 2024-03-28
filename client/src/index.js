import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import{ StatusProvider} from './context/upload';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StatusProvider>
      <App />
    </StatusProvider>
  </React.StrictMode>
);
