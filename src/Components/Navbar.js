import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { IoIosLogOut } from "react-icons/io";
import "../Styles/Navbar.css"
function Navbar() {
const [token,setToken]= useState(null)

    const navigate = useNavigate();

    const getMedia = () => {
        navigate('/vendor/addMedia');                     //navigating the vendor on addMedia form
    };

    const logOut = () => {
        localStorage.removeItem("token");                     //logout function for user
        navigate('/');
    };

    useEffect(()=>{
        const storedToken=localStorage.getItem('token')
        setToken(storedToken)
    },[])

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarTogglerDemo03" 
                    aria-controls="navbarTogglerDemo03" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse row  " id="navbarTogglerDemo03">
                <div className="navbar-heading col-12 col-sm-8" href="/"><span>Event</span><span>Hive</span></div>

                  


                    <div className='   col-12 col-sm-4  d-flex justify-content-around flex-row mt-2 '>
                        <button onClick={getMedia} className='btn btn-sm-outline-info btn-outline-info d-none    d-sm-block '><IoMdAdd className='fs-4' /></button>
                        <Link className="nav-link  btn   d-block  "  to="/dashboard">Home</Link>
                        <button className='btn    d-block d-sm-none' data-bs-target="#exampleModal"  data-bs-toggle="modal">Log Out</button>

                        <button className='btn  btn-outline-info  d-none   d-sm-block' data-bs-target="#exampleModal"  data-bs-toggle="modal"><IoIosLogOut /></button>
                      {  token===null ? <Link className="nav-link" to="/vendor/login">I'm Photographer</Link>:""}
                    </div>
                </div>
            </nav>
        


            <div className="modal"  id="exampleModal" >
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Log Out</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <p className='text-secondary fw-bold '>Are Your sure to Log Out?  </p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={logOut}>Yes! i'm Ready</button>
        <button type="button" className="btn btn-primary " data-bs-dismiss="modal"  aria-label="Close">Go Back</button>
      </div>
    </div>
  </div>
</div>
        </div>
    );
}

export default Navbar;
