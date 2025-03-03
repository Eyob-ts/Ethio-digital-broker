'use client';

import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';

export default function HeroSection() {
  const [searchVisible, setSearchVisible] = useState(false);
  const isLoggedIn = useSelector((state) => state.isLoggedIn); // Redux state for login
  const dispatch = useDispatch();

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <div className="relative isolate px-6 pt-10 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div className="text-center">
          <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-7xl font-oxygen">
            Your All-in-One Digital Brokerage Solution
          </h1>
          <p className="mt-8 text-pretty text-lg font-medium text-gray-500 dark:text-gray-300 sm:text-xl/8 font-thin">
            From finding the perfect insurance plan to accessing expert brokers, Ethio Digital Broker simplifies your
            journey with trusted, transparent, and efficient services. Explore comprehensive solutions tailored to your
            needs—all in one place.
          </p>
          {!isLoggedIn && ( // Conditionally render buttons based on login state
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/register"
                className="rounded-md bg-gradient-to-br from-blue-900 to-blue-700 hover:scale-105 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </a>
              <a href="#" className="text-sm/6 font-semibold text-gray-900 dark:text-gray-100">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          )}
        </div>
        {/* Search Section */}
        <div className="relative mt-16">
          <div className="flex items-center justify-center gap-2">
            <input
              type="text"
              placeholder="Search for properties..."
              className="w-full max-w-md rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-200 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:max-w-lg"
            />
            <button
              onClick={toggleSearch}
              className="rounded-md bg-indigo-600 p-2 text-white hover:bg-indigo-500"
            >
              <FaSearch />
            </button>
          </div>
          {/* Category Dropdown */}
          {searchVisible && (
            <div className="absolute top-14 left-1/2 z-10 w-full max-w-md -translate-x-1/2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-lg sm:max-w-lg">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {['Buy Property', 'Rent Property', 'Commercial', 'Land', 'Luxury Homes'].map((category, index) => (
                  <li
                    key={index}
                    className="cursor-pointer px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => alert(`Searching in: ${category}`)}
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        />
      </div>
    </div>
  );
}
