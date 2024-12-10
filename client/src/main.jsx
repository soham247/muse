import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import { ErrorBoundary } from 'react-error-boundary'
import Error404 from './components/errors/error404.jsx'
import SomethingWentWrong from './components/errors/SomethingWentWrong.jsx'
import LandingPage from './pages/LandingPage.jsx'
import Home from './pages/Home.jsx'
import { store } from './redux/store.js'
import { Provider } from 'react-redux'
import Blog from './components/blog/Blog.jsx'
import Profile from './pages/Profile.jsx'
import CreateBlog from './components/blog/CreateBlog.jsx'
import UpdateBlog from './components/blog/UpdateBlog.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

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

createRoot(document.getElementById('root')).render(
  <ErrorBoundary fallback={<SomethingWentWrong />}>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </ErrorBoundary>
)
