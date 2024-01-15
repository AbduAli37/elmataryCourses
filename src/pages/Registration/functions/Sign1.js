import axios from "axios";
import { toast } from "react-toastify"
import { base_url } from "../../../constants";

export const Sign1=(signData,setSignLoading,setChangeShow,setCode)=>{
  if(signData.email==''){
    toast.warn('أدخل بريد إلكترونى');
    return
  }
  let code = "";
    for (let i = 0; i < 4; i++) {
      code += Math.floor(Math.random() * 10);
    }
  const data_send={
    code,
    email:signData.email,
  }
  console.log(data_send)
  console.log(code)
  setSignLoading(true);
  axios.post(base_url+'/user/auth/signup_1.php',JSON.stringify(data_send))
  .then((res)=>{
    console.log(res)
    if(res.data.status=='success'){
      setChangeShow('other');
      setCode(code);
    }
    else if(res.data.status=='error'){
      toast.error(res.data.message);
    }
    else {
      toast.error('SomgThing Wen Error');
    }
  }).catch(e=>console.log(e))
  .finally(()=>{
    setSignLoading(false);
  })
}
