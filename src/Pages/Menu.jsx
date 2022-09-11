import ValidatePays from "./ValidatePays/ValidatePays"
import { Routes, Route } from "react-router-dom";
import cbMenu from "../callbacks/cbMenu";

function Menu() {

    let menu = [
        { links: '/menu/validatepay', options: 'Validate Payments' },
   
    ]

    return (
        <div>
    <div>
        {menu.map(cbMenu)}
    </div>
            Menu
            <Routes>
                    <Route path='/validatepay' element={<ValidatePays/>} />
             </Routes>
        </div>
    )
}

export default Menu