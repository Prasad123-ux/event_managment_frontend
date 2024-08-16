import React from 'react'
import 'C:/Users/metka/Desktop/event_managment_system/frontend/src/Styles/ExpandMedia.css'
import { useSearchParams } from 'react-router-dom'
function ExpandMedia() {


  const [searchParams]= useSearchParams()           //getting the url  from qyery and and decoding it 
const url=searchParams.get('url')
const decodedUrl= decodeURIComponent(url)


  return (
    <div className='expand-main container'>
      {/* Rendering the image */}
      {  decodedUrl.endsWith('.mp4') || decodedUrl.endsWith('.webm') || decodedUrl.includes("video")? 
           <video controls className='d-block w-100 side-img'><source src={decodedUrl} type="video/mp4" /></video>: 
           <img src={decodedUrl} className=" d-block w-100 side-img" alt="Event Images"/>
           
           }
      
      
    </div>
  )
}

export default ExpandMedia
