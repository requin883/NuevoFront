import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Homepages from "./Pages/Homepages/Homepages";




const ProtectedRoute = () => {


    let userlogin = window.localStorage.getItem("user");

    if(!userlogin) return;

    let l = Date.parse(userlogin.slice(1, userlogin.length - 1))
        let log = new Date(l)  
        let date = new Date (log)
        date.setMinutes(log.getMinutes() + 1)
        let now = new Date()
        let auth = (date > now)
        console.log(date + " " + now)
return auth ? <Outlet/> : <Homepages/>
}

export default ProtectedRoute;

  