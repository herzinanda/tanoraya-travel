import AboutSection from '@/component/main/about/AboutSection'
import AchievementSection from '@/component/main/about/AchievementSection'
import TeamSection from '@/component/main/about/TeamSection'
import TestimonialSection from '@/component/main/about/TestimonialSection'
import WhyChooseUs from '@/component/main/about/WhyChooseUs'
import React from 'react'

const AboutPage = () => {
  return (      
    <>
      <AboutSection />
      <AchievementSection />
      <TeamSection />
      <WhyChooseUs />
      <TestimonialSection />
    </>
  )
}

export default AboutPage