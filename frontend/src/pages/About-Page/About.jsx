import React from 'react'
import useTitle from '../../components/hooks/useTitle'
import AboutHero from './Components/AboutHero'
import AboutSection from '../../components/common/About'
import OurApproach from './Components/OurApproach'
import WhyChooseUs from '../../components/common/WhyChooseUs'
import Faq from '../../components/common/Faq'

function About() {
  useTitle("About Us");
  return (
    <>
      <AboutHero />
      <AboutSection />
      <OurApproach />
      <WhyChooseUs />
      <Faq />
    </>
  );
}

export default About
