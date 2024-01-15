import logo from './logo.svg';
import './App.css';
import { Route, Routes, useLocation } from 'react-router';
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import Registration from './pages/Registration/Registration';
import Login from './pages/Login/Login';
import CryptoJS from 'crypto-js';
import CourseDetails from './pages/CourseDetails/CourseDetails';
import Footer from './components/Footer/Footer';
import Books from './pages/Books/Books';
import Cart from './pages/Cart/Cart';
import Units from './pages/Unit/Units';
import Profile from './pages/Profile/Profile';
import ProfileUnits from './pages/Profile/ProfileUnits/ProfileUnits';
import ProfileVideo from './pages/Profile/ProfileUnits/ProfileVideo/ProfileVideo';
import AllCourses from './pages/AllCourses/AllCourses';
import Contact from './pages/Contact/Contact';
import TechSup from './components/TechSup/TechSup';
import { useEffect } from 'react';
// import ExpandList from './components/ExpandList/ExpandList';
import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer } from 'react-bootstrap';
import 'react-loading-skeleton/dist/skeleton.css'
import { Object } from 'core-js';
import ExternalRedirectGuard from './pages/ExternalRedirectGuard/ExternalRedirectGuard';
import Registration2 from './pages/Registration2/Registration2';
import { ToastContainer } from 'react-toastify';
function App() {
  const { pathname } = useLocation();
  const localData=localStorage.getItem('elmataryapp')
  const decryptedBytes =localData&& CryptoJS.AES.decrypt(localData, '111');
  const userData =decryptedBytes&& JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
  // console.log(userData)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  // useEffect(() => {
  //   const handleNavigation = (event) => {
  //     console.log(event,"wfew")
  //     console.log("ere")
  //     const { target } = event;
  //     console.log(target)
  //     if (target.tagName === 'A' && !target.getAttribute('href').startsWith('/')) {
  //       // Prevent navigation to external URLs
  //       event.preventDefault();
  //     }
  //     console.log(document.body)
  //   };


  //   document.body.addEventListener('click', handleNavigation);

  //   return () => {
  //     document.body.removeEventListener('click', handleNavigation);
  //   };
  //   console.log("fers")
  // }, []);

  return (
    <div className="">
      <Header/>
      <Routes>
        {
          userData&&Object.keys(userData).length>0?(
            <>
              <Route path='/book' element={<Books/>}/>
              <Route path='/cart' element={<Cart/>}/>
              <Route path='/units' element={<Units/>}/>
              <Route path='/profile' element={<Profile/>}/>
              <Route path='/profileunits' element={<ProfileUnits/>}/>
              <Route path='/lessonvideo' element={<ProfileVideo/>}/>
              <Route path='/allcourses' element={<AllCourses/>}/>
              <Route path='/contact' element={<Contact/>}/>
              <Route path='/techsup' element={<TechSup/>}/>
              <Route path='*' element={<Home/>}/>
            </>
          ):(
            <>
              <Route path='/coursedetails' element={<CourseDetails/>}/>
              <Route index path='/' element={<Home/>}/>
              {/* <Route path='/allcourses' element={<AllCourses/>}/> */}
              <Route path='/signup' element={<Registration/>}/>
              <Route path='/signup2' element={<Registration2/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/book' element={<Books/>}/>
              <Route path='/techsup' element={<TechSup/>}/>
              <Route path='*' element={<Home/>}/>
            </>
          )
        }
        {/* <Route path='/expand' element={<ExpandList/>}/> */}
      </Routes>
    {/* <ExternalRedirectGuard>

    </ExternalRedirectGuard> */}
      <ToastContainer />
      {/* <Footer/> */}
    </div>
  );
}

export default App;
