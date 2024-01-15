import React, { useEffect, useState } from 'react'
import { coursesData } from './data';
import './profilecourses.css'
import { useNavigate } from 'react-router';
const ProfileCourses = ({courses}) => {
  const navigate=useNavigate()
  return (
    <div className='profile_courses_page'>
      {
        courses.map((item,index)=>{
          return (
            <div onClick={()=>{
              navigate("/profileunits",{state:{course:item}})
            }} className="course">
              <div className="left">
                <img src={item.course_photo_url} alt="" />
              </div>
              <div className="right">
                {/* <h5>{item.category}</h5> */}
                <h2>{item.course_name}</h2>
                <h3>
                  {/* <span>{item.unit_num} unit,</span> */}
                  <span>{item.videos_count}lessons</span>
                </h3>
                <div className="compelete_ratio">
                  <div>
                    <h4
                      style={{backgroundColor:'#ef466a',width:`${item.finished_rate}%`,height:'100%',borderRadius:'10px'}}
                    ></h4>
                  </div>
                  <span>{item.finished_rate}%</span>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default ProfileCourses
