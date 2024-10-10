import React from 'react'
import UserSignUp from './components/user/signup/UserSignUp'
import UserLogin from './components/user/login/UserLogin'
import Home from './components/user/home/Home'
import Update from './components/user/update/Update'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AdminLogin from './components/admin/login/AdminLogin'
import AdminHome from './components/admin/home/AdminHome'
import AdminEdit from './components/admin/edit/AdminEdit'
import AddUser from './components/admin/adduser/AddUser'
import AdminDash from './components/admin/dashboard/AdminDash'
import ProtectEdit from './components/protect/ProtectEdit'
import ProtectHome from './components/protect/ProtectHome'
import AdiminAuth from './components/protect/AdminAuth'
import AdminiLoginAuth from './components/protect/AdminLoginAuth'
import PageNot from './components/protect/notfound/PageNot'
const App=()=>{
  return(
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProtectEdit><UserSignUp /></ProtectEdit>}/>
        <Route path='/login' element={<ProtectEdit><UserLogin /></ProtectEdit>}/>
        <Route path='/home' element={<ProtectHome><Home /></ProtectHome>}/>
        <Route path='/update' element={<ProtectHome><Update /></ProtectHome>}/>
        <Route path='/admin' element={<AdiminAuth><AdminLogin /></AdiminAuth>}/>
        <Route path='/adminhome' element={<AdminiLoginAuth><AdminHome/></AdminiLoginAuth>}/>
        <Route path='/dashboard' element={<AdminiLoginAuth><AdminDash/></AdminiLoginAuth>}/>
        <Route path='/adminedit/:id' element={<AdminiLoginAuth><AdminEdit/></AdminiLoginAuth>}/>
        <Route path='/adminadd' element={<AdminiLoginAuth><AddUser/></AdminiLoginAuth>}/>
        <Route path='*' element={<PageNot />}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App