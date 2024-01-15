import React, { useEffect, useState } from 'react'
import './allcoursesbanner.css'
import { coursesTypesData } from '../../Home/Courses/data'
const AllCoursesBanner = () => {
  const [coursesType,setCoursesType]=useState([]);
  const [selectedType,setSelectedType]=useState('');
  const getCoursesType=()=>{
    let allData=[...coursesTypesData];
    let pushedArr=[];
    setCoursesType(allData)
  }
  useEffect(()=>{
    getCoursesType()
  },[])
  return (
    <div className='allcourses_banner_comp'>
      <div className="page_name">
        <h4>Courses</h4>
      </div>
      <div className="courses_type">
        {/* {
          coursesType.map((item,index)=>{
            return(
              <h5 key={index} className={item.selected?'active':''}>{item.name}</h5>
            )
          })
        } */}
        {/* <select onChange={(e)=>{
            setSelectedType(e.target.value)
          }} value={selectedType} className="form-select form-select-lg mb-1" aria-label=".form-select-lg example">
            {
              coursesType.map((item,index)=>{
                return(
                  <option key={index} value={item.id}>{item.name}</option>
                )
              })
            }
          </select> */}
      </div>
    </div>
  )
}

export default AllCoursesBanner
