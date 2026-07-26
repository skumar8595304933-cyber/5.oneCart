import React, { useContext, useEffect, useState } from 'react'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { RiDeleteBin6Line } from "react-icons/ri"
import CartTotal from '../component/CartTotal'
import Footer from '../component/Footer'

function Cart() {
  const { products, currency, cartItem, updateQuantity } = useContext(shopDataContext)
  const [cartData, setCartData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const tempData = []
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItem[items][item],
          })
        }
      }
    }
    setCartData(tempData)
  }, [cartItem])

  const handleQuantityChange = (id, size, value) => {
    if (value === '' || Number(value) <= 0) return
    updateQuantity(id, size, Number(value))
  }

  return (
    <div className='w-full min-h-screen p-5 overflow-x-hidden bg-gradient-to-l from-[#141414] to-[#0c2025]'>

      <div className='text-center mt-[80px] mb-8'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      {cartData.length > 0 ? (
        <div className='w-full flex flex-col gap-4 max-w-[900px] mx-auto'>
          {cartData.map((item) => {
            const productData = products.find((product) => product._id === item._id)

            if (!productData) return null // product no longer exists — skip safely

            return (
              <div
                key={`${item._id}-${item.size}`}
                className='w-full flex items-center gap-4 sm:gap-6 bg-[#51808048] py-4 px-4 sm:px-6 rounded-2xl border border-white/5'
              >
                <img
                  className='w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] rounded-md object-cover shrink-0'
                  src={productData.image1}
                  alt={productData.name}
                />

                <div className='flex-1 flex flex-col gap-2 min-w-0'>
                  <p className='text-[16px] sm:text-[22px] text-[#f3f9fc] truncate'>
                    {productData.name}
                  </p>
                  <div className='flex items-center flex-wrap gap-3'>
                    <p className='text-[16px] sm:text-[20px] text-[#aaf4e7]'>
                      {currency} {productData.price}
                    </p>
                    <p className='w-[36px] h-[36px] text-[14px] text-white bg-[#518080b4] rounded-md flex items-center justify-center border border-[#9ff9f9]'>
                      {item.size}
                    </p>
                  </div>
                </div>

                <div className='flex items-center gap-4 shrink-0'>
                  <input
                    type="number"
                    min={1}
                    defaultValue={item.quantity}
                    className='w-[55px] sm:w-[70px] px-2 py-2 text-white text-[16px] font-semibold bg-[#518080b4] border border-[#9ff9f9] rounded-md text-center focus:outline-none focus:border-[#46d1f7]'
                    onChange={(e) => handleQuantityChange(item._id, item.size, e.target.value)}
                  />
                  <button
                    aria-label="Remove item"
                    className='text-[#9ff9f9] hover:text-red-400 transition-colors cursor-pointer'
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                  >
                    <RiDeleteBin6Line size={22} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className='min-h-[40vh] flex flex-col items-center justify-center gap-3 text-white/60'>
          <p className='text-lg'>Your cart is empty</p>
          <button
            onClick={() => navigate('/collection')}
            className='text-[#46d1f7] hover:underline text-sm'
          >
            Continue shopping →
          </button>
        </div>
      )}

      <div className='flex justify-center sm:justify-end items-end my-16 max-w-[900px] mx-auto'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <button
            disabled={cartData.length === 0}
            className='w-full text-[16px] sm:text-[18px] cursor-pointer bg-[#51808048] hover:bg-slate-500 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#51808048] py-[12px] px-[30px] rounded-2xl text-white flex items-center justify-center gap-[15px] border border-white/20 mt-[20px] transition-colors'
            onClick={() => {
              if (cartData.length > 0) {
                navigate("/placeorder")
              }
            }}
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Cart
