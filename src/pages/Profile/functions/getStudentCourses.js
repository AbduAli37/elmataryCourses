import axios from "axios";
import { base_url } from "../../../constants";

export const getStdCourses=(userData,setPageLoading,setCourses,setOriginalCourses,setCmpCourses)=>{
  setPageLoading(true);
  const data_send={
    "student_id" : userData?.student_id
  }
  axios.post('https://camp-coding.site/Matary_site/user/courses/select_my_courses.php',JSON.stringify(data_send))
    .then((res)=>{
      if(res.data.status=='success'){
        // console.log(res)
        // console.log(res.data.message)
        let allData=[...res.data.message];
        console.log(allData)
        let pushComp=[];
        let pushNonComp=[];
        for(let i=0;i<allData.length;i++){
          console.log(allData[i].finished_rate)
          if(allData[i].finished_rate>=100){
            // setCmpCourses(alld)
            console.log('yes')
            pushComp.push(allData[i]);
          }
          else {
            console.log('no')
            pushNonComp.push(allData[i]);
          }
        }
        setOriginalCourses(pushNonComp);
        setCourses(pushNonComp);
        setCmpCourses(pushComp);
      }
    })
    .catch(e=>console.log(e))
    .finally(()=>{
      setPageLoading(false)
    })
}
