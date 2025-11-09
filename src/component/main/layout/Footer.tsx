import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="footer-section fix footer-3 section-padding pb-0">
      <div className="container">
        <div className="footer-top style-new">
          <div className="logo-items">
            <Link href="/">
              <Image src="/img/logo/white-logo.svg" alt="img" width={140} height={35} />
            </Link>
          </div>
          <div className="contact-info">
            <div className="contact-items">
              <div className="icon">
                <i className="fa-solid fa-phone"></i>
              </div>
              <div className="content">
                <h6><a href="tel:+256214203216">+256 214 203 216</a></h6>
              </div>
            </div>
            <div className="contact-items">
              <div className="icon">
                <i className="fa-regular fa-envelope"></i>
              </div>
              <div className="content">
                <h6><a href="mailto:info-help@travo.com">info-help@travo.com</a></h6>
              </div>
            </div>
            <div className="contact-items">
              <div className="icon">
                <i className="fa-regular fa-location-dot"></i>
              </div>
              <div className="content">
                <h6>Niagara Falls, Banff and Jasper <br /> National Park</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-widget-wrapper-new style-2 style-new-area">
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 wow fadeInUp" data-wow-delay=".2s">
              <div className="single-widget-items">
                <div className="footer-content style-3">
                  <h3>Subscribe Newsletter</h3>
                  <p>Get Our Latest Deals and Update</p>
                  <div className="footer-input style-3">
                    <input type="email" id="email2" placeholder="Your email address" />
                    <button className="newsletter-btn theme-btn" type="submit">
                      Subscribe <i className="fa-sharp fa-regular fa-arrow-right"></i>
                    </button>
                  </div>
                  <div className="social-icon style-3 d-flex align-items-center">
                    <a href="#"><i className="fab fa-facebook-f"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                    <a href="#"><i className="fab fa-linkedin-in"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 ps-lg-5 wow fadeInUp" data-wow-delay=".4s">
              <div className="single-widget-items">
                <div className="widget-head">
                  <h4 className="style-3">Company</h4>
                </div>
                <ul className="list-items style-3">
                  <li><Link href="/tour-details">Wanderlust Adventures</Link></li>
                  <li><Link href="/tour-details">Globe Trotters Travel</Link></li>
                  <li><Link href="/tour-details">Odyssey Travel Services</Link></li>
                  <li><Link href="/tour-details">Jet Set Journeys</Link></li>
                  <li><Link href="/tour-details">Dream Destinations Travel</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 ps-lg-5 wow fadeInUp" data-wow-delay=".6s">
              <div className="single-widget-items">
                <div className="widget-head">
                  <h4 className="style-3">Quick Links</h4>
                </div>
                <ul className="list-items style-3">
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/about">About Us</Link></li>
                  <li><Link href="/news">Blog</Link></li>
                  <li><Link href="/tour">Tour</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 ps-lg-5 wow fadeInUp" data-wow-delay=".8s">
              <div className="single-widget-items">
                <div className="widget-head">
                  <h4 className="style-3">Gallery Post</h4>
                </div>
                <div className="footer-gallery">
                  {/* ... (omitted, paste your gallery HTML here) ... */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom style-2">
          <div className="footer-wrapper">
            <p className="wow fadeInUp" data-wow-delay=".3s">
              ©<span className="style-3">Travo</span> 2025. All Rights Reserved
            </p>
            <ul className="bottom-list wow fadeInUp" data-wow-delay=".5s">
              <li>Terms of use</li>
              <li>Privacy Environmental Policy</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;