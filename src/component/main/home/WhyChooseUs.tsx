import { WhyChooseUsProps } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const WhyChooseUs = ({
    title,
    subtitle,
    Images,
    whyChooseUsItem
}: Readonly<WhyChooseUsProps>) => {
    return (
        <>
            <section className="choose-us-section section-padding fix section-bg">
                <div className="left-shape float-bob-x">
                    <Image src="/img/shape/plane-3.png" alt="img" width={370} height={205} />
                </div>
                <div className="dot-shape">
                    <Image src="/img/shape/dot-1.png" alt="img" width={133} height={177} />
                </div>
                <div className="right-shape">
                    <Image src="/img/choose-us/shape1.png" alt="img" width={743} height={1080} />
                </div>
                <div className="container">
                    <div className="choose-us-wrapper">
                        <div className="row g-4">
                            <div className="col-xl-7 col-lg-6">
                                <div className="chose-us-image">
                                    <Image src="/img/choose-us/choose-1.jpg" alt="img" className="wow img-custom-anim-left" width={420} height={450} />
                                    <div className="chose-us-image2">
                                        <Image src="/img/choose-us/choose-2.jpg" alt="" width={225} height={320} />
                                    </div>
                                    <div className="chose-us-image3">
                                        <Image src="/img/choose-us/choose-3.jpg" alt="" width={338} height={320} />
                                        <Link href="https://www.youtube.com/watch?v=LhRXf-yEQqA"
                                            className="video-btn ripple video-popup">
                                            <i className="fas fa-play"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-5 col-lg-6">
                                <div className="choose-us-content">
                                    <div className="section-title mb-0">
                                        <span className="sub-title wow fadeInUp">
                                            {subtitle}
                                        </span>
                                        <h2 className="wow fadeInUp" data-wow-delay=".3s">
                                            {title}
                                        </h2>
                                    </div>
                                    <div className="choose-us-area">
                                        {
                                            whyChooseUsItem.map((item, index) => {
                                                return (
                                                    <React.Fragment key={item.id ?? index}>
                                                        <div className="line-image">
                                                            <Image src="/img/shape/line-shape.png" alt="" width={2} height={192} />
                                                        </div>
                                                        <div className="choose-us-items wow fadeInUp" data-wow-delay=".2s">
                                                            <h3 className="number">{index + 1}</h3>
                                                            <div className="content">
                                                                <h4>{item.title}</h4>
                                                                <p>{item.description}</p>
                                                            </div>
                                                        </div>
                                                    </React.Fragment>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default WhyChooseUs