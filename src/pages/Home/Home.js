import React, { useEffect } from 'react'
import Banner from './Banner/Banner'
import './home.css'
import Feature from './Features/Feature'
import Banner2 from './Banner/Banner2'
import Courses from './Courses/Courses'
import Footer from '../../components/Footer/Footer'
const Home = () => {
  useEffect(()=>{
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },[])
  return (
    <div className='home'>
      <Banner2/>
      {/* <Banner/> */}
      <Feature/>
      <Courses/>
      <Footer/>
    </div>
  )
}

export default Home
