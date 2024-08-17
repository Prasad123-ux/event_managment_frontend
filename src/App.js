import React from 'react'
import Registration from './Components/Registration'
import Login from './Components/Login'
import UserLogin from './Components/UserLogin'
import Dashboard from './Components/Dashboard'
import {BrowserRouter, Routes, Route,} from 'react-router-dom'
import AddMedia from './Components/AddMedia'
import EventPage from './Components/EventPage'
import ExpandMedia from './Components/ExpandMedia'


export default function App() {
  
const api='https://event-managment-backend.onrender.com' 

console.log(api)
  
  return (
    <div>
      
      <BrowserRouter>
      {/* <UserLogin/> */}
      
      
      
        <Routes>
        <Route exact path="/" element={<UserLogin api={api} />}/>
        <Route exact path="/dashboard" element={<Dashboard api={api}/>}/>
          <Route exact path="/vendor/login" element={<Login api={api}/>}/>
          <Route exact path="/vendor/registration" element={<Registration api={api}/>}/>
          <Route exact path="/vendor/addMedia" element={<AddMedia api={api}/>}/>
          <Route exact path="/event/eventDetails/:id" element={<EventPage api={api}/>}/>
          <Route exact path="/event/eventDetails/Media" element={<ExpandMedia/>}/>

        </Routes>
      </BrowserRouter>
        


        

    
   
    </div>
  )
}
