
import LoginUser from './components/LoginUser'
import { RouterProvider } from 'react-router'
import './App.css'
import { router } from './Router'

function App() {

  return (
    <>
    <LoginUser/>
    <RouterProvider router={router} />
    </>
  )
}
export default App
