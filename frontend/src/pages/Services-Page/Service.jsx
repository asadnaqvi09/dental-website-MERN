import React from 'react'
import useTitle from '../../components/hooks/useTitle'
import ServiceHero from './components/ServiceHero'
import OurServices from '../../components/common/OurServices';
import Faq from '../../components/common/Faq';

function Service() {
  useTitle("Services");
  return (
    <>
      <ServiceHero />
      <OurServices limit={null} />
      <Faq />
    </>
  );
}

export default Service
