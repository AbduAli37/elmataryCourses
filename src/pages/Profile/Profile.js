import React, { useEffect, useState } from 'react'
import CryptoJS from 'crypto-js';
import './profile.css'
import Modal from '../../components/modal/index'
import ProfileCourses from './ProfileCourses/ProfileCourses';
import { coursesData } from './ProfileCourses/data';
import Privacy from './Privacy/Privacy';
import HelpCenter from './HelpCenter/HelpCenter';
import { useNavigate } from 'react-router';
import Footer from '../../components/Footer/Footer';
import { Axios } from '../../components/axios';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';
import { getStdCourses } from './functions/getStudentCourses';
import { getPrivacy } from './functions/getPrivacy';
import axios from 'axios';
import { base_url } from '../../constants';
import { Spinner } from 'react-bootstrap';
import { MdPlayLesson } from 'react-icons/md';
const Profile = () => {
  const navigate=useNavigate()
  const [privacy,setPrivacy]=useState('');
  const [originalCourses,setOriginalCourses]=useState([])
  const [pageLoading,setPageLoading]=useState(false)
  const [showEditModal,setShowEditModal]=useState(false);
  const [showPrivacy,setShowPrivacy]=useState(false);
  const [showHelpCenter,setShowHelperCenter]=useState(false)
  const [coursesType,setCoursesType]=useState('ongoing');
  const [courses,setCourses]=useState([]);
  const [userLoading,setUserLoading]=useState(false)
  const [logoutLoading,setLogOutLoading]=useState(false)
  const [compCourses,setCmpCourses]=useState([]);
  const localData=localStorage.getItem('elmataryapp')
  const decryptedBytes =localData&& CryptoJS.AES.decrypt(localData, '111');
  const userData =decryptedBytes&& JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
  // console.log(userData)


  const handleLogOut=()=>{
    setLogOutLoading(true)
    const data_send={
      student_id:userData?.student_id
    }
    axios.post(base_url+'/user/auth/student_logout.php',JSON.stringify(data_send))
    .then((res)=>{
      if(res.data.status=='success'){
        toast.success(res.data.message);
        localStorage.removeItem('elmataryapp');
        navigate('/signup',{replace:true});
      }
      else if(res.data.status=='error'){
        toast.error(res.data.message)
      }
      else {
        toast.error('SomeThing Went Error');
      }
    })
      .catch(e=>console.log(e))
      .finally(()=>{
        setLogOutLoading(false)
      })
    // window.location.reload()
  }
  const getUserData=()=>{
    Axios({
      method: 'POST',
      // url: BASE_URL + BASES_ROUTES?.admin + API_ROUTES?.pdf?.BASE_ROUTE + API_ROUTES?.pdf?.ROUTES?.select,
    })
      .then((res) => {
          if (res.status == 'success') {
              setCourses(res.message);
          } else {
              toast.error(res.message);
          }
      })
      .finally(() => {
        setUserLoading(false);
      });
  }
  useEffect(()=>{
    getPrivacy(setPrivacy);
    getStdCourses(userData,setPageLoading,setCourses,setOriginalCourses,setCmpCourses)
    // getCourses()

  },[])
  return (
    <div className='profile_page'>
      <div className="profile_info">
        {
          userLoading?(
            <div style={{width:'100%'}}>
              <Skeleton count={7} height={34} />
            </div>
          ):(
            <>
              <div className="profile_img">
                <img src={require("../../assets/stu.png")} alt="" />
              </div>
              <h6>#{userData.student_id}</h6>
              <h4>{userData.student_name}</h4>
              <p>{userData.university_name}</p>
              <h5>{userData.email}</h5>
            </>
          )
        }
        <div className="pages">
          <div
            onClick={()=>{
              setShowEditModal(true)
            }}
          >Show</div>
          <div
            onClick={()=>{
              setShowPrivacy(true)
            }}
          >Privacy Policy</div>
          <div
            onClick={()=>{
              // setShowHelperCenter(true)
              navigate("/techsup")
            }}
          >Help Center</div>
          <div
            onClick={()=>{
              handleLogOut()
            }}
          >
            {
              logoutLoading?
              (
                <Spinner/>
              )
              :
              (
                'LogOut'
              )
            }
          </div>
        </div>
      </div>
      <div className="profile_content mb-4">
        <div className="courses_types">
          <div onClick={()=>{
            setCoursesType("ongoing")
          }} className={coursesType=='ongoing'?'course_type active':'course_type'}>
            onGoing
          </div>
          <div onClick={()=>{
            setCoursesType("completed")
          }} className={coursesType=='completed'?'course_type active':'course_type'}>
            Completed
          </div>
        </div>
        {
          courses&&courses.length>0||compCourses&&compCourses.length>0?
          (
            coursesType=='ongoing'
            ?
            (
              <>
                {
                  courses&&courses?.length>0?
                  (
                    <ProfileCourses courses={courses}/>
                  )
                  :
                  (
                    <div className="empty">
                      <MdPlayLesson className='icon'/>
                      <h5>No Courses</h5>
                    </div>
                  )
                }
              </>
            )
            :
            (
              <>
                {
                  compCourses&&compCourses?.length>0?
                  (<ProfileCourses courses={compCourses}/>)
                  :
                  (
                    <div className="empty">
                      <MdPlayLesson className='icon'/>
                      <h5>No Courses</h5>
                    </div>
                  )
                }
              </>
            )
          )
          :
          (
            <div className="empty">
              <MdPlayLesson className='icon'/>
              <h5>No Courses</h5>
            </div>
          )
        }

      </div>
      <Modal
        open={showEditModal}
        toggle={setShowEditModal}
        headerTitle={"Show My Data"}
        children={
          <>
            <label htmlFor="">Name:</label>
            <div className='bg-light p-2'>
              {userData.student_name}
            </div>
            <label htmlFor="">Email:</label>
            <div className='bg-light p-2'>
            {userData.student_email}
            </div>
            <label htmlFor="">University:</label>
            <div className='bg-light p-2'>
            {userData.university_name}
            </div>
            <label htmlFor="">garder:</label>
            <div className='bg-light p-2'>
            {userData.grade_name}
            </div>
            <label htmlFor="">Phone:</label>
            <div className='bg-light p-2'>
            {userData.phone}
            </div>
          </>
        }
      />
      <Modal
        open={showPrivacy}
        toggle={setShowPrivacy}
        headerTitle={"Our Privacy"}
        children={
          <>
            <Privacy privacy={privacy}/>
          </>
        }
      />
      <Modal
        open={showHelpCenter}
        toggle={setShowHelperCenter}
        headerTitle={"Help Center"
      }
        children={
          <>
            <HelpCenter/>
          </>
        }
      />
      <Footer/>
    </div>
  )
}

export default Profile
