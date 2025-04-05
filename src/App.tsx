import { RouterProvider } from 'react-router';

import { router } from './router/routes';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      {/* <UserProvider></UserProvider> */}
    </>
  );
}

export default App;
