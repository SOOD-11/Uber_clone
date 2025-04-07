
import React from 'react'
import { Route, Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import CaptainLogin from './pages/CaptainLogin';
import CaptainSignup from './pages/CaptainSignup';

const App = () => {
  return (


  <Routes>
    <Route path='/' element={<Home></Home>}></Route>
    <Route path='/Signup' element={<UserSignup/>}></Route>
    <Route path='/login' element={<UserLogin/>}></Route>
    <Route path='/Driver-Signup' element={<CaptainSignup/>}></Route>
    <Route path='/Driver-login' element={<CaptainLogin/>}></Route>
    </Routes>

  )
}


 export default App;