import React, { useState } from 'react'
import './courseintrovideo.css'
import CryptoJS from 'crypto-js';
import {CiHeart, CiShare2} from 'react-icons/ci'
import {MdOutlineAddShoppingCart} from 'react-icons/md'
import axios from 'axios';
import { base_url } from '../../../../constants';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';
const CourseIntroVideo = ({course}) => {
  const localData=localStorage.getItem('elmataryapp')
  const decryptedBytes =localData&& CryptoJS.AES.decrypt(localData, '111');
  const userData =decryptedBytes&& JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));

  // console.log(course)
  const [buyLoading,setBuyLoading]=useState(false)
  const [code,setCode]=useState('');
  const handleBuy=()=>{
    if(userData==null){
      toast.warn('Please Sign First');
      return;
    }
    if(code==''){
      toast.warn('Enter Code');
      return;
    }
    setBuyLoading(true)
    const data_send={
      code,
      student_id:userData?.student_id
    }
    axios.post(base_url+"/user/courses/subscribe_by_code.php",JSON.stringify(data_send))
    .then((res)=>{
      if(res.data.status=='success'){
        toast.success(res.data.message);
      }
      else if(res.data.status=='error'){
        toast.error(res.data.message)
      }
      else {
        toast.error('Something Went Error');
      }
    })
      .catch(e=>console.log(e))
      .finally(()=>{
        setBuyLoading(false)
      })
  }
  return (
    <div className='courseintrovideo'>
      {/* <div className="courseintrovideo_image">
        <img src={require("../../../../assets/vid2.png")} alt="" />
      </div> */}
      <div>
        <h5 style={{textAlign:'center',marginBottom:'20px',fontSize:'22px',fontWeight:'600'}}>Subscribe to Get Course</h5>
      {/* <h4>Free</h4> */}
      {/* <p>included</p> */}
      {/* <div className='videos_num'>
        <img src={require("../../../../assets/vid.png")} alt="" />
        <p>15Hours of videos on demand </p>
      </div>
      <div className="watched_vido">
        <img src={require("../../../../assets/true.png")} alt="" />
        <p>Full Access for 0 Day</p>
      </div> */}
      <div className="actions">
        {/* <div className="heart">
          <CiHeart/>
        </div>
        <div className="share">
          <CiShare2/>
        </div>
        <div className='course_cart'>
          <MdOutlineAddShoppingCart/>
        </div> */}
        <div className="add_code">
          <input onChange={(e)=>{
            setCode(e.target.value)
          }} type="text" placeholder='Enter Code Here'/>
            {
              buyLoading
              ?
              (
                <Spinner/>
              )
              :
              (
                <img onClick={()=>{
                  handleBuy()
                }} src={require("../../../../assets/true.png")}/>
              )
            }
        </div>
      </div>
      </div>
    </div>
  )
}

export default CourseIntroVideo
