import React from 'react'
import LatestCollection from '../component/LatestCollection'
import BestSeller from '../component/BestSeller'

function Product() {
  return (
    <div className='w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center justify-start flex-col py-[40px] gap-[60px]'>
      <section className='w-full flex items-center justify-center flex-col gap-[10px]'>
        <LatestCollection />
      </section>

      <section className='w-full flex items-center justify-center flex-col gap-[10px]'>
        <BestSeller />
      </section>
    </div>
  )
}

export default Product
