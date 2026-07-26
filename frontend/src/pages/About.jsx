import React from 'react'
import Title from '../component/Title'
import about from '../assets/about.jpg'
import NewLetterBox from '../component/NewLetterBox'
import Footer from '../component/Footer'
import { MdVerified, MdLocalShipping, MdSupportAgent } from "react-icons/md"

const WHY_CHOOSE_US = [
  {
    icon: <MdVerified size={28} />,
    title: "Quality Assurance",
    desc: "We guarantee quality through strict checks, reliable sourcing, and a commitment to customer satisfaction always."
  },
  {
    icon: <MdLocalShipping size={28} />,
    title: "Convenience",
    desc: "Shop easily with fast delivery, simple navigation, secure checkout, and everything you need in one place."
  },
  {
    icon: <MdSupportAgent size={28} />,
    title: "Exceptional Customer Service",
    desc: "Our dedicated support team ensures quick responses, helpful solutions, and a smooth shopping experience every time."
  }
]

function About() {
  return (
    <div className='w-full min-h-screen flex items-center justify-center flex-col bg-gradient-to-l from-[#141414] to-[#0c2025] gap-[60px] pt-[80px] pb-[40px] overflow-x-hidden'>

      <Title text1={'ABOUT'} text2={'US'} />

      {/* Intro section */}
      <div className='w-full max-w-[1200px] px-5 flex items-center justify-center gap-[50px] flex-col lg:flex-row'>
        <div className='lg:w-1/2 w-full flex items-center justify-center'>
          <img
            src={about}
            alt="About OneCart"
            className='lg:w-[80%] w-[85%] shadow-lg shadow-black/50 rounded-lg object-cover'
          />
        </div>

        <div className='lg:w-1/2 w-[90%] flex items-start justify-center gap-[20px] flex-col mt-[20px] lg:mt-0'>
          <p className='w-full text-white/85 md:text-[16px] text-[13px] leading-relaxed'>
            OneCart was born for smart, seamless shopping — created to deliver quality products, trending styles, and everyday essentials in one place. With reliable service, fast delivery, and great value, OneCart makes your online shopping experience simple, satisfying, and stress-free.
          </p>
          <p className='w-full text-white/85 md:text-[16px] text-[13px] leading-relaxed'>
            We're built for modern shoppers — combining style, convenience, and affordability. Whether it's fashion, essentials, or trends, we bring everything you need to one trusted platform with fast delivery, easy returns, and a customer-first shopping experience you'll love.
          </p>

          <div className='w-full h-[1px] bg-white/10 my-1'></div>

          <p className='text-[15px] text-white lg:text-[20px] font-bold'>Our Mission</p>
          <p className='w-full text-white/85 md:text-[16px] text-[13px] leading-relaxed'>
            Our mission is to redefine online shopping by delivering quality, affordability, and convenience. OneCart connects customers with trusted products and brands, offering a seamless, customer-focused experience that saves time, adds value, and fits every lifestyle and need.
          </p>
        </div>
      </div>

      {/* Why choose us */}
      <div className='w-full flex items-center justify-center flex-col gap-[10px]'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />

        <div className='w-full max-w-[1200px] px-5 grid grid-cols-1 lg:grid-cols-3 gap-6 py-[40px]'>
          {WHY_CHOOSE_US.map((item, index) => (
            <div
              key={index}
              className='min-h-[230px] border border-white/15 flex items-center justify-center gap-4 flex-col px-8 py-6 text-white backdrop-blur-[2px] bg-white/[0.03] rounded-lg hover:bg-white/[0.07] hover:border-[#46d1f7]/50 hover:-translate-y-1 transition-all duration-300'
            >
              <div className='text-[#bff1f9]'>
                {item.icon}
              </div>
              <b className='text-[20px] font-semibold text-[#bff1f9] text-center'>
                {item.title}
              </b>
              <p className='text-center text-white/75 text-[14px] leading-relaxed'>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <NewLetterBox />
      <Footer />
    </div>
  )
}

export default About
