import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { store } from './redux/store.js';
import { Provider } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { lazy, Suspense } from 'react';
import ChangePassword from './pages/ChangePassword.jsx';
import SearchedContent from './pages/SearchedContent.jsx';
import { Toaster } from 'react-hot-toast';

const Login = lazy(() => import('./pages/Login.jsx'));
const SignUp = lazy(() => import('./pages/SignUp.jsx'));
const LandingPage = lazy(() => import('./pages/LandingPage.jsx'));
const Home = lazy(() => import('./pages/Home.jsx'));
const Blog = lazy(() => import('./components/blog/Blog.jsx'));
const Profile = lazy(() => import('./pages/Profile.jsx'));
const BlogForm = lazy(() => import('./components/blog/BlogForm.jsx'));
const Error404 = lazy(() => import('./components/errors/Error404.jsx'));
const SomethingWentWrong = lazy(() =>
  import('./components/errors/SomethingWentWrong.jsx')
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <LandingPage /> },
      {
        path: 'home',
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
        
      },
      {
        path: 'search/:key',
        element: (
          <ProtectedRoute>
            <SearchedContent />
          </ProtectedRoute>
        )
      },
      { path: 'blog/:id', element: <Blog /> },
      { path: 'profile/:id', element: <Profile /> },
      {
        path: 'create-blog',
        element: (
          <ProtectedRoute>
            <BlogForm />
          </ProtectedRoute>
        )
      },
      {
        path: 'edit/:id',
        element: (
          <ProtectedRoute>
            <BlogForm />
          </ProtectedRoute>
        )
      },
      {
        path: 'change-password',
        element: (
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
        )
      },
      { path: '*', element: <Error404 /> }
    ]
  },
  { path: 'login', element: <Login /> },
  { path: 'signup', element: <SignUp /> }
]);

let persistor = persistStore(store);

createRoot(document.getElementById('root')).render(
  <ErrorBoundary fallback={<SomethingWentWrong />}>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<div>Loading...</div>}>
        <Suspense fallback={<div>Loading...</div>}>
        <Toaster
        position='top-right'
        reverseOrder={false}
        toastOptions={{
          success: {
            style: {
              background: 'green',
              color: 'white'
            }
          },
          error: {
            style: {
              background: 'red',
              color: 'white'
            }
          }
        }}
        />
          <RouterProvider router={router} />
        </Suspense>
      </PersistGate>
    </Provider>
  </ErrorBoundary>
);
