import React, { useEffect } from 'react'
import './profilevideo.css'
import { useLocation } from 'react-router'
import axios from 'axios'
import CryptoJS from 'crypto-js';
import { base_url } from '../../../../constants'
const ProfileVideo = () => {
  const localData=localStorage.getItem('elmataryapp')
  const decryptedBytes =localData&& CryptoJS.AES.decrypt(localData, '111');
  const userData =decryptedBytes&& JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
  const location=useLocation()
  console.log(location?.state)
  useEffect(()=>{
    let ele=document.getElementsByClassName("publitioPlaceHolder");
    // addEventListener('click');
  },[])
  useEffect(() => {
    document.addEventListener('click', event => {
      if(document.getElementsByClassName("profilevideo_page")){
        console.log("er")
      event.preventDefault();

      }
  },[]);
    const handleContextmenu = e => {
      if(document.getElementsByClassName("profilevideo_page")){
        console.log("er")
        e.preventDefault()
      }
        // e.preventDefault()
    }
    document.addEventListener('contextmenu', handleContextmenu)
    return function cleanup() {
        document.removeEventListener('contextmenu', handleContextmenu)
    }
}, [ ])
const handleVideo=()=>{
  const data_send={
    "student_id" : userData.student_id,
    "video_id" :location?.state?.video?.video_id,
    "course_id":location?.state?.item?.course_id
  }
  console.log(data_send)
  axios.post("https://camp-coding.site/Matary_site/user/courses/insert_view.php",JSON.stringify(data_send))
  .then((res)=>{
    // console.log('erre')
  }).catch(e=>console.log(e))
}
useEffect(()=>{
  handleVideo()
},[])
  return (
    <div className='profilevideo_page'>
      <div onClick={()=>{
        console.log("er")
        window.open("https://facebook.com")
      }} className='profilevideo_page' target='_blank' href='https://facebook.com'>
        <iframe width="560" className='publitioPlaceHolder' height="315" src={`${location?.state?.video?.youtube_id}?si=eySb_C5tXFeNVTZq`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      {/* <iframe
        onContextMenu={(e)=>{
          e.preventDefault();
          return false
        }}
        onClick={(e)=>{
          e.preventDefault()
        }}
        className='publitioPlaceHolder'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope' width="100%" height="100vh" src={`${location?.state?.video?.youtube_id}?controls=1`} title="YouTube video player" frameborder="0"></iframe> */}
      </div>
    </div>
  )
}

export default ProfileVideo


// https://www.youtube.com/embed/K1yp7Q1hH1c?controls=0&fs=1
