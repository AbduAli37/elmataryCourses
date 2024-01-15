import React from 'react'
import './profilelessons.css'
import { IoChevronDown, IoChevronUp } from 'react-icons/io5'
import { useNavigate } from 'react-router'
const ProfileLessons = ({course,handleChangeShow}) => {
  console.log(course)
  const navigate=useNavigate();
  return (
    <div className='profile_lessons_com'>
      <div className="course_features">
        <h4>Course Content</h4>
          {
            course?.map((item,index)=>{
              return(
                <div style={{cursor:'pointer'}} onClick={()=>{
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
                          <div onClick={()=>{
                            navigate("/lessonvideo",{state:{video,item}})
                          }} key={index} className="video">
                            <div className="left">

                              <h5>{video.video_title}</h5>
                            </div>
                            <p className='right'><img src={require("../../../../assets/vid.png")} alt="" /></p>
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

export default ProfileLessons
