import React, { useEffect, useState } from 'react'
import Banner from './Banner/Banner'
import { useLocation, useNavigate } from 'react-router'
import './units.css'
import CryptoJS from 'crypto-js';
import About from './About/About'
import Lessons from './Lessons/Lessons'
import Books from '../Books/Books'
import UniteReviews from './UnitReviews/UniteReviews'
import Footer from '../../components/Footer/Footer'
import axios from 'axios';
import { base_url } from '../../constants';
const Units = () => {
  const localData=localStorage.getItem('elmataryapp')
  const decryptedBytes =localData&& CryptoJS.AES.decrypt(localData, '111');
  const userData =decryptedBytes&& JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));

  const navigate=useNavigate()
  const location=useLocation();
  console.log(location.state)
  const [courseDetails,setCourseDetails]=useState([]);
  const [currentPage,setCurrentPage]=useState('about');
  const getUnitData=()=>{
    const data_send={
      student_id:userData?.student_id,
      course_id:location?.state?.course?.course_id
    }
    console.log(data_send)
    axios.post(base_url+"/user/courses/select_course_lesson.php",JSON.stringify(data_send))
    .then((res)=>{
      console.log(res.data.message)
      if(res.data.status=='success'){
        let allcourses=[...res.data.message];
        let pushedData=[];
        for(let i=0;i<allcourses.length;i++){
          let obj={
            ...allcourses[i],
            show:false,
          }
          pushedData.push(obj);
        }
        setCourseDetails(pushedData);
        console.log(pushedData)
      }
    })
  }
  const handleChange=(item)=>{
    let pushedData=[];
    for(let i=0;i<courseDetails.length;i++){
      if(item.unit_id==courseDetails[i].unit_id){
        let obj={
          ...courseDetails[i],
          show:!courseDetails[i]['show'],
        }
        pushedData.push(obj);
      }
      else {
        let obj={
          ...courseDetails[i],
          show:false,
        }
        pushedData.push(obj);
      }
    }
    setCourseDetails(pushedData);
  }
  function scrollToTop() {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
  }
  useEffect(()=>{
    getUnitData()
    scrollToTop()
  },[])
  if(!location.state){
    navigate(-1,{replace:true})
  }
  return (
    <>
      <div className='units_page'>
      <Banner description={location?.state?.course?.course_content} title={location?.state?.course?.course_name}/>
      <div className="unit_content">
      <Lessons handleChange={handleChange} course={courseDetails}/>
        {/* <div className="unit_topics">
          <div
            onClick={()=>{
              setCurrentPage('about')
            }}
            className={currentPage=='about'?'unit_topic active':'unit_topic'}
          >
            About
          </div>
          <div
            onClick={()=>{
              setCurrentPage('lessons')
            }}
            className={currentPage=='lessons'?'unit_topic active':'unit_topic'}
          >Lessons</div>
          <div
            onClick={()=>{
              setCurrentPage('ebooks')
            }}
            className={currentPage=='ebooks'?'unit_topic active':'unit_topic'}
          >E-books</div>
          <div
            onClick={()=>{
              setCurrentPage('reviews')
            }}
            className={currentPage=='reviews'?'unit_topic active':'unit_topic'}
          >Reviews</div>
        </div> */}

      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Units
