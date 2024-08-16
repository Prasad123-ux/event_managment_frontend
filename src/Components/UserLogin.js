import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import "C:/Users/metka/Desktop/event_managment_system/frontend/src/Styles/userLogin.css"
import { FaArrowRight } from "react-icons/fa";
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import e from 'express';


function UserLogin() {


const [userData,setUserData]= useState({name:"",email:"",eventID:""})
const toast=useToast()
const navigate=useNavigate()

const onchange=(e)=>{
  setUserData({...userData,[e.target.name]:e.target.value})
}



const handleUserData=(e)=>{
  e.preventDefault()

    fetch('http://localhost:7000/api/client/login',{
    method:"POST",                                              //API For login user 
    body:JSON.stringify({data:userData}),
    headers:{
      "Content-type":"application/json"
    }
   }).then((response)=>{
    if(response.status===404){
   console.log(response)
      addToast("Event Not Found","Please try again, There was error","error")
      throw new Error(response.statusText)
    }else{
      return response.json()
    }
    

   }).then((data)=>{
    
    if(data.Success===false){
      addToast(data.Title, data.Message,"error")
  
    }
   else{
     addToast(data.Title, data.Message,"success")
     navigate(`/event/eventDetails/${userData.eventID}`)

   }

   }).catch((error)=>{
     addToast(error,error.message,"error")
    // console.log(error)
    
   })
  
}


const addToast=(title,message,status)=>{    //     Function for showing toast messages
  toast({
    title: title,
    description: message,
    status: status,
    duration: 10000,
    isClosable: true
  })
  

}


  return (
   
    <div className='login-page d-flex justify-content-center   ' style={{"backgroundColor":"#FAFAFA"}}>
          <div className='login-user-form shadow  p-4  rounded-5  mt-5' style={{"backgroundColor":"#FFFFFF"}} >
        <span className='fw-medium d-block fs-4'>Find Events</span>
        <form onSubmit={handleUserData} >
        <div class="col-md-12 col-12 mt-3 ">
    <label for="validationDefault01" class="form-label">Name</label>
    <input type="name" class="form-control rounded-4 text-center" id="validationDefault01"  value={userData.name} placeholder="Enter Your Name"    name="name" onChange= {onchange} style={{"backgroundColor":"#E8F0FE"}} required/>
  </div>
        <div class="col-md-12 col-12 mt-3 ">
    <label for="validationDefault02" class="form-label">Email</label>
    <input type="email" class="form-control rounded-4 text-center" id="validationDefault02" value={userData.email}  placeholder="Enter Email ID / Username"   onChange={onchange}  name="email" style={{"backgroundColor":"#E8F0FE"}} required/>
  </div>
  <div class="col-md-12 col-12 mt-3">
    <label for="validationDefault03" class="form-label">Event ID</label>
    <input type="id" class="form-control rounded-4 text-center" id="validationDefault03"  name="eventID" value={userData.eventID}  placeholder="Enter Event ID" onChange={onchange}  style={{"backgroundColor":"#E8F0FE"}} required/>
  </div>
   <div className='mx-auto mt-2'><Link  className='text-primary ' to="/vendor/login">i'm Photographer!</Link></div>

  <button   type='submit' className=' login-vendor-btn btn btn-primary  mt-4 w-50 ' style={{"backgroundColor":"#4A90E2"}}>See my Event</button>
        </form>
          
      </div>
      
    </div>
  
  )
}

export default UserLogin
