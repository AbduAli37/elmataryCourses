import axios from "axios"
import { base_url } from "../../../constants"

export const getSupsData=(setPageLoading,setSups)=>{
  console.log("reer")
  setPageLoading(true)
  axios.get('https://camp-coding.site/Matary_site/user/setting/select_call_center.php')
  .then((res)=>{
    console.log(res.data)
    if(res.data.status=='success'){
      setSups(res.data.message);
    }
  })
  .catch(e=>console.log(e))
  .finally(()=>{
    setPageLoading(false)
  })
}
