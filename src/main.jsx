import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Browser, Route, Routes } from "react-router-dom"
import Homepages from './Pages/Homepages/Homepages'
import Menu from './Pages/Menu'
import { ChakraProvider } from '@chakra-ui/react'
import VerifyEmail from './Pages/VerifyEmail/VerifyEmail'
import Profile from './Pages/Profile/Profile';
import ProtectedRoute from './ProtectedRoute'
import SendPayment from './Pages/Transactions/SendPayment'
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword'
import PageNotFound from './Pages/PageNotFound/PageNotFound'
import AutoLogOut from './Pages/AutoLogOut/AutoLogOut'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <Browser>
        <Routes>
         <Route element={<ProtectedRoute/>}>
            <Route path='/menu/*' element={<Menu />} />
         </Route>
         <Route element={<ProtectedRoute/>}>
            <Route path='/profile/*' element={<Profile />} />
         </Route>
   
          <Route path="/home/*" element={<Homepages />} />
          <Route path='/verifyEmail/:token' element={< VerifyEmail />} />
          <Route path='/forgotPassword/:email' element={< ForgotPassword />} />
          <Route path='/sendpayment' element={<SendPayment/>}/>
          <Route path="/*" element={<PageNotFound/>}/>
          <Route path="/autoLogOut" element={<AutoLogOut/>}/>
        </Routes>
      </Browser>
    </ChakraProvider>
  </React.StrictMode>
)