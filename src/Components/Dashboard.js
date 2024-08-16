import React, { useEffect, useState } from 'react'
import "C:/Users/metka/Desktop/event_managment_system/frontend/src/Styles/Dashboard.css"
import { IoMdAdd } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ButtonGroup,IconButton,Button } from '@chakra-ui/react';
import { FaCopy } from "react-icons/fa";
import { useToast,Stack,Spinner } from '@chakra-ui/react';
import Navbar from './Navbar';
import Loader from './Loader';
// import AddMedia from './AddMedia';



function Dashboard() {
  const [token,setToken]= useState(null)
  const [loader,setLoader]= useState(false)
  const toast= useToast()
  const [events,setEvents]= useState([])
  const navigate= useNavigate()


 

useEffect(()=>{
                                                          // This is the home API which render after every reload 
const handleFindEvents=()=>{
      setLoader(true)
      fetch('http://localhost:7000/api/vendor/getEvents',{
        method:"GET",
        headers:{
          "Content-type":"application/json"
        }
      }).then((response)=>{
        if(!response.ok){
          setLoader(false)
          throw new Error(response.statusText)
        }else{
          return response.json()
        }

      }).then((data)=>{
        setLoader(false)
        setEvents(data.events)
        console.log(events)

      }).catch((err)=>{
        console.error(err)
      })

    }

 handleFindEvents()
},[])
  




   const addMediaFiles=()=>{               //function for navigating on upload form
    navigate('/vendor/addMedia')
   }

   const EventDetail=(id)=>{                             //function for navigating on eventDetail 
    navigate(`/event/eventDetails/${id}`)
   }
  

  
  useEffect(()=>{                            
   const token = localStorage.getItem('token')                //  checking  Authenticate user using token 
   setToken(token)
   console.log(token)
 },[token])
   
 
  return (<>
 {token!==null ? <Navbar/>:""}                              
 {/* showing data for authenticate user */}



    <div className='ps-5 pe-5 pt-2'>
      <h4 className='dashboard'><span>Dash</span><span>Board</span></h4>


{   events && events.length >=1 ?
  events.map((item,index)=>{


    console.log(typeof(events[0].media.url))
// Rendering  all Data of events

  return <div key={item._id} className=' align-items-center mt-5 '>
          <div className='event-name  fw-bold d-flex justify-content-between'>
          <span className='fs-5  event-main-name text-success'>{item.eventName  &&  item.eventName.length>=1 ? item.eventName[0].toUpperCase()+item.eventName.slice(1):"" } </span>
          </div>
        <div className=' show-events align-items-center'>
        


        {/* Rendering image of all events */}

            { item.media.length>=1? item.media.map((image,idx)=>(
              <div key={idx} class="card">
           {  image.endsWith('.mp4') || image.endsWith('.webm') || image.includes("video")? 
           <video controls><source src={image} type="video/mp4" /></video>: 
           <img src={image} className=" d-block w-100 side-img" alt="Event Images"/>
           
           }
           <button className='overlay' onClick={()=>{EventDetail(item._id)}} >check Events</button>
           </div>
))
 :<div className='text-secondary  fs-5 text-center'> This Event Does not have any Media Files</div> }
 {/* <div className='text-secondary  fs-5 text-center'> This Event Does not have any Media Files</div> */}
  
  </div>
 </div>
// </div>
})
: loader===false ? (<div className=' mx-auto text-center container  align-items-center'>
  <img src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcStxg6vR4dfSNX8ON0X2UXtBdCuMEjdnHoqiTTxMW-yd192-wfk" class=" d-block w-50 mx-auto side-img" alt="..."/>

  </div>):""}




  <div className='d-flex justify-content-center mt-5'>
  {/* { loader===true?
                                        // Getting loader for every data loading
<Loader/>:""}                            */}
</div>



{/* Button for Adding data*/}
  <ButtonGroup size='lg' isAttached variant='outline' className='mx-auto d-flex justify-content-center  mt-2 mb-5'>
  <Button onClick={addMediaFiles}>Add Event</Button>
  <IconButton onClick={addMediaFiles} aria-label='Add to friends' icon={<IoMdAdd  className='ms-1 mt-1'/>} />
</ButtonGroup>

    </div>
    </>
  )
}

export default Dashboard
