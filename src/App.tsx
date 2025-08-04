import { RouterProvider } from 'react-router';

import { router } from './router/routes';
import CoreProvider from './shared/contexts/CoreProvider';

function App() {
  return (
    <>
      <CoreProvider>
        <RouterProvider router={router} />
      </CoreProvider>
    </>
  );
}

export default App;
