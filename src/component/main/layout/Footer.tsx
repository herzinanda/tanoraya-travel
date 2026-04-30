import Image from 'next/image';
import Link from 'next/link';
import FooterNewsletter from './FooterNewsletter';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section fix footer-3 section-padding pb-0">
      <div className="container">
        <div className="footer-top style-new">
          <div className="logo-items">
            <Link href="/">
              <Image src="/img/logo/tanoraya-logo-new.png" alt="Tanoraya Tour & Travel" width={3000} height={380} style={{ width: '160px', height: 'auto', filter: 'brightness(0) invert(1)' }} />
            </Link>
          </div>
          <div className="contact-info">
            <div className="contact-items">
              <div className="icon"><i className="fa-solid fa-phone"></i></div>
              <div className="content">
                <h6><a href="tel:+6281166666666">+62 811 6666 666</a></h6>
              </div>
            </div>
            <div className="contact-items">
              <div className="icon"><i className="fa-regular fa-envelope"></i></div>
              <div className="content">
                <h6><a href="mailto:info@tanoraya.com">info@tanoraya.com</a></h6>
              </div>
            </div>
            <div className="contact-items">
              <div className="icon"><i className="fa-regular fa-location-dot"></i></div>
              <div className="content">
                <h6>Jl. Sisingamangaraja No. 12<br />Medan, Sumatera Utara, Indonesia</h6>
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
                  <p>Get Our Latest Deals and Updates</p>
                  <FooterNewsletter />
                  <div className="social-icon style-3 d-flex align-items-center">
                    <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                    <a href="#" aria-label="WhatsApp"><i className="fab fa-whatsapp"></i></a>
                    <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 ps-lg-5 wow fadeInUp" data-wow-delay=".4s">
              <div className="single-widget-items">
                <div className="widget-head">
                  <h4 className="style-3">Quick Links</h4>
                </div>
                <ul className="list-items style-3">
                  <li><Link href="/">Home</Link></li>
                  <li><Link href="/about">About Us</Link></li>
                  <li><Link href="/tour-packages">Tour Packages</Link></li>
                  <li><Link href="/articles">Travel Blog</Link></li>
                  <li><Link href="/contact">Contact Us</Link></li>
                </ul>
              </div>
            </div>

            <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 ps-lg-5 wow fadeInUp" data-wow-delay=".6s">
              <div className="single-widget-items">
                <div className="widget-head">
                  <h4 className="style-3">Support</h4>
                </div>
                <ul className="list-items style-3">
                  <li><Link href="/faq">FAQ</Link></li>
                  <li><Link href="/request-a-quote">Request A Quote</Link></li>
                  <li><Link href="/contact">Send A Message</Link></li>
                  <li><Link href="/legal-and-privacy">Privacy Policy</Link></li>
                  <li><Link href="/legal-and-privacy">Terms of Use</Link></li>
                </ul>
              </div>
            </div>

            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 ps-lg-5 wow fadeInUp" data-wow-delay=".8s">
              <div className="single-widget-items">
                <div className="widget-head">
                  <h4 className="style-3">Destinations</h4>
                </div>
                <ul className="list-items style-3">
                  <li><Link href="/tour-packages/tour?destination=sumatera-utara">Sumatera Utara</Link></li>
                  <li><Link href="/tour-packages/tour?destination=asean">ASEAN</Link></li>
                  <li><Link href="/tour-packages/tour?destination=malaysia">Malaysia</Link></li>
                  <li><Link href="/tour-packages/tour?destination=singapore">Singapore</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom style-2">
          <div className="footer-wrapper">
            <p className="wow fadeInUp" data-wow-delay=".3s">
              &copy;<span className="style-3">Tanoraya Travel</span> {currentYear}. All Rights Reserved
            </p>
            <ul className="bottom-list wow fadeInUp" data-wow-delay=".5s">
              <li><Link href="/legal-and-privacy">Terms of Use</Link></li>
              <li><Link href="/legal-and-privacy">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
