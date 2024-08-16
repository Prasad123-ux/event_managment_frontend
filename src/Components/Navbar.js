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

                <div className="collapse navbar-collapse row  ms-5" id="navbarTogglerDemo03">
                <div className="navbar-heading col-12 col-md-2" href="/"><span>Event</span><span>Hive</span></div>

                    <Link className="nav-link  col-md-4 col-12 "  to="/dashboard">Home</Link>


                    <div className='d-flex justify-content-around col-12 col-md-6 '>
                        <button onClick={getMedia} className='btn btn-sm-outline-info btn-outline-info d-none  d-sm-block'><IoMdAdd className='fs-4' /></button>
                        <button className='btn  btn-outline-info' data-bs-target="#exampleModal"  data-bs-toggle="modal"s><IoIosLogOut /></button>
                      {  token===null ? <Link className="nav-link" to="/vendor/login">I'm Photographer</Link>:""}
                    </div>
                </div>
            </nav>
        


            <div class="modal" tabindex="-1" id="exampleModal" >
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Log Out</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p className='text-secondary fw-bold '>Are Your sure to Log Out?  </p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={logOut}>Yes! i'm Ready</button>
        <button type="button" class="btn btn-primary " data-bs-dismiss="modal"  aria-label="Close">Go Back</button>
      </div>
    </div>
  </div>
</div>
        </div>
    );
}

export default Navbar;
