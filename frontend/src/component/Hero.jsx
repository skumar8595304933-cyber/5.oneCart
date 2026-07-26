import React from 'react'
import { FaCircle } from "react-icons/fa"

const DOT_COUNT = 4

function Hero({ heroData, heroCount, setHeroCount }) {
  return (
    <div className='w-[85%] sm:w-[60%] md:w-[45%] h-full relative'>

      <div
        key={heroCount}
        className='absolute text-[#88d9ee] text-[22px] md:text-[40px] lg:text-[55px] md:left-[10%] md:top-[90px] lg:top-[130px] left-[8%] top-[20px] leading-tight animate-[fadeIn_0.6s_ease]'
      >
        <p>{heroData.text1}</p>
        <p>{heroData.text2}</p>
      </div>

      <div className='absolute md:top-[400px] lg:top-[500px] top-[160px] left-[10%] flex items-center justify-center gap-[10px]'>
        {Array.from({ length: DOT_COUNT }).map((_, index) => (
          <FaCircle
            key={index}
            role="button"
            aria-label={`Go to slide ${index + 1}`}
            className={`w-[14px] cursor-pointer transition-all duration-300 hover:scale-125 ${
              heroCount === index ? 'fill-orange-400 scale-110' : 'fill-white/70'
            }`}
            onClick={() => setHeroCount(index)}
          />
        ))}
      </div>

    </div>
  )
}

export default Hero
