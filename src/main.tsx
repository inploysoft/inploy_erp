import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Amplify } from 'aws-amplify';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import outputs from '../amplify_outputs.json';
import App from './App';
import { InployAuthenticator } from './modules/auth/InployAuthenticator';

import '@aws-amplify/ui-react/styles.css';

import './theme/index.css';

// https://docs.amplify.aws/react/build-a-backend/data/connect-to-API/#configure-the-amplify-library
Amplify.configure(outputs);

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <InployAuthenticator>
        <App />
      </InployAuthenticator>
    </QueryClientProvider>
  </StrictMode>,
);
