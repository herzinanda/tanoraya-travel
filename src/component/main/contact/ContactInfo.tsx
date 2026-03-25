import Image from 'next/image'
import React from 'react'

const ContactInfo = () => {
  return (
    <section className="contact-info-section section-padding fix">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <div className="info-items">
              <div className="icon">
                <Image src="/img/icon/19.svg" alt="" width={28} height={30} />
              </div>
              <h3>Office Address</h3>
              <p>Jl. Sisingamangaraja No. 12, Medan Kota<br />Sumatera Utara, Indonesia 20212</p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="info-items">
              <div className="icon">
                <Image src="/img/icon/20.svg" alt="" width={30} height={30} />
              </div>
              <h3>Call Us For Support:</h3>
              <p><a href="tel:+6281166666666">+62 811 6666 666</a></p>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="info-items">
              <div className="icon">
                <Image src="/img/icon/21.svg" alt="" width={26} height={26} />
              </div>
              <h3>Email Us Anytime:</h3>
              <p><a href="mailto:info@tanoraya.com">info@tanoraya.com</a></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactInfo
