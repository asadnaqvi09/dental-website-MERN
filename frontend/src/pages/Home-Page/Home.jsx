import React from 'react'
import useTitle from '../../components/hooks/useTitle'
import HeroSection from './components/HeroSection'
import About from '../../components/common/About'
import OurServices from '../../components/common/OurServices'
import WhyChooseUs from '../../components/common/WhyChooseUs'
import BeforeAfter from './components/BeforeAfter'
import Testimonials from './components/Testimonials'
import OurTeam from '../../components/common/OurTeam'
import AppointmentComponent from '../../components/common/AppointmentComponent'

function Home() {
  useTitle("");
  return (
    <>
      <HeroSection />
      <About />
      <OurServices limit={3} />
      <WhyChooseUs />
      <OurTeam />
      <BeforeAfter />
      <Testimonials />
      <AppointmentComponent />
    </>
  );
}

export default Home
