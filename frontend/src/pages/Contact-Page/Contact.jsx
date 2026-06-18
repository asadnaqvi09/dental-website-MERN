import React from 'react'
import useTitle from '../../components/hooks/useTitle'
import ContactHero from './components/ContactHero';
import ContactUs from './components/ContactUs'

function Contact() {
  useTitle("Contact");
  return (
    <>
      <ContactHero />
      <ContactUs />
    </>
  );
}

export default Contact