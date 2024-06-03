
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './pages/Register'
import Login from './pages/Login'
import HomePage from './pages/Homepage'
import InvoicePage from './pages/Invoice'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/invoice' element={<InvoicePage />} />
      </Routes>
    </>
  )
}

export default App
