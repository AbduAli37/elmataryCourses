import React, { useEffect, useState } from 'react'
import CourseDetails from '../../CourseDetails/CourseDetails'

const Lessons = ({course,handleChange}) => {
  // console.log(course)
  // console.log("erer")
  // const [videos,setVideos]=useState([]);
  return (
    <div>
      <CourseDetails course={course} handleChange={handleChange}/>
    </div>
  )
}

export default Lessons
