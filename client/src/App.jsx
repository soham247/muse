import './App.css'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/header/Navbar'
import { Suspense } from 'react'
import { PuffLoader } from 'react-spinners'
import { useSelector } from 'react-redux'
import BottomNavbar from './components/header/BottomNavbar'

function App() {
  const authenticated = useSelector(state => state.auth.isLoggedIn)
  return (
      <div className='pt-16'>
        
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
        <Navbar />
        <Suspense fallback={<div className='h-screen flex justify-center items-center'><PuffLoader color="#006eff" /></div>}>
          <div className='mb-10 md:mb-0'>
            <Outlet />
          </div>
        </Suspense>
        { authenticated && <BottomNavbar /> }
      </div>
  )
}

export default App
