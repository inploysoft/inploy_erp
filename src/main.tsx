import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import { InployAuthenticator } from './modules/auth/InployAuthenticator.tsx';

import '@aws-amplify/ui-react/styles.css';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <InployAuthenticator>
      <App />
    </InployAuthenticator>
  </StrictMode>,
);
