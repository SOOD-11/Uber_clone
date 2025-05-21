
import React from 'react'
import { Route, Router, Routes } from 'react-router-dom';
import Start from './pages/Start';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import CaptainLogin from './pages/CaptainLogin';
import CaptainSignup from './pages/CaptainSignup';
import Home from './pages/Home';
import ProtectedRoutesWrapper from './pages/ProtectedRoutesWrapper';
import Logout from './pages/logout';
import Captain_home from './pages/Captain_home';

const App = () => {
  return (


  <Routes>
    <Route path='/' element={<Start></Start>}></Route>
    <Route path='/Signup' element={<UserSignup/>}></Route>
    <Route path='/login' element={<UserLogin/>}></Route>
    <Route path='/Driver-Signup' element={<CaptainSignup/>}></Route>
    <Route path='/Driver-login' element={<CaptainLogin/>}></Route>
    <Route path='/home' element={
    <ProtectedRoutesWrapper allowedRoles={['User']}>
    <Home/>
    </ProtectedRoutesWrapper>}
    /><Route path='/logout' element={
      <ProtectedRoutesWrapper allowedRoles={['User']}>
      <Logout/>
      </ProtectedRoutesWrapper>}
      />
      <Route path='/captain-home' element={
        <ProtectedRoutesWrapper allowedRoles={['Driver']}>
          <Captain_home>

          </Captain_home>
          </ProtectedRoutesWrapper>
        }></Route>
    
    </Routes>

  )
}


 export default App;