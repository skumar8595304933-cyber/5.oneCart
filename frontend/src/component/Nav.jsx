import React, { useContext, useState, useRef, useEffect } from 'react'
import logo from '../assets/logo.png'
import { IoSearchCircleOutline, IoSearchCircleSharp } from "react-icons/io5"
import { FaCircleUser } from "react-icons/fa6"
import { MdOutlineShoppingCart } from "react-icons/md"
import { IoMdHome } from "react-icons/io"
import { HiOutlineCollection } from "react-icons/hi"
import { MdContacts } from "react-icons/md"
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { userDataContext } from '../context/UserContext'
import { authDataContext } from '../context/AuthContext'
import { shopDataContext } from '../context/ShopContext'

const NAV_LINKS = [
  { label: 'HOME', path: '/' },
  { label: 'COLLECTIONS', path: '/collection' },
  { label: 'ABOUT', path: '/about' },
  { label: 'CONTACT', path: '/contact' },
]

function Nav() {
  const { userData } = useContext(userDataContext)
  const { serverUrl } = useContext(authDataContext)
  const { showSearch, setShowSearch, search, setSearch, getCartCount } = useContext(shopDataContext)

  const [showProfile, setShowProfile] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const profileRef = useRef(null)

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }

  const goTo = (path) => {
    navigate(path)
    setShowProfile(false)
  }

  const isActive = (path) => location.pathname === path

  return (
    <div className='w-full h-[70px] bg-[#ecfafaec] z-20 fixed top-0 flex items-center justify-between px-[20px] md:px-[30px] shadow-md shadow-black'>

      {/* Logo */}
      <div
        className='flex items-center gap-[10px] cursor-pointer shrink-0'
        onClick={() => navigate("/")}
      >
        <img src={logo} alt="OneCart logo" className='w-[30px]' />
        <h1 className='text-[22px] md:text-[25px] text-black font-sans'>OneCart</h1>
      </div>

      {/* Desktop nav links */}
      <div className='hidden md:flex flex-1 justify-center'>
        <ul className='flex items-center gap-[16px] text-white'>
          {NAV_LINKS.map((link) => (
            <li
              key={link.path}
              className={`text-[14px] cursor-pointer py-[10px] px-[20px] rounded-2xl transition-colors ${
                isActive(link.path) ? 'bg-[#46d1f7] text-black font-semibold' : 'bg-[#000000c9] hover:bg-slate-500'
              }`}
              onClick={() => navigate(link.path)}
            >
              {link.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Right icons */}
      <div className='flex items-center gap-[16px] md:gap-[20px] shrink-0'>
        {!showSearch ? (
          <IoSearchCircleOutline
            className='w-[34px] h-[34px] md:w-[38px] md:h-[38px] text-black cursor-pointer'
            onClick={() => { setShowSearch(prev => !prev); navigate("/collection") }}
          />
        ) : (
          <IoSearchCircleSharp
            className='w-[34px] h-[34px] md:w-[38px] md:h-[38px] text-black cursor-pointer'
            onClick={() => setShowSearch(prev => !prev)}
          />
        )}

        <div className='relative' ref={profileRef}>
          {!userData ? (
            <FaCircleUser
              className='w-[27px] h-[27px] md:w-[29px] md:h-[29px] text-black cursor-pointer'
              onClick={() => setShowProfile(prev => !prev)}
            />
          ) : (
            <div
              className='w-[30px] h-[30px] bg-[#080808] text-white rounded-full flex items-center justify-center cursor-pointer font-semibold'
              onClick={() => setShowProfile(prev => !prev)}
            >
              {userData?.name?.slice(0, 1).toUpperCase() || '?'}
            </div>
          )}

          {showProfile && (
            <div className='absolute w-[200px] bg-[#000000e6] top-[calc(100%+15px)] right-0 border border-[#aaa9a9]/40 rounded-[10px] z-20 overflow-hidden'>
              <ul className='flex flex-col text-[15px] text-white py-1'>
                {!userData ? (
                  <li className='hover:bg-[#2f2f2f] px-[15px] py-[12px] cursor-pointer' onClick={() => goTo("/login")}>
                    Login
                  </li>
                ) : (
                  <li className='hover:bg-[#2f2f2f] px-[15px] py-[12px] cursor-pointer' onClick={() => { handleLogout(); setShowProfile(false) }}>
                    Logout
                  </li>
                )}
                <li className='hover:bg-[#2f2f2f] px-[15px] py-[12px] cursor-pointer' onClick={() => goTo("/order")}>
                  Orders
                </li>
                <li className='hover:bg-[#2f2f2f] px-[15px] py-[12px] cursor-pointer' onClick={() => goTo("/about")}>
                  About
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className='relative hidden md:block'>
          <MdOutlineShoppingCart
            className='w-[30px] h-[30px] text-black cursor-pointer'
            onClick={() => navigate("/cart")}
          />
          {getCartCount() > 0 && (
            <p className='absolute -top-[8px] -right-[10px] w-[18px] h-[18px] flex items-center justify-center bg-black text-white rounded-full text-[9px] font-semibold'>
              {getCartCount()}
            </p>
          )}
        </div>
      </div>

      {/* Search bar */}
      {showSearch && (
        <div className='w-full h-[80px] bg-[#d8f6f9dd] absolute top-full left-0 right-0 flex items-center justify-center px-4'>
          <input
            type="text"
            autoFocus
            className='lg:w-[50%] w-full max-w-[500px] h-[55px] bg-[#233533] rounded-[30px] px-[25px] placeholder:text-white/60 text-white text-[16px] focus:outline-none focus:ring-2 focus:ring-[#46d1f7]'
            placeholder='Search here...'
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>
      )}

      {/* Mobile bottom nav */}
      <div className='w-full h-[75px] flex items-center justify-between px-[10px] text-[11px] fixed bottom-0 left-0 bg-[#191818] md:hidden z-20'>
        <button
          className={`flex items-center justify-center flex-col gap-[2px] flex-1 py-2 transition-colors ${isActive('/') ? 'text-[#46d1f7]' : 'text-white'}`}
          onClick={() => navigate("/")}
        >
          <IoMdHome className='w-[24px] h-[24px]' /> Home
        </button>
        <button
          className={`flex items-center justify-center flex-col gap-[2px] flex-1 py-2 transition-colors ${isActive('/collection') ? 'text-[#46d1f7]' : 'text-white'}`}
          onClick={() => navigate("/collection")}
        >
          <HiOutlineCollection className='w-[24px] h-[24px]' /> Collections
        </button>
        <button
          className={`flex items-center justify-center flex-col gap-[2px] flex-1 py-2 transition-colors ${isActive('/contact') ? 'text-[#46d1f7]' : 'text-white'}`}
          onClick={() => navigate("/contact")}
        >
          <MdContacts className='w-[24px] h-[24px]' /> Contact
        </button>
        <button
          className={`relative flex items-center justify-center flex-col gap-[2px] flex-1 py-2 transition-colors ${isActive('/cart') ? 'text-[#46d1f7]' : 'text-white'}`}
          onClick={() => navigate("/cart")}
        >
          <MdOutlineShoppingCart className='w-[24px] h-[24px]' />
          Cart
          {getCartCount() > 0 && (
            <p className='absolute top-0 right-[18%] w-[16px] h-[16px] flex items-center justify-center bg-white text-black font-semibold rounded-full text-[9px]'>
              {getCartCount()}
            </p>
          )}
        </button>
      </div>
    </div>
  )
}

export default Nav
