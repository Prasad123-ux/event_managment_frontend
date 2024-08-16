import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { IoCheckmark } from "react-icons/io5";
import "C:/Users/metka/Desktop/event_managment_system/frontend/src/Styles/login.css"
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';




function Login() {

  
  const [vendorData,setVendorData]= useState({email:"",password:""})
  const token= localStorage.getItem('token')
  const navigate= useNavigate()
  const toast= useToast()

  onchange=(e)=>{
    setVendorData({...vendorData,[e.target.name]:e.target.value})
  }

  const handleFormData=(e)=>{

    e.preventDefault()

    fetch('http://localhost:7000/api/vendor/login',{
      method:'POST',
      body:JSON.stringify({data:vendorData}),
      headers:{
        "Content-type":"application/json"
      }
    }).then((response)=>{
      if(response.status===404){
        throw new Error(response.statusText)
      }else{
        return response.json()
      }

    }).then((data)=>{
      console.log(data)
      if(data.Success===false){
        addToast(data.Title, data.Message,"error")
      }else{
        addToast(data.Title, data.Message,"success")
        localStorage.setItem('token',data.token)
        navigate('/dashboard')
      }

    })

  }


  const addToast=(title,message,status)=>{
    toast({
      title: title,
      description: message,
      status: status,
      duration: 10000,
      isClosable: true
    })
  }


  return (
    <div>
      <div className='login-vendor-page d-flex justify-content-center  align-items-center  flex-column flex-md-row ' style={{"backgroundColor":"#FAFAFA"}}>
      <div className='login-vendor-form shadow  p-4  rounded-5  mt-5' style={{"backgroundColor":"#FFFFFF"}} >
        <span className='fw-medium d-block fs-4'>Login</span>
        <form  onSubmit={handleFormData}>
        <div class="col-md-12 col-12 mt-3 ">
    <label for="validationDefault01" class="form-label">Email</label>
    <input type="email" class="form-control rounded-4" id="validationDefault01"  placeholder="Enter Email ID / Username"    name="email" onChange={onchange} style={{"backgroundColor":"#E8F0FE"}} required/>
  </div>
  <div class="col-md-12 col-12 mt-3">
    <label for="validationDefault02" class="form-label">Password</label>
    <input type="password" class="form-control rounded-4" id="validationDefault02"  name="password" onChange={onchange}  placeholder="Enter Password"  style={{"backgroundColor":"#E8F0FE"}} required/>
  </div>
  <div   className=' otp d-flex forget-btn  btn-link justify-content-start mt-3 ' data-bs-toggle="modal" data-bs-target="#staticBackdrop">Forget Password ?</div>
  <button   type='submit' className=' login-vendor-btn btn btn-primary  mt-4 w-50 ' style={{"backgroundColor":"#4A90E2"}}>Login </button>
        </form>
          <div   className='otp text-primary mx-auto btn-link d-flex justify-content-center mt-1 w-50'>Use OTP to Login</div>
         <span className='d-flex justify-content-center mt-3'>or </span>
         <button className='btn shadow rounded-5 text-secondary fw-medium d-flex justify-content-around  mx-auto mt-3' style={{backgroundColor:"white"}}>  <FcGoogle className='mt-1' style={{width:"30px"}} />Sign in with Google</button>
       {/* <div><GoogleSignIn/>></div> */}

      </div>
      <div className='login-detail shadow mt-5 d-none d-sm-block ms-2 p-5 rounded-5' style={{"backgroundColor":"#FFFFFF"}} >
        <div className='fw-medium fs-4'> Want to become a Photographer ?</div>
        <div className='d-flex justify-content-start mt-3'>
          <IoCheckmark  className='fs-4 text-success' style={{"width":"20px"}} /> <span className='ms-2'>You don’t take a photograph, you make it..</span>
        </div>
        <div className='d-flex justify-content-start mt-3'>
          <IoCheckmark  className='fs-4 text-success' style={{"width":"20px"}} /> <span className='ms-2' >The camera is an instrument that teaches people how to see without a camera.</span>
        </div>
        <div className='d-flex justify-content-start mt-3'>
          <IoCheckmark  className='fs-4 text-success' style={{"width":"20px"}} /> <span className='ms-2'>The best thing about a picture is that it never changes.</span>
        </div>
        <div className='d-flex justify-content-start mt-3'>
          <IoCheckmark  className='fs-4 text-success' style={{"width":"20px"}} /> <span>Photography is the story I fail to put into words. </span>
        </div>
        <div className='d-flex justify-content-between mt-5'>
          {/* <button onClick={()=>{navigate('/vendor/registration')}}  className='text-primary bg-white btn   border w-50 p-2  border-primary' >Register for Free</button> */}
        </div>
        <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQY3kRO9-yVxLT6ParUDJkZLEVjVVvj3SOZgeuIkFhtQHd3Uh9U" className=' w-25 d-flex mt-5 mx-auto' alt=""/>

      </div>

      
{/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  Launch static backdrop modal
</button> */}



<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Forget Password</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <button className='btn shadow rounded-5 text-secondary fw-medium d-flex justify-content-around w-75 mx-auto mt-3' style={{backgroundColor:"white"}}>  <FcGoogle className='mt-1' style={{width:"30px"}} />Sign in with Google</button>
<form className='form  mt-5'>

<div class="col-md-12 ">
    <label for="validationDefault01" class="form-label"> Email</label>
    <input type="email" class="form-control text-center" id="validationDefault01" name="forgetEmail" placeholder="Enter Email ID"   required/>
  </div>
  <button  className=' login-btn btn btn-primary  mt-4 w-50 '  style={{"backgroundColor":"#4A90E2"}}>Get OTP</button>


  
  
  <div class="col-md-12 mt-3">
    <label for="validationDefault02" class="form-label">OTP</label>
    <input type="number" class="form-control text-center" id="validationDefault02"  name="otp"  placeholder="Enter OTP"  required/>
  </div>
  <button   to="/"  className='btn d-flex justify-content-start btn-link  '>Resend OTP</button>
  <button  type='submit' className=' login-btn btn btn-primary  mt-4 w-50 '  data-bs-dismiss="modal" style={{"backgroundColor":"#4A90E2"}}>Submit</button>

  
</form>
        
      </div>
      <div class="modal-footer">
      
      </div>
    </div>
  </div>
</div>
    </div>
    </div>
  )
}

export default Login
