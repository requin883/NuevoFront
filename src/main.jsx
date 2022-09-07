import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Browser, Route, Routes} from "react-router-dom"
import Homepages from './Pages/Homepages/Homepages'
import Menu from './Pages/Menu'
 



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Browser>
    <Routes>
      <Route path='/menu/*' element = {<Menu/>}/>
      <Route path="/*" element = { <Homepages/>}/>
    </Routes>
    </Browser>
   
  </React.StrictMode>
)
