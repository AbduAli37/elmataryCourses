import React, { useState } from 'react'
import './coursecontent.css'
import { useLocation, useNavigate } from 'react-router'
import {IoChevronUp,IoChevronDown} from 'react-icons/io5'
import { Axios } from '../../../components/axios/index';
import { toast } from 'react-toastify';
const CourseContent = ({course,handleChangeShow}) => {
  const navigate=useNavigate();
  // console.log(course,"wed")

  const [courseData,setCourseData]=useState({});
  const [pageLoading,setPageLoading]=useState(false)
  return (
    <div className='coursecontent'>
      <div className="course_features">
        <h4>Course Content</h4>
          {
            course&&course?.map((item,index)=>{
              return(
                <div onClick={()=>{
                  handleChangeShow(item);
                }} key={index} className="content_div">
                  <h4>
                    <span>{item.unit_name}</span>
                    <span>
                      {
                        item.show?(
                          <IoChevronDown/>
                        ):(
                          <IoChevronUp/>
                        )
                      }
                    </span>
                  </h4>
                  <div className={item.show?"videos show":"videos hide"}>
                    {
                      item?.videos?.map((video,ind)=>{
                        return(
                          <div  onClick={()=>{
                            console.log(item)
                            if(video.own){
                              // const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
                              //   const match = video.youtube_id.match(regExp);
                              //   console.log(match)
                              //   return (match && match[2].length === 11)
                              //     ? match[2]
                              //     : null;
                              navigate("/lessonvideo",{state:{video,item}})
                            }
                            else{
                              toast.warn('Please subscribe first')
                              return
                            }
                          }}  key={index} className="video">
                            <div className="left">
                              <span>{ind<10?'0'+ind:ind}</span>
                              <h5>{video.video_title} ({video?.video_duration})</h5>
                            </div>
                            <img src={require("../../../assets/play.png")} alt="" />
                            {/* <p className='right'>{video.time}</p> */}
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              )
            })
          }
      </div>
    </div>
  )
}

export default CourseContent
