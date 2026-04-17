import React from 'react'
import AppointmentHero from './Components/AppointmentHero'
import AppointmentComponent from '../../components/common/AppointmentComponent'

function Appointment() {
  return (
    <div className='mx-6 my-4'>
      <AppointmentHero />
      <AppointmentComponent />
    </div>
  )
}

export default Appointment
