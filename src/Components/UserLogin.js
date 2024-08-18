import React, { useEffect, useState } from 'react'
import "../Styles/userLogin.css"

import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import e from 'express';


function UserLogin({api}) {


const [userData,setUserData]= useState({name:"",email:"",eventID:""})
const toast=useToast()
const navigate=useNavigate()
const apiUrl= process.env.REACT_APP_API_URL

const onchange=(e)=>{
  setUserData({...userData,[e.target.name]:e.target.value})
}



const handleUserData=(e)=>{
  // console.log(typeof(userData.eventID))
  e.preventDefault()

    fetch(`${api}/api/client/login`,{
    method:"POST",                                              //API For login user 
    body:JSON.stringify({data:userData}),
    headers:{
      "Content-type":"application/json"
    }
   }).then((response)=>{
    if(!response.ok){
      addToast("Event Not Found","Please Try Again, With Proper Event ID","error")
      // throw new Error(response.statusText)
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
    
     console.log(error)
    
   })
  
}
useEffect(()=>{
  console.log(apiUrl)
},[])

const addToast=(title,message,status)=>{    //     Function for showing toast messages
  toast({
    title: title,
    description: typeof message === 'string' ? message : 'An error occurred',  // Ensure message is a string
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
        <div className="col-md-12 col-12 mt-3 ">
    <label htmlFor="validationDefault01" className="form-label">Name</label>
    <input type="name" className="form-control rounded-4 text-center" id="validationDefault01"  value={userData.name} placeholder="Enter Your Name"    name="name" onChange= {onchange} style={{"backgroundColor":"#E8F0FE"}} required/>
  </div>
        <div className="col-md-12 col-12 mt-3 ">
    <label htmlFor="validationDefault02" className="form-label">Email</label>
    <input type="email" className="form-control rounded-4 text-center" id="validationDefault02" value={userData.email}  placeholder="Enter Email ID / Username"   onChange={onchange}  name="email" style={{"backgroundColor":"#E8F0FE"}} required/>
  </div>
  <div className="col-md-12 col-12 mt-3">
    <label htmlFor="validationDefault03" className="form-label">Event ID</label>
    <input type="id" className="form-control rounded-4 text-center" id="validationDefault03"  name="eventID" value={userData.eventID}  placeholder="Enter Event ID" onChange={onchange}  style={{"backgroundColor":"#E8F0FE"}} required/>
  </div>
   <div className='mx-auto mt-2'><Link  className='text-primary ' to="/vendor/login">i'm Photographer!</Link></div>

  <button   type='submit' className=' login-vendor-btn btn btn-primary  mt-4 w-50 ' style={{"backgroundColor":"#4A90E2"}}>See my Event</button>
        </form>
          
      </div>
      
    </div>
  
  )
}

export default UserLogin
