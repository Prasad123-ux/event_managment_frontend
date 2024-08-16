import React, { useEffect, useState } from 'react'
import "C:/Users/metka/Desktop/event_managment_system/frontend/src/Styles/addMedia.css"
import { useToast } from '@chakra-ui/react'
import { IoCloudUploadOutline } from "react-icons/io5";
import Navbar from './Navbar';




function AddMedia() {
  const [token, setToken]= useState(null)
const [mediaDetails,setMediaDetails]= useState({eventName:"",description:"",date:""})
const [mediaUrls,setMediaUrls]= useState([])
const toast= useToast()


onchange=(e)=>{                            //  getting Values of updating
    setMediaDetails({...mediaDetails,[e.target.name]:e.target.value})

}

const handleUpload = () => {                                // uploading the files on cloudinary widget
 
window.cloudinary.openUploadWidget(
     { cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME, upload_preset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
      sources:['local'],
      multiple:true,
      resource_type:'auto',
      max_files:15,
      // transformation: [{ width: 1920, height: 1080, crop: "limit" }] // Ensure it's HD
      client_allowed_formats: ["jpg", "jpeg", "png", "gif", "mp4"], // Specify allowed formats
      max_file_size: 10485760, // 10MB

      },
      (error, result) => {
        if (error) {
          console.error('Upload error:',); // Log the error
          return;
        }
  
        if (result.event === 'success') {
          const uploadedUrl = result.info.secure_url;
          setMediaUrls(prevUrls => {
            if (!prevUrls.includes(uploadedUrl)) { // Check for duplicates
              return [...prevUrls, uploadedUrl];
            } else {
              return prevUrls;
              
            }
          });
        }
     

        // Close the widget after upload
        if (result.event === 'close') {
        
          
        }
      }
    );
  };



const handleFormData=async(e)=>{
                                                                  // uploading all details on data base  using API
  e.preventDefault()
const token = localStorage.getItem('token')
  if(mediaUrls.length>=1){
 
    try{
      
    const response=  await fetch('http://localhost:7000/api/vendor/uploadMedia',{
        method:"POST",
        body:JSON.stringify({token:token,url:mediaUrls,data:mediaDetails}),
      headers:{"Content-type":"application/json"}
      })
      const data= await response.json()
      console.log(data)
      addToast(data.Message,"success")

      setMediaUrls("")

    }catch(err){
      addToast("Server Problem ! Please try again tomorrow ","warning")
      // addToast(err,"error")


    }
  }else{
    addToast("Please Upload Files ","warning")

  }
}




const addToast=(title,status)=>{                                //Toast function for showing toast messages
  toast({
    title: title,
    
    status: status,
    duration: 5000,
    isClosable: true
  })
}

useEffect(()=>{
  const  storedToken= localStorage.getItem('token')
  setToken(storedToken)
},[token])


  return (
    
       <div className='main-form' style={{"backgroundColor":"#F8F9FA"}}>
          {token!==null ? <Navbar/>:""}                    
      <div className='registration-form mx-auto p-5' style={{"backgroundColor":"#FFFFFF"}}>
        <div className='fw-medium fs-3' >Add Your Event Media </div>
        <span className='text-secondary'>Save and restrict from accessing unauthorised users</span>


        <form onSubmit={handleFormData} >           
          {/* handeling form */}


        <div class="form-row mt-5">
    <div class="form-group col-md-12">
      <label htmlFor="inputFullName">Event Name <span className='text-danger'>*</span></label>
      <input type="name" className="form-control rounded-3" id="inputFullName" name="eventName" value={mediaDetails.eventName}   onChange={onchange} placeholder=" Event Name" required/>
    </div>
    <div class="form-group col-md-12">
      <label htmlFor="inputDescription">Event Description <span className='text-danger'>*</span></label>
      <input type="text" className="form-control rounded-3" id="inputEmail" name="description" value={mediaDetails.description}   onChange={onchange} placeholder="Event Description" required/>
    </div>
    <div class="form-group col-md-12">
      <label htmlFor="inputDate">Event Date <span className='text-danger'> *</span></label>
      <input type="Date" className="form-control rounded-3" id="inputDate" name="date" value={mediaDetails.date}  onChange={onchange} placeholder="Event Date" required/>
    </div>

    {/* Upload button for uploading files on cloudinary */} 

    <div type='file' onClick={handleUpload} className='btn w-25 mt-2 mx-auto upload-btn'> <span className='mx-auto'><IoCloudUploadOutline  c/></span> <span className='mx-auto'>Upload Files</span></div>
 
  
  <div class="form-check mt-2">
      <input class="form-check-input " type="checkbox" value="" id="checkInput" required/>
      <label class="form-check-label" htmlFor="checkInput">
      Please upload only supported file types (image,video) to ensure compatibility."
      </label>
      </div>


  </div>


<div className='d-flex justify-content-between '>
<button type='submit' className='btn btn-primary w-25 mt-5'> Submit</button>
</div>
        </form>
      </div>
      </div>

  )
}
export default AddMedia
