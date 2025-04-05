import { RouterProvider } from 'react-router';

import UserProvider from './contexts/UserProvider';
import { router } from './router/routes';

function App() {
  return (
    <>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </>
  );
}

export default App;
