import axios from "axios"
import { base_url } from "../../../constants/index";

export const getCourses=(userData,setPageLoading,setCourses,setOriginalCourses)=>{
  const data_send={
    student_id:userData?.student_id
  }
  axios.post(base_url+'/user/courses/select_courses.php',JSON.stringify(data_send))
  .then((res)=>{
    console.log(res.data.message)
    if(res.data.status=='success'){
      setCourses(res.data.message);
      setOriginalCourses(res.data.message)
    }
  }).catch(e=>console.log(e))
  .finally(()=>{
    setPageLoading(false)
  })
}
