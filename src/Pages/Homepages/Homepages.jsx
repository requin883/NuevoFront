import { Routes, Route } from "react-router-dom";
import cbMenu from "../../callbacks/cbMenu";
import Login from "./Components/Login";
import Register from "./Components/Register";


function Homepages(){
    let menu = [
        {links: '/Login', options: 'Login'},
        {links: '/Register', options: 'Register'}
    ]

    return (
        <div> 

        
        <div>
            {menu.map(cbMenu)}
        </div>
        <Routes>
            <Route path = '/Login' element={<Login/>}/>
            <Route path = '/Register' element={<Register/>}/>
        </Routes>
        </div>
    )
}

export default Homepages;