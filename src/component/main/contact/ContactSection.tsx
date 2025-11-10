import Image from 'next/image'
import React from 'react'

const ContactSection = () => {
  return (
    <>
        <section className="contact-section section-padding fix section-bg bg-cover"
        style={{ backgroundImage: 'url(/img/contact/bg.png)' }}>
        <div className="container">
            <div className="row g-4">
                <div className="col-lg-6">
                    <div className="contact-wrapper">
                        <div className="section-title">
                            <span className="sub-title wow fadeInUp" style={{ visibility: 'visible', animationName: 'fadeInUp' }}>
                                Contact Us
                            </span>
                            <h2 className="wow fadeInUp" data-wow-delay=".3s">
                                Let's Build An Awesome Project Together
                            </h2>
                        </div>
                        <div className="contact-thumb">
                            <Image src="/img/contact/1.jpg" className="ex" alt="img" width={563} height={370}/>
                            <h4><Image src="/img/icon/phone.svg" alt="img" width={35} height={35}/> +12 608 (3456) 789</h4>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="contact-form style-2">
                        <h3>Fill The Contact Form</h3>
                        <p>Feel free to contact with us, we don't spam your email</p>
                        <form action="contact.php" method="post">
                            <div className="row">
                                <div className="col-6">
                                    <div className="form-clt">
                                        <input type="text" name="name" id="name" placeholder="Your name" />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="form-clt">
                                        <input type="tel" name="phone" id="phone" placeholder="Phone number" />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-clt">
                                        <input type="email" name="email" id="email" placeholder="Email address" />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-clt">
                                        <textarea name="message" id="message"
                                            placeholder="Write your message"></textarea>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <button type="submit" className="theme-btn style-2">
                                        Send Message
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default ContactSection