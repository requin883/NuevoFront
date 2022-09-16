import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Browser, Route, Routes } from "react-router-dom"
import Homepages from './Pages/Homepages/Homepages'
import Menu from './Pages/Menu'
import { ChakraProvider } from '@chakra-ui/react'
import VerifyEmail from './Pages/VerifyEmail/VerifyEmail'
import Profile from './Pages/Profile/Profile';
import ProtectedRoute from './ProtectedRoute'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <Browser>
        <Routes>
         <Route element={<ProtectedRoute/>}>
            <Route path='/menu/*' element={<Menu />} />
            <Route path='/profile/*' element={<Profile />} />
         </Route>
          <Route path="/*" element={<Homepages />} />
          <Route path='/verifyEmail/:token' element={< VerifyEmail />} />
        </Routes>
      </Browser>
    </ChakraProvider>
  </React.StrictMode>
)