import React, { useEffect, useState } from 'react'
import './profileunits.css'
import Banner from '../../Unit/Banner/Banner';
import Lessons from '../../Unit/Lessons/Lessons';
import Books from '../../Books/Books';
import CryptoJS from 'crypto-js';
import { useLocation, useNavigate } from 'react-router';
import ProfileLessons from './ProfileLessons/ProfileLessons';
import axios from 'axios';
import { base_url } from '../../../constants';
const ProfileUnits = () => {
  const localData=localStorage.getItem('elmataryapp')
  const decryptedBytes =localData&& CryptoJS.AES.decrypt(localData, '111');
  const userData =decryptedBytes&& JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
  const [currentPage,setCurrentPage]=useState('lessons');
  const navigate=useNavigate()
  const location=useLocation();
  console.log(location?.state)
  const [courseDetails,setCourseDetails]=useState([]);
  const getUnits=()=>{
    const data_send={
      "student_id" : userData?.student_id,
      // course_id:location?.state?.course_id
      course_id:location?.state?.course?.course_id
    }
    console.log(data_send)
    axios.post(base_url+'/user/courses/select_course_lesson.php',JSON.stringify(data_send))
    .then((res)=>{
      console.log(res.data)
      if(res.data.status=='success'){
        setCourseDetails(res.data.message);
      }
    }).catch(e=>console.log(e));
  }
  const handleChangeShow=(item)=>{
    let currentData={...courseDetails};
    let pushedData=[];
    for(let i=0;i<courseDetails.length;i++){
      if(item.unit_id==courseDetails[i].unit_id){
        let obj={
          ...courseDetails[i],
          show:!courseDetails[i]['show'],
        }
        pushedData.push(obj);
        // currentData[i]['show']=true;
      }
      else {
        let obj={
          ...courseDetails[i],
          show:false,
        }
        pushedData.push(obj);
        // currentData[i]['show']=false;
      }
    }
    setCourseDetails(pushedData);
    // let features=currentData.features;
    // for(let i=0;i<features.length;i++){
    //   if(item.id==features[i].id){
    //     features[i]['show']=!features[i]['show'];
    //   }
    //   else {
    //     features[i]['show']=false
    //   }
    // }
    // currentData['videos']=features;
    // setCourseDetails(currentData);
  }
  // const handleEqData=()=>{
  //   let course=location?.state?.course;
  //   let features=course.videos;
  //   let pushedObj={
  //     ...course
  //   };
  //   for(let i=0;i<features.length;i++){
  //     features[i]['show']=false;
  //   }
  //   pushedObj['videos']=features;
  //   setCourseDetails(pushedObj)
  // }
  // useEffect(()=>{
  //   if(!location.state){
  //     navigate(-1,{replace:true})
  //   }
  //   handleEqData()
  // },[])
  useEffect(()=>{
    getUnits()
    // renderPages()
  },[])
  return (
    <div className='profileunits_page'>
      <Banner description={location?.state?.course?.course_content} title={location?.state?.course?.course_name}/>
        {/* <div className="unite_topics">
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
        </div> */}
        {/* {
          renderPages()
        } */}
        <ProfileLessons handleChangeShow={handleChangeShow} course={courseDetails}/>
    </div>
  )
}

export default ProfileUnits
