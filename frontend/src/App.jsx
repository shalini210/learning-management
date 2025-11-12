import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './components/auth/Signup'
import { Routes,Route, Link } from 'react-router-dom'
import Verifyotp from './components/auth/Verifyotp'
import Login from './components/auth/Login'
import Userhome from './components/Userhome'
import UserProfile from './components/UserProfile'
function App() {
  return (
    <>
    <Link to="/login">Login</Link>
    <Routes>
      <Route path='/userprofile' element={<UserProfile></UserProfile>}></Route>
      <Route path="/userhome" element={<Userhome></Userhome>}></Route>
      <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/verifyotp/:email" element={<Verifyotp></Verifyotp>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
    </Routes>
    
    </>
  )
}

export default App
