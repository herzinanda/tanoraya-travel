import Image from 'next/image'
import React from 'react'

const ContactInfo = () => {
  return (
    <>
        <section className="contact-info-section section-padding fix">
        <div className="container">
            <div className="row g-4">
                <div className="col-lg-4 col-md-6">
                    <div className="info-items">
                        <div className="icon">
                            <Image src="/img/icon/19.svg" alt="" width={28} height={30}/>
                        </div>
                        <h3>Office Address</h3>
                        <p>Cedar Street, Chicago,60601, USA</p>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="info-items">
                        <div className="icon">
                            <Image src="/img/icon/20.svg" alt=""  width={30} height={30}/>
                        </div>
                        <h3>Call Us For Support:</h3>
                        <p>+4800 45 678 900</p>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6">
                    <div className="info-items">
                        <div className="icon">
                            <Image src="/img/icon/21.svg" alt="" width={26} height={26}/>
                        </div>
                        <h3>Email Us Anytime:</h3>
                        <p>contact@example.com</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default ContactInfo