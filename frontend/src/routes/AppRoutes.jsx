import React from 'react'
import {Route,Routes, useLocation} from 'react-router-dom'
import PageWrapper from '../components/common/PageWrapper'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Home from '../pages/Home-Page/Home'
import About from '../pages/About-Page/About'
import Contact from '../pages/Contact-Page/Contact'
import Service from '../pages/Services-Page/Service'
import Appointment from '../pages/Appointment-Page/Appointment'
import { AnimatePresence } from 'framer-motion'

function AppRoutes() {
  const location = useLocation();  
  return (
    <>
        <Navbar />
        <AnimatePresence mode='wait'>
            <Routes location={location} key={location.pathname}>
                <Route path='/' element={<PageWrapper><Home /></PageWrapper>} />
                <Route path='/about' element={<PageWrapper><About /></PageWrapper>} />
                <Route path='/contact' element={<PageWrapper><Contact /></PageWrapper>} />
                <Route path='/service' element={<PageWrapper><Service /></PageWrapper>} />
                <Route path='/book-appointment' element={<PageWrapper><Appointment /></PageWrapper>} />
            </Routes>
        </AnimatePresence>
        <Footer />
    </>
  )
}

export default AppRoutes