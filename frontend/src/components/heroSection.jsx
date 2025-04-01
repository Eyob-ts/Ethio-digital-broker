'use client';

import { useState } from 'react';
import { FaSearch, FaSlidersH } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function HeroSection() {
  const [filters, setFilters] = useState({
    title: "",
    category: "",
    minPrice: 0,
    maxPrice: 10000000, // ETB range
    condition: "",
    type: "",
    location: "",
  });

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handlePriceChange = (value) => {
    setFilters(prev => ({
      ...prev,
      minPrice: value[0],
      maxPrice: value[1]
    }));
  };

  const formatETB = (value) => {
    return new Intl.NumberFormat('en-ET', {
      style: 'currency',
      currency: 'ETB',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="relative isolate px-6 pt-10 lg:px-8">
      {/* Background elements */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div
          style={{
            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>

      <div className="mx-auto max-w-2xl py-24 sm:py-32 lg:py-40">
        <div className="text-center">
          <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-7xl font-oxygen">
            Your All-in-One Digital Brokerage Solution
          </h1>
          <p className="mt-8 text-pretty text-lg font-medium text-gray-500 dark:text-gray-300 sm:text-xl/8 font-thin">
            From finding the perfect property to expert brokerage services
          </p>
        </div>

        {/* Integrated Filter Component */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-12 bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <div className="space-y-4">
            {/* Main Search */}
            <div className="relative">
              <input
                type="text"
                name="title"
                placeholder="Search properties..."
                value={filters.title}
                onChange={handleChange}
                className="w-full p-4 pl-12 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700/50 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300" />
            </div>

            {/* Price Range Slider */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Price Range: {formatETB(filters.minPrice)} - {formatETB(filters.maxPrice)}
              </label>
              <div className="px-2">
                <Slider
                  range
                  min={0}
                  max={10000000}
                  value={[filters.minPrice, filters.maxPrice]}
                  onChange={handlePriceChange}
                  trackStyle={[{ backgroundColor: '#4f46e5', height: 6 }]}
                  handleStyle={[
                    { backgroundColor: '#4f46e5', borderColor: '#4f46e5', width: 20, height: 20, marginTop: -7 },
                    { backgroundColor: '#4f46e5', borderColor: '#4f46e5', width: 20, height: 20, marginTop: -7 }
                  ]}
                  railStyle={{ backgroundColor: '#e5e7eb', height: 6 }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>{formatETB(0)}</span>
                <span>{formatETB(10000000)}</span>
              </div>
            </div>

            {/* Advanced Filters Toggle */}
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="flex items-center text-sm text-indigo-600 dark:text-indigo-400"
            >
              <FaSlidersH className="mr-2" />
              {showAdvancedFilters ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
            </button>

            {/* Advanced Filters */}
            <AnimatePresence>
              {showAdvancedFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <select
                      name="category"
                      value={filters.category}
                      onChange={handleChange}
                      className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700/50 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">All Categories</option>
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Land">Land</option>
                    </select>

                    <select
                      name="type"
                      value={filters.type}
                      onChange={handleChange}
                      className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700/50 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">All Types</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Villa">Villa</option>
                      <option value="Office">Office</option>
                    </select>

                    <input
                      type="text"
                      name="location"
                      placeholder="Location"
                      value={filters.location}
                      onChange={handleChange}
                      className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700/50 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <select
                      name="condition"
                      value={filters.condition}
                      onChange={handleChange}
                      className="p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700/50 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Any Condition</option>
                      <option value="New">New</option>
                      <option value="Used">Used</option>
                    </select>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Search Button */}
            <button
              type="button"
              className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-4"
            >
              Search Properties
            </button>
          </div>
        </motion.div>

        {!isLoggedIn && (
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/register"
              className="rounded-md bg-gradient-to-br from-blue-900 to-blue-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:scale-105 transition-transform"
            >
              Get started
            </a>
            <a href="#" className="text-sm/6 font-semibold text-gray-900 dark:text-gray-100">
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        )}
      </div>

      {/* Bottom background element */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <div
          style={{
            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        />
      </div>
    </div>
  );
}