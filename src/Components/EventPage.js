import React, { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import "C:/Users/metka/Desktop/event_managment_system/frontend/src/Styles/eventPage.css"
import { GrView } from "react-icons/gr";

import { RiDeleteBin6Line } from "react-icons/ri";
import { useToast } from '@chakra-ui/react';
import { FaCopy } from "react-icons/fa";

import Loader from './Loader';
import Navbar from './Navbar';
import { IoCloudUploadOutline } from "react-icons/io5";




function EventPage() {
  const [mediaUrls,setMediaUrls]= useState([])
  const [token, setToken]= useState(null)
  const [loader,setLoader]= useState(false)
  const [data,setData]= useState([])
  const [editEventData,setEditEventData]= useState({eventName:"",date:"",description:""})
  const {id}= useParams()                  // Getting data from url as id 
  const months=["jan", "Feb", "March", "April", "May", "Jun","July", "Aug", "Sep", "Oct", "Nov", "Dec"]        
  const navigate=useNavigate()
  const toast= useToast()

   
const deleteFile=async(url)=>{
  setLoader(true)                                                                                       //API for deleting event Media
  try{
  const response=  await fetch('http://localhost:7000/api/vendor/event/delete',{
method:"POST",
body:JSON.stringify({token:token,eventName:data.eventName, media:url}),
headers:{
  "content-type":"application/json"
}
    }) 
    if(!response.ok){
      setLoader(false)
      throw new Error(response.statusText)
    }else{
      setLoader(false)
      const data = await response.json()
    
    if(data.Success===true)
      window.location.reload()
    addToast("Media Deleted","success","1000")

    
    }
  }catch(err){
console.error(err)
  }

}
   


    useEffect(()=>{
        const ExplainEvent= async()=>{
          setLoader(true)
    //   Making a API request for fetching the data of particular event  that event we got using
         await fetch(`http://localhost:7000/api/client/getEventDetails/${id}`,{
                method:"GET",
                headers:{
                    "Content-type":"application/json"
                }
            }).then((response)=>{
              setLoader(false)
                if(!response.ok){
                    throw new Error(response.statusText)
                }else{
                    return response.json()
                }

            }).then((eventData)=>{
             
              setData(eventData.eventDetails)
               

            }).catch((err)=>{
                console.log(err)
            })
          }

          ExplainEvent()   // calling a function at every render



          const storedToken= localStorage.getItem('token')
          setToken(storedToken)
    
        },[id,token]) //using id we can call useEffect at every time id and token changes 

    

        const expandMedia=(url)=>{
          console.log(url)
          navigate(`/event/eventDetails/Media?url=${encodeURIComponent(url)}`)
        }

// Editing the event data
 const onchange=(e)=>{
    setEditEventData({...editEventData,[e.target.name]:e.target.value})


}



// making a request for updating event data
const handleEditData=async (e)=>{
  setLoader(false)
    e.preventDefault()
    await fetch(`http://localhost:7000/api/vendor/updateEventData/${id}`,{
        method:"POST",
        body:JSON.stringify({token:token,data:editEventData,media:mediaUrls}),
        headers:{
            "Content-type":"application/json"
        }
    }).then((response)=>{
      setLoader(false)
        if(!response.ok){
          addToast("Data Not Updated","Error","1000")
            throw new Error(response.statusText)

        }else{
            return response.json()
        }

    }).then((data)=>{
      if(data.Success===true){
      addToast("Data Updated Successfully","success","1000")
      }
        console.log(data)

    }).catch((err)=>{
        console.log(err)

    })

}

const shareID=()=>{
   const urlToShare=window.location.href                  //sharing the  url of event


  navigator.clipboard.writeText(urlToShare).then(()=>{
    addToast("URL Copied to Clipboard","success","1000")
  }).catch((err)=>{
   addToast("URL Not Copied to Clipboard","error","1000")
    
  })
  }

  const addToast=(message,status,duration)=>{
    toast({                                                //Toasting the alerts
      // title: title,
      description: message,
      status: status,
      duration: 1500 || duration,
      isClosable: true
    })
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




 
  return (
    <>
    {token!==null ? <Navbar/>:""}                    
    {/* Authenticating user based on token */}
    <div className='mt-5'>
      <div className='d-flex justify-content-center'>
      {
        loader===true?  <Loader/>:""                  
        // rendering loader based on condition
      }
      </div>
        <div className='d-flex justify-content-between '>
            <span className='ms-5 fs-4 fw-bold text-info' >{data.eventName  &&  data.eventName.length>=1 ? data.eventName[0].toUpperCase()+data.eventName.slice(1):"" } </span>

             {/* <!-- Button trigger Edit data modal --> */}
           {token!==null ?  <button className='btn btn-outline-primary me-5 d-none d-sm-block'data-bs-toggle="modal" data-bs-target="#staticBackdrop"><span><FaEdit className='mb-1' /></span></button>:""}

        </div>
        <span className='ms-5 text-secondary'><span className='fw-bold'>Event Date:</span>   {data.eventDate? (` ${new Date(data.eventDate).getDay()}  ${months[new Date(data.eventDate).getMonth()]}  ${new Date(data.eventDate).getFullYear()}`):""}</span>
        <div className='ms-5 text-dark fs-6  mt-3 d-flex justify-content-between'> <span className='text-secondary  '> {data.eventDescription}  </span>           <button onClick={()=>{shareID(data._id)}}   className=' fw-lighter btn btn-outline-primary me-5 d-none d-sm-block '><FaCopy /></button>
       
        </div>
        <div className='d-block  d-sm-none  mt-3 '>    <button onClick={()=>{shareID(data._id)}}   className=' fw-lighter btn btn-outline-primary  me-5'><FaCopy /></button>           {token!==null ?  <button className='btn btn-outline-primary me-5 'data-bs-toggle="modal" data-bs-target="#staticBackdrop"><span><FaEdit className='mb-1' /></span></button>:""}
        </div>
      
       
     
       
  <div className=' show-events-event align-items-center justify-content-around row  mt-5 mx-auto'>
       {/* Rendering the data of all media files */}
            { data.media && data.media.length>=1 ?data.media.map((image,idx)=>(
              <div key={idx} class="card-event col-3 mt-4 col-3  ">

                {/* Checking here media file is video or image  */}

           {image.endsWith('.mp4') || image.endsWith('.webm') || image.includes("video") ?  <video controls><source src={image} type="video/mp4" /></video>:<img src={image} className=" d-block w-100  event-img shadow" alt="Event Images"/>}
         {}  <div className='overlay-event text-white fs-5 w-50 d-flex justify-content-between '  onClick={()=>{expandMedia(image)}} style={{"height":"30%"}}>
           { token!==null? <span onClick={()=>{expandMedia(image)}} className='text-warning'><GrView /> </span>:"" }{ token!==null  ? <span className='text-info' onClick={()=>{deleteFile(image)}}><RiDeleteBin6Line /></span>:""}
           </div>
           </div>
))
 :<div className='mx-auto text-center fs-5 text-secondary mt-5'> No Media Found</div>}
  
  </div>
      {/* Making a module for Editing the data of event */}
     


{/* <!-- Modal --> */}
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">Edit Event Detail</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">


      <form onSubmit={handleEditData} >
        <div class="form-row mt-5">
    <div class="form-group col-md-12">
      <label htmlFor="inputFullName">Event Name <span className='text-danger'>*</span></label>
      <input type="name" className="form-control rounded-3" id="inputFullName" name="eventName" value={editEventData.eventName}   onChange={onchange} placeholder=" Event Name" />
    </div>
    <div class="form-group col-md-12">
      <label htmlFor="inputDescription">Event Description <span className='text-danger'>*</span></label>
      <input type="text" className="form-control rounded-3" id="inputEmail" name="description" value={editEventData.description}   onChange={onchange} placeholder="Event Description" />
    </div>
    <div class="form-group col-md-12">
      <label htmlFor="inputDate">Event Date <span className='text-danger'> *</span></label>
      <input type="Date" className="form-control rounded-3" id="inputDate" name="date" value={editEventData.date}  onChange={onchange} placeholder="Event Date"/>
    </div>
    <div type='file' onClick={handleUpload} className='btn w-25 mt-2 mx-auto upload-btn'> <span className='mx-auto'><IoCloudUploadOutline  c/></span> <span className='mx-auto'>Upload Files</span></div>

    </div>


<div className='d-flex justify-content-between '>
<button type='submit' className='btn btn-primary w-25 mt-5' data-bs-dismiss="modal" aria-label="Close"> Submit</button>
</div>
        </form>
      </div>
     
    </div>
  </div>
</div>
    </div>
    </>
  )
}

export default EventPage
