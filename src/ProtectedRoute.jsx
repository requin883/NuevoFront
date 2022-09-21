import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";





const ProtectedRoute = () => {

    const navigate = useNavigate();
    let userlogin = window.localStorage.getItem("user")
    if(!userlogin) return;

    let l = Date.parse(userlogin.slice(1, userlogin.length - 1))
        let log = new Date(l)  
        let date = new Date (log)
        date.setMinutes(log.getMinutes() + 15)
        let now = new Date()
        let auth = (date > now)
        console.log(date + " " + now)
return auth ? <Outlet/> : navigate('/autoLogOut')
}

export default ProtectedRoute;

  