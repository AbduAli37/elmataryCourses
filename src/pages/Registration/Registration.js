import React, { useEffect, useState } from 'react'
import './registration.css'
import { universitiesData } from './data';
import 'react-phone-input-2/lib/style.css'
import './registration.css'
import PhoneInput from 'react-phone-input-2';
import { useNavigate } from 'react-router';
import axios, { Axios } from 'axios';
import { API_ROUTES, BASES_ROUTES, BASE_URL } from '../../components/axios/BASE_URL';
import { toast } from 'react-toastify';
import { base_url } from '../../constants';
import { Sign1 } from './functions/Sign1';
import { Spinner } from 'react-bootstrap';
const Registration = () => {
  const navigate=useNavigate()
  const [code,setCode]=useState('');
  const [userCode,setUserCode]=useState('');
  const [selectedUnis,setSelectedUnis]=useState('');
  const [grades,setGrades]=useState([]);
  const [selectedGrade,setSelectedGrade]=useState('');
  const [universities,setUniversities]=useState([]);
  const [registData,setRegistData]=useState({
    email:'',
  });
  const [regData2,setRegData2]=useState({
    pass:'',
    student_name:'',
    university_id:'',
    grade_id:'',
    phone:''
  })
  const [changeShow,setChangeShow]=useState('email');
  const [confPass,setConfPass]=useState('');
  const [signLoading,setSignLoading]=useState(false);
  const handleSign2=()=>{
    if(userCode==''){
      toast.warn('Enter Code');
      return;
    }
    if(code==userCode){
      navigate('/signup2',{replace:true,state:{registData,code}})
    }
    else {
      toast.warn('Check The Code');
      return;
    }
  }
  return (
    <div className='registration'>
      {
        changeShow=='email'?
        (
          <form
        onSubmit={(e)=>{
          e.preventDefault();
          Sign1(registData,setSignLoading,setChangeShow,setCode);
        }}
        action="">
        <h4>
          <span>Are You Have Have?</span>
          <span
            onClick={()=>{
              navigate("/login")
            }}
          >Login</span>
        </h4>
        <div>
          <label htmlFor="email">Email</label>
          <input onChange={(e)=>{
            setRegistData({...registData,email:e.target.value})
          }}  id='email' placeholder='Email' type="text" className='form-control' />
        </div>
        <div className="actions">
          <button>
            {
              signLoading?
              (
                <Spinner/>
              )
              :
              (
                'Sign'
              )
            }
          </button>
        </div>
      </form>
        )
        :
        (
          <form onSubmit={(e)=>{
            e.preventDefault();
            handleSign2()
          }} action="">
            <input className='form-control mb-2' type="text" onChange={(e)=>{
              setUserCode(e.target.value);
            }}  placeholder='Enter Code That you Delivared'/>
            <button>Sign</button>
          </form>
        )
      }
    </div>
  )
}

export default Registration

