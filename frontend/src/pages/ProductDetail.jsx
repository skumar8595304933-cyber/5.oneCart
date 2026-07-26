import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'
import { FaStar, FaStarHalfAlt } from "react-icons/fa"
import RelatedProduct from '../component/RelatedProduct'
import Loading from '../component/Loading'

function ProductDetail() {
  const { productId } = useParams()
  const { products, currency, addtoCart, loading } = useContext(shopDataContext)

  const [productData, setProductData] = useState(false)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')
  const [color, setColor] = useState('')
  const [activeTab, setActiveTab] = useState('description')

  useEffect(() => {
    const found = products.find((item) => item._id === productId)
    if (found) {
      setProductData(found)
      setImage(found.image1)
      setSize('')
      setColor('')
    }
  }, [productId, products])

  const thumbnails = productData
    ? [productData.image1, productData.image2, productData.image3, productData.image4].filter(Boolean)
    : []

  const handleAddToCart = () => {
    if (productData.sizes?.length > 0 && !size) return
    if (productData.colors?.length > 0 && !color) return
    addtoCart(productData._id, size, color)
  }

  const isAddDisabled =
    (productData?.sizes?.length > 0 && !size) ||
    (productData?.colors?.length > 0 && !color)

  return productData ? (
    <div>
      <div className='w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center justify-start flex-col lg:flex-row gap-[20px] pb-10'>

        {/* Image gallery */}
        <div className='lg:w-[50vw] md:w-[90vw] w-full mt-[90px] lg:mt-[70px] flex items-center justify-center md:gap-[10px] gap-[20px] flex-col-reverse lg:flex-row'>
          <div className='flex items-center justify-center gap-[15px] lg:gap-[15px] lg:flex-col flex-wrap'>
            {thumbnails.map((thumb, index) => (
              <div
                key={index}
                className={`md:w-[90px] w-[50px] h-[50px] md:h-[100px] bg-slate-300 rounded-md overflow-hidden cursor-pointer border-2 transition-colors ${
                  image === thumb ? 'border-[#46d1f7]' : 'border-[#80808049] hover:border-white/40'
                }`}
                onClick={() => setImage(thumb)}
              >
                <img src={thumb} alt={`${productData.name} thumbnail ${index + 1}`} className='w-full h-full object-cover' />
              </div>
            ))}
          </div>

          <div className='lg:w-[55%] w-[85%] aspect-square lg:h-auto border border-[#80808049] rounded-md overflow-hidden bg-black/20'>
            <img src={image} alt={productData.name} className='w-full h-full object-cover' />
          </div>
        </div>

        {/* Product info */}
        <div className='lg:w-[45vw] w-full flex items-start justify-start flex-col py-[20px] px-[30px] gap-[14px]'>
          <h1 className='text-[28px] md:text-[36px] font-semibold text-[aliceblue] leading-tight'>
            {productData.name.toUpperCase()}
          </h1>

          <div className='flex items-center gap-1'>
            <FaStar className='text-[18px] fill-[#FFD700]' />
            <FaStar className='text-[18px] fill-[#FFD700]' />
            <FaStar className='text-[18px] fill-[#FFD700]' />
            <FaStar className='text-[18px] fill-[#FFD700]' />
            <FaStarHalfAlt className='text-[18px] fill-[#FFD700]' />
            <p className='text-[16px] font-semibold pl-[5px] text-white/70'>(124 reviews)</p>
          </div>

          <p className='text-[28px] font-semibold text-white'>{currency} {productData.price}</p>

          <p className='w-full md:w-[80%] text-[15px] text-white/75 leading-relaxed'>
            {productData.description}
          </p>

          {/* Color selector */}
          {productData.colors?.length > 0 && (
            <div className='flex flex-col gap-[10px] mt-[6px] w-full'>
              <p className='text-[18px] font-semibold text-white'>
                Select Color{color && <span className='text-white/50 font-normal text-[14px]'> — {color}</span>}
              </p>
              <div className='flex gap-3 flex-wrap'>
                {productData.colors.map((c, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={c}
                    title={c}
                    onClick={() => setColor(c)}
                    className={`w-[36px] h-[36px] rounded-full border-2 transition-all ${
                      color === c ? 'border-[#46d1f7] scale-110' : 'border-white/30 hover:border-white/60'
                    }`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size selector */}
          {productData.sizes?.length > 0 && (
            <div className='flex flex-col gap-[10px] mt-[6px] w-full'>
              <p className='text-[18px] font-semibold text-white'>Select Size</p>
              <div className='flex gap-2 flex-wrap'>
                {productData.sizes.map((item, index) => (
                  <button
                    key={index}
                    className={`border py-2 px-4 rounded-md text-[15px] transition-colors ${
                      item === size
                        ? 'bg-[#46d1f7] text-black border-[#46d1f7] font-semibold'
                        : 'bg-slate-300 text-black hover:bg-slate-200'
                    }`}
                    onClick={() => setSize(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            disabled={isAddDisabled || loading}
            className='text-[16px] cursor-pointer bg-[#495b61c9] hover:bg-[#5a747bd9] disabled:opacity-40 disabled:cursor-not-allowed py-[12px] px-[30px] rounded-2xl mt-[10px] border border-[#80808049] text-white shadow-md shadow-black transition-colors'
            onClick={handleAddToCart}
          >
            {loading ? <Loading /> : "Add to Cart"}
          </button>

          {isAddDisabled && !loading && (
            <p className='text-red-300 text-[13px]'>
              {productData.colors?.length > 0 && !color ? 'Please select a color. ' : ''}
              {productData.sizes?.length > 0 && !size ? 'Please select a size.' : ''}
            </p>
          )}

          <div className='w-[90%] h-[1px] bg-slate-700 mt-2'></div>

          <div className='w-full md:w-[80%] text-[14px] text-white/70 flex flex-col gap-1'>
            <p>100% Original Product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description / Reviews */}
      <div className='w-full min-h-[50vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-start justify-start flex-col px-5 lg:px-[80px] pt-10'>

        <div className='flex'>
          <button
            className={`px-5 py-3 text-sm border transition-colors ${
              activeTab === 'description' ? 'bg-white/10 text-white border-white/30' : 'text-white/60 border-white/10 hover:text-white'
            }`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button
            className={`px-5 py-3 text-sm border-t border-b border-r transition-colors ${
              activeTab === 'reviews' ? 'bg-white/10 text-white border-white/30' : 'text-white/60 border-white/10 hover:text-white'
            }`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews (124)
          </button>
        </div>

        <div className='w-full bg-[#3336397c] border border-white/10 text-white/85 text-[14px] md:text-[15px] px-5 md:px-8 py-6 min-h-[150px]'>
          {activeTab === 'description' ? (
            <p className='leading-relaxed'>
              Upgrade your wardrobe with this stylish slim-fit cotton shirt, available now on OneCart. Crafted from breathable, high-quality fabric, it offers all-day comfort and effortless style. Easy to maintain and perfect for any setting, this shirt is a must-have essential for those who value both fashion and function.
            </p>
          ) : (
            <p className='text-white/60'>No reviews yet. Be the first to review this product.</p>
          )}
        </div>

        <RelatedProduct
          category={productData.category}
          subCategory={productData.subCategory}
          currentProductId={productData._id}
        />
      </div>
    </div>
  ) : (
    <div className='opacity-0'></div>
  )
}

export default ProductDetail
