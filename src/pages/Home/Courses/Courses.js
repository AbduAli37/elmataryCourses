import React, { useEffect, useState } from 'react'
import { coursesData, coursesTypesData } from './data';
import './courses.css'
import {FaRegHeart,FaHeart} from 'react-icons/fa6'
import { useNavigate } from 'react-router';
// import { Axios } from 'axios';
import { Axios } from '../../../components/axios/index';
// import { API_ROUTES, BASES_ROUTES, BASE_URL } from '../../../components/axios/BASE_URL';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton'
import LoadingComponent from '../../../components/LoadingComponent/LoadingComponent';
import CryptoJS from 'crypto-js';
import { getCourses } from './functions/getAll';
const Courses = () => {
  const localData=localStorage.getItem('elmataryapp')
  const decryptedBytes =localData&& CryptoJS.AES.decrypt(localData, '111');
  const userData =decryptedBytes&& JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
  // console.log(userData)

  const navigate=useNavigate()
  const [courses,setCourses]=useState([]);
  const [originalCourses,setOriginalCourses]=useState([]);
  const [types,setTypes]=useState([]);
  const [selectedType,setSelectedType]=useState('');
  const [pageLoading,setPageLoading]=useState(false)
  // const getCourses=()=>{
  //   setCourses(coursesData)
  //   setOriginalCourses(coursesData)
  //   Axios({
  //     method: 'POST',
  //     // url: BASE_URL + BASES_ROUTES?.admin + API_ROUTES?.pdf?.BASE_ROUTE + API_ROUTES?.pdf?.ROUTES?.select,
  //   })
  //     .then((res) => {
  //         if (res.status == 'success') {
  //             setCourses(res.message);
  //         } else {
  //             toast.error(res.message);
  //         }
  //     })
  //     .finally(() => {
  //         setPageLoading(false);
  //     });
  // }
  const getCoursesType=()=>{
    setTypes(coursesTypesData)
    setSelectedType(coursesTypesData[0].id);
  }
  const filterCourses=()=>{
    let allData=[...originalCourses];
    if(selectedType==0){
      setCourses(originalCourses);
    }
    else setCourses(allData.filter(item=>item.type_id==selectedType))
  }
  useEffect(()=>{
    filterCourses()
  },[selectedType])
  useEffect(()=>{
    userData&&
    getCourses(userData,setPageLoading,setCourses,setOriginalCourses);
    // getCourses()
    getCoursesType()
  },[])
  return (
  <div className="courses_component">
    {
      userData&&userData!=null?
      (  <>
        <h4>Courses</h4>

      <div className='courses'>
        {
          pageLoading?(
            <div style={{ width:'100%' }}>
              <Skeleton height={44} count={12} />
            </div>
          ):(
            courses.map((item,index)=>{
              return(
                <div key={index} className="course">
                  <div className="course_image">
                    <img src={item.course_photo_url} alt="" />
                    {/* {
                      item.fav=='0'?(
                        <FaRegHeart/>
                      ):(
                        <FaHeart className='loved'/>
                      )
                    } */}
                  </div>
                  <div onClick={()=>{
                    // navigate("/coursedetails",{state:{course:item}})
                    navigate("/units",{state:{course:item}})
                  }} className="course_descripiton">
                    <h3>{item.course_name}</h3>
                    <h5>{item.course_content}</h5>
                    {/* <h5>{item.doctore}</h5> */}
                    {/* <p>
                      <img src={require("../../../assets/timer.png")} alt="" />
                      <span>{item.hour}</span>
                      <span>{item.min}</span>
                    </p> */}
                  </div>
                </div>
              )
            })
          )
        }
      </div>
      </>
      )
      :
      (
        <div style={{textAlign:'center'}}>
          <img style={{width:'500px',maxWidth:'90%'}} src={require("../../../assets/sig.jpg")} alt="" />
          <h4 className='text-center'>Please Sign First</h4>
          <p>To See All Courses</p>
          <button onClick={()=>{
            navigate('/signup')
          }} className='btn btn-primary mt-2'>Sign Up</button>
        </div>
      )
    }
  </div>
  )
}

export default Courses
