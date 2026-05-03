import { Metadata } from 'next'
import { getAboutPage } from '@/data/loader'
import AboutSection from '@/component/main/about/AboutSection'
import AchievementSection from '@/component/main/about/AchievementSection'
import TestimonialSection from '@/component/main/home/TestimonialSection'
import WhyChooseUs from '@/component/main/home/WhyChooseUs'
import type { AboutHeroProps, AchievementProps, HomeTestimonialsProps, WhyChooseUsProps } from '@/types'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Tanoraya Travel — our story, team, and commitment to delivering unforgettable travel experiences across Indonesia and Southeast Asia.',
}

export default async function AboutPage() {
  const data = await getAboutPage()
  const blocks: Array<{ __component: string }> = data?.data?.blocks ?? []

  const aboutHero      = blocks.find(b => b.__component === 'blocks.about-hero')         as AboutHeroProps        | undefined
  const achievement    = blocks.find(b => b.__component === 'blocks.achievement')         as AchievementProps      | undefined
  const whyChooseUs    = blocks.find(b => b.__component === 'blocks.why-choose-us')       as WhyChooseUsProps      | undefined
  const testimonials   = blocks.find(b => b.__component === 'blocks.home-testimonials')   as HomeTestimonialsProps | undefined

  return (
    <>
      <AboutSection {...(aboutHero ?? {})} />
      <AchievementSection {...(achievement ?? {})} />
      {/* {ourGuides && <TeamSection {...ourGuides} />} */}
      <WhyChooseUs {...(whyChooseUs ?? {})} />
      <TestimonialSection {...(testimonials ?? {})} />
    </>
  )
}
