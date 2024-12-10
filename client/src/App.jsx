import './App.css'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

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
        <Outlet />
      </div>
  )
}

export default App
