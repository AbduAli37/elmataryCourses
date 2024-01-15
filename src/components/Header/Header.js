import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './header.css'
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { base_url } from '../../constants';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';
const Header = () => {
  const [showPerLinks,setShowPerLinks]=useState(false);
  const navigate=useNavigate()
  const localData=localStorage.getItem('elmataryapp')
  const decryptedBytes =localData&& CryptoJS.AES.decrypt(localData, '111');
  const userData =decryptedBytes&& JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));

  const [logoutLoading,setLogOutLoading]=useState(false)

  const handleLogOut=()=>{
    setLogOutLoading(true)
    const data_send={
      student_id:userData?.student_id
    }
    axios.post(base_url+'/user/auth/student_logout.php',JSON.stringify(data_send))
    .then((res)=>{
      if(res.data.status=='success'){
        toast.success(res.data.message);
        localStorage.removeItem('elmataryapp');
        navigate('/signup',{replace:true});
      }
      else if(res.data.status=='error'){
        toast.error(res.data.message)
      }
      else {
        toast.error('SomeThing Went Error');
      }
    })
      .catch(e=>console.log(e))
      .finally(()=>{
        setLogOutLoading(false)
      })
    // window.location.reload()
  }
  return (
    <div className='header'>
      <div className="right">
        <div onClick={()=>{
        navigate("/")
      }} className="logo">
          <img src={require("../../assets/log.png")} alt="" />
        </div>
        <div className="links">
          <NavLink to={"/"}>
            Home
          </NavLink>
          {/* <NavLink to={"/book"}>
            books
          </NavLink> */}

          {
            userData&&Object.keys(userData).length>0?(
              <NavLink to={"/allcourses"}>
            Courses
          </NavLink>
            ):(
              null
            )
          }
          {
            userData&&Object.keys(userData).length>0?(null):(
              <NavLink to={"/signup"}>
                Register
              </NavLink>
            )
          }
        </div>
      </div>
      <div className="left">
        <div onClick={()=>{
          setShowPerLinks(!showPerLinks)
        }} className="person_logo">
          <img src={require("../../assets/stu.png")} alt="" />
          {
            showPerLinks?(
              <div className="logo_links">
                  {
                    userData&&(
                      <div>
              <img src={require("../../assets/stu.png")} alt="" />
              <div className="details">
                <h5>{userData.student_name}</h5>
                <p>{userData.student_email}</p>
              </div>
            </div>
                    )
                  }
            <div className="links" style={{flexDirection:'column'}}>
                {
            userData&&Object.keys(userData).length>0?(
              <div
              onClick={()=>{
                navigate("/profile")
              }}
            >
              <img src={require("../../assets/user.png")} alt="" />
              <span>Account</span>
            </div>
            ):(
              null
            )
          }
                {/* <div
                  onClick={()=>{
                    navigate("/contact")
                  }}
                >
                  <img src={require("../../assets/messages.png")} alt="" />
                  <span>Contact Us</span>
                </div> */}
                <div
                  onClick={()=>{
                    navigate("/techsup")
                  }}
                >
                  <img src={require("../../assets/help.png")} alt="" />
                  <span>Technical Support</span>
                </div>
                {
            userData&&Object.keys(userData).length>0?(
              <div
                onClick={()=>{
                  return logoutLoading?null:handleLogOut()
                }}
              >
                {
                  logoutLoading?
                  (
                    <Spinner/>
                  )
                  :
                  (
                  <>
                    <img src={require("../../assets/signout.png")} alt="" />
                    <span>Sign Out</span>
                  </>
                  )
                }
              </div>
            ):(
              null
            )
          }
              </div>
          </div>
            ):null
          }
        </div>
        {/* <div className="cart_logo">
          <img onClick={()=>{
            navigate("/cart")
          }} src={require("../../assets/cart.png")} alt="" />
        </div> */}
      </div>
    </div>
  )
}

export default Header
