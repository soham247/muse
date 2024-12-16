import './App.css'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import { Suspense } from 'react'
import { PuffLoader } from 'react-spinners'

function App() {

  return (
      <div>
        
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
          <Outlet />
        </Suspense>
      </div>
  )
}

export default App
