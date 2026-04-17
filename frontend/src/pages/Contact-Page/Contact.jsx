import React from 'react'
import useTitle from '../../components/hooks/useTitle'
import ContactHero from './components/ContactHero';
import ContactUs from './components/ContactUs'

function Contact() {
  useTitle("Contact");
  return (
    <div className='mx-6 my-4'>
      <ContactHero />
      <ContactUs />
    </div>
  )
}

export default Contact