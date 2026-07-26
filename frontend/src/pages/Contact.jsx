import React from 'react'
import Title from '../component/Title'
import contact from "../assets/contact.jpg"
import NewLetterBox from '../component/NewLetterBox'
import Footer from '../component/Footer'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"

function Contact() {
  return (
    <div className='w-full min-h-screen flex items-center justify-center flex-col bg-gradient-to-l from-[#141414] to-[#0c2025] gap-[50px] pt-[80px] overflow-x-hidden'>

      <Title text1={'CONTACT'} text2={'US'} />

      <div className='w-full max-w-[1200px] px-5 flex items-center justify-center gap-[50px] flex-col lg:flex-row'>

        {/* Image */}
        <div className='lg:w-1/2 w-full flex items-center justify-center'>
          <img
            src={contact}
            alt="Our store front"
            className='lg:w-[85%] w-[80%] shadow-lg shadow-black/50 rounded-lg object-cover'
          />
        </div>

        {/* Info */}
        <div className='lg:w-1/2 w-[90%] flex items-start justify-center gap-[18px] flex-col'>

          <div>
            <p className='text-white font-bold lg:text-[20px] text-[16px] mb-3'>Our Store</p>
            <div className='flex items-start gap-3 text-white/80 md:text-[16px] text-[13px] mb-2'>
              <FaMapMarkerAlt className='mt-1 text-[#46d1f7] shrink-0' />
              <div>
                <p>15 Random Station</p>
                <p>Random City, State, India</p>
              </div>
            </div>
            <div className='flex items-center gap-3 text-white/80 md:text-[16px] text-[13px] mb-1'>
              <FaPhoneAlt className='text-[#46d1f7] shrink-0' />
              <a href="tel:+919876543210" className='hover:text-[#46d1f7] transition-colors'>
                +91-9876543210
              </a>
            </div>
            <div className='flex items-center gap-3 text-white/80 md:text-[16px] text-[13px]'>
              <FaEnvelope className='text-[#46d1f7] shrink-0' />
              <a href="mailto:admin@onecart.com" className='hover:text-[#46d1f7] transition-colors'>
                admin@onecart.com
              </a>
            </div>
          </div>

          <div className='w-full h-[1px] bg-white/10 my-2'></div>

          <div>
            <p className='text-[16px] text-white lg:text-[20px] font-bold mb-2'>Careers at OneCart</p>
            <p className='text-white/70 md:text-[16px] text-[13px]'>
              Learn more about our teams and job openings
            </p>
          </div>

          <button className='px-[30px] py-[14px] text-white bg-transparent border-2 border-white/40 rounded-md font-medium hover:bg-[#46d1f7] hover:text-black hover:border-[#46d1f7] active:scale-95 transition-all duration-200'>
            Explore Jobs
          </button>
        </div>
      </div>

      <NewLetterBox />
      <Footer />
    </div>
  )
}

export default Contact
