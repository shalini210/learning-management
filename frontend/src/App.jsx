import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './components/auth/Signup'
import { Routes,Route } from 'react-router-dom'
import Verifyotp from './components/auth/Verifyotp'

function App() {
  return (
    <>
    <Routes>
      <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/verifyotp/:email" element={<Verifyotp></Verifyotp>}></Route>
    </Routes>
    
    </>
  )
}

export default App
