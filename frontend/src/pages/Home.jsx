import React, { useEffect, useState, useCallback } from 'react'
import Backgound from '../component/Backgound'
import Hero from '../component/Hero'
import Product from './Product'
import OurPolicy from '../component/OurPolicy'
import NewLetterBox from '../component/NewLetterBox'
import Footer from '../component/Footer'

const HERO_DATA = [
  { text1: "30% OFF Limited Offer", text2: "Style that" },
  { text1: "Discover the Best of Bold Fashion", text2: "Limited Time Only!" },
  { text1: "Explore Our Best Collection", text2: "Shop Now!" },
  { text1: "Choose your Perfect Fashion Fit", text2: "Now on Sale!" },
]
const SLIDE_DURATION = 4000

function Home() {
  const [heroCount, setHeroCount] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setHeroCount(prev => (prev === HERO_DATA.length - 1 ? 0 : prev + 1))
    }, SLIDE_DURATION)
    return () => clearInterval(interval)
  }, [isPaused])

  const goToSlide = useCallback((index) => setHeroCount(index), [])

  return (
    <div className='overflow-x-hidden relative top-[70px]'>
      <div
        className='relative w-[100vw] lg:h-[100vh] md:h-[60vh] sm:h-[40vh] h-[35vh] bg-gradient-to-l from-[#141414] to-[#0c2025]'
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <Backgound heroCount={heroCount} />
        <Hero
          key={heroCount}
          heroCount={heroCount}
          setHeroCount={setHeroCount}
          heroData={HERO_DATA[heroCount]}
        />

        {/* Slide indicators */}
        <div className='absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10'>
          {HERO_DATA.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-[3px] rounded-full transition-all duration-300 ${
                index === heroCount ? 'w-8 bg-white' : 'w-4 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      <Product />
      <OurPolicy />
      <NewLetterBox />
      <Footer />
    </div>
  )
}

export default Home
