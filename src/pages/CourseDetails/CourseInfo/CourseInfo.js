import React from 'react'
import './courseinfo.css'
import CourseIntroVideo from './CourseIntroVideo/CourseIntroVideo'
import CourseFeatures from './CourseFeatures/CourseFeatures'
import MetaTags from './MetaTags/MetaTags'
const CourseInfo = ({course}) => {
  // console.log(course)
  // console.log(course)
  return (
    <div className='courseinfo'>
      <CourseIntroVideo course={course}/>
      {/* <CourseFeatures course={course}/> */}
      {/* <MetaTags course={course}/> */}
    </div>
  )
}

export default CourseInfo
