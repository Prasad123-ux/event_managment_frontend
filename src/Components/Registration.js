import React, { useState } from 'react'
import "../Styles/registraion.css"
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

function Registration({api}) {


const navigate= useNavigate()
const toast= useToast()
const [vendorRegisterData,setVendorRegisterData]= useState({name:"",email:"",password:"",conformPassword:''})







  // API for registering Vendor
const handleRegisterFormData=(e)=>{
  e.preventDefault()
  if(vendorRegisterData.password===vendorRegisterData.conformPassword){         //   Checking the password and conform password same
  


    fetch(`${api}/api/vendor/registration`,{
      method:"POST",
      body:JSON.stringify({data:vendorRegisterData}),
      headers:{
        "content-type":"application/json"
      }

    }).then((response)=>{
    
        if(response.status===404){
          addToast("Validation error ","try after sometime","error")
        }else{
          
          return response.json()

        }
    

    }).then((data)=>{
      console.log(data)
      if(data.Success===false){
        addToast(data.Title,data.Message,"error")
      }else{
        addToast(data.Title,data.Message,"success")
        navigate('/dashboard')
      }

    }).catch((err)=>{
      addToast("Validation error ","error")

    })

  }else{
    addToast("Password Error","Password Not matched","error")
   
  }

}







const addToast=(title,message,status)=>{                  //     Function for showing toast messages
  toast({
    title: title,
    description: message,
    status: status,
    duration: 10000,
    isClosable: true
  })

}

const onchange=(e)=>{
  setVendorRegisterData({...vendorRegisterData,[e.target.name]:e.target.value})
}

  return (
    <div className='login-page d-flex justify-content-center   ' style={{"backgroundColor":"#FAFAFA"}}>
          <div className='login-form shadow  p-4  rounded-5  mt-5' style={{"backgroundColor":"#FFFFFF"}} >
        <span className='fw-medium d-block fs-5'>Register as a Vendor</span>
        <form  onSubmit={handleRegisterFormData}>
        <div className="col-md-12 col-12 mt-3 ">
    <label htmlFor="validationDefault01" className="form-label">User Name</label>
    <input type="name" className="form-control rounded-4 text-center" id="validationDefault01"  placeholder="Enter  Username"  name="name" value={vendorRegisterData.name}  onChange={onchange} style={{"backgroundColor":"#E8F0FE"}} required/>
  </div>
        <div className="col-md-12 col-12 mt-3 ">
    <label htmlFor="validationDefault02" className="form-label">Email</label>
    <input type="email" className="form-control rounded-4 text-center" id="validationDefault02"  placeholder="Enter Email ID / Username"  name="email" value={vendorRegisterData.email}  onChange={onchange}  style={{"backgroundColor":"#E8F0FE"}} required/>
  </div>
  <div className="col-md-12 col-12 mt-3">
    <label htmlFor="validationDefault03" className="form-label">Password</label>
    <input type="password" className="form-control rounded-4 text-center" id="validationDefault03"  placeholder="Enter Password"  name="password"  value={vendorRegisterData.password}   onChange={onchange} style={{"backgroundColor":"#E8F0FE"}} required/>
  </div>
  <div className="col-md-12 col-12 mt-3">
    <label htmlFor="validationDefault04" className="form-label"> Conform Password</label> 
    <input type="password" className="form-control rounded-4 text-center" id="validationDefault04"  placeholder="Re-enter Password" name="conformPassword"  value={vendorRegisterData.conformPassword}    onChange={onchange} style={{"backgroundColor":"#E8F0FE"}} required/>
  </div>
  <button   type='submit' className=' login-btn  btn btn-primary   mt-4      ' style={{"backgroundColor":"#4A90E2"}}>Register</button>
        </form>
         <span className='d-flex justify-content-center mt-3'>or </span>
         <button className='btn shadow rounded-5 text-secondary fw-medium  mx-auto  google-btn mt-3' style={{backgroundColor:"white"}}>  <FcGoogle  style={{width:"30px"}} />Sign in with Google</button>
    

      </div>
      
    </div>
  )
}

export default Registration
