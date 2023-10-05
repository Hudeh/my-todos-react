import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import PrivateRoute from './components/PrivateRoute';
import ErrorPage from './components/ErrorPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'toastify-js/src/toastify.css';
import { getAuthToken } from './services/config';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const token = getAuthToken();
  const [isAuthenticatd, setIsAuthenticatd] = React.useState(null);
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login setIsAuthenticatd={setIsAuthenticatd} />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/signup',
      element: <Signup />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/home',
      element: (
        <PrivateRoute token={token} isAuthenticatd={isAuthenticatd}>
          <Home setIsAuthenticatd={setIsAuthenticatd} />
        </PrivateRoute>
      ),
    },
  ]);
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
