import React, { useState } from 'react'
import {FaEye,FaEyeSlash} from 'react-icons/fa6'
import './login.css'
import { useNavigate } from 'react-router'
import axios, { Axios } from 'axios'
import { API_ROUTES, BASES_ROUTES, BASE_URL } from '../../components/axios/BASE_URL'
import { toast } from 'react-toastify'
import { base_url } from '../../constants'
import CryptoJS from 'crypto-js';
import bcrypt from 'bcryptjs'
import { Spinner } from 'react-bootstrap'
const Login = () => {
  const navigate=useNavigate()
  const [loginLoading,setLoginLoading]=useState(false)
  const [showPass,setShowPass]=useState(false)
  const [loginData,setLoginData]=useState({
    email:'',
    pass:'',
  })
  const handleSub=()=>{
    if(loginData.email==''){
      toast.warn('Enter Login Data')
      return
    }
    if(loginData.pass==''){
      toast.warn('Enter Password');
      return
    }
    setLoginLoading(true)
    const data_send={
      ...loginData
    }
    axios.post(base_url+'/user/auth/new_login.php',JSON.stringify(data_send))
    .then((res)=>{
      console.log(res.data)
      if(res.data.status=='success'){
        let pushedData=bcrypt.hashSync(JSON.stringify({first_name:'abdu',last_name:'ali',email:'aa032@gmail.com'}),"$2a$10$CwTycUXWue0Thq9StjUM0u");
          const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(res.data.message), '111').toString();
          localStorage.setItem('elmataryapp', encryptedData);
          navigate('/',{replace:true});
          // window.location.reload();
        // toast.success(res.data.mes)
      }
      else if(res.data.status='error'){
        toast.error(res.data.message);
      }
      else {
        toast.error('Something Went Error')
      }
    }).finally(()=>{
    setLoginLoading(false)
    }).catch(e=>console.log(e))
  }

  return (
    <div className='login_page'>
      <form onSubmit={(e)=>{
        e.preventDefault();
        handleSub()
      }} action="">
        <h4>
          <span>Create New Account ?</span>
          <span
            onClick={()=>{
              navigate("/signup")
            }}
          >SignUp</span>
        </h4>
        <div>
          <label htmlFor="email">Email</label>
          <input onChange={(e)=>{
            setLoginData({...loginData,email:e.target.value})
          }} className='form-control' type="email" id='email' />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <div className="pass_div">
            <input onChange={(e)=>{
            setLoginData({...loginData,pass:e.target.value})
          }}   className='form-control' type={showPass?"text":"password"} id='password' />
            {
              showPass?(
                <FaEye
                  onClick={()=>{
                    setShowPass(!showPass)
                  }}
                />
              ):(
                <FaEyeSlash
                  onClick={()=>{
                    setShowPass(!showPass)
                  }}
                />
              )
            }
          </div>
        </div>
        <button>
          {
            loginLoading?
            (
              <Spinner/>
            )
            :
            (
              'Login'
            )
          }
        </button>
      </form>
    </div>
  )
}

export default Login
