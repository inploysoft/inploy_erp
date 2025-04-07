import { RouterProvider } from 'react-router';

import CoreProvider from './contexts/CoreProvider';
import { router } from './router/routes';

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
