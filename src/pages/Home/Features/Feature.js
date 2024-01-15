import React, { useEffect, useState } from 'react'
import { Slide } from 'react-awesome-reveal'
import { featuresData } from './data'
import './feature.css'
const Feature = () => {
  const [features,setFeatures]=useState([])
  const getFeatures=()=>{
    setFeatures(featuresData);
  }
  useEffect(()=>{
    getFeatures()
  },[])
  return (
    <div className='features'>
      {
        features.map((item,index)=>{
          return(
            <div className="feature">
                <img src={item.img} alt="" />
                <h4>{item.title}</h4>
                <p>{item.des}</p>
              </div>
          )
        })
      }
    </div>
  )
}

export default Feature
