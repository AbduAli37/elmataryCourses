import React, { useEffect } from 'react'
import { Slide } from 'react-awesome-reveal'
import './banner2.css'
import CryptoJS from 'crypto-js';
import bcrypt from 'bcryptjs'

import  secureLocalStorage  from  "react-secure-storage";
import { useNavigate } from 'react-router'
const salt = bcrypt.genSaltSync(10)
const Banner2 = () => {
  const navigate=useNavigate()
  useEffect(() => {
    // secureLocalStorage.setItem("object", {
    //     message:  "This is testing of local storage",
    // });
    // secureLocalStorage.setItem("number", 12);
    // secureLocalStorage.setItem("string", "12");
    // secureLocalStorage.setItem("boolean", true);
    // let value = secureLocalStorage.getItem("boolean");
}, []);
const handleOpenCrypt=()=>{
  const encryptedData = localStorage.getItem('elmataryapp');
  if (encryptedData) {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, '111');
    const decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
    console.log(decryptedData)
  }
}
const localData=localStorage.getItem('elmataryapp')
const decryptedBytes =localData&& CryptoJS.AES.decrypt(localData, '111');
const userData =decryptedBytes&& JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));

  return (
    <div className='banner2'>
      {/*
        <button
        onClick={()=>{
          let pushedData=bcrypt.hashSync(JSON.stringify({first_name:'abdu',last_name:'ali',email:'aa032@gmail.com'}),"$2a$10$CwTycUXWue0Thq9StjUM0u");
          const encryptedData = CryptoJS.AES.encrypt(JSON.stringify({first_name:'abdu',last_name:'ali',email:'aa032@gmail.com'}), '111').toString();
          localStorage.setItem('elmataryapp', encryptedData);
          // localStorage.setItem("tryhash",pushedData);
          // localStorage.setItem('elmataryapp',JSON.stringify({first_name:'abdu',last_name:'ali',email:'aa032@gmail.com'}))
        }}
      >push to local</button>
      <button
        onClick={()=>{
          handleOpenCrypt()
        }}
      >open encrypt</button>
      */}
      {/* <a href="https://facebook.com">ew</a> */}
      <Slide className='left' direction='left'>
      <div >
        <h4>Lecatures Are Doctor</h4>
        <h3>
          Welcome To Our Future Doctors
        </h3>
        <p>
        here you will be an excellant doctor
        Sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt labore dolore magna aliqua suspendisse ultrices gravida.
        </p>
        <div className="actions">
          {
            userData&&Object.keys(userData).length>0?
            (
              <button
            onClick={()=>{
              navigate("/profile")
            }}
          >Profile</button>
            )
            :
            (
              null
            )
          }
          {/* <button
            onClick={()=>{
              navigate("/book")
            }}
          >books</button> */}
        </div>
      </div>
      </Slide>
      <Slide className='right' direction='right'>
        <div >
          <img src={require("../../../assets/doctors.png")} alt="" />
        </div>
      </Slide>
    </div>
  )
}

export default Banner2
