import { Metadata } from 'next'
import { getAboutPage } from '@/data/loader'
import AboutSection from '@/component/main/about/AboutSection'
import AchievementSection from '@/component/main/about/AchievementSection'
import TeamSection from '@/component/main/about/TeamSection'
import TestimonialSection from '@/component/main/about/TestimonialSection'
import WhyChooseUs from '@/component/main/about/WhyChooseUs'
import type { AboutHeroProps, AchievementProps, OurGuidesProps, WhyChooseUsProps } from '@/types'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Tanoraya Travel — our story, team, and commitment to delivering unforgettable travel experiences across Indonesia and Southeast Asia.',
}

export default async function AboutPage() {
  const data = await getAboutPage()
  const blocks: Array<{ __component: string }> = data?.data?.blocks ?? []

  console.log('[AboutPage] raw data:', JSON.stringify(data, null, 2))

  const aboutHero = blocks.find(b => b.__component === 'blocks.about-hero') as AboutHeroProps | undefined
  const achievement = blocks.find(b => b.__component === 'blocks.achievement') as AchievementProps | undefined
  const ourGuides = blocks.find(b => b.__component === 'blocks.our-guides') as OurGuidesProps | undefined
  const whyChooseUs = blocks.find(b => b.__component === 'blocks.why-choose-us') as WhyChooseUsProps | undefined

  return (
    <>
      {aboutHero && <AboutSection {...aboutHero} />}
      {achievement && <AchievementSection {...achievement} />}
      {ourGuides && <TeamSection {...ourGuides} />}
      {whyChooseUs && <WhyChooseUs {...whyChooseUs} />}
      <TestimonialSection />
    </>
  )
}
