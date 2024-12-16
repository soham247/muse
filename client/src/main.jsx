import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { store } from './redux/store.js'
import { Provider } from 'react-redux'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

import { lazy } from 'react'

const Login = lazy(() => import('./pages/Login.jsx'))
const SignUp = lazy(() => import('./pages/SignUp.jsx'))
const LandingPage = lazy(() => import('./pages/LandingPage.jsx'))
const Home = lazy(() => import('./pages/Home.jsx'))
const Blog = lazy(() => import('./components/blog/Blog.jsx'))
const Profile = lazy(() => import('./pages/Profile.jsx'))
const CreateBlog = lazy(() => import('./components/blog/CreateBlog.jsx'))
const UpdateBlog = lazy(() => import('./components/blog/UpdateBlog.jsx'))
const Error404 = lazy(() => import('./components/errors/Error404.jsx'))
const SomethingWentWrong = lazy(() =>
  import('./components/errors/SomethingWentWrong.jsx')
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <LandingPage />
      },
      
      {
        path: 'home',
        element: <Home />
      },
      {
        path: 'blog/:id',
        element: <Blog />
      },
      {
        path: 'profile/:id',
        element: <Profile />
      },
      {
        path: 'create-blog',
        element: <ProtectedRoute>
          <CreateBlog />
        </ProtectedRoute>
      },
      {
        path: 'edit/:id',
        element: <ProtectedRoute>
          <UpdateBlog />
        </ProtectedRoute>
      },
      {
        path: '*',
        element: <Error404 />
      }
    ]
  },
  {
    path: 'login',
    element: <Login />
  },
  {
    path: 'signup',
    element: <SignUp />
  }
])

let persistor = persistStore(store)

createRoot(document.getElementById('root')).render(
  <ErrorBoundary fallback={<SomethingWentWrong />}>
    <Provider store={store}>
      <PersistGate persistor={persistor} >
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </ErrorBoundary>
)
