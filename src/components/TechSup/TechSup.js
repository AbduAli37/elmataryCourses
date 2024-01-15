import React, { useEffect, useState } from 'react'
import './techsup.css'
import { FaArrowRight, FaFacebook, FaPhoneAlt, FaWhatsapp } from 'react-icons/fa'
// import { getSups } from '../../pages/Profile/HelpCenter/functions/getSup'
import Skeleton from 'react-loading-skeleton'
import { getSupsData } from './functions/getSupsData'
const TechSup = () => {
  const [pageLoading,setPageLoading]=useState(false);
  const [sups,setSups]=useState([]);
  useEffect(()=>{
    getSupsData(setPageLoading,setSups)
  },[])
  const handleOpen=()=>{
    window.open('https://wa.me/0 112 367 0398');
  }
  return (
    <div className='tech_sup_page'>
      {/* <h5>Technical Support</h5> */}
      <div className="tecs_sup_socials">
        {
          pageLoading?
          (
            <Skeleton count={7}/>
          )
          :
          (
            <>
              <div className='help_app'>
        <a target='_blank' href={sups[1]&&sups[1].value} className="right">
          <FaFacebook/>
          <h4>FaceBook</h4>
        </a>
        <FaArrowRight/>
      </div>
      <div className='help_app'>
        <a
        target='_blank'
        href={sups[2]&&sups[2].value}
          onClick={()=>{
            // handleOpen()
          }}
          className="right">
          <FaWhatsapp/>
          <h4>WhatsApp</h4>
        </a>
        <FaArrowRight/>
      </div>
        <a className='help_app' target='_blank' href={sups[3]&&sups[0].value}>
          <div className="right">
            <FaPhoneAlt size="19" className="nav-linker"/>
            Call Us
          </div>
        </a>
            </>
          )
        }
      </div>
    </div>
  )
}

export default TechSup
