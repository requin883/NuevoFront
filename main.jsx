import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Browser, Route, Routes } from "react-router-dom";
import Homepages from './src/Pages/Homepages/Homepages';
import Menu from './src/Pages/Menu';
import VerifyEmail from './src/Pages/VerifyEmail/VerifyEmail';
import Profile from './src/Pages/Profile/Profile';
import ProtectedRoute from './src/ProtectedRoute'
import SendPayment from './src/Pages/Transactions/SendPayment'
import ForgotPassword from './src/Pages/ForgotPassword/ForgotPassword'
import PageNotFound from './src/Pages/PageNotFound/PageNotFound'
import AutoLogOut from './src/Pages/AutoLogOut/AutoLogOut'
import "../src/scss/style.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./src/Pages/Homepages/Components/Login";
import Register from "./src/Pages/Homepages/Components/Register";
import ValidatePays from './src/Pages/ValidatePays/ValidatePays';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Browser>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path='/menu/*' element={<Menu />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path='/profile/*' element={<Profile />} />
        </Route>
        <Route path='/Login/*' element={<Login />} />
        <Route path='/Register/*' element={<Register />} />
        <Route path="/home/*" element={<Homepages />} />
        <Route path='/verifyEmail/:token' element={< VerifyEmail />} />
        <Route path='/forgotPassword/:token' element={< ForgotPassword />} />
        <Route element={<ProtectedRoute />}>
          <Route path='/validatePayment/*' element={<ValidatePays />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path='/sendpayment/*' element={<SendPayment />} />
        </Route>
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/autoLogOut" element={<AutoLogOut />} />
      </Routes>
    </Browser>
  </React.StrictMode>
)