import React, { useEffect, useState } from 'react'
import './allcourses.css'
import AllCoursesBanner from './AllCoursesBanner/AllCoursesBanner'
import { coursesData } from '../Home/Courses/data';
import MainCourse from './MainCourse';
import Footer from '../../components/Footer/Footer';
import { Axios } from '../../components/axios';
import { toast } from 'react-toastify';
import CryptoJS from 'crypto-js';
import Skeleton from 'react-loading-skeleton';
import { getCourses } from './functions/getAll';
import { MdPlayLesson } from 'react-icons/md';
const AllCourses = () => {
  const [courses,setCourses]=useState([]);
  const [originalCourses,setOriginalCourses]=useState([]);
  const [pageLoading,setPageLoading]=useState(false)
  const localData=localStorage.getItem('elmataryapp')
  const decryptedBytes =localData&& CryptoJS.AES.decrypt(localData, '111');
  const userData =decryptedBytes&& JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));

  useEffect(()=>{
    getCourses(userData,setPageLoading,setCourses,setOriginalCourses);
    // getCourses()
  },[])
  return (
    <>
      <div className='allcourses'>
        <AllCoursesBanner/>
        <div className="courses_content py-3">
          {
            pageLoading?(
              <div style={{width:'100vw '}}>
                <Skeleton count={12} height={34}/>
              </div>
            ):(
                courses&&courses?.length>0?
                (
                  courses.map((item,index)=>{
                    return(
                      <MainCourse key={index} course={item}/>
                    )
                  })
                )
                :
                (
                  <div className="empty">
                    <MdPlayLesson className='icon'/>
                    <h5>No Courses</h5>
                  </div>
                )
              )
            }
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default AllCourses
