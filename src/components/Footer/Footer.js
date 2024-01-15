/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import "./footer.css";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer class="footer-section">
      <div class="container">
        <div className="footer_top">
          <a target='_blank' href="https://play.google.com/store/apps/details?id=com.matary">
            <img src={require("../../assets/googleplay.png")} alt="" />
          </a>
          <a target='_blank' href="https://apps.apple.com/us/app/dr-matary/id6463245575">
            <img src={require("../../assets/applestore.png")} alt="" />
          </a>
          <a target='_blank' href="https://appgallery.cloud.huawei.com/ag/n/app/C109563877?locale=en_US&source=appshare&subsource=C109563877&shareTo=com.android.bluetooth&shareFrom=appmarket&shareIds=13a335e27e7543b7a188eedeb4214e0e_com.android.bluetooth&callType=SHARE">
            <img src={require("../../assets/hawawy.png")} alt="" />
          </a>
        </div>
        <div class="footer-content pt-5 pb-5">
          <div class="row">
            <div class="col-xl-4 col-lg-4 mb-50">
              <div class="footer-widget">
                {/* <div class="footer-logo">
                  <a href="#">
                    <img
                      src={
                        "https://res.cloudinary.com/duovxefh6/image/upload/v1698845852/logo-sm.2f4a7f57177ec499b9af0e73359fe76f_cgmfhv.svg"
                      }
                      class="img-fluid"
                      alt="logo"
                    />
                  </a>
                </div> */}
                <div class="footer-text">
                  <p>
                    Navigate your medical career with confidence – Seize the
                    reins of your educational path and elevate your expertise
                    through our specialized medical courses application.
                  </p>
                </div>
              </div>
            </div>
            <div class="col-xl-4 col-lg-4 col-md-6 mb-30">
              <div class="footer-widget">
                <div class="footer-widget-heading">
                  <h3>Useful Links</h3>
                </div>
                <ul>
                  <li>
                    <Link to={"/"}>Home</Link>
                  </li>
                  <li>
                    <Link to="/allcourses">Courses</Link>
                  </li>
                  {/* <li>
                    <a href="#">services</a>
                  </li>
                  <li>
                    <a href="#">portfolio</a>
                  </li> */}
                  {/* <li>
                    <Link to="/contact">Contact</Link>
                  </li> */}
                </ul>
              </div>
            </div>
            <div class="col-xl-4 col-lg-4 col-md-6 mb-50">
              <div class="footer-widget">
                <div class="footer-widget-heading">
                  <h3>Subscribe</h3>
                </div>
                <div class="footer-text mb-25">
                  <p>
                    Don’t miss to subscribe to our new feeds, kindly fill the
                    form below.
                  </p>
                </div>
                <div class="subscribe-form">
                  <form action="#">
                    {/* <input type="text" placeholder="Email Address" /> */}
                    <button>
                      <img src={require("../../assets/paper.jpeg")} alt="" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="copyright-area">
        <div class="container">
          <div class="row">
            <div class="col-xl-6 col-lg-6 text-center text-lg-left">
              <div class="copyright-text">
                <p>
                  Copyright &copy; 2023, All Right Reserved{" "}
                  <a href="https://elmataryweb.com">Dr.Elmatary</a>
                </p>
              </div>
            </div>
            <div class="col-xl-6 col-lg-6 d-none d-lg-block text-right">
              <div class="footer-menu">
                <ul>
                  <li>
                    <a href="#">Home</a>
                  </li>
                  <li>
                    <a href="#">Terms</a>
                  </li>
                  <li>
                    <a href="#">Privacy</a>
                  </li>
                  <li>
                    <a href="#">Policy</a>
                  </li>
                  <li>
                    <a href="#">Contact</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
