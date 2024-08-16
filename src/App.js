import React, { useState } from 'react'
import Registration from './Components/Registration'
import Login from './Components/Login'
import UserLogin from './Components/UserLogin'
import Dashboard from './Components/Dashboard'
// import { Router } from 'express'
//  import { BrowserRouter as Router, Route,Switch } from 'react-router-dom'
import {BrowserRouter, Routes, Route,} from 'react-router-dom'
import AddMedia from './Components/AddMedia'
import EventPage from './Components/EventPage'
import Navbar from './Components/Navbar'
import ExpandMedia from './Components/ExpandMedia'
import { useEffect } from 'react'

export default function App() {
  
  
  return (
    <div>
      
      <BrowserRouter>
      {/* <UserLogin/> */}
      
      
      
        <Routes>
        <Route exact path="/" element={<UserLogin/>}/>
        <Route exact path="/dashboard" element={<Dashboard/>}/>
          <Route exact path="/vendor/login" element={<Login/>}/>
          <Route exact path="/vendor/registration" element={<Registration/>}/>
          <Route exact path="/vendor/addMedia" element={<AddMedia/>}/>
          <Route exact path="/event/eventDetails/:id" element={<EventPage/>}/>
          <Route exact path="/event/eventDetails/Media" element={<ExpandMedia/>}/>

        </Routes>
      </BrowserRouter>
        


        

    
   
    </div>
  )
}
