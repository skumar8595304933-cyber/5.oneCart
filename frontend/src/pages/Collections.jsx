import React, { useContext, useEffect, useState } from 'react'
import { FaChevronDown, FaChevronUp, FaTimes } from "react-icons/fa"
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import Card from '../component/Card'
import Footer from '../component/Footer'

const CATEGORIES = ['Men', 'Women', 'Kids']
const SUB_CATEGORIES = ['TopWear', 'BottomWear', 'WinterWear']
const PRICE_RANGES = [
  { label: 'Under ₹500', min: 0, max: 500 },
  { label: '₹500 - ₹1000', min: 500, max: 1000 },
  { label: '₹1000 - ₹2000', min: 1000, max: 2000 },
  { label: 'Above ₹2000', min: 2000, max: Infinity },
]

function Collections() {
  const [showFilter, setShowFilter] = useState(false)
  const { products, search, showSearch, setSearch, setShowSearch } = useContext(shopDataContext)
  const [filterProduct, setFilterProduct] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [priceRange, setPriceRange] = useState(null)
  const [sortType, setSortType] = useState("relavent")

  const toggleValue = (setter) => (e) => {
    const value = e.target.value
    setter(prev =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    )
  }

  const toggleCategory = toggleValue(setCategory)
  const toggleSubCategory = toggleValue(setSubCategory)

  const clearFilters = () => {
    setCategory([])
    setSubCategory([])
    setPriceRange(null)
  }

  const clearSearch = () => {
    setSearch('')
    setShowSearch(false)
  }

  // Filtering
  useEffect(() => {
    let result = products.slice()

    if (showSearch && search) {
      result = result.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    }
    if (category.length > 0) {
      result = result.filter(item => category.includes(item.category))
    }
    if (subCategory.length > 0) {
      result = result.filter(item => subCategory.includes(item.subCategory))
    }
    if (priceRange) {
      result = result.filter(item => item.price >= priceRange.min && item.price < priceRange.max)
    }

    if (sortType === 'low-high') result.sort((a, b) => a.price - b.price)
    else if (sortType === 'high-low') result.sort((a, b) => b.price - a.price)

    setFilterProduct(result)
  }, [products, category, subCategory, priceRange, search, showSearch, sortType])

  const activeFilterCount = category.length + subCategory.length + (priceRange ? 1 : 0)

  return (
    <div className='w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col'>
      <div className='flex-1 flex items-start flex-col md:flex-row justify-start pt-[70px] overflow-x-hidden pb-[60px]'>

        {/* Sidebar */}
        <aside className='md:w-[260px] w-full p-5 border-r border-white/10 text-[#aaf5fa] md:sticky md:top-[70px] md:self-start'>
          <button
            className='w-full flex items-center justify-between text-[22px] font-semibold cursor-pointer'
            onClick={() => setShowFilter(prev => !prev)}
          >
            <span className='flex items-center gap-2'>
              FILTERS
              {activeFilterCount > 0 && (
                <span className='text-xs bg-[#46d1f7] text-black rounded-full px-2 py-[2px] font-bold'>
                  {activeFilterCount}
                </span>
              )}
            </span>
            {showFilter
              ? <FaChevronUp className='text-[16px] md:hidden' />
              : <FaChevronDown className='text-[16px] md:hidden' />
            }
          </button>

          <div className={`${showFilter ? 'flex' : 'hidden'} md:flex flex-col gap-4 mt-5`}>

            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className='self-start flex items-center gap-1 text-xs text-[#46d1f7] hover:underline'
              >
                <FaTimes size={10} /> Clear all filters
              </button>
            )}

            <FilterGroup
              title="CATEGORIES"
              options={CATEGORIES}
              selected={category}
              onChange={toggleCategory}
            />

            <FilterGroup
              title="SUB-CATEGORIES"
              options={SUB_CATEGORIES}
              selected={subCategory}
              onChange={toggleSubCategory}
            />

            {/* Price range filter */}
            <div className='border border-white/10 pl-5 pr-3 py-4 rounded-lg bg-slate-700/60'>
              <p className='text-[16px] text-[#f8fafa] font-medium mb-3'>PRICE RANGE</p>
              <div className='flex flex-col gap-3'>
                {PRICE_RANGES.map((range) => (
                  <label
                    key={range.label}
                    className='flex items-center gap-3 text-[15px] font-light cursor-pointer select-none'
                  >
                    <input
                      type="radio"
                      name="priceRange"
                      checked={priceRange?.label === range.label}
                      onChange={() => setPriceRange(range)}
                      className='w-4 h-4 accent-[#46d1f7]'
                    />
                    {range.label}
                  </label>
                ))}
                {priceRange && (
                  <button
                    onClick={() => setPriceRange(null)}
                    className='self-start text-xs text-[#46d1f7] hover:underline mt-1'
                  >
                    Clear price filter
                  </button>
                )}
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className='w-full md:flex-1 px-4 md:px-10 py-4'>
          <div className='w-full flex justify-between items-center flex-col lg:flex-row gap-4 mb-6'>
            <Title text1={"ALL"} text2={"COLLECTIONS"} />

            <div className='flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-end'>
              <p className='text-white/60 text-sm whitespace-nowrap'>
                {filterProduct.length} {filterProduct.length === 1 ? 'item' : 'items'}
              </p>
              <select
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
                className='bg-slate-700 w-[180px] h-[46px] px-3 text-white rounded-lg border-2 border-transparent hover:border-[#46d1f7] focus:border-[#46d1f7] focus:outline-none transition-colors'
              >
                <option value="relavent">Sort By: Relevant</option>
                <option value="low-high">Sort By: Low to High</option>
                <option value="high-low">Sort By: High to Low</option>
              </select>
            </div>
          </div>

          {/* Active search indicator */}
          {showSearch && search && (
            <div className='flex items-center gap-2 mb-5 text-sm text-white/70'>
              <span>Showing results for "<span className='text-[#46d1f7]'>{search}</span>"</span>
              <button onClick={clearSearch} className='text-[#46d1f7] hover:underline flex items-center gap-1'>
                <FaTimes size={10} /> Clear
              </button>
            </div>
          )}

          {filterProduct.length > 0 ? (
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7'>
              {filterProduct.map((item) => (
                <Card
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  price={item.price}
                  image={item.image1}
                />
              ))}
            </div>
          ) : (
            <div className='min-h-[50vh] flex flex-col items-center justify-center text-white/50 gap-3'>
              <p className='text-lg'>No products found</p>
              <p className='text-sm'>Try adjusting your filters or search</p>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className='text-[#46d1f7] hover:underline text-sm mt-1'
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  )
}

function FilterGroup({ title, options, selected, onChange }) {
  return (
    <div className='border border-white/10 pl-5 pr-3 py-4 rounded-lg bg-slate-700/60'>
      <p className='text-[16px] text-[#f8fafa] font-medium mb-3'>{title}</p>
      <div className='flex flex-col gap-3'>
        {options.map((option) => (
          <label
            key={option}
            className='flex items-center gap-3 text-[15px] font-light cursor-pointer select-none'
          >
            <input
              type="checkbox"
              value={option}
              checked={selected.includes(option)}
              onChange={onChange}
              className='w-4 h-4 accent-[#46d1f7]'
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  )
}

export default Collections
